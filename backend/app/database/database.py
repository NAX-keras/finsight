"""app/database/database.py — SQLAlchemy engine, session, dan Base."""
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from app.core.config import settings
from app.core.logging_config import get_logger

logger = get_logger(__name__)


class Base(DeclarativeBase):
    pass


engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
    pool_size=5,
    max_overflow=10,
    echo=settings.DEBUG,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def init_db() -> None:
    """Buat semua tabel yang belum ada."""
    Base.metadata.create_all(bind=engine)
    logger.info("✅ Tabel database berhasil diinisialisasi.")


def check_db() -> bool:
    """Ping database. Return True jika koneksi OK."""
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        return True
    except Exception as e:
        logger.error(f"DB ping gagal: {e}")
        return False
