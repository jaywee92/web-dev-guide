import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const stepLabels = [
  'A REST API exposes resources as URLs',
  'GET — retrieve data, no body',
  'POST — create new resource, sends body',
  'PUT replaces, PATCH updates partially',
  'DELETE — remove resource',
]

const PURPLE = '#a78bfa'
const BLUE = '#5b9cf5'
const GREEN = '#4ade80'
const RED = '#f87171'
const ORANGE = '#fb923c'

function UrlBar({ compact }: { compact: boolean }) {
  const parts = [
    { text: 'https://', color: GREEN },
    { text: 'api.example.com', color: BLUE },
    { text: '/users', color: PURPLE },
  ]
  const labels = ['protocol', 'host', 'path']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{
        display: 'flex',
        background: 'var(--surface-bright)',
        border: `2px solid ${PURPLE}44`,
        borderRadius: 8,
        padding: compact ? '6px 10px' : '8px 14px',
        fontFamily: 'var(--font-mono)',
        fontSize: compact ? 11 : 13,
        fontWeight: 600,
        gap: 0,
      }}>
        {parts.map(p => (
          <span key={p.text} style={{ color: p.color }}>{p.text}</span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: compact ? 12 : 20 }}>
        {labels.map((label, i) => (
          <span key={label} style={{
            fontSize: compact ? 9 : 10,
            fontFamily: 'var(--font-mono)',
            color: parts[i].color,
            opacity: 0.8,
          }}>
            ↑ {label}
          </span>
        ))}
      </div>
    </div>
  )
}

function MethodRow({
  method,
  path,
  color,
  description,
  compact,
  active,
}: {
  method: string
  path: string
  color: string
  description: string
  compact: boolean
  active: boolean
}) {
  return (
    <motion.div
      animate={{ opacity: active ? 1 : 0.3, x: active ? 0 : -4 }}
      transition={{ duration: 0.35 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: compact ? 8 : 12,
        fontFamily: 'var(--font-mono)',
        fontSize: compact ? 10 : 12,
      }}
    >
      <span style={{
        background: active ? color : `${color}33`,
        color: active ? '#0f0f1a' : color,
        borderRadius: 4,
        padding: compact ? '2px 6px' : '3px 8px',
        fontWeight: 700,
        minWidth: compact ? 46 : 56,
        textAlign: 'center',
        fontSize: compact ? 9 : 11,
      }}>
        {method}
      </span>
      <span style={{ color: active ? BLUE : 'var(--text-muted)', flex: 1 }}>{path}</span>
      <span style={{ color: active ? 'var(--text)' : 'var(--text-muted)', fontSize: compact ? 9 : 10 }}>{description}</span>
    </motion.div>
  )
}

function Arrow({
  label,
  color,
  direction = 'right',
  compact,
}: {
  label: string
  color: string
  direction?: 'right' | 'left'
  compact: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === 'right' ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontFamily: 'var(--font-mono)',
        fontSize: compact ? 10 : 11,
        color,
      }}
    >
      {direction === 'left' && <span>←</span>}
      <div style={{
        height: 2,
        width: compact ? 48 : 64,
        background: color,
        borderRadius: 1,
      }} />
      <span style={{
        background: `${color}22`,
        border: `1px solid ${color}55`,
        borderRadius: 4,
        padding: compact ? '2px 6px' : '3px 8px',
        fontWeight: 700,
        whiteSpace: 'nowrap',
      }}>
        {label}
      </span>
      {direction === 'right' && <span>→</span>}
    </motion.div>
  )
}

function Box({ label, color, compact }: { label: string; color: string; compact: boolean }) {
  return (
    <div style={{
      padding: compact ? '8px 14px' : '12px 20px',
      border: `2px solid ${color}55`,
      borderRadius: 10,
      background: `${color}11`,
      fontFamily: 'var(--font-mono)',
      fontSize: compact ? 10 : 12,
      fontWeight: 700,
      color,
      textAlign: 'center',
    }}>
      {label}
    </div>
  )
}

function JsonBody({ compact }: { compact: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        background: 'var(--surface-bright)',
        border: `1px solid ${ORANGE}55`,
        borderRadius: 6,
        padding: compact ? '4px 8px' : '6px 12px',
        fontFamily: 'var(--font-mono)',
        fontSize: compact ? 8 : 10,
        color: ORANGE,
        whiteSpace: 'pre',
        lineHeight: 1.5,
      }}
    >
      {`{ "name": "Alice",\n  "email": "a@x.com" }`}
    </motion.div>
  )
}

const methods = [
  { method: 'GET', path: '/users', color: GREEN, description: 'read — no body' },
  { method: 'POST', path: '/users', color: ORANGE, description: 'create — sends body' },
  { method: 'PUT', path: '/users/42', color: BLUE, description: 'replace — full update' },
  { method: 'PATCH', path: '/users/42', color: PURPLE, description: 'partial update' },
  { method: 'DELETE', path: '/users/42', color: RED, description: 'remove resource' },
]

export default function RestViz({ step, compact = false }: Props) {
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
            background: `${PURPLE}22`,
            border: `1px solid ${PURPLE}55`,
            borderRadius: 6,
            padding: compact ? '4px 10px' : '5px 14px',
            fontSize: compact ? 10 : 11,
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            color: PURPLE,
            letterSpacing: '0.3px',
            textAlign: 'center',
          }}
        >
          {stepLabels[Math.min(step, stepLabels.length - 1)]}
        </motion.div>
      </AnimatePresence>

      {/* Step 0: URL anatomy */}
      {step === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <UrlBar compact={compact} />
        </motion.div>
      )}

      {/* Steps 1-3: Browser → Server with method arrow */}
      {step >= 1 && step <= 3 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 8 : 14 }}>
          <Box label="Browser" color={BLUE} compact={compact} />
          <Arrow
            label={
              step === 1 ? 'GET /users' :
              step === 2 ? 'POST /users' :
              'PUT/PATCH /users/42'
            }
            color={step === 1 ? GREEN : step === 2 ? ORANGE : BLUE}
            compact={compact}
          />
          {step === 2 && <JsonBody compact={compact} />}
          {step === 2 && (
            <Arrow label="" color={ORANGE} compact={compact} />
          )}
          <Box label="Server" color={GREEN} compact={compact} />
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                fontFamily: 'var(--font-mono)',
                fontSize: compact ? 8 : 10,
                color: GREEN,
              }}
            >
              <span>← [{'{'}id:1,name:"Alice"{'}'}, ...]</span>
            </motion.div>
          )}
        </div>
      )}

      {/* Step 4: DELETE + summary table */}
      {step === 4 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 8 : 14 }}>
            <Box label="Browser" color={BLUE} compact={compact} />
            <Arrow label="DELETE /users/42" color={RED} compact={compact} />
            <Box label="Server" color={RED} compact={compact} />
            <motion.span
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 11, color: RED }}
            >
              resource ✕
            </motion.span>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            width: '100%',
            maxWidth: compact ? 280 : 360,
          }}>
            {methods.map(m => (
              <MethodRow key={m.method} {...m} compact={compact} active={true} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
