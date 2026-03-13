import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const BAD_FILES = ['node_modules/ 📦', '.env 🔑', 'dist/ 🏗️', '*.log 📜', '.DS_Store 💾']
const GOOD_FILES = ['src/ ✅', 'index.html ✅', 'package.json ✅']

export default function GitIgnoreViz({ step, compact = false }: Props) {
  const mono = 'var(--font-mono)'
  const sz = compact ? 11 : 13

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 14 : 20, width: '100%' }}>
      <AnimatePresence mode="wait">

        {/* Step 0: Without .gitignore — everything gets tracked */}
        {step === 0 && (
          <motion.div key="s0" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', gap: compact ? 12 : 20, alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {[...BAD_FILES, ...GOOD_FILES].map((f, i) => (
                  <motion.div key={f}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    style={{
                      fontFamily: mono, fontSize: sz - 2,
                      color: i < BAD_FILES.length ? '#f43f5e' : '#6b7485',
                      padding: '2px 8px', borderRadius: 4,
                      background: i < BAD_FILES.length ? 'rgba(244,63,94,0.08)' : 'transparent',
                    }}>
                    {f}
                  </motion.div>
                ))}
              </div>
              <motion.div animate={{ x: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}
                style={{ fontFamily: mono, fontSize: sz, color: '#f43f5e', fontWeight: 700, marginTop: 4 }}>
                git add . →
              </motion.div>
              <div style={{
                padding: compact ? '8px 12px' : '12px 16px', borderRadius: 10,
                background: 'rgba(244,63,94,0.1)', border: '2px solid #f43f5e',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              }}>
                <span style={{ fontSize: compact ? 18 : 24 }}>📦</span>
                <span style={{ fontFamily: mono, fontSize: sz - 3, color: '#f43f5e' }}>Staged</span>
                <span style={{ fontFamily: mono, fontSize: sz - 4, color: '#f43f5e', opacity: 0.7 }}>
                  everything!
                </span>
              </div>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              style={{ fontFamily: mono, fontSize: sz - 2, color: '#f43f5e', textAlign: 'center' }}>
              😱 node_modules (200MB) in your repo
            </motion.div>
          </motion.div>
        )}

        {/* Step 1: Create .gitignore */}
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              style={{ fontSize: compact ? 32 : 44 }}>🚫</motion.div>
            <div style={{
              padding: compact ? '10px 16px' : '14px 22px', borderRadius: 12,
              background: 'rgba(74,222,128,0.1)', border: '2px solid #4ade80',
              fontFamily: mono, textAlign: 'center',
            }}>
              <div style={{ fontSize: sz - 1, color: '#4ade80', fontWeight: 700, marginBottom: 6 }}>.gitignore</div>
              <div style={{ fontSize: sz - 3, color: '#6b7485' }}>
                lives in the root of your project<br />
                tells Git what to <span style={{ color: '#4ade80' }}>never track</span>
              </div>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              style={{ fontFamily: mono, fontSize: sz - 2, color: '#6b7485', textAlign: 'center' }}>
              add to every project — commit it to the repo
            </motion.div>
          </motion.div>
        )}

        {/* Step 2: Pattern syntax */}
        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ fontFamily: mono, fontSize: sz - 1, color: '#4ade80', fontWeight: 700, marginBottom: 4 }}>
              .gitignore patterns
            </div>
            {[
              { pattern: 'node_modules/', meaning: 'entire folder', color: '#f43f5e' },
              { pattern: '.env',         meaning: 'exact filename', color: '#fbbf24' },
              { pattern: '*.log',        meaning: '* = any name',   color: '#5b9cf5' },
              { pattern: 'dist/',        meaning: 'build output',   color: '#a78bfa' },
              { pattern: '!.env.example', meaning: '! = un-ignore', color: '#4ade80' },
            ].map((row, i) => (
              <motion.div key={row.pattern}
                initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  width: '100%', maxWidth: 310,
                }}>
                <code style={{
                  fontFamily: mono, fontSize: sz - 2, color: row.color, fontWeight: 700,
                  background: row.color + '15', padding: '2px 8px', borderRadius: 5,
                  minWidth: compact ? 110 : 130, display: 'inline-block',
                }}>{row.pattern}</code>
                <span style={{ fontFamily: mono, fontSize: sz - 3, color: '#6b7485' }}>— {row.meaning}</span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 3: With .gitignore — only src tracked */}
        {step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', gap: compact ? 12 : 20, alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {BAD_FILES.map((f, i) => (
                  <motion.div key={f}
                    initial={{ opacity: 0 }} animate={{ opacity: 0.3 }}
                    transition={{ delay: i * 0.07 }}
                    style={{
                      fontFamily: mono, fontSize: sz - 2, color: '#3a4055',
                      padding: '2px 8px', borderRadius: 4,
                      textDecoration: 'line-through',
                    }}>
                    {f}
                  </motion.div>
                ))}
                {GOOD_FILES.map((f, i) => (
                  <motion.div key={f}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    style={{ fontFamily: mono, fontSize: sz - 2, color: '#4ade80', padding: '2px 8px' }}>
                    {f}
                  </motion.div>
                ))}
              </div>
              <motion.div animate={{ x: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}
                style={{ fontFamily: mono, fontSize: sz, color: '#4ade80', fontWeight: 700, marginTop: 4 }}>
                git add . →
              </motion.div>
              <div style={{
                padding: compact ? '8px 12px' : '12px 16px', borderRadius: 10,
                background: 'rgba(74,222,128,0.1)', border: '2px solid #4ade80',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              }}>
                <span style={{ fontSize: compact ? 18 : 24 }}>✅</span>
                <span style={{ fontFamily: mono, fontSize: sz - 3, color: '#4ade80' }}>Staged</span>
                <span style={{ fontFamily: mono, fontSize: sz - 4, color: '#4ade80', opacity: 0.7 }}>
                  src only
                </span>
              </div>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
              style={{ fontFamily: mono, fontSize: sz - 2, color: '#4ade80', textAlign: 'center' }}>
              🎉 only your code in the repo
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
