import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const BLUE = '#3b82f6'
const GREEN = '#4ade80'
const PURPLE = '#a78bfa'
const ORANGE = '#fb923c'
const MUTED = '#94a3b8'
const TEXT = '#e2e8f0'

const stepLabels = [
  'Typing Props',
  'Typing State',
  'useRef & useReducer',
  'useCallback & useMemo',
  'Typing API responses',
  'Typing DOM Events',
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

function PropRow({ name, type, optional, color, delay, compact }: {
  name: string; type: string; optional?: boolean; color: string; delay: number; compact: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.28 }}
      style={{ display: 'flex', alignItems: 'center', gap: compact ? 2 : 4, paddingLeft: compact ? 12 : 16 }}
    >
      <span style={{ color: TEXT }}>{name}</span>
      {optional && <span style={{ color: MUTED }}>?</span>}
      <span style={{ color: MUTED }}>: </span>
      <span style={{ color, background: `${color}18`, borderRadius: 3, padding: '0 3px' }}>{type}</span>
    </motion.div>
  )
}

function Step0({ compact }: { compact: boolean }) {
  return (
    <div style={{ ...codeBlock(compact), border: `1.5px solid ${BLUE}55` }}>
      <div style={{ color: MUTED, fontSize: compact ? 9 : 10, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' }}>type ButtonProps</div>
      <div style={{ color: TEXT }}>{'{'}</div>
      <PropRow name="label" type="string" color={GREEN} delay={0.08} compact={compact} />
      <PropRow name="variant" type='"primary" | "danger"' color={ORANGE} delay={0.16} compact={compact} />
      <PropRow name="disabled" type="boolean" optional color={BLUE} delay={0.24} compact={compact} />
      <PropRow name="children" type="React.ReactNode" color={PURPLE} delay={0.32} compact={compact} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.42, duration: 0.3 }}
        style={{ color: TEXT }}
      >
        {'}'}
      </motion.div>
    </div>
  )
}

function Step1({ compact }: { compact: boolean }) {
  const states = [
    { name: 'posts', generic: 'Post[]', init: '[]', color: BLUE },
    { name: 'loading', generic: null, init: 'true', color: GREEN, note: 'inferred: boolean' },
    { name: 'error', generic: 'string | null', init: 'null', color: ORANGE },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>
      {states.map((s, i) => (
        <motion.div
          key={s.name}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.13, duration: 0.3 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: compact ? 10 : 12,
            display: 'flex',
            alignItems: 'center',
            gap: compact ? 4 : 6,
            flexWrap: 'wrap',
          }}
        >
          <span style={{ color: PURPLE }}>useState</span>
          {s.generic && (
            <span style={{ color: s.color, background: `${s.color}18`, borderRadius: 3, padding: '0 4px' }}>
              &lt;{s.generic}&gt;
            </span>
          )}
          <span style={{ color: MUTED }}>({s.init})</span>
          {s.note && (
            <span style={{ color: MUTED, fontSize: compact ? 9 : 10, fontStyle: 'italic' }}>
              // {s.note}
            </span>
          )}
        </motion.div>
      ))}
    </div>
  )
}

function Step2({ compact }: { compact: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 8 : 12 }}>
      {/* useRef */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35 }}
        style={{ ...codeBlock(compact), border: `1px solid ${BLUE}44` }}
      >
        <div style={{ color: MUTED, fontSize: compact ? 9 : 10, marginBottom: 4, fontWeight: 700, textTransform: 'uppercase' }}>useRef</div>
        <div>
          <span style={{ color: PURPLE }}>useRef</span>
          <span style={{ color: BLUE }}>&lt;HTMLInputElement&gt;</span>
          <span style={{ color: MUTED }}>(null)</span>
        </div>
        <div style={{ color: MUTED, fontSize: compact ? 9 : 10, marginTop: 2 }}>
          ref.current?.focus() // safe
        </div>
      </motion.div>
      {/* useReducer */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.25, duration: 0.35 }}
        style={{ ...codeBlock(compact), border: `1px solid ${PURPLE}44` }}
      >
        <div style={{ color: MUTED, fontSize: compact ? 9 : 10, marginBottom: 4, fontWeight: 700, textTransform: 'uppercase' }}>useReducer action union</div>
        <div>
          <span style={{ color: PURPLE }}>type </span>
          <span style={{ color: BLUE }}>Action</span>
          <span style={{ color: MUTED }}> =</span>
        </div>
        <div style={{ paddingLeft: compact ? 12 : 16, color: MUTED }}>
          <div><span style={{ color: GREEN }}>{'{ type: "inc" }'}</span></div>
          <div><span style={{ color: ORANGE }}>| {'{ type: "set"; value: number }'}</span></div>
        </div>
      </motion.div>
    </div>
  )
}

function Step3({ compact }: { compact: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 8 : 12 }}>
      {[
        {
          hook: 'useMemo',
          color: BLUE,
          desc: 'cached computed value',
          code: 'items.map(n => n * 2)',
          returns: 'number[]',
        },
        {
          hook: 'useCallback',
          color: GREEN,
          desc: 'stable function ref',
          code: '(id: number): void',
          returns: 'fn',
        },
      ].map((h, i) => (
        <motion.div
          key={h.hook}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2, duration: 0.35 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: compact ? 8 : 12,
            background: `${h.color}0d`,
            border: `1px solid ${h.color}33`,
            borderRadius: 8,
            padding: compact ? '7px 10px' : '10px 14px',
          }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: compact ? 10 : 12,
            color: h.color,
            fontWeight: 700,
            minWidth: compact ? 80 : 96,
          }}>
            {h.hook}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 10 : 11, color: MUTED }}>
              {h.code}
            </div>
            <div style={{ fontSize: compact ? 9 : 10, color: h.color }}>→ {h.returns} (inferred)</div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function Step4({ compact }: { compact: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 8 : 12, alignItems: 'center' }}>
      {/* Flow: fetch → assert → typed */}
      {[
        { label: 'fetch("/api/users")', color: MUTED, arrow: '↓' },
        { label: 'res.json()', color: MUTED, arrow: '↓' },
        { label: 'fetchData<User[]>()', color: BLUE, arrow: '↓', highlight: true },
        { label: 'users: User[]', color: GREEN, arrow: null },
      ].map((node, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.12, duration: 0.3 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: compact ? 10 : 12,
            color: node.color,
            background: node.highlight ? `${BLUE}18` : 'transparent',
            border: node.highlight ? `1px solid ${BLUE}44` : 'none',
            borderRadius: 6,
            padding: node.highlight ? (compact ? '3px 10px' : '4px 12px') : undefined,
            fontWeight: node.highlight ? 700 : 400,
          }}>
            {node.label}
          </div>
          {node.arrow && (
            <div style={{ color: MUTED, fontSize: compact ? 11 : 13, lineHeight: 1 }}>{node.arrow}</div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

function Step5({ compact }: { compact: boolean }) {
  const handlers = [
    { type: 'MouseEventHandler', element: 'HTMLButtonElement', color: ORANGE },
    { type: 'ChangeEventHandler', element: 'HTMLInputElement', color: BLUE },
    { type: 'FormEventHandler', element: 'HTMLFormElement', color: GREEN },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>
      {handlers.map((h, i) => (
        <motion.div
          key={h.type}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.13, duration: 0.3 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: compact ? 10 : 12,
            color: h.color,
            fontWeight: 600,
          }}>
            {h.type}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: compact ? 9 : 10,
            color: MUTED,
            paddingLeft: compact ? 10 : 14,
            borderLeft: `2px solid ${h.color}44`,
          }}>
            &lt;{h.element}&gt;
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default function TsReactViz({ step, compact = false }: Props) {
  const clampedStep = Math.min(step, stepLabels.length - 1)

  const stepContent: Record<number, React.ReactNode> = {
    0: <Step0 compact={compact} />,
    1: <Step1 compact={compact} />,
    2: <Step2 compact={compact} />,
    3: <Step3 compact={compact} />,
    4: <Step4 compact={compact} />,
    5: <Step5 compact={compact} />,
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
