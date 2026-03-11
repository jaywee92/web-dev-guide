import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const STEPS = [
  { color: '#71717a', label: 'No transform — element in its normal flow position',         animTarget: { x: 0, y: 0, rotate: 0, scale: 1 }, code: '/* no transform */' },
  { color: '#3b82f6', label: 'translate() — move without affecting surrounding elements',  animTarget: { x: 40, y: 20, rotate: 0, scale: 1 }, code: 'transform: translate(40px, 20px);' },
  { color: '#a855f7', label: "rotate() — spin around the element's center point",         animTarget: { x: 0, y: 0, rotate: 45, scale: 1 }, code: 'transform: rotate(45deg);' },
  { color: '#22c55e', label: 'scale() — grow or shrink; 1 = original size',               animTarget: { x: 0, y: 0, rotate: 0, scale: 1.5 }, code: 'transform: scale(1.5);' },
  { color: '#f97316', label: 'Combined — transforms stack left-to-right (order matters)', animTarget: { x: 20, y: -10, rotate: 20, scale: 1.2 }, code: 'transform: translate(20px, -10px)\n         rotate(20deg) scale(1.2);' },
] as const

const mono = 'var(--font-mono)'

export default function TransformsViz({ step, compact = false }: Props) {
  const s = Math.max(0, Math.min(step, 4))
  const cfg = STEPS[s]
  const boxSize = compact ? 48 : 64

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 20 }}>
      <div style={{
        width: compact ? 200 : 280,
        height: compact ? 140 : 180,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ width: boxSize, height: boxSize, border: '1px dashed var(--border)', borderRadius: 6, position: 'absolute', opacity: s === 0 ? 0 : 0.35 }} />
        <motion.div
          animate={cfg.animTarget}
          transition={{ type: 'spring', stiffness: 160, damping: 20 }}
          style={{
            width: boxSize, height: boxSize,
            background: `${cfg.color}33`,
            border: `2px solid ${cfg.color}`,
            borderRadius: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: mono, fontSize: compact ? 9 : 11, color: cfg.color, fontWeight: 700,
          }}
        >
          .box
        </motion.div>
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
