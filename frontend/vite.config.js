import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Proxy ke backend hanya aktif jika VITE_API_URL diset di .env
const backendUrl = process.env.VITE_API_URL

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    ...(backendUrl ? {
      proxy: {
        '/api': {
          target: backendUrl,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    } : {})
  }
})
