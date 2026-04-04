import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // PRODUCTION CHUNK SPLITTING STRATEGY
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'vendor-framer';
            if (id.includes('firebase')) return 'vendor-firebase'; 
            if (id.includes('lucide-react')) return 'vendor-lucide';
            // MERGED react into misc to avoid initialization errors (Activity is undefined)
            return 'vendor-misc'; 
          }
        },
      },
    },
    chunkSizeWarningLimit: 800, 
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_BASE_URL || 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: process.env.VITE_BASE_URL || 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
