import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const BLUE = '#5b9cf5'
const stepLabels = [
  'HTML — static markup',
  'JSX — HTML-like syntax in JavaScript',
  'A component is just a function',
  'Components compose into a tree',
  'Props flow down — one direction',
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
      minWidth: 220,
    }}>
      {children}
    </div>
  )
}

function TreeNode({ label, color, children }: { label: string; color: string; children?: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div style={{
        padding: '4px 12px',
        border: `2px solid ${color}`,
        borderRadius: 6,
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        color,
        background: `${color}18`,
        fontWeight: 700,
      }}>
        {label}
      </div>
      {children && (
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', position: 'relative' }}>
          <div style={{
            position: 'absolute', top: -4, left: '50%', transform: 'translateX(-50%)',
            width: 1, height: 8, background: `${color}66`,
          }} />
          {children}
        </div>
      )}
    </div>
  )
}

export default function ComponentsViz({ step, compact = false }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>

      {/* Step 0 — plain HTML */}
      {step === 0 && (
        <AnimatePresence mode="wait">
          <motion.div
            key="step0"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <CodeBlock>
              <CodeLine>{'<button class="btn">Click me</button>'}</CodeLine>
            </CodeBlock>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Step 1 — JSX */}
      {step === 1 && (
        <AnimatePresence mode="wait">
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <CodeBlock>
              <CodeLine highlight>{'<Button>Click me</Button>'}</CodeLine>
            </CodeBlock>
            <div style={{
              marginTop: 8,
              textAlign: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: BLUE,
            }}>
              Capitalized tag = React component
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Step 2 — component function */}
      {step === 2 && (
        <AnimatePresence mode="wait">
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <CodeBlock>
              <CodeLine>{'function Button({ children }) {'}</CodeLine>
              <CodeLine>{'  return ('}</CodeLine>
              <CodeLine>{'    <button>'}</CodeLine>
              <CodeLine highlight>{'      {children}'}</CodeLine>
              <CodeLine>{'    </button>'}</CodeLine>
              <CodeLine>{'  )'}</CodeLine>
              <CodeLine>{'}'}</CodeLine>
            </CodeBlock>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Step 3 — composition tree */}
      {step === 3 && (
        <AnimatePresence mode="wait">
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
          >
            <TreeNode label="<Card>" color="#a78bfa">
              <TreeNode label="<Button>" color={BLUE}>
                <TreeNode label="<Icon>" color="#4ade80" />
              </TreeNode>
            </TreeNode>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Step 4 — props flow */}
      {step === 4 && (
        <AnimatePresence mode="wait">
          <motion.div
            key="step4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}
          >
            <div style={{
              padding: '6px 16px',
              border: `2px solid #a78bfa`,
              borderRadius: 6,
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: '#a78bfa',
              background: 'rgba(167,139,250,0.1)',
              fontWeight: 700,
            }}>
              Parent
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              {['color="blue"', 'onClick={handler}'].map((prop, i) => (
                <motion.div
                  key={prop}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    color: '#f5c542',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <span style={{ color: '#4ade80' }}>↓</span> {prop}
                </motion.div>
              ))}
            </div>
            <div style={{
              padding: '6px 16px',
              border: `2px solid ${BLUE}`,
              borderRadius: 6,
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: BLUE,
              background: `rgba(91,156,245,0.1)`,
              fontWeight: 700,
            }}>
              {'<Button>'}
            </div>
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
