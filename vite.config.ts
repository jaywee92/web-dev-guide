import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  base: '/web-dev-guide/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('monaco-editor') || id.includes('@monaco-editor')) return 'monaco'
          if (id.includes('framer-motion') || id.includes('@motionone')) return 'framer'
          if (id.includes('shiki') || id.includes('@shikijs')) return 'shiki'
          if (id.includes('node_modules')) return 'vendor'
        },
      },
    },
  },
  server: { allowedHosts: ['jaywee92.de', 'www.jaywee92.de'] },
  resolve: { alias: { '@': path.resolve(__dirname, './src') } }
})
