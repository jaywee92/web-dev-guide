import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const BLUE = '#5b9cf5'
const GREEN = '#4ade80'
const PURPLE = '#a78bfa'
const ORANGE = '#fb923c'

const stepLabels = [
  'Client-side routing — no page reload',
  'BrowserRouter wraps your app',
  'Routes and Route components',
  'Link — navigate without reload',
  'useParams — dynamic URL segments',
]

function AddressBar({ url, compact }: { url: string; compact: boolean }) {
  return (
    <motion.div
      layout
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        background: 'var(--surface-bright)',
        border: `1px solid var(--border)`,
        borderRadius: 8,
        padding: compact ? '5px 10px' : '7px 14px',
        fontFamily: 'var(--font-mono)',
        fontSize: compact ? 11 : 13,
        width: compact ? 220 : 300,
      }}
    >
      <span style={{ color: '#64748b', fontSize: compact ? 9 : 11 }}>🌐</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={url}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.25 }}
          style={{ color: '#e2e8f0' }}
        >
          {url}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  )
}

function Step0({ compact }: { compact: boolean }) {
  const pages = ['/home', '/about', '/users/42']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 8 : 12, alignItems: 'center' }}>
      <div style={{ color: '#64748b', fontSize: compact ? 11 : 12, fontFamily: 'var(--font-mono)' }}>No full reload between pages</div>
      {pages.map((url, i) => (
        <motion.div
          key={url}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.18, duration: 0.35 }}
          style={{ display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <AddressBar url={`myapp.com${url}`} compact={compact} />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.18 + 0.25, type: 'spring' }}
            style={{
              width: compact ? 8 : 10,
              height: compact ? 8 : 10,
              borderRadius: '50%',
              background: GREEN,
              boxShadow: `0 0 8px ${GREEN}`,
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}

function Step1({ compact }: { compact: boolean }) {
  return (
    <div style={{
      fontFamily: 'var(--font-mono)',
      fontSize: compact ? 11 : 13,
      background: 'var(--surface-bright)',
      borderRadius: 8,
      padding: compact ? '10px 14px' : '14px 20px',
      lineHeight: 1.8,
      border: `1.5px solid ${BLUE}44`,
    }}>
      <div style={{ color: '#94a3b8', fontSize: compact ? 9 : 10, marginBottom: 4 }}>index.tsx</div>
      <div>
        <span style={{ color: PURPLE }}>import </span>
        <span style={{ color: '#e2e8f0' }}>{'{ '}</span>
        <span style={{ color: BLUE }}>BrowserRouter</span>
        <span style={{ color: '#e2e8f0' }}>{' }'}</span>
        <span style={{ color: PURPLE }}> from </span>
        <span style={{ color: GREEN }}>'react-router-dom'</span>
      </div>
      <div style={{ marginTop: 4 }}>
        <span style={{ color: '#94a3b8' }}>{'<'}</span>
        <motion.span
          animate={{ color: [BLUE, '#60a5fa', BLUE] }}
          transition={{ duration: 2, repeat: Infinity }}
        >BrowserRouter</motion.span>
        <span style={{ color: '#94a3b8' }}>{'>'}</span>
      </div>
      <div style={{ paddingLeft: compact ? 12 : 18 }}>
        <span style={{ color: '#94a3b8' }}>{'<'}</span>
        <span style={{ color: ORANGE }}>App</span>
        <span style={{ color: '#94a3b8' }}>{' />'}</span>
      </div>
      <div>
        <span style={{ color: '#94a3b8' }}>{'</'}</span>
        <span style={{ color: BLUE }}>BrowserRouter</span>
        <span style={{ color: '#94a3b8' }}>{'>'}</span>
      </div>
    </div>
  )
}

function Step2({ compact }: { compact: boolean }) {
  const routes = [
    { path: '"/"', comp: 'Home', color: GREEN },
    { path: '"/about"', comp: 'About', color: BLUE },
    { path: '"/users"', comp: 'Users', color: PURPLE },
  ]

  return (
    <div style={{
      fontFamily: 'var(--font-mono)',
      fontSize: compact ? 11 : 13,
      background: 'var(--surface-bright)',
      borderRadius: 8,
      padding: compact ? '10px 14px' : '14px 20px',
      lineHeight: 1.8,
      border: `1.5px solid ${PURPLE}44`,
    }}>
      <div>
        <span style={{ color: '#94a3b8' }}>{'<'}</span>
        <span style={{ color: BLUE }}>Routes</span>
        <span style={{ color: '#94a3b8' }}>{'>'}</span>
      </div>
      {routes.map((r, i) => (
        <motion.div
          key={r.path}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15, duration: 0.35 }}
          style={{ paddingLeft: compact ? 12 : 18 }}
        >
          <span style={{ color: '#94a3b8' }}>{'<'}</span>
          <span style={{ color: GREEN }}>Route</span>
          <span style={{ color: ORANGE }}> path</span>
          <span style={{ color: '#94a3b8' }}>=</span>
          <span style={{ color: '#4ade80' }}>{r.path}</span>
          <span style={{ color: ORANGE }}> element</span>
          <span style={{ color: '#94a3b8' }}>={'<'}</span>
          <span style={{ color: r.color }}>{r.comp}</span>
          <span style={{ color: '#94a3b8' }}>{'/>}'}</span>
          <span style={{ color: '#94a3b8' }}>{' />'}</span>
        </motion.div>
      ))}
      <div>
        <span style={{ color: '#94a3b8' }}>{'</'}</span>
        <span style={{ color: BLUE }}>Routes</span>
        <span style={{ color: '#94a3b8' }}>{'>'}</span>
      </div>
    </div>
  )
}

function Step3({ compact }: { compact: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: compact ? 11 : 13,
        background: 'var(--surface-bright)',
        borderRadius: 8,
        padding: compact ? '8px 12px' : '12px 18px',
        lineHeight: 1.8,
        border: `1.5px solid ${GREEN}44`,
      }}>
        <div style={{ color: '#94a3b8', fontSize: compact ? 9 : 10, marginBottom: 2 }}>// Instead of &lt;a href&gt; — no reload!</div>
        <div>
          <span style={{ color: '#94a3b8' }}>{'<'}</span>
          <span style={{ color: GREEN }}>Link</span>
          <span style={{ color: ORANGE }}> to</span>
          <span style={{ color: '#94a3b8' }}>=</span>
          <span style={{ color: '#4ade80' }}>"/about"</span>
          <span style={{ color: '#94a3b8' }}>{'>'}</span>
          <span style={{ color: '#e2e8f0' }}>About</span>
          <span style={{ color: '#94a3b8' }}>{'</'}  </span>
          <span style={{ color: GREEN }}>Link</span>
          <span style={{ color: '#94a3b8' }}>{'>'}</span>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        style={{ display: 'flex', alignItems: 'center', gap: 10 }}
      >
        <div style={{
          padding: compact ? '4px 10px' : '6px 14px',
          background: `${GREEN}22`,
          border: `1px solid ${GREEN}55`,
          borderRadius: 6,
          color: GREEN,
          fontFamily: 'var(--font-mono)',
          fontSize: compact ? 11 : 12,
          cursor: 'pointer',
        }}>About</div>
        <motion.span
          animate={{ x: [0, 6, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          style={{ color: '#64748b', fontSize: compact ? 14 : 16 }}
        >→</motion.span>
        <AddressBar url="myapp.com/about" compact={compact} />
      </motion.div>
    </div>
  )
}

function Step4({ compact }: { compact: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: compact ? 11 : 13,
        background: 'var(--surface-bright)',
        borderRadius: 8,
        padding: compact ? '8px 12px' : '12px 18px',
        lineHeight: 1.8,
        border: `1.5px solid ${ORANGE}44`,
      }}>
        <div style={{ color: '#94a3b8', fontSize: compact ? 9 : 10, marginBottom: 2 }}>Route definition</div>
        <div>
          <span style={{ color: '#94a3b8' }}>{'<'}</span>
          <span style={{ color: GREEN }}>Route</span>
          <span style={{ color: ORANGE }}> path</span>
          <span style={{ color: '#94a3b8' }}>=</span>
          <span style={{ color: '#4ade80' }}>"/users/</span>
          <motion.span
            animate={{ color: [ORANGE, '#fbbf24', ORANGE] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ fontWeight: 700 }}
          >:id</motion.span>
          <span style={{ color: '#4ade80' }}>"</span>
          <span style={{ color: '#94a3b8' }}>{' ...'}</span>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: compact ? 11 : 13,
          background: 'var(--surface-bright)',
          borderRadius: 8,
          padding: compact ? '8px 12px' : '12px 18px',
          lineHeight: 1.8,
          border: `1.5px solid ${BLUE}44`,
        }}
      >
        <div style={{ color: '#94a3b8', fontSize: compact ? 9 : 10, marginBottom: 2 }}>UserProfile.tsx</div>
        <div>
          <span style={{ color: PURPLE }}>const </span>
          <span style={{ color: '#e2e8f0' }}>{'{ '}</span>
          <span style={{ color: ORANGE }}>id</span>
          <span style={{ color: '#e2e8f0' }}>{' } = '}</span>
          <span style={{ color: '#60a5fa' }}>useParams</span>
          <span style={{ color: '#e2e8f0' }}>()</span>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <span style={{ color: '#94a3b8' }}>{'// '}</span>
          <span style={{ color: '#94a3b8' }}>at </span>
          <span style={{ color: '#4ade80' }}>/users/42</span>
          <span style={{ color: '#94a3b8' }}>  → id = </span>
          <span style={{ color: ORANGE }}>"42"</span>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function RouterViz({ step, compact = false }: Props) {
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
