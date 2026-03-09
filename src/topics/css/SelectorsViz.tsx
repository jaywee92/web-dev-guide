import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const elements = [
  { tag: 'h1', label: 'h1', color: '#4ade80' },
  { tag: '.title', label: '.title', color: '#5b9cf5' },
  { tag: '#main', label: '#main', color: '#a78bfa' },
]

const stepLabels = [
  'CSS targets elements with selectors',
  '* — targets everything',
  'Type selector — matches by tag name',
  'Class selector — reusable',
  'ID wins — specificity determines which rule applies',
]

const specificityScores = [
  { type: '0,0,1', label: 'type', color: '#4ade80' },
  { type: '0,1,0', label: 'class', color: '#5b9cf5' },
  { type: '1,0,0', label: 'ID', color: '#a78bfa' },
]

function getBoxHighlight(step: number, idx: number): string {
  if (step === 0) return '#3f3f46' // all grey
  if (step === 1) return '#f5c542' // universal — all yellow
  if (step === 2 && idx === 0) return elements[0].color // h1 green
  if (step === 2) return '#3f3f46'
  if (step === 3 && idx === 1) return elements[1].color // .title blue
  if (step === 3) return '#3f3f46'
  if (step >= 4) return elements[idx].color // all colored
  return '#3f3f46'
}

function getBoxGlow(step: number, idx: number): string {
  if (step === 1) return '0 0 16px rgba(245,197,66,0.5)'
  if (step === 2 && idx === 0) return `0 0 16px ${elements[0].color}66`
  if (step === 3 && idx === 1) return `0 0 16px ${elements[1].color}66`
  if (step >= 4 && idx === 2) return `0 0 24px ${elements[2].color}99`
  return 'none'
}

export default function SelectorsViz({ step, compact = false }: Props) {
  const boxSize = compact ? 64 : 88
  const fontSize = compact ? 11 : 13

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>

      {/* Element boxes */}
      <div style={{ display: 'flex', gap: compact ? 12 : 20, alignItems: 'flex-end' }}>
        {elements.map((el, idx) => {
          const bg = getBoxHighlight(step, idx)
          const glow = getBoxGlow(step, idx)
          return (
            <motion.div
              key={el.tag}
              animate={{ backgroundColor: bg, boxShadow: glow }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              style={{
                width: boxSize,
                height: boxSize,
                borderRadius: 8,
                border: `2px solid ${bg === '#3f3f46' ? '#52525b' : bg}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
              }}
            >
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: fontSize - 1,
                fontWeight: 700,
                color: bg === '#3f3f46' ? '#a1a1aa' : '#09090b',
              }}>
                {el.label}
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: fontSize - 3,
                color: bg === '#3f3f46' ? '#71717a' : '#09090b',
                opacity: 0.8,
              }}>
                {el.tag === '.title' ? '<div>' : `<${el.tag === '#main' ? 'section' : el.tag}>`}
              </span>
            </motion.div>
          )
        })}
      </div>

      {/* Selector label shown at each step */}
      <AnimatePresence mode="wait">
        {step >= 1 && (
          <motion.div
            key={`selector-${step}`}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: fontSize,
              color: step === 1 ? '#f5c542' : step === 2 ? elements[0].color : step === 3 ? elements[1].color : elements[2].color,
              background: 'rgba(0,0,0,0.3)',
              padding: '4px 12px',
              borderRadius: 4,
            }}
          >
            {step === 1 && '* { color: yellow }'}
            {step === 2 && 'h1 { color: green }'}
            {step === 3 && '.title { color: blue }'}
            {step >= 4 && '#main { color: purple }'}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Specificity pyramid — step 4 */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            style={{ display: 'flex', gap: 8, alignItems: 'center' }}
          >
            {specificityScores.map((s, i) => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  padding: '4px 10px',
                  borderRadius: 4,
                  background: `${s.color}22`,
                  border: `1px solid ${s.color}`,
                  fontFamily: 'var(--font-mono)',
                  fontSize: compact ? 9 : 11,
                  color: s.color,
                  textAlign: 'center',
                }}>
                  <div style={{ fontWeight: 700 }}>{s.type}</div>
                  <div style={{ opacity: 0.8 }}>{s.label}</div>
                </div>
                {i < specificityScores.length - 1 && (
                  <span style={{ color: '#71717a', fontSize: 14 }}>{'<'}</span>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          style={{
            color: step === 0 ? '#a1a1aa'
              : step === 1 ? '#f5c542'
              : step === 2 ? elements[0].color
              : step === 3 ? elements[1].color
              : elements[2].color,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            textAlign: 'center',
          }}
        >
          {stepLabels[Math.min(step, stepLabels.length - 1)]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
