import { useState, useEffect } from "react";

/* ── HELPERS ─────────────────────────────────────────────────── */
export const CustomTooltip = ({ active, payload, label }) => {
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

export function LiveClock() {
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

export function getTodayId() {
  return new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
