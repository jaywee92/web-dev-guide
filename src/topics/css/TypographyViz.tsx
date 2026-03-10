import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const BLUE = '#3b82f6'
const PURPLE = '#a855f7'

const STEP_CONFIGS = [
  {
    fontFamily: 'serif',
    fontSize: 16,
    fontWeight: 400,
    textAlign: 'left' as const,
    textDecoration: 'none',
    letterSpacing: '0em',
    lineHeight: 1.2,
    color: 'var(--text-muted)',
    label: 'Browser default — serif, 16px',
    labelColor: 'var(--text-muted)',
  },
  {
    fontFamily: 'var(--font-sans, system-ui, sans-serif)',
    fontSize: 20,
    fontWeight: 700,
    textAlign: 'left' as const,
    textDecoration: 'none',
    letterSpacing: '0em',
    lineHeight: 1.3,
    color: BLUE,
    label: 'font-family: sans-serif · font-size: 20px · font-weight: 700',
    labelColor: BLUE,
  },
  {
    fontFamily: 'var(--font-sans, system-ui, sans-serif)',
    fontSize: 20,
    fontWeight: 700,
    textAlign: 'center' as const,
    textDecoration: 'underline',
    letterSpacing: '0em',
    lineHeight: 1.3,
    color: BLUE,
    label: 'text-align: center · text-decoration: underline',
    labelColor: BLUE,
  },
  {
    fontFamily: 'var(--font-sans, system-ui, sans-serif)',
    fontSize: 18,
    fontWeight: 400,
    textAlign: 'left' as const,
    textDecoration: 'none',
    letterSpacing: '0.05em',
    lineHeight: 1.8,
    color: PURPLE,
    label: 'letter-spacing: 0.05em · line-height: 1.8',
    labelColor: PURPLE,
  },
  {
    fontFamily: 'Georgia, serif',
    fontSize: 20,
    fontWeight: 700,
    textAlign: 'center' as const,
    textDecoration: 'none',
    letterSpacing: '-0.01em',
    lineHeight: 1.3,
    color: '#f59e0b',
    label: '@import Google Font · applied via font-family',
    labelColor: '#f59e0b',
  },
]

export default function TypographyViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const cfg = STEP_CONFIGS[s]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 20, width: '100%' }}>
      {/* Text preview box */}
      <div style={{
        width: '100%',
        maxWidth: compact ? 260 : 340,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: compact ? '16px 18px' : '24px 28px',
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={s}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: cfg.fontFamily,
                fontSize: cfg.fontSize,
                fontWeight: cfg.fontWeight,
                textAlign: cfg.textAlign,
                textDecoration: cfg.textDecoration,
                letterSpacing: cfg.letterSpacing,
                lineHeight: cfg.lineHeight,
                color: cfg.color,
              }}
            >
              The quick brown fox jumps over the lazy dog.
            </p>
          </motion.div>
        </AnimatePresence>
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
            color: cfg.labelColor,
            textAlign: 'center',
          }}
        >
          {cfg.label}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
