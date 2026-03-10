import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const PINK = '#f472b6'
const BLUE = '#5b9cf5'
const PURPLE = '#a78bfa'
const GREEN = '#4ade80'

const stepLabels = [
  'A React component is a reusable building block',
  'Components can be composed — used inside each other',
  'Navigation is a component too — add it to the top',
  'Compose all components inside a root <App> component',
  'Parent passes data to children via props',
]

interface ComponentDef {
  id: string
  label: string
  color: string
  width: number
  studs: number
}

const COMPONENTS: ComponentDef[] = [
  { id: 'button', label: '<Button />', color: PINK,   width: 80,  studs: 2 },
  { id: 'card',   label: '<Card />',   color: PURPLE, width: 110, studs: 3 },
  { id: 'nav',    label: '<Nav />',    color: BLUE,   width: 160, studs: 4 },
]

const VISIBLE: Record<number, string[]> = {
  0: ['button'],
  1: ['button', 'card'],
  2: ['button', 'card', 'nav'],
  3: ['button', 'card', 'nav'],
  4: ['button', 'card', 'nav'],
}

function Studs({ count, color }: { count: number; color: string }) {
  return (
    <div style={{ display: 'flex', gap: 4, position: 'absolute', top: -5, left: 8 }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          width: 8, height: 8,
          borderRadius: '50%',
          background: color,
          border: `1.5px solid ${color}cc`,
          boxShadow: `0 1px 3px ${color}44`,
        }} />
      ))}
    </div>
  )
}

function ComponentBlock({ def, compact }: { def: ComponentDef; compact: boolean }) {
  const h = compact ? 28 : 36
  const w = compact ? Math.round(def.width * 0.7) : def.width
  const studs = Math.max(1, Math.round(def.studs * (compact ? 0.7 : 1)))

  return (
    <div style={{ position: 'relative', paddingTop: 8 }}>
      <Studs count={studs} color={def.color} />
      <div style={{
        width: w,
        height: h,
        background: `${def.color}22`,
        border: `2px solid ${def.color}`,
        borderRadius: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: compact ? 8 : 10,
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        color: def.color,
        boxShadow: `0 3px 0 ${def.color}55, 0 4px 8px ${def.color}22`,
      }}>
        {def.label}
      </div>
    </div>
  )
}

function PropArrow({ from, to, label, compact }: { from: string; to: string; label: string; compact: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        fontSize: compact ? 8 : 9,
        fontFamily: 'var(--font-mono)',
        color: GREEN,
      }}
    >
      <span style={{ opacity: 0.6 }}>{from}</span>
      <motion.span
        animate={{ x: [0, 4, 0] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
      >
        →
      </motion.span>
      <span style={{
        background: `${GREEN}18`,
        border: `1px solid ${GREEN}55`,
        borderRadius: 4,
        padding: '1px 5px',
        color: GREEN,
      }}>
        {label}
      </span>
      <span style={{ opacity: 0.6 }}>{to}</span>
    </motion.div>
  )
}

function ComponentsInner({ visible, compact }: { visible: string[]; compact: boolean }) {
  const allDefs = COMPONENTS.filter(c => visible.includes(c.id))
  const nav = allDefs.find(c => c.id === 'nav')
  const rest = allDefs.filter(c => c.id !== 'nav')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 6 : 8 }}>
      <AnimatePresence>
        {nav && (
          <motion.div
            key="nav"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          >
            <ComponentBlock def={nav} compact={compact} />
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'flex', flexDirection: 'row', gap: compact ? 6 : 10, alignItems: 'flex-end' }}>
        <AnimatePresence>
          {rest.map(def => (
            <motion.div
              key={def.id}
              initial={{ opacity: 0, scale: 0.6, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <ComponentBlock def={def} compact={compact} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function ComponentsViz({ step, compact = false }: Props) {
  const visible = VISIBLE[Math.min(step, 4)]
  const showApp = step >= 3
  const showProps = step >= 4
  const labelColor = step <= 1 ? PINK : step === 2 ? BLUE : PURPLE

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 14 }}>
      {/* Step label */}
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

      {/* ComponentsInner always mounted — App wrapper fades in on top as an overlay */}
      <div style={{ position: 'relative' }}>
        {/* App wrapper overlay — animates in at step 3, never remounts ComponentsInner */}
        <AnimatePresence>
          {showApp && (
            <motion.div
              key="app-wrapper"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              style={{
                position: 'absolute',
                inset: compact ? '-12px -10px -8px' : '-16px -14px -10px',
                border: `2px dashed ${PURPLE}66`,
                borderRadius: 10,
                background: `${PURPLE}08`,
                pointerEvents: 'none',
                zIndex: 0,
              }}
            >
              <span style={{
                position: 'absolute', top: -10, left: 12,
                background: 'var(--surface)',
                padding: '0 6px',
                fontSize: compact ? 8 : 10,
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                color: PURPLE,
              }}>
                {'<App />'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Inner blocks always stay mounted — no remount on wrapper toggle */}
        <div style={{ position: 'relative', zIndex: 1, padding: showApp ? (compact ? '12px 10px 8px' : '16px 14px 10px') : 0, transition: 'padding 0.3s' }}>
          <ComponentsInner visible={visible} compact={compact} />
        </div>
      </div>

      {/* Props arrows at step 4 */}
      <AnimatePresence>
        {showProps && (
          <motion.div
            key="props"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: compact ? 3 : 4 }}
          >
            <PropArrow from="App" to="Button" label="color={pink}" compact={compact} />
            <PropArrow from="App" to="Nav" label='title="Home"' compact={compact} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
