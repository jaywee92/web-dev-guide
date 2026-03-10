import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const CSS_BLUE = '#5b9cf5'

const stepLabels = [
  'Flexbox: display: flex makes children flex items',
  'flex-direction controls the main axis',
  'justify-content distributes space on main axis',
  'align-items aligns items on the cross axis',
  'flex-wrap allows items to wrap to new lines',
]

const ITEM_COLORS = ['#4ade80', '#5b9cf5', '#f472b6', '#f5c542', '#a78bfa']

interface FlexConfig {
  flexDirection: 'row' | 'column'
  justifyContent: string
  alignItems: string
  flexWrap: 'nowrap' | 'wrap'
  itemCount: number
  cssRule: string
}

const CONFIGS: FlexConfig[] = [
  {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'nowrap',
    itemCount: 3,
    cssRule: 'display: flex',
  },
  {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'nowrap',
    itemCount: 3,
    cssRule: 'flex-direction: column',
  },
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'nowrap',
    itemCount: 3,
    cssRule: 'justify-content: space-between',
  },
  {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
    itemCount: 3,
    cssRule: 'align-items: center',
  },
  {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    itemCount: 5,
    cssRule: 'flex-wrap: wrap',
  },
]

export default function FlexboxViz({ step, compact = false }: Props) {
  const config = CONFIGS[Math.min(step, CONFIGS.length - 1)]
  const containerSize = compact ? 160 : 200
  const itemSize = compact ? 28 : 36

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
            background: `${CSS_BLUE}22`,
            border: `1px solid ${CSS_BLUE}55`,
            borderRadius: 6,
            padding: compact ? '4px 10px' : '5px 14px',
            fontSize: compact ? 10 : 11,
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            color: CSS_BLUE,
            letterSpacing: '0.3px',
            textAlign: 'center',
          }}
        >
          {stepLabels[Math.min(step, 4)]}
        </motion.div>
      </AnimatePresence>

      {/* CSS rule badge */}
      <AnimatePresence mode="wait">
        <motion.div
          key={config.cssRule}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          style={{
            background: 'rgba(0,0,0,0.3)',
            border: `1px solid ${CSS_BLUE}44`,
            borderRadius: 5,
            padding: compact ? '3px 8px' : '4px 10px',
            fontSize: compact ? 10 : 12,
            fontFamily: 'var(--font-mono)',
            color: '#f5c542',
          }}
        >
          .container {'{'} {config.cssRule} {'}'}
        </motion.div>
      </AnimatePresence>

      {/* Flex container */}
      <div
        style={{
          width: containerSize,
          height: containerSize,
          border: `2px dashed ${CSS_BLUE}66`,
          borderRadius: 8,
          background: `${CSS_BLUE}08`,
          display: 'flex',
          flexDirection: config.flexDirection,
          justifyContent: config.justifyContent,
          alignItems: config.alignItems,
          flexWrap: config.flexWrap,
          padding: 8,
          gap: compact ? 4 : 6,
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        {/* Container label */}
        <span style={{
          position: 'absolute',
          top: 4,
          left: 6,
          fontSize: 8,
          fontFamily: 'var(--font-mono)',
          color: `${CSS_BLUE}88`,
          fontWeight: 700,
          letterSpacing: '0.3px',
          textTransform: 'uppercase',
          pointerEvents: 'none',
        }}>
          flex container
        </span>

        <AnimatePresence>
          {Array.from({ length: config.itemCount }).map((_, i) => (
            <motion.div
              key={i}
              layout
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25, layout: { duration: 0.4 } }}
              style={{
                width: itemSize,
                height: itemSize,
                background: ITEM_COLORS[i % ITEM_COLORS.length],
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: compact ? 9 : 11,
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                color: '#0f0f1a',
                flexShrink: 0,
              }}
            >
              {String.fromCharCode(65 + i)}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
