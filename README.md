# 📊 FinSight — AI Stock Sentiment & Prediction Platform

Platform analisis sentimen pasar dan prediksi pergerakan saham berbasis AI, dirancang khusus untuk memandu investor Gen Z di Indonesia. Proyek ini dikembangkan sebagai bagian dari **Capstone Project Fintech CC2026**.

```text
finsight/
├── frontend/   React + Vite (UI)
└── backend/    Python FastAPI + PostgreSQL (API + AI Integration)

Untuk menjalankan aplikasi di lingkungan lokal, jalankan dua terminal secara bersamaan:

//Terminal 1 — Backend (FastAPI)
cd backend

# 1. Buat dan aktifkan virtual environment
python -m venv venv
# Windows: venv\Scripts\activate.bat
# Linux/Mac: source venv/bin/activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Setup .env — edit DATABASE_URL dan GEMINI_API_KEY
cp .env.example .env
# nano .env
# 4. Jalankan migrasi database + start server
alembic upgrade head
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

//Terminal 2 — Frontend (React Vite)
cd frontend

# 1. Install dependencies
npm install

# 2. Pastikan .env mengarah ke backend lokal
cat .env
# VITE_API_URL=http://localhost:8000/api

# 3. Jalankan dev server
npm run dev
```

## 📝 Catatan

- Model `.pkl` tidak termasuk — letakkan file Anda di `backend/ai_models/`
- Jika model tidak ada, backend tetap berjalan dengan rule-based fallback
- Data bersifat edukatif — bukan rekomendasi investasi resmi
