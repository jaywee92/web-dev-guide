import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const AMBER = '#f59e0b'
const BLUE  = '#60a5fa'
const GREEN = '#4ade80'
const RED   = '#f87171'

const stepLabels = [
  'A plain <div> — invisible to assistive tech',
  'role="button" — announces element type to screen readers',
  'aria-label — gives the element a readable name',
  'Keyboard focus — navigable with Tab key',
  'Screen reader reads: "Submit form, button"',
]

const srText = 'Submit form, button'

export default function AccessibilityViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const fs = compact ? 10 : 12
  const gap = compact ? 10 : 16

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap }}>
      {/* Element box */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>

        {/* The "element" */}
        <motion.div
          animate={{
            boxShadow: s === 3 ? `0 0 0 3px ${BLUE}, 0 0 0 6px ${BLUE}44` : 'none',
            borderColor: s >= 1 ? AMBER + 'cc' : RED + '88',
          }}
          transition={{ duration: 0.4 }}
          style={{
            width: compact ? 120 : 160,
            padding: compact ? '10px 16px' : '14px 28px',
            border: '2px solid',
            borderRadius: 10,
            background: 'rgba(255,255,255,0.04)',
            textAlign: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: compact ? 12 : 14,
            color: 'var(--text)',
            fontWeight: 600,
            position: 'relative',
          }}
        >
          Submit

          {/* Not accessible warning */}
          <AnimatePresence>
            {s === 0 && (
              <motion.div
                key="warn"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'absolute', top: -22, left: '50%', transform: 'translateX(-50%)',
                  fontSize: compact ? 8 : 9, fontFamily: 'var(--font-mono)', fontWeight: 700,
                  color: RED, background: `${RED}18`, border: `1px solid ${RED}55`,
                  borderRadius: 4, padding: '2px 7px', whiteSpace: 'nowrap',
                }}
              >
                ⚠ Not accessible
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ARIA attribute chips */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'flex-start' }}>
          <AnimatePresence>
            {s >= 1 && (
              <motion.div
                key="role"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                style={{
                  fontSize: fs, fontFamily: 'var(--font-mono)', fontWeight: 700,
                  color: AMBER, background: `${AMBER}18`, border: `1px solid ${AMBER}55`,
                  borderRadius: 5, padding: compact ? '2px 8px' : '3px 10px',
                }}
              >
                role=<span style={{ color: '#fff' }}>"button"</span>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {s >= 2 && (
              <motion.div
                key="label"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24, delay: 0.1 }}
                style={{
                  fontSize: fs, fontFamily: 'var(--font-mono)', fontWeight: 700,
                  color: BLUE, background: `${BLUE}18`, border: `1px solid ${BLUE}55`,
                  borderRadius: 5, padding: compact ? '2px 8px' : '3px 10px',
                }}
              >
                aria-label=<span style={{ color: '#fff' }}>"Submit form"</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Keyboard indicator */}
        <AnimatePresence>
          {s === 3 && (
            <motion.div
              key="kbd"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                fontSize: compact ? 9 : 11, fontFamily: 'var(--font-mono)',
                color: BLUE, background: `${BLUE}18`, border: `1px solid ${BLUE}44`,
                borderRadius: 6, padding: compact ? '4px 8px' : '5px 12px',
              }}
            >
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              >⇥ Tab</motion.span>
              <span style={{ color: 'var(--text-muted)' }}>→ focus visible</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Screen reader bubble */}
        <AnimatePresence>
          {s === 4 && (
            <motion.div
              key="sr"
              initial={{ opacity: 0, scale: 0.85, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              style={{
                background: '#1a2a1a', border: `1.5px solid ${GREEN}88`,
                borderRadius: 8, padding: compact ? '8px 12px' : '10px 16px',
                maxWidth: compact ? 180 : 240,
                boxShadow: `0 0 20px ${GREEN}22`,
              }}
            >
              <div style={{ fontSize: compact ? 8 : 9, fontFamily: 'var(--font-mono)', color: GREEN, marginBottom: 4, fontWeight: 700 }}>
                🔊 SCREEN READER
              </div>
              <div style={{ fontSize: compact ? 10 : 12, fontFamily: 'var(--font-mono)', color: '#d1fae5' }}>
                "{srText}"
              </div>
              <div style={{ marginTop: 6 }}>
                <span style={{
                  fontSize: compact ? 8 : 9, fontFamily: 'var(--font-mono)', fontWeight: 800,
                  color: GREEN, background: `${GREEN}22`, border: `1px solid ${GREEN}55`,
                  borderRadius: 3, padding: '1px 6px',
                }}>✓ Accessible</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
            color: [RED, AMBER, BLUE, BLUE, GREEN][s],
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
