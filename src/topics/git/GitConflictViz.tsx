import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

export default function GitConflictViz({ step, compact = false }: Props) {
  const mono = 'var(--font-mono)'
  const sz = compact ? 11 : 13

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 14 : 20, width: '100%' }}>
      <AnimatePresence mode="wait">

        {/* Step 0: Two branches edit the same line */}
        {step === 0 && (
          <motion.div key="s0" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <div style={{ display: 'flex', gap: compact ? 10 : 16, alignItems: 'flex-start' }}>
              {[
                { branch: 'main', line: 'color: blue;', color: '#5b9cf5', dev: '👩‍💻' },
                { branch: 'feature', line: 'color: red;', color: '#f43f5e', dev: '👨‍💻' },
              ].map((b, i) => (
                <motion.div key={b.branch}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2, type: 'spring', stiffness: 260, damping: 22 }}
                  style={{
                    padding: compact ? '10px 12px' : '12px 16px', borderRadius: 10,
                    background: b.color + '12', border: `2px solid ${b.color}`,
                    display: 'flex', flexDirection: 'column', gap: 6,
                  }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: compact ? 16 : 20 }}>{b.dev}</span>
                    <span style={{ fontFamily: mono, fontSize: sz - 2, color: b.color, fontWeight: 700 }}>{b.branch}</span>
                  </div>
                  <code style={{ fontFamily: mono, fontSize: sz - 2, color: b.color, background: b.color + '15', padding: '2px 6px', borderRadius: 4 }}>
                    {b.line}
                  </code>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              style={{
                fontFamily: mono, fontSize: sz - 1, color: '#fbbf24',
                padding: compact ? '6px 12px' : '8px 16px', borderRadius: 8,
                background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)',
              }}>
              ⚠️ both edited the same line → conflict!
            </motion.div>
          </motion.div>
        )}

        {/* Step 1: Conflict markers in the file */}
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{ fontFamily: mono, fontSize: sz - 1, color: '#fbbf24', fontWeight: 700, marginBottom: 4 }}>
              git merge inserts markers
            </div>
            <div style={{
              padding: compact ? '10px 14px' : '12px 18px', borderRadius: 10,
              background: '#0a0e1a', border: '1px solid #2e3348',
              display: 'flex', flexDirection: 'column', gap: 2,
              width: '100%', maxWidth: 300,
            }}>
              {[
                { text: '<<<<<<< HEAD',         color: '#5b9cf5' },
                { text: '  color: blue;',        color: '#5b9cf5' },
                { text: '=======',               color: '#fbbf24' },
                { text: '  color: red;',         color: '#f43f5e' },
                { text: '>>>>>>> feature',       color: '#f43f5e' },
              ].map((line, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{ fontFamily: mono, fontSize: sz - 2, color: line.color }}>
                  {line.text}
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              style={{ fontFamily: mono, fontSize: sz - 2, color: '#6b7485', textAlign: 'center' }}>
              HEAD = your current branch · the other side = incoming
            </motion.div>
          </motion.div>
        )}

        {/* Step 2: Choose / combine to resolve */}
        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div style={{ fontFamily: mono, fontSize: sz - 1, color: '#4ade80', fontWeight: 700, marginBottom: 4 }}>
              edit the file — keep what you want
            </div>
            <div style={{ display: 'flex', gap: compact ? 8 : 12, alignItems: 'center' }}>
              {[
                { label: 'keep mine', code: 'color: blue;', color: '#5b9cf5' },
                { label: 'keep theirs', code: 'color: red;', color: '#f43f5e' },
                { label: 'combine both', code: 'color: purple;', color: '#a78bfa' },
              ].map((opt, i) => (
                <motion.div key={opt.label}
                  initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.15, type: 'spring', stiffness: 260, damping: 22 }}
                  style={{
                    padding: compact ? '8px 10px' : '10px 14px', borderRadius: 9,
                    background: opt.color + '12', border: `1.5px solid ${opt.color}`,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                    textAlign: 'center',
                  }}>
                  <span style={{ fontFamily: mono, fontSize: sz - 3, color: opt.color, fontWeight: 700 }}>{opt.label}</span>
                  <code style={{ fontFamily: mono, fontSize: sz - 3, color: opt.color, opacity: 0.8 }}>{opt.code}</code>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              style={{ fontFamily: mono, fontSize: sz - 2, color: '#6b7485', textAlign: 'center' }}>
              remove all &lt;&lt;&lt;, ===, &gt;&gt;&gt; markers from the file
            </motion.div>
          </motion.div>
        )}

        {/* Step 3: Mark resolved and commit */}
        {step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            {[
              { icon: '✏️', label: 'edit conflict file',    code: '(remove markers)',          color: '#fbbf24', delay: 0    },
              { icon: '📋', label: 'mark as resolved',      code: 'git add style.css',         color: '#4ade80', delay: 0.15 },
              { icon: '🗄️', label: 'finish the merge',      code: 'git commit',                color: '#5b9cf5', delay: 0.3  },
            ].map(item => (
              <motion.div key={item.label}
                initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: item.delay, type: 'spring', stiffness: 260, damping: 22 }}
                style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', maxWidth: 300 }}>
                <div style={{
                  width: compact ? 32 : 38, height: compact ? 32 : 38, borderRadius: 8,
                  background: item.color + '15', border: `1.5px solid ${item.color}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: compact ? 14 : 18, flexShrink: 0,
                }}>{item.icon}</div>
                <div>
                  <div style={{ fontFamily: mono, fontSize: sz - 2, color: item.color, fontWeight: 700 }}>{item.label}</div>
                  <code style={{ fontFamily: mono, fontSize: sz - 3, color: '#6b7485' }}>{item.code}</code>
                </div>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              style={{ fontFamily: mono, fontSize: sz - 2, color: '#4ade80', marginTop: 4 }}>
              ✅ conflict resolved — merge complete
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
