import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const layers = [
  { label: 'Margin', color: '#ec4899', dimColor: 'rgba(236,72,153,0.08)', paddingFull: 32, paddingCompact: 20 },
  { label: 'Border', color: '#f5c542', dimColor: 'rgba(245,197,66,0.08)', paddingFull: 28, paddingCompact: 16 },
  { label: 'Padding', color: '#4ade80', dimColor: 'rgba(74,222,128,0.08)', paddingFull: 24, paddingCompact: 14 },
  { label: 'Content', color: '#22d3ee', dimColor: 'rgba(34,211,238,0.1)', paddingFull: 20, paddingCompact: 12 },
]

const stepLabels = [
  'Margin — pushes elements away',
  'Border — frames the element',
  'Padding — inner breathing room',
  'Content — your actual content',
]

export default function BoxModelViz({ step, compact = false }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {layers.map((layer, i) => {
          const visible = step >= i
          const active = step === i
          const padding = compact ? layer.paddingCompact : layer.paddingFull
          return (
            <AnimatePresence key={layer.label}>
              {visible && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: 1, opacity: 1,
                    boxShadow: active ? `0 0 24px ${layer.color}66` : 'none',
                  }}
                  style={{
                    border: `3px solid ${layer.color}`,
                    background: layer.dimColor,
                    borderRadius: 8,
                    padding,
                    position: i === 0 ? 'relative' : 'static',
                  }}
                  transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
                >
                  <span style={{
                    position: 'absolute', top: 8, left: 12,
                    fontSize: 10, fontFamily: 'var(--font-mono)',
                    fontWeight: 700, color: layer.color,
                    textTransform: 'uppercase', letterSpacing: '0.5px',
                  }}>
                    {layer.label}
                  </span>
                  {i === layers.length - 1 && (
                    <div style={{
                      padding: compact ? '12px 24px' : '20px 40px',
                      textAlign: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: compact ? 11 : 13,
                      color: '#22d3ee',
                      fontWeight: 600,
                    }}>
                      Content
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          )
        })}
      </div>

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          style={{
            color: layers[Math.min(step, layers.length - 1)]?.color,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
          }}
        >
          {stepLabels[Math.min(step, stepLabels.length - 1)]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
