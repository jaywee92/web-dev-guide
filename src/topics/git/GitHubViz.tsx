import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

export default function GitHubViz({ step, compact = false }: Props) {
  const mono = 'var(--font-mono)'
  const sz = compact ? 11 : 13

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 14 : 20, width: '100%' }}>
      <AnimatePresence mode="wait">

        {/* Step 0: Git ≠ GitHub */}
        {step === 0 && (
          <motion.div key="s0" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', gap: compact ? 12 : 20, alignItems: 'stretch' }}>
            {[
              { name: 'Git', icon: '🔧', color: '#f43f5e', points: ['version control', 'runs locally', 'tracks changes', 'CLI tool'] },
              { name: 'GitHub', icon: '🐙', color: '#a78bfa', points: ['hosts repos online', 'collaboration UI', 'Pull Requests', 'issue tracker'] },
            ].map((item, i) => (
              <motion.div key={item.name}
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.2, type: 'spring', stiffness: 240, damping: 20 }}
                style={{
                  padding: compact ? '12px 14px' : '16px 20px', borderRadius: 14,
                  background: item.color + '14', border: `2px solid ${item.color}`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                  minWidth: compact ? 110 : 140,
                }}>
                <span style={{ fontSize: compact ? 28 : 36 }}>{item.icon}</span>
                <span style={{ fontFamily: mono, fontSize: sz, color: item.color, fontWeight: 700 }}>{item.name}</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'flex-start' }}>
                  {item.points.map((p, j) => (
                    <motion.div key={p} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.2 + j * 0.1 + 0.3 }}
                      style={{ fontFamily: mono, fontSize: sz - 3, color: item.color, opacity: 0.85 }}>
                      · {p}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 1: Remote repo — team access */}
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            {/* GitHub cloud */}
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              style={{
                padding: compact ? '12px 20px' : '16px 28px', borderRadius: 14,
                background: 'rgba(167,139,250,0.12)', border: '2px solid #a78bfa',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              }}>
              <span style={{ fontSize: compact ? 32 : 44 }}>🐙</span>
              <span style={{ fontFamily: mono, fontSize: sz, color: '#a78bfa', fontWeight: 700 }}>GitHub Remote</span>
              <span style={{ fontFamily: mono, fontSize: sz - 2, color: '#a78bfa', opacity: 0.7 }}>github.com/you/project</span>
            </motion.div>
            {/* Devs pulling */}
            <div style={{ display: 'flex', gap: compact ? 8 : 16, alignItems: 'center' }}>
              {['👩‍💻', '👨‍💻', '🧑‍💻'].map((e, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.15, type: 'spring', stiffness: 260, damping: 22 }}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                    padding: compact ? '8px 10px' : '10px 14px', borderRadius: 10,
                    background: 'rgba(91,156,245,0.1)', border: '1px solid #5b9cf5',
                  }}>
                  <span style={{ fontSize: compact ? 20 : 26 }}>{e}</span>
                  <span style={{ fontFamily: mono, fontSize: sz - 4, color: '#5b9cf5' }}>git pull</span>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
              style={{ fontFamily: mono, fontSize: sz - 2, color: '#6b7485', textAlign: 'center' }}>
              everyone clones once, then pulls updates
            </motion.div>
          </motion.div>
        )}

        {/* Step 2: Pull Request flow */}
        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            {[
              { icon: '🌿', label: 'push feature branch', color: '#4ade80', delay: 0 },
              { icon: '📬', label: 'open Pull Request',   color: '#fbbf24', delay: 0.15 },
              { icon: '👀', label: 'team reviews code',   color: '#fb923c', delay: 0.3 },
              { icon: '✅', label: 'approve & merge',     color: '#5b9cf5', delay: 0.45 },
            ].map((step, i) => (
              <motion.div key={step.label}
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: step.delay, type: 'spring', stiffness: 260, damping: 22 }}
                style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', maxWidth: 300 }}>
                <div style={{
                  width: compact ? 34 : 42, height: compact ? 34 : 42,
                  borderRadius: 10, background: step.color + '20', border: `2px solid ${step.color}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: compact ? 16 : 20, flexShrink: 0,
                }}>{step.icon}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <span style={{ fontFamily: mono, fontSize: sz - 1, color: step.color, fontWeight: 700 }}>
                    {i + 1}. {step.label}
                  </span>
                </div>
                {i < 3 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: step.delay + 0.2 }}
                    style={{ position: 'absolute', left: compact ? 16 : 20, marginTop: compact ? 38 : 48,
                      width: 2, height: compact ? 10 : 12, background: step.color + '50', borderRadius: 1 }} />
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 3: Fork & open source contribution */}
        {step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 12 : 18 }}>
              {/* Original repo */}
              <div style={{
                padding: compact ? '10px 14px' : '14px 20px', borderRadius: 12,
                background: 'rgba(167,139,250,0.12)', border: '2px solid #a78bfa',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              }}>
                <span style={{ fontSize: compact ? 22 : 28 }}>🐙</span>
                <span style={{ fontFamily: mono, fontSize: sz - 2, color: '#a78bfa', fontWeight: 700 }}>original/repo</span>
              </div>
              {/* Fork arrow */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 2 }}
                  style={{ fontFamily: mono, fontSize: sz + 2, color: '#4ade80' }}>⑂</motion.div>
                <span style={{ fontFamily: mono, fontSize: sz - 3, color: '#4ade80' }}>fork</span>
              </div>
              {/* Your fork */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 240, damping: 20 }}
                style={{
                  padding: compact ? '10px 14px' : '14px 20px', borderRadius: 12,
                  background: 'rgba(74,222,128,0.12)', border: '2px solid #4ade80',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                }}>
                <span style={{ fontSize: compact ? 22 : 28 }}>👤</span>
                <span style={{ fontFamily: mono, fontSize: sz - 2, color: '#4ade80', fontWeight: 700 }}>you/repo</span>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              style={{ fontFamily: mono, fontSize: sz - 2, color: '#6b7485', textAlign: 'center', maxWidth: 280 }}>
              fork → clone → edit → push → PR back to original
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              style={{ fontFamily: mono, fontSize: sz - 2, color: '#4ade80', textAlign: 'center' }}>
              🌍 how open source works
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
