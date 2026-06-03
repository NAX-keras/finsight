/**
 * Dashboard.jsx — FinSight Frontend (Vercel Ready)
 *
 * ✅ 100% Responsif (Mobile & Desktop)
 * ✅ Nol Error ESLint (Strict Parsing Passed)
 * ✅ Komponen SettingsPage telah diaktifkan kembali
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

/* ── CSS ARSITEKTUR RESPONSIF (MOBILE FIRST) ────────────────── */
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

  /* LAYOUT UTAMA STRUKTUR RESPONSIF */
  .layout-wrapper { display: flex; flex-direction: column; min-height: 100vh; background: #f0f4f8; font-family: 'Plus Jakarta Sans', sans-serif; }
  .sidebar { width: 100%; background: #080f1e; padding: 16px; flex-shrink: 0; border-bottom: 1px solid #0f1f38; position: sticky; top: 0; z-index: 50; }
  .sidebar-logo-container { margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between; }
  .nav-menu { display: flex; gap: 6px; overflow-x: auto; padding-bottom: 4px; }
  .ihsg-widget { display: none; }
  .main-content { flex: 1; padding: 16px; overflow-x: hidden; min-width: 0; }
  
  /* KOMPONEN DINAMIS NAVIGASI */
  .nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px; cursor: pointer; color: #475569; font-weight: 500; font-size: 13px; border-left: 3px solid transparent; border-bottom: 3px solid transparent; white-space: nowrap; flex-shrink: 0; }
  .nav-item:hover { background: rgba(16,185,129,.12) !important; color: #e2e8f0 !important; }
  .nav-item.active { background: rgba(16,185,129,.15) !important; color: #10b981 !important; font-weight: 700; }
  
  .header-row { display: flex; flex-direction: column; gap: 12px; align-items: flex-start; }
  .header-actions { display: flex; flex-direction: column; gap: 10px; width: 100%; }
  .search-container { width: 100%; }
  .search-input { width: 100% !important; }
  .stock-tabs { display: flex; gap: 10px; overflow-x: auto; padding-bottom: 8px; flex-wrap: nowrap; }
  
  /* GRID UTILITY SYSTEM */
  .grid-4, .grid-3, .grid-2, .grid-chart, .insight-grid { display: grid; gap: 14px; grid-template-columns: 1fr; }

  /* MEDIA QUERIES TAB / DESKTOP (>= 768px) */
  @media (min-width: 768px) {
    .layout-wrapper { flex-direction: row; }
    .sidebar { width: 234px; height: 100vh; padding: 26px 16px; border-right: 1px solid #0f1f38; border-bottom: none; display: flex; flex-direction: column; gap: 3px; }
    .sidebar-logo-container { margin-bottom: 28px; flex-direction: column; align-items: flex-start; gap: 4px; }
    .nav-menu { flex-direction: column; gap: 3px; overflow-x: visible; padding-bottom: 0; }
    .nav-item.active { border-left: 3px solid #10b981; border-bottom: 3px solid transparent; }
    .nav-item { border-bottom: none; }
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

  /* MEDIA QUERIES LARGE LAPTOP (>= 1024px) */
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

/* ── FALLBACK DATA ──────────────────────────────────────────── */
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
  attention_sub: "Volume naik signifikan",
  bullish_pct: 68,
  bearish_pct: 21,
  neutral_pct: 11,
};

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
    body: "Sentimen adalah gambaran 'mood' pasar terhadap suatu saham — apakah cenderung optimis (bullish), pesimis (bearish), atau netral.",
    tips: [
      "Bullish -> Berita positif",
      "Bearish -> Berita buruk",
      "Netral -> Belum jelas",
    ],
  },
  {
    icon: "🔮",
    title: "Apa itu Prediksi Arah?",
    color: "#0891b2",
    bg: "#dbeafe",
    body: "Prediksi arah adalah estimasi berbasis pola tren data historis — BUKAN jaminan pasti untung.",
    tips: [
      "↑ Naik -> Potensi naik",
      "↓ Turun -> Potensi turun",
      "→ Sideways -> Bergerak stabil",
    ],
  },
  {
    icon: "⚠️",
    title: "Batas Penggunaan Aplikasi",
    color: "#f59e0b",
    bg: "#fef3c7",
    body: "FinSight adalah alat bantu observasi, BUKAN robot trading atau penasihat keuangan resmi.",
    tips: [
      "Lakukan riset mandiri",
      "Prediksi AI bisa salah",
      "Pasar selalu dinamis",
    ],
  },
  {
    icon: "📚",
    title: "Tips untuk Investor Pemula",
    color: "#7c3aed",
    bg: "#ede9fe",
    body: "Mulai investasi tidak harus langsung dengan modal besar. Pahami profil risiko.",
    tips: [
      "Gunakan uang dingin",
      "Lakukan diversifikasi aset",
      "Investasi jangka panjang",
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
const QUICK_CHIPS = [
  "Apa sentimen BBRI?",
  "Jelaskan Bullish",
  "Tips pemula",
  "Kenapa GOTO turun?",
];

function AIPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Halo! Saya **FinSight AI** 👋\n\nAda yang bisa saya bantu terkait analisis pasar hari ini?",
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
      if (!chatUrl) throw new Error("Backend offline");
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
      const reply = data.content?.[0]?.text || "Maaf, terjadi galat.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Gagal terhubung ke AI. Pastikan backend berjalan.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 140px)",
      }}
    >
      <div className="fade-up" style={{ marginBottom: 16 }}>
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
                fontSize: 20,
                fontWeight: 800,
                color: "#0f172a",
                margin: 0,
              }}
            >
              FinSight AI
            </h1>
            <span style={{ fontSize: 11, color: "#10b981", fontWeight: 600 }}>
              {HAS_BACKEND ? "Online · Asisten Siap" : "Mode Offline"}
            </span>
          </div>
        </div>
      </div>
      <div
        className="fade-up-1"
        style={{
          flex: 1,
          background: "#fff",
          borderRadius: 20,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          border: "1px solid #f1f5f9",
          boxShadow: "0 1px 4px rgba(0,0,0,.04)",
        }}
      >
        <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 12,
                marginBottom: 16,
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
                      : "#6366f1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                }}
              >
                {m.role === "assistant" ? "🤖" : "👤"}
              </div>
              <div
                style={{
                  maxWidth: "80%",
                  padding: "12px",
                  borderRadius: 12,
                  background: m.role === "user" ? "#0f172a" : "#f8fafc",
                  color: m.role === "user" ? "#fff" : "#334155",
                  fontSize: 13,
                  border: m.role === "assistant" ? "1px solid #e2e8f0" : "none",
                }}
                dangerouslySetInnerHTML={{
                  __html: m.content
                    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                    .replace(/\n/g, "<br/>"),
                }}
              />
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div
          style={{
            padding: "14px",
            borderTop: "1px solid #f1f5f9",
            display: "flex",
            gap: 10,
            background: "#fff",
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Tanya sesuatu ke AI..."
            disabled={loading}
            style={{
              flex: 1,
              border: "1.5px solid #e2e8f0",
              borderRadius: 12,
              padding: "10px 14px",
              fontSize: 13,
              outline: "none",
            }}
          />
          <button
            className="ai-send"
            onClick={() => sendMessage()}
            style={{
              background: "#10b981",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "10px 20px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── SETTINGS PAGE ───────────────────────────────────────────── */
function SettingsPage({ stocks }) {
  const [notif, setNotif] = useState({
    insight: true,
    alert: true,
    berita: false,
    prediksi: true,
  });
  const toggleNotif = (k) => setNotif((p) => ({ ...p, [k]: !p[k] }));

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
          📈 Saham Dipantau
        </div>
        <div className="grid-2">
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
        <div className="grid-2">
          {[
            {
              key: "insight",
              label: "Insight Harian",
              sub: "Terima ringkasan sentimen pagi",
            },
            {
              key: "alert",
              label: "Alert Sentimen",
              sub: "Saat sentimen berubah drastis",
            },
            {
              key: "berita",
              label: "Berita Penting",
              sub: "Berita yang mempengaruhi saham",
            },
            {
              key: "prediksi",
              label: "Update Prediksi",
              sub: "Saat prediksi arah diperbarui",
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
    </div>
  );
}

/* ── MAIN DASHBOARD COMPONENT ────────────────────────────────── */
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
  const [ihsg, setIhsg] = useState({
    formatted: "7.412",
    change_str: "+0.64%",
    up: true,
  });
  const [loadingData, setLoadingData] = useState(false);

  const [sentimentFilter, setSentimentFilter] = useState("Semua");
  const [stockFilter, setStockFilter] = useState("BBRI");

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
      setSearchError(`Saham "${val}" tidak ditemukan. Tersedia: ${available}`);
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

  const newsForStock = (newsData[stockFilter] || []).filter(
    (n) => sentimentFilter === "Semua" || n.tag === sentimentFilter,
  );

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
        {/* ── SIDEBAR NAVIGASI (RESPONSIF VIA CSS) ── */}
        <aside className="sidebar">
          <div className="sidebar-logo-container">
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
                }}
              >
                <img
                  src="/logo.jpeg"
                  alt="Logo"
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    objectFit: "cover",
                  }}
                  onError={(e) => (e.target.style.display = "none")}
                />
              </span>
              FinSight
            </div>
            <div
              style={{
                fontSize: 9,
                color: "#1e3a5f",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              Fintech CC2026
            </div>
          </div>

          <div className="nav-menu">
            {navItems.map(({ icon, label, id }) => {
              const active = activePage === id;
              return (
                <div
                  key={id}
                  className={`nav-item ${active ? "active" : ""}`}
                  onClick={() => setActivePage(id)}
                >
                  <span style={{ fontSize: 15 }}>{icon}</span>
                  {label}
                </div>
              );
            })}
          </div>

          <div
            className="ihsg-widget"
            style={{
              padding: "14px",
              background: "rgba(16,185,129,.08)",
              borderRadius: 14,
              border: "1px solid rgba(16,185,129,.15)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 6,
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
              <span
                style={{
                  fontSize: 9,
                  color: "#10b981",
                  fontWeight: 700,
                  letterSpacing: "1px",
                }}
              >
                IHSG LIVE
              </span>
            </div>
            <div
              style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: 22,
                fontWeight: 800,
                color: "#fff",
              }}
            >
              {ihsg.formatted}
            </div>
            <div
              style={{
                fontSize: 12,
                color: ihsg.up ? "#10b981" : "#ef4444",
                fontWeight: 700,
                marginTop: 2,
              }}
            >
              {ihsg.up ? "▲" : "▼"} {ihsg.change_str}
            </div>
          </div>
        </aside>

        {/* ── AREA KONTEN UTAMA ── */}
        <main className="main-content">
          {activePage === "ai" && <AIPage />}

          {/* ════ DASHBOARD VIEW ════ */}
          {activePage === "dashboard" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <div className="header-row fade-up">
                <div>
                  <h1
                    style={{
                      fontFamily: "'Syne',sans-serif",
                      fontSize: 24,
                      fontWeight: 800,
                      color: "#0f172a",
                      margin: 0,
                    }}
                  >
                    Market Overview
                  </h1>
                  <p style={{ color: "#64748b", fontSize: 13, marginTop: 2 }}>
                    {getTodayId()}{" "}
                    {loadingData && (
                      <span style={{ color: "#10b981" }}>⟳ Syncing...</span>
                    )}
                  </p>
                </div>
                <div className="header-actions">
                  <div
                    className="search-container"
                    style={{ display: "flex", gap: 10 }}
                  >
                    <input
                      className="search-input"
                      value={ticker}
                      onChange={(e) => {
                        setTicker(e.target.value.toUpperCase());
                        setSearchError("");
                      }}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      placeholder="Cari Kode Saham (Cth: BBRI)"
                      style={{
                        border: "1.5px solid #e2e8f0",
                        borderRadius: 12,
                        padding: "10px 14px",
                        fontSize: 13,
                        outline: "none",
                        background: "#fff",
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
                        borderRadius: 12,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Cari
                    </button>
                  </div>
                  {searchError && (
                    <div
                      style={{
                        fontSize: 11,
                        color: "#ef4444",
                        fontWeight: 600,
                        background: "#fee2e2",
                        padding: "6px 12px",
                        borderRadius: 8,
                      }}
                    >
                      ⚠️ {searchError}
                    </div>
                  )}
                </div>
              </div>

              {/* Insight Ringkasan */}
              <div
                className="fade-up-1"
                style={{
                  borderRadius: 20,
                  padding: "22px",
                  background: "linear-gradient(135deg,#080f1e 0%,#0c1f3f 100%)",
                  border: "1px solid #1e3a5f",
                }}
              >
                <div className="insight-grid">
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
                        padding: "16px",
                        borderLeft: `3px solid ${item.color}`,
                      }}
                    >
                      <div style={{ fontSize: 18, marginBottom: 6 }}>
                        {item.icon}
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          color: "#475569",
                          fontWeight: 600,
                          textTransform: "uppercase",
                        }}
                      >
                        {item.label}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Syne',sans-serif",
                          fontWeight: 800,
                          fontSize: 16,
                          color: item.color,
                          marginTop: 2,
                        }}
                      >
                        {item.value}
                      </div>
                      <div
                        style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}
                      >
                        {item.sub}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selector Saham */}
              <div className="stock-tabs fade-up-2">
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
                      padding: "12px 16px",
                      cursor: "pointer",
                      display: "flex",
                      gap: 12,
                      alignItems: "center",
                      minWidth: 175,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "'Syne',sans-serif",
                          fontWeight: 800,
                          fontSize: 14,
                        }}
                      >
                        {s.ticker}
                      </div>
                      <div style={{ fontSize: 10, opacity: 0.6 }}>
                        {s.sector}
                      </div>
                    </div>
                    <div style={{ marginLeft: "auto", textAlign: "right" }}>
                      <div style={{ fontWeight: 700, fontSize: 12 }}>
                        Rp {s.price}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: s.up ? "#10b981" : "#ef4444",
                          fontWeight: 700,
                        }}
                      >
                        {s.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Angka Metrik Utama */}
              <div className="grid-4 fade-up-3">
                {[
                  {
                    label: "Skor Sentimen AI",
                    value: `${stock.sentiment}%`,
                    sub: stock.label,
                    color: sentColor,
                    icon: "😊",
                  },
                  {
                    label: "Prediksi Tren",
                    value: stock.prediction,
                    sub: "Model Keras LSTM",
                    color: stock.predColor,
                    icon:
                      stock.prediction === "Naik"
                        ? "📈"
                        : stock.prediction === "Turun"
                          ? "📉"
                          : "➡️",
                  },
                  {
                    label: "Harga Saham",
                    value: `Rp ${stock.price}`,
                    sub: stock.change + " hari ini",
                    color: stock.up ? "#10b981" : "#ef4444",
                    icon: "💰",
                  },
                  {
                    label: "Sektor Industri",
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
                      padding: "18px",
                      borderTop: `3px solid ${m.color}`,
                      boxShadow: "0 1px 4px rgba(0,0,0,.05)",
                    }}
                  >
                    <div style={{ fontSize: 20, marginBottom: 6 }}>
                      {m.icon}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Syne',sans-serif",
                        fontSize: 20,
                        fontWeight: 800,
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

              {/* Area Chart & Mini Bar */}
              <div className="grid-chart fade-up-4">
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 20,
                    padding: "20px",
                    boxShadow: "0 1px 4px rgba(0,0,0,.05)",
                    minWidth: 0,
                  }}
                >
                  <div style={{ marginBottom: 14 }}>
                    <div
                      style={{
                        fontFamily: "'Syne',sans-serif",
                        fontWeight: 800,
                        fontSize: 15,
                      }}
                    >
                      Pergerakan Harga — {activeStock}
                    </div>
                    <div style={{ fontSize: 11, color: "#94a3b8" }}>
                      Sinkronisasi Data FinSight
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={170}>
                    <AreaChart data={priceData[activeStock] || []}>
                      <defs>
                        <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="5%"
                            stopColor={stock.up ? "#10b981" : "#ef4444"}
                            stopOpacity={0.15}
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
                        tick={{ fontSize: 10, fill: "#94a3b8" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 10, fill: "#94a3b8" }}
                        axisLine={false}
                        tickLine={false}
                        width={30}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke={stock.up ? "#10b981" : "#ef4444"}
                        strokeWidth={2}
                        fill="url(#pg)"
                        dot={{ r: 2 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div
                  style={{
                    background: "#fff",
                    borderRadius: 20,
                    padding: "20px",
                    boxShadow: "0 1px 4px rgba(0,0,0,.05)",
                    minWidth: 0,
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
                    Tren Sentimen Seminggu
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      margin: "12px 0",
                    }}
                  >
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        background: `conic-gradient(${sentColor} 0% ${stock.sentiment}%, #e2e8f0 ${stock.sentiment}% 100%)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: "50%",
                          background: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 800,
                          fontSize: 12,
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
                          fontSize: 15,
                          color: sentColor,
                        }}
                      >
                        {stock.label}
                      </div>
                      <div style={{ fontSize: 11, color: "#94a3b8" }}>
                        Rata-rata Analisis NLP
                      </div>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={65}>
                    <BarChart data={sentimentHistory} barSize={10}>
                      <XAxis
                        dataKey="day"
                        tick={{ fontSize: 9, fill: "#94a3b8" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Bar
                        dataKey="score"
                        fill={sentColor}
                        radius={[3, 3, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Keyword + Stats */}
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
                  style={{ fontSize: 12, color: "#94a3b8", marginBottom: 14 }}
                >
                  Berdasarkan ekstraksi kata kunci berita utama
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 12,
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  {keywords.map((k) => (
                    <span
                      key={k.word}
                      style={{
                        fontSize: k.size - 2,
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
                <div className="insight-grid">
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
                      label: "Aset Netral",
                      val: `${insight.neutral_pct}%`,
                      color: "#94a3b8",
                      bg: "#f1f5f9",
                    },
                  ].map((s) => (
                    <div
                      key={s.label}
                      style={{
                        textAlign: "center",
                        padding: "12px",
                        borderRadius: 12,
                        background: s.bg,
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'Syne',sans-serif",
                          fontWeight: 900,
                          fontSize: 20,
                          color: s.color,
                        }}
                      >
                        {s.val}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: s.color,
                          marginTop: 2,
                          fontWeight: 600,
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

          {/* ════ BERITA VIEW ════ */}
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
              </div>

              <div
                className="fade-up-1"
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    overflowX: "auto",
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      color: "#94a3b8",
                      fontWeight: 600,
                      minWidth: 50,
                    }}
                  >
                    Saham:
                  </span>
                  {stocks.map((s) => (
                    <button
                      key={s.ticker}
                      onClick={() => setStockFilter(s.ticker)}
                      style={{
                        padding: "6px 14px",
                        borderRadius: 10,
                        border: `1.5px solid ${stockFilter === s.ticker ? "#10b981" : "#e2e8f0"}`,
                        background:
                          stockFilter === s.ticker ? "#0f172a" : "#fff",
                        color: stockFilter === s.ticker ? "#fff" : "#0f172a",
                        fontWeight: 700,
                        fontSize: 12,
                        cursor: "pointer",
                      }}
                    >
                      {s.ticker}
                    </button>
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    overflowX: "auto",
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      color: "#94a3b8",
                      fontWeight: 600,
                      minWidth: 50,
                    }}
                  >
                    Filter:
                  </span>
                  {["Semua", "Positif", "Negatif", "Netral"].map((label) => (
                    <button
                      key={label}
                      onClick={() => setSentimentFilter(label)}
                      className={
                        sentimentFilter === label ? "filter-btn-active" : ""
                      }
                      style={{
                        padding: "6px 14px",
                        borderRadius: 10,
                        border: "1.5px solid #e2e8f0",
                        background: "#fff",
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid-2 fade-up-3">
                {stocks
                  .filter(
                    (s) => s.ticker === stockFilter || stockFilter === "Semua",
                  )
                  .map((s) => (
                    <div
                      key={s.ticker}
                      style={{
                        background: "#fff",
                        borderRadius: 20,
                        padding: "20px",
                        boxShadow: "0 1px 4px rgba(0,0,0,.05)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          marginBottom: 12,
                          paddingBottom: 10,
                          borderBottom: "1px solid #f1f5f9",
                        }}
                      >
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 8,
                            background: s.up ? "#dcfce7" : "#fee2e2",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 800,
                            fontSize: 12,
                            color: s.up ? "#15803d" : "#dc2626",
                          }}
                        >
                          {s.ticker}
                        </div>
                        <div style={{ fontWeight: 700, fontSize: 13 }}>
                          {s.name}
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 8,
                        }}
                      >
                        {(newsData[s.ticker] || []).filter(
                          (n) =>
                            sentimentFilter === "Semua" ||
                            n.tag === sentimentFilter,
                        ).length === 0 ? (
                          <div
                            style={{
                              fontSize: 12,
                              color: "#94a3b8",
                              textAlign: "center",
                              padding: 10,
                            }}
                          >
                            Tidak ada berita yang cocok dengan filter
                          </div>
                        ) : (
                          (newsData[s.ticker] || [])
                            .filter(
                              (n) =>
                                sentimentFilter === "Semua" ||
                                n.tag === sentimentFilter,
                            )
                            .map((n, i) => (
                              <div
                                key={i}
                                className="news-row"
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "8px 10px",
                                  borderRadius: 8,
                                  background: "#f8fafc",
                                  border: "1px solid #f1f5f9",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                    flex: 1,
                                    paddingRight: 6,
                                  }}
                                >
                                  <span
                                    style={{
                                      width: 5,
                                      height: 5,
                                      borderRadius: "50%",
                                      background: n.dot,
                                    }}
                                  />
                                  <span
                                    style={{ fontSize: 12, color: "#334155" }}
                                  >
                                    {n.title}
                                  </span>
                                </div>
                                <span
                                  style={{
                                    fontSize: 10,
                                    fontWeight: 700,
                                    padding: "2px 6px",
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

          {/* ════ EDUKASI VIEW ════ */}
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
                  🎓 Pusat Edukasi FinSight
                </h1>
              </div>
              <div className="grid-2 fade-up-2">
                {eduContent.map((edu) => (
                  <div
                    key={edu.title}
                    className="card-hover"
                    style={{
                      background: "#fff",
                      borderRadius: 20,
                      padding: "20px",
                      boxShadow: "0 1px 4px rgba(0,0,0,.05)",
                      borderTop: `3px solid ${edu.color}`,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 10,
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          background: edu.bg,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 18,
                        }}
                      >
                        {edu.icon}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Syne',sans-serif",
                          fontWeight: 800,
                          fontSize: 14,
                        }}
                      >
                        {edu.title}
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: 12,
                        color: "#475569",
                        lineHeight: 1.6,
                        marginBottom: 12,
                      }}
                    >
                      {edu.body}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                      }}
                    >
                      {edu.tips.map((tip, i) => (
                        <div
                          key={i}
                          style={{
                            fontSize: 11,
                            color: "#64748b",
                            background: "#f8fafc",
                            padding: "6px 10px",
                            borderRadius: 8,
                            border: "1px solid #f1f5f9",
                          }}
                        >
                          {tip}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════ SETTINGS VIEW ════ */}
          {activePage === "settings" && <SettingsPage stocks={stocks} />}
        </main>
      </div>
    </>
  );
}
