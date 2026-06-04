# 📊 FinSight — AI Stock Sentiment & Prediction Platform

Platform analisis sentimen pasar dan prediksi pergerakan saham berbasis AI. Dirancang khusus dengan antarmuka yang modern untuk memandu investor Gen Z di Indonesia dalam memahami dinamika pasar saham.

Proyek ini dikembangkan sebagai bagian dari **Capstone Project Fintech CC2026**.

> **⚠️ Penafian (Disclaimer):**
> Seluruh data, analisis sentimen, dan prediksi yang dihasilkan oleh platform ini bersifat **edukatif murni**. Platform ini BUKAN aplikasi penasihat keuangan dan tidak boleh dijadikan acuan utama untuk keputusan investasi atau *trading* di dunia nyata.

---

## 🏗️ Struktur Proyek

```text
finsight/
├── frontend/   # React + Vite (User Interface)
└── backend/    # Python FastAPI + PostgreSQL (API Server & AI Engine)
```

---

## 🛠️ Prasyarat Instalasi (Prerequisites)

Sebelum memulai, pastikan Anda telah menginstal perangkat lunak berikut di komputer Anda:
- **Python** (versi 3.12)
- **Node.js** (versi 18 LTS)
- **PostgreSQL** (Pastikan server database berjalan)

---

## 🚀 Cara Menjalankan Aplikasi Lokal

Untuk menjalankan aplikasi ini, Anda perlu membuka **dua terminal** (Command Prompt/Terminal) secara bersamaan untuk menjalankan sisi Backend dan Frontend.

### Terminal 1: Setup & Menjalankan Backend (FastAPI)

Buka terminal pertama dan masuk ke folder `backend`:
```bash
cd backend
```

**1. Buat dan aktifkan Virtual Environment (Lingkungan Virtual)**
```bash
# Membuat virtual environment
python -m venv venv

# Mengaktifkan venv (Pilih salah satu sesuai OS Anda):
# Untuk Windows (Command Prompt):
venv\Scripts\activate.bat

# Untuk Windows (PowerShell):
.\venv\Scripts\Activate.ps1

# Untuk Linux / Mac:
source venv/bin/activate
```

**2. Instal dependensi library Python**
```bash
pip install -r requirements.txt
```

**3. Konfigurasi Environment Variables**
Salin file template `.env` dan sesuaikan nilainya (khususnya `DATABASE_URL` dan `GEMINI_API_KEY`).
```bash
# Untuk Windows (Command Prompt / PowerShell):
copy .env.example .env

# Untuk Linux / Mac:
cp .env.example .env
```

**4. Siapkan Database & Jalankan Migrasi**
```bash
# Menjalankan migrasi database
alembic upgrade head

# Menjalankan server backend
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
*Backend sekarang berjalan di: `http://localhost:8000` (Anda bisa mengecek API Docs di `http://localhost:8000/docs`).*

---

### Terminal 2: Setup & Menjalankan Frontend (React + Vite)

Buka terminal kedua dan masuk ke folder `frontend`:
```bash
cd frontend
```

**1. Instal dependensi NPM**
```bash
npm install
```

**2. Konfigurasi Environment Variables**
Pastikan file `.env` di folder frontend sudah mengarah ke backend lokal Anda. File `.env` harus berisi:
```env
VITE_API_URL=http://localhost:8000/api
```

**3. Jalankan server pengembangan Frontend**
```bash
npm run dev
```
*Frontend sekarang dapat diakses melalui link yang muncul di terminal (biasanya `http://localhost:5173`).*

---

## 🤖 Catatan Terkait Model AI & Chatbot

Platform ini menggunakan sistem AI hibrida (Lokal & Cloud API):

- **Model AI Lokal (.keras & .pkl):** File model untuk prediksi dan sentimen inti **tidak disertakan** di repositori ini karena ukurannya yang besar. Anda harus meletakkan file model tersebut secara manual di dalam folder `backend/ai_models/`.
- **Sistem Fallback:** Jika file model lokal tidak ditemukan saat server dijalankan, backend tidak akan *crash*. Sistem secara otomatis akan beralih ke *rule-based fallback* agar aplikasi tetap bisa digunakan untuk demonstrasi.
- **Gemini Chatbot:** Fitur asisten AI interaktif memerlukan `GEMINI_API_KEY` yang valid di dalam file `.env` backend.

---

## 👨‍💻 Pengembang

**muhammad rizqi anugrah**
*Informatics Engineering*