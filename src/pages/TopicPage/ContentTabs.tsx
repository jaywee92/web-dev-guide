// src/pages/TopicPage/ContentTabs.tsx
import { useState, useEffect, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Tab {
  id: string
  label: string
  content: ReactNode
}

interface Props {
  tabs: Tab[]
  color: string
}

export default function ContentTabs({ tabs, color }: Props) {
  const [active, setActive] = useState(tabs[0]?.id ?? '')

  useEffect(() => {
    function onHashChange() {
      const hash = window.location.hash.slice(1)
      const match = tabs.find(t => t.id === hash)
      if (match) setActive(match.id)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [tabs])

  if (tabs.length === 0) return null

  const current = tabs.find(t => t.id === active) ?? tabs[0]

  return (
    <div style={{ marginTop: 48 }}>
      {/* Tab bar */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--border)',
        marginBottom: 32,
        gap: 4,
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            id={tab.id}
            onClick={() => setActive(tab.id)}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderBottom: `2px solid ${active === tab.id ? color : 'transparent'}`,
              background: 'none',
              cursor: 'pointer',
              color: active === tab.id ? color : 'var(--text-muted)',
              fontSize: 14,
              fontWeight: active === tab.id ? 700 : 400,
              transition: 'all 0.15s',
              marginBottom: -1,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {current.content}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
