import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface Props { step: number; compact?: boolean }

const STEPS = [
  { color: '#71717a', label: 'No transition — state changes snap instantly',             code: '/* no transition */',                         duration: 0,   ease: 'linear' as const },
  { color: '#3b82f6', label: 'transition: color 0.3s — color animates smoothly',        code: 'transition: color 0.3s;',                    duration: 0.3, ease: 'linear' as const },
  { color: '#22c55e', label: 'transition: all 0.5s — every changing property animates', code: 'transition: all 0.5s;',                      duration: 0.5, ease: 'linear' as const },
  { color: '#a855f7', label: 'ease-in-out — slow start + slow end = natural feel',      code: 'transition: all 0.4s ease-in-out;',          duration: 0.4, ease: 'easeInOut' as const },
  { color: '#f97316', label: 'Multiple: each property gets its own duration',           code: 'transition: color 0.3s,\n           transform 0.2s;', duration: 0.3, ease: 'easeOut' as const },
] as const

const mono = 'var(--font-mono)'

export default function TransitionsViz({ step, compact = false }: Props) {
  const s = Math.max(0, Math.min(step, 4))
  const cfg = STEPS[s]
  const [hovered, setHovered] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 20 }}>
      <motion.button
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={{
          backgroundColor: hovered ? cfg.color + '33' : '#47556922',
          scale: hovered && s >= 4 ? 1.08 : 1,
          color: hovered ? cfg.color : '#475569',
        }}
        transition={{ duration: cfg.duration, ease: cfg.ease }}
        style={{
          padding: compact ? '10px 20px' : '14px 28px',
          border: `2px solid ${hovered ? cfg.color : '#475569'}`,
          borderRadius: 8,
          fontFamily: mono,
          fontSize: compact ? 11 : 13,
          cursor: 'pointer',
        }}
      >
        Hover me
      </motion.button>
      <div style={{ fontFamily: mono, fontSize: compact ? 8 : 9, color: '#64748b' }}>hover to trigger</div>
      <div style={{ fontFamily: mono, fontSize: compact ? 8 : 10, color: '#98c379', background: '#1e1e2e', padding: compact ? '4px 8px' : '6px 12px', borderRadius: 6, whiteSpace: 'pre' }}>
        {cfg.code}
      </div>
      <AnimatePresence mode="wait">
        <motion.p key={s} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}
          style={{ margin: 0, fontFamily: mono, fontSize: compact ? 10 : 11, color: cfg.color, textAlign: 'center', maxWidth: compact ? 200 : 280 }}>
          {cfg.label}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
