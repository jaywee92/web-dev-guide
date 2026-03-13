import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const PURPLE = '#a78bfa'
const BLUE   = '#60a5fa'
const AMBER  = '#f59e0b'
const GREEN  = '#4ade80'

const stepLabels = [
  'Declare a variable once in :root',
  'Reference it with var() in multiple places',
  'Every usage reflects the same value',
  'Change the variable — all usages update instantly',
  'Override in a local scope — only that subtree changes',
]

const usages = [
  { selector: '.btn',   prop: 'background', el: 'Button' },
  { selector: '.link',  prop: 'color',      el: 'Link'   },
  { selector: '.badge', prop: 'border',     el: 'Badge'  },
]

export default function CustomPropertiesViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const activeColor = s === 3 ? AMBER : s === 4 ? PURPLE : BLUE
  const rootColor = s >= 3 ? AMBER : BLUE
  const fs = compact ? 9 : 10

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 18 }}>

      {/* :root declaration */}
      <motion.div
        animate={{ borderColor: `${rootColor}66`, boxShadow: `0 0 16px ${rootColor}22` }}
        transition={{ duration: 0.5 }}
        style={{
          background: `${PURPLE}0d`, border: '1.5px solid',
          borderRadius: 8, padding: compact ? '8px 12px' : '12px 18px',
          fontFamily: 'var(--font-mono)', fontSize: fs,
        }}
      >
        <div style={{ color: PURPLE, fontWeight: 700, marginBottom: 4 }}>:root {'{'}</div>
        <motion.div
          animate={{ color: rootColor }}
          transition={{ duration: 0.5 }}
          style={{ paddingLeft: 12, marginBottom: 2 }}
        >
          --primary: <motion.span
            animate={{ color: rootColor, textShadow: s === 3 ? `0 0 8px ${rootColor}` : 'none' }}
            transition={{ duration: 0.5 }}
          >{s >= 3 ? '#f59e0b' : '#6366f1'}</motion.span>;
        </motion.div>
        <div style={{ color: GREEN + 'aa', paddingLeft: 12 }}>--spacing: 16px;</div>
        <div style={{ color: PURPLE, marginTop: 2 }}>{'}'}</div>
      </motion.div>

      {/* Usage sites */}
      <AnimatePresence>
        {s >= 1 && (
          <motion.div
            key="usages"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', gap: compact ? 8 : 12 }}
          >
            {usages.map((u, i) => (
              <motion.div
                key={u.selector}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 300, damping: 24 }}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid rgba(255,255,255,0.1)`,
                  borderRadius: 8, padding: compact ? '6px 10px' : '10px 14px',
                  fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9,
                  textAlign: 'center' as const,
                }}
              >
                <div style={{ color: 'var(--text-muted)', marginBottom: 4 }}>{u.selector}</div>
                <div style={{ color: 'var(--text-muted)', marginBottom: 6, fontSize: compact ? 7 : 8 }}>
                  {u.prop}: <span style={{ color: activeColor }}>var(--primary)</span>
                </div>
                {/* Rendered element preview */}
                <AnimatePresence>
                  {s >= 2 && (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      style={{
                        background: i === 0 ? activeColor : 'transparent',
                        color: i === 0 ? '#fff' : activeColor,
                        border: i === 2 ? `2px solid ${activeColor}` : 'none',
                        borderRadius: 4,
                        padding: compact ? '2px 6px' : '3px 8px',
                        fontSize: compact ? 8 : 10,
                        fontWeight: 600,
                        transition: 'all 0.5s',
                      }}
                    >
                      {u.el}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Local scope override (step 4) */}
      <AnimatePresence>
        {s === 4 && (
          <motion.div
            key="override"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              background: `${AMBER}0d`, border: `1px solid ${AMBER}44`,
              borderRadius: 8, padding: compact ? '6px 10px' : '10px 14px',
              fontFamily: 'var(--font-mono)', fontSize: fs,
              boxShadow: `0 0 14px ${AMBER}18`,
            }}
          >
            <div style={{ color: AMBER, fontWeight: 700, marginBottom: 3 }}>.card {'{'}</div>
            <div style={{ paddingLeft: 12, color: AMBER, marginBottom: 2 }}>--primary: #f59e0b; <span style={{ color: 'var(--text-muted)', fontSize: compact ? 7 : 8 }}>/* local override */</span></div>
            <div style={{ color: AMBER }}>{'}'}</div>
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
            color: [PURPLE, BLUE, BLUE, AMBER, AMBER][s],
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
