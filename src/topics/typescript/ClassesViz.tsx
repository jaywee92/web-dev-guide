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
  'Class anatomy',
  'readonly & optional',
  'Access modifiers',
  'Inheritance — extends',
  'Abstract classes',
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

function Step0({ compact }: { compact: boolean }) {
  const parts = [
    { label: 'properties', color: BLUE, items: ['name: string', 'age: number'] },
    { label: 'constructor', color: PURPLE, items: ['(name, age)'] },
    { label: 'methods', color: GREEN, items: ['speak(): string'] },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 8 : 12, alignItems: 'flex-start' }}>
      <div style={{
        ...codeBlock(compact),
        border: `1.5px solid ${BLUE}55`,
        boxShadow: `0 0 18px ${BLUE}22`,
        position: 'relative',
      }}>
        <div style={{ color: MUTED, fontSize: compact ? 9 : 10, fontWeight: 700, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>class Animal</div>
        {parts.map((part, i) => (
          <motion.div
            key={part.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15, duration: 0.3 }}
            style={{ display: 'flex', alignItems: 'center', gap: compact ? 6 : 10, marginBottom: compact ? 3 : 4 }}
          >
            <div style={{
              fontSize: compact ? 9 : 10,
              color: part.color,
              background: `${part.color}18`,
              border: `1px solid ${part.color}44`,
              borderRadius: 4,
              padding: '1px 6px',
              minWidth: compact ? 64 : 76,
              textAlign: 'center',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.3px',
            }}>
              {part.label}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 10 : 11, color: MUTED }}>
              {part.items.join(', ')}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function Step1({ compact }: { compact: boolean }) {
  const props = [
    { name: 'id', modifier: 'readonly', type: 'number', color: YELLOW, note: 'set once' },
    { name: 'name', modifier: null, type: 'string', color: BLUE, note: 'mutable' },
    { name: 'email', modifier: 'optional?', type: 'string', color: PURPLE, note: 'may be absent' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>
      {props.map((p, i) => (
        <motion.div
          key={p.name}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.13, duration: 0.3 }}
          style={{ display: 'flex', alignItems: 'center', gap: compact ? 6 : 10 }}
        >
          {p.modifier && (
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: compact ? 9 : 10,
              color: p.color,
              background: `${p.color}18`,
              border: `1px solid ${p.color}44`,
              borderRadius: 4,
              padding: '1px 6px',
              fontWeight: 600,
              minWidth: compact ? 64 : 74,
              textAlign: 'center',
            }}>
              {p.modifier}
            </div>
          )}
          {!p.modifier && <div style={{ minWidth: compact ? 64 : 74 }} />}
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 11 : 12, color: TEXT }}>{p.name}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 10 : 11, color: p.color }}>: {p.type}</div>
          <div style={{ fontSize: compact ? 9 : 10, color: MUTED, fontStyle: 'italic' }}>— {p.note}</div>
        </motion.div>
      ))}
    </div>
  )
}

function Step2({ compact }: { compact: boolean }) {
  const modifiers = [
    { label: 'public', desc: 'accessible anywhere', color: GREEN, example: 'owner: string' },
    { label: 'protected', desc: 'class + subclasses', color: YELLOW, example: 'balance: number' },
    { label: 'private', desc: 'class only', color: RED, example: '#secret: string' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>
      {modifiers.map((mod, i) => (
        <motion.div
          key={mod.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.14, duration: 0.35 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: compact ? 8 : 12,
            background: `${mod.color}0d`,
            border: `1px solid ${mod.color}33`,
            borderRadius: 8,
            padding: compact ? '6px 10px' : '8px 14px',
          }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: compact ? 10 : 11,
            color: mod.color,
            fontWeight: 700,
            minWidth: compact ? 58 : 68,
          }}>
            {mod.label}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: compact ? 10 : 11,
            color: MUTED,
            flex: 1,
          }}>
            {mod.example}
          </div>
          <div style={{ fontSize: compact ? 9 : 10, color: MUTED, fontStyle: 'italic' }}>
            {mod.desc}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function Step3({ compact }: { compact: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 6 : 10 }}>
      {/* Base class */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{
          ...codeBlock(compact),
          border: `1.5px solid ${BLUE}66`,
          boxShadow: `0 0 14px ${BLUE}22`,
        }}
      >
        <div style={{ color: MUTED, fontSize: compact ? 9 : 10, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' }}>base</div>
        <div>
          <span style={{ color: PURPLE }}>class </span>
          <span style={{ color: BLUE, fontWeight: 700 }}>Animal</span>
        </div>
        <div style={{ paddingLeft: compact ? 12 : 16, color: MUTED, fontSize: compact ? 10 : 11 }}>
          <div><span style={{ color: YELLOW }}>protected </span>name: string</div>
          <div>move(): string</div>
        </div>
      </motion.div>

      {/* Arrow */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ delay: 0.25, duration: 0.3 }}
        style={{ color: MUTED, fontSize: compact ? 12 : 14, lineHeight: 1 }}
      >
        ↓ extends
      </motion.div>

      {/* Subclass */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.35 }}
        style={{
          ...codeBlock(compact),
          border: `1.5px solid ${GREEN}55`,
          boxShadow: `0 0 12px ${GREEN}18`,
        }}
      >
        <div style={{ color: MUTED, fontSize: compact ? 9 : 10, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' }}>subclass</div>
        <div>
          <span style={{ color: PURPLE }}>class </span>
          <span style={{ color: GREEN, fontWeight: 700 }}>Dog</span>
          <span style={{ color: MUTED }}> extends </span>
          <span style={{ color: BLUE }}>Animal</span>
        </div>
        <div style={{ paddingLeft: compact ? 12 : 16, color: MUTED, fontSize: compact ? 10 : 11 }}>
          <div>breed: string</div>
          <div>bark(): string</div>
          <div style={{ color: YELLOW, fontSize: compact ? 9 : 10 }}>↑ inherits name, move()</div>
        </div>
      </motion.div>
    </div>
  )
}

function Step4({ compact }: { compact: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 6 : 10 }}>
      {/* Abstract base */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          ...codeBlock(compact),
          border: `1.5px dashed ${PURPLE}88`,
          boxShadow: `0 0 16px ${PURPLE}22`,
        }}
      >
        <div style={{ color: PURPLE, fontSize: compact ? 9 : 10, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' }}>abstract</div>
        <div>
          <span style={{ color: PURPLE }}>abstract class </span>
          <span style={{ color: BLUE, fontWeight: 700 }}>Shape</span>
        </div>
        <div style={{ paddingLeft: compact ? 12 : 16, fontSize: compact ? 10 : 11 }}>
          <div style={{ color: RED }}>abstract area(): number</div>
          <div style={{ color: GREEN }}>describe(): string</div>
        </div>
      </motion.div>

      <div style={{ display: 'flex', gap: compact ? 6 : 10 }}>
        {[
          { name: 'Circle', color: '#fb923c' },
          { name: 'Rectangle', color: '#60a5fa' },
        ].map((cls, i) => (
          <motion.div
            key={cls.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.3 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: compact ? 10 : 11,
              color: cls.color,
              background: `${cls.color}18`,
              border: `1px solid ${cls.color}44`,
              borderRadius: 7,
              padding: compact ? '6px 10px' : '8px 14px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontWeight: 700 }}>class {cls.name}</div>
            <div style={{ color: GREEN, fontSize: compact ? 9 : 10, marginTop: 2 }}>✓ area(): number</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.3 }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: compact ? 9 : 10,
          color: RED,
          background: `${RED}12`,
          border: `1px solid ${RED}44`,
          borderRadius: 5,
          padding: compact ? '3px 8px' : '4px 10px',
        }}
      >
        new Shape() // Error: cannot create abstract class
      </motion.div>
    </div>
  )
}

export default function ClassesViz({ step, compact = false }: Props) {
  const clampedStep = Math.min(step, stepLabels.length - 1)

  const stepContent: Record<number, React.ReactNode> = {
    0: <Step0 compact={compact} />,
    1: <Step1 compact={compact} />,
    2: <Step2 compact={compact} />,
    3: <Step3 compact={compact} />,
    4: <Step4 compact={compact} />,
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
