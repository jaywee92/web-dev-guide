import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const PURPLE = '#a78bfa'
const BLUE = '#5b9cf5'
const GREEN = '#4ade80'
const YELLOW = '#f5c542'

const stepLabels = [
  'JavaScript runs on a single thread',
  'Synchronous code executes on the Call Stack',
  'setTimeout moves its callback to Web APIs — timer starts',
  'When timer fires, callback enters the Task Queue',
  "Event Loop moves callback to Call Stack when it's empty",
]

const callStackItems: Record<number, string[]> = {
  0: [], 1: ["console.log('start')", 'main()'], 2: ['main()'], 3: ["console.log('end')", 'main()'], 4: ['callback()', 'main()'],
}
const webApiItems: Record<number, { label: string; timer: string } | null> = {
  0: null, 1: null, 2: { label: 'setTimeout', timer: '100ms' }, 3: null, 4: null,
}
const taskQueueItems: Record<number, string[]> = {
  0: [], 1: [], 2: [], 3: ['callback'], 4: [],
}
const activeZone: Record<number, 'stack' | 'webapi' | 'queue' | 'loop' | null> = {
  0: null, 1: 'stack', 2: 'webapi', 3: 'queue', 4: 'loop',
}

function StackColumn({ items, active, compact }: { items: string[]; active: boolean; compact: boolean }) {
  const w = compact ? 100 : 130
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <span style={{ fontSize: compact ? 9 : 10, fontFamily: 'var(--font-mono)', fontWeight: 700, color: PURPLE, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
        Call Stack
      </span>
      <motion.div
        animate={{ boxShadow: active ? `0 0 16px ${PURPLE}66` : '0 0 0px transparent' }}
        transition={{ duration: 0.4 }}
        style={{
          width: w,
          minHeight: compact ? 80 : 100,
          border: `2px solid ${PURPLE}${active ? 'cc' : '44'}`,
          borderRadius: 8,
          background: `${PURPLE}${active ? '18' : '0d'}`,
          display: 'flex',
          flexDirection: 'column-reverse',
          padding: 5,
          gap: 3,
          boxSizing: 'border-box',
          transition: 'border-color 0.3s, background 0.3s',
        }}
      >
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 16, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.88 }}
              transition={{ type: 'spring', stiffness: 320, damping: 24 }}
              style={{
                background: PURPLE,
                borderRadius: 4,
                padding: compact ? '2px 5px' : '4px 8px',
                fontSize: compact ? 8 : 9,
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
      </motion.div>
    </div>
  )
}

function WebApiZone({ item, active, compact }: { item: { label: string; timer: string } | null; active: boolean; compact: boolean }) {
  const w = compact ? 90 : 110
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <span style={{ fontSize: compact ? 9 : 10, fontFamily: 'var(--font-mono)', fontWeight: 700, color: BLUE, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
        Web APIs
      </span>
      <motion.div
        animate={{ boxShadow: active ? `0 0 16px ${BLUE}66` : '0 0 0px transparent' }}
        transition={{ duration: 0.4 }}
        style={{
          width: w,
          minHeight: compact ? 50 : 64,
          border: `2px dashed ${BLUE}${active ? 'cc' : '44'}`,
          borderRadius: 8,
          background: `${BLUE}${active ? '18' : '0d'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 6,
          boxSizing: 'border-box',
          transition: 'border-color 0.3s, background 0.3s',
        }}
      >
        <AnimatePresence>
          {item && (
            <motion.div
              key="webapi-item"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1, boxShadow: [`0 0 0px ${BLUE}00`, `0 0 14px ${BLUE}aa`, `0 0 0px ${BLUE}00`] }}
              exit={{ opacity: 0, scale: 0.7, y: 12 }}
              transition={{ duration: 0.4, boxShadow: { repeat: Infinity, duration: 1.2 } }}
              style={{
                background: `${BLUE}22`,
                border: `1.5px solid ${BLUE}`,
                borderRadius: 6,
                padding: compact ? '4px 6px' : '6px 10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <span style={{ fontSize: compact ? 8 : 9, fontFamily: 'var(--font-mono)', fontWeight: 700, color: BLUE }}>{item.label}</span>
              <motion.span
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                style={{ fontSize: compact ? 7 : 8, fontFamily: 'var(--font-mono)', color: YELLOW }}
              >
                ⏱ {item.timer}
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

function QueueColumn({ items, active, compact }: { items: string[]; active: boolean; compact: boolean }) {
  const w = compact ? 90 : 110
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <span style={{ fontSize: compact ? 9 : 10, fontFamily: 'var(--font-mono)', fontWeight: 700, color: GREEN, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
        Task Queue
      </span>
      <motion.div
        animate={{ boxShadow: active ? `0 0 16px ${GREEN}66` : '0 0 0px transparent' }}
        transition={{ duration: 0.4 }}
        style={{
          width: w,
          minHeight: compact ? 50 : 64,
          border: `2px solid ${GREEN}${active ? 'cc' : '44'}`,
          borderRadius: 8,
          background: `${GREEN}${active ? '18' : '0d'}`,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: 5,
          gap: 3,
          boxSizing: 'border-box',
          transition: 'border-color 0.3s, background 0.3s',
        }}
      >
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              style={{
                background: GREEN,
                borderRadius: 4,
                padding: compact ? '3px 5px' : '4px 8px',
                fontSize: compact ? 8 : 9,
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                color: '#0f0f1a',
                whiteSpace: 'nowrap',
              }}
            >
              {item}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

function EventLoopIndicator({ active, compact }: { active: boolean; compact: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: compact ? '0 4px' : '0 8px' }}>
      <motion.div
        animate={active ? { rotate: 360, color: GREEN } : { rotate: 0, color: '#4b5563' }}
        transition={active ? { repeat: Infinity, duration: 1.0, ease: 'linear' } : { duration: 0 }}
        style={{ fontSize: compact ? 18 : 24, lineHeight: 1 }}
      >
        ↻
      </motion.div>
      <span style={{ fontSize: compact ? 7 : 8, fontFamily: 'var(--font-mono)', color: active ? GREEN : '#4b5563', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
        event loop
      </span>
    </div>
  )
}

export default function EventLoopViz({ step, compact = false }: Props) {
  const stackItems = callStackItems[Math.min(step, 4)] ?? []
  const webItem = webApiItems[Math.min(step, 4)] ?? null
  const queueItems = taskQueueItems[Math.min(step, 4)] ?? []
  const zone = activeZone[Math.min(step, 4)]
  const labelColor = zone === 'stack' ? PURPLE : zone === 'webapi' ? BLUE : zone === 'queue' || zone === 'loop' ? GREEN : '#6b7280'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 14 }}>
      {/* Label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          style={{
            background: `${labelColor}22`, border: `1px solid ${labelColor}55`,
            borderRadius: 6, padding: compact ? '4px 10px' : '5px 14px',
            fontSize: compact ? 10 : 11, fontFamily: 'var(--font-mono)',
            fontWeight: 700, color: labelColor, letterSpacing: '0.3px', textAlign: 'center',
          }}
        >
          {stepLabels[Math.min(step, 4)]}
        </motion.div>
      </AnimatePresence>

      {/* Main diagram */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: compact ? 6 : 8 }}>
        <StackColumn items={stackItems} active={zone === 'stack' || zone === 'loop'} compact={compact} />
        <EventLoopIndicator active={zone === 'loop'} compact={compact} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 8, alignItems: 'center' }}>
          <QueueColumn items={queueItems} active={zone === 'queue'} compact={compact} />
          <WebApiZone item={webItem} active={zone === 'webapi'} compact={compact} />
        </div>
      </div>
    </div>
  )
}
