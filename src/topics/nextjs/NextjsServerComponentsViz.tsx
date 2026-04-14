import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const SKY    = '#38bdf8'
const GREEN  = '#4ade80'
const AMBER  = '#fbbf24'
const SLATE  = '#94a3b8'
const RED    = '#f87171'
const VIOLET = '#a78bfa'

const mono = 'var(--font-mono)'

export default function NextjsServerComponentsViz({ step, compact = false }: Props) {
  const s = Math.min(step, 3)
  const panelW = compact ? 220 : 300

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 16, width: '100%' }}>
      <AnimatePresence mode="wait">

        {/* Step 0 — Always on the Server */}
        {s === 0 && (
          <motion.div key="server-only"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>

            {/* Two-column diagram */}
            <div style={{ display: 'flex', gap: compact ? 4 : 6, alignItems: 'stretch' }}>
              {/* SERVER column */}
              <motion.div
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                style={{ flex: 1, background: `${SKY}0d`, border: `1px solid ${SKY}44`, borderRadius: 8, padding: compact ? '6px 8px' : '8px 10px' }}>
                <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: SKY, fontWeight: 700, marginBottom: compact ? 5 : 7, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                  SERVER
                </div>
                {['async ✓', 'fetch DB ✓', 'read secrets ✓', '0 JS to browser ✓'].map((item, i) => (
                  <motion.div key={item}
                    initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.07 }}
                    style={{ fontFamily: mono, fontSize: compact ? 7 : 9, color: GREEN, lineHeight: 1.7 }}>
                    {item}
                  </motion.div>
                ))}
              </motion.div>

              {/* Boundary line */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} style={{ width: 2, height: compact ? 5 : 7, background: SLATE + '55', borderRadius: 1 }} />
                ))}
              </div>

              {/* BROWSER column */}
              <motion.div
                initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                style={{ flex: 1, background: `${SLATE}08`, border: `1px solid ${SLATE}30`, borderRadius: 8, padding: compact ? '6px 8px' : '8px 10px', opacity: 0.65 }}>
                <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: SLATE, fontWeight: 700, marginBottom: compact ? 5 : 7, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                  BROWSER
                </div>
                <div style={{
                  fontFamily: mono, fontSize: compact ? 7 : 9, color: RED + 'bb',
                  textDecoration: 'line-through', lineHeight: 1.6,
                }}>
                  ✗ never arrives
                </div>
              </motion.div>
            </div>

            {/* Comment below */}
            <motion.div
              initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
              style={{
                fontFamily: mono, fontSize: compact ? 7 : 9, color: SLATE + 'aa',
                background: `${SLATE}0a`, border: `1px solid ${SLATE}22`,
                borderRadius: 6, padding: compact ? '4px 7px' : '5px 9px',
              }}>
              {'// no \'use client\' needed — Server Component by default'}
            </motion.div>
          </motion.div>
        )}

        {/* Step 1 — Direct Data Access */}
        {s === 1 && (
          <motion.div key="data-access"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>

            {/* Code panel */}
            <div style={{ background: `${SKY}0c`, border: `1px solid ${SKY}44`, borderRadius: 8, padding: compact ? 8 : 10 }}>
              <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: SKY, fontWeight: 700, marginBottom: compact ? 4 : 6, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                Direct DB Access
              </div>
              {[
                { text: '// No API route needed', color: SLATE + '88' },
                { text: 'const posts = await db.posts.findMany()', color: SLATE },
                { text: '// ↑ runs on server, credentials never exposed', color: SLATE + '77' },
              ].map((line, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  style={{ fontFamily: mono, fontSize: compact ? 7 : 9, color: line.color, lineHeight: 1.7 }}>
                  {line.text}
                </motion.div>
              ))}
            </div>

            {/* Secrets badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.28 }}
              style={{
                display: 'inline-flex', alignSelf: 'flex-start',
                background: `${GREEN}18`, border: `1px solid ${GREEN}55`,
                borderRadius: 6, padding: compact ? '3px 8px' : '4px 10px',
                fontFamily: mono, fontSize: compact ? 7 : 9, color: GREEN, fontWeight: 700,
              }}>
              secrets stay on server ✓
            </motion.div>

            {/* Crossed-out anti-pattern */}
            <motion.div
              initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}
              style={{
                fontFamily: mono, fontSize: compact ? 7 : 9, color: RED + '88',
                textDecoration: 'line-through',
                background: `${RED}08`, border: `1px solid ${RED}20`,
                borderRadius: 6, padding: compact ? '4px 7px' : '5px 9px',
              }}>
              {"// ✗ no useEffect, no useState, no fetch('/api/posts')"}
            </motion.div>
          </motion.div>
        )}

        {/* Step 2 — What You Cannot Do */}
        {s === 2 && (
          <motion.div key="cannot-do"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 5 : 8 }}>

            <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: RED, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
              Not Allowed in Server Components
            </div>

            {[
              { api: 'useState',           reason: 'no client state' },
              { api: 'useEffect',          reason: 'no lifecycle hooks' },
              { api: 'onClick / onChange', reason: 'no event handlers' },
              { api: 'window / localStorage', reason: 'no browser APIs' },
            ].map(({ api, reason }, i) => (
              <motion.div key={api}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: compact ? 6 : 8,
                  background: `${RED}08`, border: `1px solid ${RED}25`,
                  borderRadius: 6, padding: compact ? '4px 7px' : '5px 9px',
                }}>
                <span style={{ color: RED, fontSize: compact ? 9 : 11 }}>✗</span>
                <span style={{ fontFamily: mono, fontSize: compact ? 8 : 9, color: RED, fontWeight: 700, minWidth: compact ? 70 : 90 }}>{api}</span>
                <span style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: RED + '99' }}>{reason}</span>
              </motion.div>
            ))}

            {/* Solution hint */}
            <motion.div
              initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              style={{
                background: `${GREEN}0d`, border: `1px solid ${GREEN}44`,
                borderRadius: 6, padding: compact ? '5px 8px' : '6px 10px',
                fontFamily: mono, fontSize: compact ? 8 : 9, color: GREEN,
              }}>
              {'→ extract to a Client Component'}
            </motion.div>
          </motion.div>
        )}

        {/* Step 3 — Composing with Client Components */}
        {s === 3 && (
          <motion.div key="composing"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 4 : 6 }}>

            <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: VIOLET, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: compact ? 2 : 4 }}>
              Component Tree
            </div>

            {[
              { indent: 0, label: 'ServerPage',         type: 'server', badge: null },
              { indent: 1, label: 'ServerHeader',       type: 'server', badge: 'async, fetches data' },
              { indent: 1, label: 'InteractiveButton',  type: 'client', badge: "'use client'" },
              { indent: 2, label: 'data passed as props ↓', type: 'prop', badge: null },
              { indent: 1, label: 'ServerFooter',       type: 'server', badge: null },
            ].map(({ indent, label, type, badge }, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: compact ? 5 : 7,
                  paddingLeft: indent * (compact ? 14 : 18),
                }}>
                {indent > 0 && (
                  <span style={{ fontFamily: mono, fontSize: compact ? 8 : 9, color: SLATE + '66' }}>
                    {indent === 2 ? '│     ' : '├──'}
                  </span>
                )}
                <span style={{
                  fontFamily: mono, fontSize: compact ? 8 : 9, fontWeight: type === 'prop' ? 400 : 700,
                  color: type === 'server' ? SKY : type === 'client' ? AMBER : SLATE + '77',
                  fontStyle: type === 'prop' ? 'italic' : 'normal',
                }}>
                  {label}
                </span>
                {badge && (
                  <span style={{
                    fontFamily: mono, fontSize: compact ? 6 : 7,
                    color: type === 'client' ? AMBER : GREEN,
                    background: type === 'client' ? `${AMBER}18` : `${GREEN}12`,
                    border: `1px solid ${type === 'client' ? AMBER : GREEN}44`,
                    borderRadius: 4, padding: '1px 5px',
                  }}>
                    {badge}
                  </span>
                )}
                {type === 'server' && !badge && indent === 0 && (
                  <span style={{ fontFamily: mono, fontSize: compact ? 6 : 7, color: SKY + '88' }}>(server)</span>
                )}
              </motion.div>
            ))}

            {/* Legend */}
            <motion.div
              initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              style={{
                display: 'flex', gap: compact ? 8 : 12, marginTop: compact ? 4 : 6,
                fontFamily: mono, fontSize: compact ? 7 : 8,
              }}>
              <span style={{ color: SKY }}>■ server</span>
              <span style={{ color: AMBER }}>■ client</span>
            </motion.div>
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
            color: [SKY, GREEN, RED, VIOLET][s] ?? SKY,
            textAlign: 'center' as const, maxWidth: 320,
          }}>
          {[
            'Server Components run on the server only — never sent to the browser',
            'query the database directly — no API endpoint, no secrets exposed to browser',
            'no state · no effects · no events · no browser APIs — add use client if you need them',
            'Server Components can render Client Components — pass serializable data as props',
          ][s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
