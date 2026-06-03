"""
app/services/stock_service.py
CRUD Stock + seed data 15 saham FinSight.

Catatan penting:
- GOTO dihapus total.
- Data seed/fallback berasal dari dataset harga 2 tahun + dataset sentimen top 15.
- Jika DB lama masih berisi GOTO, seed_stocks() akan membersihkannya.
"""
from __future__ import annotations
from typing import Any, Dict, List, Optional
from sqlalchemy.orm import Session
from app.models.db_models import Stock, News, SentimentAnalysis, Prediction
from app.core.logging_config import get_logger
from app.data.fallback_dataset import TOP15_TICKERS, STOCK_DATA

logger = get_logger(__name__)
SEED: List[Dict[str, Any]] = list(STOCK_DATA.values())


def to_stock_dict(s: Stock) -> Dict[str, Any]:
    """
    Konversi ORM Stock → dict yang cocok dengan frontend.
    Frontend akan mapping field ini lewat src/utils/mappers.js.
    """
    return {
        "name"           : s.company_name,
        "price"          : s.current_price or 0,
        "change"         : abs(s.change_percent or 0),
        "up"             : bool(s.is_up),
        "sentiment"      : s.sentiment_label or "neutral",
        "sentimentScore" : s.sentiment_score or 50,
        "sector"         : s.sector or "",
        "priceHistory"   : s.price_history or [],
        "prediction"     : s.prediction_signal or "HOLD",
        "predictedChange": s.predicted_change or "0%",
        "confidence"     : s.confidence or 50,
        "insight"        : s.insight or "",
        "reasons"        : s.reasons or [],
    }


def get_by_ticker(db: Session, ticker: str) -> Optional[Stock]:
    return db.query(Stock).filter(Stock.ticker == ticker.upper()).first()


def get_all(db: Session) -> List[Stock]:
    # Urutan mengikuti TOP15, bukan alfabet, agar sama dengan frontend.
    rows = db.query(Stock).filter(Stock.ticker.in_(TOP15_TICKERS)).all()
    order = {t: i for i, t in enumerate(TOP15_TICKERS)}
    return sorted(rows, key=lambda s: order.get(s.ticker, 999))


def get_all_as_dict(db: Session) -> Dict[str, Any]:
    return {s.ticker: to_stock_dict(s) for s in get_all(db)}


def upsert(db: Session, data: Dict[str, Any]) -> Stock:
    ticker = data["ticker"].upper()
    stock = db.query(Stock).filter(Stock.ticker == ticker).first()
    if not stock:
        stock = Stock(ticker=ticker)
        db.add(stock)
    for key, value in data.items():
        if key != "ticker" and hasattr(stock, key):
            setattr(stock, key, value)
    db.commit()
    db.refresh(stock)
    return stock


def remove_goto(db: Session) -> None:
    """Bersihkan GOTO dari DB lama agar tidak muncul di frontend/backend."""
    goto = db.query(Stock).filter(Stock.ticker == "GOTO").first()
    if not goto:
        return
    try:
        # Relasi cascade sudah ada, tapi hapus eksplisit supaya aman di DB lama.
        db.query(News).filter(News.stock_id == goto.id).delete(synchronize_session=False)
        db.query(SentimentAnalysis).filter(SentimentAnalysis.stock_id == goto.id).delete(synchronize_session=False)
        db.query(Prediction).filter(Prediction.stock_id == goto.id).delete(synchronize_session=False)
        db.delete(goto)
        db.commit()
        logger.info("✅ Data GOTO lama sudah dihapus dari database.")
    except Exception as exc:
        db.rollback()
        logger.warning(f"Gagal hapus GOTO: {exc}")


def seed_stocks(db: Session) -> None:
    """
    Seed/upsert 15 saham setiap startup.
    Tidak lagi skip jika tabel sudah terisi, karena DB lama bisa saja hanya berisi 4 saham.
    """
    remove_goto(db)
    for data in SEED:
        upsert(db, data)
    logger.info(f"✅ Seed/upsert {len(SEED)} saham top 15 selesai. GOTO tidak dipakai.")
