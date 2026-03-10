// src/topics/css/ResponsiveViz.tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const BLUE = '#3b82f6'
const GREEN = '#22c55e'
const ORANGE = '#f97316'

// Simulated cards that reflow based on step
const CARDS = ['Card A', 'Card B', 'Card C']
const CARD_COLOR = [BLUE, GREEN, ORANGE]

const STEPS = [
  { cols: 1, label: 'Mobile — 1 column, no media query', breakpoint: null, color: BLUE },
  { cols: 2, label: '@media (min-width: 768px) — tablet, 2 columns', breakpoint: '768px', color: GREEN },
  { cols: 3, label: '@media (min-width: 1024px) — desktop, 3 columns', breakpoint: '1024px', color: ORANGE },
  { cols: 1, label: 'Mobile-first: base = mobile, scale up with min-width', breakpoint: null, color: BLUE },
  { cols: 3, label: 'Fluid units — %, rem, vw scale naturally', breakpoint: null, color: '#a855f7' },
]

const spring = { type: 'spring' as const, stiffness: 260, damping: 28 }

export default function ResponsiveViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const cfg = STEPS[s]

  const cardW = cfg.cols === 1
    ? '100%'
    : cfg.cols === 2
      ? 'calc(50% - 4px)'
      : 'calc(33.33% - 6px)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 20 }}>
      {/* Simulated viewport frame */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        overflow: 'hidden',
        width: compact ? 200 : 280,
      }}>
        {/* Fake browser bar */}
        <div style={{
          background: 'var(--border)',
          padding: compact ? '4px 8px' : '6px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}>
          {['#ef4444', '#f59e0b', '#22c55e'].map(c => (
            <div key={c} style={{ width: compact ? 5 : 7, height: compact ? 5 : 7, borderRadius: '50%', background: c }} />
          ))}
          {cfg.breakpoint && (
            <span style={{
              marginLeft: 'auto',
              fontFamily: 'var(--font-mono)',
              fontSize: compact ? 8 : 9,
              color: cfg.color,
            }}>
              ≥ {cfg.breakpoint}
            </span>
          )}
        </div>

        {/* Card grid */}
        <div style={{ padding: compact ? 8 : 12, display: 'flex', flexWrap: 'wrap', gap: compact ? 4 : 8 }}>
          {CARDS.map((card, i) => (
            <motion.div
              key={card}
              layout
              animate={{ width: cardW }}
              transition={spring}
              style={{
                background: `${CARD_COLOR[i]}18`,
                border: `1.5px solid ${CARD_COLOR[i]}55`,
                borderRadius: 6,
                padding: compact ? '6px 4px' : '10px 8px',
                fontFamily: 'var(--font-mono)',
                fontSize: compact ? 8 : 10,
                color: CARD_COLOR[i],
                textAlign: 'center',
                fontWeight: 600,
              }}
            >
              {card}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={s}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          style={{
            margin: 0,
            fontFamily: 'var(--font-mono)',
            fontSize: compact ? 10 : 11,
            color: cfg.color,
            textAlign: 'center',
          }}
        >
          {cfg.label}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
