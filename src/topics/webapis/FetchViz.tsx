import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const COLOR = '#5b9cf5'
const SERVER_COLOR = '#4ade80'
const RESPONSE_COLOR = '#f5c542'
const JSON_COLOR = '#fb923c'

const stepLabels = [
  'The Fetch API makes HTTP requests from JavaScript',
  'fetch() sends a request',
  'Returns a Promise<Response>',
  '.json() parses the response body',
  'async/await — cleaner syntax',
]

function Box({
  label,
  sublabel,
  color,
  glow,
  compact,
}: {
  label: string
  sublabel?: string
  color: string
  glow?: boolean
  compact: boolean
}) {
  return (
    <motion.div
      animate={glow ? { boxShadow: [`0 0 0px ${color}00`, `0 0 20px ${color}99`, `0 0 0px ${color}00`] } : { boxShadow: `0 0 10px ${color}33` }}
      transition={glow ? { repeat: Infinity, duration: 1.2, ease: 'easeInOut' } : { duration: 0.3 }}
      style={{
        border: `2px solid ${color}`,
        background: `${color}18`,
        borderRadius: 8,
        padding: compact ? '8px 14px' : '12px 20px',
        minWidth: compact ? 70 : 90,
        textAlign: 'center',
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        color,
      }}
    >
      <div style={{ fontSize: compact ? 10 : 12 }}>{label}</div>
      {sublabel && (
        <div style={{ fontSize: compact ? 8 : 9, opacity: 0.7, marginTop: 3 }}>{sublabel}</div>
      )}
    </motion.div>
  )
}

function Arrow({
  direction,
  label,
  color,
  compact,
}: {
  direction: 'right' | 'left'
  label?: string
  color: string
  compact: boolean
}) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      exit={{ scaleX: 0, opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        transformOrigin: direction === 'right' ? 'left center' : 'right center',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
        {direction === 'left' && (
          <span style={{ fontSize: compact ? 14 : 18, color, lineHeight: 1 }}>◄</span>
        )}
        <div style={{
          width: compact ? 40 : 60,
          height: 2,
          background: color,
        }} />
        {direction === 'right' && (
          <span style={{ fontSize: compact ? 14 : 18, color, lineHeight: 1 }}>►</span>
        )}
      </div>
      {label && (
        <span style={{
          fontSize: compact ? 8 : 9,
          fontFamily: 'var(--font-mono)',
          color,
          opacity: 0.85,
          letterSpacing: '0.3px',
          whiteSpace: 'nowrap',
        }}>
          {label}
        </span>
      )}
    </motion.div>
  )
}

export default function FetchViz({ step, compact = false }: Props) {
  const labelColor = step === 0 ? COLOR : step <= 2 ? COLOR : step === 3 ? JSON_COLOR : SERVER_COLOR

  const showRequestArrow = step >= 1
  const showResponse = step >= 2
  const showResponseArrow = step >= 2
  const showJsonFlow = step >= 3
  const showAsyncAwait = step >= 4

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 20 }}>
      {/* Step label badge */}
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

      {/* Main diagram */}
      <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 8 : 12 }}>
        {/* Browser box */}
        <Box
          label="Browser"
          sublabel={showAsyncAwait ? 'users ✓' : undefined}
          color={COLOR}
          glow={step === 0 || step === 4}
          compact={compact}
        />

        {/* Request arrow: browser → server */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 4 : 6 }}>
          <AnimatePresence>
            {showRequestArrow && (
              <Arrow
                key="req"
                direction="right"
                label={step >= 4 ? 'await fetch(url)' : 'fetch(url)'}
                color={COLOR}
                compact={compact}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showResponseArrow && (
              <Arrow
                key="res"
                direction="left"
                label={step >= 3 ? 'Response → .json()' : 'Promise<Response>'}
                color={step >= 3 ? JSON_COLOR : RESPONSE_COLOR}
                compact={compact}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Server box */}
        <Box
          label="Server"
          sublabel={showResponse ? '/api/data' : undefined}
          color={SERVER_COLOR}
          glow={step === 1 || step === 2}
          compact={compact}
        />
      </div>

      {/* JSON data display — step 3+ */}
      <AnimatePresence>
        {showJsonFlow && (
          <motion.div
            key="json-data"
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
            style={{
              border: `2px solid ${JSON_COLOR}`,
              background: `${JSON_COLOR}15`,
              borderRadius: 8,
              padding: compact ? '6px 12px' : '8px 16px',
              fontFamily: 'var(--font-mono)',
              fontSize: compact ? 9 : 10,
              color: JSON_COLOR,
              textAlign: 'left',
            }}
          >
            <div style={{ opacity: 0.7, marginBottom: 3, fontSize: compact ? 8 : 9, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              parsed JSON
            </div>
            <div>{'{ "id": 1, "name": "Alice" }'}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* async/await code snippet — step 4 */}
      <AnimatePresence>
        {showAsyncAwait && (
          <motion.div
            key="async-code"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            style={{
              border: `1px solid ${SERVER_COLOR}44`,
              background: `${SERVER_COLOR}0d`,
              borderRadius: 8,
              padding: compact ? '6px 10px' : '8px 14px',
              fontFamily: 'var(--font-mono)',
              fontSize: compact ? 9 : 10,
              color: SERVER_COLOR,
              whiteSpace: 'pre',
            }}
          >
            {`const res = await fetch(url)\nconst data = await res.json()`}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
