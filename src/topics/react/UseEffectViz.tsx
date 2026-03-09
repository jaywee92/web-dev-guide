import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const BLUE = '#5b9cf5'
const stepLabels = [
  'useEffect runs after render',
  '[] dependency array — runs once on mount',
  'Deps array — re-runs when values change',
  'Return a cleanup function',
  'useEffect for side effects',
]

function CodeLine({ children, highlight }: { children: string; highlight?: boolean }) {
  return (
    <span style={{
      display: 'block',
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: highlight ? BLUE : '#e2e8f0',
      fontWeight: highlight ? 700 : 400,
      background: highlight ? 'rgba(91,156,245,0.12)' : 'transparent',
      borderRadius: 3,
      padding: '1px 4px',
    }}>
      {children}
    </span>
  )
}

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: 'rgba(0,0,0,0.35)',
      border: '1px solid rgba(91,156,245,0.25)',
      borderRadius: 8,
      padding: '10px 14px',
      minWidth: 240,
    }}>
      {children}
    </div>
  )
}

function PhaseBox({ label, color, active }: { label: string; color: string; active?: boolean }) {
  return (
    <motion.div
      animate={{ boxShadow: active ? `0 0 16px ${color}66` : 'none' }}
      style={{
        padding: '6px 14px',
        border: `2px solid ${color}`,
        borderRadius: 6,
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        color,
        background: `${color}18`,
        fontWeight: active ? 700 : 400,
      }}
    >
      {label}
    </motion.div>
  )
}

const useCases = [
  { icon: '🌐', label: 'Data fetching', color: BLUE },
  { icon: '📡', label: 'Subscriptions', color: '#a78bfa' },
  { icon: '🖼️', label: 'DOM updates', color: '#4ade80' },
  { icon: '⏱️', label: 'Timers', color: '#f5c542' },
]

export default function UseEffectViz({ step, compact = false }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>

      {/* Step 0 — component mounts, effect runs after */}
      {step === 0 && (
        <AnimatePresence mode="wait">
          <motion.div
            key="step0"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
          >
            <PhaseBox label="render()" color="#4ade80" active />
            <span style={{ color: '#4ade80', fontSize: 16 }}>↓</span>
            <PhaseBox label="DOM updated" color="#f5c542" active />
            <span style={{ color: BLUE, fontSize: 16 }}>↓</span>
            <PhaseBox label="useEffect runs" color={BLUE} active />
          </motion.div>
        </AnimatePresence>
      )}

      {/* Step 1 — empty deps array */}
      {step === 1 && (
        <AnimatePresence mode="wait">
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <CodeBlock>
              <CodeLine>{'useEffect(() => {'}</CodeLine>
              <CodeLine>{'  fetchData()'}</CodeLine>
              <CodeLine highlight>{'}, [])  // empty array'}</CodeLine>
            </CodeBlock>
            <div style={{
              marginTop: 8, textAlign: 'center',
              fontFamily: 'var(--font-mono)', fontSize: 11, color: BLUE,
            }}>
              Runs once on mount only
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Step 2 — deps array with userId */}
      {step === 2 && (
        <AnimatePresence mode="wait">
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}
          >
            <div style={{
              padding: '6px 16px',
              border: `2px solid #f5c542`,
              borderRadius: 6,
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: '#f5c542',
              background: 'rgba(245,197,66,0.1)',
              fontWeight: 700,
            }}>
              userId changes
            </div>
            <span style={{ color: BLUE, fontSize: 16 }}>↓</span>
            <CodeBlock>
              <CodeLine>{'useEffect(() => {'}</CodeLine>
              <CodeLine>{'  fetch(`/api/users/${userId}`)'}</CodeLine>
              <CodeLine highlight>{'}, [userId])'}</CodeLine>
            </CodeBlock>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Step 3 — cleanup function */}
      {step === 3 && (
        <AnimatePresence mode="wait">
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <CodeBlock>
              <CodeLine>{'useEffect(() => {'}</CodeLine>
              <CodeLine>{'  const timer = setInterval(tick, 1000)'}</CodeLine>
              <CodeLine highlight>{'  return () => {'}</CodeLine>
              <CodeLine highlight>{'    clearInterval(timer)  // cleanup'}</CodeLine>
              <CodeLine highlight>{'  }'}</CodeLine>
              <CodeLine>{'}, [])'}</CodeLine>
            </CodeBlock>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Step 4 — common use cases */}
      {step === 4 && (
        <AnimatePresence mode="wait">
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}
          >
            {useCases.map((uc, i) => (
              <motion.div
                key={uc.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                  padding: '8px 14px',
                  border: `2px solid ${uc.color}`,
                  borderRadius: 8,
                  background: `${uc.color}15`,
                  minWidth: 80,
                }}
              >
                <span style={{ fontSize: 20 }}>{uc.icon}</span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  color: uc.color,
                  fontWeight: 600,
                  textAlign: 'center',
                }}>
                  {uc.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          style={{
            color: BLUE,
            fontFamily: 'var(--font-mono)',
            fontSize: compact ? 11 : 12,
            textAlign: 'center',
          }}
        >
          {stepLabels[Math.min(step, stepLabels.length - 1)]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
