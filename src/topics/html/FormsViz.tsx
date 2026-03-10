import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const BLUE = '#5b9cf5'
const PURPLE = '#a78bfa'
const YELLOW = '#f5c542'
const GREEN = '#4ade80'
const ORANGE = '#fb923c'

const stepLabels = [
  'A <form> collects user input',
  '<label> + <input> — linked pair',
  '<select> — dropdown choice',
  '<input type="checkbox"> vs <input type="radio">',
  '<button type="submit"> — sends data to server',
]

export default function FormsViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const fontSize = compact ? 10 : 12
  const fieldPad = compact ? '3px 7px' : '5px 10px'
  const gap = compact ? 6 : 8

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 8 : 14 }}>
      {/* Form container */}
      <motion.div
        animate={{
          borderColor: s === 4 ? GREEN : BLUE,
          boxShadow: s === 4 ? `0 0 20px ${GREEN}44` : '0 0 0px transparent',
        }}
        transition={{ duration: 0.4 }}
        style={{
          border: '2px solid',
          borderRadius: 8,
          padding: compact ? 10 : 14,
          width: compact ? 200 : 260,
          display: 'flex',
          flexDirection: 'column',
          gap,
          fontFamily: 'var(--font-mono)',
          fontSize,
          background: 'var(--surface)',
          minHeight: compact ? 50 : 60,
        }}
      >
        {/* <form> label */}
        <span style={{ fontSize: compact ? 9 : 10, color: BLUE, fontWeight: 700, opacity: 0.7, letterSpacing: '0.5px' }}>
          &lt;form&gt;
        </span>

        {/* Step 1: label + input with blinking cursor */}
        <AnimatePresence>
          {s >= 1 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ color: PURPLE, fontSize: compact ? 9 : 11 }}>
                  &lt;label for="email"&gt;Email&lt;/label&gt;
                </span>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: `1.5px solid ${PURPLE}`,
                  borderRadius: 4,
                  padding: fieldPad,
                  background: `${PURPLE}08`,
                }}>
                  <span style={{ color: '#c4b5fd', fontSize: compact ? 9 : 11, flex: 1 }}>
                    user@example.com
                  </span>
                  {/* Blinking cursor */}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    style={{ color: PURPLE, fontSize: compact ? 11 : 13, lineHeight: 1 }}
                  >
                    |
                  </motion.span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 2: select dropdown */}
        <AnimatePresence>
          {s >= 2 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ color: YELLOW, fontSize: compact ? 9 : 11 }}>
                  &lt;label&gt;Role&lt;/label&gt;
                </span>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: `1.5px solid ${YELLOW}`,
                  borderRadius: 4,
                  padding: fieldPad,
                  background: `${YELLOW}08`,
                  justifyContent: 'space-between',
                }}>
                  <span style={{ color: '#fde68a', fontSize: compact ? 9 : 11 }}>Developer</span>
                  <span style={{ color: YELLOW, fontSize: compact ? 9 : 11 }}>▾</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3: checkbox + radio */}
        <AnimatePresence>
          {s >= 3 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 4 : 5 }}>
                {/* Checkbox — checked */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 400, damping: 20 }}
                    style={{
                      width: compact ? 12 : 15,
                      height: compact ? 12 : 15,
                      border: `1.5px solid ${ORANGE}`,
                      borderRadius: 3,
                      background: `${ORANGE}22`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ color: ORANGE, fontSize: compact ? 7 : 9, lineHeight: 1 }}>✓</span>
                  </motion.div>
                  <span style={{ color: ORANGE, fontSize: compact ? 9 : 11 }}>Newsletter (checkbox)</span>
                </div>
                {/* Radio — selected */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 400, damping: 20 }}
                    style={{
                      width: compact ? 12 : 15,
                      height: compact ? 12 : 15,
                      border: `1.5px solid ${ORANGE}`,
                      borderRadius: '50%',
                      background: `${ORANGE}22`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <div style={{ width: compact ? 5 : 7, height: compact ? 5 : 7, borderRadius: '50%', background: ORANGE }} />
                  </motion.div>
                  <span style={{ color: ORANGE, fontSize: compact ? 9 : 11 }}>Senior (radio)</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 4: submit button with glow pulse */}
        <AnimatePresence>
          {s >= 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
            >
              <motion.div
                animate={{ boxShadow: [`0 0 0px ${GREEN}00`, `0 0 14px ${GREEN}88`, `0 0 0px ${GREEN}00`] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                style={{
                  background: GREEN,
                  color: '#052e16',
                  borderRadius: 4,
                  padding: compact ? '5px 0' : '7px 0',
                  fontWeight: 700,
                  fontSize: compact ? 10 : 11,
                  textAlign: 'center',
                  cursor: 'default',
                }}
              >
                Submit →
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={s}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize,
            textAlign: 'center',
            maxWidth: compact ? 200 : 260,
            color: s === 0 ? '#71717a' : s === 1 ? PURPLE : s === 2 ? YELLOW : s === 3 ? ORANGE : GREEN,
          }}
        >
          {stepLabels[s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
