"""
app/api/stocks.py
GET /api/stocks           → data semua 15 saham yang dipantau
GET /api/stocks/{ticker}  → data satu saham

Backend mencoba refresh yfinance. Jika yfinance error/rate limit, data DB tetap memakai fallback dataset.
"""
from typing import Any, Dict
from fastapi import APIRouter, HTTPException
from app.core.dependencies import DbSession
from app.services.stock_service import get_by_ticker, get_all_as_dict, to_stock_dict
from app.services.market_service import refresh_stock, refresh_stocks_batch
from app.data.fallback_dataset import TOP15_TICKERS
from app.core.logging_config import get_logger

logger = get_logger(__name__)
router = APIRouter(prefix="/stocks", tags=["Stocks"])
_TICKERS = TOP15_TICKERS


@router.get("", summary="Semua saham yang dipantau")
async def list_stocks(db: DbSession) -> Dict[str, Any]:
    """
    Shape: {ticker: {name, price, change, up, sentiment, sentimentScore, ...}}
    Cocok dengan frontend. Jika backend/yfinance gagal, fallback dataset tetap dipakai.
    """
    try:
        refresh_stocks_batch(db, _TICKERS)
    except Exception as e:
        logger.warning(f"refresh_stocks_batch gagal, gunakan data DB/fallback: {e}")
    return get_all_as_dict(db)


@router.get("/{ticker}", summary="Data satu saham berdasarkan ticker")
async def get_stock(ticker: str, db: DbSession) -> Dict[str, Any]:
    t = ticker.upper()
    if t == "GOTO":
        raise HTTPException(status_code=404, detail="GOTO sudah dihapus dari watchlist FinSight.")
    if t not in _TICKERS:
        raise HTTPException(
            status_code=404,
            detail=f"Saham '{t}' tidak ditemukan. Tersedia: {', '.join(_TICKERS)}",
        )
    try:
        refresh_stock(db, t)
    except Exception as e:
        logger.warning(f"refresh_stock gagal untuk {t}, gunakan data DB/fallback: {e}")

    stock = get_by_ticker(db, t)
    if not stock:
        raise HTTPException(status_code=404, detail=f"Saham '{t}' tidak ditemukan di database.")
    return to_stock_dict(stock)
