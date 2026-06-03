import React from "react";

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

export default function EdukasiPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={{ animation: "fadeUp .45s ease both" }}>
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
        <p style={{ color: "#64748b", fontSize: 13, margin: "4px 0 0" }}>
          Pahami cara kerja FinSight
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 14,
          animation: "fadeUp .45s .12s ease both",
        }}
      >
        {eduContent.map((edu) => (
          <div
            key={edu.title}
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: "22px 24px",
              boxShadow: "0 1px 4px rgba(0,0,0,.07)",
              borderTop: `3px solid ${edu.color}`,
              transition: "transform .2s, box-shadow .2s",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,.10)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,.07)";
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
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
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
                    style={{ color: edu.color, fontWeight: 800, flexShrink: 0 }}
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
  );
}
