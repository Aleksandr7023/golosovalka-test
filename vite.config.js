// vite.config.js — РАБОТАЕТ НА VERCEL 100%

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.',                    // ← корень проекта
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})