import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const stepLabels = [
  'Normal flow — no grid',
  'display: grid',
  'grid-template-columns: repeat(3, 1fr)',
  'gap: 16px',
  'grid-column: span 2',
]

const CYAN = '#22d3ee'
const PURPLE = '#a78bfa'
const CYAN_DIM = 'rgba(34,211,238,0.15)'
const PURPLE_DIM = 'rgba(167,139,250,0.25)'

export default function GridViz({ step, compact = false }: Props) {
  const hasGrid = step >= 1
  const hasColumns = step >= 2
  const hasGap = step >= 3
  const hasSpan = step >= 4

  const cellSize = compact ? 36 : 48
  const gap = hasGap ? (compact ? 8 : 16) : 0
  // Build 6 items; item 0 spans 2 columns at step 4
  const items = [0, 1, 2, 3, 4, 5]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      {/* CSS label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: compact ? 10 : 12,
            color: CYAN,
            background: 'rgba(34,211,238,0.08)',
            border: '1px solid rgba(34,211,238,0.25)',
            borderRadius: 6,
            padding: compact ? '4px 10px' : '6px 14px',
          }}
        >
          {stepLabels[Math.min(step, stepLabels.length - 1)]}
        </motion.div>
      </AnimatePresence>

      {/* Container */}
      <motion.div
        animate={{
          display: hasGrid ? 'grid' : 'block',
          gridTemplateColumns: hasColumns ? 'repeat(3, 1fr)' : '1fr',
          gap: gap,
          padding: compact ? 10 : 16,
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        style={{
          background: 'var(--surface)',
          border: '2px solid var(--border)',
          borderRadius: 'var(--radius)',
          width: compact ? 220 : 300,
          minHeight: compact ? 80 : 120,
        }}
      >
        {items.map(i => {
          const isSpanning = hasSpan && i === 0
          const color = isSpanning ? PURPLE : CYAN
          const bg = isSpanning ? PURPLE_DIM : CYAN_DIM

          return (
            <motion.div
              key={i}
              layout
              animate={{
                gridColumn: isSpanning ? 'span 2' : 'span 1',
                background: bg,
                borderColor: color,
                boxShadow: isSpanning ? `0 0 16px ${color}55` : 'none',
                height: cellSize,
                marginBottom: hasGrid ? 0 : gap > 0 ? gap : 6,
              }}
              transition={{ duration: 0.4, ease: 'easeInOut', layout: { duration: 0.4 } }}
              style={{
                border: `2px solid ${color}`,
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                fontSize: compact ? 11 : 13,
                color: color,
                flexShrink: 0,
              }}
            >
              {isSpanning ? (
                <span style={{ fontSize: compact ? 9 : 11 }}>span 2</span>
              ) : (
                i + 1
              )}
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
