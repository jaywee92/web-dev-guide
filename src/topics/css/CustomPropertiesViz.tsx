import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const BLUE   = '#3b82f6'
const PURPLE = '#a855f7'
const GREEN  = '#22c55e'

const STEPS = [
  { color: '#71717a', badge: 'No variables',  label: 'Hardcoded values repeated in every rule — hard to maintain' },
  { color: BLUE,      badge: 'Declare',       label: "Declare --color-primary on :root — one source of truth" },
  { color: GREEN,     badge: 'Use var()',      label: "var() reads the custom property everywhere it's needed" },
  { color: PURPLE,    badge: 'Override',      label: 'Override in a child scope — no need to touch every rule' },
  { color: '#f97316', badge: 'Token system',  label: 'Design token system — a small set of variables drives the whole UI' },
] as const

const mono = 'var(--font-mono)'

export default function CustomPropertiesViz({ step, compact = false }: Props) {
  const s = Math.max(0, Math.min(step, 4))
  const cfg = STEPS[s]
  const fs = compact ? 8 : 11
  const panelW = compact ? 210 : 300

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 16 }}>
      <div style={{
        width: panelW,
        background: '#1e1e2e',
        border: `1px solid ${cfg.color}44`,
        borderRadius: 10,
        overflow: 'hidden',
      }}>
        <div style={{ background: `${cfg.color}18`, borderBottom: `1px solid ${cfg.color}33`, padding: compact ? '3px 8px' : '4px 12px' }}>
          <span style={{ fontFamily: mono, fontSize: compact ? 7 : 9, color: cfg.color, fontWeight: 600 }}>{cfg.badge}</span>
        </div>
        <div style={{ padding: compact ? 8 : 14, fontFamily: mono, fontSize: fs, lineHeight: 1.8 }}>
          <AnimatePresence mode="wait">
            {s === 0 && (
              <motion.div key="0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <div><span style={{ color: '#61afef' }}>.btn</span><span style={{ color: '#abb2bf' }}> {'{'}</span></div>
                <div style={{ paddingLeft: 12 }}><span style={{ color: '#98c379' }}>background</span><span style={{ color: '#abb2bf' }}>: </span><span style={{ color: '#e5c07b' }}>#3b82f6</span><span style={{ color: '#abb2bf' }}>;</span></div>
                <div><span style={{ color: '#abb2bf' }}>{'}'}</span></div>
                <div style={{ marginTop: 6 }}><span style={{ color: '#61afef' }}>.link</span><span style={{ color: '#abb2bf' }}> {'{'}</span></div>
                <div style={{ paddingLeft: 12 }}><span style={{ color: '#98c379' }}>color</span><span style={{ color: '#abb2bf' }}>: </span><span style={{ color: '#e5c07b' }}>#3b82f6</span><span style={{ color: '#abb2bf' }}>;</span></div>
                <div><span style={{ color: '#abb2bf' }}>{'}'}</span></div>
              </motion.div>
            )}
            {s === 1 && (
              <motion.div key="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <div><span style={{ color: '#61afef' }}>:root</span><span style={{ color: '#abb2bf' }}> {'{'}</span></div>
                <div style={{ paddingLeft: 12 }}><span style={{ color: BLUE, fontWeight: 700 }}>--color-primary</span><span style={{ color: '#abb2bf' }}>: </span><span style={{ color: '#e5c07b' }}>#3b82f6</span><span style={{ color: '#abb2bf' }}>;</span></div>
                <div><span style={{ color: '#abb2bf' }}>{'}'}</span></div>
              </motion.div>
            )}
            {s === 2 && (
              <motion.div key="2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <div><span style={{ color: '#61afef' }}>:root</span><span style={{ color: '#abb2bf' }}> {'{'}</span></div>
                <div style={{ paddingLeft: 12 }}><span style={{ color: BLUE }}>--color-primary</span><span style={{ color: '#abb2bf' }}>: </span><span style={{ color: '#e5c07b' }}>#3b82f6</span><span style={{ color: '#abb2bf' }}>;</span></div>
                <div><span style={{ color: '#abb2bf' }}>{'}'}</span></div>
                <div style={{ marginTop: 6 }}><span style={{ color: '#61afef' }}>.btn</span><span style={{ color: '#abb2bf' }}> {'{'}</span></div>
                <div style={{ paddingLeft: 12 }}><span style={{ color: '#98c379' }}>background</span><span style={{ color: '#abb2bf' }}>: </span><span style={{ color: GREEN, fontWeight: 700 }}>var(--color-primary)</span><span style={{ color: '#abb2bf' }}>;</span></div>
                <div><span style={{ color: '#abb2bf' }}>{'}'}</span></div>
              </motion.div>
            )}
            {s === 3 && (
              <motion.div key="3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <div style={{ color: '#e06c75', fontSize: compact ? 7 : 9 }}>{'/* Override in child */'}</div>
                <div><span style={{ color: '#61afef' }}>.dark-section</span><span style={{ color: '#abb2bf' }}> {'{'}</span></div>
                <div style={{ paddingLeft: 12 }}><span style={{ color: PURPLE, fontWeight: 700 }}>--color-primary</span><span style={{ color: '#abb2bf' }}>: </span><span style={{ color: '#e5c07b' }}>#1d4ed8</span><span style={{ color: '#abb2bf' }}>;</span></div>
                <div><span style={{ color: '#abb2bf' }}>{'}'}</span></div>
              </motion.div>
            )}
            {s === 4 && (
              <motion.div key="4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <div><span style={{ color: '#61afef' }}>:root</span><span style={{ color: '#abb2bf' }}> {'{'}</span></div>
                {[['--color-primary','#3b82f6'],['--color-surface','#1e293b'],['--radius','8px'],['--spacing-md','16px']].map(([n,v])=>(
                  <div key={n} style={{ paddingLeft: 12 }}>
                    <span style={{ color: '#f97316' }}>{n}</span><span style={{ color: '#abb2bf' }}>: </span><span style={{ color: '#e5c07b' }}>{v}</span><span style={{ color: '#abb2bf' }}>;</span>
                  </div>
                ))}
                <div><span style={{ color: '#abb2bf' }}>{'}'}</span></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.p key={s} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}
          style={{ margin: 0, fontFamily: mono, fontSize: compact ? 10 : 11, color: cfg.color, textAlign: 'center', maxWidth: panelW }}>
          {cfg.label}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
