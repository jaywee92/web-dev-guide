import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const ORANGE = '#fb923c'
const BLUE   = '#60a5fa'
const GREEN  = '#4ade80'
const PURPLE = '#a78bfa'
const RED    = '#f87171'

const stepLabels = [
  'overflow: visible — content bleeds outside the box',
  'overflow: hidden — content clipped at the boundary',
  'overflow: scroll — scrollbar always shown',
  'overflow: auto — scrollbar only when content overflows',
  'text-overflow: ellipsis — truncate with ...',
]

const LONG_TEXT = 'This is a long piece of text that definitely exceeds the container width and height when rendered at this font size.'

const colors   = [RED, ORANGE, BLUE, GREEN, PURPLE]
const cssRules = [
  'overflow: visible',
  'overflow: hidden',
  'overflow: scroll',
  'overflow: auto',
  'overflow: hidden\nwhite-space: nowrap\ntext-overflow: ellipsis',
]

export default function OverflowViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const color = colors[s]
  const w = compact ? 160 : 200
  const h = compact ? 70  : 90

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 18 }}>

      {/* CSS rule badge */}
      <AnimatePresence mode="wait">
        <motion.div
          key={s}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          style={{
            fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 10,
            color, background: `${color}18`, border: `1px solid ${color}44`,
            borderRadius: 6, padding: compact ? '4px 10px' : '5px 14px',
            whiteSpace: 'pre' as const, textAlign: 'center' as const,
          }}
        >
          {cssRules[s]}
        </motion.div>
      </AnimatePresence>

      {/* Container demo */}
      <div style={{ position: 'relative' }}>
        <motion.div
          animate={{ borderColor: color + 'cc', boxShadow: `0 0 18px ${color}22` }}
          transition={{ duration: 0.4 }}
          style={{
            width: w, height: h,
            border: `2px solid`,
            borderRadius: 8,
            background: 'rgba(255,255,255,0.03)',
            position: 'relative',
            overflow: s === 0 ? 'visible' : s === 1 ? 'hidden' : s === 2 ? 'scroll' : s === 3 ? 'auto' : 'hidden',
            whiteSpace: s === 4 ? 'nowrap' as const : 'normal' as const,
          }}
        >
          {/* Overflow indicator for step 0 */}
          {s === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                position: 'absolute', top: -18, right: -2,
                fontSize: compact ? 7 : 8, fontFamily: 'var(--font-mono)',
                color: RED, background: `${RED}18`, border: `1px solid ${RED}44`,
                borderRadius: 3, padding: '1px 5px', whiteSpace: 'nowrap',
              }}
            >⚠ bleed</motion.div>
          )}

          <div style={{
            padding: compact ? '6px 8px' : '8px 10px',
            fontSize: compact ? 9 : 11,
            color: 'var(--text)',
            lineHeight: 1.5,
            overflow: s === 4 ? 'hidden' : undefined,
            textOverflow: s === 4 ? 'ellipsis' : undefined,
          }}>
            {LONG_TEXT}
          </div>

          {/* Simulated scrollbar for step 2 */}
          {s === 2 && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              style={{
                position: 'absolute', right: 2, top: 4, bottom: 4,
                width: compact ? 4 : 5, borderRadius: 3,
                background: BLUE + '44',
                transformOrigin: 'top',
              }}
            >
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                style={{
                  width: '100%', height: compact ? 14 : 18,
                  borderRadius: 3, background: BLUE,
                }}
              />
            </motion.div>
          )}
        </motion.div>

        {/* Clip indicator for step 1 */}
        {s === 1 && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            style={{
              position: 'absolute', bottom: -6, left: 0, right: 0,
              height: 2, background: `linear-gradient(90deg, transparent, ${ORANGE}, transparent)`,
              transformOrigin: 'left',
            }}
          />
        )}
      </div>

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={s}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          style={{
            color,
            fontFamily: 'var(--font-mono)', fontSize: compact ? 10 : 11,
            textAlign: 'center', margin: 0, maxWidth: 320,
          }}
        >
          {stepLabels[s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
