import { useMemo, useState } from "react";

/* ── SETTINGS PAGE ───────────────────────────────────────────── */
export default function SettingsPage({ stocks, watchlist, setWatchlist, dataSource }) {
  const [keyword, setKeyword] = useState("");

  const toggleWatchlist = (ticker) =>
    setWatchlist((prev) => ({ ...prev, [ticker]: !prev[ticker] }));

  const setAllWatchlist = (value) =>
    setWatchlist((prev) => ({
      ...prev,
      ...Object.fromEntries(stocks.map((s) => [s.ticker, value])),
    }));

  const filteredStocks = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return stocks;
    return stocks.filter(
      (s) =>
        s.ticker.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.sector.toLowerCase().includes(q),
    );
  }, [keyword, stocks]);

  const watchedCount = stocks.filter((s) => watchlist[s.ticker]).length;

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
          Kelola watchlist saham dan preferensi tampilan FinSight
        </p>
      </div>

      <div className="grid-3 fade-up-1">
        {[
          { icon: "⭐", label: "Dalam Watchlist", value: watchedCount, sub: "saham aktif dipantau", color: "#10b981" },
          { icon: "📊", label: "Total Saham", value: stocks.length, sub: "tersedia di dashboard", color: "#0891b2" },
          { icon: "🔁", label: "Sumber Data", value: dataSource || "Auto", sub: "backend jika tersedia", color: "#f59e0b" },
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
            <div style={{ fontSize: 20, marginBottom: 14 }}>{m.icon}</div>
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
            <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 5 }}>{m.label}</div>
          </div>
        ))}
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
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 14,
            marginBottom: 18,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 800,
                fontSize: 16,
                color: "#0f172a",
              }}
            >
              ⭐ Manajemen Watchlist Saham
            </div>
            <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>
              Pilih saham yang ingin tampil di Dashboard dan tab Berita
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => setAllWatchlist(true)}
              style={{
                border: "1.5px solid #bbf7d0",
                background: "#dcfce7",
                color: "#15803d",
                borderRadius: 12,
                padding: "10px 13px",
                fontFamily: "inherit",
                fontSize: 12,
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              Pilih Semua
            </button>
            <button
              onClick={() => setAllWatchlist(false)}
              style={{
                border: "1.5px solid #e2e8f0",
                background: "#f8fafc",
                color: "#64748b",
                borderRadius: 12,
                padding: "10px 13px",
                fontFamily: "inherit",
                fontSize: 12,
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              Kosongkan
            </button>
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Cari saham..."
              style={{
                border: "1.5px solid #e2e8f0",
                borderRadius: 12,
                padding: "11px 14px",
                minWidth: 220,
                outline: "none",
                fontFamily: "inherit",
                fontSize: 13,
                fontWeight: 600,
                color: "#0f172a",
              }}
            />
          </div>
        </div>

        <div className="grid-2">
          {filteredStocks.map((s) => {
            const active = !!watchlist[s.ticker];
            return (
              <div
                key={s.ticker}
                onClick={() => toggleWatchlist(s.ticker)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "13px 16px",
                  borderRadius: 14,
                  background: active ? "#f0fdf4" : "#f8fafc",
                  border: `1.5px solid ${active ? "#86efac" : "#f1f5f9"}`,
                  cursor: "pointer",
                  transition: "all .2s",
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
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
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 800, fontSize: 13, color: "#0f172a" }}>
                    {s.name}
                  </div>
                  <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>
                    {s.sector} • Rp {s.price}
                  </div>
                </div>
                <div
                  style={{
                    padding: "7px 11px",
                    borderRadius: 999,
                    background: active ? "#dcfce7" : "#f1f5f9",
                    color: active ? "#15803d" : "#64748b",
                    fontSize: 11,
                    fontWeight: 800,
                    flexShrink: 0,
                  }}
                >
                  {active ? "Dipantau" : "Nonaktif"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
