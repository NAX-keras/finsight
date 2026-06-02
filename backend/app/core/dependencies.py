"""
app/core/dependencies.py
Dependency Injection:
  - DB session (per-request)
  - SentimentService singleton (di-load sekali saat startup)
  - PredictionService singleton (di-load sekali saat startup)
"""
from __future__ import annotations
from typing import Annotated, Generator
from fastapi import Depends
from sqlalchemy.orm import Session
from app.database.database import SessionLocal


# ── DB Session ──────────────────────────────────────────────

def get_db() -> Generator[Session, None, None]:
    """Yield DB session, otomatis ditutup setelah request selesai."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


DbSession = Annotated[Session, Depends(get_db)]


# ── AI Service Singletons ────────────────────────────────────
# Diisi saat FastAPI startup (lifespan), bukan saat import.

_sentiment_svc = None
_prediction_svc = None


def set_sentiment_service(svc) -> None:
    global _sentiment_svc
    _sentiment_svc = svc


def set_prediction_service(svc) -> None:
    global _prediction_svc
    _prediction_svc = svc


def get_sentiment_service():
    if _sentiment_svc is None:
        raise RuntimeError("SentimentService belum diinisialisasi.")
    return _sentiment_svc


def get_prediction_service():
    if _prediction_svc is None:
        raise RuntimeError("PredictionService belum diinisialisasi.")
    return _prediction_svc


from app.services.sentiment_service import SentimentService   # noqa: E402
from app.services.prediction_service import PredictionService # noqa: E402

SentimentDep  = Annotated[SentimentService,  Depends(get_sentiment_service)]
PredictionDep = Annotated[PredictionService, Depends(get_prediction_service)]
