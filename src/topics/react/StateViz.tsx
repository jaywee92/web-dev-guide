import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const BLUE = '#5b9cf5'
const stepLabels = [
  'State is data that changes over time',
  'useState returns [value, setter]',
  'Calling setter triggers a re-render',
  'Each component instance has its own state',
  'Rules of Hooks: top level only',
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

function CounterBox({ count, label }: { count: number; label?: string }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 4,
      padding: '10px 20px',
      border: `2px solid ${BLUE}`,
      borderRadius: 8,
      background: 'rgba(91,156,245,0.08)',
    }}>
      <motion.div
        key={count}
        initial={{ scale: 1.4, color: '#f5c542' }}
        animate={{ scale: 1, color: '#e2e8f0' }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 32,
          fontWeight: 700,
        }}
      >
        {count}
      </motion.div>
      {label && (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: BLUE }}>
          {label}
        </div>
      )}
    </div>
  )
}

export default function StateViz({ step, compact = false }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>

      {/* Step 0 — counter on screen */}
      {step === 0 && (
        <AnimatePresence mode="wait">
          <motion.div
            key="step0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <CounterBox count={0} />
          </motion.div>
        </AnimatePresence>
      )}

      {/* Step 1 — useState destructuring */}
      {step === 1 && (
        <AnimatePresence mode="wait">
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <CodeBlock>
              <CodeLine highlight>{'const [count, setCount] = useState(0)'}</CodeLine>
            </CodeBlock>
            <div style={{ display: 'flex', gap: 16, marginTop: 8, justifyContent: 'center' }}>
              {[['count', 'value'], ['setCount', 'setter'], ['0', 'initial']].map(([name, role]) => (
                <div key={name} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: BLUE, fontWeight: 700 }}>{name}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#94a3b8' }}>{role}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Step 2 — setter triggers re-render */}
      {step === 2 && (
        <AnimatePresence mode="wait">
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}
          >
            <CounterBox count={1} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, color: '#f5c542',
                background: 'rgba(245,197,66,0.1)', padding: '3px 8px', borderRadius: 4,
              }}>
                setCount(count + 1)
              </div>
              <span style={{ color: '#4ade80', fontSize: 14 }}>→</span>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, color: '#4ade80',
                background: 'rgba(74,222,128,0.1)', padding: '3px 8px', borderRadius: 4,
              }}>
                re-render
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Step 3 — independent instances */}
      {step === 3 && (
        <AnimatePresence mode="wait">
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: 'flex', gap: 20, alignItems: 'flex-end' }}
          >
            <CounterBox count={3} label="Counter A" />
            <CounterBox count={7} label="Counter B" />
          </motion.div>
        </AnimatePresence>
      )}

      {/* Step 4 — rules of hooks */}
      {step === 4 && (
        <AnimatePresence mode="wait">
          <motion.div
            key="step4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
          >
            <CodeBlock>
              <CodeLine highlight>{'const [a, setA] = useState(0)  ✅'}</CodeLine>
              <CodeLine>{'if (condition) {'}</CodeLine>
              <CodeLine>{'  const [b, setB] = useState("")  ❌'}</CodeLine>
              <CodeLine>{'}'}</CodeLine>
            </CodeBlock>
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
