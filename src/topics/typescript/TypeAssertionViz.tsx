import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const BLUE = '#3b82f6'
const GREEN = '#4ade80'
const YELLOW = '#fbbf24'
const RED = '#f87171'
const PURPLE = '#a78bfa'
const MUTED = '#94a3b8'
const TEXT = '#e2e8f0'

const stepLabels = [
  'The as keyword',
  'JSON & API responses',
  'Non-null assertion (!)',
]

const codeBlock = (compact: boolean): React.CSSProperties => ({
  fontFamily: 'var(--font-mono)',
  fontSize: compact ? 11 : 13,
  background: 'var(--surface-bright)',
  borderRadius: 8,
  padding: compact ? '10px 14px' : '14px 20px',
  lineHeight: 1.8,
  display: 'inline-block',
  textAlign: 'left',
})

function TypeBadge({ label, color, compact }: { label: string; color: string; compact: boolean }) {
  return (
    <span style={{
      fontFamily: 'var(--font-mono)',
      fontSize: compact ? 10 : 11,
      color,
      background: `${color}18`,
      border: `1px solid ${color}44`,
      borderRadius: 5,
      padding: compact ? '1px 6px' : '2px 8px',
      fontWeight: 600,
    }}>
      {label}
    </span>
  )
}

function Step0({ compact }: { compact: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 10 : 16, alignItems: 'center' }}>
      {/* Before: wide type */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{ display: 'flex', flexDirection: 'column', gap: compact ? 4 : 6, alignItems: 'center' }}
      >
        <div style={{ fontSize: compact ? 9 : 10, color: MUTED, textTransform: 'uppercase', fontFamily: 'var(--font-mono)', letterSpacing: '0.5px' }}>before</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 6 : 8 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 11 : 13, color: TEXT }}>input</div>
          <div style={{ color: MUTED }}>:</div>
          <TypeBadge label="HTMLElement | null" color={YELLOW} compact={compact} />
        </div>
      </motion.div>

      {/* Arrow with as */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ delay: 0.25, duration: 0.3 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
      >
        <div style={{ color: MUTED, fontSize: compact ? 11 : 13 }}>↓</div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: compact ? 10 : 12,
          color: BLUE,
          background: `${BLUE}18`,
          border: `1px solid ${BLUE}44`,
          borderRadius: 5,
          padding: compact ? '2px 8px' : '3px 12px',
          fontWeight: 700,
        }}>
          as HTMLInputElement
        </div>
        <div style={{ color: MUTED, fontSize: compact ? 11 : 13 }}>↓</div>
      </motion.div>

      {/* After: narrow type */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.35 }}
        style={{ display: 'flex', flexDirection: 'column', gap: compact ? 4 : 6, alignItems: 'center' }}
      >
        <div style={{ fontSize: compact ? 9 : 10, color: MUTED, textTransform: 'uppercase', fontFamily: 'var(--font-mono)', letterSpacing: '0.5px' }}>after</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 6 : 8 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 11 : 13, color: TEXT }}>searchInput</div>
          <div style={{ color: MUTED }}>:</div>
          <TypeBadge label="HTMLInputElement" color={GREEN} compact={compact} />
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: compact ? 9 : 10,
          color: GREEN,
        }}>
          .value // now accessible ✓
        </div>
      </motion.div>
    </div>
  )
}

function Step1({ compact }: { compact: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 8 : 12, alignItems: 'center' }}>
      {[
        { label: 'fetch("/api/user")', type: 'Response', color: MUTED },
        { label: 'res.json()', type: 'any', color: YELLOW, warn: true },
        { label: 'data as User', type: 'User', color: BLUE, highlight: true },
        { label: 'user.name.toUpperCase()', type: '✓ safe', color: GREEN },
      ].map((node, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.12, duration: 0.3 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 6 : 8 }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: compact ? 10 : 12,
              color: node.highlight ? BLUE : MUTED,
              background: node.highlight ? `${BLUE}18` : 'transparent',
              border: node.highlight ? `1px solid ${BLUE}44` : 'none',
              borderRadius: 6,
              padding: node.highlight ? (compact ? '2px 8px' : '3px 10px') : undefined,
              fontWeight: node.highlight ? 700 : 400,
            }}>
              {node.label}
            </div>
            <TypeBadge label={node.type} color={node.color} compact={compact} />
            {node.warn && (
              <span style={{ fontSize: compact ? 9 : 10, color: YELLOW }}>⚠ no check</span>
            )}
          </div>
          {i < 3 && <div style={{ color: MUTED, fontSize: compact ? 11 : 13, lineHeight: 1 }}>↓</div>}
        </motion.div>
      ))}
    </div>
  )
}

function Step2({ compact }: { compact: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 10 : 14 }}>
      {/* Non-null assertion */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{ ...codeBlock(compact), border: `1px solid ${BLUE}44` }}
      >
        <div style={{ color: MUTED, fontSize: compact ? 9 : 10, fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>non-null assertion</div>
        <div>
          <span style={{ color: TEXT }}>document.getElementById("app")</span>
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3, type: 'spring', stiffness: 300 }}
            style={{ color: BLUE, fontWeight: 900, fontSize: compact ? 14 : 16 }}
          >
            !
          </motion.span>
        </div>
        <div style={{ color: MUTED, fontSize: compact ? 9 : 10 }}>
          // type: HTMLElement (not | null)
        </div>
      </motion.div>

      {/* Safe vs dangerous */}
      <div style={{ display: 'flex', gap: compact ? 6 : 10 }}>
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          style={{
            flex: 1,
            background: `${GREEN}0d`,
            border: `1px solid ${GREEN}33`,
            borderRadius: 8,
            padding: compact ? '6px 8px' : '8px 12px',
          }}
        >
          <div style={{ fontSize: compact ? 9 : 10, color: GREEN, fontWeight: 700, marginBottom: compact ? 3 : 4, textTransform: 'uppercase' }}>safe</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 10, color: MUTED }}>
            DOM ref guaranteed<br />by query selector
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          style={{
            flex: 1,
            background: `${RED}0d`,
            border: `1px solid ${RED}33`,
            borderRadius: 8,
            padding: compact ? '6px 8px' : '8px 12px',
          }}
        >
          <div style={{ fontSize: compact ? 9 : 10, color: RED, fontWeight: 700, marginBottom: compact ? 3 : 4, textTransform: 'uppercase' }}>dangerous</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 10, color: MUTED }}>
            "hello" as unknown<br />as number ← avoid
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.3 }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: compact ? 9 : 10,
          color: PURPLE,
          background: `${PURPLE}12`,
          borderRadius: 5,
          padding: compact ? '3px 8px' : '4px 10px',
          textAlign: 'center',
        }}
      >
        Prefer type guards over bare assertions
      </motion.div>
    </div>
  )
}

export default function TypeAssertionViz({ step, compact = false }: Props) {
  const clampedStep = Math.min(step, stepLabels.length - 1)

  const stepContent: Record<number, React.ReactNode> = {
    0: <Step0 compact={compact} />,
    1: <Step1 compact={compact} />,
    2: <Step2 compact={compact} />,
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 20 }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={`label-${clampedStep}`}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `${BLUE}22`,
            border: `1px solid ${BLUE}55`,
            borderRadius: 20,
            padding: compact ? '3px 10px' : '4px 14px',
            fontSize: compact ? 10 : 11,
            fontFamily: 'var(--font-mono)',
            color: BLUE,
            fontWeight: 600,
          }}
        >
          {stepLabels[clampedStep]}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={`step-${clampedStep}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
        >
          {stepContent[clampedStep]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
