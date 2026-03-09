import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const BLUE = '#5b9cf5'
const GREEN = '#4ade80'
const PURPLE = '#a78bfa'
const ORANGE = '#fb923c'

const stepLabels = [
  'Without generics: rigid types',
  'Generic function: <T> placeholder',
  'TypeScript infers T from usage',
  'Generic interfaces',
  'Constraints: T extends ...',
]

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

const T_STYLE: React.CSSProperties = { color: PURPLE, fontWeight: 700 }

function Step0({ compact }: { compact: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>
      <div style={{ ...codeBlock(compact), border: `1.5px solid #f8717144` }}>
        <div style={{ color: '#94a3b8', fontSize: compact ? 9 : 10, marginBottom: 4 }}>// Only works for numbers</div>
        <div>
          <span style={{ color: PURPLE }}>function </span>
          <span style={{ color: '#60a5fa' }}>firstNum</span>
          <span style={{ color: '#e2e8f0' }}>(arr</span>
          <span style={{ color: '#94a3b8' }}>: </span>
          <span style={{ color: BLUE }}>number</span>
          <span style={{ color: '#e2e8f0' }}>[])</span>
          <span style={{ color: '#94a3b8' }}>: </span>
          <span style={{ color: BLUE }}>number</span>
          <span style={{ color: '#94a3b8' }}> {'{'} </span>
          <span style={{ color: PURPLE }}>return</span>
          <span style={{ color: '#e2e8f0' }}> arr[0] </span>
          <span style={{ color: '#94a3b8' }}>{'}'}</span>
        </div>
        <div>
          <span style={{ color: '#94a3b8', fontSize: compact ? 9 : 10 }}>// Need a SECOND function for strings</span>
        </div>
      </div>
    </div>
  )
}

function Step1({ compact }: { compact: boolean }) {
  return (
    <div style={{ ...codeBlock(compact), border: `1.5px solid ${PURPLE}55` }}>
      <div style={{ color: '#94a3b8', fontSize: compact ? 9 : 10, marginBottom: 4 }}>// Works for ANY type</div>
      <div>
        <span style={{ color: PURPLE }}>function </span>
        <span style={{ color: '#60a5fa' }}>first</span>
        <motion.span
          animate={{ boxShadow: [`0 0 8px ${PURPLE}`, '0 0 0px transparent', `0 0 8px ${PURPLE}`] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          style={{ ...T_STYLE, borderRadius: 3, padding: '0 2px' }}
        >{'<T>'}</motion.span>
        <span style={{ color: '#e2e8f0' }}>(arr</span>
        <span style={{ color: '#94a3b8' }}>: </span>
        <span style={T_STYLE}>T</span>
        <span style={{ color: '#e2e8f0' }}>[])</span>
        <span style={{ color: '#94a3b8' }}>: </span>
        <span style={T_STYLE}>T</span>
        <span style={{ color: '#94a3b8' }}> {'{'} </span>
        <span style={{ color: PURPLE }}>return</span>
        <span style={{ color: '#e2e8f0' }}> arr[0] </span>
        <span style={{ color: '#94a3b8' }}>{'}'}</span>
      </div>
    </div>
  )
}

function Step2({ compact }: { compact: boolean }) {
  const calls = [
    { args: '[1, 2, 3]', tVal: 'number', result: '1', color: ORANGE },
    { args: '["a", "b"]', tVal: 'string', result: '"a"', color: GREEN },
    { args: '[true, false]', tVal: 'boolean', result: 'true', color: '#f472b6' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 4 : 8 }}>
      {calls.map((c, i) => (
        <motion.div
          key={c.tVal}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.18, duration: 0.35 }}
          style={codeBlock(compact)}
        >
          <span style={{ color: '#60a5fa' }}>first</span>
          <span style={{ color: '#e2e8f0' }}>({c.args})</span>
          <span style={{ color: '#94a3b8' }}>  {'//  T'}</span>
          <span style={{ color: '#94a3b8' }}> = </span>
          <span style={{ color: c.color }}>{c.tVal}</span>
          <span style={{ color: '#94a3b8' }}>,  → </span>
          <span style={{ color: c.color }}>{c.result}</span>
        </motion.div>
      ))}
    </div>
  )
}

function Step3({ compact }: { compact: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>
      <div style={{ ...codeBlock(compact), border: `1.5px solid ${BLUE}55` }}>
        <div>
          <span style={{ color: BLUE, fontWeight: 700 }}>interface </span>
          <span style={{ color: GREEN }}>Box</span>
          <span style={T_STYLE}>{'<T>'}</span>
          <span style={{ color: '#e2e8f0' }}> {'{'}</span>
        </div>
        <div style={{ paddingLeft: compact ? 12 : 16 }}>
          <div><span style={{ color: '#e2e8f0' }}>value</span><span style={{ color: '#94a3b8' }}>: </span><span style={T_STYLE}>T</span></div>
          <div><span style={{ color: '#e2e8f0' }}>label</span><span style={{ color: '#94a3b8' }}>: </span><span style={{ color: BLUE }}>string</span></div>
        </div>
        <div style={{ color: '#e2e8f0' }}>{'}'}</div>
      </div>
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }} style={codeBlock(compact)}>
        <div>
          <span style={{ color: PURPLE }}>const </span>
          <span style={{ color: '#e2e8f0' }}>n</span>
          <span style={{ color: '#94a3b8' }}>: </span>
          <span style={{ color: GREEN }}>Box</span>
          <span style={{ color: '#94a3b8' }}>{'<'}</span>
          <span style={{ color: ORANGE }}>number</span>
          <span style={{ color: '#94a3b8' }}>{'>'}</span>
          <span style={{ color: '#94a3b8' }}> = {'{ '}</span>
          <span style={{ color: '#e2e8f0' }}>value</span>
          <span style={{ color: '#94a3b8' }}>: </span>
          <span style={{ color: ORANGE }}>42</span>
          <span style={{ color: '#94a3b8' }}>, label: </span>
          <span style={{ color: GREEN }}>"age"</span>
          <span style={{ color: '#94a3b8' }}>{' }'}</span>
        </div>
      </motion.div>
    </div>
  )
}

function Step4({ compact }: { compact: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>
      <div style={{ ...codeBlock(compact), border: `1.5px solid ${GREEN}44` }}>
        <div>
          <span style={{ color: PURPLE }}>function </span>
          <span style={{ color: '#60a5fa' }}>getLength</span>
          <span style={{ color: '#94a3b8' }}>{'<'}</span>
          <span style={T_STYLE}>T</span>
          <span style={{ color: PURPLE }}> extends </span>
          <span style={{ color: '#e2e8f0' }}>{'{ length: '}</span>
          <span style={{ color: BLUE }}>number</span>
          <span style={{ color: '#e2e8f0' }}>{' }'}</span>
          <span style={{ color: '#94a3b8' }}>{'>'}</span>
        </div>
        <div style={{ paddingLeft: compact ? 12 : 16 }}>
          <span style={{ color: '#e2e8f0' }}>(val</span>
          <span style={{ color: '#94a3b8' }}>: </span>
          <span style={T_STYLE}>T</span>
          <span style={{ color: '#e2e8f0' }}>)</span>
          <span style={{ color: '#94a3b8' }}>: </span>
          <span style={{ color: BLUE }}>number</span>
        </div>
        <div style={{ paddingLeft: compact ? 12 : 16 }}>
          <span style={{ color: PURPLE }}>return</span>
          <span style={{ color: '#e2e8f0' }}> val</span>
          <span style={{ color: '#94a3b8' }}>.length</span>
        </div>
      </div>
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }} style={codeBlock(compact)}>
        <div>
          <span style={{ color: '#60a5fa' }}>getLength</span>
          <span style={{ color: '#e2e8f0' }}>("hello")</span>
          <span style={{ color: '#94a3b8' }}>   // </span>
          <span style={{ color: ORANGE }}>5</span>
        </div>
        <div>
          <span style={{ color: '#60a5fa' }}>getLength</span>
          <span style={{ color: '#e2e8f0' }}>([1,2,3])</span>
          <span style={{ color: '#94a3b8' }}>   // </span>
          <span style={{ color: ORANGE }}>3</span>
        </div>
      </motion.div>
    </div>
  )
}

export default function GenericsViz({ step, compact = false }: Props) {
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
            background: `${PURPLE}22`,
            border: `1px solid ${PURPLE}55`,
            borderRadius: 20,
            padding: compact ? '3px 10px' : '4px 14px',
            fontSize: compact ? 10 : 11,
            fontFamily: 'var(--font-mono)',
            color: PURPLE,
            fontWeight: 600,
            letterSpacing: '0.2px',
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
