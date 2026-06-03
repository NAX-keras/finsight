/* ── CSS (Termasuk Media Queries untuk Mobile) ──────────────── */
export const globalCSS = `
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
  .stock-tab { transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease; }
  .stock-tab:hover { transform: translateY(-4px); box-shadow: 0 14px 32px rgba(16,185,129,.22) !important; border-color: #10b981 !important; }
  .stock-tab-highlight { box-shadow: 0 0 0 4px rgba(16,185,129,.25), 0 16px 34px rgba(16,185,129,.22) !important; border-color: #10b981 !important; }
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
  
  .stock-tabs { display: flex; gap: 12px; overflow-x: auto; padding: 2px 4px 12px; flex-wrap: nowrap; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; }
  .stock-tab { flex: 0 0 auto; scroll-snap-align: start; }
  .stock-tabs::after { content: ""; flex: 0 0 4px; }
  
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
    
    .stock-tabs { flex-wrap: nowrap; overflow-x: auto; padding-bottom: 12px; }
    
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

  .news-card-main { width: 100%; max-width: 100%; min-width: 0; overflow: hidden; }
  .news-card-body { min-width: 0; max-width: 100%; }
  .keyword-summary-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }

  @media (max-width: 767px) {
    .sidebar-logo-container img { object-fit: contain !important; }
    .news-card-main { padding: 16px !important; }
    .news-card-header { align-items: flex-start !important; gap: 12px !important; }
    .news-card-stock { min-width: 0 !important; flex: 1 1 auto !important; }
    .news-card-price { text-align: left !important; }
    .news-card-body { display: grid !important; grid-template-columns: 8px minmax(0, 1fr); column-gap: 10px !important; row-gap: 8px; }
    .news-sentiment-pill { grid-column: 2; justify-self: start; margin-top: 2px; }
    .keyword-summary-grid { grid-template-columns: 1fr !important; }
  }

`;
