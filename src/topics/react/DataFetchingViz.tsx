import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const COLOR  = '#61dafb'
const GREEN  = '#4ade80'
const ORANGE = '#fb923c'
const RED    = '#f87171'
const MUTED  = '#94a3b8'

const stepLabels = [
  'Data fetching starts when a component mounts',
  'Loading — waiting for the server response',
  'Success — data arrives and renders',
  'Error — request failed, show a message',
  'Render-as-you-fetch: kick off fetch before render',
]

const MAX_STEP = stepLabels.length - 1

type FetchState = 'idle' | 'loading' | 'success' | 'error'

const states: FetchState[] = ['idle', 'loading', 'success', 'error']

const stateConfig: Record<FetchState, { color: string; label: string; icon: string }> = {
  idle:    { color: MUTED,   label: 'idle',    icon: '○' },
  loading: { color: ORANGE,  label: 'loading', icon: '⟳' },
  success: { color: GREEN,   label: 'success', icon: '✓' },
  error:   { color: RED,     label: 'error',   icon: '✕' },
}

function StateBox({ state, active, compact }: { state: FetchState; active: boolean; compact: boolean }) {
  const cfg = stateConfig[state]
  const fs = compact ? 9 : 11
  return (
    <motion.div
      animate={active ? { scale: [1, 1.06, 1], transition: { duration: 0.4 } } : { scale: 1 }}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 3 : 4,
        background: active ? `${cfg.color}20` : `${cfg.color}08`,
        border: `${active ? 2 : 1}px solid ${active ? cfg.color : cfg.color + '33'}`,
        borderRadius: 8,
        padding: compact ? '6px 10px' : '8px 14px',
        minWidth: compact ? 52 : 68,
        transition: 'all 0.3s',
      }}
    >
      <motion.div
        animate={state === 'loading' && active ? { rotate: 360 } : { rotate: 0 }}
        transition={state === 'loading' && active ? { repeat: Infinity, duration: 1, ease: 'linear' } : {}}
        style={{ fontSize: compact ? 16 : 20, color: active ? cfg.color : cfg.color + '55' }}
      >
        {cfg.icon}
      </motion.div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: fs, color: active ? cfg.color : MUTED, fontWeight: active ? 700 : 400 }}>
        {cfg.label}
      </div>
    </motion.div>
  )
}

function Arrow({ active, compact }: { active: boolean; compact: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', color: active ? COLOR : MUTED + '44', fontSize: compact ? 14 : 18, transition: 'color 0.3s' }}>
      →
    </div>
  )
}

function DataList({ compact }: { compact: boolean }) {
  const items = ['Alice — Frontend Dev', 'Bob — Designer', 'Carol — Backend Dev']
  const fs = compact ? 8 : 10
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        display: 'flex', flexDirection: 'column', gap: compact ? 3 : 4,
        background: `${GREEN}0c`,
        border: `1px solid ${GREEN}33`,
        borderRadius: 8,
        padding: compact ? '6px 10px' : '8px 14px',
        marginTop: compact ? 6 : 8,
      }}
    >
      {items.map((item, i) => (
        <motion.div key={item} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
          style={{ fontFamily: 'var(--font-mono)', fontSize: fs, color: GREEN }}>
          • {item}
        </motion.div>
      ))}
    </motion.div>
  )
}

function ErrorBox({ compact }: { compact: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        background: `${RED}12`,
        border: `1.5px solid ${RED}55`,
        borderRadius: 8,
        padding: compact ? '6px 12px' : '8px 16px',
        fontFamily: 'var(--font-mono)',
        fontSize: compact ? 9 : 11,
        color: RED,
        textAlign: 'center',
        marginTop: compact ? 6 : 8,
      }}
    >
      ✕ Failed to fetch — check your network
    </motion.div>
  )
}

function RenderAsFetch({ compact }: { compact: boolean }) {
  const fs = compact ? 8 : 10
  const steps = [
    { label: 'Route change', color: COLOR },
    { label: 'kick off fetch()', color: ORANGE },
    { label: 'render <Suspense>', color: COLOR },
    { label: 'data ready → render', color: GREEN },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 4 : 6, alignItems: 'center' }}>
      {steps.map((step, i) => (
        <motion.div key={step.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.12 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 2 : 3 }}>
          <div style={{
            background: `${step.color}18`,
            border: `1.5px solid ${step.color}55`,
            borderRadius: 6,
            padding: compact ? '3px 10px' : '4px 14px',
            fontFamily: 'var(--font-mono)',
            fontSize: fs,
            color: step.color,
            fontWeight: 600,
          }}>
            {step.label}
          </div>
          {i < steps.length - 1 && (
            <div style={{ color: MUTED, fontSize: compact ? 12 : 14 }}>↓</div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default function DataFetchingViz({ step, compact = false }: Props) {
  const s = Math.min(step, MAX_STEP)
  const mono = 'var(--font-mono)'

  // Which state is active based on step
  const activeState: FetchState = s === 0 ? 'idle' : s === 1 ? 'loading' : s === 2 ? 'success' : s === 3 ? 'error' : 'success'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 16, width: '100%' }}>
      <AnimatePresence mode="wait">
        {s <= 3 && (
          <motion.div key="states" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 8 : 12 }}>
            {/* State machine row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 4 : 8 }}>
              {states.map((st, i) => (
                <div key={st} style={{ display: 'flex', alignItems: 'center', gap: compact ? 4 : 8 }}>
                  <StateBox state={st} active={activeState === st} compact={compact} />
                  {i < states.length - 1 && <Arrow active={i < states.indexOf(activeState)} compact={compact} />}
                </div>
              ))}
            </div>
            {/* Details panel */}
            {s === 2 && <DataList compact={compact} />}
            {s === 3 && <ErrorBox compact={compact} />}
          </motion.div>
        )}
        {s === 4 && (
          <motion.div key="raf" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}>
            <RenderAsFetch compact={compact} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.p
          key={s}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          style={{ color: COLOR, fontFamily: mono, fontSize: compact ? 10 : 11, textAlign: 'center', maxWidth: 280, margin: 0 }}
        >
          {stepLabels[s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
