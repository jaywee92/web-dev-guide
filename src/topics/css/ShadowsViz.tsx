import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const shadowSteps = [
  { label: 'no shadow', shadow: 'none', text: 'Plain box — no depth' },
  { label: 'simple shadow', shadow: '0 4px 16px rgba(0,0,0,0.4)', text: 'box-shadow: 0 4px 16px rgba(0,0,0,0.4)' },
  { label: 'layered shadow', shadow: '0 1px 2px rgba(0,0,0,0.4), 0 8px 32px rgba(91,156,245,0.25)', text: 'Two layers — near + far' },
  { label: 'inset shadow', shadow: 'inset 0 2px 8px rgba(0,0,0,0.5)', text: 'inset — shadow inside the box' },
  { label: 'colored glow', shadow: '0 0 24px #5b9cf588, 0 0 48px #5b9cf533', text: 'Glow effect with color' },
]

export default function ShadowsViz({ step, compact = false }: Props) {
  const s = shadowSteps[Math.min(step, shadowSteps.length - 1)]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
      <motion.div
        animate={{ boxShadow: s.shadow }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        style={{
          width: compact ? 100 : 140, height: compact ? 70 : 100,
          borderRadius: 12,
          background: 'var(--surface-bright)',
          border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: compact ? 11 : 13, fontFamily: 'var(--font-mono)',
          color: 'var(--text-muted)',
        }}
      >
        .box
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          style={{ textAlign: 'center' }}
        >
          <div style={{ fontSize: 10, color: '#5b9cf5', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>
            {s.label}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-faint)' }}>{s.text}</div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
