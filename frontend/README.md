# FinSight — Stock Intelligence Platform

Platform analisis sentimen dan prediksi saham untuk generasi muda Indonesia.

## Tech Stack

- **Frontend**: React 18 + Vite 5
- **Charts**: Recharts
- **AI Chat**: Anthropic Claude (via API)
- **Styling**: CSS Modules

---

## Cara Menjalankan

### 1. Install Dependencies

```bash
npm install
```

### 2. Konfigurasi Environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
# URL backend (opsional — jika tidak ada, pakai data statis)
VITE_API_URL=http://localhost:8000/api

# Anthropic API Key (untuk fitur AI Chat)
VITE_ANTHROPIC_API_KEY=sk-ant-xxxx
```

### 3. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:5173](http://localhost:5173)

### 4. Build untuk Production

```bash
npm run build
npm run preview
```

---

## Struktur Project

```
finsight/
├── index.html
├── vite.config.js
├── package.json
├── .env.example
└── src/
    ├── main.jsx              # Entry point
    ├── App.jsx               # Root component
    ├── index.css             # Global styles + CSS variables
    ├── data/
    │   └── stocks.js         # Data statis / mock data
    ├── services/
    │   └── api.js            # Semua koneksi ke backend & Anthropic API
    ├── hooks/
    │   └── useStockData.js   # Custom hook untuk fetch data saham
    └── components/
        ├── Dashboard.jsx     # Layout utama dashboard
        ├── Sidebar.jsx       # Menu navigasi
        ├── StockCard.jsx     # Kartu saham pilihan
        ├── MetricCard.jsx    # Kartu metrik (sentiment, volume, dll)
        ├── PriceChart.jsx    # Grafik pergerakan harga
        ├── SentimentChart.jsx # Grafik tren sentimen
        ├── AIInsight.jsx     # Panel prediksi & insight AI
        ├── AIChat.jsx        # Chat interaktif dengan AI
        ├── NewsPanel.jsx     # Panel berita terkini
        └── EduModal.jsx      # Modal edukasi
```

---

## Koneksi ke Backend

File `src/services/api.js` mengatur semua koneksi API. Setiap fungsi punya **fallback ke data statis** jika backend belum siap.

### Endpoint yang Dibutuhkan Backend

| Method | Endpoint             | Keterangan                          |
|--------|---------------------|-------------------------------------|
| GET    | `/api/stocks`        | Semua data saham                    |
| GET    | `/api/stocks/:ticker`| Data saham spesifik                 |
| GET    | `/api/sentiment/:ticker` | Analisis sentimen               |
| GET    | `/api/sentiment/history` | Histori sentimen 7 hari        |
| GET    | `/api/predict/:ticker`   | Prediksi AI per saham           |
| GET    | `/api/news`          | Berita terkini                      |
| POST   | `/api/chat`          | Proxy ke Anthropic (opsional)       |

### Format Response Backend

**GET /api/stocks/:ticker**
```json
{
  "name": "Bank BRI",
  "price": 5100,
  "change": 2.3,
  "up": true,
  "sentiment": "positive",
  "sentimentScore": 78,
  "sector": "Perbankan",
  "priceHistory": [{"date": "Jan", "price": 4200}, ...]
}
```

**GET /api/predict/:ticker**
```json
{
  "signal": "BUY",
  "predictedChange": "+2.4%",
  "confidence": 78,
  "insight": "Sentimen positif...",
  "reasons": ["Positive Earnings", "High Volume"]
}
```

**POST /api/chat**
```json
// Request
{
  "system": "system prompt...",
  "messages": [{"role": "user", "content": "..."}]
}

// Response — sama dengan format Anthropic API
{
  "content": [{"type": "text", "text": "..."}]
}
```

---

## Fitur

- [x] Dashboard saham pilihan (BBRI, TLKM, GOTO, ASII)
- [x] Analisis sentimen dengan score dan visualisasi
- [x] Prediksi arah pergerakan (BUY / HOLD / SELL)
- [x] Grafik harga historis interaktif
- [x] AI Chat (powered by Claude)
- [x] Panel berita terkini
- [x] Trending keywords
- [x] Modal edukasi
- [x] Responsif (mobile, tablet, desktop)
- [x] Koneksi ke backend dengan fallback data statis

---

## Tim CSP D-Tone
FinSight — #1 Platform Analisis Sentimen Saham untuk Generasi Muda Indonesia
