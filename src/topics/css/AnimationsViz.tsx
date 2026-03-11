import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const STEPS = [
  { color: '#71717a', label: 'Static element — no animation',                          animate: false, infinite: false, fillFwd: false, code: '/* no animation */' },
  { color: '#3b82f6', label: '@keyframes defined but not applied — nothing moves yet', animate: false, infinite: false, fillFwd: false, code: '@keyframes bounce {\n  from { transform: translateY(0); }\n  to   { transform: translateY(-60px); }\n}' },
  { color: '#22c55e', label: 'animation-name + animation-duration — animates once',    animate: true,  infinite: false, fillFwd: false, code: 'animation: bounce 0.8s;' },
  { color: '#a855f7', label: 'animation-iteration-count: infinite — repeats forever',  animate: true,  infinite: true,  fillFwd: false, code: 'animation: bounce 0.8s infinite alternate;' },
  { color: '#f97316', label: 'animation-fill-mode: forwards — holds the end state',    animate: true,  infinite: false, fillFwd: true,  code: 'animation: bounce 0.8s forwards;' },
] as const

type StepCfg = typeof STEPS[number]
const mono = 'var(--font-mono)'

function ballTransition(cfg: StepCfg) {
  if (!cfg.animate) return {}
  if (cfg.infinite) return { y: [0, -60, 0], transition: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' as const } }
  if (cfg.fillFwd)  return { y: -60,         transition: { duration: 0.8, ease: 'easeOut' as const } }
  return                   { y: [0, -60, 0], transition: { duration: 0.8, ease: 'easeInOut' as const } }
}

export default function AnimationsViz({ step, compact = false }: Props) {
  const s = Math.max(0, Math.min(step, 4))
  const cfg = STEPS[s]
  const ballSize = compact ? 36 : 48

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 20 }}>
      <div style={{
        width: compact ? 180 : 240,
        height: compact ? 140 : 180,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        paddingBottom: compact ? 16 : 24,
        overflow: 'hidden',
      }}>
        <motion.div
          key={s}
          animate={ballTransition(cfg)}
          style={{
            width: ballSize, height: ballSize,
            borderRadius: '50%',
            background: `${cfg.color}33`,
            border: `2px solid ${cfg.color}`,
          }}
        />
      </div>
      <div style={{ fontFamily: mono, fontSize: compact ? 8 : 10, color: '#98c379', background: '#1e1e2e', padding: compact ? '4px 8px' : '6px 12px', borderRadius: 6, whiteSpace: 'pre' }}>
        {cfg.code}
      </div>
      <AnimatePresence mode="wait">
        <motion.p key={s} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}
          style={{ margin: 0, fontFamily: mono, fontSize: compact ? 10 : 11, color: cfg.color, textAlign: 'center', maxWidth: compact ? 200 : 280 }}>
          {cfg.label}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
