"""
app/services/stock_service.py
CRUD untuk entitas Stock + seed data yang cocok persis
dengan STOCKS_DATA di frontend/src/data/stocks.js
"""
from __future__ import annotations
from typing import Any, Dict, List, Optional
from sqlalchemy.orm import Session
from app.models.db_models import Stock
from app.core.logging_config import get_logger

logger = get_logger(__name__)

# ── Seed data (cocok dengan frontend/src/data/stocks.js) ─────────────────────
SEED: List[Dict[str, Any]] = [
    {
        "ticker": "BBRI", "company_name": "Bank Rakyat Indonesia",
        "sector": "Perbankan",
        "current_price": 5100.0, "change_percent": 2.3, "is_up": True,
        "sentiment_label": "positive", "sentiment_score": 78.0,
        "prediction_signal": "BUY", "predicted_change": "+2.4%",
        "confidence": 78.0,
        "insight": ("Sentimen publik meningkat setelah laporan laba kuartal "
                    "yang melampaui ekspektasi. Volume beli asing meningkat signifikan."),
        "reasons": ["Positive Earnings", "Bullish News", "High Volume", "Strong Sentiment"],
        "price_history": [
            {"date":"Jan","price":4200},{"date":"Feb","price":4050},
            {"date":"Mar","price":4400},{"date":"Apr","price":4320},
            {"date":"Mei","price":4680},{"date":"Jun","price":4550},
            {"date":"Jul","price":4900},{"date":"Agu","price":5100},
        ],
    },
    {
        "ticker": "TLKM", "company_name": "Telkom Indonesia",
        "sector": "Telekomunikasi",
        "current_price": 3870.0, "change_percent": 0.8, "is_up": True,
        "sentiment_label": "neutral", "sentiment_score": 55.0,
        "prediction_signal": "HOLD", "predicted_change": "+0.5%",
        "confidence": 62.0,
        "insight": ("Ekspansi 5G di 12 kota baru memberikan momentum positif "
                    "jangka menengah. Pasar masih menunggu kepastian tarif regulasi."),
        "reasons": ["5G Expansion", "Stable Revenue", "Neutral News", "Moderate Volume"],
        "price_history": [
            {"date":"Jan","price":3600},{"date":"Feb","price":3550},
            {"date":"Mar","price":3700},{"date":"Apr","price":3680},
            {"date":"Mei","price":3750},{"date":"Jun","price":3800},
            {"date":"Jul","price":3820},{"date":"Agu","price":3870},
        ],
    },
    {
        "ticker": "GOTO", "company_name": "GoTo Group",
        "sector": "Teknologi",
        "current_price": 68.0, "change_percent": 1.4, "is_up": False,
        "sentiment_label": "negative", "sentiment_score": 32.0,
        "prediction_signal": "SELL", "predicted_change": "-1.8%",
        "confidence": 71.0,
        "insight": ("Tekanan jual asing masih berlanjut. Profitabilitas jangka "
                    "pendek menjadi pertanyaan besar di kalangan analis."),
        "reasons": ["Foreign Selling", "Negative News", "Low Profit", "Weak Sentiment"],
        "price_history": [
            {"date":"Jan","price":82},{"date":"Feb","price":79},
            {"date":"Mar","price":76},{"date":"Apr","price":74},
            {"date":"Mei","price":72},{"date":"Jun","price":71},
            {"date":"Jul","price":70},{"date":"Agu","price":68},
        ],
    },
    {
        "ticker": "ASII", "company_name": "Astra International",
        "sector": "Otomotif",
        "current_price": 4450.0, "change_percent": 0.5, "is_up": True,
        "sentiment_label": "positive", "sentiment_score": 61.0,
        "prediction_signal": "BUY", "predicted_change": "+1.2%",
        "confidence": 65.0,
        "insight": ("Penjualan kendaraan semester ini melampaui proyeksi. "
                    "Kinerja divisi alat berat solid seiring meningkatnya proyek infrastruktur."),
        "reasons": ["Strong Sales", "Infrastructure Boost", "Positive Earnings", "Stable Dividend"],
        "price_history": [
            {"date":"Jan","price":4100},{"date":"Feb","price":4200},
            {"date":"Mar","price":4150},{"date":"Apr","price":4300},
            {"date":"Mei","price":4250},{"date":"Jun","price":4400},
            {"date":"Jul","price":4380},{"date":"Agu","price":4450},
        ],
    },
]


# ── Response builder ──────────────────────────────────────────────────────────

def to_stock_dict(s: Stock) -> Dict[str, Any]:
    """
    Konversi ORM Stock → dict yang PERSIS cocok dengan STOCKS_DATA[ticker]
    di frontend/src/data/stocks.js sehingga useStockData.js bisa menggunakannya.
    """
    return {
        "name"          : s.company_name,
        "price"         : s.current_price,
        "change"        : abs(s.change_percent),   # nilai absolut; 'up' menentukan arah
        "up"            : s.is_up,
        "sentiment"     : s.sentiment_label,
        "sentimentScore": s.sentiment_score,
        "sector"        : s.sector or "",
        "priceHistory"  : s.price_history or [],
        "prediction"    : s.prediction_signal,
        "predictedChange": s.predicted_change,
        "confidence"    : s.confidence,
        "insight"       : s.insight or "",
        "reasons"       : s.reasons or [],
    }


# ── CRUD ─────────────────────────────────────────────────────────────────────

def get_by_ticker(db: Session, ticker: str) -> Optional[Stock]:
    return db.query(Stock).filter(Stock.ticker == ticker.upper()).first()


def get_all(db: Session) -> List[Stock]:
    return db.query(Stock).order_by(Stock.ticker).all()


def get_all_as_dict(db: Session) -> Dict[str, Any]:
    """Return {ticker: stock_dict} — shape yang diharapkan fetchAllStocks()."""
    return {s.ticker: to_stock_dict(s) for s in get_all(db)}


def upsert(db: Session, data: Dict[str, Any]) -> Stock:
    ticker = data["ticker"].upper()
    stock  = db.query(Stock).filter(Stock.ticker == ticker).first()
    if not stock:
        stock = Stock(ticker=ticker)
        db.add(stock)
    for k, v in data.items():
        if k != "ticker" and hasattr(stock, k):
            setattr(stock, k, v)
    db.commit(); db.refresh(stock)
    return stock


def seed_stocks(db: Session) -> None:
    if db.query(Stock).count() > 0:
        logger.info("Tabel stocks sudah terisi — skip seed.")
        return
    for d in SEED:
        upsert(db, d)
    logger.info(f"✅ Seed {len(SEED)} saham selesai.")
