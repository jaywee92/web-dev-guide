import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const stepLabels = [
  'JavaScript is single-threaded',
  'Synchronous code runs first',
  'Async callbacks go to Web APIs → Queue',
  'Stack must be empty first',
  'Event Loop: Queue → Stack when stack is empty',
]

const labelColors = ['#a78bfa', '#a78bfa', '#5b9cf5', '#a78bfa', '#4ade80']

// Items visible on the call stack at each step
const callStackItems: Record<number, string[]> = {
  0: [],
  1: ["console.log('start')"],
  2: ["setTimeout(cb, 0)"],
  3: ["console.log('end')"],
  4: ['callback()'],
}

// Items visible in web APIs box at each step
const webApiItems: Record<number, string[]> = {
  0: [],
  1: [],
  2: ['setTimeout(cb, 0)'],
  3: [],
  4: [],
}

// Items visible in the task queue at each step
const taskQueueItems: Record<number, string[]> = {
  0: [],
  1: [],
  2: [],
  3: ['callback'],
  4: [],
}

// Whether the event loop arrow should pulse
const eventLoopActive: Record<number, boolean> = {
  0: false,
  1: false,
  2: false,
  3: false,
  4: true,
}

function Column({
  label,
  color,
  items,
  compact,
}: {
  label: string
  color: string
  items: string[]
  compact: boolean
}) {
  const width = compact ? 110 : 140
  const minHeight = compact ? 80 : 100

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <span style={{
        fontSize: compact ? 10 : 11,
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        color,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      }}>
        {label}
      </span>
      <div style={{
        width,
        minHeight,
        border: `2px solid ${color}44`,
        borderRadius: 8,
        background: `${color}0d`,
        display: 'flex',
        flexDirection: 'column-reverse',
        alignItems: 'stretch',
        padding: 6,
        gap: 4,
        boxSizing: 'border-box',
      }}>
        <AnimatePresence>
          {items.map((item, i) => (
            <motion.div
              key={item + i}
              initial={{ opacity: 0, y: 16, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              style={{
                background: color,
                borderRadius: 5,
                padding: compact ? '3px 6px' : '5px 8px',
                fontSize: compact ? 9 : 10,
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                color: '#0f0f1a',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {item}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

function EventLoopArrow({ active, compact }: { active: boolean; compact: boolean }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
      padding: compact ? '0 4px' : '0 8px',
    }}>
      <motion.div
        animate={active ? { rotate: 360 } : { rotate: 0 }}
        transition={active ? { repeat: Infinity, duration: 1.2, ease: 'linear' } : { duration: 0 }}
        style={{
          fontSize: compact ? 18 : 22,
          color: active ? '#4ade80' : '#4b5563',
          lineHeight: 1,
        }}
      >
        ↻
      </motion.div>
      <span style={{
        fontSize: compact ? 8 : 9,
        fontFamily: 'var(--font-mono)',
        color: active ? '#4ade80' : '#4b5563',
        textTransform: 'uppercase',
        letterSpacing: '0.4px',
      }}>
        event loop
      </span>
    </div>
  )
}

function WebApisBox({ items, compact }: { items: string[]; compact: boolean }) {
  const color = '#5b9cf5'
  const width = compact ? 110 : 140

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <span style={{
        fontSize: compact ? 10 : 11,
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        color,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      }}>
        Web APIs
      </span>
      <div style={{
        width,
        minHeight: compact ? 48 : 60,
        border: `2px dashed ${color}44`,
        borderRadius: 8,
        background: `${color}0d`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: 6,
        gap: 4,
        boxSizing: 'border-box',
      }}>
        <AnimatePresence>
          {items.map((item, i) => (
            <motion.div
              key={item + i}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              style={{
                background: color,
                borderRadius: 5,
                padding: compact ? '3px 6px' : '4px 8px',
                fontSize: compact ? 9 : 10,
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                color: '#0f0f1a',
                textAlign: 'center',
              }}
            >
              {item}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

// Arrow pointing upward from Web APIs to Task Queue
function UpArrow({ visible, compact }: { visible: boolean; compact: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="up-arrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            fontSize: compact ? 14 : 16,
            color: '#5b9cf5',
            textAlign: 'center',
            lineHeight: 1,
          }}
        >
          ↑
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function EventLoopViz({ step, compact = false }: Props) {
  const stackItems = callStackItems[step] ?? []
  const webItems = webApiItems[step] ?? []
  const queueItems = taskQueueItems[step] ?? []
  const loopActive = eventLoopActive[step] ?? false
  const labelColor = labelColors[Math.min(step, labelColors.length - 1)]

  // Show up-arrow from Web APIs → Task Queue on step 2
  const showUpArrow = step === 2

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 16 }}>
      {/* Label badge */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          style={{
            background: `${labelColor}22`,
            border: `1px solid ${labelColor}55`,
            borderRadius: 6,
            padding: compact ? '4px 10px' : '5px 14px',
            fontSize: compact ? 10 : 11,
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            color: labelColor,
            letterSpacing: '0.3px',
          }}
        >
          {stepLabels[Math.min(step, stepLabels.length - 1)]}
        </motion.div>
      </AnimatePresence>

      {/* Main row: Call Stack | Event Loop | Task Queue */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: compact ? 8 : 12 }}>
        <Column label="Call Stack" color="#a78bfa" items={stackItems} compact={compact} />
        <EventLoopArrow active={loopActive} compact={compact} />
        {/* Right side: Task Queue above, Web APIs below */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <Column label="Task Queue" color="#5b9cf5" items={queueItems} compact={compact} />
          <UpArrow visible={showUpArrow} compact={compact} />
          <WebApisBox items={webItems} compact={compact} />
        </div>
      </div>
    </div>
  )
}
