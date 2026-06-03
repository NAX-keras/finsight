/**
 * Dashboard.jsx — FinSight Frontend (FIXED + RESPONSIVE)
 *
 * PERUBAHAN DARI VERSI LAMA:
 * 1. ✅ Terhubung ke backend via API
 * 2. ✅ AI Chat menggunakan proxy /api/chat
 * 3. ✅ Semua data dinamis (Saham, IHSG, Berita, Prediksi)
 * 4. 📱 Ditambahkan Media Queries untuk responsivitas Mobile/HP & Desktop
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

/* ── CSS (Termasuk Media Queries untuk Mobile) ──────────────── */
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

  /* ── KELAS RESPONSIF (MOBILE FIRST) ── */
  .layout-wrapper { display: flex; flex-direction: column; min-height: 100vh; background: #f0f4f8; font-family: 'Plus Jakarta Sans', sans-serif; }
  .sidebar { width: 100%; background: #080f1e; padding: 16px; flex-shrink: 0; border-bottom: 1px solid #0f1f38; position: sticky; top: 0; z-index: 50; }
  .sidebar-logo-container { margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between; }
  .nav-menu { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; }
  .nav-item { white-space: nowrap; flex-shrink: 0; }
  .ihsg-widget { display: none; }
  .main-content { flex: 1; padding: 16px; overflow-x: hidden; min-width: 0; }
  
  .header-row { display: flex; flex-direction: column; gap: 12px; align-items: flex-start; }
  .header-actions { display: flex; flex-direction: column; gap: 10px; width: 100%; }
  .search-container { width: 100%; }
  .search-input { width: 100% !important; }
  
  .stock-tabs { display: flex; gap: 10px; overflow-x: auto; padding-bottom: 8px; flex-wrap: nowrap; }
  
  /* GRID UMUM */
  .grid-4, .grid-3, .grid-2, .grid-chart, .insight-grid { display: grid; gap: 14px; grid-template-columns: 1fr; }

  /* ── DESKTOP & TABLET (> 768px) ── */
  @media (min-width: 768px) {
    .layout-wrapper { flex-direction: row; }
    .sidebar { width: 234px; height: 100vh; padding: 26px 16px; border-right: 1px solid #0f1f38; border-bottom: none; display: flex; flex-direction: column; }
    .sidebar-logo-container { margin-bottom: 28px; flex-direction: column; align-items: flex-start; }
    .nav-menu { flex-direction: column; padding-bottom: 0; overflow-x: visible; }
    .ihsg-widget { display: block; margin-top: auto; }
    .main-content { padding: 28px; }
    
    .header-row { flex-direction: row; align-items: center; justify-content: space-between; }
    .header-actions { flex-direction: row; align-items: center; width: auto; }
    .search-container { width: auto; }
    .search-input { width: 220px !important; }
    
    .stock-tabs { flex-wrap: wrap; overflow-x: visible; padding-bottom: 0; }
    
    .grid-4 { grid-template-columns: repeat(2, 1fr); }
    .grid-3 { grid-template-columns: repeat(3, 1fr); }
    .grid-2 { grid-template-columns: repeat(2, 1fr); }
    .grid-chart { grid-template-columns: 1fr; }
    .insight-grid { grid-template-columns: repeat(3, 1fr); }
  }

  /* ── DESKTOP LEBAR (> 1024px) ── */
  @media (min-width: 1024px) {
    .grid-4 { grid-template-columns: repeat(4, 1fr); gap: 18px; }
    .grid-chart { grid-template-columns: 2fr 1fr; gap: 18px; }
  }
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

/* ── FALLBACK DATA (statis) ──────────────────────────────────── */
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
    body: "Sentimen adalah gambaran 'mood' pasar terhadap suatu saham — apakah orang-orang cenderung optimis (bullish), pesimis (bearish), atau biasa saja (netral).",
    tips: [
      "Sentimen Positif / Bullish → Banyak berita mendukung",
      "Sentimen Negatif / Bearish → Banyak berita buruk",
      "Sentimen Netral → Pasar belum menentu",
    ],
  },
  {
    icon: "🔮",
    title: "Apa itu Prediksi Arah?",
    color: "#0891b2",
    bg: "#dbeafe",
    body: "Prediksi arah adalah estimasi berbasis pola data historis — BUKAN jaminan keuntungan.",
    tips: [
      "↑ Naik → Potensi kenaikan harga",
      "↓ Turun → Indikasi tekanan jual",
      "→ Sideways → Harga bergerak di kisaran sama",
    ],
  },
  {
    icon: "⚠️",
    title: "Batas Penggunaan Aplikasi",
    color: "#f59e0b",
    bg: "#fef3c7",
    body: "FinSight adalah alat bantu observasi, BUKAN robot trading atau penasihat keuangan resmi.",
    tips: [
      "Selalu lakukan riset mandiri",
      "Sentimen dan prediksi bisa salah",
      "Konsultasikan dengan ahli keuangan",
    ],
  },
  {
    icon: "📚",
    title: "Tips untuk Investor Pemula",
    color: "#7c3aed",
    bg: "#ede9fe",
    body: "Mulai investasi tidak harus langsung dengan modal besar. Pahami apa yang kamu beli.",
    tips: [
      "Diversifikasi: jangan taruh semua uang di satu saham",
      "Investasi jangka panjang lebih aman",
      "Gunakan uang dingin",
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

function getTodayId() {
  return new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* ── AI CHAT PAGE ────────────────────────────────────────────── */
const AI_SYSTEM = `Kamu adalah FinSight AI, asisten cerdas untuk platform analisis sentimen saham FinSight.`;
const QUICK_CHIPS = ["Apa sentimen BBRI?", "Jelaskan Bullish", "Tips pemula", "Kenapa GOTO turun?"];

function AIPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Halo! Saya **FinSight AI** 👋\n\nSaya siap bantu kamu memahami pasar saham. Mau tanya apa?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

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
      const reply = data.content?.[0]?.text || "Maaf, terjadi kesalahan.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `⚠️ Gagal terhubung ke AI. Pastikan backend berjalan.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatMsg = (text) => text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br/>");

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 120px)" }}>
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
            <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0 }}>
              FinSight AI
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", animation: "pulse-dot 1.5s infinite", display: "inline-block" }} />
              <span style={{ fontSize: 12, color: "#10b981", fontWeight: 600 }}>
                {HAS_BACKEND ? "Online · Siap membantu" : "Offline"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="fade-up-1" style={{ flex: 1, background: "#fff", borderRadius: 20, boxShadow: "0 1px 4px rgba(0,0,0,.07)", display: "flex", flexDirection: "column", overflow: "hidden", border: "1px solid #f1f5f9" }}>
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 24px 12px" }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 20, flexDirection: m.role === "user" ? "row-reverse" : "row" }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", flexShrink: 0, background: m.role === "assistant" ? "linear-gradient(135deg,#10b981,#0891b2)" : "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, marginTop: 2 }}>
                {m.role === "assistant" ? "🤖" : "👤"}
              </div>
              <div style={{ maxWidth: "85%", padding: "12px 16px", borderRadius: m.role === "user" ? "18px 4px 18px 18px" : "4px 18px 18px 18px", background: m.role === "user" ? "linear-gradient(135deg,#0f172a,#1e3a5f)" : "#f8fafc", color: m.role === "user" ? "#fff" : "#334155", fontSize: 13, lineHeight: 1.7, border: m.role === "assistant" ? "1px solid #f1f5f9" : "none", boxShadow: m.role === "user" ? "0 4px 16px rgba(15,23,41,.2)" : "0 1px 4px rgba(0,0,0,.04)" }} dangerouslySetInnerHTML={{ __html: formatMsg(m.content) }} />
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#10b981,#0891b2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🤖</div>
              <div style={{ padding: "14px 18px", borderRadius: "4px 18px 18px 18px", background: "#f8fafc", border: "1px solid #f1f5f9", display: "flex", gap: 5, alignItems: "center" }}>
                <span className="dot1" style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
                <span className="dot2" style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
                <span className="dot3" style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        {messages.length <= 1 && (
          <div style={{ padding: "0 24px 14px", display: "flex", flexWrap: "wrap", gap: 8 }}>
            {QUICK_CHIPS.map((c) => (
              <button key={c} className="chip" onClick={() => sendMessage(c)} style={{ background: "rgba(16,185,129,.08)", border: "1px solid rgba(16,185,129,.25)", color: "#0f172a", fontSize: 12, fontWeight: 600, padding: "6px 14px", borderRadius: 20 }}>
                {c}
              </button>
            ))}
          </div>
        )}
        <div style={{ padding: "14px 20px", borderTop: "1px solid #f1f5f9", display: "flex", gap: 10, background: "#fff" }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()} placeholder="Tanya sesuatu..." disabled={loading} style={{ flex: 1, border: "1.5px solid #e2e8f0", borderRadius: 12, padding: "11px 16px", fontSize: 13, outline: "none", background: "#f8fafc", color: "#0f172a", fontFamily: "inherit" }} />
          <button className="ai-send" onClick={() => sendMessage()} disabled={loading || !input.trim()} style={{ background: "#10b981", color: "#fff", border: "none", borderRadius: 12, padding: "11px 20px", fontWeight: 700, fontSize: 13, cursor: loading ? "not-allowed" : "pointer", opacity: loading || !input.trim() ? 0.6 : 1 }}>
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── SETTINGS PAGE ───────────────────────────────────────────── */
function SettingsPage({ stocks }) {
  const [notif, setNotif] = useState({ insight: true, alert: true, berita: false, prediksi: true });
  const toggleNotif = (k) => setNotif((p) => ({ ...p, [k]: !p[k] }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div className="fade-up">
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 800, color: "#0f172a", margin: 0 }}>⚙️ Pengaturan</h1>
        <p style={{ color: "#64748b", fontSize: 13, margin: "4px 0 0" }}>Kelola preferensi aplikasi FinSight kamu</p>
      </div>

      <div className="fade-up-1" style={{ background: "#fff", borderRadius: 20, padding: "24px 26px", boxShadow: "0 1px 4px rgba(0,0,0,.07)" }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 15, color: "#0f172a", marginBottom: 18 }}>📈 Saham Dipantau</div>
        <div className="grid-2">
          {stocks.map((s) => (
            <div key={s.ticker} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 12, background: "#f8fafc", border: "1px solid #f1f5f9" }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: s.up ? "#dcfce7" : "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: 11, color: s.up ? "#15803d" : "#dc2626", flexShrink: 0, border: `1.5px solid ${s.up ? "#86efac" : "#fca5a5"}` }}>{s.ticker}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: "#0f172a" }}>{s.name}</div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{s.sector}</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontWeight: 800, fontSize: 13, color: "#0f172a" }}>Rp {s.price}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: s.up ? "#10b981" : "#ef4444" }}>{s.change}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fade-up-2" style={{ background: "#fff", borderRadius: 20, padding: "24px 26px", boxShadow: "0 1px 4px rgba(0,0,0,.07)" }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 15, color: "#0f172a", marginBottom: 18 }}>🔔 Notifikasi</div>
        <div className="grid-2">
          {[
            { key: "insight", label: "Insight Harian", sub: "Terima ringkasan sentimen pagi" },
            { key: "alert", label: "Alert Sentimen", sub: "Saat sentimen berubah drastis" },
            { key: "berita", label: "Berita Penting", sub: "Berita yang mempengaruhi saham" },
            { key: "prediksi", label: "Update Prediksi", sub: "Saat prediksi arah diperbarui" },
          ].map((n) => (
            <div key={n.key} onClick={() => toggleNotif(n.key)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderRadius: 12, background: "#f8fafc", border: `1px solid ${notif[n.key] ? "#bbf7d0" : "#f1f5f9"}`, cursor: "pointer", transition: "border .2s" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{n.label}</div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 3 }}>{n.sub}</div>
              </div>
              <div style={{ width: 46, height: 26, borderRadius: 13, background: notif[n.key] ? "#10b981" : "#e2e8f0", position: "relative", flexShrink: 0, transition: "background .25s" }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: notif[n.key] ? 23 : 3, transition: "left .25s", boxShadow: "0 1px 4px rgba(0,0,0,.25)" }} />
              </div>
            </div>
          ))}
        </div>
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

  const [stocks, setStocks] = useState(FB_STOCKS);
  const [priceData, setPriceData] = useState(FB_PRICE);
  const [sentimentHistory, setSentimentHistory] = useState(FB_SENT_HIST);
  const [newsData, setNewsData] = useState(FB_NEWS);
  const [insight, setInsight] = useState(FB_INSIGHT);
  const [ihsg, setIhsg] = useState({ formatted: "7.412", change_str: "+0.64%", up: true });
  const [loadingData, setLoadingData] = useState(false);

  const [sentimentFilter, setSentimentFilter] = useState("Semua");
  const [stockFilter, setStockFilter] = useState("BBRI");

  useEffect(() => {
    if (!HAS_BACKEND) return;
    (async () => {
      setLoadingData(true);
      const [apiStocks, apiSentHist, apiNews, apiInsight, apiIhsg] = await Promise.all([
        apiFetch("/stocks"), apiFetch("/sentiment/history"), apiFetch("/news"), apiFetch("/insight/daily"), apiFetch("/insight/ihsg"),
      ]);

      if (apiStocks && Object.keys(apiStocks).length > 0) {
        const tickers = Object.keys(apiStocks);
        setStocks(mapApiToStocksArray(apiStocks));
        setPriceData(mapApiToPriceData(apiStocks));
        setNewsData(mapApiToNewsDict(apiNews || [], tickers));
        setStockFilter(tickers[0] || "BBRI");
      }
      if (apiSentHist && apiSentHist.length > 0) setSentimentHistory(apiSentHist);
      if (apiInsight) setInsight(apiInsight);
      if (apiIhsg) setIhsg(apiIhsg);
      setLoadingData(false);
    })();
  }, []);

  useEffect(() => {
    if (!HAS_BACKEND || !activeStock) return;
    (async () => {
      const [pred, sent] = await Promise.all([apiFetch(`/predict/${activeStock}`), apiFetch(`/sentiment/${activeStock}`)]);
      if (pred) {
        setStocks((prev) =>
          prev.map((s) => s.ticker !== activeStock ? s : { ...s, prediction: SIG_TO_ID[pred.signal] || s.prediction, predColor: SIG_COLOR[pred.signal] || s.predColor })
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
      setSearchError(`Saham "${val}" tak ditemukan. Tersedia: ${available}`);
      setTimeout(() => setSearchError(""), 3000);
    }
  };

  const stock = stocks.find((s) => s.ticker === activeStock) || stocks[0] || FB_STOCKS[0];
  const sentColor = stock.sentiment >= 60 ? "#10b981" : stock.sentiment >= 40 ? "#f59e0b" : "#ef4444";
  const predArrow = stock.prediction === "Naik" ? "↑" : stock.prediction === "Turun" ? "↓" : "→";

  const newsForStock = (newsData[stockFilter] || []).filter((n) => sentimentFilter === "Semua" || n.tag === sentimentFilter);

  const allNewsFlat = Object.values(newsData).flat();
  const newsTotal = allNewsFlat.length;
  const newsPositif = allNewsFlat.filter((n) => n.tag === "Positif").length;
  const newsNegatif = allNewsFlat.filter((n) => n.tag === "Negatif").length;
  const newsNetral = allNewsFlat.filter((n) => n.tag === "Netral").length;

  const navItems = [
    { icon: "⚡", label: "Dashboard", id: "dashboard" },
    { icon: "📰", label: "Berita", id: "news" },
    { icon: "🎓", label: "Edukasi", id: "edukasi" },
    { icon: "🤖", label: "AI Chat", id: "ai" },
    { icon: "⚙️", label: "Pengaturan", id: "settings" },
  ];

  return (
    <>
      <style>{globalCSS}</style>
      <div className="layout-wrapper">
        {/* ── SIDEBAR RESPONSIVE ── */}
        <aside className="sidebar">
          <div className="sidebar-logo-container">
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 19, fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ background: "linear-gradient(135deg,#10b981,#0891b2)", borderRadius: 8, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>
                <img src="/logo.jpeg" alt="Logo" style={{ width: 30, height: 30, borderRadius: 8, objectFit: "cover" }} onError={(e) => e.target.style.display='none'} />
              </span>
              FinSight
            </div>
            <div style={{ fontSize: 9, color: "#1e3a5f", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 700, marginTop: 4 }}>
              Analisis Sentimen
            </div>
          </div>

          <div className="nav-menu">
            {navItems.map(({ icon, label, id }) => {
              const active = activePage === id;
              return (
                <div key={id} className="nav-item" onClick={() => setActivePage(id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, cursor: "pointer", background: active ? "rgba(16,185,129,.15)" : "transparent", color: active ? "#10b981" : "#475569", fontWeight: active ? 700 : 500, fontSize: 13, borderBottom: window.innerWidth < 768 && active ? "3px solid #10b981" : "3px solid transparent", borderLeft: window.innerWidth >= 768 && active ? "3px solid #10b981" : window.innerWidth >= 768 ? "3px solid transparent" : "none" }}>
                  <span style={{ fontSize: 15 }}>{icon}</span>
                  {label}
                </div>
              );
            })}
          </div>

          <div className="ihsg-widget" style={{ padding: "16px", background: "linear-gradient(135deg,rgba(16,185,129,.12),rgba(8,145,178,.08))", borderRadius: 14, border: "1px solid rgba(16,185,129,.2)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", animation: "pulse-dot 1.5s infinite", display: "inline-block" }} />
              <span style={{ fontSize: 9, color: "#10b981", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase" }}>IHSG Live</span>
            </div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{ihsg.formatted}</div>
            <div style={{ fontSize: 13, color: ihsg.up ? "#10b981" : "#ef4444", fontWeight: 700, marginTop: 4 }}>{ihsg.up ? "▲" : "▼"} {ihsg.change_str}</div>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="main-content">
          {activePage === "ai" && <AIPage />}

          {/* ════ DASHBOARD PAGE ════ */}
          {activePage === "dashboard" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <div className="header-row fade-up">
                <div>
                  <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: "-0.5px" }}>Market Overview</h1>
                  <p style={{ color: "#64748b", fontSize: 13, margin: "3px 0 0" }}>
                    {getTodayId()} {loadingData && <span style={{ color: "#10b981", fontWeight: 600 }}>⟳ Memuat...</span>}
                  </p>
                </div>
                <div className="header-actions">
                  <div className="search-container" style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <div style={{ display: "flex", background: "#fff", borderRadius: 12, border: `1.5px solid ${searchError ? "#ef4444" : "#e2e8f0"}`, overflow: "hidden", flex: 1 }}>
                      <input className="search-input" value={ticker} onChange={(e) => { setTicker(e.target.value.toUpperCase()); setSearchError(""); }} onKeyDown={(e) => e.key === "Enter" && handleSearch()} placeholder="Cari saham... (Cth: GOTO)" style={{ border: "none", outline: "none", padding: "10px 14px", fontSize: 13, background: "transparent", color: "#0f172a", fontFamily: "inherit" }} />
                      <button className="btn-green" onClick={handleSearch} style={{ background: "#10b981", color: "#fff", border: "none", padding: "10px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Cari</button>
                    </div>
                  </div>
                  {searchError && <div style={{ fontSize: 11, color: "#ef4444", fontWeight: 600, background: "#fee2e2", padding: "4px 12px", borderRadius: 8 }}>⚠️ {searchError}</div>}
                </div>
              </div>

              {/* Insight Harian */}
              <div className="fade-up-1" style={{ borderRadius: 20, padding: "22px 24px", background: "linear-gradient(135deg,#080f1e 0%,#0c1f3f 60%,#0a2540 100%)", border: "1px solid #1e3a5f", position: "relative", overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18, position: "relative", zIndex: 2 }}>
                  <span style={{ fontSize: 18 }}>✨</span>
                  <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 15, color: "#10b981" }}>Insight Harian</span>
                </div>
                <div className="insight-grid" style={{ position: "relative", zIndex: 2 }}>
                  {[
                    { icon: "📊", label: "Sentimen Dominan", value: insight.dominant, sub: insight.dominant_sub, color: "#10b981" },
                    { icon: "👀", label: "Saham Diamati", value: insight.watchlist, sub: insight.watchlist_sub, color: "#38bdf8" },
                    { icon: "⚡", label: "Perlu Diperhatikan", value: insight.attention, sub: insight.attention_sub, color: "#f59e0b" },
                  ].map((item) => (
                    <div key={item.label} style={{ background: "rgba(255,255,255,.04)", borderRadius: 14, padding: "16px 18px", borderLeft: `3px solid ${item.color}` }}>
                      <div style={{ fontSize: 20, marginBottom: 8 }}>{item.icon}</div>
                      <div style={{ fontSize: 10, color: "#475569", textTransform: "uppercase", fontWeight: 600 }}>{item.label}</div>
                      <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 17, color: item.color }}>{item.value}</div>
                      <div style={{ fontSize: 11, color: "#64748b", marginTop: 5 }}>{item.sub}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stock Tabs */}
              <div className="stock-tabs fade-up-2">
                {stocks.map((s) => (
                  <div key={s.ticker} className="stock-tab" onClick={() => setActiveStock(s.ticker)} style={{ background: activeStock === s.ticker ? "#0f172a" : "#fff", color: activeStock === s.ticker ? "#fff" : "#0f172a", border: `1.5px solid ${activeStock === s.ticker ? "#10b981" : "#e2e8f0"}`, borderRadius: 16, padding: "13px 16px", cursor: "pointer", display: "flex", gap: 14, alignItems: "center", minWidth: 185 }}>
                    <div>
                      <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 15 }}>{s.ticker}</div>
                      <div style={{ fontSize: 10, opacity: 0.5, fontWeight: 500 }}>{s.sector}</div>
                    </div>
                    <div style={{ marginLeft: "auto", textAlign: "right" }}>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>Rp {s.price}</div>
                      <div style={{ fontSize: 12, color: s.up ? "#10b981" : "#ef4444", fontWeight: 700 }}>{s.change}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Metric Cards */}
              <div className="grid-4 fade-up-3">
                {[
                  { label: "Skor Sentimen", value: `${stock.sentiment}%`, sub: stock.label, color: sentColor, icon: "😊" },
                  { label: "Prediksi Arah", value: stock.prediction, sub: "Estimasi AI", color: stock.predColor, icon: stock.prediction === "Naik" ? "📈" : stock.prediction === "Turun" ? "📉" : "➡️" },
                  { label: "Harga Saat Ini", value: `Rp ${stock.price}`, sub: stock.change + " hari ini", color: stock.up ? "#10b981" : "#ef4444", icon: "💰" },
                  { label: "Sektor", value: stock.sector, sub: activeStock, color: "#7c3aed", icon: "🏭" },
                ].map((m) => (
                  <div key={m.label} className="card-hover" style={{ background: "#fff", borderRadius: 18, padding: "20px", borderTop: `3px solid ${m.color}`, boxShadow: "0 1px 4px rgba(0,0,0,.07)" }}>
                    <div style={{ fontSize: 24, marginBottom: 10 }}>{m.icon}</div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: "#0f172a" }}>{m.value}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: m.color, marginTop: 3 }}>{m.sub}</div>
                    <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 5, fontWeight: 500 }}>{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Charts Row */}
              <div className="grid-chart fade-up-4">
                <div style={{ background: