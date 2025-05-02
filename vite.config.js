import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Update proxy target to Platzi API
      '/api': {
        target: 'https://api.escuelajs.co', // <-- Changed target API
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api/v1'), // Adjust rewrite to include /api/v1
      },
    }
  }
})
