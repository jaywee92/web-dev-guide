import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence } from 'framer-motion'
import { useGuestbook } from '@/hooks/useGuestbook'
import GuestbookPanel from './GuestbookPanel'

const LS_SEEN_KEY = 'wdvg-gb-seen'

function hasSeenBefore(): boolean {
  try { return localStorage.getItem(LS_SEEN_KEY) === '1' } catch { return false }
}
function markSeen(): void {
  try { localStorage.setItem(LS_SEEN_KEY, '1') } catch { /* ignore */ }
}

export default function GuestbookWidget() {
  const hook = useGuestbook()
  const [open, setOpen] = useState(false)
  const [jiggling, setJiggling] = useState(false)
  const jiggleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Auto-open on first visit
  useEffect(() => {
    if (!hasSeenBefore()) {
      const id = setTimeout(() => {
        triggerOpen()
        markSeen()
      }, 1500)
      return () => clearTimeout(id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const triggerOpen = useCallback(() => {
    setJiggling(true)
    jiggleTimer.current = setTimeout(() => {
      setJiggling(false)
      setOpen(true)
    }, 520)
  }, [])

  const handleEnvClick = useCallback(() => {
    if (open) { setOpen(false); return }
    triggerOpen()
  }, [open, triggerOpen])

  useEffect(() => {
    return () => { if (jiggleTimer.current) clearTimeout(jiggleTimer.current) }
  }, [])

  const widget = (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9000 }}>
      <AnimatePresence>
        {open && <GuestbookPanel onClose={() => setOpen(false)} hook={hook} />}
      </AnimatePresence>

      <button
        className={[
          'gb-env-btn',
          jiggling ? 'gb-env-jiggling' : '',
          open      ? 'gb-env-open'     : '',
        ].join(' ')}
        onClick={handleEnvClick}
        title="Guestbook"
        style={{ width: 58, height: 58, background: 'none', border: 'none', cursor: 'pointer', padding: 0, position: 'relative', zIndex: 1, WebkitTapHighlightColor: 'transparent' }}
      >
        <svg
          className="gb-env-svg"
          width="58"
          height="50"
          viewBox="0 0 58 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="2" y="12" width="54" height="36" rx="5"
            fill="var(--surface-bright)" stroke="var(--border)" strokeWidth="1.5" strokeLinejoin="round"/>
          <polygon points="2,12 29,32 2,48"
            fill="var(--surface)" stroke="rgba(46,51,72,0.6)" strokeWidth="1" strokeLinejoin="round"/>
          <polygon points="56,12 29,32 56,48"
            fill="var(--surface)" stroke="rgba(46,51,72,0.6)" strokeWidth="1" strokeLinejoin="round"/>
          <polygon
            className="gb-env-flap"
            points="2,12 29,30 56,12"
            fill="#232640" stroke="rgba(167,139,250,0.4)" strokeWidth="1.5" strokeLinejoin="round"/>
          <line x1="11" y1="21" x2="19" y2="26" stroke="rgba(167,139,250,0.15)" strokeWidth="1" strokeLinecap="round"/>
          <circle cx="29" cy="32" r="3" fill="rgba(167,139,250,0.55)"/>
        </svg>
      </button>
    </div>
  )

  return createPortal(widget, document.body)
}
