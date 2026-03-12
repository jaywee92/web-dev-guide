// src/topics/html/ElementsViz.tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const GREEN = '#4ade80'
const YELLOW = '#f5c542'
const BLUE = '#5b9cf5'

const stepLabels = [
  'HTML elements are the building blocks of every webpage',
  'The opening tag names the element',
  'Content lives between the tags — text, or other elements',
  'The closing tag (with /) marks the end',
  'Attributes go inside the opening tag to configure the element',
]

// Anatomy animation: shows <a href="/about" class="link">About</a>
// broken into coloured parts

interface Part {
  text: string
  color: string
  label: string
  show: number  // visible from this step
  highlight: number[]  // highlighted (bright) during these steps
}

const PARTS: Part[] = [
  { text: '<a',         color: GREEN,  label: 'opening tag', show: 0, highlight: [0, 1] },
  { text: ' href',      color: YELLOW, label: 'attribute name', show: 4, highlight: [4] },
  { text: '="',         color: YELLOW, label: '',            show: 4, highlight: [4] },
  { text: '/about',     color: '#a78bfa', label: 'attribute value', show: 4, highlight: [4] },
  { text: '"',          color: YELLOW, label: '',            show: 4, highlight: [4] },
  { text: '>',          color: GREEN,  label: '',            show: 0, highlight: [0, 1] },
  { text: 'About',      color: BLUE,   label: 'content',     show: 2, highlight: [2] },
  { text: '</a>',       color: GREEN,  label: 'closing tag', show: 3, highlight: [3] },
]

export default function ElementsViz({ step, compact = false }: Props) {
  const fs = compact ? 11 : 15
  const labelFs = compact ? 8 : 10
  const px = compact ? 5 : 8
  const py = compact ? 3 : 5

  // Which parts are focused on this step
  const focusParts = PARTS.filter(p => p.highlight.includes(step))
  const hasFocus = focusParts.length > 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 18 }}>
      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          style={{
            background: `${GREEN}22`,
            border: `1px solid ${GREEN}55`,
            borderRadius: 6,
            padding: compact ? '4px 10px' : '5px 14px',
            fontSize: compact ? 9 : 11,
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            color: GREEN,
            letterSpacing: '0.3px',
            textAlign: 'center',
            maxWidth: compact ? 200 : 340,
          }}
        >
          {stepLabels[Math.min(step, 4)]}
        </motion.div>
      </AnimatePresence>

      {/* Code anatomy */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'baseline',
        justifyContent: 'center',
        gap: 0,
        fontFamily: 'var(--font-mono)',
        fontSize: fs,
        fontWeight: 700,
        lineHeight: 1.5,
      }}>
        {PARTS.map((part, i) => {
          const visible = step >= part.show
          const isHighlighted = part.highlight.includes(step)
          const isDimmed = hasFocus && !isHighlighted && visible

          return (
            <AnimatePresence key={i}>
              {visible && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.85 }}
                  animate={{
                    opacity: isDimmed ? 0.25 : 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  style={{ position: 'relative', display: 'inline-block' }}
                >
                  <span style={{
                    color: part.color,
                    background: isHighlighted ? `${part.color}22` : 'transparent',
                    borderRadius: 4,
                    padding: `${py}px ${px}px`,
                    transition: 'background 0.25s',
                  }}>
                    {part.text}
                  </span>
                  {/* Label below */}
                  {isHighlighted && part.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        position: 'absolute',
                        bottom: compact ? -14 : -18,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontSize: labelFs,
                        color: part.color,
                        whiteSpace: 'nowrap',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600,
                        letterSpacing: '0.3px',
                      }}
                    >
                      ↑ {part.label}
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          )
        })}
      </div>

      {/* Void element note at step 3 */}
      <AnimatePresence>
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              fontSize: compact ? 9 : 10,
              color: YELLOW,
              fontFamily: 'var(--font-mono)',
              textAlign: 'center',
              opacity: 0.8,
            }}
          >
            {'<img>, <br>, <input> — void elements have no closing tag'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
