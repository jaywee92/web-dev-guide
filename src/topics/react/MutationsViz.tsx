import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const COLOR  = '#61dafb'
const ORANGE = '#fb923c'
const GREEN  = '#4ade80'
const PINK   = '#f472b6'
const MUTED  = '#94a3b8'
const TEXT   = '#e2e8f0'

const stepLabels = [
  'A mutation sends data to the server',
  'Optimistic update: show change before server confirms',
  'Server processes the request and updates the database',
  'Server responds — revalidate and sync the UI',
  'useFormStatus & useActionState handle pending state',
]

const MAX_STEP = stepLabels.length - 1

interface FlowStep {
  id: string
  label: string
  sublabel?: string
  color: string
  icon: string
}

const flowSteps: FlowStep[] = [
  { id: 'form',      label: 'Form submit',  sublabel: 'user action', color: COLOR,   icon: '📝' },
  { id: 'optimistic',label: 'Optimistic UI', sublabel: 'instant update', color: ORANGE, icon: '⚡' },
  { id: 'server',    label: 'Server action', sublabel: 'POST /api/…', color: PINK,   icon: '→' },
  { id: 'db',        label: 'DB update',    sublabel: 'persist',    color: GREEN,  icon: '🗄' },
  { id: 'revalidate',label: 'Revalidate',   sublabel: 'sync UI',    color: COLOR,  icon: '↺' },
]

function FlowNode({ step: flowStep, active, done, compact }: { step: FlowStep; active: boolean; done: boolean; compact: boolean }) {
  const fs = compact ? 8 : 10
  const c = done ? GREEN : active ? flowStep.color : MUTED
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 2 : 3 }}>
      <motion.div
        animate={active ? { scale: [1, 1.12, 1], transition: { duration: 0.5, repeat: 1 } } : { scale: 1 }}
        style={{
          background: active ? `${flowStep.color}22` : done ? `${GREEN}14` : `${MUTED}0a`,
          border: `${active ? 2 : 1}px solid ${c}${active ? '' : '55'}`,
          borderRadius: 8,
          padding: compact ? '5px 8px' : '7px 12px',
          fontFamily: 'var(--font-mono)',
          fontSize: compact ? 14 : 18,
          textAlign: 'center',
          minWidth: compact ? 40 : 52,
          transition: 'all 0.3s',
        }}
      >
        {done ? '✓' : flowStep.icon}
      </motion.div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: fs, color: c, fontWeight: active ? 700 : 400, textAlign: 'center' }}>
        {flowStep.label}
      </div>
      {flowStep.sublabel && (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 7 : 8, color: MUTED, textAlign: 'center' }}>
          {flowStep.sublabel}
        </div>
      )}
    </div>
  )
}

function FlowArrow({ active, compact }: { active: boolean; compact: boolean }) {
  return (
    <motion.div
      animate={active ? { x: [0, 3, 0] } : {}}
      transition={{ repeat: Infinity, duration: 0.8 }}
      style={{ color: active ? COLOR : MUTED + '33', fontSize: compact ? 14 : 18, alignSelf: 'center', paddingBottom: compact ? 14 : 18 }}
    >
      →
    </motion.div>
  )
}

function FormStatusPanel({ compact }: { compact: boolean }) {
  const fs = compact ? 8 : 10
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      style={{ display: 'flex', flexDirection: 'column', gap: compact ? 5 : 8, alignItems: 'center' }}>
      <div style={{
        background: 'rgba(0,0,0,0.3)',
        border: `1px solid ${COLOR}33`,
        borderRadius: 8,
        padding: compact ? '8px 10px' : '10px 14px',
        fontFamily: 'var(--font-mono)',
        fontSize: fs,
      }}>
        <div style={{ color: PINK }}>{'function SubmitBtn() {'}</div>
        <div style={{ color: COLOR, marginLeft: compact ? 8 : 12 }}>{'const { pending } = useFormStatus()'}</div>
        <div style={{ color: MUTED, marginLeft: compact ? 8 : 12 }}>{'return ('}</div>
        <div style={{ color: GREEN, marginLeft: compact ? 16 : 24 }}>{'<button disabled={pending}>'}</div>
        <div style={{ color: TEXT, marginLeft: compact ? 24 : 36 }}>{'  {pending ? "Saving…" : "Save"}'}</div>
        <div style={{ color: GREEN, marginLeft: compact ? 16 : 24 }}>{'</button>'}</div>
        <div style={{ color: MUTED, marginLeft: compact ? 8 : 12 }}>{')'}</div>
        <div style={{ color: PINK }}>{'}'}</div>
      </div>
    </motion.div>
  )
}

export default function MutationsViz({ step, compact = false }: Props) {
  const s = Math.min(step, MAX_STEP)
  const mono = 'var(--font-mono)'

  // How many flow steps are "active/done" based on viz step
  // step 0: only form active
  // step 1: form done, optimistic active
  // step 2: optimistic done, server+db active
  // step 3: all done, revalidate active
  // step 4: show useFormStatus code
  const activeIndex = s === 0 ? 0 : s === 1 ? 1 : s === 2 ? 2 : s === 3 ? 4 : 4

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 16, width: '100%' }}>
      <AnimatePresence mode="wait">
        {s <= 3 && (
          <motion.div key="flow" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: compact ? 4 : 8 }}>
              {flowSteps.map((fs, i) => (
                <div key={fs.id} style={{ display: 'flex', alignItems: 'flex-start', gap: compact ? 4 : 8 }}>
                  <FlowNode
                    step={fs}
                    active={i === activeIndex}
                    done={i < activeIndex}
                    compact={compact}
                  />
                  {i < flowSteps.length - 1 && (
                    <FlowArrow active={i < activeIndex} compact={compact} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
        {s === 4 && (
          <motion.div key="formstatus" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}>
            <FormStatusPanel compact={compact} />
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
