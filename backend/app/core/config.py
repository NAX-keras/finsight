"""
app/core/config.py ── FIXED v4 (Secure Env Mode)
==========================================================================
"""

from __future__ import annotations
import os
from functools import lru_cache
from typing import List, Optional
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import model_validator
from dotenv import load_dotenv

# Paksa load .env secara konsisten
load_dotenv()

class Settings(BaseSettings):
    # ── Aplikasi ────────────────────────────────────────────
    APP_NAME: str = "FinSight Backend"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    ENVIRONMENT: str = "development"

    # ── Server ──────────────────────────────────────────────
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    # ── Database (Membaca Aman dari .env) ────────────────────
    DATABASE_URL: str = os.getenv("DATABASE_URL", "")

    # ── CORS ────────────────────────────────────────────────
    CORS_ORIGINS: str = "http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173"

    # ── Google Gemini ────────────────────────────────────────
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    GEMINI_MODEL: str = "gemini-1.5-flash"  

    # ── AI Models ───────────────────────────────────────────
    PREDICTION_MODEL_PATH: str = "ai_models/finsight_model.keras"
    SENTIMENT_MODEL_PATH: str = "ai_models/sentiment_model.pkl"

    # ── Logging ─────────────────────────────────────────────
    LOG_LEVEL: str = "INFO"

    @property
    def cors_list(self) -> List[str]:
        return [o.strip() for o in self.CORS_ORIGINS.split(",") if o.strip()]

    @model_validator(mode="after")
    def validate_and_fix_db_url(self) -> "Settings":
        """Memastikan DATABASE_URL ada dan otomatis memperbaiki prefix driver."""
        if not self.DATABASE_URL:
            raise ValueError("❌ ERROR: DATABASE_URL tidak ditemukan di file .env!")
        
        # Auto-fix jika link dari Neon masih menggunakan postgresql:// biasa
        if self.DATABASE_URL.startswith("postgresql://"):
            self.DATABASE_URL = self.DATABASE_URL.replace("postgresql://", "postgresql+psycopg2://", 1)
        return self

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

@lru_cache()
def get_settings() -> Settings:
    return Settings()

settings = get_settings()