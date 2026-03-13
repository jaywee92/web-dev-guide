import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

export default function GitUndoViz({ step, compact = false }: Props) {
  const mono = 'var(--font-mono)'
  const sz = compact ? 11 : 13

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 14 : 20, width: '100%' }}>
      <AnimatePresence mode="wait">

        {/* Step 0: 3 undo tools overview */}
        {step === 0 && (
          <motion.div key="s0" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{ fontFamily: mono, fontSize: sz - 1, color: '#6b7485', marginBottom: 4 }}>
              3 ways to undo
            </div>
            {[
              { cmd: 'git restore',  scope: 'working dir changes', safe: true,  color: '#4ade80',  icon: '🔄' },
              { cmd: 'git reset',    scope: 'uncommit (local only)', safe: false, color: '#fbbf24', icon: '⏪' },
              { cmd: 'git revert',   scope: 'undo on shared branch', safe: true,  color: '#5b9cf5',  icon: '↩️' },
            ].map((item, i) => (
              <motion.div key={item.cmd}
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15, type: 'spring', stiffness: 260, damping: 22 }}
                style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', maxWidth: 320 }}>
                <div style={{
                  width: compact ? 32 : 38, height: compact ? 32 : 38, borderRadius: 8,
                  background: item.color + '15', border: `1.5px solid ${item.color}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: compact ? 14 : 18, flexShrink: 0,
                }}>{item.icon}</div>
                <div style={{ flex: 1 }}>
                  <code style={{ fontFamily: mono, fontSize: sz - 2, color: item.color, fontWeight: 700 }}>{item.cmd}</code>
                  <div style={{ fontFamily: mono, fontSize: sz - 4, color: '#6b7485' }}>{item.scope}</div>
                </div>
                <span style={{
                  fontFamily: mono, fontSize: sz - 4, fontWeight: 700,
                  color: item.safe ? '#4ade80' : '#fbbf24',
                  background: (item.safe ? '#4ade80' : '#fbbf24') + '15',
                  padding: '1px 6px', borderRadius: 4,
                }}>
                  {item.safe ? 'safe' : 'local'}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 1: git restore — discard working directory changes */}
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <div style={{ display: 'flex', gap: compact ? 10 : 16, alignItems: 'center' }}>
              <div style={{
                padding: compact ? '10px 14px' : '12px 18px', borderRadius: 10,
                background: 'rgba(244,63,94,0.1)', border: '2px solid #f43f5e',
                fontFamily: mono, textAlign: 'center',
              }}>
                <div style={{ fontSize: compact ? 20 : 28, marginBottom: 4 }}>📄</div>
                <div style={{ fontSize: sz - 2, color: '#f43f5e' }}>app.js ✏️</div>
                <div style={{ fontSize: sz - 4, color: '#f43f5e', opacity: 0.7 }}>modified</div>
              </div>
              <motion.div animate={{ x: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
                style={{ fontFamily: mono, fontSize: sz, color: '#4ade80', fontWeight: 700 }}>
                ← restore
              </motion.div>
              <div style={{
                padding: compact ? '10px 14px' : '12px 18px', borderRadius: 10,
                background: 'rgba(74,222,128,0.1)', border: '2px solid #4ade80',
                fontFamily: mono, textAlign: 'center',
              }}>
                <div style={{ fontSize: compact ? 20 : 28, marginBottom: 4 }}>📄</div>
                <div style={{ fontSize: sz - 2, color: '#4ade80' }}>app.js</div>
                <div style={{ fontSize: sz - 4, color: '#4ade80', opacity: 0.7 }}>last commit</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, width: '100%', maxWidth: 300 }}>
              {[
                { code: 'git restore app.js',     note: 'discard file changes' },
                { code: 'git restore .',           note: 'discard all changes' },
                { code: 'git restore --staged .', note: 'unstage (keep changes)' },
              ].map((row, i) => (
                <motion.div key={row.code}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.12 }}
                  style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center' }}>
                  <code style={{ fontFamily: mono, fontSize: sz - 3, color: '#4ade80', background: 'rgba(74,222,128,0.08)', padding: '2px 6px', borderRadius: 4 }}>
                    {row.code}
                  </code>
                  <span style={{ fontFamily: mono, fontSize: sz - 4, color: '#6b7485', whiteSpace: 'nowrap' }}>{row.note}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: git stash — temporarily shelve changes */}
        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <div style={{ fontFamily: mono, fontSize: sz - 1, color: '#a78bfa', fontWeight: 700 }}>git stash</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 10 : 16 }}>
              <div style={{
                padding: compact ? '8px 12px' : '10px 16px', borderRadius: 10,
                background: 'rgba(244,63,94,0.1)', border: '1.5px solid #f43f5e',
                fontFamily: mono, fontSize: sz - 2, color: '#f43f5e', textAlign: 'center',
              }}>
                WIP changes<br /><span style={{ fontSize: sz - 4, opacity: 0.7 }}>not ready to commit</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <motion.div animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
                  style={{ fontFamily: mono, fontSize: sz, color: '#a78bfa' }}>↓</motion.div>
                <span style={{ fontFamily: mono, fontSize: sz - 3, color: '#a78bfa' }}>stash</span>
              </div>
              <div style={{
                padding: compact ? '8px 12px' : '10px 16px', borderRadius: 10,
                background: 'rgba(167,139,250,0.1)', border: '1.5px solid #a78bfa',
                fontFamily: mono, fontSize: sz - 2, color: '#a78bfa', textAlign: 'center',
              }}>
                📦 Stash<br /><span style={{ fontSize: sz - 4, opacity: 0.7 }}>safe storage</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, width: '100%', maxWidth: 280 }}>
              {[
                { code: 'git stash',      note: 'shelve changes' },
                { code: 'git stash pop',  note: 'restore + remove' },
                { code: 'git stash list', note: 'see all stashes' },
              ].map((row, i) => (
                <motion.div key={row.code}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.12 }}
                  style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center' }}>
                  <code style={{ fontFamily: mono, fontSize: sz - 3, color: '#a78bfa', background: 'rgba(167,139,250,0.08)', padding: '2px 6px', borderRadius: 4 }}>
                    {row.code}
                  </code>
                  <span style={{ fontFamily: mono, fontSize: sz - 4, color: '#6b7485' }}>{row.note}</span>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              style={{ fontFamily: mono, fontSize: sz - 2, color: '#6b7485', textAlign: 'center' }}>
              use when switching branches mid-work
            </motion.div>
          </motion.div>
        )}

        {/* Step 3: git revert — safe undo on shared branches */}
        {step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <div style={{ fontFamily: mono, fontSize: sz - 1, color: '#5b9cf5', fontWeight: 700 }}>git revert</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%', maxWidth: 300 }}>
              {[
                { hash: 'a1b2c3d', msg: '"add navbar"',    color: '#6b7485', new: false },
                { hash: '🐛 bad',  msg: '"break layout"',  color: '#f43f5e', new: false },
                { hash: '↩️ new',  msg: 'Revert "break layout"', color: '#5b9cf5', new: true },
              ].map((c, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    fontFamily: mono, fontSize: sz - 2,
                    padding: '4px 10px', borderRadius: 6,
                    background: c.new ? 'rgba(91,156,245,0.1)' : 'transparent',
                    border: c.new ? '1px solid rgba(91,156,245,0.3)' : '1px solid transparent',
                  }}>
                  <code style={{ color: c.color, fontWeight: c.new ? 700 : 400 }}>{c.hash}</code>
                  <span style={{ color: c.color, opacity: c.new ? 1 : 0.6 }}>{c.msg}</span>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
              style={{
                fontFamily: mono, fontSize: sz - 2, color: '#5b9cf5',
                background: 'rgba(91,156,245,0.08)', padding: compact ? '6px 12px' : '8px 16px',
                borderRadius: 8, border: '1px solid rgba(91,156,245,0.2)', textAlign: 'center',
              }}>
              creates a new commit — history stays intact<br />
              <span style={{ color: '#6b7485', fontSize: sz - 3 }}>safe for shared/public branches</span>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
