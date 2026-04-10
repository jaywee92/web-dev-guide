import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const COLOR  = '#61dafb'
const PINK   = '#f472b6'
const GREEN  = '#4ade80'
const ORANGE = '#fb923c'
const MUTED  = '#94a3b8'

const stepLabels = [
  'Prop drilling passes data through every layer',
  'Middle layers receive props they don\'t need',
  'Context creates a shared data store',
  'Provider wraps the tree — any child can read the value',
  'useContext pulls the value without prop chains',
]

const MAX_STEP = stepLabels.length - 1

interface BoxProps {
  label: string
  color: string
  hasProp?: boolean
  propLabel?: string
  compact: boolean
  highlight?: boolean
}

function CompBox({ label, color, hasProp, propLabel, compact, highlight }: BoxProps) {
  const fs = compact ? 8 : 10
  const px = compact ? 6 : 10
  const py = compact ? 3 : 5
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <div style={{
        background: highlight ? `${color}28` : `${color}12`,
        border: `${highlight ? 2 : 1.5}px solid ${highlight ? color : color + '55'}`,
        borderRadius: 6,
        padding: `${py}px ${px}px`,
        fontFamily: 'var(--font-mono)',
        fontSize: fs,
        fontWeight: highlight ? 700 : 500,
        color: highlight ? color : MUTED,
        minWidth: compact ? 60 : 80,
        textAlign: 'center',
      }}>
        {label}
        {hasProp && propLabel && (
          <div style={{ marginTop: 2, fontSize: compact ? 7 : 8, color: ORANGE, fontWeight: 400 }}>{propLabel}</div>
        )}
      </div>
    </div>
  )
}

function Arrow({ compact }: { compact: boolean }) {
  return (
    <motion.div
      animate={{ y: [0, 3, 0] }}
      transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}
      style={{ color: ORANGE, fontSize: compact ? 14 : 18, lineHeight: 1 }}
    >
      ↓
    </motion.div>
  )
}

function PropDrillingTree({ step, compact }: { step: number; compact: boolean }) {
  const showProp = step >= 1
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 3 : 4 }}>
      <CompBox label="<App />" color={COLOR} hasProp={showProp} propLabel="user={user}" compact={compact} highlight={true} />
      <Arrow compact={compact} />
      <CompBox label="<Layout />" color={PINK} hasProp={showProp} propLabel="user={user}" compact={compact} highlight={step >= 1} />
      <Arrow compact={compact} />
      <CompBox label="<Page />" color={PINK} hasProp={showProp} propLabel="user={user}" compact={compact} highlight={step >= 1} />
      <Arrow compact={compact} />
      <CompBox label="<Avatar />" color={GREEN} hasProp={false} compact={compact} highlight={true} />
      {step >= 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: ORANGE, textAlign: 'center', marginTop: 2 }}>
          Layout & Page don't need user!
        </motion.div>
      )}
    </div>
  )
}

function ContextTree({ step, compact }: { step: number; compact: boolean }) {
  const showProvider = step >= 3
  const showHook = step >= 4

  return (
    <div style={{ position: 'relative' }}>
      {/* Provider border */}
      <AnimatePresence>
        {showProvider && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              inset: compact ? '-8px -6px' : '-10px -8px',
              border: `2px dashed ${COLOR}88`,
              borderRadius: 10,
              background: `${COLOR}06`,
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 3 : 4, padding: showProvider ? (compact ? '8px 6px' : '10px 8px') : 0, transition: 'padding 0.3s' }}>
        {showProvider && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: COLOR, fontWeight: 700, marginBottom: 2 }}>
            {'<UserContext.Provider>'}
          </motion.div>
        )}
        <CompBox label="<App />" color={COLOR} compact={compact} highlight={true} />
        <div style={{ width: 1, height: compact ? 8 : 12, background: `${MUTED}44` }} />
        <CompBox label="<Layout />" color={MUTED} compact={compact} />
        <div style={{ width: 1, height: compact ? 8 : 12, background: `${MUTED}44` }} />
        <CompBox label="<Page />" color={MUTED} compact={compact} />
        <div style={{ width: 1, height: compact ? 8 : 12, background: `${MUTED}44` }} />
        <CompBox label="<Avatar />" color={GREEN} compact={compact} highlight={true} />
        {showHook && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            style={{
              marginTop: 4,
              background: `${GREEN}14`,
              border: `1px solid ${GREEN}55`,
              borderRadius: 5,
              padding: compact ? '3px 6px' : '4px 8px',
              fontFamily: 'var(--font-mono)',
              fontSize: compact ? 7 : 9,
              color: GREEN,
            }}>
            {'const user = useContext(UserContext)'}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default function ContextViz({ step, compact = false }: Props) {
  const s = Math.min(step, MAX_STEP)
  const mono = 'var(--font-mono)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 14 : 20, width: '100%' }}>
      <AnimatePresence mode="wait">
        {s <= 1 && (
          <motion.div key="drill" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}>
            <PropDrillingTree step={s} compact={compact} />
          </motion.div>
        )}
        {s >= 2 && (
          <motion.div key="ctx" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}>
            <ContextTree step={s} compact={compact} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.p
          key={s}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          style={{ color: COLOR, fontFamily: mono, fontSize: compact ? 10 : 11, textAlign: 'center', maxWidth: 260, margin: 0 }}
        >
          {stepLabels[s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
