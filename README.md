# 📊 FinSight — AI Stock Sentiment & Prediction Platform

Platform analisis sentimen dan prediksi saham berbasis AI untuk generasi muda Indonesia.

```
finsight/
├── frontend/   React + Vite (UI)
└── backend/    Python FastAPI + PostgreSQL (API + AI)
```

---

## ⚡ Quick Start

Jalankan dua terminal secara bersamaan:

### Terminal 1 — Backend (FastAPI)

```bash
cd backend

# 1. Buat virtual environment
python -m venv venv
source venv/bin/activate        # Linux/Mac
# venv\Scripts\activate.bat     # Windows

# 2. Install dependencies
pip install -r requirements.txt

# 3. Setup .env — edit DATABASE_URL sesuai PostgreSQL Anda
cp .env.example .env
# nano .env

# 4. (Opsional) Buat dummy model jika .pkl belum ada
python ai_models/create_dummy_models.py

# 5. Jalankan migrasi + start server
alembic upgrade head
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

Backend berjalan di → **http://localhost:8000**  
Swagger UI → **http://localhost:8000/docs**

---

### Terminal 2 — Frontend (React Vite)

```bash
cd frontend

# 1. Install dependencies
npm install

# 2. Pastikan .env sudah benar
cat .env
# VITE_API_URL=http://localhost:8000/api

# 3. Jalankan dev server
npm run dev
```

Frontend berjalan di → **http://localhost:5173**

---

## 🗂 Struktur Lengkap

```
finsight/
│
├── frontend/                   React + Vite (tidak diubah)
│   ├── src/
│   │   ├── components/         Dashboard, AIChat, NewsPanel, dll
│   │   ├── services/api.js     Semua fetch ke backend
│   │   ├── hooks/useStockData  Data fetching hook
│   │   └── data/stocks.js      Fallback data statis
│   ├── .env                    VITE_API_URL=http://localhost:8000/api
│   └── package.json
│
└── backend/                    FastAPI + PostgreSQL
    ├── app/
    │   ├── api/                Semua endpoint REST
    │   │   ├── stocks.py       GET /api/stocks, GET /api/stocks/{ticker}
    │   │   ├── sentiment.py    GET /api/sentiment/*, POST /api/sentiment/analyze
    │   │   ├── prediction.py   GET /api/predict/{ticker}, POST /api/predict
    │   │   ├── news.py         GET /api/news
    │   │   └── chat.py         POST /api/chat (Anthropic proxy)
    │   ├── models/             SQLAlchemy ORM (5 tabel)
    │   ├── schemas/            Pydantic v2 schemas
    │   ├── services/           AI inference + CRUD
    │   ├── database/           SQLAlchemy engine
    │   ├── core/               Config, logging, dependencies
    │   └── main.py             App entry point
    ├── ai_models/
    │   ├── sentiment_model.pkl         ← letakkan model Anda di sini
    │   ├── stock_prediction_model.pkl  ← letakkan model Anda di sini
    │   └── create_dummy_models.py      (untuk testing)
    ├── alembic/                DB migrations
    ├── tests/                  39 pytest tests
    ├── requirements.txt
    └── .env                    Konfigurasi database & API key
```

---

## 🔌 API Endpoints

| Method | Endpoint | Keterangan |
|--------|----------|-----------|
| GET | `/api/health` | Health check |
| GET | `/api/stocks` | Semua saham |
| GET | `/api/stocks/{ticker}` | Satu saham |
| GET | `/api/sentiment/history` | 7-hari sentimen |
| GET | `/api/sentiment/{ticker}` | Sentimen saham |
| POST | `/api/sentiment/analyze` | Analisis teks AI |
| GET | `/api/predict/{ticker}` | Prediksi saham |
| POST | `/api/predict` | Prediksi custom features |
| GET | `/api/news` | Berita pasar |
| POST | `/api/chat` | AI Chat (Claude proxy) |

---

## 🛠 Requirements

| Komponen | Versi minimum |
|----------|--------------|
| Python | 3.12+ |
| Node.js | 18+ |
| PostgreSQL | 14+ |

---

## 🧪 Menjalankan Tests

```bash
cd backend
pytest tests/test_api.py -v
```

---

## 📝 Catatan

- **Frontend tidak diubah sama sekali** — backend dibangun 100% kompatibel
- Model `.pkl` tidak termasuk — letakkan file Anda di `backend/ai_models/`
- Jika model tidak ada, backend tetap berjalan dengan rule-based fallback
- Data bersifat edukatif — bukan rekomendasi investasi resmi

---

*FinSight v1.0.0 · Capstone Project · IDX Indonesia*
