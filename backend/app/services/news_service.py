"""
app/services/news_service.py
CRUD berita + seed berita/sentimen untuk 15 saham.

Sumber seed berita saat ini berasal dari dataset sentimen tweet yang sudah dibersihkan.
Kalau nanti punya News API real, cukup update service ini tanpa mengubah frontend.
"""
from __future__ import annotations
from typing import Any, Dict, List
from datetime import datetime, timezone, timedelta
from sqlalchemy.orm import Session
from app.models.db_models import News, Stock
from app.core.logging_config import get_logger
from app.data.fallback_dataset import FALLBACK_NEWS, TOP15_TICKERS

logger = get_logger(__name__)
SEED_NEWS = FALLBACK_NEWS


def to_news_dict(n: News) -> Dict[str, Any]:
    ticker = n.stock.ticker if n.stock else "IHSG"
    content = n.summary or n.title or ""
    return {
        "title": n.title,
        "content": content,
        "summary": content,
        "tag": n.tag,
        "stock": ticker,
        "source": n.source,
        "published_at": n.published_at.isoformat() if n.published_at else None,
    }


def fallback_news_dict(item: Dict[str, Any]) -> Dict[str, Any]:
    content = item.get("content") or item.get("title") or ""
    return {
        "title": item.get("title", content),
        "content": content,
        "summary": content,
        "tag": item.get("tag", "Neutral"),
        "stock": item.get("ticker", "IHSG"),
        "source": item.get("source", "FinSight Dataset"),
        "url": item.get("url", ""),
        "published_at": item.get("published_at", ""),
    }


def get_all_news(db: Session, limit: int = 80) -> List[Dict[str, Any]]:
    rows = db.query(News).order_by(News.published_at.desc()).limit(limit).all()
    result = [to_news_dict(r) for r in rows if (not r.stock or r.stock.ticker != "GOTO")]

    # Jika database masih berisi seed lama yang terpotong dengan "...",
    # gunakan dataset fallback baru yang menyimpan teks lengkap.
    has_truncated_seed = any(str(r.get("title", "")).rstrip().endswith("...") for r in result)
    if result and not has_truncated_seed:
        return result

    return [fallback_news_dict(item) for item in SEED_NEWS[:limit] if item.get("ticker") != "GOTO"]


def seed_news(db: Session) -> None:
    """
    Upsert seed berita setiap startup.
    Berita GOTO lama dihapus supaya tidak muncul di UI.
    """
    try:
        goto = db.query(Stock).filter(Stock.ticker == "GOTO").first()
        if goto:
            db.query(News).filter(News.stock_id == goto.id).delete(synchronize_session=False)
            db.commit()
    except Exception as exc:
        db.rollback()
        logger.warning(f"Gagal bersihkan berita GOTO: {exc}")

    base = datetime.now(timezone.utc)
    inserted = 0
    for i, item in enumerate(SEED_NEWS):
        ticker = item["ticker"].upper()
        if ticker == "GOTO":
            continue
        stock_id = None
        if ticker != "IHSG":
            stock = db.query(Stock).filter(Stock.ticker == ticker).first()
            if not stock:
                continue
            stock_id = stock.id

        exists = db.query(News).filter(News.title == item["title"]).first()
        if exists:
            # Pastikan seed lama ikut ter-update menjadi teks lengkap.
            exists.title = item.get("title", exists.title)
            exists.summary = item.get("content", item.get("title", exists.summary))
            exists.tag = item.get("tag", exists.tag)
            exists.source = item.get("source", exists.source)
            continue

        db.add(News(
            stock_id=stock_id,
            title=item["title"],
            summary=item.get("content", item["title"]),
            source=item.get("source", "FinSight Dataset"),
            tag=item.get("tag", "Neutral"),
            published_at=base - timedelta(hours=i),
        ))
        inserted += 1

    db.commit()
    logger.info(f"✅ Seed/upsert berita selesai. Baru ditambahkan: {inserted}. Total kandidat: {len(SEED_NEWS)}")
