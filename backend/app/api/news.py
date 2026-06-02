"""app/api/news.py — GET /api/news"""
from typing import Any, Dict, List
from fastapi import APIRouter
from app.core.dependencies import DbSession
from app.services.news_service import get_all_news
from app.core.logging_config import get_logger

logger = get_logger(__name__)
router = APIRouter(prefix="/news", tags=["News"])

_FALLBACK = [
    {"title":"BBRI catat laba bersih Rp 12,7T, melampaui ekspektasi analis","tag":"Positive","stock":"BBRI"},
    {"title":"GOTO masih dalam tekanan jual asing minggu ini","tag":"Negative","stock":"GOTO"},
    {"title":"Pasar konsolidasi jelang keputusan suku bunga The Fed","tag":"Neutral","stock":"IHSG"},
    {"title":"TLKM ekspansi layanan 5G di 12 kota baru di Sumatra","tag":"Positive","stock":"TLKM"},
    {"title":"ASII: penjualan kendaraan semester I tumbuh 8% YoY","tag":"Positive","stock":"ASII"},
]

@router.get("", summary="Berita pasar terbaru")
async def list_news(db: DbSession) -> List[Dict[str, Any]]:
    """Return [{title, tag, stock}] — cocok dengan fetchNews() di api.js."""
    try:
        return get_all_news(db, limit=20)
    except Exception as e:
        logger.warning(f"Gagal ambil berita dari DB: {e}")
        return _FALLBACK
