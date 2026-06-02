"""
app/api/prediction.py
GET  /api/predict/{ticker}  → {signal, predictedChange, confidence, insight, reasons}
POST /api/predict           → {success, data:{signal, confidence}}
"""
from typing import Any, Dict, List, Optional
from fastapi import APIRouter, HTTPException
from app.core.dependencies import DbSession, PredictionDep
from app.schemas.schemas import APIResponse, PredictRequest, PredictData
from app.services.stock_service import get_by_ticker
from app.core.logging_config import get_logger

logger = get_logger(__name__)
router = APIRouter(prefix="/predict", tags=["Prediction"])


@router.get("/{ticker}", summary="Prediksi AI untuk saham tertentu")
async def get_prediction(ticker: str, db: DbSession, svc: PredictionDep) -> Dict[str, Any]:
    """
    Jalankan model LSTM dengan data dari DB, return:
    {signal, predictedChange, confidence, insight, reasons}
    Cocok dengan fetchPrediction(ticker) di api.js.
    """
    ticker = ticker.upper()
    stock  = get_by_ticker(db, ticker)
    if not stock:
        raise HTTPException(404, detail=f"Saham '{ticker}' tidak ditemukan.")

    # Bangun features dari data DB
    features = {
        "close_price"    : stock.current_price or 0,
        "open_price"     : (stock.current_price or 0) * (1 - (stock.change_percent or 0) / 100),
        "volume"         : 1_000_000,
        "sentiment_score": stock.sentiment_score or 50,
    }
    result = svc.predict_stock(ticker, features, price_history=stock.price_history or [])

    # Update cache prediksi di DB
    try:
        stock.prediction_signal = result["signal"]
        stock.predicted_change  = result["predictedChange"]
        stock.confidence        = result["confidence"]
        stock.insight           = result["insight"]
        db.commit()
    except Exception as e:
        logger.warning(f"Gagal update cache prediksi: {e}")
        db.rollback()

    return {
        "signal"         : result["signal"],
        "predictedChange": result["predictedChange"],
        "confidence"     : result["confidence"],
        "insight"        : result["insight"],
        "reasons"        : stock.reasons or [],
    }


@router.post("", summary="Prediksi real-time dengan custom features", response_model=APIResponse)
async def run_prediction(req: PredictRequest, db: DbSession, svc: PredictionDep) -> APIResponse:
    """
    POST /api/predict

    Minimal request:
    {"ticker":"BBRI","features":{"close_price":5100,"open_price":5000,"sentiment_score":78}}

    Dengan time_series historis (akurasi lebih baik):
    {"ticker":"BBRI","features":{"sentiment_score":78},
     "time_series":[{"close":4900,...},{"close":5100,...}]}

    Response:
    {"success":true,"data":{"signal":"BUY","confidence":87.5}}
    """
    ticker   = req.ticker.upper()
    features = req.features.model_dump(exclude_none=True)

    # Konversi time_series dari request
    price_history: Optional[list] = None
    if req.time_series:
        price_history = [
            {"price": pt.close or 0, "date": f"t-{len(req.time_series)-i}"}
            for i, pt in enumerate(req.time_series)
        ]
        last = req.time_series[-1]
        features.setdefault("close_price", last.close or features.get("close_price", 0))
        features.setdefault("open_price",  last.open  or features.get("open_price", 0))
    else:
        stock = get_by_ticker(db, ticker)
        if stock:
            price_history = stock.price_history or []
            features.setdefault("sentiment_score", stock.sentiment_score or 50)

    result = svc.predict_stock(ticker, features, price_history=price_history)

    # Simpan & update cache di DB
    stock = get_by_ticker(db, ticker)
    if stock:
        try:
            svc.save_prediction(
                db=db, stock_id=stock.id,
                signal=result["signal"],
                predicted_change=result["predictedChange"],
                confidence=result["confidence"],
                insight=result["insight"],
                raw_output=result.get("raw"),
                features=features,
            )
            stock.prediction_signal = result["signal"]
            stock.predicted_change  = result["predictedChange"]
            stock.confidence        = result["confidence"]
            stock.insight           = result["insight"]
            db.commit()
        except Exception as e:
            logger.warning(f"Gagal simpan prediksi: {e}")
            db.rollback()

    return APIResponse(
        success=True, message="Prediksi selesai.",
        data=PredictData(
            signal=result["signal"], confidence=result["confidence"]
        ).model_dump(),
    )
