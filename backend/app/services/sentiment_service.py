"""
app/services/sentiment_service.py
SentimentService:
  - load_model()   : load sentiment_model.pkl (scikit-learn pipeline)
  - analyze_text() : inferensi → {label, score}
  - save_result()  : simpan ke tabel sentiment_analysis

Jika file .pkl tidak ada atau gagal load → rule-based fallback otomatis.
"""
from __future__ import annotations
import os, re
from typing import Optional, Tuple
from datetime import datetime, timezone
from sqlalchemy.orm import Session
from app.core.logging_config import get_logger
from app.models.db_models import SentimentAnalysis

logger = get_logger(__name__)

# ── Leksikon rule-based ──────────────────────────────────────────────────────
_POS = {
    "naik","meningkat","laba","untung","profit","bagus","baik","positif",
    "tumbuh","ekspansi","dividen","rebound","bullish","rally","buy",
    "strong","growth","kenaikan","melampaui","optimis","surplus","solid",
}
_NEG = {
    "turun","jual","rugi","negatif","bearish","jatuh","tekanan","sell",
    "weak","decline","penurunan","krisis","koreksi","merosot","anjlok",
    "pesimis","defisit","loss","shortfall",
}


def _rule_based(text: str) -> Tuple[str, float]:
    words = re.findall(r"\b\w+\b", text.lower())
    pos = sum(1 for w in words if w in _POS)
    neg = sum(1 for w in words if w in _NEG)
    total = pos + neg or 1
    ratio = pos / total          # 0.0 → 1.0
    score = round(ratio * 100, 1)
    label = "positive" if score >= 60 else ("negative" if score <= 40 else "neutral")
    return label, score


def _normalise_label(raw: str) -> str:
    r = str(raw).lower().strip()
    if r in ("positive","positif","pos","1","bullish","label_positive"): return "positive"
    if r in ("negative","negatif","neg","0","bearish","label_negative"): return "negative"
    return "neutral"


def _proba_to_score(label: str, proba: Optional[list]) -> float:
    if proba:
        try:
            if len(proba) == 3: return round(proba[2] * 100, 1)   # [neg, neu, pos]
            if len(proba) == 2: return round(proba[1] * 100, 1)
        except (IndexError, TypeError):
            pass
    return {"positive": 75.0, "neutral": 50.0, "negative": 25.0}.get(label, 50.0)


# ── Service ──────────────────────────────────────────────────────────────────

class SentimentService:
    """Singleton — di-load sekali saat startup FastAPI."""

    def __init__(self) -> None:
        self._model = None
        self._loaded = False

    # ── Lifecycle ────────────────────────────────────────────────────────

    def load_model(self, path: str) -> None:
        if not os.path.exists(path):
            logger.warning(f"⚠️  Sentiment model tidak ditemukan: {path}")
            logger.info("   → Rule-based fallback aktif.")
            return
        try:
            import joblib
            self._model = joblib.load(path)
            self._loaded = True
            logger.info(f"✅ Sentiment model dimuat: {path}")
        except Exception as e:
            logger.error(f"❌ Gagal load sentiment model: {e}")
            logger.info("   → Rule-based fallback aktif.")

    @property
    def is_loaded(self) -> bool:
        return self._loaded

    # ── Inferensi ────────────────────────────────────────────────────────

    def analyze_text(self, text: str) -> dict:
        """Return {"label": str, "score": float(0-100), "source": str}."""
        if not self._loaded:
            label, score = _rule_based(text)
            return {"label": label, "score": score, "source": "rule_based"}

        try:
            raw   = self._model.predict([text])[0]
            label = _normalise_label(str(raw))
            try:
                proba = self._model.predict_proba([text])[0].tolist()
            except AttributeError:
                proba = None
            score = _proba_to_score(label, proba)
            return {"label": label, "score": score, "source": "sklearn"}
        except Exception as e:
            logger.warning(f"Sklearn inference gagal ({e}), pakai fallback.")
            label, score = _rule_based(text)
            return {"label": label, "score": score, "source": "rule_based"}

    # ── Persistensi ──────────────────────────────────────────────────────

    def save_result(
        self, db: Session, stock_id: int,
        text: str, label: str, score: float, source: str = "api",
    ) -> SentimentAnalysis:
        rec = SentimentAnalysis(
            stock_id=stock_id, sentiment_score=score,
            sentiment_label=label, source=source,
            input_text=text[:2000],
            analyzed_at=datetime.now(timezone.utc),
        )
        db.add(rec); db.commit(); db.refresh(rec)
        return rec
