"""
app/api/chat.py  ──  FIXED v5 (Menggunakan SDK Resmi Google)
==========================================================================
"""

from typing import List
import uuid
from fastapi import APIRouter, HTTPException
import google.generativeai as genai

from app.core.dependencies import DbSession
from app.core.config import settings
from app.schemas.schemas import ChatRequest, ChatResponse, ChatBlock
from app.models.db_models import ChatHistory
from app.core.logging_config import get_logger

logger = get_logger(__name__)
router = APIRouter(prefix="/chat", tags=["AI Chat"])

@router.post("", summary="Kirim pesan ke Google Gemini", response_model=ChatResponse)
async def chat_with_gemini(req: ChatRequest, db: DbSession) -> ChatResponse:
    api_key = settings.GEMINI_API_KEY
    if not api_key:
        raise HTTPException(503, detail="GEMINI_API_KEY belum dikonfigurasi di backend/.env")

        # 1. Konfigurasi SDK
    try:
        genai.configure(api_key=api_key)
        # Pastikan baris ini TIDAK di-hardcode
        model_name = settings.GEMINI_MODEL or "gemini-2.5-flash"
    except Exception as e:
        logger.error(f"Gagal konfigurasi API Key: {e}")
        raise HTTPException(401, detail="API Key tidak valid atau ditolak oleh Google.")

    # 2. Siapkan System Prompt
    system_instruction = req.system if req.system else None
    
    try:
        model = genai.GenerativeModel(
            model_name=model_name,
            system_instruction=system_instruction
        )
    except Exception as e:
        logger.error(f"Gagal inisialisasi model: {e}")
        raise HTTPException(500, detail="Gagal memuat model AI.")

    # 3. Rakit Histori Chat
    formatted_history = []
    # Ambil semua pesan KECUALI yang terakhir (sebagai histori)
    for m in req.messages[:-1]:
        role = "model" if m.role == "assistant" else "user"
        formatted_history.append({"role": role, "parts": [m.content]})
    
    # Ambil pesan terakhir sebagai prompt utama
    current_prompt = req.messages[-1].content if req.messages else ""

    # 4. Panggil Model
    try:
        chat_session = model.start_chat(history=formatted_history)
        response = chat_session.send_message(current_prompt)
        reply = response.text
    except Exception as e:
        logger.error(f"Gemini SDK Error: {e}")
        raise HTTPException(502, detail=f"Gagal memproses respons AI. Pastikan API Key valid. Detail: {str(e)}")

    # 5. Ekstrak teks dan simpan ke Database
    blocks: List[ChatBlock] = [ChatBlock(type="text", text=reply)]
    generated_session_id = req.session_id or str(uuid.uuid4())

    if current_prompt and reply:
        try:
            db_chat = ChatHistory(
                session_id=generated_session_id,
                question=current_prompt[:2000],
                answer=reply[:5000]
            )
            db.add(db_chat)
            db.commit()
            logger.info(f"Chat history tersimpan untuk sesi: {generated_session_id}")
        except Exception as e:
            db.rollback()
            logger.warning(f"Gagal menyimpan chat history ke DB: {e}")

    return ChatResponse(content=blocks, session_id=generated_session_id)