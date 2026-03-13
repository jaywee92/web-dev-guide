import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const BLUE   = '#60a5fa'
const PURPLE = '#a78bfa'
const GREEN  = '#4ade80'

const stepLabels = [
  'No shadow — flat element on the surface',
  'Simple shadow — offset x/y + blur radius',
  'Large blur — soft elevation effect',
  'Colored glow — any color, opacity via rgba',
  'Multiple shadows — stack them with commas',
]

const shadows = [
  'none',
  '2px 4px 8px rgba(0,0,0,0.35)',
  '0px 16px 48px rgba(0,0,0,0.55)',
  '0 0 32px rgba(124,58,237,0.65)',
  '0 2px 4px rgba(0,0,0,0.3), 0 8px 24px rgba(124,58,237,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
]

const codeLines = [
  'box-shadow: none;',
  'box-shadow:\n  2px 4px 8px rgba(0,0,0,.35);',
  'box-shadow:\n  0 16px 48px rgba(0,0,0,.55);',
  'box-shadow:\n  0 0 32px rgba(124,58,237,.65);',
  'box-shadow:\n  0 2px 4px rgba(0,0,0,.3),\n  0 8px 24px rgba(124,58,237,.4),\n  inset 0 1px 0 rgba(255,255,255,.1);',
]

const colors = ['var(--text-muted)', BLUE, BLUE, PURPLE, GREEN]

export default function ShadowsViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const color = colors[s]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 16 : 24 }}>

      {/* The card */}
      <motion.div
        animate={{ boxShadow: shadows[s] }}
        transition={{ duration: 0.55, type: 'spring', stiffness: 200, damping: 22 }}
        style={{
          width: compact ? 120 : 160,
          height: compact ? 70  : 90,
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: compact ? 10 : 13,
          color: 'var(--text)',
          fontWeight: 600,
        }}
      >
        .card
      </motion.div>

      {/* Code display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={s}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `${color}0d`,
            border: `1px solid ${color}33`,
            borderRadius: 8,
            padding: compact ? '6px 10px' : '8px 14px',
            fontFamily: 'var(--font-mono)',
            fontSize: compact ? 8 : 10,
            color,
            whiteSpace: 'pre' as const,
            textAlign: 'left' as const,
          }}
        >
          {codeLines[s]}
        </motion.div>
      </AnimatePresence>

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={s}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          style={{
            color,
            fontFamily: 'var(--font-mono)', fontSize: compact ? 10 : 11,
            textAlign: 'center', margin: 0, maxWidth: 320,
          }}
        >
          {stepLabels[s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
