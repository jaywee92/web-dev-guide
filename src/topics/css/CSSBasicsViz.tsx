// src/topics/css/CSSBasicsViz.tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const ORANGE = '#f97316'
const BLUE   = '#3b82f6'
const GREEN  = '#22c55e'
const PURPLE = '#a855f7'

interface StepCfg {
  color: string
  badge: string
  label: string
}

const STEPS: StepCfg[] = [
  { color: '#71717a', badge: 'No CSS',   label: 'Without CSS — browsers apply their own default styles' },
  { color: ORANGE,    badge: 'Inline',   label: 'Inline style= — directly on the element, highest specificity' },
  { color: BLUE,      badge: 'Internal', label: 'Internal <style> — in the <head>, scoped to one HTML file' },
  { color: GREEN,     badge: 'External', label: 'External <link> — one .css file for the whole site (best practice)' },
  { color: PURPLE,    badge: 'Cascade',  label: 'Cascade — specificity decides which rule wins' },
]

const CASCADE_RULES = [
  { spec: '(0,0,1)', sel: 'p',     prop: 'color: grey',  wins: false },
  { spec: '(0,1,0)', sel: '.text', prop: 'color: blue',  wins: true  },
  { spec: '(0,0,1)', sel: 'p',     prop: 'color: red',   wins: false },
]

export default function CSSBasicsViz({ step, compact = false }: Props) {
  const s = Math.max(0, Math.min(step, 4))
  const cfg = STEPS[s]
  const mono = 'var(--font-mono)'
  const fs = compact ? 8 : 10
  const panelW = compact ? 200 : 280

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 16 }}>
      <div style={{
        width: panelW,
        background: 'var(--surface)',
        border: `1px solid ${s === 0 ? 'var(--border)' : cfg.color + '44'}`,
        borderRadius: 10,
        overflow: 'hidden',
      }}>
        {/* Method badge bar */}
        <div style={{
          background: s === 0 ? 'var(--border)' : `${cfg.color}18`,
          borderBottom: `1px solid ${s === 0 ? 'var(--border)' : cfg.color + '33'}`,
          padding: compact ? '3px 8px' : '4px 12px',
        }}>
          <span style={{ fontFamily: mono, fontSize: compact ? 7 : 9, color: s === 0 ? '#52525b' : cfg.color, fontWeight: 600 }}>
            {cfg.badge}
          </span>
        </div>

        {/* Content */}
        <div style={{ padding: compact ? 10 : 14, minHeight: compact ? 60 : 80 }}>
          <AnimatePresence mode="wait">
            {s === 0 && (
              <motion.div key="none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <span style={{ fontFamily: 'Georgia, serif', fontSize: compact ? 11 : 14, color: '#a1a1aa' }}>
                  Default text — no CSS applied
                </span>
              </motion.div>
            )}
            {s === 1 && (
              <motion.div key="inline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <div style={{ fontFamily: mono, fontSize: fs, color: '#71717a', lineHeight: 1.7 }}>
                  {'<p '}
                  <span style={{ color: ORANGE, fontWeight: 700 }}>{'style="color: blue; font-weight: bold;"'}</span>
                  {'>'}
                </div>
                <div style={{ marginTop: compact ? 4 : 6, color: BLUE, fontWeight: 700, fontSize: compact ? 11 : 14, fontFamily: 'sans-serif' }}>Hello</div>
              </motion.div>
            )}
            {s === 2 && (
              <motion.div key="internal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <div style={{ fontFamily: mono, fontSize: fs, color: '#71717a', lineHeight: 1.7 }}>
                  {'<head>'}<br />
                  {'  '}<span style={{ color: BLUE, fontWeight: 700 }}>{'<style>'}</span><br />
                  {'    '}<span style={{ color: BLUE }}>{'p { color: blue; }'}</span><br />
                  {'  '}<span style={{ color: BLUE, fontWeight: 700 }}>{'</style>'}</span><br />
                  {'</head>'}
                </div>
              </motion.div>
            )}
            {s === 3 && (
              <motion.div key="external" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <div style={{ fontFamily: mono, fontSize: fs, color: '#71717a', lineHeight: 1.7 }}>
                  {'<head>'}<br />
                  {'  '}<span style={{ color: GREEN, fontWeight: 700 }}>{'<link rel="stylesheet" href="style.css">'}</span><br />
                  {'</head>'}
                </div>
                <div style={{ marginTop: compact ? 5 : 8, fontFamily: mono, fontSize: compact ? 7 : 9, color: GREEN, border: `1px solid ${GREEN}44`, borderRadius: 4, padding: '2px 6px', display: 'inline-block' }}>
                  style.css
                </div>
              </motion.div>
            )}
            {s === 4 && (
              <motion.div key="cascade" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
                style={{ display: 'flex', flexDirection: 'column', gap: compact ? 3 : 5 }}>
                {CASCADE_RULES.map((rule) => (
                  <div key={rule.sel + rule.prop} style={{
                    fontFamily: mono,
                    fontSize: compact ? 7 : 9,
                    padding: '2px 6px',
                    borderRadius: 4,
                    background: rule.wins ? `${PURPLE}18` : 'transparent',
                    border: rule.wins ? `1px solid ${PURPLE}55` : '1px solid transparent',
                    color: rule.wins ? PURPLE : '#52525b',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 4,
                  }}>
                    <span>
                      <span style={{ opacity: 0.6 }}>{rule.spec} </span>
                      <span>{rule.sel}</span>
                      <span style={{ opacity: 0.6 }}>{' { '}</span>
                      <span>{rule.prop}</span>
                      <span style={{ opacity: 0.6 }}>{' }'}</span>
                    </span>
                    {rule.wins && <span style={{ fontWeight: 700 }}>wins</span>}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={s}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          style={{
            margin: 0,
            fontFamily: mono,
            fontSize: compact ? 10 : 11,
            color: s === 0 ? '#71717a' : cfg.color,
            textAlign: 'center',
          }}
        >
          {cfg.label}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
