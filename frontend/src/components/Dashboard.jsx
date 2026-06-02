/**
 * Dashboard.jsx — FinSight Frontend (FIXED)
 *
 * PERUBAHAN DARI VERSI LAMA:
 * 1. ✅ Terhubung ke backend via API (tidak lagi hardcoded)
 * 2. ✅ AI Chat menggunakan /api/chat proxy (bukan langsung Anthropic)
 * 3. ✅ Tanggal dinamis dari new Date()
 * 4. ✅ IHSG live dari /api/insight/ihsg
 * 5. ✅ Insight Harian real-time dari /api/insight/daily
 * 6. ✅ Label prediksi sinkron (BUY→Naik, HOLD→Sideways, SELL→Turun)
 * 7. ✅ Filter berita berfungsi (state sentimentFilter)
 * 8. ✅ Stats berita dihitung dari data real
 * 9. ✅ SettingsPage disederhanakan (hapus profil user palsu)
 * 10.✅ Semua data hardcoded diganti dengan state + fallback
 */

import { useState, useEffect, useRef } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ── CSS ─────────────────────────────────────────────────────── */
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Syne:wght@700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #334155; border-radius: 99px; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
  @keyframes pulse-dot { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.4; transform:scale(.7); } }
  @keyframes typing { 0%,80%,100% { opacity:0; transform:scale(.8); } 40% { opacity:1; transform:scale(1); } }
  .fade-up   { animation: fadeUp .45s ease both; }
  .fade-up-1 { animation: fadeUp .45s .06s ease both; }
  .fade-up-2 { animation: fadeUp .45s .12s ease both; }
  .fade-up-3 { animation: fadeUp .45s .18s ease both; }
  .fade-up-4 { animation: fadeUp .45s .24s ease both; }
  .fade-up-5 { animation: fadeUp .45s .30s ease both; }
  .nav-item:hover  { background: rgba(16,185,129,.12) !important; color: #e2e8f0 !important; }
  .stock-tab:hover { box-shadow: 0 6px 24px rgba(16,185,129,.18) !important; border-color: #10b981 !important; }
  .news-row:hover  { background: #f0fdf4 !important; }
  .card-hover { transition: transform .2s, box-shadow .2s; }
  .card-hover:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,.10) !important; }
  .btn-green { transition: background .15s; }
  .btn-green:hover { background: #059669 !important; }
  .ai-send:hover { background: #059669 !important; }
  .ai-send { transition: background .15s; }
  .chip:hover { background: rgba(16,185,129,.2) !important; border-color: #10b981 !important; color: #10b981 !important; cursor:pointer; }
  .chip { transition: all .15s; }
  .dot1 { animation: typing 1.4s infinite .0s; }
  .dot2 { animation: typing 1.4s infinite .2s; }
  .dot3 { animation: typing 1.4s infinite .4s; }
  .filter-btn-active { background: #0f172a !important; color: #fff !important; border-color: #10b981 !important; box-shadow: 0 4px 16px rgba(16,185,129,.2); }
`;

/* ── BACKEND CONFIG ─────────────────────────────────────────── */
const API_BASE = import.meta.env.VITE_API_URL || "";
const HAS_BACKEND = API_BASE.length > 0;

async function apiFetch(path, options = {}) {
  if (!HAS_BACKEND) return null;
  try {
    const r = await fetch(`${API_BASE}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}

/* ── DATA MAPPING ────────────────────────────────────────────── */
// Pemetaan format backend → format yang dipakai komponen UI
const SIG_TO_ID = { BUY: "Naik", HOLD: "Sideways", SELL: "Turun" };
const SIG_COLOR = { BUY: "#10b981", HOLD: "#f59e0b", SELL: "#ef4444" };
const SENT_LABEL = {
  positive: "Bullish",
  neutral: "Netral",
  negative: "Bearish",
};
const TAG_STYLE = {
  Positive: { bg: "#dcfce7", tc: "#15803d", dot: "#22c55e" },
  Negative: { bg: "#fee2e2", tc: "#dc2626", dot: "#ef4444" },
  Neutral: { bg: "#f1f5f9", tc: "#475569", dot: "#94a3b8" },
};
const TAG_TO_ID = {
  Positive: "Positif",
  Negative: "Negatif",
  Neutral: "Netral",
};

function mapApiToStocksArray(apiDict) {
  return Object.entries(apiDict).map(([ticker, d]) => ({
    ticker,
    name: d.name,
    price: (d.price || 0).toLocaleString("id-ID"),
    change: `${d.up ? "+" : "-"}${Math.abs(d.change || 0).toFixed(1)}%`,
    up: d.up,
    sentiment: Math.round(d.sentimentScore || 50),
    label: SENT_LABEL[d.sentiment] || "Netral",
    prediction: SIG_TO_ID[d.prediction] || "Sideways",
    predColor: SIG_COLOR[d.prediction] || "#f59e0b",
    sector: d.sector || "",
  }));
}

function mapApiToPriceData(apiDict) {
  const result = {};
  Object.entries(apiDict).forEach(([ticker, d]) => {
    result[ticker] = (d.priceHistory || []).map((p) => ({
      date: p.date,
      price: p.price,
    }));
  });
  return result;
}

function mapApiToNewsDict(apiList, tickers) {
  const dict = {};
  tickers.forEach((t) => {
    dict[t] = [];
  });
  (apiList || []).forEach((n) => {
    const t = n.stock;
    if (!dict[t]) return;
    const s = TAG_STYLE[n.tag] || TAG_STYLE.Neutral;
    dict[t].push({ title: n.title, tag: TAG_TO_ID[n.tag] || n.tag, ...s });
  });
  return dict;
}

/* ── FALLBACK DATA (statis — jika backend tidak tersedia) ────── */
const FB_STOCKS = [
  {
    ticker: "BBRI",
    name: "Bank Rakyat Indonesia",
    price: "5.100",
    change: "+2.3%",
    up: true,
    sentiment: 72,
    label: "Bullish",
    prediction: "Naik",
    predColor: "#10b981",
    sector: "Perbankan",
  },
  {
    ticker: "TLKM",
    name: "Telkom Indonesia",
    price: "3.870",
    change: "+0.8%",
    up: true,
    sentiment: 61,
    label: "Bullish",
    prediction: "Sideways",
    predColor: "#f59e0b",
    sector: "Telekomunikasi",
  },
  {
    ticker: "GOTO",
    name: "GoTo Gojek Tokopedia",
    price: "68",
    change: "-1.4%",
    up: false,
    sentiment: 38,
    label: "Bearish",
    prediction: "Turun",
    predColor: "#ef4444",
    sector: "Teknologi",
  },
  {
    ticker: "ASII",
    name: "Astra International",
    price: "4.450",
    change: "+0.5%",
    up: true,
    sentiment: 65,
    label: "Bullish",
    prediction: "Naik",
    predColor: "#10b981",
    sector: "Otomotif",
  },
];
const FB_PRICE = {
  BBRI: [
    { date: "Jan", price: 4200 },
    { date: "Feb", price: 4050 },
    { date: "Mar", price: 4400 },
    { date: "Apr", price: 4320 },
    { date: "Mei", price: 4680 },
    { date: "Jun", price: 4550 },
    { date: "Jul", price: 4900 },
    { date: "Agu", price: 5100 },
  ],
  TLKM: [
    { date: "Jan", price: 3600 },
    { date: "Feb", price: 3550 },
    { date: "Mar", price: 3700 },
    { date: "Apr", price: 3680 },
    { date: "Mei", price: 3750 },
    { date: "Jun", price: 3800 },
    { date: "Jul", price: 3820 },
    { date: "Agu", price: 3870 },
  ],
  GOTO: [
    { date: "Jan", price: 90 },
    { date: "Feb", price: 85 },
    { date: "Mar", price: 80 },
    { date: "Apr", price: 75 },
    { date: "Mei", price: 72 },
    { date: "Jun", price: 70 },
    { date: "Jul", price: 65 },
    { date: "Agu", price: 68 },
  ],
  ASII: [
    { date: "Jan", price: 4100 },
    { date: "Feb", price: 4200 },
    { date: "Mar", price: 4150 },
    { date: "Apr", price: 4300 },
    { date: "Mei", price: 4380 },
    { date: "Jun", price: 4420 },
    { date: "Jul", price: 4400 },
    { date: "Agu", price: 4450 },
  ],
};
const FB_SENT_HIST = [
  { day: "Sen", score: 58 },
  { day: "Sel", score: 64 },
  { day: "Rab", score: 52 },
  { day: "Kam", score: 71 },
  { day: "Jum", score: 68 },
  { day: "Sab", score: 75 },
  { day: "Min", score: 72 },
];
const FB_NEWS = {
  BBRI: [
    {
      title: "BBRI catat laba bersih Rp 12,7T kuartal ini",
      tag: "Positif",
      bg: "#dcfce7",
      tc: "#15803d",
      dot: "#22c55e",
    },
    {
      title: "Ekspansi kredit UMKM BBRI naik 18% YoY",
      tag: "Positif",
      bg: "#dcfce7",
      tc: "#15803d",
      dot: "#22c55e",
    },
    {
      title: "Analis rekomendasikan BUY untuk BBRI",
      tag: "Positif",
      bg: "#dcfce7",
      tc: "#15803d",
      dot: "#22c55e",
    },
    {
      title: "Suku bunga BI berpotensi pengaruhi NIM bank",
      tag: "Netral",
      bg: "#f1f5f9",
      tc: "#475569",
      dot: "#94a3b8",
    },
  ],
  TLKM: [
    {
      title: "TLKM ekspansi layanan 5G di 12 kota baru",
      tag: "Positif",
      bg: "#dcfce7",
      tc: "#15803d",
      dot: "#22c55e",
    },
    {
      title: "Pendapatan TLKM stabil di tengah persaingan",
      tag: "Netral",
      bg: "#f1f5f9",
      tc: "#475569",
      dot: "#94a3b8",
    },
    {
      title: "Dividen TLKM diperkirakan tetap menarik",
      tag: "Positif",
      bg: "#dcfce7",
      tc: "#15803d",
      dot: "#22c55e",
    },
    {
      title: "Kompetisi paket data makin ketat di 2025",
      tag: "Negatif",
      bg: "#fee2e2",
      tc: "#dc2626",
      dot: "#ef4444",
    },
  ],
  GOTO: [
    {
      title: "GOTO masih dalam tekanan jual asing",
      tag: "Negatif",
      bg: "#fee2e2",
      tc: "#dc2626",
      dot: "#ef4444",
    },
    {
      title: "Rugi bersih GOTO belum menunjukkan pemulihan",
      tag: "Negatif",
      bg: "#fee2e2",
      tc: "#dc2626",
      dot: "#ef4444",
    },
    {
      title: "Analis pertanyakan profitabilitas GOTO jangka panjang",
      tag: "Negatif",
      bg: "#fee2e2",
      tc: "#dc2626",
      dot: "#ef4444",
    },
    {
      title: "GOTO umumkan efisiensi operasional baru",
      tag: "Netral",
      bg: "#f1f5f9",
      tc: "#475569",
      dot: "#94a3b8",
    },
  ],
  ASII: [
    {
      title: "Penjualan mobil ASII naik 12% bulan ini",
      tag: "Positif",
      bg: "#dcfce7",
      tc: "#15803d",
      dot: "#22c55e",
    },
    {
      title: "ASII diversifikasi bisnis ke sektor EV",
      tag: "Positif",
      bg: "#dcfce7",
      tc: "#15803d",
      dot: "#22c55e",
    },
    {
      title: "Kurs rupiah pengaruhi margin impor komponen",
      tag: "Netral",
      bg: "#f1f5f9",
      tc: "#475569",
      dot: "#94a3b8",
    },
    {
      title: "Prospek ASII solid untuk H2 2025",
      tag: "Positif",
      bg: "#dcfce7",
      tc: "#15803d",
      dot: "#22c55e",
    },
  ],
};
const FB_INSIGHT = {
  dominant: "Bullish",
  dominant_sub: "68% saham IDX trending positif",
  watchlist: "BBRI & ASII",
  watchlist_sub: "Momentum positif berlanjut",
  attention: "TLKM",
  attention_sub: "Volume mulai meningkat signifikan",
  bullish_pct: 68,
  bearish_pct: 21,
  neutral_pct: 11,
};

/* ── Lainnya ─────────────────────────────────────────────────── */
const keywords = [
  { word: "bullish", size: 21, weight: 800, color: "#10b981" },
  { word: "profit", size: 13, weight: 600, color: "#2563eb" },
  { word: "growth", size: 23, weight: 900, color: "#0891b2" },
  { word: "risk", size: 12, weight: 500, color: "#dc2626" },
  { word: "buy signal", size: 16, weight: 700, color: "#10b981" },
  { word: "sell-off", size: 12, weight: 500, color: "#ef4444" },
  { word: "dividend", size: 15, weight: 600, color: "#7c3aed" },
  { word: "rebound", size: 19, weight: 800, color: "#0284c7" },
  { word: "earnings", size: 14, weight: 600, color: "#1d4ed8" },
  { word: "rally", size: 13, weight: 500, color: "#059669" },
];
const eduContent = [
  {
    icon: "😊",
    title: "Apa itu Sentimen?",
    color: "#10b981",
    bg: "#dcfce7",
    body: "Sentimen adalah gambaran 'mood' pasar terhadap suatu saham — apakah orang-orang cenderung optimis (bullish), pesimis (bearish), atau biasa saja (netral). Sentimen diambil dari analisis berita dan opini publik.",
    tips: [
      "Sentimen Positif / Bullish → Banyak berita & opini yang mendukung kenaikan harga",
      "Sentimen Negatif / Bearish → Banyak kekhawatiran atau berita buruk tentang saham",
      "Sentimen Netral → Pasar belum menunjukkan arah yang jelas",
    ],
  },
  {
    icon: "🔮",
    title: "Apa itu Prediksi Arah?",
    color: "#0891b2",
    bg: "#dbeafe",
    body: "Prediksi arah adalah estimasi apakah harga saham berpotensi naik, turun, atau sideways dalam waktu dekat. Prediksi ini berbasis pola data historis — BUKAN jaminan keuntungan.",
    tips: [
      "↑ Naik → Pola historis menunjukkan potensi kenaikan harga",
      "↓ Turun → Ada indikasi tekanan jual atau tren menurun",
      "→ Sideways → Harga bergerak di kisaran sama, belum ada arah jelas",
    ],
  },
  {
    icon: "⚠️",
    title: "Batas Penggunaan Aplikasi",
    color: "#f59e0b",
    bg: "#fef3c7",
    body: "FinSight adalah alat bantu observasi, BUKAN robot trading atau penasihat keuangan resmi. Output yang ditampilkan bersifat informatif dan tidak boleh dijadikan satu-satunya dasar keputusan investasi.",
    tips: [
      "Selalu lakukan riset mandiri sebelum membeli atau menjual saham",
      "Sentimen dan prediksi bisa salah — pasar selalu memiliki ketidakpastian",
      "Konsultasikan dengan ahli keuangan untuk keputusan investasi besar",
    ],
  },
  {
    icon: "📚",
    title: "Tips untuk Investor Pemula",
    color: "#7c3aed",
    bg: "#ede9fe",
    body: "Mulai investasi tidak harus langsung dengan modal besar. Yang terpenting adalah memahami apa yang kamu beli, kenapa kamu beli, dan berapa risiko yang siap kamu tanggung.",
    tips: [
      "Diversifikasi: jangan taruh semua uang di satu saham",
      "Investasi jangka panjang cenderung lebih aman dari volatilitas harian",
      "Gunakan uang dingin — uang yang tidak dibutuhkan dalam waktu dekat",
    ],
  },
];

/* ── HELPERS ─────────────────────────────────────────────────── */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#0f1729",
        border: "1px solid #1e293b",
        borderRadius: 10,
        padding: "8px 14px",
        color: "#fff",
        fontSize: 12,
        boxShadow: "0 8px 32px rgba(0,0,0,.3)",
      }}
    >
      <div style={{ color: "#94a3b8", marginBottom: 2 }}>{label}</div>
      <div style={{ fontWeight: 800, color: "#10b981" }}>
        Rp {payload[0].value.toLocaleString("id-ID")}
      </div>
    </div>
  );
};

function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <span>
      {time.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })}
    </span>
  );
}

// Format tanggal hari ini dalam Bahasa Indonesia
function getTodayId() {
  return new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* ── AI CHAT PAGE ────────────────────────────────────────────── */
const AI_SYSTEM = `Kamu adalah FinSight AI, asisten cerdas untuk platform analisis sentimen saham FinSight yang ditujukan untuk generasi muda dan investor pemula Indonesia.
Kamu membantu pengguna memahami:
- Sentimen pasar saham (bullish/bearish/netral)
- Prediksi arah pergerakan saham
- Berita dan analisis pasar IDX
- Edukasi investasi dasar untuk pemula
- Saham-saham IDX populer: BBRI, TLKM, GOTO, ASII, dll
Gunakan bahasa Indonesia yang ramah, santai tapi informatif. Selalu ingatkan pengguna bahwa output FinSight bukan rekomendasi investasi resmi.`;

const QUICK_CHIPS = [
  "Apa sentimen BBRI hari ini?",
  "Jelaskan arti Bullish",
  "Tips investasi untuk pemula",
  "Kenapa GOTO turun terus?",
  "Apa itu saham blue chip?",
  "Bedanya sentimen vs prediksi?",
];

function AIPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Halo! Saya **FinSight AI** 👋\n\nSaya siap bantu kamu memahami pasar saham, sentimen, dan prediksi dengan cara yang simpel. Mau tanya apa hari ini?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // ✅ FIX: gunakan backend proxy /api/chat — bukan langsung Anthropic
  const sendMessage = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg) return;
    setInput("");
    const newMessages = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const chatUrl = HAS_BACKEND ? `${API_BASE}/chat` : null;
      if (!chatUrl) throw new Error("Backend tidak tersedia");

      const res = await fetch(chatUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          system: AI_SYSTEM,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const reply =
        data.content?.[0]?.text || "Maaf, terjadi kesalahan. Coba lagi ya!";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `⚠️ ${err.message.includes("503") ? "Gemini API key belum dikonfigurasi. Minta admin mengisi GEMINI_API_KEY di backend .env." : "Gagal terhubung ke AI. Pastikan backend berjalan di localhost:8000."}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatMsg = (text) =>
    text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br/>");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 56px)",
      }}
    >
      <div className="fade-up" style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              background: "linear-gradient(135deg,#10b981,#0891b2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
            }}
          >
            🤖
          </div>
          <div>
            <h1
              style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: 22,
                fontWeight: 800,
                color: "#0f172a",
                margin: 0,
              }}
            >
              FinSight AI
            </h1>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginTop: 2,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#10b981",
                  animation: "pulse-dot 1.5s infinite",
                  display: "inline-block",
                }}
              />
              <span style={{ fontSize: 12, color: "#10b981", fontWeight: 600 }}>
                {HAS_BACKEND
                  ? "Online · Siap membantu"
                  : "Mode Offline · Backend tidak terdeteksi"}
              </span>
            </div>
          </div>
          <div
            style={{
              marginLeft: "auto",
              fontSize: 11,
              color: "#94a3b8",
              background: "#f1f5f9",
              padding: "4px 12px",
              borderRadius: 20,
            }}
          >
            Powered by Gemini AI
          </div>
        </div>
      </div>

      <div
        className="fade-up-1"
        style={{
          flex: 1,
          background: "#fff",
          borderRadius: 20,
          boxShadow: "0 1px 4px rgba(0,0,0,.07)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          border: "1px solid #f1f5f9",
        }}
      >
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 24px 12px" }}>
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 12,
                marginBottom: 20,
                flexDirection: m.role === "user" ? "row-reverse" : "row",
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  flexShrink: 0,
                  background:
                    m.role === "assistant"
                      ? "linear-gradient(135deg,#10b981,#0891b2)"
                      : "linear-gradient(135deg,#6366f1,#8b5cf6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  marginTop: 2,
                }}
              >
                {m.role === "assistant" ? "🤖" : "👤"}
              </div>
              <div
                style={{
                  maxWidth: "72%",
                  padding: "12px 16px",
                  borderRadius:
                    m.role === "user"
                      ? "18px 4px 18px 18px"
                      : "4px 18px 18px 18px",
                  background:
                    m.role === "user"
                      ? "linear-gradient(135deg,#0f172a,#1e3a5f)"
                      : "#f8fafc",
                  color: m.role === "user" ? "#fff" : "#334155",
                  fontSize: 13,
                  lineHeight: 1.7,
                  border: m.role === "assistant" ? "1px solid #f1f5f9" : "none",
                  boxShadow:
                    m.role === "user"
                      ? "0 4px 16px rgba(15,23,41,.2)"
                      : "0 1px 4px rgba(0,0,0,.04)",
                }}
                dangerouslySetInnerHTML={{ __html: formatMsg(m.content) }}
              />
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#10b981,#0891b2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                }}
              >
                🤖
              </div>
              <div
                style={{
                  padding: "14px 18px",
                  borderRadius: "4px 18px 18px 18px",
                  background: "#f8fafc",
                  border: "1px solid #f1f5f9",
                  display: "flex",
                  gap: 5,
                  alignItems: "center",
                }}
              >
                <span
                  className="dot1"
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#10b981",
                    display: "inline-block",
                  }}
                />
                <span
                  className="dot2"
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#10b981",
                    display: "inline-block",
                  }}
                />
                <span
                  className="dot3"
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#10b981",
                    display: "inline-block",
                  }}
                />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        {messages.length <= 1 && (
          <div
            style={{
              padding: "0 24px 14px",
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            {QUICK_CHIPS.map((c) => (
              <button
                key={c}
                className="chip"
                onClick={() => sendMessage(c)}
                style={{
                  background: "rgba(16,185,129,.08)",
                  border: "1px solid rgba(16,185,129,.25)",
                  color: "#0f172a",
                  fontSize: 12,
                  fontWeight: 600,
                  padding: "6px 14px",
                  borderRadius: 20,
                }}
              >
                {c}
              </button>
            ))}
          </div>
        )}
        <div
          style={{
            padding: "14px 20px",
            borderTop: "1px solid #f1f5f9",
            display: "flex",
            gap: 10,
            background: "#fff",
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            placeholder="Tanya tentang saham, sentimen, investasi..."
            disabled={loading}
            style={{
              flex: 1,
              border: "1.5px solid #e2e8f0",
              borderRadius: 12,
              padding: "11px 16px",
              fontSize: 13,
              outline: "none",
              background: "#f8fafc",
              color: "#0f172a",
              fontFamily: "inherit",
            }}
          />
          <button
            className="ai-send"
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            style={{
              background: "#10b981",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "11px 20px",
              fontWeight: 700,
              fontSize: 13,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading || !input.trim() ? 0.6 : 1,
            }}
          >
            Kirim ↑
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── SETTINGS PAGE (disederhanakan — hapus profil user palsu) ── */
function SettingsPage({ stocks }) {
  const [notif, setNotif] = useState({
    insight: true,
    alert: true,
    berita: false,
    prediksi: true,
  });
  const toggleNotif = (k) => setNotif((p) => ({ ...p, [k]: !p[k] }));
  const inputStyle = {
    width: "100%",
    border: "1.5px solid #f1f5f9",
    borderRadius: 10,
    padding: "10px 14px",
    fontSize: 13,
    fontWeight: 600,
    color: "#0f172a",
    background: "#f8fafc",
    outline: "none",
    fontFamily: "inherit",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div className="fade-up">
        <h1
          style={{
            fontFamily: "'Syne',sans-serif",
            fontSize: 24,
            fontWeight: 800,
            color: "#0f172a",
            margin: 0,
          }}
        >
          ⚙️ Pengaturan
        </h1>
        <p style={{ color: "#64748b", fontSize: 13, margin: "4px 0 0" }}>
          Kelola preferensi aplikasi FinSight kamu
        </p>
      </div>

      {/* Saham Dipantau */}
      <div
        className="fade-up-1"
        style={{
          background: "#fff",
          borderRadius: 20,
          padding: "24px 26px",
          boxShadow: "0 1px 4px rgba(0,0,0,.07)",
        }}
      >
        <div
          style={{
            fontFamily: "'Syne',sans-serif",
            fontWeight: 800,
            fontSize: 15,
            color: "#0f172a",
            marginBottom: 18,
          }}
        >
          📈 Saham yang Dipantau
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {stocks.map((s) => (
            <div
              key={s.ticker}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 16px",
                borderRadius: 12,
                background: "#f8fafc",
                border: "1px solid #f1f5f9",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: s.up ? "#dcfce7" : "#fee2e2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 900,
                  fontSize: 11,
                  color: s.up ? "#15803d" : "#dc2626",
                  flexShrink: 0,
                  border: `1.5px solid ${s.up ? "#86efac" : "#fca5a5"}`,
                }}
              >
                {s.ticker}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{ fontWeight: 700, fontSize: 13, color: "#0f172a" }}
                >
                  {s.name}
                </div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>
                  {s.sector}
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div
                  style={{ fontWeight: 800, fontSize: 13, color: "#0f172a" }}
                >
                  Rp {s.price}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: s.up ? "#10b981" : "#ef4444",
                  }}
                >
                  {s.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notifikasi */}
      <div
        className="fade-up-2"
        style={{
          background: "#fff",
          borderRadius: 20,
          padding: "24px 26px",
          boxShadow: "0 1px 4px rgba(0,0,0,.07)",
        }}
      >
        <div
          style={{
            fontFamily: "'Syne',sans-serif",
            fontWeight: 800,
            fontSize: 15,
            color: "#0f172a",
            marginBottom: 18,
          }}
        >
          🔔 Notifikasi
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            {
              key: "insight",
              label: "Insight Harian",
              sub: "Terima ringkasan sentimen setiap pagi",
            },
            {
              key: "alert",
              label: "Alert Sentimen",
              sub: "Notifikasi saat sentimen saham berubah drastis",
            },
            {
              key: "berita",
              label: "Berita Penting",
              sub: "Notifikasi berita yang mempengaruhi saham pilihanmu",
            },
            {
              key: "prediksi",
              label: "Update Prediksi",
              sub: "Notifikasi saat prediksi arah diperbarui",
            },
          ].map((n) => (
            <div
              key={n.key}
              onClick={() => toggleNotif(n.key)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px",
                borderRadius: 12,
                background: "#f8fafc",
                border: `1px solid ${notif[n.key] ? "#bbf7d0" : "#f1f5f9"}`,
                cursor: "pointer",
                transition: "border .2s",
              }}
            >
              <div>
                <div
                  style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}
                >
                  {n.label}
                </div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 3 }}>
                  {n.sub}
                </div>
              </div>
              <div
                style={{
                  width: 46,
                  height: 26,
                  borderRadius: 13,
                  background: notif[n.key] ? "#10b981" : "#e2e8f0",
                  position: "relative",
                  flexShrink: 0,
                  transition: "background .25s",
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "#fff",
                    position: "absolute",
                    top: 3,
                    left: notif[n.key] ? 23 : 3,
                    transition: "left .25s",
                    boxShadow: "0 1px 4px rgba(0,0,0,.25)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tentang */}
      <div
        className="fade-up-3"
        style={{
          background: "linear-gradient(135deg,#080f1e,#0c1f3f)",
          borderRadius: 20,
          padding: "24px 26px",
          border: "1px solid #1e3a5f",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 150,
            height: 150,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(16,185,129,.1),transparent)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            fontFamily: "'Syne',sans-serif",
            fontWeight: 800,
            fontSize: 15,
            color: "#fff",
            marginBottom: 16,
          }}
        >
          ℹ️ Tentang FinSight
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            marginBottom: 16,
          }}
        >
          {[
            { label: "Versi Aplikasi", value: "1.0.0" },
            {
              label: "Terakhir Diperbarui",
              value: getTodayId().split(",")[0] + " ini",
            },
            { label: "Model AI", value: "Keras LSTM + Gemini" },
            { label: "Data Saham", value: "IDX via Yahoo Finance" },
          ].map((f) => (
            <div
              key={f.label}
              style={{
                background: "rgba(255,255,255,.05)",
                borderRadius: 10,
                padding: "10px 14px",
                border: "1px solid rgba(255,255,255,.08)",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  color: "#475569",
                  fontWeight: 600,
                  marginBottom: 3,
                }}
              >
                {f.label}
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>
                {f.value}
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, color: "#475569", lineHeight: 1.7 }}>
          FinSight adalah platform analisis sentimen saham untuk generasi muda
          Indonesia. Dibuat sebagai proyek Capstone — data bersifat edukatif dan
          bukan rekomendasi investasi resmi.
        </div>
        {!HAS_BACKEND && (
          <div
            style={{
              marginTop: 12,
              padding: "10px 14px",
              background: "rgba(245,158,11,.1)",
              border: "1px solid rgba(245,158,11,.3)",
              borderRadius: 10,
              fontSize: 11,
              color: "#f59e0b",
              fontWeight: 600,
            }}
          >
            ⚠️ Mode Offline — Backend tidak terdeteksi. Set
            VITE_API_URL=http://localhost:8000/api di frontend/.env
          </div>
        )}
      </div>
    </div>
  );
}

/* ── MAIN DASHBOARD ──────────────────────────────────────────── */
export default function Dashboard() {
  const [activeStock, setActiveStock] = useState("BBRI");
  const [activePage, setActivePage] = useState("dashboard");
  const [ticker, setTicker] = useState("");
  const [searchError, setSearchError] = useState("");

  // ── State data dari backend (dengan fallback statis) ──
  const [stocks, setStocks] = useState(FB_STOCKS);
  const [priceData, setPriceData] = useState(FB_PRICE);
  const [sentimentHistory, setSentimentHistory] = useState(FB_SENT_HIST);
  const [newsData, setNewsData] = useState(FB_NEWS);
  const [insight, setInsight] = useState(FB_INSIGHT);
  const [ihsg, setIhsg] = useState({
    formatted: "7.412",
    change_str: "+0.64%",
    up: true,
  });
  const [loadingData, setLoadingData] = useState(false);

  // ── Filter berita ──
  const [sentimentFilter, setSentimentFilter] = useState("Semua");
  const [stockFilter, setStockFilter] = useState("BBRI");

  // ── Load semua data saat pertama mount ──
  useEffect(() => {
    if (!HAS_BACKEND) return;
    (async () => {
      setLoadingData(true);
      const [apiStocks, apiSentHist, apiNews, apiInsight, apiIhsg] =
        await Promise.all([
          apiFetch("/stocks"),
          apiFetch("/sentiment/history"),
          apiFetch("/news"),
          apiFetch("/insight/daily"),
          apiFetch("/insight/ihsg"),
        ]);

      if (apiStocks && Object.keys(apiStocks).length > 0) {
        const tickers = Object.keys(apiStocks);
        setStocks(mapApiToStocksArray(apiStocks));
        setPriceData(mapApiToPriceData(apiStocks));
        setNewsData(mapApiToNewsDict(apiNews || [], tickers));
        setStockFilter(tickers[0] || "BBRI");
      }
      if (apiSentHist && apiSentHist.length > 0)
        setSentimentHistory(apiSentHist);
      if (apiInsight) setInsight(apiInsight);
      if (apiIhsg) setIhsg(apiIhsg);
      setLoadingData(false);
    })();
  }, []);

  // ── Refresh prediksi + sentimen saat ganti saham aktif ──
  useEffect(() => {
    if (!HAS_BACKEND || !activeStock) return;
    (async () => {
      const [pred, sent] = await Promise.all([
        apiFetch(`/predict/${activeStock}`),
        apiFetch(`/sentiment/${activeStock}`),
      ]);
      if (pred) {
        setStocks((prev) =>
          prev.map((s) =>
            s.ticker !== activeStock
              ? s
              : {
                  ...s,
                  prediction: SIG_TO_ID[pred.signal] || s.prediction,
                  predColor: SIG_COLOR[pred.signal] || s.predColor,
                },
          ),
        );
      }
      if (sent && sent.history) setSentimentHistory(sent.history);
    })();
  }, [activeStock]);

  const handleSearch = () => {
    const val = ticker.trim().toUpperCase();
    if (!val) return;
    const found = stocks.find((s) => s.ticker === val);
    if (found) {
      setActiveStock(found.ticker);
      setActivePage("dashboard");
      setTicker("");
      setSearchError("");
    } else {
      const available = stocks.map((s) => s.ticker).join(", ");
      setSearchError(`Saham "${val}" tidak ditemukan. Coba: ${available}`);
      setTimeout(() => setSearchError(""), 3000);
    }
  };

  const stock =
    stocks.find((s) => s.ticker === activeStock) || stocks[0] || FB_STOCKS[0];
  const sentColor =
    stock.sentiment >= 60
      ? "#10b981"
      : stock.sentiment >= 40
        ? "#f59e0b"
        : "#ef4444";
  const predArrow =
    stock.prediction === "Naik"
      ? "↑"
      : stock.prediction === "Turun"
        ? "↓"
        : "→";

  // Filtered news untuk halaman berita
  const newsForStock = (newsData[stockFilter] || []).filter(
    (n) => sentimentFilter === "Semua" || n.tag === sentimentFilter,
  );

  // Statistik berita (dihitung dari data real)
  const allNewsFlat = Object.values(newsData).flat();
  const newsTotal = allNewsFlat.length;
  const newsPositif = allNewsFlat.filter((n) => n.tag === "Positif").length;
  const newsNegatif = allNewsFlat.filter((n) => n.tag === "Negatif").length;
  const newsNetral = allNewsFlat.filter((n) => n.tag === "Netral").length;

  const navItems = [
    { icon: "⚡", label: "Dashboard", id: "dashboard" },
    { icon: "📰", label: "Berita", id: "news" },
    { icon: "🎓", label: "Edukasi", id: "edukasi" },
    { icon: "🤖", label: "FinSight AI", id: "ai" },
    { icon: "⚙️", label: "Pengaturan", id: "settings" },
  ];

  return (
    <>
      <style>{globalCSS}</style>
      <div
        style={{
          fontFamily: "'Plus Jakarta Sans',sans-serif",
          background: "#f0f4f8",
          minHeight: "100vh",
          display: "flex",
        }}
      >
        {/* ── SIDEBAR ── */}
        <aside
          style={{
            width: 234,
            background: "#080f1e",
            padding: "26px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            flexShrink: 0,
            position: "sticky",
            top: 0,
            height: "100vh",
            overflowY: "auto",
            borderRight: "1px solid #0f1f38",
          }}
        >
          <div style={{ marginBottom: 28, paddingLeft: 6 }}>
            <div
              style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: 19,
                fontWeight: 800,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  background: "linear-gradient(135deg,#10b981,#0891b2)",
                  borderRadius: 8,
                  width: 30,
                  height: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  flexShrink: 0,
                }}
              >
                <img
                  src="/logo.jpeg"
                  alt="Logo"
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    objectFit: "contain",
                  }}
                />
              </span>
              FinSight
            </div>
            <div
              style={{
                fontSize: 9,
                color: "#1e3a5f",
                marginTop: 4,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                paddingLeft: 38,
                fontWeight: 700,
              }}
            >
              Analisis Sentimen Saham
            </div>
          </div>

          <div
            style={{
              fontSize: 9,
              color: "#1e3a5f",
              fontWeight: 700,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              padding: "0 8px 8px",
            }}
          >
            Menu Utama
          </div>
          {navItems.map(({ icon, label, id }) => {
            const active = activePage === id;
            return (
              <div
                key={id}
                className="nav-item"
                onClick={() => setActivePage(id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 12px",
                  borderRadius: 10,
                  cursor: "pointer",
                  background: active ? "rgba(16,185,129,.15)" : "transparent",
                  color: active ? "#10b981" : "#475569",
                  fontWeight: active ? 700 : 500,
                  fontSize: 13,
                  borderLeft: active
                    ? "3px solid #10b981"
                    : "3px solid transparent",
                }}
              >
                <span style={{ fontSize: 15 }}>{icon}</span>
                {label}
                {id === "ai" && !active && (
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: 9,
                      background: "linear-gradient(135deg,#10b981,#0891b2)",
                      color: "#fff",
                      padding: "2px 6px",
                      borderRadius: 8,
                      fontWeight: 700,
                    }}
                  >
                    AI
                  </span>
                )}
                {active && (
                  <span
                    style={{
                      marginLeft: "auto",
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#10b981",
                      animation: "pulse-dot 2s infinite",
                    }}
                  />
                )}
              </div>
            );
          })}

          {/* ✅ FIX: IHSG Live — data dari backend, bukan hardcoded */}
          <div
            style={{
              marginTop: "auto",
              padding: "16px",
              background:
                "linear-gradient(135deg,rgba(16,185,129,.12),rgba(8,145,178,.08))",
              borderRadius: 14,
              border: "1px solid rgba(16,185,129,.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#10b981",
                  animation: "pulse-dot 1.5s infinite",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontSize: 9,
                  color: "#10b981",
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                }}
              >
                IHSG Live
              </span>
            </div>
            <div
              style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: 26,
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1,
              }}
            >
              {ihsg.formatted}
            </div>
            <div
              style={{
                fontSize: 13,
                color: ihsg.up ? "#10b981" : "#ef4444",
                fontWeight: 700,
                marginTop: 4,
              }}
            >
              {ihsg.up ? "▲" : "▼"} {ihsg.change_str}
            </div>
            <div style={{ fontSize: 10, color: "#334155", marginTop: 8 }}>
              <LiveClock /> · IDX
            </div>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main
          style={{
            flex: 1,
            padding: "28px 28px",
            overflowX: "hidden",
            minWidth: 0,
          }}
        >
          {activePage === "ai" && <AIPage />}

          {/* ════ DASHBOARD PAGE ════ */}
          {activePage === "dashboard" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              {/* Header — ✅ FIX: tanggal dinamis */}
              <div
                className="fade-up"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <div>
                  <h1
                    style={{
                      fontFamily: "'Syne',sans-serif",
                      fontSize: 24,
                      fontWeight: 800,
                      color: "#0f172a",
                      margin: 0,
                      letterSpacing: "-0.5px",
                    }}
                  >
                    Market Overview
                  </h1>
                  <p
                    style={{
                      color: "#64748b",
                      fontSize: 13,
                      margin: "3px 0 0",
                    }}
                  >
                    {getTodayId()} · Pantau sentimen & prediksi saham pilihanmu
                    {loadingData && (
                      <span
                        style={{
                          marginLeft: 8,
                          fontSize: 11,
                          color: "#10b981",
                          fontWeight: 600,
                        }}
                      >
                        ⟳ Memuat data real-time...
                      </span>
                    )}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: 6,
                  }}
                >
                  <div
                    style={{ display: "flex", gap: 10, alignItems: "center" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        background: "#fff",
                        borderRadius: 12,
                        border: `1.5px solid ${searchError ? "#ef4444" : "#e2e8f0"}`,
                        overflow: "hidden",
                        boxShadow: "0 1px 4px rgba(0,0,0,.06)",
                      }}
                    >
                      <input
                        value={ticker}
                        onChange={(e) => {
                          setTicker(e.target.value.toUpperCase());
                          setSearchError("");
                        }}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        placeholder="Cari saham... BBRI, GOTO"
                        style={{
                          border: "none",
                          outline: "none",
                          padding: "10px 14px",
                          fontSize: 13,
                          width: 220,
                          background: "transparent",
                          color: "#0f172a",
                          fontFamily: "inherit",
                        }}
                      />
                      <button
                        className="btn-green"
                        onClick={handleSearch}
                        style={{
                          background: "#10b981",
                          color: "#fff",
                          border: "none",
                          padding: "10px 20px",
                          fontWeight: 700,
                          fontSize: 13,
                          cursor: "pointer",
                          fontFamily: "inherit",
                        }}
                      >
                        Cari
                      </button>
                    </div>
                    <button
                      onClick={() => setActivePage("ai")}
                      className="btn-green"
                      style={{
                        background: "linear-gradient(135deg,#10b981,#0891b2)",
                        color: "#fff",
                        border: "none",
                        padding: "10px 18px",
                        borderRadius: 12,
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        whiteSpace: "nowrap",
                        fontFamily: "inherit",
                      }}
                    >
                      🤖 Tanya AI
                    </button>
                  </div>
                  {searchError ? (
                    <div
                      style={{
                        fontSize: 11,
                        color: "#ef4444",
                        fontWeight: 600,
                        background: "#fee2e2",
                        padding: "4px 12px",
                        borderRadius: 8,
                        border: "1px solid #fecaca",
                      }}
                    >
                      ⚠️ {searchError}
                    </div>
                  ) : (
                    <div
                      style={{
                        fontSize: 11,
                        color: "#94a3b8",
                        fontWeight: 500,
                      }}
                    >
                      Tekan Enter atau klik Cari untuk mencari saham
                    </div>
                  )}
                </div>
              </div>

              {/* ✅ FIX: Insight Harian — data dari /api/insight/daily */}
              <div
                className="fade-up-1"
                style={{
                  borderRadius: 20,
                  padding: "22px 24px",
                  background:
                    "linear-gradient(135deg,#080f1e 0%,#0c1f3f 60%,#0a2540 100%)",
                  border: "1px solid #1e3a5f",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -50,
                    right: -50,
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle,rgba(16,185,129,.1),transparent 70%)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: -30,
                    left: 100,
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle,rgba(8,145,178,.08),transparent 70%)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 18,
                  }}
                >
                  <span style={{ fontSize: 18 }}>✨</span>
                  <span
                    style={{
                      fontFamily: "'Syne',sans-serif",
                      fontWeight: 800,
                      fontSize: 15,
                      color: "#10b981",
                    }}
                  >
                    Insight Harian
                  </span>
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: 11,
                      color: "#334155",
                      background: "rgba(255,255,255,.05)",
                      padding: "3px 10px",
                      borderRadius: 20,
                      border: "1px solid #1e3a5f",
                    }}
                  >
                    {insight.date || getTodayId()}
                  </span>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,1fr)",
                    gap: 14,
                  }}
                >
                  {[
                    {
                      icon: "📊",
                      label: "Sentimen Dominan",
                      value: insight.dominant,
                      sub: insight.dominant_sub,
                      color: "#10b981",
                    },
                    {
                      icon: "👀",
                      label: "Saham Layak Diamati",
                      value: insight.watchlist,
                      sub: insight.watchlist_sub,
                      color: "#38bdf8",
                    },
                    {
                      icon: "⚡",
                      label: "Perlu Diperhatikan",
                      value: insight.attention,
                      sub: insight.attention_sub,
                      color: "#f59e0b",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      style={{
                        background: "rgba(255,255,255,.04)",
                        borderRadius: 14,
                        padding: "16px 18px",
                        border: `1px solid rgba(255,255,255,.05)`,
                        borderLeftWidth: 3,
                        borderLeftColor: item.color,
                        borderLeftStyle: "solid",
                      }}
                    >
                      <div style={{ fontSize: 20, marginBottom: 8 }}>
                        {item.icon}
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          color: "#475569",
                          textTransform: "uppercase",
                          letterSpacing: "0.8px",
                          marginBottom: 5,
                          fontWeight: 600,
                        }}
                      >
                        {item.label}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Syne',sans-serif",
                          fontWeight: 800,
                          fontSize: 17,
                          color: item.color,
                        }}
                      >
                        {item.value}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "#64748b",
                          marginTop: 5,
                          lineHeight: 1.5,
                        }}
                      >
                        {item.sub}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stock Tabs */}
              <div
                className="fade-up-2"
                style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
              >
                {stocks.map((s) => (
                  <div
                    key={s.ticker}
                    className="stock-tab"
                    onClick={() => setActiveStock(s.ticker)}
                    style={{
                      background: activeStock === s.ticker ? "#0f172a" : "#fff",
                      color: activeStock === s.ticker ? "#fff" : "#0f172a",
                      border: `1.5px solid ${activeStock === s.ticker ? "#10b981" : "#e2e8f0"}`,
                      borderRadius: 16,
                      padding: "13px 16px",
                      cursor: "pointer",
                      display: "flex",
                      gap: 14,
                      alignItems: "center",
                      minWidth: 185,
                      boxShadow:
                        activeStock === s.ticker
                          ? "0 4px 24px rgba(16,185,129,.2)"
                          : "0 1px 3px rgba(0,0,0,.05)",
                      transition: "all .2s",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "'Syne',sans-serif",
                          fontWeight: 800,
                          fontSize: 15,
                        }}
                      >
                        {s.ticker}
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          opacity: 0.5,
                          marginTop: 1,
                          fontWeight: 500,
                        }}
                      >
                        {s.sector}
                      </div>
                    </div>
                    <div style={{ marginLeft: "auto", textAlign: "right" }}>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>
                        Rp {s.price}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: s.up ? "#10b981" : "#ef4444",
                          fontWeight: 700,
                        }}
                      >
                        {s.change}
                      </div>
                    </div>
                    <div
                      style={{
                        background: s.predColor + "22",
                        color: s.predColor,
                        fontSize: 10,
                        fontWeight: 800,
                        padding: "4px 9px",
                        borderRadius: 20,
                        whiteSpace: "nowrap",
                        border: `1px solid ${s.predColor}44`,
                      }}
                    >
                      {s.prediction === "Naik"
                        ? "↑"
                        : s.prediction === "Turun"
                          ? "↓"
                          : "→"}{" "}
                      {s.prediction}
                    </div>
                  </div>
                ))}
              </div>

              {/* Metric Cards */}
              <div
                className="fade-up-3"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4,1fr)",
                  gap: 14,
                }}
              >
                {[
                  {
                    label: "Skor Sentimen",
                    value: `${stock.sentiment}%`,
                    sub: stock.label,
                    color: sentColor,
                    icon: "😊",
                  },
                  {
                    label: "Prediksi Arah",
                    value: stock.prediction,
                    sub: "Estimasi jangka pendek",
                    color: stock.predColor,
                    icon:
                      stock.prediction === "Naik"
                        ? "📈"
                        : stock.prediction === "Turun"
                          ? "📉"
                          : "➡️",
                  },
                  {
                    label: "Harga Saat Ini",
                    value: `Rp ${stock.price}`,
                    sub: stock.change + " hari ini",
                    color: stock.up ? "#10b981" : "#ef4444",
                    icon: "💰",
                  },
                  {
                    label: "Sektor",
                    value: stock.sector,
                    sub: activeStock,
                    color: "#7c3aed",
                    icon: "🏭",
                  },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="card-hover"
                    style={{
                      background: "#fff",
                      borderRadius: 18,
                      padding: "20px 20px",
                      boxShadow: "0 1px 4px rgba(0,0,0,.07)",
                      borderTop: `3px solid ${m.color}`,
                    }}
                  >
                    <div style={{ fontSize: 24, marginBottom: 10 }}>
                      {m.icon}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Syne',sans-serif",
                        fontSize: 22,
                        fontWeight: 800,
                        color: "#0f172a",
                        letterSpacing: "-0.5px",
                      }}
                    >
                      {m.value}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: m.color,
                        marginTop: 3,
                      }}
                    >
                      {m.sub}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "#94a3b8",
                        marginTop: 5,
                        fontWeight: 500,
                      }}
                    >
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts Row */}
              <div
                className="fade-up-4"
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr",
                  gap: 18,
                }}
              >
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 20,
                    padding: "22px 24px",
                    boxShadow: "0 1px 4px rgba(0,0,0,.07)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 18,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "'Syne',sans-serif",
                          fontWeight: 800,
                          fontSize: 15,
                          color: "#0f172a",
                        }}
                      >
                        Pergerakan Harga — {activeStock}
                      </div>
                      <div
                        style={{ fontSize: 12, color: "#94a3b8", marginTop: 3 }}
                      >
                        8 bulan terakhir · Data{" "}
                        {HAS_BACKEND ? "real-time" : "historis"}
                      </div>
                    </div>
                    <div
                      style={{
                        background: stock.predColor + "18",
                        color: stock.predColor,
                        fontWeight: 800,
                        fontSize: 12,
                        padding: "5px 14px",
                        borderRadius: 20,
                        border: `1px solid ${stock.predColor}33`,
                      }}
                    >
                      Prediksi: {predArrow} {stock.prediction}
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={170}>
                    <AreaChart data={priceData[activeStock] || []}>
                      <defs>
                        <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="5%"
                            stopColor={stock.up ? "#10b981" : "#ef4444"}
                            stopOpacity={0.18}
                          />
                          <stop
                            offset="95%"
                            stopColor={stock.up ? "#10b981" : "#ef4444"}
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 11, fill: "#94a3b8" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: "#94a3b8" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke={stock.up ? "#10b981" : "#ef4444"}
                        strokeWidth={2.5}
                        fill="url(#pg)"
                        dot={{
                          r: 3,
                          fill: stock.up ? "#10b981" : "#ef4444",
                          strokeWidth: 0,
                        }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div
                  style={{
                    background: "#fff",
                    borderRadius: 20,
                    padding: "22px 24px",
                    boxShadow: "0 1px 4px rgba(0,0,0,.07)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Syne',sans-serif",
                      fontWeight: 800,
                      fontSize: 15,
                      color: "#0f172a",
                      marginBottom: 3,
                    }}
                  >
                    Tren Sentimen
                  </div>
                  <div
                    style={{ fontSize: 12, color: "#94a3b8", marginBottom: 16 }}
                  >
                    7 hari terakhir
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      marginBottom: 20,
                    }}
                  >
                    <div
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        flexShrink: 0,
                        background: `conic-gradient(${sentColor} 0% ${stock.sentiment}%, #e2e8f0 ${stock.sentiment}% 100%)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: `0 0 0 4px ${sentColor}18`,
                      }}
                    >
                      <div
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: "50%",
                          background: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "'Syne',sans-serif",
                          fontWeight: 900,
                          fontSize: 14,
                          color: "#0f172a",
                        }}
                      >
                        {stock.sentiment}%
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "'Syne',sans-serif",
                          fontWeight: 800,
                          fontSize: 17,
                          color: sentColor,
                        }}
                      >
                        {stock.label}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "#94a3b8",
                          lineHeight: 1.6,
                          marginTop: 3,
                        }}
                      >
                        Sentimen pasar
                        <br />
                        untuk {activeStock}
                      </div>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={72}>
                    <BarChart data={sentimentHistory} barSize={13}>
                      <XAxis
                        dataKey="day"
                        tick={{ fontSize: 10, fill: "#94a3b8" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Bar
                        dataKey="score"
                        fill={sentColor}
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* ✅ FIX: Keyword + Stats — bullish/bearish dari data real insight */}
              <div
                className="fade-up-5"
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  padding: "22px 24px",
                  boxShadow: "0 1px 4px rgba(0,0,0,.07)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 6,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Syne',sans-serif",
                      fontWeight: 800,
                      fontSize: 15,
                      color: "#0f172a",
                    }}
                  >
                    🔤 Keyword Trending
                  </div>
                  <button
                    onClick={() => setActivePage("news")}
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#10b981",
                      background: "#dcfce7",
                      border: "none",
                      padding: "4px 14px",
                      borderRadius: 20,
                      cursor: "pointer",
                    }}
                  >
                    Lihat Berita →
                  </button>
                </div>
                <div
                  style={{ fontSize: 12, color: "#94a3b8", marginBottom: 18 }}
                >
                  Berdasarkan analisis berita & sentimen pasar
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 12,
                    alignItems: "center",
                    marginBottom: 24,
                  }}
                >
                  {keywords.map((k) => (
                    <span
                      key={k.word}
                      style={{
                        fontSize: k.size,
                        fontWeight: k.weight,
                        color: k.color,
                        cursor: "pointer",
                        lineHeight: 1.3,
                      }}
                    >
                      {k.word}
                    </span>
                  ))}
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 12,
                  }}
                >
                  {[
                    {
                      label: "Bullish Signal",
                      val: `${insight.bullish_pct}%`,
                      color: "#10b981",
                      bg: "#dcfce7",
                    },
                    {
                      label: "Bearish Signal",
                      val: `${insight.bearish_pct}%`,
                      color: "#ef4444",
                      bg: "#fee2e2",
                    },
                    {
                      label: "Netral",
                      val: `${insight.neutral_pct}%`,
                      color: "#94a3b8",
                      bg: "#f1f5f9",
                    },
                  ].map((s) => (
                    <div
                      key={s.label}
                      style={{
                        textAlign: "center",
                        padding: "14px 8px",
                        borderRadius: 12,
                        background: s.bg,
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'Syne',sans-serif",
                          fontWeight: 900,
                          fontSize: 22,
                          color: s.color,
                        }}
                      >
                        {s.val}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: s.color,
                          marginTop: 4,
                          fontWeight: 600,
                          opacity: 0.8,
                        }}
                      >
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ════ BERITA PAGE ════ */}
          {activePage === "news" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <div className="fade-up">
                <h1
                  style={{
                    fontFamily: "'Syne',sans-serif",
                    fontSize: 24,
                    fontWeight: 800,
                    color: "#0f172a",
                    margin: 0,
                  }}
                >
                  📰 Berita Pasar
                </h1>
                {/* ✅ FIX: tanggal dinamis */}
                <p
                  style={{ color: "#64748b", fontSize: 13, margin: "4px 0 0" }}
                >
                  Berita terkini dan analisis sentimen per saham —{" "}
                  {getTodayId()}
                </p>
              </div>

              {/* Filter */}
              <div
                className="fade-up-1"
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span
                    style={{
                      fontSize: 11,
                      color: "#94a3b8",
                      fontWeight: 600,
                      minWidth: 60,
                    }}
                  >
                    Saham:
                  </span>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {stocks.map((s) => (
                      <button
                        key={s.ticker}
                        onClick={() => setStockFilter(s.ticker)}
                        style={{
                          padding: "7px 16px",
                          borderRadius: 10,
                          border: `1.5px solid ${stockFilter === s.ticker ? "#10b981" : "#e2e8f0"}`,
                          background:
                            stockFilter === s.ticker ? "#0f172a" : "#fff",
                          color: stockFilter === s.ticker ? "#fff" : "#0f172a",
                          fontWeight: 700,
                          fontSize: 13,
                          cursor: "pointer",
                          boxShadow:
                            stockFilter === s.ticker
                              ? "0 4px 16px rgba(16,185,129,.2)"
                              : "none",
                          transition: "all .2s",
                          fontFamily: "inherit",
                        }}
                      >
                        {s.ticker}
                      </button>
                    ))}
                  </div>
                </div>
                {/* ✅ FIX: Filter sentimen berfungsi dengan state */}
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span
                    style={{
                      fontSize: 11,
                      color: "#94a3b8",
                      fontWeight: 600,
                      minWidth: 60,
                    }}
                  >
                    Filter:
                  </span>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {[
                      {
                        label: "Semua",
                        color: "#0f172a",
                        bg: "#f1f5f9",
                        border: "#e2e8f0",
                      },
                      {
                        label: "Positif",
                        color: "#15803d",
                        bg: "#dcfce7",
                        border: "#bbf7d0",
                      },
                      {
                        label: "Negatif",
                        color: "#dc2626",
                        bg: "#fee2e2",
                        border: "#fecaca",
                      },
                      {
                        label: "Netral",
                        color: "#475569",
                        bg: "#f1f5f9",
                        border: "#e2e8f0",
                      },
                    ].map((f) => (
                      <button
                        key={f.label}
                        onClick={() => setSentimentFilter(f.label)}
                        className={
                          sentimentFilter === f.label ? "filter-btn-active" : ""
                        }
                        style={{
                          padding: "7px 16px",
                          borderRadius: 10,
                          border: `1.5px solid ${f.border}`,
                          background: f.bg,
                          color: f.color,
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: "pointer",
                          fontFamily: "inherit",
                          transition: "all .15s",
                        }}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* ✅ FIX: Stats dari data real */}
              <div
                className="fade-up-2"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4,1fr)",
                  gap: 14,
                }}
              >
                {[
                  {
                    label: "Total Berita",
                    value: String(newsTotal),
                    sub: `${stocks.length} saham dipantau`,
                    color: "#0891b2",
                    icon: "📋",
                  },
                  {
                    label: "Sentimen Positif",
                    value: String(newsPositif),
                    sub: `${newsTotal ? Math.round((newsPositif / newsTotal) * 100) : 0}% dari total`,
                    color: "#10b981",
                    icon: "📈",
                  },
                  {
                    label: "Sentimen Negatif",
                    value: String(newsNegatif),
                    sub: `${newsTotal ? Math.round((newsNegatif / newsTotal) * 100) : 0}% dari total`,
                    color: "#ef4444",
                    icon: "📉",
                  },
                  {
                    label: "Sentimen Netral",
                    value: String(newsNetral),
                    sub: `${newsTotal ? Math.round((newsNetral / newsTotal) * 100) : 0}% dari total`,
                    color: "#94a3b8",
                    icon: "➖",
                  },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="card-hover"
                    style={{
                      background: "#fff",
                      borderRadius: 16,
                      padding: "18px 20px",
                      boxShadow: "0 1px 4px rgba(0,0,0,.07)",
                      borderTop: `3px solid ${m.color}`,
                    }}
                  >
                    <div style={{ fontSize: 22, marginBottom: 8 }}>
                      {m.icon}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Syne',sans-serif",
                        fontSize: 22,
                        fontWeight: 800,
                        color: "#0f172a",
                      }}
                    >
                      {m.value}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: m.color,
                        marginTop: 2,
                      }}
                    >
                      {m.sub}
                    </div>
                    <div
                      style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}
                    >
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Grid Berita */}
              <div
                className="fade-up-3"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 18,
                }}
              >
                {stocks.map((s) => (
                  <div
                    key={s.ticker}
                    style={{
                      background: "#fff",
                      borderRadius: 20,
                      padding: "22px 24px",
                      boxShadow: "0 1px 4px rgba(0,0,0,.07)",
                      border:
                        stockFilter === s.ticker
                          ? "1.5px solid #10b981"
                          : "1.5px solid transparent",
                      transition: "border .2s",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 16,
                        paddingBottom: 14,
                        borderBottom: "1px solid #f1f5f9",
                        gap: 10,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          flex: 1,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: 12,
                            flexShrink: 0,
                            background: s.up
                              ? "linear-gradient(135deg,#dcfce7,#bbf7d0)"
                              : "linear-gradient(135deg,#fee2e2,#fecaca)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "'Syne',sans-serif",
                            fontWeight: 900,
                            fontSize: 11,
                            color: s.up ? "#15803d" : "#dc2626",
                            border: `1.5px solid ${s.up ? "#86efac" : "#fca5a5"}`,
                          }}
                        >
                          {s.ticker}
                        </div>
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div
                            style={{
                              fontFamily: "'Syne',sans-serif",
                              fontWeight: 800,
                              fontSize: 13,
                              color: "#0f172a",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {s.name}
                          </div>
                          <div
                            style={{
                              fontSize: 11,
                              color: "#94a3b8",
                              marginTop: 2,
                            }}
                          >
                            {s.sector}
                          </div>
                        </div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 800,
                            color: "#0f172a",
                            fontFamily: "'Syne',sans-serif",
                          }}
                        >
                          Rp {s.price}
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: s.up ? "#10b981" : "#ef4444",
                            marginTop: 2,
                          }}
                        >
                          {s.change}
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      {(newsData[s.ticker] || []).length === 0 ? (
                        <div
                          style={{
                            fontSize: 12,
                            color: "#94a3b8",
                            padding: "10px",
                            textAlign: "center",
                          }}
                        >
                          Belum ada berita
                        </div>
                      ) : (
                        (newsData[s.ticker] || []).map((n, i) => (
                          <div
                            key={i}
                            className="news-row"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "10px 12px",
                              borderRadius: 10,
                              background: "#f8fafc",
                              border: "1px solid #f1f5f9",
                              cursor: "pointer",
                              transition: "background .15s",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                flex: 1,
                                paddingRight: 8,
                              }}
                            >
                              <span
                                style={{
                                  width: 6,
                                  height: 6,
                                  borderRadius: "50%",
                                  background: n.dot,
                                  flexShrink: 0,
                                }}
                              />
                              <span
                                style={{
                                  fontSize: 12,
                                  color: "#334155",
                                  lineHeight: 1.4,
                                }}
                              >
                                {n.title}
                              </span>
                            </div>
                            <span
                              style={{
                                fontSize: 10,
                                fontWeight: 700,
                                padding: "2px 8px",
                                borderRadius: 20,
                                background: n.bg,
                                color: n.tc,
                                whiteSpace: "nowrap",
                              }}
                            >
                              {n.tag}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════ EDUKASI PAGE ════ */}
          {activePage === "edukasi" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <div className="fade-up">
                <h1
                  style={{
                    fontFamily: "'Syne',sans-serif",
                    fontSize: 24,
                    fontWeight: 800,
                    color: "#0f172a",
                    margin: 0,
                  }}
                >
                  🎓 Pusat Edukasi
                </h1>
                <p
                  style={{ color: "#64748b", fontSize: 13, margin: "4px 0 0" }}
                >
                  Pahami cara kerja FinSight sebelum mulai berinvestasi
                </p>
              </div>
              <div
                className="fade-up-1"
                style={{
                  borderRadius: 20,
                  padding: "24px 28px",
                  background: "linear-gradient(135deg,#080f1e,#0c1f3f)",
                  border: "1px solid #1e3a5f",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -50,
                    right: -50,
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle,rgba(16,185,129,.1),transparent)",
                    pointerEvents: "none",
                  }}
                />
                <div style={{ fontSize: 32, marginBottom: 12 }}>👋</div>
                <div
                  style={{
                    fontFamily: "'Syne',sans-serif",
                    fontWeight: 800,
                    fontSize: 20,
                    color: "#fff",
                    marginBottom: 10,
                  }}
                >
                  Halo, Investor Muda!
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "#64748b",
                    lineHeight: 1.8,
                    maxWidth: 620,
                  }}
                >
                  FinSight dirancang khusus untuk membantu kamu — Gen Z &
                  investor pemula — memahami kondisi pasar saham dengan cara
                  yang lebih simpel.
                </div>
              </div>
              <div
                className="fade-up-2"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 18,
                }}
              >
                {eduContent.map((edu) => (
                  <div
                    key={edu.title}
                    className="card-hover"
                    style={{
                      background: "#fff",
                      borderRadius: 20,
                      padding: "22px 24px",
                      boxShadow: "0 1px 4px rgba(0,0,0,.07)",
                      borderTop: `3px solid ${edu.color}`,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: 14,
                      }}
                    >
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 14,
                          background: edu.bg,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 22,
                        }}
                      >
                        {edu.icon}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Syne',sans-serif",
                          fontWeight: 800,
                          fontSize: 15,
                          color: "#0f172a",
                        }}
                      >
                        {edu.title}
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: 13,
                        color: "#475569",
                        lineHeight: 1.75,
                        margin: "0 0 16px",
                      }}
                    >
                      {edu.body}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      {edu.tips.map((tip, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            gap: 8,
                            alignItems: "flex-start",
                            fontSize: 12,
                            color: "#64748b",
                            background: "#f8fafc",
                            padding: "9px 12px",
                            borderRadius: 10,
                            border: "1px solid #f1f5f9",
                          }}
                        >
                          <span
                            style={{
                              color: edu.color,
                              fontWeight: 800,
                              marginTop: 1,
                              flexShrink: 0,
                            }}
                          >
                            →
                          </span>
                          <span style={{ lineHeight: 1.5 }}>{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="fade-up-3"
                style={{
                  background: "#fff7ed",
                  borderRadius: 18,
                  padding: "20px 24px",
                  border: "1px solid #fed7aa",
                }}
              >
                <div
                  style={{ display: "flex", gap: 14, alignItems: "flex-start" }}
                >
                  <span style={{ fontSize: 24 }}>⚠️</span>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Syne',sans-serif",
                        fontWeight: 800,
                        fontSize: 14,
                        color: "#c2410c",
                        marginBottom: 8,
                      }}
                    >
                      Disclaimer Penting
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "#92400e",
                        lineHeight: 1.8,
                      }}
                    >
                      FinSight adalah platform edukasi dan observasi pasar.
                      Semua data sentimen, prediksi, dan insight yang
                      ditampilkan{" "}
                      <strong>
                        bukan merupakan rekomendasi investasi resmi
                      </strong>{" "}
                      dan tidak menjamin hasil di pasar nyata.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ════ SETTINGS ════ */}
          {activePage === "settings" && <SettingsPage stocks={stocks} />}

          {/* ════ COMING SOON ════ */}
          {!["dashboard", "edukasi", "ai", "news", "settings"].includes(
            activePage,
          ) && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "65vh",
                gap: 16,
                color: "#94a3b8",
              }}
            >
              <div style={{ fontSize: 60 }}>🚧</div>
              <div
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#0f172a",
                }}
              >
                Coming Soon
              </div>
              <button
                className="btn-green"
                onClick={() => setActivePage("dashboard")}
                style={{
                  background: "#10b981",
                  color: "#fff",
                  border: "none",
                  padding: "11px 28px",
                  borderRadius: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontSize: 14,
                  marginTop: 6,
                }}
              >
                ← Kembali ke Dashboard
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
