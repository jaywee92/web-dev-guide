import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const SKY    = '#38bdf8'
const GREEN  = '#4ade80'
const AMBER  = '#fbbf24'
const SLATE  = '#94a3b8'
const VIOLET = '#a78bfa'

const mono = 'var(--font-mono)'

export default function NextjsRoutingViz({ step, compact = false }: Props) {
  const s = Math.min(step, 3)
  const panelW = compact ? 220 : 300
  const fs = compact ? 8 : 10

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 16, width: '100%' }}>
      <AnimatePresence mode="wait">

        {/* Step 0 — Folders = Routes */}
        {s === 0 && (
          <motion.div key="folders-routes"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 4 : 6 }}>
            <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: SLATE, marginBottom: compact ? 2 : 4, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              app/ directory
            </div>
            {[
              { indent: 0, folder: 'app/',          file: null,        url: null },
              { indent: 1, folder: null,             file: 'page.tsx', url: '/' },
              { indent: 1, folder: 'about/',         file: null,        url: null },
              { indent: 2, folder: null,             file: 'page.tsx', url: '/about' },
              { indent: 1, folder: 'blog/',          file: null,        url: null },
              { indent: 2, folder: null,             file: 'page.tsx', url: '/blog' },
              { indent: 2, folder: '[id]/',          file: null,        url: null },
              { indent: 3, folder: null,             file: 'page.tsx', url: '/blog/:id' },
            ].map(({ indent, folder, file, url }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                style={{
                  display: 'flex', alignItems: 'center',
                  paddingLeft: indent * (compact ? 10 : 14),
                  fontFamily: mono, fontSize: fs,
                }}>
                {folder && (
                  <span style={{ color: folder.startsWith('[') ? AMBER : SKY, fontWeight: 600 }}>{folder}</span>
                )}
                {file && (
                  <>
                    <span style={{ color: GREEN }}>{file}</span>
                    {url && (
                      <>
                        <span style={{ color: SLATE, margin: `0 ${compact ? 4 : 8}px` }}>→</span>
                        <span style={{ color: AMBER }}>{url}</span>
                      </>
                    )}
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 1 — Dynamic Segments */}
        {s === 1 && (
          <motion.div key="dynamic-segments"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>

            {/* Top panel */}
            <div style={{ background: `${SKY}0c`, border: `1px solid ${SKY}33`, borderRadius: 8, padding: compact ? 8 : 10 }}>
              <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: SKY, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                Dynamic folder
              </div>
              <div style={{ fontFamily: mono, fontSize: fs, lineHeight: 1.65 }}>
                <span style={{ color: SLATE }}>app/posts/</span>
                <span style={{ color: AMBER, fontWeight: 700 }}>{'['}</span>
                <span style={{ color: GREEN }}>id</span>
                <span style={{ color: AMBER, fontWeight: 700 }}>{']/page.tsx'}</span>
              </div>
              <div style={{ fontFamily: mono, fontSize: compact ? 8 : 9, color: SLATE, marginTop: compact ? 5 : 7, lineHeight: 1.65 }}>
                <span style={{ color: SLATE + '88' }}>const {'{'} </span>
                <span style={{ color: GREEN }}>id</span>
                <span style={{ color: SLATE + '88' }}> {'}'} = </span>
                <span style={{ color: SKY }}>await</span>
                <span style={{ color: SLATE + '88' }}> params</span>
              </div>
              <div style={{ fontFamily: mono, fontSize: compact ? 6 : 7, color: AMBER + '99', marginTop: 3 }}>
                Next.js 15+ — params is a Promise, must await
              </div>
            </div>

            {/* Bottom panel */}
            <div style={{ background: `${GREEN}0c`, border: `1px solid ${GREEN}33`, borderRadius: 8, padding: compact ? 8 : 10 }}>
              <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: GREEN, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                Matches any value
              </div>
              {['/posts/1', '/posts/hello', '/posts/abc-123'].map((url, i) => (
                <motion.div
                  key={url}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  style={{ fontFamily: mono, fontSize: fs, color: AMBER, lineHeight: 1.7 }}>
                  {url}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2 — Route Groups */}
        {s === 2 && (
          <motion.div key="route-groups"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>

            {/* Normal nesting */}
            <div style={{ background: '#f871710c', border: '1px solid #f8717133', borderRadius: 8, padding: compact ? 8 : 10 }}>
              <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: '#f87171', fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                Normal nesting
              </div>
              <div style={{ fontFamily: mono, fontSize: fs, color: SLATE, lineHeight: 1.65 }}>
                dashboard/settings/page.tsx
              </div>
              <div style={{ fontFamily: mono, fontSize: fs, marginTop: 3 }}>
                <span style={{ color: SLATE + '88' }}>→ URL: </span>
                <span style={{ color: AMBER }}>/dashboard/settings</span>
              </div>
            </div>

            {/* Route group */}
            <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              style={{ background: `${SKY}0c`, border: `1px solid ${SKY}33`, borderRadius: 8, padding: compact ? 8 : 10 }}>
              <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: SKY, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                Route Group
              </div>
              <div style={{ fontFamily: mono, fontSize: fs, color: SLATE, lineHeight: 1.65 }}>
                <span style={{ color: SLATE + '55', textDecoration: 'line-through' }}>(marketing)</span>
                <span style={{ color: SLATE }}>/about/page.tsx</span>
              </div>
              <div style={{ fontFamily: mono, fontSize: fs, marginTop: 3 }}>
                <span style={{ color: SLATE + '88' }}>→ URL: </span>
                <span style={{ color: GREEN }}>/about</span>
              </div>
              <div style={{ fontFamily: mono, fontSize: compact ? 6 : 7, color: SKY + '99', marginTop: 4 }}>
                parens = invisible in URL · share a layout
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Step 3 — Catch-all Segments */}
        {s === 3 && (
          <motion.div key="catch-all"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 4 : 6 }}>

            {/* Header row */}
            <div style={{ display: 'flex', gap: compact ? 4 : 8, fontFamily: mono, fontSize: compact ? 7 : 8, color: SLATE + '88', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: compact ? 2 : 4 }}>
              <span style={{ flex: '0 0 auto', minWidth: compact ? 80 : 100 }}>Pattern</span>
              <span style={{ flex: '0 0 auto', minWidth: compact ? 72 : 90 }}>Match</span>
              <span>params.slug</span>
            </div>

            {[
              { pattern: '[...slug]',   match: '/docs/a/b/c', result: "['a','b','c']" },
              { pattern: '[[...slug]]', match: '/docs',        result: 'undefined' },
              { pattern: '[[...slug]]', match: '/docs/a/b',   result: "['a','b']" },
            ].map(({ pattern, match, result }, i) => (
              <motion.div
                key={`${pattern}-${i}`}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  display: 'flex', gap: compact ? 4 : 8, alignItems: 'center',
                  fontFamily: mono, fontSize: compact ? 8 : 9,
                  background: `${SLATE}08`, border: `1px solid ${SLATE}22`,
                  borderRadius: 6, padding: compact ? '4px 6px' : '5px 8px',
                }}>
                <span style={{ color: VIOLET, fontWeight: 700, flex: '0 0 auto', minWidth: compact ? 80 : 100 }}>{pattern}</span>
                <span style={{ color: AMBER, flex: '0 0 auto', minWidth: compact ? 72 : 90 }}>{match}</span>
                <span style={{ color: GREEN }}>{result}</span>
              </motion.div>
            ))}
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
            color: [SKY, GREEN, SKY, VIOLET][s] ?? SKY,
            textAlign: 'center' as const, maxWidth: 320,
          }}>
          {[
            'folder inside app/ = route segment · page.tsx makes it renderable',
            '[brackets] = dynamic — params.id matches any value at that position',
            '(parens) = route group — shares layout without changing the URL',
            '[...slug] catches multiple segments · [[...slug]] also matches the root',
          ][s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
