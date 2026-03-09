import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const stepLabels = [
  'Status codes tell you what happened',
  '2xx — Success',
  '3xx — Redirection',
  '4xx — Client errors',
  '5xx — Server errors',
]

const PURPLE = '#a78bfa'
const GREEN = '#4ade80'
const BLUE = '#5b9cf5'
const RED = '#f87171'
const ORANGE = '#fb923c'
const YELLOW = '#fbbf24'

interface Badge {
  code: string
  label: string
  color: string
}

function StatusBadge({ code, label, color, compact }: Badge & { compact: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: compact ? 6 : 8,
        fontFamily: 'var(--font-mono)',
        fontSize: compact ? 10 : 12,
      }}
    >
      <span style={{
        background: color,
        color: '#0f0f1a',
        borderRadius: 5,
        padding: compact ? '3px 8px' : '4px 10px',
        fontWeight: 700,
        fontSize: compact ? 11 : 13,
        minWidth: compact ? 38 : 44,
        textAlign: 'center',
      }}>
        {code}
      </span>
      <span style={{ color: 'var(--text-muted)' }}>{label}</span>
    </motion.div>
  )
}

function ServerBox({ compact, fire = false }: { compact: boolean; fire?: boolean }) {
  return (
    <div style={{
      padding: compact ? '8px 14px' : '12px 20px',
      border: `2px solid ${fire ? RED : GREEN}55`,
      borderRadius: 10,
      background: fire ? `${RED}11` : `${GREEN}11`,
      fontFamily: 'var(--font-mono)',
      fontSize: compact ? 10 : 12,
      fontWeight: 700,
      color: fire ? RED : GREEN,
      textAlign: 'center',
      position: 'relative',
    }}>
      Server
      {fire && (
        <motion.span
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 0.6 }}
          style={{ position: 'absolute', top: -14, right: -6, fontSize: compact ? 14 : 18 }}
        >
          🔥
        </motion.span>
      )}
    </div>
  )
}

function ClientBox({ compact }: { compact: boolean }) {
  return (
    <div style={{
      padding: compact ? '8px 14px' : '12px 20px',
      border: `2px solid ${BLUE}55`,
      borderRadius: 10,
      background: `${BLUE}11`,
      fontFamily: 'var(--font-mono)',
      fontSize: compact ? 10 : 12,
      fontWeight: 700,
      color: BLUE,
      textAlign: 'center',
    }}>
      Browser
    </div>
  )
}

function HorizArrow({ label, color, compact, reverse = false }: { label: string; color: string; compact: boolean; reverse?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 10, color }}>
      {reverse && <span>←</span>}
      <div style={{ height: 2, width: compact ? 40 : 56, background: color, borderRadius: 1 }} />
      {label && (
        <span style={{
          background: `${color}22`,
          border: `1px solid ${color}55`,
          borderRadius: 4,
          padding: compact ? '2px 5px' : '2px 7px',
          fontWeight: 700,
          whiteSpace: 'nowrap',
        }}>
          {label}
        </span>
      )}
      {!reverse && <span>→</span>}
    </div>
  )
}

export default function StatusCodesViz({ step, compact = false }: Props) {
  const step1Badges: Badge[] = [
    { code: '200', label: 'OK — request succeeded ✓', color: GREEN },
    { code: '201', label: 'Created — resource added', color: GREEN },
    { code: '204', label: 'No Content — success, no body', color: GREEN },
  ]
  const step2Redirects: Badge[] = [
    { code: '301', label: 'Moved Permanently', color: YELLOW },
    { code: '302', label: 'Found (temporary)', color: YELLOW },
  ]
  const step3Errors: Badge[] = [
    { code: '400', label: 'Bad Request', color: ORANGE },
    { code: '401', label: 'Unauthorized', color: ORANGE },
    { code: '403', label: 'Forbidden', color: RED },
    { code: '404', label: 'Not Found', color: RED },
  ]
  const step4Errors: Badge[] = [
    { code: '500', label: 'Internal Server Error', color: RED },
    { code: '503', label: 'Service Unavailable', color: RED },
  ]

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
          }}
        >
          {stepLabels[Math.min(step, stepLabels.length - 1)]}
        </motion.div>
      </AnimatePresence>

      {/* Step 0: request → response with code badge */}
      {step === 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 8 : 14 }}>
          <ClientBox compact={compact} />
          <HorizArrow label="GET /page" color={BLUE} compact={compact} />
          <ServerBox compact={compact} />
          <HorizArrow label="200 OK" color={GREEN} compact={compact} reverse />
        </div>
      )}

      {/* Step 1: 2xx badges */}
      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 8 }}>
          {step1Badges.map(b => <StatusBadge key={b.code} {...b} compact={compact} />)}
        </div>
      )}

      {/* Step 2: 3xx redirect arrows */}
      {step === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 14 }}>
          {step2Redirects.map(b => (
            <div key={b.code} style={{ display: 'flex', alignItems: 'center', gap: compact ? 6 : 10 }}>
              <StatusBadge {...b} compact={compact} />
              <motion.span
                initial={{ x: 0 }}
                animate={{ x: [0, compact ? 10 : 14, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 14 : 18, color: YELLOW }}
              >
                →
              </motion.span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 10, color: 'var(--text-muted)' }}>
                {b.code === '301' ? '/new-url' : '/login'}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Step 3: 4xx client error badges */}
      {step === 3 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 8 }}>
          {step3Errors.map(b => <StatusBadge key={b.code} {...b} compact={compact} />)}
        </div>
      )}

      {/* Step 4: 5xx server errors with fire icon */}
      {step === 4 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 14 }}>
          <ServerBox compact={compact} fire />
          <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 8 }}>
            {step4Errors.map(b => <StatusBadge key={b.code} {...b} compact={compact} />)}
          </div>
        </div>
      )}
    </div>
  )
}
