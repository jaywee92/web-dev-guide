import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const stepLabels = [
  'A function with a variable in its scope',
  'Inner function defined inside outer function',
  'Outer function returns — but count survives!',
  'Inner function still accesses outer variable',
  'Each call creates an independent closure',
]

const labelColors = ['#5b9cf5', '#4ade80', '#f5c542', '#f5c542', '#4ade80']

// Colors
const OUTER_COLOR = '#5b9cf5'
const INNER_COLOR = '#4ade80'
const VAR_COLOR = '#f5c542'

function CountBadge({ value, glow, compact }: { value: number; glow: boolean; compact: boolean }) {
  return (
    <motion.div
      animate={glow ? { boxShadow: [`0 0 0px ${VAR_COLOR}00`, `0 0 18px ${VAR_COLOR}cc`, `0 0 0px ${VAR_COLOR}00`] } : { boxShadow: 'none' }}
      transition={glow ? { repeat: Infinity, duration: 1.0, ease: 'easeInOut' } : { duration: 0 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: compact ? 4 : 6,
        background: `${VAR_COLOR}22`,
        border: `2px solid ${VAR_COLOR}`,
        borderRadius: 6,
        padding: compact ? '3px 8px' : '4px 12px',
        fontFamily: 'var(--font-mono)',
        fontSize: compact ? 10 : 12,
        fontWeight: 700,
        color: VAR_COLOR,
      }}
    >
      <span style={{ opacity: 0.75 }}>let count =</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={value}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.25 }}
          style={{ color: VAR_COLOR }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  )
}

function InnerFunctionBox({ compact, showArrow, arrowGlow }: { compact: boolean; showArrow: boolean; arrowGlow: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 4 : 6 }}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, boxShadow: `0 0 16px ${INNER_COLOR}44` }}
        transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
        style={{
          border: `2px solid ${INNER_COLOR}`,
          background: `${INNER_COLOR}12`,
          borderRadius: 7,
          padding: compact ? '6px 12px' : '8px 18px',
          fontFamily: 'var(--font-mono)',
          fontSize: compact ? 10 : 11,
          fontWeight: 700,
          color: INNER_COLOR,
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: compact ? 8 : 9, opacity: 0.7, marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.5px' }}>inner fn</div>
        increment()
      </motion.div>

      {/* Arrow pointing back to count */}
      <AnimatePresence>
        {showArrow && (
          <motion.div
            key="closure-arrow"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transformOrigin: 'top' }}
          >
            <motion.div
              animate={arrowGlow ? {
                color: [INNER_COLOR, VAR_COLOR, INNER_COLOR],
                textShadow: [`0 0 0px ${INNER_COLOR}00`, `0 0 12px ${VAR_COLOR}cc`, `0 0 0px ${INNER_COLOR}00`],
              } : { color: INNER_COLOR }}
              transition={arrowGlow ? { repeat: Infinity, duration: 1.0, ease: 'easeInOut' } : { duration: 0 }}
              style={{
                fontSize: compact ? 14 : 18,
                lineHeight: 1,
                color: INNER_COLOR,
              }}
            >
              ↑
            </motion.div>
            <span style={{
              fontSize: compact ? 8 : 9,
              fontFamily: 'var(--font-mono)',
              color: INNER_COLOR,
              opacity: 0.75,
              letterSpacing: '0.3px',
            }}>
              closes over
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function CounterInstance({
  label,
  countValue,
  showInner,
  showArrow,
  arrowGlow,
  compact,
}: {
  label: string
  countValue: number
  showInner: boolean
  showArrow: boolean
  arrowGlow: boolean
  compact: boolean
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 6 : 10 }}>
      {/* Outer scope box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          border: `2px dashed ${OUTER_COLOR}`,
          background: `${OUTER_COLOR}10`,
          borderRadius: 10,
          padding: compact ? '8px 12px' : '12px 18px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: compact ? 6 : 10,
          minWidth: compact ? 120 : 150,
        }}
      >
        <span style={{
          fontSize: compact ? 8 : 9,
          fontFamily: 'var(--font-mono)',
          fontWeight: 700,
          color: OUTER_COLOR,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          alignSelf: 'flex-start',
        }}>
          {label}
        </span>
        <CountBadge value={countValue} glow={arrowGlow} compact={compact} />
        {showInner && (
          <InnerFunctionBox compact={compact} showArrow={showArrow} arrowGlow={arrowGlow} />
        )}
      </motion.div>
    </div>
  )
}

export default function ClosureViz({ step, compact = false }: Props) {
  const labelColor = labelColors[Math.min(step, labelColors.length - 1)]

  // Derived state per step
  const showInner = step >= 1
  const showArrow = step >= 2
  const arrowGlow = step >= 3
  const countA = step >= 3 ? (step >= 4 ? 2 : 1) : 0
  const showSecondInstance = step >= 4

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 18 }}>
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
            letterSpacing: '0.3px',
            textAlign: 'center',
          }}
        >
          {stepLabels[Math.min(step, stepLabels.length - 1)]}
        </motion.div>
      </AnimatePresence>

      {/* Main visualization area */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: compact ? 12 : 20 }}>
        {/* Primary counter instance: const a = makeCounter() */}
        <CounterInstance
          label={step >= 4 ? 'const a = makeCounter()' : 'makeCounter()'}
          countValue={countA}
          showInner={showInner}
          showArrow={showArrow}
          arrowGlow={arrowGlow}
          compact={compact}
        />

        {/* Second counter instance — step 4 */}
        <AnimatePresence>
          {showSecondInstance && (
            <motion.div
              key="second-instance"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
            >
              <CounterInstance
                label="const b = makeCounter()"
                countValue={0}
                showInner={true}
                showArrow={true}
                arrowGlow={false}
                compact={compact}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Step 4: independence note */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.p
            key="independence-note"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: compact ? 9 : 10,
              color: INNER_COLOR,
              margin: 0,
              opacity: 0.85,
            }}
          >
            a → count: {countA} &nbsp;|&nbsp; b → count: 0 &nbsp;(independent!)
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
