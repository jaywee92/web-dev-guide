import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const COLOR = '#5b9cf5'
const BTN_COLOR = '#f5c542'
const EVENT_COLOR = '#fb923c'
const BUBBLE_COLOR = '#4ade80'
const STOP_COLOR = '#ec4899'

const stepLabels = [
  'Events are actions that happen in the browser',
  'addEventListener attaches a listener',
  'The Event object carries information',
  'Bubbling — events travel up the DOM',
  'stopPropagation and preventDefault',
]

function DomNode({
  label,
  color,
  glow,
  compact,
  style: extraStyle,
}: {
  label: string
  color: string
  glow?: boolean
  compact: boolean
  style?: React.CSSProperties
}) {
  return (
    <motion.div
      animate={glow ? { boxShadow: [`0 0 0px ${color}00`, `0 0 18px ${color}bb`, `0 0 0px ${color}00`] } : { boxShadow: `0 0 6px ${color}33` }}
      transition={glow ? { repeat: Infinity, duration: 0.9, ease: 'easeInOut' } : { duration: 0.3 }}
      style={{
        border: `2px solid ${color}`,
        background: `${color}18`,
        borderRadius: 7,
        padding: compact ? '5px 10px' : '7px 14px',
        fontFamily: 'var(--font-mono)',
        fontSize: compact ? 10 : 11,
        fontWeight: 700,
        color,
        textAlign: 'center',
        ...extraStyle,
      }}
    >
      {label}
    </motion.div>
  )
}

function RippleButton({ compact }: { compact: boolean }) {
  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          width: compact ? 40 : 56,
          height: compact ? 40 : 56,
          borderRadius: '50%',
          background: BTN_COLOR,
        }}
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        style={{
          position: 'relative',
          border: `2px solid ${BTN_COLOR}`,
          background: `${BTN_COLOR}22`,
          borderRadius: 7,
          padding: compact ? '6px 14px' : '8px 20px',
          fontFamily: 'var(--font-mono)',
          fontSize: compact ? 10 : 12,
          fontWeight: 700,
          color: BTN_COLOR,
          cursor: 'default',
        }}
      >
        Click me
      </motion.button>
    </div>
  )
}

function EventObjectBox({ compact }: { compact: boolean }) {
  const fields = [
    { key: 'type', val: '"click"' },
    { key: 'target', val: '<button>' },
    { key: 'preventDefault', val: 'fn()' },
  ]
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
      style={{
        border: `2px solid ${EVENT_COLOR}`,
        background: `${EVENT_COLOR}15`,
        borderRadius: 8,
        padding: compact ? '6px 10px' : '8px 14px',
        fontFamily: 'var(--font-mono)',
        fontSize: compact ? 9 : 10,
        color: EVENT_COLOR,
      }}
    >
      <div style={{ opacity: 0.7, marginBottom: 4, fontSize: compact ? 8 : 9, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        Event
      </div>
      {fields.map(f => (
        <div key={f.key} style={{ display: 'flex', gap: 6 }}>
          <span style={{ opacity: 0.7 }}>{f.key}:</span>
          <span style={{ color: '#fff' }}>{f.val}</span>
        </div>
      ))}
    </motion.div>
  )
}

function BubbleTree({ step, compact }: { step: number; compact: boolean }) {
  const nodes = [
    { label: 'document', color: BUBBLE_COLOR, glow: step >= 3 },
    { label: 'outer div', color: BUBBLE_COLOR, glow: step >= 3 },
    { label: 'inner div', color: BTN_COLOR, glow: step >= 3 },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 4 : 6 }}>
      {nodes.map((n, i) => (
        <div key={n.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {i > 0 && (
            <motion.div
              animate={n.glow ? {
                color: [BUBBLE_COLOR, '#fff', BUBBLE_COLOR],
              } : { color: `${BUBBLE_COLOR}55` }}
              transition={n.glow ? { repeat: Infinity, duration: 0.8, ease: 'easeInOut', delay: (nodes.length - 1 - i) * 0.25 } : {}}
              style={{ fontSize: compact ? 14 : 18, lineHeight: 1 }}
            >
              ↑
            </motion.div>
          )}
          <DomNode
            label={n.label}
            color={n.color}
            glow={n.glow}
            compact={compact}
          />
        </div>
      ))}
    </div>
  )
}

export default function DomEventsViz({ step, compact = false }: Props) {
  const labelColor =
    step === 0 ? BTN_COLOR
    : step === 1 ? COLOR
    : step === 2 ? EVENT_COLOR
    : step === 3 ? BUBBLE_COLOR
    : STOP_COLOR

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 20 }}>
      {/* Label badge */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          style={{
            background: `${labelColor}22`,
            border: `1px solid ${labelColor}55`,
            borderRadius: 6,
            padding: compact ? '4px 10px' : '5px 14px',
            fontSize: compact ? 10 : 11,
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            color: labelColor,
            textAlign: 'center',
          }}
        >
          {stepLabels[Math.min(step, stepLabels.length - 1)]}
        </motion.div>
      </AnimatePresence>

      {/* Step 0–1: button + optional handler connection */}
      <AnimatePresence mode="wait">
        {step <= 2 && (
          <motion.div
            key="btn-area"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 8 : 12 }}
          >
            <RippleButton compact={compact} />

            {/* Step 1: addEventListener connection */}
            <AnimatePresence>
              {step >= 1 && (
                <motion.div
                  key="listener"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 4 : 6 }}
                >
                  <motion.div
                    animate={{ color: [COLOR, BTN_COLOR, COLOR] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                    style={{ fontSize: compact ? 14 : 18, lineHeight: 1 }}
                  >
                    ↓
                  </motion.div>
                  <DomNode label="handler fn()" color={COLOR} glow={step === 1} compact={compact} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 2: Event object */}
            <AnimatePresence>
              {step >= 2 && <EventObjectBox key="event-obj" compact={compact} />}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Step 3–4: bubbling tree */}
        {step >= 3 && (
          <motion.div
            key="bubble-area"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 8 : 12 }}
          >
            <BubbleTree step={step} compact={compact} />

            {/* Step 4: stop badges */}
            <AnimatePresence>
              {step >= 4 && (
                <motion.div
                  key="stop-badges"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  style={{ display: 'flex', gap: compact ? 6 : 10 }}
                >
                  {['stopPropagation()', 'preventDefault()'].map(label => (
                    <div
                      key={label}
                      style={{
                        border: `1px solid ${STOP_COLOR}`,
                        background: `${STOP_COLOR}18`,
                        borderRadius: 5,
                        padding: compact ? '3px 7px' : '4px 10px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: compact ? 8 : 9,
                        fontWeight: 700,
                        color: STOP_COLOR,
                      }}
                    >
                      {label}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
