"""
app/models/db_models.py
SQLAlchemy ORM — FIXED v2 (Session Management & Indexing Optimization)
==========================================================================
CHANGELOG v2:
  ✅ FIX: Menambahkan `session_id` di `ChatHistory` agar bot punya "ingatan" per sesi/user.
  ⚡ OPTIMASI: Menambahkan `index=True` pada kolom tanggal (`created_at`, `published_at`) 
     untuk mempercepat query time-series (mengambil berita/histori terbaru).
==========================================================================
"""
from __future__ import annotations
from datetime import datetime, timezone
import uuid
from sqlalchemy import (
    Column, Integer, String, Float, Boolean,
    Text, ForeignKey, DateTime, JSON,
)
from sqlalchemy.orm import relationship
from app.database.database import Base


def _now() -> datetime:
    return datetime.now(timezone.utc)

def _generate_uuid() -> str:
    return str(uuid.uuid4())


class Stock(Base):
    __tablename__ = "stocks"

    id               = Column(Integer, primary_key=True, index=True)
    ticker           = Column(String(10),  unique=True, nullable=False, index=True)
    company_name     = Column(String(255), nullable=False)
    sector           = Column(String(100))

    # Harga
    current_price    = Column(Float, default=0.0)
    change_percent   = Column(Float, default=0.0)   # % perubahan harian (bertanda)
    is_up            = Column(Boolean, default=True)

    # Cache sentimen (diperbarui saat analisis)
    sentiment_label  = Column(String(20), default="neutral")   # positive/neutral/negative
    sentiment_score  = Column(Float, default=50.0)             # 0-100

    # Cache prediksi (diperbarui saat prediksi)
    prediction_signal  = Column(String(10), default="HOLD")    # BUY/HOLD/SELL
    predicted_change   = Column(String(20), default="0%")      # "+2.4%"
    confidence         = Column(Float, default=50.0)           # 0-100
    insight            = Column(Text,  default="")
    reasons            = Column(JSON,  default=list)           # ["Reason A", "Reason B"]

    # Histori harga (8 bulan ke belakang)
    price_history      = Column(JSON, default=list)            # [{date, price}]

    created_at         = Column(DateTime, default=_now)
    updated_at         = Column(DateTime, default=_now, onupdate=_now)

    # Relasi
    sentiment_analyses = relationship("SentimentAnalysis", back_populates="stock",
                                      cascade="all, delete-orphan")
    predictions        = relationship("Prediction", back_populates="stock",
                                      cascade="all, delete-orphan")
    news               = relationship("News", back_populates="stock",
                                      cascade="all, delete-orphan")


class SentimentAnalysis(Base):
    __tablename__ = "sentiment_analysis"

    id              = Column(Integer, primary_key=True, index=True)
    stock_id        = Column(Integer, ForeignKey("stocks.id"), nullable=False)
    sentiment_score = Column(Float,    nullable=False)    # 0-100
    sentiment_label = Column(String(20), nullable=False)  # positive/neutral/negative
    source          = Column(String(100), default="api")
    input_text      = Column(Text, nullable=True)
    # Di-index untuk mempercepat pencarian "analisis sentimen hari ini"
    analyzed_at     = Column(DateTime, default=_now, index=True) 

    stock = relationship("Stock", back_populates="sentiment_analyses")


class Prediction(Base):
    __tablename__ = "predictions"

    id               = Column(Integer, primary_key=True, index=True)
    stock_id         = Column(Integer, ForeignKey("stocks.id"), nullable=False)
    signal           = Column(String(10), nullable=False)   # BUY/HOLD/SELL
    predicted_change = Column(String(20))                   # "+2.4%"
    confidence       = Column(Float)                        # 0-100
    insight          = Column(Text)
    raw_output       = Column(Float, nullable=True)         # nilai mentah dari model
    features_used    = Column(JSON, nullable=True)
    # Di-index untuk mempercepat pencarian histori prediksi
    created_at       = Column(DateTime, default=_now, index=True)

    stock = relationship("Stock", back_populates="predictions")


class News(Base):
    __tablename__ = "news"

    id           = Column(Integer, primary_key=True, index=True)
    stock_id     = Column(Integer, ForeignKey("stocks.id"), nullable=True)
    title        = Column(String(500), nullable=False)
    summary      = Column(Text)
    source       = Column(String(100), default="IDX")
    tag          = Column(String(20),  default="Neutral")  # Positive/Negative/Neutral
    # Di-index karena berita hampir selalu di-query menggunakan ORDER BY tanggal DESC
    published_at = Column(DateTime, default=_now, index=True)

    stock = relationship("Stock", back_populates="news")


class ChatHistory(Base):
    __tablename__ = "chat_history"

    id         = Column(Integer, primary_key=True, index=True)
    # Menambahkan session_id agar frontend bisa me-load histori percakapan sebelumnya
    session_id = Column(String(50), nullable=False, default=_generate_uuid, index=True)
    question   = Column(Text, nullable=False)
    answer     = Column(Text, nullable=False)
    # Di-index untuk mengurutkan chat berdasarkan waktu
    created_at = Column(DateTime, default=_now, index=True)