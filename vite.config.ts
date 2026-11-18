import path from 'node:path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          ui: ['gsap', 'howler', 'canvas-confetti'],
        },
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
})
