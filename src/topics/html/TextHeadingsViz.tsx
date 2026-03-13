import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const BLUE   = '#60a5fa'
const PURPLE = '#a78bfa'
const CYAN   = '#22d3ee'
const GREEN  = '#4ade80'

const stepLabels = [
  '<h1> — one per page, the main document title',
  '<h2> — major sections, multiple per page',
  '<h3> — sub-sections within an h2',
  '<strong> and <em> — inline emphasis within text',
  'Semantic structure vs visual-only markup',
]

function HeadingRow({ tag, text, color, indent = 0, size = 16, compact = false }: {
  tag: string; text: string; color: string; indent?: number; size?: number; compact?: boolean
}) {
  const fs = compact ? size * 0.75 : size
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: indent }}
    >
      <span style={{
        fontSize: compact ? 7 : 8, fontFamily: 'var(--font-mono)', fontWeight: 700,
        color, background: `${color}18`, border: `1px solid ${color}44`,
        borderRadius: 3, padding: '1px 5px', flexShrink: 0,
      }}>{tag}</span>
      <span style={{ fontSize: fs, fontWeight: 700, color: 'var(--text)', lineHeight: 1.2 }}>{text}</span>
    </motion.div>
  )
}

export default function TextHeadingsViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const gap = compact ? 6 : 10
  const RED = '#f87171'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 18 }}>

      {s < 4 ? (
        /* Steps 0-3: Building heading hierarchy */
        <div style={{
          width: '100%', maxWidth: compact ? 280 : 360,
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 10, padding: compact ? 14 : 20,
          display: 'flex', flexDirection: 'column', gap,
        }}>
          <AnimatePresence>
            {s >= 0 && (
              <motion.div key="h1" style={{ paddingBottom: s >= 1 ? gap : 0 }}>
                <HeadingRow tag="h1" text="Getting Started with Git" color={BLUE} size={18} compact={compact} />
                <AnimatePresence>
                  {s === 0 && (
                    <motion.span
                      key="badge"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        marginLeft: compact ? 44 : 56, fontSize: compact ? 7 : 8,
                        fontFamily: 'var(--font-mono)', color: BLUE,
                        background: `${BLUE}18`, border: `1px solid ${BLUE}44`,
                        borderRadius: 3, padding: '1px 6px',
                      }}
                    >1× per page</motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {s >= 1 && (
              <motion.div key="h2s" style={{ display: 'flex', flexDirection: 'column', gap }}>
                <HeadingRow tag="h2" text="Installation" color={PURPLE} indent={compact ? 10 : 16} size={15} compact={compact} />
                <HeadingRow tag="h2" text="Basic Commands" color={PURPLE} indent={compact ? 10 : 16} size={15} compact={compact} />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {s >= 2 && (
              <motion.div key="h3s" style={{ display: 'flex', flexDirection: 'column', gap }}>
                <HeadingRow tag="h3" text="git init" color={CYAN} indent={compact ? 24 : 36} size={13} compact={compact} />
                <HeadingRow tag="h3" text="git add" color={CYAN} indent={compact ? 24 : 36} size={13} compact={compact} />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {s === 3 && (
              <motion.div
                key="inline"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  fontSize: compact ? 10 : 12, color: 'var(--text-muted)',
                  lineHeight: 1.7, paddingLeft: compact ? 10 : 16,
                  borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: gap,
                }}
              >
                Use{' '}
                <span style={{ fontWeight: 700, color: 'var(--text)', background: `${GREEN}18`, borderRadius: 3, padding: '0 3px' }}>
                  &lt;strong&gt;
                </span>
                {' '}for important text and{' '}
                <span style={{ fontStyle: 'italic', color: PURPLE, background: `${PURPLE}18`, borderRadius: 3, padding: '0 3px' }}>
                  &lt;em&gt;
                </span>
                {' '}for emphasis.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        /* Step 4: Semantic vs div-soup comparison */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ display: 'flex', gap: compact ? 10 : 16, width: '100%', maxWidth: compact ? 300 : 400 }}
        >
          {/* Bad: div soup */}
          <div style={{
            flex: 1, background: `${RED}0a`, border: `1px solid ${RED}33`,
            borderRadius: 8, padding: compact ? 10 : 14,
            display: 'flex', flexDirection: 'column', gap: 5, opacity: 0.7,
          }}>
            <div style={{ fontSize: compact ? 7 : 8, fontFamily: 'var(--font-mono)', color: RED, fontWeight: 700, marginBottom: 4 }}>✗ DIV SOUP</div>
            {['div.big', 'div.medium', 'div.medium', 'div.small'].map((t, i) => (
              <div key={i} style={{
                fontSize: compact ? 8 : 9, fontFamily: 'var(--font-mono)',
                color: `${RED}bb`, paddingLeft: i > 0 ? (compact ? 8 : 12) : 0,
              }}>{t}</div>
            ))}
          </div>
          {/* Good: semantic */}
          <div style={{
            flex: 1, background: `${GREEN}0a`, border: `1px solid ${GREEN}44`,
            borderRadius: 8, padding: compact ? 10 : 14,
            display: 'flex', flexDirection: 'column', gap: 5,
            boxShadow: `0 0 18px ${GREEN}18`,
          }}>
            <div style={{ fontSize: compact ? 7 : 8, fontFamily: 'var(--font-mono)', color: GREEN, fontWeight: 700, marginBottom: 4 }}>✓ SEMANTIC</div>
            {['h1', 'h2', 'h2', 'h3'].map((t, i) => (
              <div key={i} style={{
                fontSize: compact ? 8 : 9, fontFamily: 'var(--font-mono)',
                color: [BLUE, PURPLE, PURPLE, CYAN][i],
                paddingLeft: [0, compact ? 8 : 12, compact ? 8 : 12, compact ? 16 : 24][i],
                fontWeight: 700,
              }}>{`<${t}>`}</div>
            ))}
          </div>
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
            color: [BLUE, PURPLE, CYAN, GREEN, GREEN][s],
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
