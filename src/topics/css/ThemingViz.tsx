import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const YELLOW = '#f5c542'
const BLUE   = '#60a5fa'
const PURPLE = '#a78bfa'
const GREEN  = '#4ade80'

const stepLabels = [
  'Declare tokens in :root — available everywhere',
  'Components consume tokens via var()',
  'Light theme — token values applied',
  'Add .dark class — tokens override, everything updates',
  'One variable change propagates to every usage',
]

const lightTokens = { bg: '#f8fafc', text: '#0f172a', accent: '#6366f1' }
const darkTokens  = { bg: '#0f172a', text: '#f8fafc', accent: '#818cf8' }

function MiniCard({ bg, text, accent, label, compact }: {
  bg: string; text: string; accent: string; label: string; compact: boolean
}) {
  return (
    <motion.div
      layout
      animate={{ backgroundColor: bg, borderColor: accent + '88' }}
      transition={{ duration: 0.5 }}
      style={{
        border: '1.5px solid',
        borderRadius: 8, padding: compact ? '8px 10px' : '12px 16px',
        minWidth: compact ? 100 : 130,
      }}
    >
      <motion.div animate={{ color: accent }} transition={{ duration: 0.5 }}
        style={{ fontSize: compact ? 7 : 8, fontFamily: 'var(--font-mono)', fontWeight: 800, marginBottom: 4 }}>
        {label}
      </motion.div>
      <motion.div animate={{ color: text }} transition={{ duration: 0.5 }}
        style={{ fontSize: compact ? 10 : 13, fontWeight: 700, marginBottom: 3 }}>Heading</motion.div>
      <motion.div animate={{ color: text + 'aa' }} transition={{ duration: 0.5 }}
        style={{ fontSize: compact ? 8 : 10 }}>Body text</motion.div>
      <motion.div
        animate={{ backgroundColor: accent, color: bg }}
        transition={{ duration: 0.5 }}
        style={{ marginTop: 6, borderRadius: 4, padding: compact ? '2px 6px' : '3px 8px',
          fontSize: compact ? 8 : 10, fontWeight: 700, textAlign: 'center' as const }}>
        Button
      </motion.div>
    </motion.div>
  )
}

export default function ThemingViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const fs = compact ? 9 : 10
  const isDark = s >= 3

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 18 }}>

      {/* :root block */}
      <AnimatePresence>
        {s <= 2 && (
          <motion.div
            key="root"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            style={{
              background: `${YELLOW}0d`, border: `1px solid ${YELLOW}44`,
              borderRadius: 8, padding: compact ? '8px 12px' : '12px 16px',
              fontFamily: 'var(--font-mono)', fontSize: fs,
            }}
          >
            <div style={{ color: YELLOW, fontWeight: 700, marginBottom: 5 }}>:root {'{'}</div>
            {['--bg: #f8fafc', '--text: #0f172a', '--accent: #6366f1'].map((line, i) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.12 }}
                style={{ color: [BLUE, 'var(--text)', PURPLE][i], paddingLeft: 12, marginBottom: 2 }}
              >
                {line};
              </motion.div>
            ))}
            <div style={{ color: YELLOW }}>{'}'}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dark class override */}
      <AnimatePresence>
        {s >= 3 && (
          <motion.div
            key="dark-rule"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              background: `${PURPLE}0d`, border: `1px solid ${PURPLE}55`,
              borderRadius: 8, padding: compact ? '8px 12px' : '12px 16px',
              fontFamily: 'var(--font-mono)', fontSize: fs,
              boxShadow: `0 0 16px ${PURPLE}22`,
            }}
          >
            <div style={{ color: PURPLE, fontWeight: 700, marginBottom: 4 }}>.dark {'{'}</div>
            <div style={{ color: BLUE, paddingLeft: 12, marginBottom: 2 }}>--bg: #0f172a;</div>
            <div style={{ color: 'var(--text)', paddingLeft: 12, marginBottom: 2 }}>--text: #f8fafc;</div>
            <div style={{ color: PURPLE, paddingLeft: 12, marginBottom: 2 }}>--accent: #818cf8;</div>
            <div style={{ color: PURPLE }}>{'}'}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Arrow down */}
      <AnimatePresence>
        {s >= 1 && s <= 3 && (
          <motion.div
            key="arrow"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0 }}
            style={{ fontSize: 20, color: YELLOW + '88', transformOrigin: 'top' }}
          >↓</motion.div>
        )}
      </AnimatePresence>

      {/* Card or side-by-side */}
      {s < 4 ? (
        <AnimatePresence>
          {s >= 1 && (
            <motion.div key="card" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <MiniCard
                bg={isDark ? darkTokens.bg : lightTokens.bg}
                text={isDark ? darkTokens.text : lightTokens.text}
                accent={isDark ? darkTokens.accent : lightTokens.accent}
                label={isDark ? '.dark applied' : 'Light theme'}
                compact={compact}
              />
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ display: 'flex', gap: compact ? 10 : 16 }}
        >
          <MiniCard {...lightTokens} label="☀ Light" compact={compact} />
          <MiniCard {...darkTokens}  label="🌙 Dark"  compact={compact} />
        </motion.div>
      )}

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={s}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          style={{
            color: [YELLOW, BLUE, BLUE, PURPLE, GREEN][s],
            fontFamily: 'var(--font-mono)', fontSize: compact ? 10 : 11,
            textAlign: 'center', margin: 0, maxWidth: 340,
          }}
        >
          {stepLabels[s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
