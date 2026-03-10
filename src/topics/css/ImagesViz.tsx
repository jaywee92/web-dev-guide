// src/topics/css/ImagesViz.tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const BLUE = '#3b82f6'
const GREEN = '#22c55e'
const PURPLE = '#a855f7'
const ORANGE = '#f97316'

// Simulated image using a gradient placeholder
const IMG_BG = 'linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #f59e0b 100%)'

const STEP_CONFIGS = [
  {
    containerW: '100%',
    containerH: undefined as number | undefined,
    imgW: 280,
    imgH: 140,
    objectFit: 'fill' as const,
    borderRadius: 0,
    overflow: 'visible',
    label: 'No CSS — image overflows its container',
    color: 'var(--text-muted)',
  },
  {
    containerW: '100%',
    containerH: undefined,
    imgW: undefined as number | undefined,
    imgH: undefined as number | undefined,
    objectFit: 'fill' as const,
    borderRadius: 0,
    overflow: 'hidden',
    label: 'max-width: 100% · height: auto — scales to fit',
    color: BLUE,
  },
  {
    containerW: '100%',
    containerH: 100,
    imgW: undefined,
    imgH: undefined,
    objectFit: 'cover' as const,
    borderRadius: 0,
    overflow: 'hidden',
    label: 'object-fit: cover — fills container, crops to fit',
    color: GREEN,
  },
  {
    containerW: 120,
    containerH: 120,
    imgW: undefined,
    imgH: undefined,
    objectFit: 'cover' as const,
    borderRadius: '50%',
    overflow: 'hidden',
    label: 'border-radius: 50% — circle avatar crop',
    color: PURPLE,
  },
  {
    containerW: '100%',
    containerH: undefined,
    imgW: undefined,
    imgH: undefined,
    objectFit: 'cover' as const,
    borderRadius: 10,
    overflow: 'hidden',
    label: 'aspect-ratio: 16 / 9 — locks proportions',
    color: ORANGE,
  },
]

const spring = { type: 'spring' as const, stiffness: 240, damping: 28 }

export default function ImagesViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const cfg = STEP_CONFIGS[s]

  const outerW = compact ? 200 : 260
  const scaledContainerW = cfg.containerW === '100%' ? '100%' : (typeof cfg.containerW === 'number' ? (compact ? cfg.containerW * 0.7 : cfg.containerW) : cfg.containerW)
  const scaledContainerH = cfg.containerH ? (compact ? cfg.containerH * 0.7 : cfg.containerH) : undefined

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 20 }}>
      {/* Container frame */}
      <div style={{
        width: outerW,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: compact ? 10 : 16,
        overflow: 'hidden',
      }}>
        <div style={{
          fontSize: compact ? 8 : 9,
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-muted)',
          marginBottom: compact ? 6 : 10,
        }}>
          .container
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={s}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              width: scaledContainerW,
              height: s === 4 ? undefined : scaledContainerH,
              aspectRatio: s === 4 ? '16 / 9' : undefined,
              overflow: cfg.overflow as 'hidden' | 'visible',
              borderRadius: cfg.borderRadius,
              margin: s === 3 ? '0 auto' : 0,
            }}
          >
            <motion.div
              animate={{
                width: cfg.imgW ? (compact ? cfg.imgW * 0.7 : cfg.imgW) : '100%',
                height: cfg.imgH ? (compact ? cfg.imgH * 0.7 : cfg.imgH) : '100%',
                borderRadius: cfg.borderRadius,
              }}
              transition={spring}
              style={{
                background: IMG_BG,
                objectFit: cfg.objectFit,
                display: 'block',
                minHeight: (cfg.containerH || scaledContainerH) ? undefined : (compact ? 60 : 90),
              }}
            />
          </motion.div>
        </AnimatePresence>
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
            color: cfg.color,
            textAlign: 'center',
          }}
        >
          {cfg.label}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
