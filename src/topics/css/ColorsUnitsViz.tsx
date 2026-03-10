import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const BLUE = '#3b82f6'
const GREEN = '#22c55e'
const PURPLE = '#a855f7'
const ORANGE = '#f97316'

const COLOR_STEPS = [
  { label: 'Named', value: 'tomato', display: 'tomato', color: '#ff6347' },
  { label: 'HEX', value: '#3b82f6', display: '#3b82f6', color: '#3b82f6' },
  { label: 'RGB', value: 'rgb(34,197,94)', display: 'rgb(34, 197, 94)', color: '#22c55e' },
  { label: 'HSL', value: 'hsl(270,80%,60%)', display: 'hsl(270, 80%, 60%)', color: '#a855f7' },
]

const UNITS = [
  { label: 'px', value: '16px', description: 'Absolute', color: BLUE },
  { label: 'rem', value: '1rem', description: 'Relative to root', color: GREEN },
  { label: 'em', value: '1em', description: 'Relative to parent', color: PURPLE },
  { label: '%', value: '50%', description: 'Relative to parent', color: ORANGE },
]

const spring = { type: 'spring' as const, stiffness: 300, damping: 30 }

export default function ColorsUnitsViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)

  if (s <= 3) {
    const cfg = COLOR_STEPS[s]
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 20 }}>
        {/* Color swatch */}
        <AnimatePresence mode="wait">
          <motion.div
            key={s}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={spring}
            style={{
              width: compact ? 80 : 120,
              height: compact ? 80 : 120,
              borderRadius: 16,
              background: cfg.color,
              boxShadow: `0 0 32px ${cfg.color}66`,
            }}
          />
        </AnimatePresence>

        {/* Format badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={s}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{
              display: 'inline-block',
              background: `${cfg.color}20`,
              border: `1px solid ${cfg.color}55`,
              borderRadius: 6,
              padding: compact ? '4px 10px' : '6px 14px',
              fontFamily: 'var(--font-mono)',
              fontSize: compact ? 11 : 14,
              color: cfg.color,
              fontWeight: 600,
              marginBottom: 6,
            }}>
              {cfg.display}
            </div>
            <div style={{
              fontSize: compact ? 10 : 12,
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
            }}>
              {cfg.label} format
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Format selector dots */}
        <div style={{ display: 'flex', gap: 8 }}>
          {COLOR_STEPS.map((c, i) => (
            <motion.div
              key={c.label}
              animate={{
                scale: i === s ? 1.3 : 1,
                background: i <= s ? c.color : 'var(--border)',
              }}
              transition={spring}
              style={{
                width: compact ? 8 : 10,
                height: compact ? 8 : 10,
                borderRadius: '50%',
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  // Step 4 — Units comparison
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 20 }}>
      <div style={{ display: 'flex', gap: compact ? 8 : 12, alignItems: 'flex-end' }}>
        {UNITS.map((unit, i) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, ...spring }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: compact ? 9 : 10,
              color: unit.color,
              textAlign: 'center',
            }}>
              {unit.description}
            </div>
            <div style={{
              background: `${unit.color}20`,
              border: `2px solid ${unit.color}`,
              borderRadius: 8,
              padding: compact ? '8px 10px' : '12px 16px',
              fontFamily: 'var(--font-mono)',
              fontSize: compact ? 11 : 13,
              color: unit.color,
              fontWeight: 700,
              textAlign: 'center',
              minWidth: compact ? 48 : 64,
            }}>
              {unit.value}
            </div>
            <div style={{
              fontSize: compact ? 10 : 12,
              fontFamily: 'var(--font-mono)',
              color: unit.color,
              fontWeight: 700,
            }}>
              {unit.label}
            </div>
          </motion.div>
        ))}
      </div>
      <div style={{
        fontSize: compact ? 10 : 12,
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-mono)',
        textAlign: 'center',
      }}>
        px · rem · em · %
      </div>
    </div>
  )
}
