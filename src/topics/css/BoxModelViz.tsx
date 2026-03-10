import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const PINK = '#ec4899'
const YELLOW = '#f5c542'
const GREEN = '#4ade80'
const CYAN = '#22d3ee'

const layers = [
  { label: 'Content', color: CYAN,   cssValue: 'width: 120px',       dimColor: 'rgba(34,211,238,0.10)',  pad: 12, padC: 8  },
  { label: 'Padding', color: GREEN,  cssValue: 'padding: 24px',      dimColor: 'rgba(74,222,128,0.08)',  pad: 16, padC: 10 },
  { label: 'Border',  color: YELLOW, cssValue: 'border: 3px solid',  dimColor: 'rgba(245,197,66,0.08)',  pad: 20, padC: 12 },
  { label: 'Margin',  color: PINK,   cssValue: 'margin: 32px',       dimColor: 'rgba(236,72,153,0.08)',  pad: 32, padC: 20 },
]

const stepLabels = [
  'Content — your text, image, or child elements',
  'Padding — inner breathing room',
  'Border — frames the element',
  'Margin — pushes other elements away',
]

export default function BoxModelViz({ step, compact = false }: Props) {
  const s = Math.min(step, 3)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {layers.map((layer, i) => {
          const visible = s >= i
          const active = s === i
          const pad = compact ? layer.padC : layer.pad

          return (
            <AnimatePresence key={layer.label}>
              {visible && (
                <motion.div
                  key={layer.label}
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    boxShadow: active ? `0 0 22px ${layer.color}55` : 'none',
                  }}
                  exit={{ scale: 0.85, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
                  style={{
                    border: `${i === 2 ? 3 : 2}px solid ${layer.color}`,
                    background: layer.dimColor,
                    borderRadius: 8,
                    padding: pad,
                    position: 'relative',
                  }}
                >
                  {/* Layer label + CSS value badge */}
                  <div style={{
                    position: 'absolute',
                    top: 3,
                    left: 6,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                  }}>
                    <span style={{
                      fontSize: compact ? 8 : 9,
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      color: layer.color,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}>
                      {layer.label}
                    </span>

                    {/* CSS value badge — appears when active */}
                    <AnimatePresence>
                      {active && (
                        <motion.span
                          initial={{ opacity: 0, x: -4 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          style={{
                            fontSize: compact ? 7 : 8,
                            fontFamily: 'var(--font-mono)',
                            color: layer.color,
                            background: `${layer.color}18`,
                            border: `1px solid ${layer.color}44`,
                            borderRadius: 3,
                            padding: '1px 5px',
                          }}
                        >
                          {layer.cssValue}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Content area */}
                  {i === 0 && (
                    <div style={{
                      padding: compact ? '8px 18px' : '14px 32px',
                      textAlign: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: compact ? 11 : 13,
                      color: CYAN,
                      fontWeight: 600,
                    }}>
                      Hello World
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
          key={s}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          style={{
            color: layers[s]?.color,
            fontFamily: 'var(--font-mono)',
            fontSize: compact ? 11 : 12,
            textAlign: 'center',
            margin: 0,
          }}
        >
          {stepLabels[s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
