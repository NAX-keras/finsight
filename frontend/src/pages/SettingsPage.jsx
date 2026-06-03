// src/pages/SettingsPage.jsx
import { useState } from "react";

export default function SettingsPage({ stocks }) {
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
