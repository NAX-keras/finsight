import { useState } from "react";

// ⚠️ Nanti kita akan buka (uncomment) baris-baris ini setelah file-nya kita buat di folder 'pages'
// import MainOverview from "../pages/MainOverview";
// import NewsPage from "../pages/NewsPage";
import EdukasiPage from "../pages/EdukasiPage";
// import AIPage from "../pages/AIPage";
// import SettingsPage from "../pages/SettingsPage";

/* ── CSS ARSITEKTUR RESPONSIF (MOBILE FIRST) ────────────────── */
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Syne:wght@700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  
  .layout-wrapper { display: flex; flex-direction: column; min-height: 100vh; background: #f0f4f8; font-family: 'Plus Jakarta Sans', sans-serif; }
  .sidebar { width: 100%; background: #080f1e; padding: 16px; flex-shrink: 0; border-bottom: 1px solid #0f1f38; position: sticky; top: 0; z-index: 50; }
  .nav-menu { display: flex; gap: 6px; overflow-x: auto; padding-bottom: 4px; }
  .main-content { flex: 1; padding: 16px; overflow-x: hidden; min-width: 0; }
  
  .nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px; cursor: pointer; color: #475569; font-weight: 500; font-size: 13px; white-space: nowrap; flex-shrink: 0; }
  .nav-item:hover { background: rgba(16,185,129,.12); color: #e2e8f0; }
  .nav-item.active { background: rgba(16,185,129,.15); color: #10b981; font-weight: 700; }

  @media (min-width: 768px) {
    .layout-wrapper { flex-direction: row; }
    .sidebar { width: 234px; height: 100vh; padding: 26px 16px; border-right: 1px solid #0f1f38; border-bottom: none; display: flex; flex-direction: column; gap: 3px; }
    .nav-menu { flex-direction: column; gap: 3px; overflow-x: visible; padding-bottom: 0; }
    .main-content { padding: 28px; }
  }
`;

export default function Dashboard() {
  // State ini yang menentukan halaman mana yang sedang aktif
  const [activePage, setActivePage] = useState("dashboard");

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
        {/* ── SIDEBAR NAVIGASI ── */}
        <aside className="sidebar">
          <div style={{ marginBottom: 28 }}>
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
                📈
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
                marginTop: 4,
              }}
            >
              Fintech CC2026
            </div>
          </div>

          <div className="nav-menu">
            {navItems.map(({ icon, label, id }) => (
              <div
                key={id}
                className={`nav-item ${activePage === id ? "active" : ""}`}
                onClick={() => setActivePage(id)}
              >
                <span style={{ fontSize: 15 }}>{icon}</span>
                {label}
              </div>
            ))}
          </div>
        </aside>

        {/* ── AREA KONTEN UTAMA ── */}
        <main className="main-content">
          {/* Karena komponen halamannya belum kita buat, kita tampilkan teks sementara dulu */}
          {activePage === "dashboard" && (
            <h2 style={{ color: "#0f172a" }}>
              🚧 Halaman Main Overview sedang dibangun...
            </h2>
          )}
          {activePage === "news" && (
            <h2 style={{ color: "#0f172a" }}>
              🚧 Halaman Berita sedang dibangun...
            </h2>
          )}
          {activePage === "edukasi" && (
            <h2 style={{ color: "#0f172a" }}>
              🚧 Halaman Edukasi sedang dibangun...
            </h2>
          )}
          {activePage === "ai" && (
            <h2 style={{ color: "#0f172a" }}>
              🚧 Halaman AI Chat sedang dibangun...
            </h2>
          )}
          {activePage === "settings" && (
            <h2 style={{ color: "#0f172a" }}>
              🚧 Halaman Pengaturan sedang dibangun...
            </h2>
          )}
        </main>
      </div>
    </>
  );
}
