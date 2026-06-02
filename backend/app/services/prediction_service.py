"""
app/services/prediction_service.py
PredictionService — integrasi model Keras LSTM (finsight_model.keras).

Arsitektur model (teridentifikasi saat inspect):
  Input 1 — "time_series"  : shape (None, 10, 12)
             10 timestep × 12 fitur OHLCV + indikator teknikal
  Input 2 — "sentiment"    : shape (None, 1)
             Skor sentimen ternormalisasi ke [0.0, 1.0]
  Output  — "prediction"   : shape (None, 1)
             Nilai regresi kontinu → dipetakan ke BUY/HOLD/SELL

Loss custom: quantile_huber_loss (distributional regression)
"""
from __future__ import annotations
import os
from typing import Any, Dict, List, Optional
from datetime import datetime, timezone
from sqlalchemy.orm import Session
from app.core.logging_config import get_logger
from app.models.db_models import Prediction

logger = get_logger(__name__)

# ── Konstanta ────────────────────────────────────────────────────────────────
N_TIMESTEPS  = 10
N_FEATURES   = 12
BUY_THRESH   =  0.015   # raw >  1.5%  → BUY
SELL_THRESH  = -0.015   # raw < -1.5%  → SELL


# ── Registrasi custom loss ────────────────────────────────────────────────────

def _register_loss():
    """Daftarkan quantile_huber_loss ke Keras registry agar model bisa di-load."""
    try:
        import keras, tensorflow as tf

        @keras.saving.register_keras_serializable()
        def quantile_huber_loss(y_true, y_pred, kappa: float = 1.0):
            n   = tf.shape(y_pred)[-1]
            tau = tf.cast(tf.range(1, n + 1), tf.float32) / tf.cast(n, tf.float32)
            err = y_true - y_pred
            hub = tf.where(tf.abs(err) <= kappa,
                           0.5 * err ** 2,
                           kappa * (tf.abs(err) - 0.5 * kappa))
            ind = tf.cast(err < 0, tf.float32)
            return tf.reduce_mean(tf.reduce_sum(tf.abs(tau - ind) * hub, axis=-1))

        return quantile_huber_loss
    except Exception as e:
        logger.warning(f"Gagal mendaftarkan custom loss: {e}")
        return None


# ── Pembuatan fitur ───────────────────────────────────────────────────────────

def _build_time_series(features: dict, price_history: Optional[List[Dict]] = None):
    """
    Bangun array numpy (1, 10, 12) dari data yang tersedia.

    Urutan 12 fitur (sesuai urutan training):
      [close, open, high, low, volume, sma5, sma10, rsi, macd, macd_sig, bb_up, bb_lo]

    Strategi:
      1. Jika price_history tersedia (≥ 2 titik) → bangun 10 timestep nyata
      2. Jika tidak → replikasi satu baris dari features

    Normalisasi per-kolom min-max dalam window → model menerima nilai [0,1].
    """
    import numpy as np

    close = float(features.get("close_price") or features.get("close") or 0)
    open_ = float(features.get("open_price")  or features.get("open")  or close * 0.995)
    high  = float(features.get("high_price")  or features.get("high")  or close * 1.01)
    low   = float(features.get("low_price")   or features.get("low")   or close * 0.99)
    vol   = float(features.get("volume")  or 1_000_000)

    if price_history and len(price_history) >= 2:
        prices = [float(p.get("price", close)) for p in price_history]
        while len(prices) < N_TIMESTEPS:
            prices.insert(0, prices[0])
        prices = prices[-N_TIMESTEPS:]

        ts = np.zeros((N_TIMESTEPS, N_FEATURES), dtype=np.float32)
        for i, p in enumerate(prices):
            window = prices[max(0, i-4): i+1]
            sma5   = float(np.mean(window))
            window10 = prices[max(0, i-9): i+1]
            sma10  = float(np.mean(window10))
            h = p * 1.01; lo = p * 0.99
            ts[i] = [p, p * 0.995, h, lo, vol,
                     sma5, sma10, 50.0, 0.0, 0.0,
                     h * 1.02, lo * 0.98]
    else:
        sma = close
        row = np.array([
            close, open_, high, low, vol,
            sma, sma, 50.0, 0.0, 0.0,
            high * 1.02, low * 0.98,
        ], dtype=np.float32)
        ts = np.tile(row, (N_TIMESTEPS, 1))

    # Normalisasi min-max per kolom
    for col in range(N_FEATURES):
        mn, mx = ts[:, col].min(), ts[:, col].max()
        ts[:, col] = (ts[:, col] - mn) / (mx - mn) if mx > mn else 0.5

    return ts.reshape(1, N_TIMESTEPS, N_FEATURES)


# ── Konversi output regresi ───────────────────────────────────────────────────

def _to_signal(raw: float) -> Dict[str, Any]:
    if raw > BUY_THRESH:
        signal = "BUY"
    elif raw < SELL_THRESH:
        signal = "SELL"
    else:
        signal = "HOLD"
    # Confidence: makin jauh dari threshold, makin yakin (50–95%)
    conf = min(50.0 + abs(raw) / max(abs(BUY_THRESH), 1e-6) * 22.5, 95.0)
    return {"signal": signal, "confidence": round(conf, 1)}


def _change_str(raw: float) -> str:
    return f"{raw * 100:+.1f}%"


def _build_insight(ticker: str, signal: str, conf: float, raw: float) -> str:
    level = "tinggi" if conf >= 70 else ("sedang" if conf >= 50 else "rendah")
    pct   = _change_str(raw)
    if signal == "BUY":
        return (f"Model LSTM mendeteksi momentum positif pada {ticker} "
                f"(estimasi {pct}). Kepercayaan {level} ({conf:.0f}%). "
                "Pertimbangkan fundamental sebelum mengambil posisi.")
    if signal == "SELL":
        return (f"Model LSTM mengindikasikan tekanan turun pada {ticker} "
                f"(estimasi {pct}). Kepercayaan {level} ({conf:.0f}%). "
                "Waspadai potensi koreksi lebih lanjut.")
    return (f"{ticker} berada di zona konsolidasi (estimasi {pct}). "
            f"Kepercayaan {level} ({conf:.0f}%). "
            "Pantau volume dan sentimen sebelum masuk posisi.")


# ── Rule-based fallback ───────────────────────────────────────────────────────

def _rule_based(ticker: str, features: dict) -> Dict[str, Any]:
    close = float(features.get("close_price") or features.get("close") or 0)
    open_ = float(features.get("open_price")  or features.get("open")  or 0)
    sent  = float(features.get("sentiment_score", 50) or 50)

    chg   = (close - open_) / open_ if open_ else 0
    score = 50 + chg * 500 + (sent - 50) * 0.3
    score = max(0.0, min(100.0, score))

    if score >= 60:   signal, raw = "BUY",   0.025
    elif score <= 40: signal, raw = "SELL", -0.025
    else:             signal, raw = "HOLD",  0.005

    conf = min(abs(score - 50) * 2 + 50, 95.0)
    return {"signal": signal, "raw": raw, "confidence": round(conf, 1)}


# ── Service ──────────────────────────────────────────────────────────────────

class PredictionService:
    """Singleton — di-load sekali saat startup FastAPI."""

    def __init__(self) -> None:
        self._model  = None
        self._loaded = False
        self._tf     = None

    # ── Lifecycle ────────────────────────────────────────────────────────

    def load_model(self, path: str) -> None:
        """Load finsight_model.keras sekali saat startup."""
        if not os.path.exists(path):
            logger.warning(f"⚠️  Prediction model tidak ditemukan: {path}")
            logger.info("   → Rule-based fallback aktif.")
            return
        try:
            import tensorflow as tf
            self._tf = tf
            loss_fn  = _register_loss()
            custom   = {"quantile_huber_loss": loss_fn} if loss_fn else {}
            self._model  = tf.keras.models.load_model(path, custom_objects=custom)
            self._loaded = True
            logger.info(f"✅ Prediction model (Keras LSTM) dimuat: {path}")
            logger.info(f"   Input  shapes : {self._model.input_shape}")
            logger.info(f"   Output shape  : {self._model.output_shape}")
        except Exception as e:
            logger.error(f"❌ Gagal load Keras model: {e}")
            logger.info("   → Rule-based fallback aktif.")

    @property
    def is_loaded(self) -> bool:
        return self._loaded

    # ── Inferensi ────────────────────────────────────────────────────────

    def predict_stock(
        self,
        ticker: str,
        features: dict,
        price_history: Optional[List[Dict]] = None,
    ) -> Dict[str, Any]:
        """
        Jalankan prediksi saham.

        Return dict:
          signal, confidence, predictedChange, insight, raw, source
        """
        if not self._loaded:
            res    = _rule_based(ticker, features)
            raw    = res["raw"]
            signal = res["signal"]
            conf   = res["confidence"]
            source = "rule_based"
        else:
            try:
                import numpy as np
                ts_arr   = _build_time_series(features, price_history)
                raw_sent = float(features.get("sentiment_score", 50) or 50) / 100.0
                sent_arr = np.array([[raw_sent]], dtype=np.float32)

                out    = self._model.predict(
                    {"time_series": ts_arr, "sentiment": sent_arr},
                    verbose=0,
                )
                raw    = float(out[0][0])
                sig    = _to_signal(raw)
                signal = sig["signal"]
                conf   = sig["confidence"]
                source = "keras_lstm"
            except Exception as e:
                logger.warning(f"Keras inference gagal ({e}), pakai fallback.")
                res    = _rule_based(ticker, features)
                raw    = res["raw"]
                signal = res["signal"]
                conf   = res["confidence"]
                source = "rule_based"

        return {
            "signal"         : signal,
            "confidence"     : conf,
            "predictedChange": _change_str(raw),
            "insight"        : _build_insight(ticker, signal, conf, raw),
            "raw"            : raw,
            "source"         : source,
        }

    # ── Persistensi ──────────────────────────────────────────────────────

    def save_prediction(
        self, db: Session, stock_id: int,
        signal: str, predicted_change: str,
        confidence: float, insight: str,
        raw_output: Optional[float] = None,
        features: Optional[dict] = None,
    ) -> Prediction:
        rec = Prediction(
            stock_id=stock_id, signal=signal,
            predicted_change=predicted_change, confidence=confidence,
            insight=insight, raw_output=raw_output,
            features_used=features or {},
            created_at=datetime.now(timezone.utc),
        )
        db.add(rec); db.commit(); db.refresh(rec)
        return rec
