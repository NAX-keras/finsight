"""
app/services/market_service.py  ──  OPTIMIZED BATCH v3 (Compatible yfinance 0.2.x+)
====================================================================================
CHANGELOG v3 (Optimasi Performa & Pencegahan Rate-Limit Ekstrim):
  ⚡ OPTIMASI UTAMA: Implementasi Batch Download untuk query banyak saham sekaligus.
      → Memotong kuota request ke Yahoo Finance secara drastis (N request menjadi 1 request).
  ⚡ OPTIMASI DB: Implementasi Bulk Commit pada pembaruan masal saham.
  ✅ Robust Multi-Index Parsing untuk hasil yf.download() berbasis group_by='ticker'.
  ✅ Tetap mempertahankan 100% kompatibilitas fungsi single-ticker v2.
====================================================================================
"""

import time
import random
import math
import os
import requests
import pandas as pd
import yfinance as yf
from app.models.db_models import Stock
from app.data.fallback_dataset import STOCK_DATA, FALLBACK_IHSG
from app.core.logging_config import get_logger

logger = get_logger(__name__)

# ── Konfigurasi ───────────────────────────────────────────────────────────────
MAX_RETRY         = 1     # cepat fallback jika Yahoo/yfinance limit/error
RETRY_BASE_DELAY = 1.0   # detik
PRE_REQUEST_DELAY = 0.2  # delay pendek sebelum request
REQUEST_TIMEOUT   = 5    # detik timeout per request
ENABLE_YFINANCE   = os.getenv("ENABLE_YFINANCE", "true").lower() in {"1", "true", "yes", "y"}

# ── Fallback data statis dari dataset upload ────────────────────────────────
# Dipakai ketika Yahoo/yfinance error, kosong, atau terkena rate limit.
FALLBACK_PRICE: dict[str, dict] = {
    ticker: {
        "price": data["current_price"],
        "change_percent": data["change_percent"],
        "is_up": data["is_up"],
    }
    for ticker, data in STOCK_DATA.items()
}

# ── Internal Helpers ──────────────────────────────────────────────────────────

def _build_session() -> requests.Session:
    """Buat requests.Session dengan header browser manusia untuk spoofing bot detector."""
    session = requests.Session()
    session.headers.update({
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/124.0.0.0 Safari/537.36"
        ),
        "Accept":          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection":      "keep-alive",
    })
    return session


def _call_history(ticker_obj, period: str, interval: str):
    """Panggil Ticker.history() dengan pengaman kompatibilitas versi."""
    try:
        return ticker_obj.history(period=period, interval=interval, timeout=REQUEST_TIMEOUT)
    except TypeError:
        pass  # Fallback jika versi yfinance tidak mendukung timeout kwarg

    try:
        return ticker_obj.history(period=period, interval=interval)
    except TypeError as te:
        raise RuntimeError(f"Tidak kompatibel dengan fungsi .history() versi yfinance ini: {te}")


def _fetch_history(symbol: str, period: str = "5d", interval: str = "1d") -> pd.DataFrame | None:
    """Fetch history untuk SINGLE ticker dengan fallback cepat."""
    if not ENABLE_YFINANCE:
        logger.info(f"[{symbol}] yfinance dinonaktifkan via ENABLE_YFINANCE=false; pakai fallback dataset.")
        return None
    time.sleep(PRE_REQUEST_DELAY + random.uniform(0, 0.2))

    for attempt in range(1, MAX_RETRY + 1):
        try:
            session = _build_session()
            ticker_obj = yf.Ticker(symbol, session=session)
            hist = _call_history(ticker_obj, period=period, interval=interval)

            if hist is None or hist.empty:
                logger.warning(f"[{symbol}] Attempt {attempt}/{MAX_RETRY}: Data kosong (Rate-limited?)")
            else:
                logger.debug(f"[{symbol}] ✅ Berhasil (attempt {attempt}): {len(hist)} baris")
                return hist
        except Exception as exc:
            logger.warning(f"[{symbol}] Attempt {attempt}/{MAX_RETRY} — {type(exc).__name__}: {exc}")

        if attempt < MAX_RETRY:
            delay = RETRY_BASE_DELAY * attempt + random.uniform(1.0, 2.5)
            logger.debug(f"[{symbol}] Retry ke-{attempt+1} dalam {delay:.1f}s...")
            time.sleep(delay)

    logger.error(f"[{symbol}] ❌ Semua {MAX_RETRY} attempt gagal.")
    return None


def _fetch_batch_data(tickers: list[str], period: str, interval: str) -> dict[str, pd.DataFrame]:
    """
    [NEW v3] Mengunduh banyak ticker sekaligus dalam satu single request (Batching).
    Sangat ampuh menghindari rate limit server Yahoo Finance.
    """
    if not tickers:
        return {}
    if not ENABLE_YFINANCE:
        logger.info("yfinance dinonaktifkan via ENABLE_YFINANCE=false; batch memakai fallback dataset.")
        return {}

    # Konversi ke format Yahoo (.JK) jika emiten IDX, skip jika indeks seperti ^JKSE
    symbol_map = {f"{t}.JK" if not t.startswith('^') else t: t for t in tickers}
    symbols_str = " ".join(symbol_map.keys())

    logger.info(f"Mengeksekusi Batch Request Yahoo untuk {len(tickers)} ticker...")
    time.sleep(PRE_REQUEST_DELAY + random.uniform(0, 0.5))

    for attempt in range(1, MAX_RETRY + 1):
        try:
            # Unduh masal menggunakan yf.download DENGAN TOPENG SESSION
            session = _build_session()
            df = yf.download(
                tickers=symbols_str,
                period=period,
                interval=interval,
                group_by='ticker',  # Struktur data rapi dikelompokkan per ticker
                timeout=REQUEST_TIMEOUT,
                progress=False,
                session=session
            )

            if df.empty:
                logger.warning(f"Batch Attempt {attempt}/{MAX_RETRY}: Response kosong.")
                continue

            result_dict = {}
            # Jika hanya 1 ticker, yfinance mengembalikan DataFrame kolom flat biasa
            if len(symbol_map) == 1:
                single_symbol = list(symbol_map.keys())[0]
                orig_ticker = symbol_map[single_symbol]
                result_dict[orig_ticker] = df
            else:
                # Jika multi-ticker, kolom berbentuk MultiIndex: (Ticker, PriceType)
                if isinstance(df.columns, pd.MultiIndex):
                    for sym, orig_ticker in symbol_map.items():
                        if sym in df.columns.levels[0]:
                            result_dict[orig_ticker] = df[sym]

            return result_dict

        except Exception as exc:
            logger.warning(f"Batch Attempt {attempt}/{MAX_RETRY} Gagal: {exc}")
            if attempt < MAX_RETRY:
                delay = RETRY_BASE_DELAY * attempt + random.uniform(1.0, 2.5)
                time.sleep(delay)

    logger.error("❌ Gagal mengambil data batch setelah semua retry dicoba.")
    return {}


# ── Fungsi Publik ─────────────────────────────────────────────────────────────

def get_stock_data(ticker: str) -> dict | None:
    """Ambil data harga terkini untuk satu saham."""
    symbol = f"{ticker}.JK"
    hist = _fetch_history(symbol, period="5d", interval="1d")

    if hist is not None and len(hist) >= 2:
        try:
            closes = hist["Close"].dropna()
            current = float(closes.iloc[-1])
            previous = float(closes.iloc[-2])

            if previous == 0:
                raise ZeroDivisionError("Harga previous = 0")

            change = ((current - previous) / previous) * 100
            logger.info(f"[{ticker}] ✅ Harga live: Rp{current:,.0f} ({change:+.2f}%)")
            return {
                "ticker":         ticker,
                "price":          round(current, 2),
                "change_percent": round(change, 2),
                "is_up":          change >= 0,
            }
        except Exception as exc:
            logger.warning(f"[{ticker}] Parse data gagal: {exc}")

    if ticker in FALLBACK_PRICE:
        logger.info(f"[{ticker}] ⚠️ Fallback aktif — Yahoo tidak tersedia")
        result = FALLBACK_PRICE[ticker].copy()
        result["ticker"] = ticker
        return result

    return None


def get_price_history(ticker: str, months: int = 8) -> list:
    """Ambil histori harga bulanan untuk satu saham."""
    _MONTH_ID = {
        "January": "Jan", "February": "Feb", "March": "Mar",
        "April":   "Apr", "May":      "Mei", "June":  "Jun",
        "July":    "Jul", "August":   "Agu", "September": "Sep",
        "October": "Okt", "November": "Nov", "December":  "Des",
    }

    symbol = f"{ticker}.JK"
    hist = _fetch_history(symbol, period=f"{months}mo", interval="1mo")

    if hist is None or hist.empty:
        return STOCK_DATA.get(ticker, {}).get("price_history", [])

    result = []
    for idx, row in hist.iterrows():
        try:
            close_val = row["Close"]
            if close_val is None or math.isnan(float(close_val)):
                continue
            month_id = _MONTH_ID.get(idx.strftime("%B"), idx.strftime("%b"))
            result.append({"date": month_id, "price": round(float(close_val), 2)})
        except Exception as exc:
            logger.debug(f"[{ticker}] Skip baris {idx}: {exc}")

    return result


def get_ihsg() -> dict:
    """Ambil data IHSG (^JKSE) real-time."""
    hist = _fetch_history("^JKSE", period="5d", interval="1d")

    if hist is not None and len(hist) >= 2:
        try:
            closes = hist["Close"].dropna()
            current = float(closes.iloc[-1])
            previous = float(closes.iloc[-2])

            change    = ((current - previous) / previous) * 100
            formatted = f"{current:,.0f}".replace(",", ".")

            return {
                "value":      round(current, 2),
                "formatted":  formatted,
                "change":     round(change, 2),
                "change_str": f"{'+' if change >= 0 else ''}{change:.2f}%",
                "up":         change >= 0,
            }
        except Exception as exc:
            logger.warning(f"IHSG parse gagal: {exc}")

    return FALLBACK_IHSG.copy()


def refresh_stock(db, ticker: str) -> None:
    """Pembaruan satu saham ke database (Dipertahankan untuk backward compatibility)."""
    stock = db.query(Stock).filter(Stock.ticker == ticker).first()
    if not stock:
        return

    data = get_stock_data(ticker)
    if data:
        stock.current_price  = data["price"]
        stock.change_percent = data["change_percent"]
        stock.is_up          = data["is_up"]

    history = get_price_history(ticker, months=8)
    if history:
        stock.price_history = history

    try:
        db.commit()
    except Exception as exc:
        db.rollback()
        logger.error(f"[{ticker}] Gagal commit: {exc}")


# ── Fungsi Optimasi Massal Utama ──────────────────────────────────────────────

def refresh_stocks_batch(db, tickers: list[str]) -> None:
    """
    [NEW v3 - MASTERPIECE METHOD]
    Memperbarui puluhan/ratusan saham sekaligus dengan aman dan super cepat.
    Hanya menggunakan 2 Network Request utama ke Yahoo Finance dan 1 DB Commit tunggal.
    """
    if not tickers:
        return

    logger.info(f"=== Memulai Bulk Batch Refresh untuk {len(tickers)} Saham ===")
    
    # 1. Tarik seluruh data harga live & histori secara massal (Batching)
    live_batch = _fetch_batch_data(tickers, period="5d", interval="1d")
    history_batch = _fetch_batch_data(tickers, period="8mo", interval="1mo")

    _MONTH_ID = {
        "January": "Jan", "February": "Feb", "March": "Mar",
        "April":   "Apr", "May":      "Mei", "June":  "Jun",
        "July":    "Jul", "August":   "Agu", "September": "Sep",
        "October": "Okt", "November": "Nov", "December":  "Des",
    }

    # Tarik data dari DB sekaligus menggunakan query IN (.in_())
    stocks_in_db = db.query(Stock).filter(Stock.ticker.in_(tickers)).all()
    stock_map = {s.ticker: s for s in stocks_in_db}
    
    any_updated = False

    for ticker in tickers:
        stock = stock_map.get(ticker)
        if not stock:
            continue

        has_live_update = False

        # --- A. Pemrosesan Data Live ---
        df_live = live_batch.get(ticker)
        if df_live is not None and len(df_live) >= 2:
            try:
                closes = df_live["Close"].dropna()
                if len(closes) >= 2:
                    current = float(closes.iloc[-1])
                    previous = float(closes.iloc[-2])
                    
                    if previous != 0:
                        change = ((current - previous) / previous) * 100
                        stock.current_price = round(current, 2)
                        stock.change_percent = round(change, 2)
                        stock.is_up = change >= 0
                        has_live_update = True
                        any_updated = True
            except Exception as e:
                logger.warning(f"[{ticker}] Gagal ekstraksi live batch data: {e}")

        # Jika Yahoo gagal, lakukan Graceful Degradation ke data fallback statis
        if not has_live_update and ticker in FALLBACK_PRICE:
            fb = FALLBACK_PRICE[ticker]
            stock.current_price = fb["price"]
            stock.change_percent = fb["change_percent"]
            stock.is_up = fb["is_up"]
            any_updated = True

        # --- B. Pemrosesan Data Histori Bulanan ---
        df_hist = history_batch.get(ticker)
        if df_hist is not None and not df_hist.empty:
            try:
                monthly_list = []
                for idx, row in df_hist.iterrows():
                    close_val = row["Close"]
                    if close_val is None or math.isnan(float(close_val)):
                        continue
                    month_id = _MONTH_ID.get(idx.strftime("%B"), idx.strftime("%b"))
                    monthly_list.append({"date": month_id, "price": round(float(close_val), 2)})
                
                if monthly_list:
                    stock.price_history = monthly_list
                    any_updated = True
            except Exception as e:
                logger.warning(f"[{ticker}] Gagal ekstraksi history batch data: {e}")

    # 2. Eksekusi single commit massal di akhir proses (Bulk Transaction)
    if any_updated:
        try:
            db.commit()
            logger.info(f"=== ✅ SUCCESS: Bulk Refresh Selesai disimpan ke DB ===")
        except Exception as exc:
            db.rollback()
            logger.error(f"❌ Gagal melakukan bulk commit ke Database: {exc}")
    else:
        logger.info("⚠️ Tidak ada data baru yang berhasil diperbarui.")