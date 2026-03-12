import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const longText = 'The quick brown fox jumps over the lazy dog. This text is intentionally very long to demonstrate overflow behavior in CSS containers.'

const overflowConfigs = [
  { value: 'visible', label: 'overflow: visible', desc: 'Content spills outside the container' },
  { value: 'hidden', label: 'overflow: hidden', desc: 'Content clipped at container edge' },
  { value: 'auto', label: 'overflow: auto', desc: 'Scrollbar appears when needed' },
  { value: 'hidden', label: 'text-overflow: ellipsis', desc: 'Single line truncated with "..."', ellipsis: true },
] as const

export default function OverflowViz({ step, compact = false }: Props) {
  const w = compact ? 160 : 240
  const h = compact ? 60 : 80
  const config = overflowConfigs[Math.min(step, overflowConfigs.length - 1)]
  const showEllipsis = 'ellipsis' in config && config.ellipsis === true

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <div style={{
        width: w,
        height: h,
        overflow: config.value,
        borderRadius: 8,
        border: '2px solid #5b9cf5',
        background: 'var(--surface-bright)',
        padding: '8px 10px',
        fontSize: compact ? 11 : 13,
        color: 'var(--text)',
        lineHeight: 1.5,
        whiteSpace: showEllipsis ? 'nowrap' : 'normal',
        textOverflow: showEllipsis ? 'ellipsis' : 'clip',
        position: 'relative',
      }}>
        {longText}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          style={{ textAlign: 'center' }}
        >
          <div style={{ fontSize: 10, color: '#5b9cf5', fontFamily: 'var(--font-mono)', marginBottom: 3 }}>
            {config.label}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-faint)' }}>{config.desc}</div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
