import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const semanticBlocks = [
  { tag: '<header>', color: '#5b9cf5', bg: 'rgba(91,156,245,0.12)', label: '<header> — page header content' },
  { tag: '<nav>', color: '#4ade80', bg: 'rgba(74,222,128,0.12)', label: '<nav> — navigation links' },
  { tag: '<main> + <article>', color: '#a78bfa', bg: 'rgba(167,139,250,0.12)', label: '<main> + <article> — primary content' },
  { tag: '<footer>', color: '#f5c542', bg: 'rgba(245,197,66,0.12)', label: '<footer> — footer content' },
]

const divLabels = ['div.header', 'div.nav', 'div.main', 'div.footer']

const stepLabels = [
  'div soup — no meaning',
  '<header> — page header content',
  '<nav> — navigation links',
  '<main> + <article> — primary content',
  'Semantic HTML — meaning for humans AND machines',
]

export default function SemanticViz({ step, compact = false }: Props) {
  const boxHeight = compact ? 36 : 48
  const fontSize = compact ? 11 : 13
  const gap = compact ? 6 : 8

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap, width: compact ? 220 : 280 }}>
        {divLabels.map((divLabel, i) => {
          const semantic = semanticBlocks[i]
          const isSemantic = step > i
          const isActive = step === i + 1
          const color = isSemantic ? semantic.color : '#6b7280'
          const bg = isSemantic ? semantic.bg : 'rgba(107,114,128,0.08)'
          const displayLabel = isSemantic ? semantic.tag : divLabel

          return (
            <motion.div
              key={i}
              animate={{
                borderColor: color,
                backgroundColor: bg,
                boxShadow: isActive ? `0 0 20px ${color}55` : 'none',
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{
                border: `2px solid ${color}`,
                borderRadius: 6,
                height: boxHeight,
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 12,
                fontFamily: 'var(--font-mono)',
                fontSize,
                fontWeight: 600,
                color,
                transition: 'color 0.4s ease',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={displayLabel}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6 }}
                  transition={{ duration: 0.3 }}
                >
                  {displayLabel}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          style={{
            color: step === 0 ? '#6b7280' : step === 4 ? '#4ade80' : semanticBlocks[step - 1]?.color,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            textAlign: 'center',
            maxWidth: compact ? 220 : 280,
          }}
        >
          {stepLabels[Math.min(step, stepLabels.length - 1)]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
