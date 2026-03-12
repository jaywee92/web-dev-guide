import { usePlayground } from '@/hooks/usePlayground'
import { motion } from 'framer-motion'
import { Share2 } from 'lucide-react'

interface BoxModelState {
  padding: number
  margin: number
  borderWidth: number
  borderRadius: number
}

const defaultBoxModel: BoxModelState = { padding: 24, margin: 16, borderWidth: 2, borderRadius: 12 }

interface Props { topicId: string }

export default function VisualPlayground({ topicId }: Props) {
  const [state, setState] = usePlayground<BoxModelState>(defaultBoxModel, `pg-${topicId}`)

  const update = (key: keyof BoxModelState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setState(s => ({ ...s, [key]: Number(e.target.value) }))

  const controls = [
    { label: 'padding', key: 'padding' as const, min: 0, max: 60, unit: 'px' },
    { label: 'margin', key: 'margin' as const, min: 0, max: 60, unit: 'px' },
    { label: 'border-width', key: 'borderWidth' as const, min: 0, max: 12, unit: 'px' },
    { label: 'border-radius', key: 'borderRadius' as const, min: 0, max: 40, unit: 'px' },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
      {/* Controls */}
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius)', padding: 24,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Controls</h3>
          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}
          >
            <Share2 size={12} /> Share
          </button>
        </div>

        {controls.map(ctrl => (
          <div key={ctrl.key} style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <label style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                {ctrl.label}
              </label>
              <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--blue)' }}>
                {state[ctrl.key]}{ctrl.unit}
              </span>
            </div>
            <input
              type="range" min={ctrl.min} max={ctrl.max}
              value={state[ctrl.key]}
              onChange={update(ctrl.key)}
              style={{ width: '100%', accentColor: 'var(--blue)' }}
            />
          </div>
        ))}
      </div>

      {/* Preview */}
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius)', padding: 40,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: 280,
      }}>
        <motion.div
          animate={{
            padding: state.padding,
            margin: state.margin,
            borderWidth: state.borderWidth,
            borderRadius: state.borderRadius,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            borderStyle: 'solid',
            borderColor: 'var(--green)',
            background: 'rgba(74,222,128,0.08)',
            color: 'var(--green)',
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            textAlign: 'center',
            minWidth: 80,
          }}
        >
          .box
        </motion.div>
      </div>
    </div>
  )
}
