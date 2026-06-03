# Refactor Frontend FinSight

Struktur sudah dirapikan agar kode tidak menumpuk semua di `src/components/Dashboard.jsx`.

## File baru yang dipisahkan

- `src/styles/dashboardStyles.js` — CSS global khusus dashboard.
- `src/services/apiClient.js` — konfigurasi API backend dan fungsi `apiFetch`.
- `src/utils/mappers.js` — mapping data API ke format UI.
- `src/data/fallbackData.js` — data fallback/statis.
- `src/constants/content.js` — konten keyword dan edukasi.
- `src/components/common/dashboardHelpers.jsx` — `CustomTooltip`, `LiveClock`, dan `getTodayId`.
- `src/pages/AIPage.jsx` — halaman AI Chat.
- `src/pages/SettingsPage.jsx` — halaman Pengaturan.
- `src/components/Dashboard.jsx` — sekarang menjadi controller/layout utama.

## Cara menjalankan

```bash
npm install
npm run dev
```

## Hasil pengecekan

Build sudah dites dengan:

```bash
npm run build
```

Status: berhasil.
