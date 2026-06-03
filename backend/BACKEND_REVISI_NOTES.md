# Revisi Backend FinSight — 15 Saham + Gemini AI Analyst

Perubahan utama:

1. **GOTO dihapus total dari watchlist backend**
   - Data GOTO lama di database akan dibersihkan saat startup melalui `seed_stocks()`.
   - Endpoint `/api/stocks/GOTO` mengembalikan 404 bahwa GOTO sudah dihapus.

2. **Backend mendukung 15 saham**
   - BBCA, BREN, DSSA, DCII, BBRI, BMRI, TPIA, BYAN, AMMN, TLKM, ASII, SRAJ, BBNI, PANI, DNET.

3. **Dataset fallback dipindahkan ke backend**
   - File: `app/data/fallback_dataset.py`
   - Berisi data harga, price history, sentimen, prediksi awal, alasan, dan berita/tweet dummy.

4. **yfinance dibuat aman untuk deployment**
   - Backend tetap mencoba yfinance.
   - Jika yfinance error/rate-limit/kosong, backend langsung memakai fallback dataset.
   - Bisa dimatikan total lewat `.env`:
     ```env
     ENABLE_YFINANCE=false
     ```

5. **Berita/sentimen 15 saham**
   - Endpoint `/api/news` sudah menyediakan data untuk 15 saham.
   - Data berita saat ini berasal dari dataset sentimen/tweet sebagai dummy backend.

6. **Prediksi dibuat aman**
   - Jika model Keras bisa jalan, pakai model.
   - Jika model gagal, otomatis fallback rule-based.

7. **AI Chat tetap pakai Gemini**
   - Endpoint `/api/chat` dibuat sebagai **FinSight AI Analyst**.
   - Gemini diberi konteks data saham dari backend.
   - Jika API key kosong/error/limit, chat tetap membalas dengan fallback lokal.
   - Jawaban diarahkan sebagai edukasi, bukan rekomendasi beli/jual mutlak.

## Endpoint tetap

```text
GET  /api/health
GET  /api/stocks
GET  /api/stocks/{ticker}
GET  /api/news
GET  /api/sentiment/history
GET  /api/sentiment/{ticker}
POST /api/sentiment/analyze
GET  /api/predict/{ticker}
POST /api/predict
GET  /api/insight/daily
GET  /api/insight/ihsg
POST /api/chat
```

## Catatan deploy Hugging Face

Jika yfinance sering error/rate-limit, set:

```env
ENABLE_YFINANCE=false
```

Dengan begitu backend langsung memakai dataset fallback dan lebih stabil.
