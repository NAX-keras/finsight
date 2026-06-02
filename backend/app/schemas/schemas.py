"""
app/schemas/schemas.py
Pydantic v2 schemas — request validation & response serialization.
Shape response GET endpoints PERSIS sama dengan fallback data di frontend/src/data/stocks.js
"""
from __future__ import annotations
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field


# ── Generic wrapper (untuk endpoint admin/utility) ───────────────────────────

class APIResponse(BaseModel):
    success: bool = True
    message: str = "OK"
    data: Any = None


# ── Titik data harga (priceHistory) ─────────────────────────────────────────
# Digunakan di dalam StockResponse

class PricePoint(BaseModel):
    date: str
    price: float


# ── GET /api/stocks/{ticker}  &  GET /api/stocks ────────────────────────────
# Harus PERSIS cocok dengan STOCKS_DATA[ticker] di frontend/src/data/stocks.js

class StockOut(BaseModel):
    """
    Response satu saham.
    Field name, sentimentScore, predictedChange, priceHistory harus
    menggunakan camelCase agar cocok dengan frontend.
    """
    name: str
    price: float
    change: float           # % perubahan (nilai absolut ditampilkan, is_up menentukan arah)
    up: bool                # True = harga naik
    sentiment: str          # "positive" | "neutral" | "negative"
    sentimentScore: float   # 0-100
    sector: str
    priceHistory: List[PricePoint]
    prediction: str         # "BUY" | "HOLD" | "SELL"
    predictedChange: str    # "+2.4%" | "-1.8%"
    confidence: float       # 0-100
    insight: str
    reasons: List[str]


# GET /api/stocks → Dict[ticker, StockOut]  (direturn langsung sebagai dict)


# ── GET /api/sentiment/{ticker} ──────────────────────────────────────────────

class SentimentDay(BaseModel):
    day: str    # "Sen" | "Sel" | dll
    score: float


class SentimentOut(BaseModel):
    score: float           # skor sentimen saat ini 0-100
    label: str             # "positive" | "neutral" | "negative"
    history: List[SentimentDay]


# GET /api/sentiment/history → List[SentimentDay]  (direturn langsung)


# ── GET /api/predict/{ticker} ────────────────────────────────────────────────

class PredictionOut(BaseModel):
    signal: str            # "BUY" | "HOLD" | "SELL"
    predictedChange: str   # "+2.4%"
    confidence: float      # 0-100
    insight: str
    reasons: List[str]


# ── GET /api/news ─────────────────────────────────────────────────────────────

class NewsItem(BaseModel):
    title: str
    tag: str    # "Positive" | "Negative" | "Neutral"
    stock: str  # ticker atau "IHSG"


# ── POST /api/chat ────────────────────────────────────────────────────────────

class ChatMsg(BaseModel):
    role: str       # "user" | "assistant"
    content: str


class ChatRequest(BaseModel):
    messages: List[ChatMsg]
    system: Optional[str] = None
    session_id: Optional[str] = None  # [NEW] ID Sesi dari frontend


class ChatBlock(BaseModel):
    type: str = "text"
    text: str


class ChatResponse(BaseModel):
    """Anthropic-compatible response — dipakai oleh sendChatMessage() di api.js."""
    content: List[ChatBlock]
    session_id: Optional[str] = None  # [NEW] Kembalikan ID sesi ke frontend


# ── POST /api/sentiment/analyze ──────────────────────────────────────────────

class AnalyzeRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=5000,
                      description="Teks berita/opini yang akan dianalisis.")
    stock_ticker: Optional[str] = Field(
        default=None,
        description="Opsional: simpan hasil ke tabel sentiment_analysis untuk ticker ini.")


class AnalyzeData(BaseModel):
    label: str    # "positive" | "neutral" | "negative"
    score: float  # 0-100


# ── POST /api/predict ─────────────────────────────────────────────────────────

class PredictFeatures(BaseModel):
    """
    Fitur untuk input model LSTM.
    Minimal: close_price atau sentiment_score.
    Makin lengkap makin akurat.
    """
    close_price:     Optional[float] = None
    open_price:      Optional[float] = None
    high_price:      Optional[float] = None
    low_price:       Optional[float] = None
    volume:          Optional[float] = None
    sentiment_score: Optional[float] = Field(default=50.0, ge=0, le=100)


class TimeSeriesPoint(BaseModel):
    """Satu titik data OHLCV historis untuk input LSTM."""
    close:  Optional[float] = None
    open:   Optional[float] = None
    high:   Optional[float] = None
    low:    Optional[float] = None
    volume: Optional[float] = None


class PredictRequest(BaseModel):
    ticker: str = Field(..., description="Kode saham, mis. BBRI")
    features: PredictFeatures = Field(default_factory=PredictFeatures)
    time_series: Optional[List[TimeSeriesPoint]] = Field(
        default=None,
        max_length=30,
        description="Opsional: hingga 30 titik historis OHLCV untuk "
                    "membangun input time-series LSTM yang lebih akurat.",
    )


class PredictData(BaseModel):
    signal: str        # "BUY" | "HOLD" | "SELL"
    confidence: float  # 0-100


# ── GET /api/health ───────────────────────────────────────────────────────────

class HealthData(BaseModel):
    database: str           # "connected" | "disconnected"
    prediction_model: str   # "loaded (keras lstm)" | "fallback (rule-based)"
    sentiment_model: str    # "loaded (sklearn)" | "fallback (rule-based)"
    environment: str
    version: str