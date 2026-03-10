import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const STEPS = [
  {
    label: 'background-color: #3b82f6',
    background: '#3b82f6',
    color: '#3b82f6',
  },
  {
    label: 'background-image: url(...)',
    background: 'repeating-linear-gradient(45deg, #1e293b 0px, #1e293b 10px, #2d3f55 10px, #2d3f55 20px)',
    color: '#60a5fa',
  },
  {
    label: 'background-size: cover · background-position: center',
    background: 'repeating-linear-gradient(45deg, #1e293b 0px, #1e293b 10px, #2d3f55 10px, #2d3f55 20px) center / cover',
    color: '#60a5fa',
  },
  {
    label: 'linear-gradient(135deg, #6366f1, #ec4899)',
    background: 'linear-gradient(135deg, #6366f1, #ec4899)',
    color: '#818cf8',
  },
  {
    label: 'radial-gradient(circle, #6366f1, #0f172a)',
    background: 'radial-gradient(circle at 40% 40%, #6366f1 0%, #0f172a 70%)',
    color: '#818cf8',
  },
]

const spring = { type: 'spring' as const, stiffness: 200, damping: 25 }

export default function BackgroundsViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const cfg = STEPS[s]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 20 }}>
      {/* Background preview box */}
      <AnimatePresence mode="wait">
        <motion.div
          key={s}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={spring}
          style={{
            width: compact ? 160 : 220,
            height: compact ? 100 : 140,
            borderRadius: 12,
            border: '1px solid var(--border)',
            background: cfg.background,
          }}
        />
      </AnimatePresence>

      {/* CSS label */}
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

      {/* Step indicators */}
      <div style={{ display: 'flex', gap: 6 }}>
        {STEPS.map((stepCfg, i) => (
          <motion.div
            key={i}
            animate={{
              scale: i === s ? 1.4 : 1,
              background: i <= s ? stepCfg.color : 'var(--border)',
            }}
            transition={spring}
            style={{ width: compact ? 7 : 8, height: compact ? 7 : 8, borderRadius: '50%' }}
          />
        ))}
      </div>
    </div>
  )
}
