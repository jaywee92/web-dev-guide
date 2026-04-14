import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const SKY    = '#38bdf8'
const GREEN  = '#4ade80'
const AMBER  = '#fbbf24'
const SLATE  = '#94a3b8'
const RED    = '#f87171'
const VIOLET = '#a78bfa'

const mono = 'var(--font-mono)'

export default function NextjsClientComponentsViz({ step, compact = false }: Props) {
  const s = Math.min(step, 3)
  const fs = compact ? 8 : 10
  const panelW = compact ? 220 : 300

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 16, width: '100%' }}>
      <AnimatePresence mode="wait">

        {/* Step 0 — 'use client' Directive */}
        {s === 0 && (
          <motion.div key="use-client"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>

            {/* File mock */}
            <div style={{ background: '#1e1e2e', border: `1px solid ${SLATE}30`, borderRadius: 8, overflow: 'hidden' }}>
              {/* File header */}
              <div style={{ background: `${SLATE}14`, padding: compact ? '3px 8px' : '4px 10px', borderBottom: `1px solid ${SLATE}22` }}>
                <span style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: SLATE + '88' }}>Counter.tsx</span>
              </div>

              {/* 'use client' line highlighted */}
              <motion.div
                initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                style={{
                  background: `${AMBER}18`, borderLeft: `3px solid ${AMBER}`,
                  padding: compact ? '3px 8px' : '4px 10px',
                }}>
                <span style={{ fontFamily: mono, fontSize: fs, color: AMBER, fontWeight: 700 }}>
                  {'\'use client\''}
                </span>
              </motion.div>

              {/* Dim rest of file */}
              {["", "import { useState } from 'react'", "", "export default function Counter() {", "  const [n, setN] = useState(0)", "  return <button onClick={() => setN(n+1)}>{n}</button>", "}"].map((line, i) => (
                <div key={i} style={{
                  fontFamily: mono, fontSize: compact ? 7 : 9,
                  color: SLATE + '44', lineHeight: 1.65,
                  padding: line === '' ? 0 : compact ? '0 8px' : '0 10px',
                  height: line === '' ? compact ? 3 : 4 : undefined,
                }}>
                  {line}
                </div>
              ))}
              <div style={{ height: compact ? 4 : 6 }} />
            </div>

            {/* Arrow + bundle indicator */}
            <motion.div
              initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              style={{ display: 'flex', flexDirection: 'column', gap: compact ? 4 : 6 }}>
              <div style={{ fontFamily: mono, fontSize: compact ? 7 : 9, color: SLATE + 'aa', textAlign: 'center' as const }}>
                everything imported from this file → client bundle too
              </div>
              {/* Bundle size bar */}
              <div style={{ background: `${SLATE}18`, borderRadius: 4, overflow: 'hidden', height: compact ? 8 : 10 }}>
                <motion.div
                  initial={{ width: '30%' }} animate={{ width: '58%' }}
                  transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
                  style={{ height: '100%', background: `linear-gradient(90deg, ${AMBER}88, ${AMBER})`, borderRadius: 4 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: compact ? 6 : 7, color: SLATE + '77' }}>
                <span>bundle size</span>
                <span style={{ color: AMBER }}>grows with each import</span>
              </div>
            </motion.div>

            {/* Label */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              style={{
                fontFamily: mono, fontSize: compact ? 7 : 9, color: SKY + 'cc',
                background: `${SKY}0a`, border: `1px solid ${SKY}25`,
                borderRadius: 6, padding: compact ? '4px 7px' : '5px 9px',
                textAlign: 'center' as const,
              }}>
              {'\'use client\' = boundary declaration — server-to-client handoff'}
            </motion.div>
          </motion.div>
        )}

        {/* Step 1 — When to Use Client Components */}
        {s === 1 && (
          <motion.div key="when-to-use"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>

            {/* Add use client when... */}
            <div style={{ background: `${AMBER}0c`, border: `1px solid ${AMBER}33`, borderRadius: 8, padding: compact ? '6px 8px' : '8px 10px' }}>
              <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: AMBER, fontWeight: 700, marginBottom: compact ? 4 : 6, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                Add 'use client' when you need:
              </div>
              {[
                "useState / useEffect / useRef",
                "onClick, onChange, onSubmit",
                "window, document, localStorage",
                "Real-time / live updates",
              ].map((item, i) => (
                <motion.div key={item}
                  initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  style={{ display: 'flex', alignItems: 'center', gap: compact ? 5 : 7, fontFamily: mono, fontSize: compact ? 7 : 9, color: AMBER + 'dd', lineHeight: 1.7 }}>
                  <span style={{ color: AMBER }}>✓</span>{item}
                </motion.div>
              ))}
            </div>

            {/* Keep as Server Component if... */}
            <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}
              style={{ background: `${GREEN}0c`, border: `1px solid ${GREEN}33`, borderRadius: 8, padding: compact ? '6px 8px' : '8px 10px' }}>
              <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: GREEN, fontWeight: 700, marginBottom: compact ? 4 : 6, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                Keep as Server Component if:
              </div>
              {[
                "Fetching data only",
                "Displaying static content",
                "No browser APIs needed",
              ].map((item) => (
                <div key={item}
                  style={{ display: 'flex', alignItems: 'center', gap: compact ? 5 : 7, fontFamily: mono, fontSize: compact ? 7 : 9, color: GREEN + 'dd', lineHeight: 1.7 }}>
                  <span style={{ color: GREEN }}>✓</span>{item}
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Step 2 — Hydration */}
        {s === 2 && (
          <motion.div key="hydration"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 5 : 8 }}>

            <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: VIOLET, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
              Hydration Flow
            </div>

            {[
              { num: '1', title: 'Server renders HTML', note: 'fast initial paint', color: SKY },
              { num: '2', title: 'Browser downloads JS', note: 'bundle arrives', color: AMBER },
              { num: '3', title: 'React hydrates', note: 'interactive ✓', color: GREEN },
            ].map(({ num, title, note, color }, i) => (
              <motion.div key={num}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{ display: 'flex', alignItems: 'center', gap: compact ? 7 : 10 }}>
                <div style={{
                  width: compact ? 18 : 22, height: compact ? 18 : 22,
                  borderRadius: '50%', background: `${color}22`, border: `2px solid ${color}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: mono, fontSize: compact ? 8 : 10, color, fontWeight: 700, flexShrink: 0,
                }}>
                  {num}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: mono, fontSize: compact ? 8 : 9, color, fontWeight: 700 }}>{title}</div>
                  <div style={{ fontFamily: mono, fontSize: compact ? 6 : 7, color: color + '88' }}>{note}</div>
                </div>
                {i < 2 && (
                  <div style={{ color: SLATE + '55', fontSize: compact ? 10 : 12 }}>↓</div>
                )}
              </motion.div>
            ))}

            {/* Warning */}
            <motion.div
              initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}
              style={{
                fontFamily: mono, fontSize: compact ? 7 : 8, color: RED + 'cc',
                background: `${RED}08`, border: `1px solid ${RED}25`,
                borderRadius: 6, padding: compact ? '4px 7px' : '5px 9px',
                lineHeight: 1.5,
              }}>
              identical output required — if server/client differ → hydration error
            </motion.div>
          </motion.div>
        )}

        {/* Step 3 — Push Boundaries to the Leaves */}
        {s === 3 && (
          <motion.div key="leaves"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>

            <div style={{ display: 'flex', gap: compact ? 8 : 12 }}>
              {/* Left — bad: use client at root */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: mono, fontSize: compact ? 6 : 7, color: RED + '99',
                  textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: compact ? 4 : 5,
                }}>
                  ✗ root boundary
                </div>
                {[
                  { label: "'use client'", color: RED, indent: 0, dim: false },
                  { label: 'Page',         color: RED,  indent: 0, dim: true },
                  { label: 'Header',       color: RED,  indent: 1, dim: true },
                  { label: 'Main',         color: RED,  indent: 1, dim: true },
                  { label: 'Button',       color: RED,  indent: 2, dim: true },
                ].map(({ label, color, indent, dim }, i) => (
                  <div key={i} style={{
                    fontFamily: mono, fontSize: compact ? 7 : 8,
                    color: dim ? color + '55' : color, lineHeight: 1.65,
                    paddingLeft: indent * (compact ? 8 : 10),
                  }}>
                    {indent > 0 ? '└ ' : ''}{label}
                  </div>
                ))}
                <div style={{
                  fontFamily: mono, fontSize: compact ? 6 : 7, color: RED + '77',
                  marginTop: compact ? 3 : 4,
                }}>
                  entire tree → client
                </div>
              </div>

              {/* Divider */}
              <div style={{ width: 1, background: SLATE + '30', borderRadius: 1 }} />

              {/* Right — good: use client only on leaf */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: mono, fontSize: compact ? 6 : 7, color: GREEN + '99',
                  textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: compact ? 4 : 5,
                }}>
                  ✓ leaf boundary
                </div>
                {[
                  { label: 'Page',               color: SKY,   indent: 0, delay: 0.1 },
                  { label: 'Header',             color: SKY,   indent: 1, delay: 0.17 },
                  { label: 'Main',               color: SKY,   indent: 1, delay: 0.24 },
                  { label: 'InteractiveButton',  color: AMBER, indent: 2, delay: 0.31 },
                ].map(({ label, color, indent, delay }, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: 5 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay }}
                    style={{
                      fontFamily: mono, fontSize: compact ? 7 : 8,
                      color, lineHeight: 1.65,
                      paddingLeft: indent * (compact ? 8 : 10),
                    }}>
                    {indent > 0 ? '└ ' : ''}{label}
                    {label === 'InteractiveButton' && (
                      <span style={{
                        fontFamily: mono, fontSize: compact ? 5 : 6,
                        color: AMBER, background: `${AMBER}18`,
                        border: `1px solid ${AMBER}44`,
                        borderRadius: 3, padding: '0 4px', marginLeft: 4,
                      }}>
                        use client
                      </span>
                    )}
                  </motion.div>
                ))}
                <div style={{
                  fontFamily: mono, fontSize: compact ? 6 : 7, color: GREEN + '77',
                  marginTop: compact ? 3 : 4,
                }}>
                  minimal bundle ✓
                </div>
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
            color: [AMBER, GREEN, SKY, GREEN][s] ?? SKY,
            textAlign: 'center' as const, maxWidth: 320,
          }}>
          {[
            "'use client' = boundary — marks the server-to-client handoff point for the file tree",
            'add use client only for hooks, events, and browser APIs — everything else stays server',
            'Client Components ARE server-rendered first — use client enables hydration, not client-only',
            'push use client as far down the tree as possible — keep the bundle minimal',
          ][s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
