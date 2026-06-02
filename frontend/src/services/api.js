// src/services/api.js
// Semua koneksi ke backend ada di sini.
// Jika VITE_API_URL tidak diset, langsung pakai data statis (tidak ada fetch sama sekali).

import { STOCKS_DATA, NEWS_DATA, SENTIMENT_HISTORY } from "../data/stocks.js";

const BASE_URL = import.meta.env.VITE_API_URL || "";

// Jika BASE_URL kosong, anggap backend belum ada — skip fetch, langsung fallback
const hasBackend = BASE_URL.length > 0;

// ─── Helper ────────────────────────────────────────────────
async function safeFetch(url, options = {}) {
  if (!hasBackend) return null; // ← langsung fallback, tidak ada error proxy
  try {
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`[API] ${url} failed:`, err.message);
    return null;
  }
}

// ─── Stock API ─────────────────────────────────────────────

/**
 * Ambil data saham dari backend.
 * Endpoint backend: GET /api/stocks/:ticker
 * Fallback: data statis dari stocks.js
 */
export async function fetchStockData(ticker) {
  const data = await safeFetch(`${BASE_URL}/stocks/${ticker}`);
  if (data) return data;
  // Fallback ke data statis
  return STOCKS_DATA[ticker] || null;
}

/**
 * Ambil semua saham yang dipantau.
 * Endpoint backend: GET /api/stocks
 * Fallback: semua data statis
 */
export async function fetchAllStocks() {
  const data = await safeFetch(`${BASE_URL}/stocks`);
  if (data) return data;
  return STOCKS_DATA;
}

// ─── Sentiment API ─────────────────────────────────────────

/**
 * Ambil analisis sentimen untuk ticker tertentu.
 * Endpoint backend: GET /api/sentiment/:ticker
 * Fallback: sentimentScore dari data statis
 */
export async function fetchSentiment(ticker) {
  const data = await safeFetch(`${BASE_URL}/sentiment/${ticker}`);
  if (data) return data;
  return {
    score: STOCKS_DATA[ticker]?.sentimentScore || 50,
    label: STOCKS_DATA[ticker]?.sentiment || "neutral",
    history: SENTIMENT_HISTORY,
  };
}

/**
 * Ambil histori sentimen mingguan.
 * Endpoint backend: GET /api/sentiment/history
 */
export async function fetchSentimentHistory() {
  const data = await safeFetch(`${BASE_URL}/sentiment/history`);
  return data || SENTIMENT_HISTORY;
}

// ─── Prediction API ────────────────────────────────────────

/**
 * Ambil prediksi AI untuk saham tertentu.
 * Endpoint backend: GET /api/predict/:ticker
 * Fallback: data prediksi statis
 */
export async function fetchPrediction(ticker) {
  const data = await safeFetch(`${BASE_URL}/predict/${ticker}`);
  if (data) return data;
  const s = STOCKS_DATA[ticker];
  return {
    signal: s?.prediction || "HOLD",
    predictedChange: s?.predictedChange || "0%",
    confidence: s?.confidence || 50,
    insight: s?.insight || "-",
    reasons: s?.reasons || [],
  };
}

// ─── News API ──────────────────────────────────────────────

/**
 * Ambil berita terkini terkait saham.
 * Endpoint backend: GET /api/news
 */
export async function fetchNews() {
  const data = await safeFetch(`${BASE_URL}/news`);
  return data || NEWS_DATA;
}

// ─── AI Chat (Gemini via Backend) ─────────────────────────

/**
 * Kirim pesan ke Gemini via backend proxy.
 * Endpoint: POST /api/chat
 * Catatan: Tidak menggunakan safeFetch agar pesan error spesifik dari
 * FastAPI (misal: API Key salah, Limit, dll) bisa diteruskan ke UI.
 */
export async function sendChatMessage({ messages, systemPrompt }) {
  if (!hasBackend) {
    throw new Error(
      "Mode Offline aktif. Chatbot AI membutuhkan koneksi ke server backend.",
    );
  }

  try {
    const res = await fetch(`${BASE_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, system: systemPrompt }),
    });

    // Jika HTTP status bukan 200 OK
    if (!res.ok) {
      // Coba ekstrak pesan error dari FastAPI (berada di properti 'detail')
      let errorMsg = `HTTP Error ${res.status}`;
      try {
        const errData = await res.json();
        if (errData && errData.detail) {
          errorMsg = errData.detail; // Pesan seperti "Format Gemini API Key tidak valid..."
        }
      } catch (parseErr) {
        // Abaikan jika response bukan JSON
      }

      throw new Error(errorMsg);
    }

    const data = await res.json();
    if (data && data.content) {
      return data.content;
    }

    throw new Error(
      "Respons dari server tidak memiliki format content yang valid.",
    );
  } catch (err) {
    console.error("[Chat API Error]", err.message);
    // Lempar error ke atas agar komponen React/Vue kamu bisa menangkap
    // dan menampilkannya di dalam UI (misal: di bubble chat berwarna merah)
    throw err;
  }
}
