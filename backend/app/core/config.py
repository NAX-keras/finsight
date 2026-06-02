"""
app/core/config.py  ── FIXED v2 (Pydantic v2 Optimized)
==========================================================================
CHANGELOG v2:
  ✅ FIX: Auto-generate DATABASE_URL agar selalu sinkron dengan variabel POSTGRES_*.
  ✅ Menerapkan SettingsConfigDict standar Pydantic v2.
  ✅ Menjadikan DATABASE_URL opsional (jika kosong, akan dirakit otomatis).
==========================================================================
"""

from __future__ import annotations
from functools import lru_cache
from typing import List, Optional
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import model_validator


class Settings(BaseSettings):
    # ── Aplikasi ────────────────────────────────────────────
    APP_NAME: str = "FinSight Backend"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    ENVIRONMENT: str = "development"

    # ── Server ──────────────────────────────────────────────
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    # ── Database ────────────────────────────────────────────
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "postgres"
    POSTGRES_HOST: str = "localhost"
    POSTGRES_PORT: int = 5432
    POSTGRES_DB: str = "finsight_db"
    
    # Dibuat Optional. Jika di .env tidak ada, akan otomatis dirakit oleh validator di bawah.
    DATABASE_URL: Optional[str] = None

    # ── CORS ────────────────────────────────────────────────
    CORS_ORIGINS: str = "http://localhost:5173,http://localhost:3000"

    # ── Google Gemini ────────────────────────────────────────
    GEMINI_API_KEY: str = ""
    GEMINI_MODEL: str = "gemini-1.5-flash"  # Disamakan dengan default di API kamu sebelumnya

    # ── AI Models ───────────────────────────────────────────
    PREDICTION_MODEL_PATH: str = "ai_models/finsight_model.keras"
    SENTIMENT_MODEL_PATH: str = "ai_models/sentiment_model.pkl"

    # ── Logging ─────────────────────────────────────────────
    LOG_LEVEL: str = "INFO"

    @property
    def cors_list(self) -> List[str]:
        return [o.strip() for o in self.CORS_ORIGINS.split(",") if o.strip()]

    @model_validator(mode="after")
    def assemble_db_connection(self) -> "Settings":
        """
        Jika DATABASE_URL tidak diisi di .env, rakit otomatis menggunakan 
        kredensial POSTGRES_ yang ada agar tidak pernah out-of-sync.
        """
        if not self.DATABASE_URL:
            self.DATABASE_URL = (
                f"postgresql+psycopg2://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}"
                f"@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
            )
        return self

    # Konfigurasi standar untuk Pydantic v2
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


@lru_cache()
def get_settings() -> Settings:
    return Settings()


settings = get_settings()