"""
app/api/chat.py
AI Chat FinSight berbasis Gemini + fallback rule-based.

Perilaku:
- Gemini tetap menjadi mesin utama jika GEMINI_API_KEY tersedia.
- Prompt Gemini diberi konteks data saham dari backend agar tidak mengarang.
- Jika Gemini error/API limit/API key kosong, backend tetap membalas memakai fallback lokal.
- Riwayat chat tetap disimpan ke PostgreSQL.
"""
from __future__ import annotations
from typing import List, Optional
import re
import uuid
from fastapi import APIRouter
import google.generativeai as genai

from app.core.dependencies import DbSession
from app.core.config import settings
from app.schemas.schemas import ChatRequest, ChatResponse, ChatBlock
from app.models.db_models import ChatHistory, Stock, News
from app.services.stock_service import to_stock_dict
from app.data.fallback_dataset import TOP15_TICKERS
from app.core.logging_config import get_logger

logger = get_logger(__name__)
router = APIRouter(prefix="/chat", tags=["AI Chat"])

EDU_DISCLAIMER = (
    "\n\nCatatan: Analisis ini bersifat edukatif dan bukan rekomendasi beli/jual final. "
    "Tetap cek risiko, fundamental, dan kondisi pasar terbaru."
)


def _find_tickers(text: str) -> List[str]:
    text_up = (text or "").upper()
    found = []
    for t in TOP15_TICKERS:
        if re.search(rf"\b{re.escape(t)}\b", text_up):
            found.append(t)
    return found


def _label_id(label: Optional[str]) -> str:
    return {"positive": "Bullish", "negative": "Bearish", "neutral": "Netral"}.get(label or "neutral", "Netral")


def _signal_id(sig: Optional[str]) -> str:
    return {"BUY": "Naik", "SELL": "Turun", "HOLD": "Sideways"}.get(sig or "HOLD", "Sideways")


def _build_stock_context(db, user_prompt: str) -> str:
    tickers = _find_tickers(user_prompt)
    if tickers:
        rows = db.query(Stock).filter(Stock.ticker.in_(tickers)).all()
    else:
        # Jika user tidak menyebut ticker, berikan gambaran singkat pasar 15 saham.
        rows = db.query(Stock).filter(Stock.ticker.in_(TOP15_TICKERS)).all()

    order = {t: i for i, t in enumerate(TOP15_TICKERS)}
    rows = sorted(rows, key=lambda s: order.get(s.ticker, 999))
    if not rows:
        return "Tidak ada data saham di database. Gunakan jawaban edukatif umum."

    lines = []
    selected_rows = rows if tickers else rows[:8]
    for s in selected_rows:
        d = to_stock_dict(s)
        recent_news = (
            db.query(News)
            .filter(News.stock_id == s.id)
            .order_by(News.published_at.desc())
            .limit(2)
            .all()
        )
        news_text = "; ".join([f"[{n.tag}] {n.title}" for n in recent_news]) or "belum ada berita spesifik"
        
        # PERBAIKAN: Memisahkan pembentukan string sebelum melakukan .replace()
        stock_text = (
            f"- {s.ticker} ({s.company_name}, sektor {s.sector}): "
            f"harga Rp {d['price']:,.0f}, perubahan {'+' if d['up'] else '-'}{d['change']:.2f}%, "
            f"sentimen {_label_id(d['sentiment'])} ({d['sentimentScore']:.1f}/100), "
            f"sinyal {_signal_id(d['prediction'])} ({d['prediction']}), confidence {d['confidence']:.1f}%, "
            f"alasan: {', '.join(d['reasons'][:3])}; berita: {news_text}."
        ).replace(",", ".")
        
        lines.append(stock_text)

    if not tickers and len(rows) > len(selected_rows):
        lines.append(f"- Total saham dipantau: {len(rows)}. Ticker: {', '.join(TOP15_TICKERS)}.")
    return "\n".join(lines)


def _fallback_reply(db, prompt: str) -> str:
    tickers = _find_tickers(prompt)
    if tickers:
        stock = db.query(Stock).filter(Stock.ticker == tickers[0]).first()
        if stock:
            d = to_stock_dict(stock)
            direction = _signal_id(d["prediction"])
            sent = _label_id(d["sentiment"])
            return (
                f"**Analisis singkat {stock.ticker}**\n\n"
                f"Harga terakhir berada di sekitar **Rp {d['price']:,.0f}** dengan perubahan harian "
                f"**{'+' if d['up'] else '-'}{d['change']:.2f}%**. "
                f"Sentimen saat ini **{sent}** dengan skor **{d['sentimentScore']:.1f}/100**. "
                f"Sinyal edukatif dari sistem menunjukkan arah **{direction}** "
                f"dengan confidence **{d['confidence']:.1f}%**.\n\n"
                f"Faktor yang perlu diperhatikan: {', '.join(d['reasons'][:4])}. "
                f"Untuk keputusan investasi, sebaiknya tetap dikombinasikan dengan analisis fundamental, teknikal, dan manajemen risiko."
                f"{EDU_DISCLAIMER}"
            ).replace(",", ".")

    # Jawaban edukasi umum jika tidak menyebut ticker.
    return (
        "Saya adalah **FinSight AI Analyst**. Saat ini saya bisa membantu membaca sentimen, "
        "arah harga, berita, dan sinyal edukatif untuk 15 saham pantauan: "
        f"{', '.join(TOP15_TICKERS)}.\n\n"
        "Coba tanyakan misalnya: **Apa sentimen BBRI?**, **Bagaimana prospek BBCA?**, "
        "atau **saham mana yang perlu diwaspadai hari ini?**"
        f"{EDU_DISCLAIMER}"
    )


def _system_prompt(user_system: Optional[str], context: str) -> str:
    base = """
Kamu adalah FinSight AI Analyst, asisten analisis saham berbasis data untuk aplikasi FinSight.
Fokus jawaban hanya pada: analisis saham, sentimen pasar, berita, prediksi arah edukatif, dan edukasi investasi dasar.
Gunakan bahasa Indonesia yang jelas, praktis, dan tidak terlalu panjang.
Jangan memberi klaim pasti seperti "pasti naik" atau "wajib beli".
Jangan memberikan rekomendasi finansial mutlak. Gunakan istilah edukatif seperti "sinyal sementara", "perlu dipantau", dan "bahan pertimbangan".
Jika data kurang, katakan bahwa data terbatas.

KONTEKS DATA BACKEND FINSIGHT:
{context}
""".strip().format(context=context)
    if user_system:
        return f"{base}\n\nPreferensi frontend: {user_system}"
    return base


@router.post("", summary="Kirim pesan ke Gemini sebagai FinSight AI Analyst", response_model=ChatResponse)
async def chat_with_gemini(req: ChatRequest, db: DbSession) -> ChatResponse:
    generated_session_id = req.session_id or str(uuid.uuid4())
    current_prompt = req.messages[-1].content if req.messages else ""
    context = _build_stock_context(db, current_prompt)
    reply = ""

    api_key = settings.GEMINI_API_KEY
    model_name = settings.GEMINI_MODEL or "gemini-1.5-flash"

    if api_key:
        try:
            genai.configure(api_key=api_key)
            model = genai.GenerativeModel(
                model_name=model_name,
                system_instruction=_system_prompt(req.system, context),
            )

            formatted_history = []
            for m in req.messages[:-1]:
                role = "model" if m.role == "assistant" else "user"
                formatted_history.append({"role": role, "parts": [m.content]})

            chat_session = model.start_chat(history=formatted_history)
            response = chat_session.send_message(current_prompt)
            reply = (response.text or "").strip()
            if reply and "bukan rekomendasi" not in reply.lower():
                reply += EDU_DISCLAIMER
        except Exception as e:
            logger.warning(f"Gemini error/limit, pakai fallback lokal: {e}")
            reply = _fallback_reply(db, current_prompt)
    else:
        logger.info("GEMINI_API_KEY kosong, pakai fallback lokal untuk AI Chat.")
        reply = _fallback_reply(db, current_prompt)

    if not reply:
        reply = _fallback_reply(db, current_prompt)

    blocks: List[ChatBlock] = [ChatBlock(type="text", text=reply)]

    if current_prompt and reply:
        try:
            db_chat = ChatHistory(
                session_id=generated_session_id,
                question=current_prompt[:2000],
                answer=reply[:5000],
            )
            db.add(db_chat)
            db.commit()
        except Exception as e:
            db.rollback()
            logger.warning(f"Gagal menyimpan chat history ke DB: {e}")
    return ChatResponse(content=blocks, session_id=generated_session_id)