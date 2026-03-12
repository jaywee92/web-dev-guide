import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const areas = [
  { name: 'header', color: '#5b9cf5', row: '1 / 2', col: '1 / 3' },
  { name: 'sidebar', color: '#4ade80', row: '2 / 3', col: '1 / 2' },
  { name: 'main', color: '#f472b6', row: '2 / 3', col: '2 / 3' },
  { name: 'footer', color: '#fbbf24', row: '3 / 4', col: '1 / 3' },
]

export default function GridAreasViz({ step, compact = false }: Props) {
  const cellH = compact ? 36 : 52

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      {/* Grid visualization */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: compact ? '80px 120px' : '120px 180px',
        gridTemplateRows: `${cellH}px ${cellH * 1.5}px ${cellH}px`,
        gap: 4,
      }}>
        {areas.map((area, i) => (
          <motion.div
            key={area.name}
            animate={{
              opacity: step >= i ? 1 : 0.15,
              scale: step === i ? 1.03 : 1,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
              gridRow: area.row,
              gridColumn: area.col,
              background: step >= i ? area.color + '22' : 'var(--surface)',
              border: `2px solid ${step >= i ? area.color : 'var(--border)'}`,
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: compact ? 10 : 12,
              fontFamily: 'var(--font-mono)',
              color: step >= i ? area.color : 'var(--text-faint)',
              fontWeight: 600,
            }}
          >
            {area.name}
          </motion.div>
        ))}
      </div>

      {/* Code label */}
      <AnimatePresence mode="wait">
        <motion.code
          key={step}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
        >
          {step === 0 && 'grid-template-areas: "header header"'}
          {step === 1 && '"sidebar main"'}
          {step === 2 && '"footer footer"'}
          {step === 3 && 'grid-area: header / sidebar / main / footer'}
        </motion.code>
      </AnimatePresence>
    </div>
  )
}
