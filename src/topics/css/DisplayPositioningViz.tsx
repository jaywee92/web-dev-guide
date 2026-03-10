// src/topics/css/DisplayPositioningViz.tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const BLUE = '#3b82f6'
const GREEN = '#22c55e'
const PURPLE = '#a855f7'

const BLOCKS = [
  { label: 'div.one', color: BLUE },
  { label: 'div.two', color: GREEN },
  { label: 'div.three', color: PURPLE },
]

const STEP_LABELS = [
  'display: block — each element starts on a new line',
  'display: inline — elements flow with text',
  'display: inline-block — inline flow, block sizing',
  'position: relative — nudged from original position',
  'position: absolute — removed from flow, overlaps others',
]

const spring = { type: 'spring' as const, stiffness: 260, damping: 28 }

export default function DisplayPositioningViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const size = compact ? 32 : 44
  const gap = compact ? 4 : 6
  const fontSize = compact ? 9 : 10

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 20 }}>
      {/* Demo area */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: compact ? 12 : 20,
        width: compact ? 200 : 280,
        minHeight: compact ? 80 : 120,
        position: 'relative',
        display: 'flex',
        flexDirection: s === 0 ? 'column' : s === 1 || s === 2 ? 'row' : 'row',
        flexWrap: 'wrap',
        gap,
        alignItems: 'flex-start',
      }}>
        {BLOCKS.map((block, i) => {
          const isAbsoluteStep = s === 4
          const isRelativeStep = s === 3

          return (
            <motion.div
              key={block.label}
              layout
              animate={{
                x: isRelativeStep && i === 1 ? (compact ? 8 : 14) : isAbsoluteStep && i === 1 ? (compact ? 20 : 32) : 0,
                y: isAbsoluteStep && i === 1 ? (compact ? -16 : -24) : 0,
                zIndex: isAbsoluteStep && i === 1 ? 2 : 1,
                width: s === 0 ? '100%' : s === 1 ? 'auto' : size,
              }}
              transition={spring}
              style={{
                height: s === 1 ? 'auto' : size,
                background: `${block.color}20`,
                border: `2px solid ${block.color}`,
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize,
                color: block.color,
                fontWeight: 600,
                position: isAbsoluteStep && i === 1 ? 'absolute' : 'relative',
                padding: s === 1 ? `2px ${compact ? 6 : 8}px` : 0,
                flexShrink: 0,
              }}
            >
              {s === 1 ? block.label.split('.')[1] : `${i + 1}`}
            </motion.div>
          )
        })}
      </div>

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={s}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          style={{
            margin: 0,
            fontFamily: 'var(--font-mono)',
            fontSize: compact ? 10 : 11,
            color: BLUE,
            textAlign: 'center',
          }}
        >
          {STEP_LABELS[s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
