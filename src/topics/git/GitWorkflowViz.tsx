import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const STEPS = [
  { cmd: 'git init',         label: 'Initialize',    icon: '📁', color: '#f43f5e', desc: 'create a new repo' },
  { cmd: 'git branch feat',  label: 'Branch',        icon: '🌿', color: '#4ade80', desc: 'isolate your work' },
  { cmd: 'git add .',        label: 'Stage',         icon: '📋', color: '#fbbf24', desc: 'pick what to save' },
  { cmd: 'git commit -m ""', label: 'Commit',        icon: '🗄️',  color: '#5b9cf5', desc: 'snapshot in history' },
  { cmd: 'git push origin',  label: 'Push',          icon: '☁️',  color: '#a78bfa', desc: 'share with the world' },
]

export default function GitWorkflowViz({ step, compact = false }: Props) {
  const mono = 'var(--font-mono)'
  const sz = compact ? 11 : 13

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 14 : 20, width: '100%' }}>
      <AnimatePresence mode="wait">

        {/* Step 0: Overview of all 5 workflow steps */}
        {step === 0 && (
          <motion.div key="s0" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{ fontFamily: mono, fontSize: sz - 1, color: '#6b7485', marginBottom: 4 }}>
              the daily git loop
            </div>
            {STEPS.map((s, i) => (
              <motion.div key={s.cmd}
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.12, type: 'spring', stiffness: 260, damping: 22 }}
                style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', maxWidth: 320 }}>
                <div style={{
                  width: compact ? 22 : 28, height: compact ? 22 : 28, borderRadius: '50%',
                  background: s.color + '20', border: `2px solid ${s.color}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: mono, fontSize: sz - 3, color: s.color, fontWeight: 700, flexShrink: 0,
                }}>{i + 1}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <span style={{ fontFamily: mono, fontSize: sz - 1, color: s.color, fontWeight: 700 }}>{s.cmd}</span>
                  <span style={{ fontFamily: mono, fontSize: sz - 3, color: '#6b7485' }}>{s.desc}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 1: git init / git clone */}
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <motion.div animate={{ scale: [1, 1.12, 1] }} transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              style={{ fontSize: compact ? 36 : 50 }}>📁</motion.div>
            <div style={{ display: 'flex', gap: compact ? 10 : 16, alignItems: 'stretch' }}>
              {[
                { label: 'git init', sub: 'new project', note: 'creates .git folder' },
                { label: 'git clone <url>', sub: 'existing project', note: 'copies full history' },
              ].map((opt, i) => (
                <motion.div key={opt.label}
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.2, type: 'spring', stiffness: 240, damping: 20 }}
                  style={{
                    padding: compact ? '10px 14px' : '14px 18px', borderRadius: 12,
                    background: 'rgba(244,63,94,0.1)', border: '2px solid #f43f5e',
                    fontFamily: mono, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 4,
                  }}>
                  <span style={{ fontSize: sz, color: '#f43f5e', fontWeight: 700 }}>{opt.label}</span>
                  <span style={{ fontSize: sz - 2, color: '#f43f5e', opacity: 0.8 }}>{opt.sub}</span>
                  <span style={{ fontSize: sz - 3, color: '#6b7485', marginTop: 2 }}>{opt.note}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: git branch — isolate work */}
        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 6 : 10 }}>
                {/* main branch */}
                <motion.div style={{
                  width: compact ? 48 : 60, height: compact ? 48 : 60, borderRadius: '50%',
                  background: 'rgba(107,116,133,0.15)', border: '2px solid #6b7485',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: mono, fontSize: sz - 2, color: '#6b7485', fontWeight: 700,
                }}>main</motion.div>
                <div style={{ width: compact ? 28 : 40, height: 2, background: '#4ade80', borderRadius: 2 }} />
                {/* feature branch */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 260, damping: 18 }}
                  style={{
                    width: compact ? 64 : 80, height: compact ? 64 : 80, borderRadius: '50%',
                    background: 'rgba(74,222,128,0.15)', border: '3px solid #4ade80',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
                    fontFamily: mono,
                  }}>
                  <span style={{ fontSize: compact ? 20 : 26 }}>🌿</span>
                  <span style={{ fontSize: sz - 3, color: '#4ade80', fontWeight: 700 }}>feature</span>
                </motion.div>
              </div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                style={{ fontFamily: mono, fontSize: sz - 1, color: '#4ade80', textAlign: 'center', marginTop: 8 }}>
                git checkout -b feature
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                style={{ fontFamily: mono, fontSize: sz - 3, color: '#6b7485', textAlign: 'center' }}>
                work isolated — main stays clean
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Step 3: git add → git commit */}
        {step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', alignItems: 'center', gap: compact ? 8 : 14 }}>
            {/* Working dir */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
              <span style={{ fontSize: compact ? 22 : 28 }}>📁</span>
              <span style={{ fontFamily: mono, fontSize: sz - 3, color: '#f43f5e' }}>Working Dir</span>
              {['app.js ✏️', 'style.css ✏️', 'README.md'].map((f, i) => (
                <motion.div key={f} initial={{ x: 0 }}
                  animate={i < 2 ? { x: [0, 8, 0] } : {}}
                  transition={{ delay: i * 0.2, duration: 0.6, repeat: 1 }}
                  style={{ fontFamily: mono, fontSize: sz - 3, color: i < 2 ? '#fbbf24' : '#6b7485' }}>
                  {f}{i < 2 ? ' →' : ''}
                </motion.div>
              ))}
            </div>
            {/* git add */}
            <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 2 }}
              style={{ fontFamily: mono, fontSize: sz - 1, color: '#fbbf24', fontWeight: 700, textAlign: 'center' }}>
              git add .
            </motion.div>
            {/* Staging area */}
            <div style={{
              padding: compact ? '8px 12px' : '12px 16px', borderRadius: 10,
              background: 'rgba(251,191,36,0.1)', border: '2px solid #fbbf24',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            }}>
              <span style={{ fontSize: compact ? 18 : 24 }}>📋</span>
              <span style={{ fontFamily: mono, fontSize: sz - 3, color: '#fbbf24' }}>Staging</span>
              {['app.js ✓', 'style.css ✓'].map((f, i) => (
                <motion.div key={f} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.15 }}
                  style={{ fontFamily: mono, fontSize: sz - 3, color: '#fbbf24' }}>{f}</motion.div>
              ))}
            </div>
            {/* git commit */}
            <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}
              style={{ fontFamily: mono, fontSize: sz - 1, color: '#5b9cf5', fontWeight: 700, textAlign: 'center' }}>
              git commit →
            </motion.div>
            {/* Local repo */}
            <div style={{
              padding: compact ? '8px 12px' : '12px 16px', borderRadius: 10,
              background: 'rgba(91,156,245,0.1)', border: '2px solid #5b9cf5',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            }}>
              <span style={{ fontSize: compact ? 18 : 24 }}>🗄️</span>
              <span style={{ fontFamily: mono, fontSize: sz - 3, color: '#5b9cf5' }}>Local Repo</span>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                style={{ fontFamily: mono, fontSize: sz - 4, color: '#5b9cf5', fontWeight: 700 }}>
                🆕 "add feature"
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Step 4: git push → remote */}
        {step === 4 && (
          <motion.div key="s4" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 12 : 20 }}>
              {/* Local */}
              <div style={{
                padding: compact ? '10px 14px' : '14px 20px', borderRadius: 12,
                background: 'rgba(91,156,245,0.1)', border: '2px solid #5b9cf5',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              }}>
                <span style={{ fontSize: compact ? 22 : 28 }}>🗄️</span>
                <span style={{ fontFamily: mono, fontSize: sz - 2, color: '#5b9cf5' }}>Local Repo</span>
              </div>
              {/* Animated arrow */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <motion.div animate={{ x: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}
                  style={{ fontFamily: mono, fontSize: sz, color: '#a78bfa', fontWeight: 700 }}>
                  →→→
                </motion.div>
                <span style={{ fontFamily: mono, fontSize: sz - 2, color: '#a78bfa', fontWeight: 700 }}>git push</span>
              </div>
              {/* Remote */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 240, damping: 20 }}
                style={{
                  padding: compact ? '10px 14px' : '14px 20px', borderRadius: 12,
                  background: 'rgba(167,139,250,0.1)', border: '2px solid #a78bfa',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                }}>
                <span style={{ fontSize: compact ? 22 : 28 }}>☁️</span>
                <span style={{ fontFamily: mono, fontSize: sz - 2, color: '#a78bfa' }}>Remote</span>
                <span style={{ fontFamily: mono, fontSize: sz - 4, color: '#a78bfa', opacity: 0.7 }}>GitHub</span>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              style={{ fontFamily: mono, fontSize: sz - 2, color: '#6b7485', textAlign: 'center' }}>
              git push origin feature
            </motion.div>
            {['👩‍💻', '👨‍💻', '🧑‍💻'].map((e, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.12 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: mono, fontSize: sz - 2, color: '#a78bfa' }}>
                <span style={{ fontSize: compact ? 16 : 20 }}>{e}</span> can now pull your changes
              </motion.div>
            ))}
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
