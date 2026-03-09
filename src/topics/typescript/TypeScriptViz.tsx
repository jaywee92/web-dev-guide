import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const BLUE = '#5b9cf5'
const RED = '#f87171'
const GREEN = '#4ade80'

const stepLabels = [
  'JavaScript: types are implicit',
  'TypeScript: types are explicit',
  'Type errors caught at compile time',
  'Interfaces define object shapes',
  'Generics: reusable types',
]

// ── shared styles ───────────────────────────────────────────────────────────
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

// ── Step 0: plain JS ────────────────────────────────────────────────────────
function Step0({ compact }: { compact: boolean }) {
  return (
    <div style={codeBlock(compact)}>
      <div><span style={{ color: '#a78bfa' }}>let </span><span style={{ color: '#e2e8f0' }}>age</span><span style={{ color: '#94a3b8' }}> = </span><span style={{ color: '#fb923c' }}>25</span></div>
      <div><span style={{ color: '#a78bfa' }}>let </span><span style={{ color: '#e2e8f0' }}>name</span><span style={{ color: '#94a3b8' }}> = </span><span style={{ color: '#4ade80' }}>"Alice"</span></div>
    </div>
  )
}

// ── Step 1: TS annotations animate in ───────────────────────────────────────
function Step1({ compact }: { compact: boolean }) {
  return (
    <div style={codeBlock(compact)}>
      <div>
        <span style={{ color: '#a78bfa' }}>let </span>
        <span style={{ color: '#e2e8f0' }}>age</span>
        <motion.span
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          style={{ color: BLUE, background: `${BLUE}22`, borderRadius: 3, padding: '0 2px' }}
        >: number</motion.span>
        <span style={{ color: '#94a3b8' }}> = </span>
        <span style={{ color: '#fb923c' }}>25</span>
      </div>
      <div>
        <span style={{ color: '#a78bfa' }}>let </span>
        <span style={{ color: '#e2e8f0' }}>name</span>
        <motion.span
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          style={{ color: BLUE, background: `${BLUE}22`, borderRadius: 3, padding: '0 2px' }}
        >: string</motion.span>
        <span style={{ color: '#94a3b8' }}> = </span>
        <span style={{ color: '#4ade80' }}>"Alice"</span>
      </div>
    </div>
  )
}

// ── Step 2: type error ───────────────────────────────────────────────────────
function Step2({ compact }: { compact: boolean }) {
  return (
    <div style={codeBlock(compact)}>
      <div>
        <span style={{ color: '#a78bfa' }}>let </span>
        <span style={{ color: '#e2e8f0' }}>age</span>
        <span style={{ color: BLUE }}>: number</span>
        <span style={{ color: '#94a3b8' }}> = </span>
        <span style={{ color: '#fb923c' }}>25</span>
      </div>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <span style={{ color: '#e2e8f0' }}>age</span>
        <span style={{ color: '#94a3b8' }}> = </span>
        <span style={{ color: '#4ade80', position: 'relative' }}>
          "hello"
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{
              position: 'absolute',
              bottom: -2,
              left: 0,
              right: 0,
              height: 2,
              background: RED,
              borderRadius: 1,
              transformOrigin: 'left',
              display: 'block',
            }}
          />
        </span>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.35 }}
        style={{
          marginTop: compact ? 8 : 10,
          background: `${RED}18`,
          border: `1px solid ${RED}55`,
          borderRadius: 6,
          padding: compact ? '5px 10px' : '7px 12px',
          fontSize: compact ? 10 : 11,
          color: RED,
          lineHeight: 1.5,
        }}
      >
        Type 'string' is not assignable to type 'number'
      </motion.div>
    </div>
  )
}

// ── Step 3: interface ────────────────────────────────────────────────────────
function Step3({ compact }: { compact: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: compact ? 'column' : 'row', gap: compact ? 10 : 16, alignItems: 'flex-start' }}>
      {/* Interface box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          ...codeBlock(compact),
          border: `1.5px solid ${BLUE}88`,
          boxShadow: `0 0 16px ${BLUE}33`,
        }}
      >
        <div style={{ color: '#94a3b8', fontSize: compact ? 9 : 10, fontWeight: 700, marginBottom: 4, letterSpacing: '0.5px', textTransform: 'uppercase' }}>interface</div>
        <div>
          <span style={{ color: BLUE, fontWeight: 700 }}>User</span>
          <span style={{ color: '#e2e8f0' }}> {'{'}</span>
        </div>
        <div style={{ paddingLeft: compact ? 12 : 16 }}>
          <div><span style={{ color: '#e2e8f0' }}>name</span><span style={{ color: BLUE }}>: string</span></div>
          <div><span style={{ color: '#e2e8f0' }}>age</span><span style={{ color: BLUE }}>: number</span></div>
        </div>
        <div style={{ color: '#e2e8f0' }}>{'}'}</div>
      </motion.div>

      {/* Conforming object */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        style={{
          ...codeBlock(compact),
          border: `1.5px solid ${GREEN}55`,
          boxShadow: `0 0 12px ${GREEN}22`,
        }}
      >
        <div style={{ color: '#94a3b8', fontSize: compact ? 9 : 10, fontWeight: 700, marginBottom: 4, letterSpacing: '0.5px', textTransform: 'uppercase' }}>object</div>
        <div>
          <span style={{ color: '#a78bfa' }}>const </span>
          <span style={{ color: '#e2e8f0' }}>user</span>
          <span style={{ color: BLUE }}>: User</span>
          <span style={{ color: '#94a3b8' }}> = {'{'}</span>
        </div>
        <div style={{ paddingLeft: compact ? 12 : 16 }}>
          <div><span style={{ color: '#e2e8f0' }}>name</span><span style={{ color: '#94a3b8' }}>: </span><span style={{ color: '#4ade80' }}>"Alice"</span><span style={{ color: '#94a3b8' }}>,</span></div>
          <div><span style={{ color: '#e2e8f0' }}>age</span><span style={{ color: '#94a3b8' }}>: </span><span style={{ color: '#fb923c' }}>25</span><span style={{ color: '#94a3b8' }}>,</span></div>
        </div>
        <div style={{ color: '#94a3b8' }}>{'}'}</div>
      </motion.div>
    </div>
  )
}

// ── Step 4: generics ─────────────────────────────────────────────────────────
function Step4({ compact }: { compact: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 8 : 12, alignItems: 'flex-start' }}>
      {/* Function signature */}
      <div style={codeBlock(compact)}>
        <div>
          <span style={{ color: '#a78bfa' }}>function </span>
          <span style={{ color: '#60a5fa' }}>first</span>
          <motion.span
            animate={{ color: [BLUE, '#a78bfa', BLUE], textShadow: [`0 0 8px ${BLUE}`, '0 0 0px transparent', `0 0 8px ${BLUE}`] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            style={{ color: BLUE, fontWeight: 700 }}
          >{'<T>'}</motion.span>
          <span style={{ color: '#e2e8f0' }}>(arr</span>
          <span style={{ color: BLUE }}>: T[]</span>
          <span style={{ color: '#e2e8f0' }}>)</span>
          <span style={{ color: BLUE }}>: T</span>
          <span style={{ color: '#94a3b8' }}> {'{'} </span>
          <span style={{ color: '#a78bfa' }}>return</span>
          <span style={{ color: '#e2e8f0' }}> arr[0] </span>
          <span style={{ color: '#94a3b8' }}>{'}'}</span>
        </div>
      </div>

      {/* Call sites */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        style={codeBlock(compact)}
      >
        <div>
          <span style={{ color: '#60a5fa' }}>first</span>
          <span style={{ color: '#e2e8f0' }}>([1, 2, 3])</span>
          <span style={{ color: '#94a3b8' }}>{'  // '}</span>
          <span style={{ color: BLUE }}>T</span>
          <span style={{ color: '#94a3b8' }}> = </span>
          <span style={{ color: BLUE }}>number</span>
        </div>
        <div>
          <span style={{ color: '#60a5fa' }}>first</span>
          <span style={{ color: '#e2e8f0' }}>(["a", "b"])</span>
          <span style={{ color: '#94a3b8' }}>{'  // '}</span>
          <span style={{ color: BLUE }}>T</span>
          <span style={{ color: '#94a3b8' }}> = </span>
          <span style={{ color: BLUE }}>string</span>
        </div>
      </motion.div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function TypeScriptViz({ step, compact = false }: Props) {
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
      {/* Label badge */}
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
            letterSpacing: '0.2px',
          }}
        >
          {stepLabels[clampedStep]}
        </motion.div>
      </AnimatePresence>

      {/* Step visualization */}
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
