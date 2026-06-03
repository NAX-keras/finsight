import { useState, useEffect, useMemo, useRef } from "react";
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

import { globalCSS } from "../styles/dashboardStyles";
import { apiFetch, HAS_BACKEND } from "../services/apiClient";
import { SIG_TO_ID, SIG_COLOR, mapApiToStocksArray, mapApiToPriceData, mapApiToNewsDict } from "../utils/mappers";
import { FB_STOCKS, FB_PRICE, FB_SENT_HIST, FB_NEWS, FB_INSIGHT } from "../data/fallbackData";
import { keywords, eduContent } from "../constants/content";
import { CustomTooltip, LiveClock, getTodayId } from "./common/dashboardHelpers";
import AIPage from "../pages/AIPage";
import SettingsPage from "../pages/SettingsPage";

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
  const [ihsg, setIhsg] = useState({
    formatted: "7.412",
    change_str: "+0.64%",
    up: true,
  });
  const [loadingData, setLoadingData] = useState(false);

  const [sentimentFilter, setSentimentFilter] = useState("Semua");
  const [stockFilter, setStockFilter] = useState("ALL");
  const [selectedNewsDetail, setSelectedNewsDetail] = useState(null);
  const [dataSource, setDataSource] = useState(
    HAS_BACKEND ? "Data: Offline" : "Data: Offline",
  );
  const [highlightedStock, setHighlightedStock] = useState("");
  const stockRefs = useRef({});

  const [watchlist, setWatchlist] = useState(() => {
    const initial = Object.fromEntries(FB_STOCKS.map((s) => [s.ticker, true]));
    try {
      const saved = localStorage.getItem("finsight_watchlist");
      return saved ? { ...initial, ...JSON.parse(saved) } : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("finsight_watchlist", JSON.stringify(watchlist));
    } catch {
      // localStorage bisa tidak tersedia di beberapa environment.
    }
  }, [watchlist]);

  const watchedStocks = useMemo(
    () => stocks.filter((s) => watchlist[s.ticker] !== false),
    [stocks, watchlist],
  );
  const displayStocks = watchedStocks.length ? watchedStocks : stocks;

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
        setDataSource("Data: Online");
        const allowedTickers = FB_STOCKS.map((s) => s.ticker);
        const apiStocksFiltered = Object.fromEntries(
          Object.entries(apiStocks).filter(
            ([ticker]) => ticker !== "GOTO" && allowedTickers.includes(ticker),
          ),
        );
        const apiMapped = mapApiToStocksArray(apiStocksFiltered);
        const mergedStocks = FB_STOCKS.map(
          (fallbackStock) =>
            apiMapped.find((apiStock) => apiStock.ticker === fallbackStock.ticker) ||
            fallbackStock,
        );
        const tickers = mergedStocks.map((s) => s.ticker);
        setStocks(mergedStocks);
        setPriceData({ ...FB_PRICE, ...mapApiToPriceData(apiStocksFiltered) });
        setNewsData({ ...FB_NEWS, ...mapApiToNewsDict(apiNews || [], tickers) });
        setStockFilter((prev) => (prev === "ALL" || tickers.includes(prev) ? prev : "ALL"));
        setActiveStock((prev) => (tickers.includes(prev) ? prev : tickers[0] || "BBRI"));
      }
      if (apiSentHist && apiSentHist.length > 0)
        setSentimentHistory(apiSentHist);
      if (apiInsight) setInsight(apiInsight);
      if (apiIhsg) setIhsg(apiIhsg);
      if (!apiStocks || Object.keys(apiStocks).length === 0) {
        setDataSource("Data: Offline");
      }
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

  useEffect(() => {
    if (!displayStocks.some((s) => s.ticker === activeStock) && displayStocks[0]) {
      setActiveStock(displayStocks[0].ticker);
    }
    if (stockFilter !== "ALL" && !displayStocks.some((s) => s.ticker === stockFilter)) {
      setStockFilter("ALL");
    }
  }, [displayStocks, activeStock, stockFilter]);

  useEffect(() => {
    if (activePage !== "dashboard" || !activeStock) return undefined;
    const timer = setTimeout(() => {
      const card = stockRefs.current[activeStock];
      if (card) {
        card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        setHighlightedStock(activeStock);
      }
    }, 80);
    const clearTimer = setTimeout(() => setHighlightedStock(""), 1800);
    return () => {
      clearTimeout(timer);
      clearTimeout(clearTimer);
    };
  }, [activeStock, activePage, displayStocks.length]);

  const handleSearch = () => {
    const val = ticker.trim().toUpperCase();
    if (!val) return;
    const found = stocks.find((s) => s.ticker === val);
    if (found) {
      setWatchlist((prev) => ({ ...prev, [found.ticker]: true }));
      setActiveStock(found.ticker);
      setHighlightedStock(found.ticker);
      setActivePage("dashboard");
      setTicker("");
      setSearchError("");
    } else {
      const available = stocks.map((s) => s.ticker).join(", ");
      setSearchError(`Saham "${val}" tak ditemukan. Tersedia: ${available}`);
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

  const allNewsFlat = displayStocks.flatMap((s) =>
    (newsData[s.ticker] || []).map((n, index) => ({
      ...n,
      id: `${s.ticker}-${index}`,
      ticker: s.ticker,
      stockName: s.name,
      sector: s.sector,
      price: s.price,
      change: s.change,
      up: s.up,
    })),
  );
  const filteredNews = allNewsFlat.filter(
    (n) =>
      (stockFilter === "ALL" || n.ticker === stockFilter) &&
      (sentimentFilter === "Semua" || n.tag === sentimentFilter),
  );
  const selectedNewsStock = stockFilter === "ALL" ? null : stocks.find((s) => s.ticker === stockFilter);
  const selectedNews = filteredNews;
  const newsTotal = allNewsFlat.length;
  const newsPositif = allNewsFlat.filter((n) => n.tag === "Positif").length;
  const newsNegatif = allNewsFlat.filter((n) => n.tag === "Negatif").length;
  const newsNetral = allNewsFlat.filter((n) => n.tag === "Netral").length;

  const dominantValue = String(insight.dominant || "Netral");
  const dominantSub = dominantValue.toLowerCase().includes("bull") || dominantValue.toLowerCase().includes("positif")
    ? "Mayoritas sentimen pasar menunjukkan arah positif."
    : dominantValue.toLowerCase().includes("bear") || dominantValue.toLowerCase().includes("negatif")
      ? "Sentimen pasar menunjukkan tekanan negatif."
      : "Sentimen pasar masih relatif stabil.";
  const watchlistSub = "Saham dengan sentimen tertinggi hari ini.";
  const attentionSub = insight.attention_sub && !String(insight.attention_sub).toLowerCase().includes("dataset")
    ? insight.attention_sub
    : "Perlu perhatian berdasarkan pergerakan pasar.";

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
                  width: 34,
                  height: 34,
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
                  onError={(e) => (e.target.style.display = "none")}
                />
              </span>
              FinSight
            </div>
            <div
              style={{
                fontSize: 9,
                color: "#1e3a5f",
                letterSpacing: "1.1px",
                textTransform: "uppercase",
                fontWeight: 700,
                marginTop: 4,
                lineHeight: 1.5,
                maxWidth: 190,
              }}
            >
              ANALISIS SENTIMEN DAN PREDIKSI SAHAM
            </div>
          </div>

          <div className="nav-menu">
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
                    borderBottom:
                      window.innerWidth < 768 && active
                        ? "3px solid #10b981"
                        : "3px solid transparent",
                    borderLeft:
                      window.innerWidth >= 768 && active
                        ? "3px solid #10b981"
                        : window.innerWidth >= 768
                          ? "3px solid transparent"
                          : "none",
                  }}
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
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="main-content">
          {activePage === "ai" && <AIPage />}
          {activePage === "settings" && (
            <SettingsPage
              stocks={stocks}
              watchlist={watchlist}
              setWatchlist={setWatchlist}
              dataSource={dataSource}
            />
          )}

          {/* ════ DASHBOARD PAGE ════ */}
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
                    {getTodayId()}{" "}
                    {loadingData && (
                      <span style={{ color: "#10b981", fontWeight: 600 }}>
                        ⟳ Memuat...
                      </span>
                    )}
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        marginLeft: 10,
                        padding: "4px 9px",
                        borderRadius: 999,
                        background: dataSource === "Data: Online" ? "rgba(16,185,129,.10)" : "rgba(148,163,184,.14)",
                        color: dataSource === "Data: Online" ? "#0f766e" : "#64748b",
                        fontSize: 10,
                        fontWeight: 700,
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: dataSource === "Data: Online" ? "#10b981" : "#94a3b8",
                        }}
                      />
                      {dataSource}
                    </span>
                  </p>
                </div>
                <div className="header-actions">
                  <div
                    className="search-container"
                    style={{ display: "flex", gap: 10, alignItems: "center" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        background: "#fff",
                        borderRadius: 12,
                        border: `1.5px solid ${searchError ? "#ef4444" : "#e2e8f0"}`,
                        overflow: "hidden",
                        flex: 1,
                      }}
                    >
                      <input
                        className="search-input"
                        value={ticker}
                        onChange={(e) => {
                          setTicker(e.target.value.toUpperCase());
                          setSearchError("");
                        }}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        placeholder="Cari saham... (Cth: BBRI)"
                        style={{
                          border: "none",
                          outline: "none",
                          padding: "10px 14px",
                          fontSize: 13,
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
                        }}
                      >
                        Cari
                      </button>
                    </div>
                  </div>
                  {searchError && (
                    <div
                      style={{
                        fontSize: 11,
                        color: "#ef4444",
                        fontWeight: 600,
                        background: "#fee2e2",
                        padding: "4px 12px",
                        borderRadius: 8,
                      }}
                    >
                      ⚠️ {searchError}
                    </div>
                  )}
                </div>
              </div>

              {/* Insight Harian */}
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
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 18,
                    position: "relative",
                    zIndex: 2,
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
                </div>
                <div
                  className="insight-grid"
                  style={{ position: "relative", zIndex: 2 }}
                >
                  {[
                    {
                      icon: "📊",
                      label: "Sentimen Dominan",
                      value: insight.dominant,
                      sub: dominantSub,
                      color: "#10b981",
                    },
                    {
                      icon: "👀",
                      label: "Saham Diamati",
                      value: insight.watchlist,
                      sub: watchlistSub,
                      color: "#38bdf8",
                    },
                    {
                      icon: "⚡",
                      label: "Perlu Diperhatikan",
                      value: insight.attention,
                      sub: attentionSub,
                      color: "#f59e0b",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      style={{
                        background: "rgba(255,255,255,.04)",
                        borderRadius: 14,
                        padding: "16px 18px",
                        borderLeft: `3px solid ${item.color}`,
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
                        style={{ fontSize: 11, color: "#64748b", marginTop: 5 }}
                      >
                        {item.sub}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stock Tabs */}
              <div className="stock-tabs fade-up-2">
                {displayStocks.map((s) => {
                  const isActive = activeStock === s.ticker;
                  const badgeTheme =
                    s.prediction === "Naik"
                      ? {
                          bg: isActive ? "rgba(16,185,129,.18)" : "#dcfce7",
                          border: isActive ? "rgba(16,185,129,.35)" : "#bbf7d0",
                          text: "#10b981",
                          icon: "↑",
                        }
                      : s.prediction === "Turun"
                        ? {
                            bg: isActive ? "rgba(239,68,68,.16)" : "#fee2e2",
                            border: isActive ? "rgba(248,113,113,.28)" : "#fecaca",
                            text: "#ef4444",
                            icon: "↓",
                          }
                        : {
                            bg: isActive ? "rgba(245,158,11,.18)" : "#fef3c7",
                            border: isActive ? "rgba(251,191,36,.30)" : "#fde68a",
                            text: "#d97706",
                            icon: "→",
                          };

                  return (
                    <div
                      key={s.ticker}
                      ref={(el) => {
                        stockRefs.current[s.ticker] = el;
                      }}
                      className={`stock-tab ${highlightedStock === s.ticker ? "stock-tab-highlight" : ""}`}
                      onClick={() => setActiveStock(s.ticker)}
                      style={{
                        background: isActive
                          ? "linear-gradient(135deg,#0f172a,#111f36)"
                          : "#fff",
                        color: isActive ? "#fff" : "#0f172a",
                        border: 
                                                                              `1.5px solid ${isActive ? "#10b981" : "#e2e8f0"}`,
                        borderRadius: 18,
                        padding: "14px 16px",
                        cursor: "pointer",
                        display: "flex",
                        gap: 14,
                        alignItems: "center",
                        minWidth: 270,
                        justifyContent: "space-between",
                        boxShadow: isActive
                          ? "0 12px 26px rgba(15,23,42,.22)"
                          : "0 2px 8px rgba(15,23,42,.06)",
                      }}
                    >
                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontFamily: "'Syne',sans-serif",
                            fontWeight: 800,
                            fontSize: 16,
                            lineHeight: 1.1,
                            marginBottom: 6,
                          }}
                        >
                          {s.ticker}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: isActive ? "rgba(255,255,255,.70)" : "#64748b",
                            fontWeight: 500,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: 95,
                          }}
                        >
                          {s.sector}
                        </div>
                      </div>

                      <div style={{ textAlign: "left", minWidth: 74 }}>
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: 13,
                            marginBottom: 4,
                            color: isActive ? "#f8fafc" : "#0f172a",
                          }}
                        >
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
                          padding: "9px 12px",
                          borderRadius: 999,
                          fontSize: 12,
                          fontWeight: 700,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                          background: badgeTheme.bg,
                          color: badgeTheme.text,
                          border: `1px solid ${badgeTheme.border}`,
                          boxShadow: isActive
                            ? "inset 0 1px 0 rgba(255,255,255,.06)"
                            : "none",
                          flexShrink: 0,
                        }}
                      >
                        <span style={{ fontSize: 12, lineHeight: 1 }}>
                          {badgeTheme.icon}
                        </span>
                        <span>{s.prediction}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Metric Cards */}
              <div className="grid-4 fade-up-3">
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
                    sub: "Estimasi AI",
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
                      padding: "20px",
                      borderTop: `3px solid ${m.color}`,
                      boxShadow: "0 1px 4px rgba(0,0,0,.07)",
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
              <div className="grid-chart fade-up-4">
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 20,
                    padding: "22px 24px",
                    boxShadow: "0 1px 4px rgba(0,0,0,.07)",
                    minWidth: 0,
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
                        Pergerakan {activeStock}
                      </div>
                      <div
                        style={{ fontSize: 12, color: "#94a3b8", marginTop: 3 }}
                      >
                        8 bulan terakhir
                      </div>
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
                        width={35}
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
                    minWidth: 0,
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
                        width: 70,
                        height: 70,
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
                          width: 50,
                          height: 50,
                          borderRadius: "50%",
                          background: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "'Syne',sans-serif",
                          fontWeight: 900,
                          fontSize: 14,
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
                      <div style={{ fontSize: 11, color: "#94a3b8" }}>
                        Rata-rata sentimen pasar
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

              {/* Keyword Trending */}
              <div
                className="fade-up-5"
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  padding: "22px 24px",
                  boxShadow: "0 1px 4px rgba(0,0,0,.07)",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 14,
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "'Syne',sans-serif",
                        fontWeight: 800,
                        fontSize: 17,
                        color: "#0f172a",
                      }}
                    >
                      🔤 Keyword Trending
                    </div>
                    <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>
                      Kata kunci yang sering muncul dalam berita dan sentimen pasar
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActivePage("news")}
                    style={{
                      border: "none",
                      background: "#dcfce7",
                      color: "#15803d",
                      borderRadius: 999,
                      padding: "9px 14px",
                      fontSize: 12,
                      fontWeight: 800,
                      cursor: "pointer",
                    }}
                  >
                    Lihat Berita →
                  </button>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    flexWrap: "wrap",
                  }}
                >
                  {keywords.map((k) => (
                    <span
                      key={k.word}
                      style={{
                        fontSize: k.size,
                        fontWeight: k.weight,
                        color: k.color,
                        lineHeight: 1.4,
                      }}
                    >
                      {k.word}
                    </span>
                  ))}
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                    gap: 12,
                    marginTop: 18,
                  }}
                  className="keyword-summary-grid"
                >
                  {[
                    { value: `${insight.bullish_pct || 0}%`, label: "Bullish Signal", bg: "#dcfce7", color: "#15803d" },
                    { value: `${insight.bearish_pct || 0}%`, label: "Bearish Signal", bg: "#fee2e2", color: "#dc2626" },
                    { value: `${insight.neutral_pct || 0}%`, label: "Netral", bg: "#f1f5f9", color: "#64748b" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      style={{
                        background: item.bg,
                        borderRadius: 14,
                        padding: "14px 16px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'Syne',sans-serif",
                          fontWeight: 900,
                          color: item.color,
                          fontSize: 22,
                        }}
                      >
                        {item.value}
                      </div>
                      <div style={{ color: item.color, fontSize: 12, fontWeight: 700, marginTop: 4 }}>
                        {item.label}
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
                <p
                  style={{ color: "#64748b", fontSize: 13, margin: "4px 0 0" }}
                >
                  Berita terkini dan analisis sentimen per saham — Senin, 12 Mei 2025
                </p>
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
                  <div style={{ display: "flex", gap: 8, flexWrap: "nowrap" }}>
                    <button
                      onClick={() => setStockFilter("ALL")}
                      style={{
                        padding: "7px 16px",
                        borderRadius: 10,
                        border: `1.5px solid ${stockFilter === "ALL" ? "#10b981" : "#e2e8f0"}`,
                        background: stockFilter === "ALL" ? "#0f172a" : "#fff",
                        color: stockFilter === "ALL" ? "#fff" : "#0f172a",
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Semua
                    </button>
                    {displayStocks.map((s) => (
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
                          whiteSpace: "nowrap",
                        }}
                      >
                        {s.ticker}
                      </button>
                    ))}
                  </div>
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
                  <div style={{ display: "flex", gap: 8, flexWrap: "nowrap" }}>
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
                          whiteSpace: "nowrap",
                        }}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid-4 fade-up-2">
                {[
                  { icon: "📋", value: newsTotal, sub: `${displayStocks.length} saham watchlist`, label: "Total Berita", color: "#0891b2" },
                  { icon: "📈", value: newsPositif, sub: `${newsTotal ? Math.round((newsPositif / newsTotal) * 100) : 0}% dari total`, label: "Sentimen Positif", color: "#10b981" },
                  { icon: "📉", value: newsNegatif, sub: `${newsTotal ? Math.round((newsNegatif / newsTotal) * 100) : 0}% dari total`, label: "Sentimen Negatif", color: "#ef4444" },
                  { icon: "➖", value: newsNetral, sub: `${newsTotal ? Math.round((newsNetral / newsTotal) * 100) : 0}% dari total`, label: "Sentimen Netral", color: "#64748b" },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="card-hover"
                    style={{
                      background: "#fff",
                      borderRadius: 18,
                      padding: "22px 24px",
                      borderTop: `3px solid ${m.color}`,
                      boxShadow: "0 1px 4px rgba(0,0,0,.07)",
                    }}
                  >
                    <div style={{ fontSize: 20, marginBottom: 16 }}>{m.icon}</div>
                    <div
                      style={{
                        fontFamily: "'Syne',sans-serif",
                        fontSize: 26,
                        fontWeight: 800,
                        color: "#0f172a",
                        lineHeight: 1,
                      }}
                    >
                      {m.value}
                    </div>
                    <div style={{ fontSize: 12, color: m.color, fontWeight: 800, marginTop: 8 }}>
                      {m.sub}
                    </div>
                    <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 5 }}>
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="fade-up-3"
                style={{
                  background: "#fff",
                  borderRadius: 18,
                  padding: "16px 18px",
                  boxShadow: "0 1px 4px rgba(0,0,0,.07)",
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 700 }}>
                    Hasil filter aktif
                  </div>
                  <div
                    style={{
                      fontFamily: "'Syne',sans-serif",
                      fontSize: 17,
                      fontWeight: 800,
                      color: "#0f172a",
                      marginTop: 3,
                    }}
                  >
                    {stockFilter === "ALL" ? "Menampilkan semua berita watchlist" : `Menampilkan berita untuk: ${selectedNewsStock?.ticker || "-"}`}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      padding: "7px 12px",
                      borderRadius: 999,
                      background: "#f0fdf4",
                      color: "#15803d",
                      fontSize: 12,
                      fontWeight: 800,
                    }}
                  >
                    {stockFilter === "ALL" ? "Saham: Semua" : `Saham: ${selectedNewsStock?.ticker || "-"}`}
                  </span>
                  <span
                    style={{
                      padding: "7px 12px",
                      borderRadius: 999,
                      background: "#f8fafc",
                      color: "#475569",
                      fontSize: 12,
                      fontWeight: 800,
                    }}
                  >
                    Filter: {sentimentFilter}
                  </span>
                  <span
                    style={{
                      padding: "7px 12px",
                      borderRadius: 999,
                      background: "#eff6ff",
                      color: "#1d4ed8",
                      fontSize: 12,
                      fontWeight: 800,
                    }}
                  >
                    {selectedNews.length} berita ditemukan
                  </span>
                </div>
              </div>

              {selectedNews.length === 0 ? (
                <div
                  className="fade-up-4"
                  style={{
                    background: "#fff",
                    borderRadius: 20,
                    padding: "34px 24px",
                    textAlign: "center",
                    border: "1px dashed #cbd5e1",
                    boxShadow: "0 1px 4px rgba(0,0,0,.05)",
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 10 }}>🗞️</div>
                  <div
                    style={{
                      fontFamily: "'Syne',sans-serif",
                      fontSize: 18,
                      fontWeight: 800,
                      color: "#0f172a",
                    }}
                  >
                    Belum ada berita yang cocok
                  </div>
                  <p style={{ color: "#64748b", fontSize: 13, marginTop: 8 }}>
                    Belum ada berita {sentimentFilter} untuk {stockFilter === "ALL" ? "watchlist" : stockFilter}. Coba pilih filter Semua atau saham lain.
                  </p>
                </div>
              ) : (
                <div className="grid-2 fade-up-4">
                  {selectedNews.map((n) => (
                    <button
                      key={n.id}
                      type="button"
                      onClick={() => setSelectedNewsDetail(n)}
                      className="card-hover news-row news-card-main"
                      style={{
                        background: "#fff",
                        borderRadius: 20,
                        padding: "20px 22px",
                        boxShadow: "0 1px 4px rgba(0,0,0,.07)",
                        border: "1px solid #e2e8f0",
                        cursor: "pointer",
                        textAlign: "left",
                        fontFamily: "inherit",
                        width: "100%",
                        maxWidth: "100%",
                        minWidth: 0,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        className="news-card-header"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 14,
                          marginBottom: 14,
                          paddingBottom: 14,
                          borderBottom: "1px solid #f1f5f9",
                        }}
                      >
                        <div className="news-card-stock" style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                          <div
                            style={{
                              width: 44,
                              height: 44,
                              borderRadius: 12,
                              flexShrink: 0,
                              background: n.up
                                ? "linear-gradient(135deg,#dcfce7,#bbf7d0)"
                                : "linear-gradient(135deg,#fee2e2,#fecaca)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontFamily: "'Syne',sans-serif",
                              fontWeight: 900,
                              fontSize: 11,
                              color: n.up ? "#15803d" : "#dc2626",
                            }}
                          >
                            {n.ticker}
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <div
                              style={{
                                fontFamily: "'Syne',sans-serif",
                                fontWeight: 800,
                                fontSize: 14,
                                color: "#0f172a",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: 260,
                                overflowWrap: "anywhere",
                              }}
                            >
                              {n.stockName}
                            </div>
                            <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 3 }}>
                              {n.sector}
                            </div>
                          </div>
                        </div>
                        <div className="news-card-price" style={{ textAlign: "right", flexShrink: 0 }}>
                          <div style={{ fontWeight: 800, fontSize: 14, color: "#0f172a" }}>
                            Rp {n.price}
                          </div>
                          <div
                            style={{
                              fontSize: 12,
                              fontWeight: 800,
                              color: n.up ? "#10b981" : "#ef4444",
                              marginTop: 3,
                            }}
                          >
                            {n.change}
                          </div>
                        </div>
                      </div>

                      <div
                        className="news-card-body"
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 10,
                        }}
                      >
                        <span
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: "50%",
                            background: n.dot,
                            flexShrink: 0,
                            marginTop: 8,
                          }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontSize: 13,
                              color: "#334155",
                              lineHeight: 1.55,
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              overflowWrap: "anywhere",
                              wordBreak: "break-word",
                            }}
                          >
                            {n.title}
                          </div>
                          <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 10 }}>
                            Klik untuk lihat detail berita
                          </div>
                        </div>
                        <span
                          className="news-sentiment-pill"
                          style={{
                            fontSize: 11,
                            fontWeight: 800,
                            padding: "5px 10px",
                            borderRadius: 999,
                            background: n.bg,
                            color: n.tc,
                            whiteSpace: "nowrap",
                            flexShrink: 0,
                          }}
                        >
                          {n.tag}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ════ EDUKASI PAGE ════ */}


          {selectedNewsDetail && (
            <div
              onClick={() => setSelectedNewsDetail(null)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(15,23,42,.58)",
                zIndex: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 18,
                backdropFilter: "blur(4px)",
              }}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: "min(680px, 100%)",
                  maxHeight: "86vh",
                  overflowY: "auto",
                  background: "#fff",
                  borderRadius: 24,
                  padding: "24px 26px",
                  boxShadow: "0 24px 80px rgba(15,23,42,.30)",
                  border: "1px solid rgba(226,232,240,.8)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 14,
                    marginBottom: 18,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 14,
                        background: selectedNewsDetail.up
                          ? "linear-gradient(135deg,#dcfce7,#bbf7d0)"
                          : "linear-gradient(135deg,#fee2e2,#fecaca)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'Syne',sans-serif",
                        fontWeight: 900,
                        fontSize: 12,
                        color: selectedNewsDetail.up ? "#15803d" : "#dc2626",
                        flexShrink: 0,
                      }}
                    >
                      {selectedNewsDetail.ticker}
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "'Syne',sans-serif",
                          fontSize: 18,
                          fontWeight: 800,
                          color: "#0f172a",
                        }}
                      >
                        Detail Berita {selectedNewsDetail.ticker}
                      </div>
                      <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>
                        {selectedNewsDetail.stockName} • {selectedNewsDetail.sector}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedNewsDetail(null)}
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 999,
                      border: "1px solid #e2e8f0",
                      background: "#f8fafc",
                      color: "#475569",
                      cursor: "pointer",
                      fontWeight: 900,
                      fontSize: 16,
                    }}
                  >
                    ×
                  </button>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    marginBottom: 18,
                  }}
                >
                  <span
                    style={{
                      padding: "7px 12px",
                      borderRadius: 999,
                      background: selectedNewsDetail.bg,
                      color: selectedNewsDetail.tc,
                      fontSize: 12,
                      fontWeight: 800,
                    }}
                  >
                    Sentimen: {selectedNewsDetail.tag}
                  </span>
                  <span
                    style={{
                      padding: "7px 12px",
                      borderRadius: 999,
                      background: "#f8fafc",
                      color: "#475569",
                      fontSize: 12,
                      fontWeight: 800,
                    }}
                  >
                    Harga: Rp {selectedNewsDetail.price}
                  </span>
                  <span
                    style={{
                      padding: "7px 12px",
                      borderRadius: 999,
                      background: selectedNewsDetail.up ? "#f0fdf4" : "#fef2f2",
                      color: selectedNewsDetail.up ? "#15803d" : "#dc2626",
                      fontSize: 12,
                      fontWeight: 800,
                    }}
                  >
                    Perubahan: {selectedNewsDetail.change}
                  </span>
                </div>

                <div
                  style={{
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: 18,
                    padding: "18px 20px",
                    marginBottom: 16,
                  }}
                >
                  <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 800, marginBottom: 8 }}>
                    Isi berita lengkap
                  </div>
                  <p
                    style={{
                      fontSize: 15,
                      color: "#334155",
                      lineHeight: 1.8,
                      margin: 0,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {selectedNewsDetail.content || selectedNewsDetail.title}
                  </p>
                  {(selectedNewsDetail.source || selectedNewsDetail.publishedAt || selectedNewsDetail.url) && (
                    <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid #e2e8f0" }}>
                      {selectedNewsDetail.source && (
                        <div style={{ fontSize: 11, color: "#64748b", fontWeight: 700 }}>
                          Sumber: {selectedNewsDetail.source}
                        </div>
                      )}
                      {selectedNewsDetail.publishedAt && (
                        <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>
                          Waktu: {selectedNewsDetail.publishedAt}
                        </div>
                      )}
                      {selectedNewsDetail.url && (
                        <a
                          href={selectedNewsDetail.url}
                          target="_blank"
                          rel="noreferrer"
                          style={{ display: "inline-block", fontSize: 11, color: "#0891b2", fontWeight: 800, marginTop: 8, textDecoration: "none" }}
                        >
                          Buka sumber asli ↗
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <div
                  style={{
                    background: "#fff7ed",
                    border: "1px solid #fed7aa",
                    borderRadius: 18,
                    padding: "16px 18px",
                  }}
                >
                  <div style={{ fontSize: 12, color: "#9a3412", fontWeight: 900, marginBottom: 7 }}>
                    Keterangan analisis sentimen
                  </div>
                  <p style={{ fontSize: 13, color: "#7c2d12", lineHeight: 1.7, margin: 0 }}>
                    Terindikasi {String(selectedNewsDetail.tag || "netral").toLowerCase()} berdasarkan kata kunci dan konteks berita.
                  </p>
                </div>
              </div>
            </div>
          )}

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
                  Pahami cara kerja FinSight
                </p>
              </div>
              <div className="grid-2 fade-up-2">
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
            </div>
          )}
        </main>
      </div>
    </>
  );
}
