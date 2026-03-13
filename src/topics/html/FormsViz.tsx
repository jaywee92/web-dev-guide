import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const BLUE   = '#60a5fa'
const RED    = '#f87171'
const GREEN  = '#4ade80'
const PURPLE = '#a78bfa'

const stepLabels = [
  'Empty state — placeholder guides the user',
  'Focus state — input highlighted, label floats',
  'Invalid — validation error shown inline',
  'Valid — constraint satisfied, ready to submit',
  'Submit lifecycle — loading → success',
]

const inputValues: Record<number, string> = {
  0: '',
  1: 'alice@',
  2: 'alice@',
  3: 'alice@example.com',
  4: 'alice@example.com',
}

const borderColors: Record<number, string> = {
  0: 'rgba(255,255,255,0.15)',
  1: BLUE,
  2: RED,
  3: GREEN,
  4: GREEN,
}

export default function FormsViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const fs = compact ? 10 : 13
  const gap = compact ? 8 : 12

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 18 }}>

      <div style={{
        width: '100%', maxWidth: compact ? 240 : 300,
        display: 'flex', flexDirection: 'column', gap,
      }}>
        {/* Email input */}
        <div style={{ position: 'relative' }}>
          {/* Floating label */}
          <AnimatePresence>
            {s >= 1 && (
              <motion.label
                key="label"
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: compact ? -14 : -18, opacity: 1, fontSize: compact ? 8 : 10 }}
                exit={{ y: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                style={{
                  position: 'absolute', left: compact ? 8 : 10, top: compact ? 9 : 12,
                  fontFamily: 'var(--font-mono)',
                  color: borderColors[s],
                  pointerEvents: 'none',
                  transformOrigin: 'left',
                  zIndex: 1,
                  background: 'var(--surface, #0f1322)',
                  padding: '0 3px',
                }}
              >
                email
              </motion.label>
            )}
          </AnimatePresence>

          {/* Input box */}
          <motion.div
            animate={{
              borderColor: borderColors[s],
              boxShadow: s === 1 ? `0 0 0 3px ${BLUE}33` : s === 2 ? `0 0 0 3px ${RED}22` : s >= 3 ? `0 0 0 2px ${GREEN}22` : 'none',
            }}
            transition={{ duration: 0.35 }}
            style={{
              border: '1.5px solid',
              borderRadius: 8,
              padding: compact ? '8px 10px' : '11px 14px',
              background: 'rgba(255,255,255,0.04)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              minHeight: compact ? 34 : 44,
            }}
          >
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: fs,
              color: s === 0 ? 'var(--text-muted)' : 'var(--text)',
            }}>
              {s === 0 ? 'you@example.com' : inputValues[s]}
              {s >= 1 && s <= 2 && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.9 }}
                  style={{ borderLeft: `2px solid ${BLUE}`, marginLeft: 1 }}
                >
                  &nbsp;
                </motion.span>
              )}
            </span>

            {/* Validation icon */}
            <AnimatePresence>
              {s === 2 && (
                <motion.span
                  key="err-icon"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ fontSize: compact ? 12 : 16 }}
                >❌</motion.span>
              )}
              {s >= 3 && (
                <motion.span
                  key="ok-icon"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  style={{ fontSize: compact ? 12 : 16 }}
                >✅</motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Error message */}
          <AnimatePresence>
            {s === 2 && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: -4, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  overflow: 'hidden',
                  fontSize: compact ? 8 : 10,
                  fontFamily: 'var(--font-mono)',
                  color: RED,
                  paddingTop: 4,
                  paddingLeft: 4,
                }}
              >
                ⚠ Please enter a valid email address
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Submit button */}
        <motion.div
          animate={{
            background: s === 4 ? GREEN : s >= 3 ? PURPLE : 'rgba(255,255,255,0.07)',
            borderColor: s >= 3 ? (s === 4 ? GREEN : PURPLE) : 'rgba(255,255,255,0.12)',
          }}
          transition={{ duration: 0.4 }}
          style={{
            border: '1.5px solid',
            borderRadius: 8,
            padding: compact ? '8px 0' : '11px 0',
            textAlign: 'center' as const,
            cursor: 'default',
          }}
        >
          <AnimatePresence mode="wait">
            {s < 3 && (
              <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ fontFamily: 'var(--font-mono)', fontSize: fs, color: 'var(--text-muted)' }}>
                Submit
              </motion.span>
            )}
            {s === 3 && (
              <motion.span key="ready" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ fontFamily: 'var(--font-mono)', fontSize: fs, color: '#fff', fontWeight: 700 }}>
                Submit →
              </motion.span>
            )}
            {s === 4 && (
              <motion.span key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                style={{ fontFamily: 'var(--font-mono)', fontSize: fs, color: '#fff', fontWeight: 700 }}>
                ✓ Sent!
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
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
            color: [BLUE, BLUE, RED, GREEN, GREEN][s],
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
