import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Apply persisted theme before first render to avoid flash
const stored = localStorage.getItem('wdvg-settings')
if (stored) {
  try {
    const { state } = JSON.parse(stored)
    if (state?.theme) {
      document.documentElement.setAttribute('data-theme', state.theme)
    }
  } catch { /* ignore */ }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode><App /></StrictMode>
)
