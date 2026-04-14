import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const SKY    = '#38bdf8'
const GREEN  = '#4ade80'
const VIOLET = '#a78bfa'
const AMBER  = '#fbbf24'
const SLATE  = '#94a3b8'
const PINK   = '#f472b6'

const mono = 'var(--font-mono)'

export default function TailwindStatesViz({ step, compact = false }: Props) {
  const s = Math.min(step, 2)
  const [darkMode, setDarkMode] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)

  const panelW = compact ? 220 : 300

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 16, width: '100%' }}>
      <AnimatePresence mode="wait">

        {/* Step 0: State Variants */}
        {s === 0 && (
          <motion.div key="states"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 5 : 8 }}>

            {/* Variant pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: compact ? 3 : 5 }}>
              {[
                { variant: 'hover:', desc: 'mouse over',    color: SKY    },
                { variant: 'focus:', desc: 'keyboard focus', color: GREEN  },
                { variant: 'active:', desc: 'mouse down',   color: AMBER  },
                { variant: 'disabled:', desc: 'form state', color: SLATE  },
                { variant: 'checked:', desc: 'checkbox',    color: VIOLET },
                { variant: 'focus-visible:', desc: 'a11y',  color: PINK   },
              ].map(({ variant, desc, color }, i) => (
                <motion.div
                  key={variant}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.07, type: 'spring', stiffness: 300, damping: 22 }}
                  style={{
                    background: `${color}12`, border: `1px solid ${color}44`, borderRadius: 6,
                    padding: compact ? '3px 6px' : '4px 8px',
                  }}>
                  <div style={{ fontFamily: mono, fontSize: compact ? 8 : 9, fontWeight: 700, color }}>{variant}</div>
                  <div style={{ fontFamily: mono, fontSize: compact ? 6 : 7, color: color + '88' }}>{desc}</div>
                </motion.div>
              ))}
            </div>

            {/* Interactive button demo */}
            <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <div style={{ fontSize: compact ? 7 : 8, fontFamily: mono, color: SLATE, marginBottom: 4 }}>
                hover:bg-violet-600  active:bg-violet-700  disabled:opacity-50
              </div>
              <div style={{ display: 'flex', gap: compact ? 5 : 8, alignItems: 'center' }}>
                <button
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  style={{
                    background: hovered ? '#7c3aed' : '#8b5cf6',
                    color: 'white', border: 'none', borderRadius: 7,
                    padding: compact ? '4px 10px' : '5px 14px',
                    fontFamily: mono, fontSize: compact ? 8 : 9, fontWeight: 600,
                    cursor: 'pointer', transition: 'background 0.15s',
                  }}>
                  {hovered ? 'hover:bg-violet-600' : 'bg-violet-500'}
                </button>
                <button
                  style={{
                    background: '#6b7280', color: '#d1d5db', border: 'none', borderRadius: 7,
                    padding: compact ? '4px 10px' : '5px 14px',
                    fontFamily: mono, fontSize: compact ? 8 : 9,
                    cursor: 'not-allowed', opacity: 0.5,
                  }}
                  disabled>
                  disabled
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Step 1: Dark Mode */}
        {s === 1 && (
          <motion.div key="darkmode"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 5 : 8 }}>

            {/* Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 6 : 10 }}>
              <button
                onClick={() => setDarkMode(d => !d)}
                style={{
                  background: darkMode ? '#1e293b' : '#f8fafc',
                  border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                  borderRadius: 20, padding: compact ? '3px 8px' : '4px 12px',
                  fontFamily: mono, fontSize: compact ? 8 : 9,
                  color: darkMode ? '#94a3b8' : '#64748b',
                  cursor: 'pointer', transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', gap: 4,
                }}>
                <span>{darkMode ? '🌙' : '☀️'}</span>
                <span>Toggle</span>
              </button>
              <span style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: SLATE }}>
                {darkMode ? '.dark on <html>' : 'no .dark class'}
              </span>
            </div>

            {/* Card preview */}
            <motion.div
              animate={{
                background: darkMode ? '#1e293b' : '#ffffff',
                borderColor: darkMode ? '#334155' : '#e2e8f0',
              }}
              style={{
                border: '1px solid', borderRadius: 10,
                padding: compact ? '8px 10px' : '12px 14px',
                transition: 'all 0.3s',
              }}>
              <motion.div
                animate={{ color: darkMode ? '#f1f5f9' : '#0f172a' }}
                style={{ fontFamily: mono, fontSize: compact ? 9 : 11, fontWeight: 700, marginBottom: 3, transition: 'color 0.3s' }}>
                {darkMode ? 'dark:text-white' : 'text-gray-900'}
              </motion.div>
              <motion.div
                animate={{ color: darkMode ? '#94a3b8' : '#64748b' }}
                style={{ fontFamily: mono, fontSize: compact ? 7 : 9, transition: 'color 0.3s' }}>
                {darkMode ? 'dark:text-gray-400' : 'text-gray-500'}
              </motion.div>
            </motion.div>

            <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: SLATE + '88', lineHeight: 1.6 }}>
              {`bg-white dark:bg-gray-800`}<br />
              {`text-black dark:text-white`}
            </div>
          </motion.div>
        )}

        {/* Step 2: group & peer */}
        {s === 2 && (
          <motion.div key="group"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>

            {/* group demo */}
            <div>
              <div style={{ fontSize: compact ? 7 : 8, fontFamily: mono, color: SKY, marginBottom: 4, fontWeight: 700 }}>group — parent controls children</div>
              <div
                onMouseEnter={() => setFocused(true)}
                onMouseLeave={() => setFocused(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: compact ? 6 : 10,
                  background: focused ? `${SKY}0a` : 'transparent',
                  border: `1px solid ${focused ? SKY + '33' : 'var(--border)'}`,
                  borderRadius: 8, padding: compact ? '5px 8px' : '7px 12px',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}>
                <div style={{
                  width: compact ? 22 : 30, height: compact ? 22 : 30, borderRadius: '50%',
                  background: `${SKY}33`, flexShrink: 0,
                }} />
                <div>
                  <div style={{
                    fontFamily: mono, fontSize: compact ? 8 : 9, fontWeight: 600,
                    color: focused ? SKY : 'var(--text)', transition: 'color 0.2s',
                  }}>
                    {focused ? 'group-hover:text-sky-500' : 'text-gray-900'}
                  </div>
                  <div style={{
                    fontFamily: mono, fontSize: compact ? 7 : 8,
                    color: focused ? SKY + '88' : SLATE, transition: 'color 0.2s',
                  }}>
                    alice@example.com
                  </div>
                </div>
                <div style={{ marginLeft: 'auto', opacity: focused ? 1 : 0, transition: 'opacity 0.2s', color: SKY, fontSize: compact ? 10 : 12 }}>→</div>
              </div>
              <div style={{ fontFamily: mono, fontSize: compact ? 6 : 7, color: SLATE + '88', marginTop: 3 }}>hover the row</div>
            </div>

            {/* peer demo */}
            <div>
              <div style={{ fontSize: compact ? 7 : 8, fontFamily: mono, color: VIOLET, marginBottom: 4, fontWeight: 700 }}>peer — sibling reacts to input state</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 3 : 4 }}>
                {[
                  { label: 'valid input',   border: GREEN + '66',  msg: '', show: false },
                  { label: 'invalid input', border: '#ef444466',   msg: 'peer-invalid:visible — error shown', show: true },
                ].map(({ label, border, msg, show }) => (
                  <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <div style={{
                      border: `1px solid ${border}`, borderRadius: 5,
                      padding: compact ? '2px 6px' : '3px 8px',
                      fontFamily: mono, fontSize: compact ? 7 : 8, color: SLATE,
                    }}>{label}</div>
                    {show && (
                      <div style={{ fontFamily: mono, fontSize: compact ? 6 : 7, color: '#f87171', paddingLeft: 3 }}>{msg}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={s}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          style={{
            margin: 0, fontFamily: mono,
            fontSize: compact ? 9 : 10,
            color: [SKY, AMBER, VIOLET][s] ?? SKY,
            textAlign: 'center' as const, maxWidth: 320,
          }}
        >
          {[
            'prefix any utility with hover: focus: active: disabled: — stack variants freely',
            'darkMode: "class" in config → toggle .dark on <html> to flip all dark: styles',
            'group marks parent · group-hover: targets children · peer marks sibling · peer-invalid: reacts to it',
          ][s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
