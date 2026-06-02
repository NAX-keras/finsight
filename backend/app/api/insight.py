"""
app/api/insight.py
GET /api/insight/daily  → insight harian dari data DB (sentimen dominan, watchlist, dll)
GET /api/insight/ihsg   → data IHSG live dari yfinance
"""
from datetime import datetime, timezone
from typing import Any, Dict
from fastapi import APIRouter
from app.core.dependencies import DbSession
from app.models.db_models import Stock
from app.services.market_service import get_ihsg
from app.core.logging_config import get_logger

logger = get_logger(__name__)
router = APIRouter(prefix="/insight", tags=["Insight"])

_DAYS_ID = ["Senin","Selasa","Rabu","Kamis","Jumat","Sabtu","Minggu"]
_MONTHS_ID = ["","Januari","Februari","Maret","April","Mei","Juni",
               "Juli","Agustus","September","Oktober","November","Desember"]


def _format_date_id() -> str:
    now = datetime.now()
    return f"{_DAYS_ID[now.weekday()]}, {now.day} {_MONTHS_ID[now.month]} {now.year}"


@router.get("/ihsg", summary="Data IHSG live dari Yahoo Finance")
async def ihsg_live() -> Dict[str, Any]:
    """
    Return data IHSG ^JKSE real-time.
    Dipakai oleh sidebar IHSG Live di Dashboard.jsx.
    """
    return get_ihsg()


@router.get("/daily", summary="Insight harian pasar saham")
async def daily_insight(db: DbSession) -> Dict[str, Any]:
    """
    Hitung insight harian dari data stocks di DB:
    - Sentimen dominan pasar
    - Saham layak diamati (BUY + confidence tinggi)
    - Saham perlu perhatian (SELL signal)
    - Distribusi Bullish/Bearish/Netral
    """
    stocks = db.query(Stock).all()

    if not stocks:
        return {
            "dominant"    : "Netral",
            "dominant_sub": "Data belum tersedia",
            "watchlist"   : "—",
            "watchlist_sub": "Belum ada sinyal kuat",
            "attention"   : "—",
            "attention_sub": "Monitor pergerakan pasar",
            "bullish_pct" : 50,
            "bearish_pct" : 25,
            "neutral_pct" : 25,
            "date"        : _format_date_id(),
        }

    total   = len(stocks)
    pos_stk = [s for s in stocks if s.sentiment_label == "positive"]
    neg_stk = [s for s in stocks if s.sentiment_label == "negative"]
    neu_stk = [s for s in stocks if s.sentiment_label == "neutral"]

    bullish_pct = round(len(pos_stk) / total * 100)
    bearish_pct = round(len(neg_stk) / total * 100)
    neutral_pct = 100 - bullish_pct - bearish_pct

    # Sentimen dominan
    if len(pos_stk) >= len(neg_stk) and len(pos_stk) >= len(neu_stk):
        dominant     = "Bullish"
        dominant_sub = f"{bullish_pct}% saham IDX trending positif"
    elif len(neg_stk) >= len(pos_stk) and len(neg_stk) >= len(neu_stk):
        dominant     = "Bearish"
        dominant_sub = f"{bearish_pct}% saham IDX dalam tekanan jual"
    else:
        dominant     = "Netral"
        dominant_sub = f"{neutral_pct}% saham IDX bergerak sideways"

    # Watchlist: BUY dengan confidence tertinggi
    buy_stocks  = sorted(
        [s for s in stocks if s.prediction_signal == "BUY"],
        key=lambda x: x.confidence or 0, reverse=True
    )
    watchlist     = " & ".join(s.ticker for s in buy_stocks[:2]) if buy_stocks else "—"
    watchlist_sub = "Momentum positif, confidence tinggi" if buy_stocks else "Belum ada sinyal BUY"

    # Attention: SELL signal
    sell_stocks   = [s for s in stocks if s.prediction_signal == "SELL"]
    attention     = ", ".join(s.ticker for s in sell_stocks[:2]) if sell_stocks else "—"
    attention_sub = "Monitor tekanan jual" if sell_stocks else "Tidak ada sinyal jual"

    return {
        "dominant"    : dominant,
        "dominant_sub": dominant_sub,
        "watchlist"   : watchlist,
        "watchlist_sub": watchlist_sub,
        "attention"   : attention,
        "attention_sub": attention_sub,
        "bullish_pct" : bullish_pct,
        "bearish_pct" : bearish_pct,
        "neutral_pct" : neutral_pct,
        "date"        : _format_date_id(),
    }
