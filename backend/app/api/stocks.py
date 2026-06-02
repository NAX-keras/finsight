"""
app/api/stocks.py
GET /api/stocks           → {BBRI:{...}, TLKM:{...}, ...}  (refresh harga dulu)
GET /api/stocks/{ticker}  → data satu saham (refresh harga dulu)

Response PERSIS cocok dengan STOCKS_DATA di frontend/src/data/stocks.js
"""
from typing import Any, Dict
from fastapi import APIRouter, HTTPException
from app.core.dependencies import DbSession
from app.services.stock_service import get_by_ticker, get_all_as_dict, to_stock_dict
from app.services.market_service import refresh_stock
from app.core.logging_config import get_logger

logger = get_logger(__name__)
router = APIRouter(prefix="/stocks", tags=["Stocks"])

_TICKERS = ["BBRI", "TLKM", "ASII", "GOTO"]


@router.get("", summary="Semua saham yang dipantau (harga real-time)")
async def list_stocks(db: DbSession) -> Dict[str, Any]:
    """
    Refresh harga dari yfinance terlebih dahulu, lalu return semua saham.
    Shape: {ticker: {name, price, change, up, sentiment, sentimentScore, ...}}
    """
    for t in _TICKERS:
        try:
            refresh_stock(db, t)
        except Exception as e:
            logger.warning(f"refresh_stock gagal untuk {t}: {e}")
    return get_all_as_dict(db)


@router.get("/{ticker}", summary="Data satu saham berdasarkan ticker")
async def get_stock(ticker: str, db: DbSession) -> Dict[str, Any]:
    """
    Refresh harga dari yfinance, lalu return data satu saham.
    Dipanggil oleh fetchStockData(ticker) di api.js.
    """
    t = ticker.upper()
    try:
        refresh_stock(db, t)
    except Exception as e:
        logger.warning(f"refresh_stock gagal untuk {t}: {e}")

    stock = get_by_ticker(db, t)
    if not stock:
        raise HTTPException(
            status_code=404,
            detail=f"Saham '{t}' tidak ditemukan. Tersedia: BBRI, TLKM, GOTO, ASII"
        )
    return to_stock_dict(stock)
