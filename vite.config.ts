import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  base: '/web-dev-guide/',
  plugins: [react(), tailwindcss()],
  build: { outDir: 'dist' },
  resolve: { alias: { '@': path.resolve(__dirname, './src') } }
})
