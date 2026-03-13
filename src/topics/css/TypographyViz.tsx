import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const CYAN   = '#22d3ee'
const GREEN  = '#4ade80'
const PURPLE = '#a78bfa'
const RED    = '#f87171'

const stepLabels = [
  'Typography directly impacts readability and comprehension',
  'font-family — personality and legibility of your text',
  'font-size — hierarchical contrast guides the eye',
  'line-height — breathing room between lines',
  'font-weight and letter-spacing — emphasis and rhythm',
]

const SAMPLE = 'The quick brown fox jumps over the lazy dog.'

export default function TypographyViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const gap = compact ? 10 : 16

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap }}>
      <AnimatePresence mode="wait">

        {/* Step 0: Readable vs unreadable */}
        {s === 0 && (
          <motion.div key="contrast" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', gap: compact ? 8 : 14, width: '100%', maxWidth: compact ? 300 : 400 }}>
            <div style={{ flex: 1, background: `${RED}0d`, border: `1px solid ${RED}33`, borderRadius: 8, padding: compact ? 8 : 12 }}>
              <div style={{ fontSize: compact ? 7 : 8, fontFamily: 'var(--font-mono)', color: RED, fontWeight: 700, marginBottom: 6 }}>✗ Hard to read</div>
              <div style={{ fontSize: compact ? 8 : 9, lineHeight: 1.1, fontFamily: 'cursive', color: 'var(--text-muted)', letterSpacing: '-0.5px' }}>{SAMPLE}</div>
            </div>
            <div style={{ flex: 1, background: `${GREEN}0d`, border: `1px solid ${GREEN}33`, borderRadius: 8, padding: compact ? 8 : 12, boxShadow: `0 0 14px ${GREEN}14` }}>
              <div style={{ fontSize: compact ? 7 : 8, fontFamily: 'var(--font-mono)', color: GREEN, fontWeight: 700, marginBottom: 6 }}>✓ Readable</div>
              <div style={{ fontSize: compact ? 10 : 13, lineHeight: 1.65, color: 'var(--text)' }}>{SAMPLE}</div>
            </div>
          </motion.div>
        )}

        {/* Step 1: font-family */}
        {s === 1 && (
          <motion.div key="family" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10, width: '100%', maxWidth: compact ? 280 : 360 }}>
            {[
              { family: 'system-ui, sans-serif', label: 'sans-serif', color: GREEN },
              { family: 'Georgia, serif',         label: 'serif',      color: PURPLE },
              { family: 'var(--font-mono)',       label: 'monospace',  color: CYAN },
            ].map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.12 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: `${f.color}0a`, border: `1px solid ${f.color}33`,
                  borderRadius: 7, padding: compact ? '6px 10px' : '8px 14px',
                }}
              >
                <span style={{ fontSize: compact ? 7 : 8, fontFamily: 'var(--font-mono)', color: f.color, fontWeight: 700, width: compact ? 56 : 72, flexShrink: 0 }}>{f.label}</span>
                <span style={{ fontFamily: f.family, fontSize: compact ? 11 : 14, color: 'var(--text)' }}>Aa Bb Cc 123</span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 2: font-size scale */}
        {s === 2 && (
          <motion.div key="size" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: compact ? 4 : 6, width: '100%', maxWidth: compact ? 280 : 360 }}>
            {[
              { size: compact ? 9  : 12, label: '12px', color: RED + 'aa',  note: 'too small'       },
              { size: compact ? 11 : 14, label: '14px', color: '#f5c542',   note: 'acceptable'      },
              { size: compact ? 13 : 16, label: '16px', color: GREEN,       note: '← browser default' },
              { size: compact ? 15 : 20, label: '20px', color: CYAN,        note: 'heading'         },
              { size: compact ? 18 : 28, label: '28px', color: PURPLE,      note: 'display'         },
            ].map((r, i) => (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{ display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <span style={{ fontSize: compact ? 7 : 8, fontFamily: 'var(--font-mono)', color: r.color, width: compact ? 28 : 36, flexShrink: 0 }}>{r.label}</span>
                <span style={{ fontSize: r.size, color: 'var(--text)', lineHeight: 1.2 }}>Aa</span>
                <span style={{ fontSize: compact ? 7 : 8, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{r.note}</span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 3: line-height */}
        {s === 3 && (
          <motion.div key="lh" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', gap: compact ? 10 : 16, width: '100%', maxWidth: compact ? 300 : 400 }}>
            {[
              { lh: 1.0, label: 'line-height: 1.0', color: RED,   note: 'cramped'      },
              { lh: 1.6, label: 'line-height: 1.6', color: GREEN, note: 'comfortable'  },
            ].map(({ lh, label, color, note }) => (
              <div key={lh} style={{ flex: 1, background: `${color}0a`, border: `1px solid ${color}33`, borderRadius: 8, padding: compact ? 8 : 12 }}>
                <div style={{ fontSize: compact ? 7 : 8, fontFamily: 'var(--font-mono)', color, fontWeight: 700, marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: compact ? 7 : 8, color: color + '88', fontFamily: 'var(--font-mono)', marginBottom: 5 }}>{note}</div>
                <div style={{ fontSize: compact ? 9 : 12, lineHeight: lh, color: 'var(--text)' }}>
                  Typography sets the tone. Good line-height makes text easy to follow.
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Step 4: weight + spacing */}
        {s === 4 && (
          <motion.div key="weight" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10, width: '100%', maxWidth: compact ? 280 : 360 }}>
            {[300, 400, 600, 700, 900].map((w, i) => (
              <motion.div
                key={w}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{ display: 'flex', alignItems: 'center', gap: 10 }}
              >
                <span style={{ fontSize: compact ? 7 : 8, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', width: compact ? 28 : 36, flexShrink: 0 }}>{w}</span>
                <span style={{ fontSize: compact ? 12 : 15, fontWeight: w, color: 'var(--text)' }}>Font Weight</span>
              </motion.div>
            ))}
            <div style={{ marginTop: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {['-0.05em', '0em', '0.1em', '0.25em'].map((ls) => (
                <div key={ls} style={{ fontSize: compact ? 9 : 11, letterSpacing: ls, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  letter-spacing: {ls}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={s}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          style={{
            color: [GREEN, GREEN, CYAN, GREEN, PURPLE][s],
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
