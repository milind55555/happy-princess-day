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
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          ui: ['gsap', 'lenis', 'howler', 'canvas-confetti'],
        },
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
})
