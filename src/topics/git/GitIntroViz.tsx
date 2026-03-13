import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const AREAS = [
  { label: 'Working Directory', sub: 'your local files', color: '#f43f5e', icon: '📁' },
  { label: 'Staging Area',      sub: 'git add',          color: '#fbbf24', icon: '📋' },
  { label: 'Local Repo',        sub: 'git commit',       color: '#5b9cf5', icon: '🗄️'  },
  { label: 'Remote Repo',       sub: 'git push',         color: '#4ade80', icon: '☁️'  },
]

const ARROW = '→'

export default function GitIntroViz({ step, compact = false }: Props) {
  const mono = 'var(--font-mono)'
  const sz = compact ? 11 : 13

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 14 : 20, width: '100%' }}>

      {/* Step 0: Why Git? — multiple devs problem */}
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="s0" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <div style={{ display: 'flex', gap: compact ? 10 : 16, alignItems: 'center' }}>
              {['👩‍💻', '👨‍💻', '🧑‍💻'].map((e, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.15, type: 'spring', stiffness: 260, damping: 20 }}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                    padding: compact ? '10px 12px' : '14px 18px', borderRadius: 12,
                    background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.4)',
                  }}>
                  <span style={{ fontSize: compact ? 22 : 30 }}>{e}</span>
                  <span style={{ fontFamily: mono, fontSize: sz - 2, color: '#f43f5e' }}>v{i + 1}.{i * 2}</span>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              style={{ fontFamily: mono, fontSize: sz - 1, color: '#f43f5e', textAlign: 'center' }}>
              😰 who has the latest version?
            </motion.div>
          </motion.div>
        )}

        {/* Step 1: Working Directory */}
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              style={{ fontSize: compact ? 36 : 48 }}>📁</motion.div>
            <div style={{
              padding: compact ? '10px 18px' : '14px 24px', borderRadius: 12,
              background: 'rgba(244,63,94,0.1)', border: '2px solid #f43f5e',
              fontFamily: mono, fontSize: sz, color: '#f43f5e', textAlign: 'center',
            }}>
              Working Directory
              <div style={{ fontSize: sz - 2, opacity: 0.7, marginTop: 4 }}>your local files on disk</div>
            </div>
            {['index.html ✏️', 'style.css ✏️', 'app.js'].map((f, i) => (
              <motion.div key={f} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.12 }}
                style={{
                  fontFamily: mono, fontSize: sz - 1, color: f.includes('✏️') ? '#f43f5e' : '#6b7485',
                  padding: '3px 10px', borderRadius: 6,
                  background: f.includes('✏️') ? 'rgba(244,63,94,0.1)' : 'transparent',
                }}>
                {f}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 2: Staging Area */}
        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', alignItems: 'center', gap: compact ? 10 : 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: compact ? 22 : 28 }}>📁</span>
              <span style={{ fontFamily: mono, fontSize: sz - 2, color: '#f43f5e' }}>Working Dir</span>
              {['index.html', 'style.css', 'app.js'].map((f, i) => (
                <motion.div key={f} initial={{ x: 0 }}
                  animate={i < 2 ? { x: [0, 8, 0] } : {}}
                  transition={{ delay: i * 0.2, duration: 0.6, repeat: 1 }}
                  style={{ fontFamily: mono, fontSize: sz - 2, color: i < 2 ? '#fbbf24' : '#6b7485' }}>
                  {f}{i < 2 ? ' →' : ''}
                </motion.div>
              ))}
            </div>
            <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 2 }}
              style={{ fontFamily: mono, fontSize: sz, color: '#fbbf24', fontWeight: 700 }}>
              git add
            </motion.div>
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              padding: compact ? '10px 14px' : '14px 20px', borderRadius: 12,
              background: 'rgba(251,191,36,0.1)', border: '2px solid #fbbf24',
            }}>
              <span style={{ fontSize: compact ? 22 : 28 }}>📋</span>
              <span style={{ fontFamily: mono, fontSize: sz - 2, color: '#fbbf24' }}>Staging Area</span>
              {['index.html ✓', 'style.css ✓'].map((f, i) => (
                <motion.div key={f} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.15 }}
                  style={{ fontFamily: mono, fontSize: sz - 2, color: '#fbbf24' }}>
                  {f}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3: Local Repo (commit) */}
        {step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 10 : 16 }}>
              <div style={{ fontFamily: mono, fontSize: sz - 1, color: '#fbbf24', textAlign: 'center' }}>
                📋 Staging<br/>Area
              </div>
              <motion.div animate={{ x: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
                style={{ fontFamily: mono, fontSize: sz, color: '#5b9cf5', fontWeight: 700 }}>
                git commit →
              </motion.div>
              <div style={{
                padding: compact ? '10px 14px' : '14px 20px', borderRadius: 12,
                background: 'rgba(91,156,245,0.12)', border: '2px solid #5b9cf5',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              }}>
                <span style={{ fontSize: compact ? 22 : 28 }}>🗄️</span>
                <span style={{ fontFamily: mono, fontSize: sz - 2, color: '#5b9cf5' }}>Local Repo</span>
              </div>
            </div>
            {['abc1234 — "add nav"', 'def5678 — "fix bug"', '🆕 now + "style header"'].map((c, i) => (
              <motion.div key={c} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                style={{
                  fontFamily: mono, fontSize: sz - 2,
                  color: i === 2 ? '#5b9cf5' : '#6b7485',
                  fontWeight: i === 2 ? 700 : 400,
                  padding: '3px 10px', borderRadius: 6,
                  background: i === 2 ? 'rgba(91,156,245,0.1)' : 'transparent',
                }}>
                {c}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 4: All 4 areas */}
        {step === 4 && (
          <motion.div key="s4" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', alignItems: 'center', gap: compact ? 4 : 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            {AREAS.map((a, i) => (
              <motion.div key={a.label} style={{ display: 'flex', alignItems: 'center', gap: compact ? 4 : 6 }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.15, type: 'spring', stiffness: 240, damping: 22 }}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                    padding: compact ? '8px 10px' : '12px 14px', borderRadius: 10,
                    background: `${a.color}14`, border: `2px solid ${a.color}`,
                    minWidth: compact ? 64 : 80,
                  }}>
                  <span style={{ fontSize: compact ? 18 : 22 }}>{a.icon}</span>
                  <span style={{ fontFamily: mono, fontSize: sz - 3, color: a.color, fontWeight: 700, textAlign: 'center', lineHeight: 1.3 }}>{a.label}</span>
                  <span style={{ fontFamily: mono, fontSize: sz - 4, color: a.color, opacity: 0.7 }}>{a.sub}</span>
                </motion.div>
                {i < AREAS.length - 1 && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.15 + 0.3 }}
                    style={{ color: '#3a4055', fontSize: compact ? 14 : 18, fontWeight: 700 }}>
                    {ARROW}
                  </motion.span>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
