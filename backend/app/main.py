"""
app/main.py — FinSight FastAPI entry point.

Startup sequence:
  1. Init DB tables
  2. Seed data (stocks + news)
  3. Load SentimentService
  4. Load PredictionService (Keras LSTM)

Endpoints:
  GET  /api/health
  GET  /api/stocks          GET /api/stocks/{ticker}
  GET  /api/sentiment/history
  GET  /api/sentiment/{ticker}
  POST /api/sentiment/analyze
  GET  /api/predict/{ticker}
  POST /api/predict
  GET  /api/news
  POST /api/chat
  GET  /api/insight/daily
  GET  /api/insight/ihsg
"""
from contextlib import asynccontextmanager
from typing import Any
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, RedirectResponse

from app.core.config import settings
from app.core.logging_config import setup_logging, get_logger
from app.core.dependencies import (
    set_sentiment_service, set_prediction_service,
    get_sentiment_service, get_prediction_service,
)
from app.database.database import init_db, check_db, SessionLocal
from app.services.sentiment_service import SentimentService
from app.services.prediction_service import PredictionService
from app.services.stock_service import seed_stocks
from app.services.news_service import seed_news
from app.schemas.schemas import APIResponse, HealthData

from app.api.stocks     import router as stocks_router
from app.api.sentiment  import router as sentiment_router
from app.api.prediction import router as prediction_router
from app.api.news       import router as news_router
from app.api.chat       import router as chat_router
from app.api.insight    import router as insight_router

setup_logging()
logger = get_logger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("=" * 60)
    logger.info(f"🚀 Memulai {settings.APP_NAME} v{settings.APP_VERSION}")

    try:
        init_db()
    except Exception as e:
        logger.critical(f"Gagal init DB: {e}"); raise

    db = SessionLocal()
    try:
        seed_stocks(db)
        seed_news(db)
    except Exception as e:
        logger.error(f"Seed gagal: {e}")
    finally:
        db.close()

    s_svc = SentimentService()
    s_svc.load_model(settings.SENTIMENT_MODEL_PATH)
    set_sentiment_service(s_svc)

    p_svc = PredictionService()
    p_svc.load_model(settings.PREDICTION_MODEL_PATH)
    set_prediction_service(p_svc)

    logger.info(f"✅ Backend siap  → http://localhost:{settings.PORT}")
    logger.info(f"   Swagger UI   → http://localhost:{settings.PORT}/docs")
    logger.info("=" * 60)

    yield

    logger.info("🛑 Shutdown.")


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description=(
        "**FinSight** — Analisis sentimen & prediksi saham AI.\n\n"
        "Model: LSTM dual-input (`finsight_model.keras`)\n\n"
        "> *Data edukatif — bukan rekomendasi investasi.*"
    ),
    docs_url="/docs", redoc_url="/redoc", openapi_url="/openapi.json",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(404)
async def not_found(request: Request, exc: Any) -> JSONResponse:
    return JSONResponse(status_code=404,
        content={"success": False, "message": "Endpoint tidak ditemukan.",
                 "path": str(request.url.path)})


@app.exception_handler(Exception)
async def unhandled(request: Request, exc: Exception) -> JSONResponse:
    logger.exception(f"Unhandled: {exc}")
    return JSONResponse(status_code=500,
        content={"success": False, "message": str(exc)})


@app.get("/api/health", tags=["Health"], response_model=APIResponse,
         summary="Status backend, DB, dan model AI")
async def health() -> APIResponse:
    db_ok = check_db()
    try:
        s  = get_sentiment_service()
        sm = "loaded (sklearn)" if s.is_loaded else "fallback (rule-based)"
    except RuntimeError:
        sm = "not initialized"
    try:
        p  = get_prediction_service()
        pm = "loaded (keras lstm)" if p.is_loaded else "fallback (rule-based)"
    except RuntimeError:
        pm = "not initialized"
    return APIResponse(
        success=db_ok,
        message="Berjalan." if db_ok else "DB tidak terhubung.",
        data=HealthData(
            database="connected" if db_ok else "disconnected",
            prediction_model=pm, sentiment_model=sm,
            environment=settings.ENVIRONMENT, version=settings.APP_VERSION,
        ).model_dump(),
    )


_P = "/api"
app.include_router(stocks_router,     prefix=_P)
app.include_router(sentiment_router,  prefix=_P)
app.include_router(prediction_router, prefix=_P)
app.include_router(news_router,       prefix=_P)
app.include_router(chat_router,       prefix=_P)
app.include_router(insight_router,    prefix=_P)


@app.get("/", include_in_schema=False)
async def root() -> RedirectResponse:
    return RedirectResponse("/docs")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app",
                host=settings.HOST, port=settings.PORT,
                reload=settings.DEBUG,
                log_level=settings.LOG_LEVEL.lower())
