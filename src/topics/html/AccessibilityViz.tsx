import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const steps = [
  {
    label: 'No alt text',
    good: false,
    code: '<img src="chart.png">',
    desc: 'Screen reader reads nothing useful',
    screenReader: '🔊 "image"',
  },
  {
    label: 'Alt text',
    good: true,
    code: '<img src="chart.png" alt="Q3 revenue chart">',
    desc: 'Screen reader announces the content',
    screenReader: '🔊 "Q3 revenue chart, image"',
  },
  {
    label: 'Form label',
    good: true,
    code: '<label for="email">Email</label>\n<input id="email" type="email">',
    desc: 'Label associates with input',
    screenReader: '🔊 "Email, edit text"',
  },
  {
    label: 'ARIA role',
    good: true,
    code: '<button aria-label="Close dialog">\n  ✕\n</button>',
    desc: 'Semantic meaning for custom elements',
    screenReader: '🔊 "Close dialog, button"',
  },
  {
    label: 'Focus order',
    good: true,
    code: '<a href="/home">Home</a>\n<a href="/about">About</a>',
    desc: 'Logical tab order through content',
    screenReader: '🔊 Tab → "Home, link" → "About, link"',
  },
]

export default function AccessibilityViz({ step, compact = false }: Props) {
  const s = steps[Math.min(step, steps.length - 1)]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          style={{ width: '100%', maxWidth: compact ? 220 : 320 }}
        >
          {/* Good/bad indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.3 }}
              style={{ fontSize: 14 }}
            >
              {s.good ? '✅' : '❌'}
            </motion.span>
            <span style={{ fontSize: compact ? 11 : 12, fontWeight: 600, color: s.good ? '#4ade80' : '#f87171' }}>
              {s.label}
            </span>
          </div>

          {/* Code snippet */}
          <div style={{
            background: 'var(--surface)',
            border: `1px solid ${s.good ? '#4ade8033' : '#f8717133'}`,
            borderRadius: 6, padding: compact ? '6px 8px' : '8px 12px',
            marginBottom: 8,
          }}>
            <code style={{ fontSize: compact ? 9 : 10, color: s.good ? '#4ade80' : '#f87171', fontFamily: 'var(--font-mono)', whiteSpace: 'pre' }}>
              {s.code}
            </code>
          </div>

          {/* Screen reader simulation */}
          <div style={{
            fontSize: compact ? 10 : 11, color: 'var(--text-muted)', marginBottom: 4,
            fontFamily: 'var(--font-mono)',
          }}>
            {s.screenReader}
          </div>

          <div style={{ fontSize: compact ? 10 : 11, color: 'var(--text-faint)' }}>
            {s.desc}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
