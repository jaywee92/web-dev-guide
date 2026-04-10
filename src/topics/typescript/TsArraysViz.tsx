import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const BLUE = '#3b82f6'
const GREEN = '#4ade80'
const PURPLE = '#a78bfa'
const MUTED = '#94a3b8'
const TEXT = '#e2e8f0'

const stepLabels = [
  'Typed arrays — T[]',
  'Arrays of objects',
  'Tuples — fixed-length',
  'Labeled tuples',
]

const codeBlock = (compact: boolean): React.CSSProperties => ({
  fontFamily: 'var(--font-mono)',
  fontSize: compact ? 11 : 13,
  background: 'var(--surface-bright)',
  borderRadius: 8,
  padding: compact ? '10px 14px' : '14px 20px',
  lineHeight: 1.7,
  display: 'inline-block',
  textAlign: 'left',
})

function Step0({ compact }: { compact: boolean }) {
  const items = [
    { label: 'number[]', values: ['10', '20', '30'], color: '#fb923c' },
    { label: 'string[]', values: ['"Alice"', '"Bob"'], color: GREEN },
    { label: 'any[]', values: ['1', '"x"', 'true'], color: '#f87171', danger: true },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 8 : 12 }}>
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.12, duration: 0.35 }}
          style={{ display: 'flex', alignItems: 'center', gap: compact ? 8 : 12 }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: compact ? 10 : 12,
            color: item.danger ? '#f87171' : BLUE,
            background: item.danger ? '#f8717122' : `${BLUE}22`,
            border: `1px solid ${item.danger ? '#f87171' : BLUE}55`,
            borderRadius: 6,
            padding: compact ? '3px 8px' : '4px 10px',
            minWidth: compact ? 70 : 80,
            textAlign: 'center',
            fontWeight: 600,
          }}>
            {item.label}
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {item.values.map((v, j) => (
              <motion.div
                key={j}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.12 + j * 0.06, duration: 0.25 }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: compact ? 10 : 11,
                  color: item.color,
                  background: `${item.color}18`,
                  border: `1px solid ${item.color}33`,
                  borderRadius: 4,
                  padding: compact ? '2px 6px' : '3px 8px',
                }}
              >
                {v}
              </motion.div>
            ))}
          </div>
          {item.danger && (
            <div style={{ fontSize: compact ? 9 : 10, color: '#f87171', fontFamily: 'var(--font-mono)' }}>
              ✗ avoid
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

function Step1({ compact }: { compact: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: compact ? 'column' : 'row', gap: compact ? 8 : 14, alignItems: 'flex-start' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        style={{ ...codeBlock(compact), border: `1.5px solid ${BLUE}55` }}
      >
        <div style={{ color: MUTED, fontSize: compact ? 9 : 10, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' }}>type</div>
        <div><span style={{ color: BLUE, fontWeight: 700 }}>User</span><span style={{ color: TEXT }}> {'{'}</span></div>
        <div style={{ paddingLeft: compact ? 12 : 16 }}>
          <div><span style={{ color: TEXT }}>id</span><span style={{ color: BLUE }}>: number</span></div>
          <div><span style={{ color: TEXT }}>name</span><span style={{ color: BLUE }}>: string</span></div>
        </div>
        <div style={{ color: TEXT }}>{'}'}</div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.35 }}
        style={{ ...codeBlock(compact), border: `1.5px solid ${GREEN}44` }}
      >
        <div style={{ color: MUTED, fontSize: compact ? 9 : 10, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' }}>array</div>
        <div>
          <span style={{ color: PURPLE }}>const </span>
          <span style={{ color: TEXT }}>users</span>
          <span style={{ color: BLUE }}>: User[]</span>
          <span style={{ color: MUTED }}> = [</span>
        </div>
        <div style={{ paddingLeft: compact ? 12 : 16 }}>
          <div style={{ color: MUTED }}>{'{ id: 1, name: "Alice" },'}</div>
          <div style={{ color: MUTED }}>{'{ id: 2, name: "Bob" },'}</div>
        </div>
        <div style={{ color: MUTED }}>]</div>
      </motion.div>
    </div>
  )
}

function Step2({ compact }: { compact: boolean }) {
  const positions = [
    { index: 0, type: 'number', value: '10', color: '#fb923c' },
    { index: 1, type: 'number', value: '20', color: '#fb923c' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 10 : 16, alignItems: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ ...codeBlock(compact) }}
      >
        <span style={{ color: PURPLE }}>type </span>
        <span style={{ color: BLUE, fontWeight: 700 }}>Coordinate</span>
        <span style={{ color: MUTED }}> = [</span>
        <span style={{ color: '#fb923c' }}>number</span>
        <span style={{ color: MUTED }}>, </span>
        <span style={{ color: '#fb923c' }}>number</span>
        <span style={{ color: MUTED }}>]</span>
      </motion.div>
      <div style={{ display: 'flex', gap: compact ? 8 : 12 }}>
        {positions.map((pos, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.12, duration: 0.35 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
          >
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: compact ? 9 : 10,
              color: MUTED,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              [{pos.index}]
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: compact ? 13 : 16,
              fontWeight: 700,
              color: pos.color,
              background: `${pos.color}18`,
              border: `2px solid ${pos.color}44`,
              borderRadius: 8,
              padding: compact ? '8px 14px' : '12px 20px',
            }}>
              {pos.value}
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: compact ? 9 : 10,
              color: BLUE,
              background: `${BLUE}18`,
              borderRadius: 4,
              padding: '1px 6px',
            }}>
              {pos.type}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function Step3({ compact }: { compact: boolean }) {
  const labels = [
    { name: 'start', type: 'number', color: '#fb923c' },
    { name: 'end', type: 'number', color: '#fb923c' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 10 : 14, alignItems: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ ...codeBlock(compact) }}
      >
        <span style={{ color: PURPLE }}>type </span>
        <span style={{ color: BLUE, fontWeight: 700 }}>Range</span>
        <span style={{ color: MUTED }}> = [</span>
        <span style={{ color: GREEN }}>start</span>
        <span style={{ color: MUTED }}>: </span>
        <span style={{ color: '#fb923c' }}>number</span>
        <span style={{ color: MUTED }}>, </span>
        <span style={{ color: GREEN }}>end</span>
        <span style={{ color: MUTED }}>: </span>
        <span style={{ color: '#fb923c' }}>number</span>
        <span style={{ color: MUTED }}>]</span>
      </motion.div>
      <div style={{ display: 'flex', gap: compact ? 6 : 10 }}>
        {labels.map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.12, duration: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
          >
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: compact ? 10 : 12,
              fontWeight: 700,
              color: GREEN,
              background: `${GREEN}18`,
              borderRadius: 6,
              padding: compact ? '3px 8px' : '4px 12px',
              border: `1px solid ${GREEN}44`,
            }}>
              {l.name}
            </div>
            <div style={{ color: MUTED, fontSize: compact ? 9 : 10 }}>↓</div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: compact ? 10 : 11,
              color: l.color,
              background: `${l.color}18`,
              borderRadius: 5,
              padding: compact ? '2px 8px' : '3px 10px',
            }}>
              {l.type}
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: compact ? 9 : 10,
          color: MUTED,
          fontStyle: 'italic',
        }}
      >
        Labels are editor-only — no runtime cost
      </motion.div>
    </div>
  )
}

export default function TsArraysViz({ step, compact = false }: Props) {
  const clampedStep = Math.min(step, stepLabels.length - 1)

  const stepContent: Record<number, React.ReactNode> = {
    0: <Step0 compact={compact} />,
    1: <Step1 compact={compact} />,
    2: <Step2 compact={compact} />,
    3: <Step3 compact={compact} />,
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
