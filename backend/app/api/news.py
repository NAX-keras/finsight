"""app/api/news.py — GET /api/news"""
from typing import Any, Dict, List
from fastapi import APIRouter
from app.core.dependencies import DbSession
from app.services.news_service import get_all_news
from app.data.fallback_dataset import FALLBACK_NEWS
from app.core.logging_config import get_logger

logger = get_logger(__name__)
router = APIRouter(prefix="/news", tags=["News"])

_FALLBACK = [
    {
        "title": item.get("title", ""),
        "content": item.get("content", item.get("title", "")),
        "summary": item.get("content", item.get("title", "")),
        "tag": item.get("tag", "Neutral"),
        "stock": item.get("ticker", "IHSG"),
        "source": item.get("source", "FinSight Dataset"),
        "url": item.get("url", ""),
        "published_at": item.get("published_at", ""),
    }
    for item in FALLBACK_NEWS
    if item.get("ticker") != "GOTO"
]


@router.get("", summary="Berita pasar terbaru")
async def list_news(db: DbSession) -> List[Dict[str, Any]]:
    """Return [{title, tag, stock}] — cocok dengan frontend."""
    try:
        data = get_all_news(db, limit=80)
        return data or _FALLBACK
    except Exception as e:
        logger.warning(f"Gagal ambil berita dari DB, gunakan fallback dataset: {e}")
        return _FALLBACK
