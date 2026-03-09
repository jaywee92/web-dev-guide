import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const BLUE = '#5b9cf5'
const GREEN = '#4ade80'
const PURPLE = '#a78bfa'
const ORANGE = '#fb923c'

const stepLabels = [
  'Interfaces describe object shapes',
  'Optional and readonly properties',
  'Extending interfaces',
  'Implementing interfaces in classes',
  'Index signatures for dynamic keys',
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
  border: `1.5px solid ${BLUE}44`,
})

function Step0({ compact }: { compact: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: compact ? 'column' : 'row', gap: compact ? 8 : 16, alignItems: 'flex-start' }}>
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} style={codeBlock(compact)}>
        <div><span style={{ color: BLUE, fontWeight: 700 }}>interface </span><span style={{ color: GREEN }}>Point</span><span style={{ color: '#e2e8f0' }}> {'{'}</span></div>
        <div style={{ paddingLeft: compact ? 12 : 16 }}>
          <div><span style={{ color: '#e2e8f0' }}>x</span><span style={{ color: '#94a3b8' }}>: </span><span style={{ color: BLUE }}>number</span></div>
          <div><span style={{ color: '#e2e8f0' }}>y</span><span style={{ color: '#94a3b8' }}>: </span><span style={{ color: BLUE }}>number</span></div>
        </div>
        <div style={{ color: '#e2e8f0' }}>{'}'}</div>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.4 }} style={codeBlock(compact)}>
        <div><span style={{ color: PURPLE }}>const </span><span style={{ color: '#e2e8f0' }}>p</span><span style={{ color: '#94a3b8' }}>: </span><span style={{ color: GREEN }}>Point</span><span style={{ color: '#94a3b8' }}> = {'{'}</span></div>
        <div style={{ paddingLeft: compact ? 12 : 16 }}>
          <div><span style={{ color: '#e2e8f0' }}>x</span><span style={{ color: '#94a3b8' }}>: </span><span style={{ color: ORANGE }}>3</span><span style={{ color: '#94a3b8' }}>,</span></div>
          <div><span style={{ color: '#e2e8f0' }}>y</span><span style={{ color: '#94a3b8' }}>: </span><span style={{ color: ORANGE }}>7</span></div>
        </div>
        <div style={{ color: '#94a3b8' }}>{'}'}</div>
      </motion.div>
    </div>
  )
}

function Step1({ compact }: { compact: boolean }) {
  return (
    <div style={codeBlock(compact)}>
      <div><span style={{ color: BLUE, fontWeight: 700 }}>interface </span><span style={{ color: GREEN }}>Config</span><span style={{ color: '#e2e8f0' }}> {'{'}</span></div>
      <div style={{ paddingLeft: compact ? 12 : 16 }}>
        <div><span style={{ color: '#e2e8f0' }}>host</span><span style={{ color: '#94a3b8' }}>: </span><span style={{ color: BLUE }}>string</span></div>
        <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.35 }}>
          <span style={{ color: '#e2e8f0' }}>port</span>
          <motion.span animate={{ color: [ORANGE, '#e2e8f0', ORANGE] }} transition={{ duration: 2, repeat: Infinity }}>?</motion.span>
          <span style={{ color: '#94a3b8' }}>: </span><span style={{ color: BLUE }}>number</span>
          <span style={{ color: '#94a3b8', fontSize: compact ? 9 : 10, marginLeft: 6 }}>// optional</span>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.35 }}>
          <span style={{ color: PURPLE }}>readonly </span><span style={{ color: '#e2e8f0' }}>id</span><span style={{ color: '#94a3b8' }}>: </span><span style={{ color: BLUE }}>string</span>
          <span style={{ color: '#94a3b8', fontSize: compact ? 9 : 10, marginLeft: 6 }}>// immutable</span>
        </motion.div>
      </div>
      <div style={{ color: '#e2e8f0' }}>{'}'}</div>
    </div>
  )
}

function Step2({ compact }: { compact: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10, alignItems: 'flex-start' }}>
      <div style={codeBlock(compact)}>
        <div><span style={{ color: BLUE, fontWeight: 700 }}>interface </span><span style={{ color: GREEN }}>Animal</span><span style={{ color: '#e2e8f0' }}> {'{'}</span></div>
        <div style={{ paddingLeft: compact ? 12 : 16 }}>
          <div><span style={{ color: '#e2e8f0' }}>name</span><span style={{ color: '#94a3b8' }}>: </span><span style={{ color: BLUE }}>string</span></div>
        </div>
        <div style={{ color: '#e2e8f0' }}>{'}'}</div>
      </div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.4 }} style={{ ...codeBlock(compact), border: `1.5px solid ${GREEN}66` }}>
        <div>
          <span style={{ color: BLUE, fontWeight: 700 }}>interface </span>
          <span style={{ color: GREEN }}>Dog</span>
          <span style={{ color: PURPLE }}> extends </span>
          <span style={{ color: GREEN }}>Animal</span>
          <span style={{ color: '#e2e8f0' }}> {'{'}</span>
        </div>
        <div style={{ paddingLeft: compact ? 12 : 16 }}>
          <div><span style={{ color: '#e2e8f0' }}>breed</span><span style={{ color: '#94a3b8' }}>: </span><span style={{ color: BLUE }}>string</span></div>
        </div>
        <div style={{ color: '#e2e8f0' }}>{'}'}</div>
        <div style={{ marginTop: 4 }}>
          <span style={{ color: '#94a3b8', fontSize: compact ? 9 : 10 }}>// has name + breed</span>
        </div>
      </motion.div>
    </div>
  )
}

function Step3({ compact }: { compact: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10, alignItems: 'flex-start' }}>
      <div style={codeBlock(compact)}>
        <div><span style={{ color: BLUE, fontWeight: 700 }}>interface </span><span style={{ color: GREEN }}>Greetable</span><span style={{ color: '#e2e8f0' }}> {'{'}</span></div>
        <div style={{ paddingLeft: compact ? 12 : 16 }}>
          <div><span style={{ color: '#60a5fa' }}>greet</span><span style={{ color: '#e2e8f0' }}>()</span><span style={{ color: '#94a3b8' }}>: </span><span style={{ color: BLUE }}>string</span></div>
        </div>
        <div style={{ color: '#e2e8f0' }}>{'}'}</div>
      </div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.4 }} style={{ ...codeBlock(compact), border: `1.5px solid ${PURPLE}55` }}>
        <div>
          <span style={{ color: PURPLE }}>class </span>
          <span style={{ color: ORANGE }}>Person</span>
          <span style={{ color: PURPLE }}> implements </span>
          <span style={{ color: GREEN }}>Greetable</span>
          <span style={{ color: '#e2e8f0' }}> {'{'}</span>
        </div>
        <div style={{ paddingLeft: compact ? 12 : 16 }}>
          <div>
            <span style={{ color: '#60a5fa' }}>greet</span>
            <span style={{ color: '#e2e8f0' }}>()</span>
            <span style={{ color: '#94a3b8' }}>: </span>
            <span style={{ color: BLUE }}>string</span>
            <span style={{ color: '#e2e8f0' }}> {'{'}</span>
          </div>
          <div style={{ paddingLeft: compact ? 12 : 16 }}>
            <span style={{ color: PURPLE }}>return </span><span style={{ color: '#4ade80' }}>"hello"</span>
          </div>
          <div style={{ color: '#e2e8f0' }}>{'}'}</div>
        </div>
        <div style={{ color: '#e2e8f0' }}>{'}'}</div>
      </motion.div>
    </div>
  )
}

function Step4({ compact }: { compact: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10, alignItems: 'flex-start' }}>
      <div style={codeBlock(compact)}>
        <div><span style={{ color: BLUE, fontWeight: 700 }}>interface </span><span style={{ color: GREEN }}>Dict</span><span style={{ color: '#e2e8f0' }}> {'{'}</span></div>
        <motion.div
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.35 }}
          style={{ paddingLeft: compact ? 12 : 16 }}
        >
          <span style={{ color: '#94a3b8' }}>[</span>
          <span style={{ color: '#e2e8f0' }}>key</span>
          <span style={{ color: '#94a3b8' }}>: </span>
          <span style={{ color: BLUE }}>string</span>
          <span style={{ color: '#94a3b8' }}>]</span>
          <span style={{ color: '#94a3b8' }}>: </span>
          <span style={{ color: BLUE }}>number</span>
        </motion.div>
        <div style={{ color: '#e2e8f0' }}>{'}'}</div>
      </div>
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.4 }} style={codeBlock(compact)}>
        <div><span style={{ color: PURPLE }}>const </span><span style={{ color: '#e2e8f0' }}>scores</span><span style={{ color: '#94a3b8' }}>: </span><span style={{ color: GREEN }}>Dict</span><span style={{ color: '#94a3b8' }}> = {'{'}</span></div>
        <div style={{ paddingLeft: compact ? 12 : 16 }}>
          <div><span style={{ color: '#4ade80' }}>"alice"</span><span style={{ color: '#94a3b8' }}>: </span><span style={{ color: ORANGE }}>95</span><span style={{ color: '#94a3b8' }}>,</span></div>
          <div><span style={{ color: '#4ade80' }}>"bob"</span><span style={{ color: '#94a3b8' }}>: </span><span style={{ color: ORANGE }}>82</span></div>
        </div>
        <div style={{ color: '#94a3b8' }}>{'}'}</div>
      </motion.div>
    </div>
  )
}

export default function InterfacesViz({ step, compact = false }: Props) {
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
