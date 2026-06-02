"""
app/services/news_service.py
CRUD berita + seed data yang cocok dengan NEWS_DATA di frontend/src/data/stocks.js
"""
from __future__ import annotations
from typing import Any, Dict, List
from datetime import datetime, timezone, timedelta
from sqlalchemy.orm import Session
from app.models.db_models import News, Stock
from app.core.logging_config import get_logger

logger = get_logger(__name__)

SEED_NEWS = [
    # BBRI
    {"ticker":"BBRI","title":"BBRI catat laba bersih Rp 12,7T, melampaui ekspektasi analis","tag":"Positive","source":"IDX Daily"},
    {"ticker":"BBRI","title":"Ekspansi kredit UMKM BBRI naik 18% YoY","tag":"Positive","source":"Bisnis.com"},
    {"ticker":"BBRI","title":"Analis rekomendasikan BUY untuk BBRI","tag":"Positive","source":"Bloomberg IDN"},
    {"ticker":"BBRI","title":"Suku bunga BI berpotensi pengaruhi NIM bank","tag":"Neutral","source":"Kontan"},
    # GOTO
    {"ticker":"GOTO","title":"GOTO masih dalam tekanan jual asing minggu ini","tag":"Negative","source":"IDX Daily"},
    {"ticker":"GOTO","title":"Rugi bersih GOTO belum menunjukkan pemulihan","tag":"Negative","source":"CNBC Indonesia"},
    {"ticker":"GOTO","title":"Analis pertanyakan profitabilitas GOTO jangka panjang","tag":"Negative","source":"Bloomberg IDN"},
    {"ticker":"GOTO","title":"GOTO umumkan efisiensi operasional baru","tag":"Neutral","source":"Kontan"},
    # TLKM
    {"ticker":"TLKM","title":"TLKM ekspansi layanan 5G di 12 kota baru di Sumatra","tag":"Positive","source":"IDX Daily"},
    {"ticker":"TLKM","title":"Pendapatan TLKM stabil di tengah persaingan","tag":"Neutral","source":"Bisnis.com"},
    {"ticker":"TLKM","title":"Dividen TLKM diperkirakan tetap menarik","tag":"Positive","source":"Kontan"},
    {"ticker":"TLKM","title":"Kompetisi paket data makin ketat di 2025","tag":"Negative","source":"CNBC Indonesia"},
    # ASII
    {"ticker":"ASII","title":"ASII: penjualan kendaraan semester I tumbuh 8% YoY","tag":"Positive","source":"IDX Daily"},
    {"ticker":"ASII","title":"ASII diversifikasi bisnis ke sektor EV","tag":"Positive","source":"Bloomberg IDN"},
    {"ticker":"ASII","title":"Kurs rupiah pengaruhi margin impor komponen","tag":"Neutral","source":"Kontan"},
    {"ticker":"ASII","title":"Prospek ASII solid untuk H2 2025","tag":"Positive","source":"Bisnis.com"},
    # Market-wide
    {"ticker":"IHSG","title":"Pasar konsolidasi jelang keputusan suku bunga The Fed","tag":"Neutral","source":"IDX Daily"},
]


def to_news_dict(n: News) -> Dict[str, Any]:
    """Return {title, tag, stock} — cocok dengan NEWS_DATA di frontend."""
    ticker = n.stock.ticker if n.stock else "IHSG"
    return {"title": n.title, "tag": n.tag, "stock": ticker}


def get_all_news(db: Session, limit: int = 20) -> List[Dict[str, Any]]:
    rows = db.query(News).order_by(News.published_at.desc()).limit(limit).all()
    return [to_news_dict(r) for r in rows]


def seed_news(db: Session) -> None:
    if db.query(News).count() > 0:
        logger.info("Tabel news sudah terisi — skip seed.")
        return
    base = datetime.now(timezone.utc)
    for i, item in enumerate(SEED_NEWS):
        ticker = item["ticker"]
        if ticker == "IHSG":
            stock_id = None
        else:
            s = db.query(Stock).filter(Stock.ticker == ticker).first()
            stock_id = s.id if s else None
        db.add(News(
            stock_id=stock_id,
            title=item["title"], summary=item["title"],
            source=item.get("source","IDX"), tag=item["tag"],
            published_at=base - timedelta(hours=i),
        ))
    db.commit()
    logger.info(f"✅ Seed {len(SEED_NEWS)} berita selesai.")
