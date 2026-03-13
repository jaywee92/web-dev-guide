import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

export default function GitCollabSetupViz({ step, compact = false }: Props) {
  const mono = 'var(--font-mono)'
  const sz = compact ? 11 : 13

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 14 : 20, width: '100%' }}>
      <AnimatePresence mode="wait">

        {/* Step 0: Create repo on GitHub + invite collaborators */}
        {step === 0 && (
          <motion.div key="s0" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
              style={{ fontSize: compact ? 32 : 44 }}>🐙</motion.div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7, width: '100%', maxWidth: 300 }}>
              {[
                { step: '1', icon: '📁', text: 'New repo on GitHub', color: '#2dd4bf' },
                { step: '2', icon: '⚙️', text: 'Settings → Collaborators', color: '#2dd4bf' },
                { step: '3', icon: '📧', text: 'Invite by username / email', color: '#2dd4bf' },
                { step: '4', icon: '✅', text: 'Teammate accepts invite', color: '#5eead4' },
              ].map((item, i) => (
                <motion.div key={item.step}
                  initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.12, type: 'spring', stiffness: 260, damping: 22 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: compact ? 22 : 26, height: compact ? 22 : 26, borderRadius: '50%',
                    background: item.color + '20', border: `1.5px solid ${item.color}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: mono, fontSize: sz - 4, color: item.color, fontWeight: 700, flexShrink: 0,
                  }}>{item.step}</div>
                  <span style={{ fontSize: compact ? 14 : 18 }}>{item.icon}</span>
                  <span style={{ fontFamily: mono, fontSize: sz - 2, color: 'var(--text-muted)' }}>{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 1: Everyone clones the same repo */}
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            {/* Remote */}
            <div style={{
              padding: compact ? '8px 18px' : '10px 24px', borderRadius: 10,
              background: 'rgba(45,212,191,0.1)', border: '2px solid #2dd4bf',
              display: 'flex', alignItems: 'center', gap: 8, fontFamily: mono,
            }}>
              <span style={{ fontSize: compact ? 18 : 22 }}>🐙</span>
              <span style={{ fontSize: sz - 1, color: '#2dd4bf', fontWeight: 700 }}>github.com/team/project</span>
            </div>
            {/* Arrows down */}
            <div style={{ display: 'flex', gap: compact ? 16 : 28, alignItems: 'flex-start' }}>
              {['👩‍💻', '👨‍💻', '🧑‍💻'].map((dev, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.15, type: 'spring', stiffness: 260, damping: 22 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <motion.div animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.6, delay: i * 0.3 }}
                    style={{ fontFamily: mono, fontSize: sz, color: '#2dd4bf' }}>↓</motion.div>
                  <div style={{
                    padding: compact ? '8px 10px' : '10px 12px', borderRadius: 8,
                    background: 'rgba(45,212,191,0.08)', border: '1px solid #2dd4bf50',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                  }}>
                    <span style={{ fontSize: compact ? 18 : 24 }}>{dev}</span>
                    <span style={{ fontFamily: mono, fontSize: sz - 4, color: '#2dd4bf', opacity: 0.8 }}>local</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
              style={{ fontFamily: mono, fontSize: sz - 2, color: '#6b7485', textAlign: 'center' }}>
              git clone https://github.com/team/project.git
            </motion.div>
          </motion.div>
        )}

        {/* Step 2: Branch protection — nobody pushes directly to main */}
        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <div style={{ fontFamily: mono, fontSize: sz - 1, color: '#2dd4bf', fontWeight: 700 }}>
              Branch Protection Rules
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 310 }}>
              {[
                { icon: '🔒', label: 'Protect main branch', sub: 'Settings → Branches → Add rule', on: true },
                { icon: '👁️', label: 'Require PR review', sub: 'at least 1 approval before merge', on: true },
                { icon: '🚫', label: 'Block direct push to main', sub: 'everyone must use a branch + PR', on: true },
              ].map((rule, i) => (
                <motion.div key={rule.label}
                  initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15, type: 'spring', stiffness: 260, damping: 22 }}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 10,
                    padding: compact ? '8px 10px' : '10px 14px', borderRadius: 9,
                    background: 'rgba(45,212,191,0.08)', border: '1px solid rgba(45,212,191,0.25)',
                  }}>
                  <span style={{ fontSize: compact ? 14 : 18, flexShrink: 0 }}>{rule.icon}</span>
                  <div>
                    <div style={{ fontFamily: mono, fontSize: sz - 2, color: '#2dd4bf', fontWeight: 700 }}>{rule.label}</div>
                    <div style={{ fontFamily: mono, fontSize: sz - 4, color: '#6b7485', marginTop: 2 }}>{rule.sub}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3: The full team loop */}
        {step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9 }}>
            <div style={{ fontFamily: mono, fontSize: sz - 1, color: '#2dd4bf', fontWeight: 700, marginBottom: 2 }}>
              Team workflow loop
            </div>
            {[
              { icon: '🔄', text: 'git pull',             sub: 'get latest from main',       color: '#2dd4bf' },
              { icon: '🌿', text: 'git checkout -b feat', sub: 'new branch per feature',      color: '#4ade80' },
              { icon: '✏️', text: 'code + commit',         sub: 'small focused commits',       color: '#fbbf24' },
              { icon: '☁️', text: 'git push origin feat', sub: 'push branch to GitHub',       color: '#5b9cf5' },
              { icon: '📬', text: 'open Pull Request',    sub: 'request a review',            color: '#a78bfa' },
              { icon: '✅', text: 'review → merge',       sub: 'teammate approves, squash merge', color: '#5eead4' },
            ].map((item, i) => (
              <motion.div key={item.text}
                initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', maxWidth: 310 }}>
                <div style={{
                  width: compact ? 28 : 32, height: compact ? 28 : 32, borderRadius: 7,
                  background: item.color + '18', border: `1.5px solid ${item.color}50`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: compact ? 12 : 15, flexShrink: 0,
                }}>{item.icon}</div>
                <div style={{ flex: 1 }}>
                  <code style={{ fontFamily: mono, fontSize: sz - 2, color: item.color, fontWeight: 600 }}>{item.text}</code>
                  <div style={{ fontFamily: mono, fontSize: sz - 4, color: '#6b7485' }}>{item.sub}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
