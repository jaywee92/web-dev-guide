import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const SKY    = '#38bdf8'
const GREEN  = '#4ade80'
const AMBER  = '#fbbf24'
const SLATE  = '#94a3b8'
const RED    = '#f87171'
const VIOLET = '#a78bfa'

const mono = 'var(--font-mono)'

export default function NextjsLayoutsViz({ step, compact = false }: Props) {
  const s = Math.min(step, 3)
  const panelW = compact ? 220 : 300
  const fs = compact ? 8 : 10

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 16, width: '100%' }}>
      <AnimatePresence mode="wait">

        {/* Step 0 — Nested Layouts */}
        {s === 0 && (
          <motion.div key="nested-layouts"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW }}>
            {[
              { label: 'RootLayout (html + body)', color: SLATE },
              { label: 'DashboardLayout (sidebar)', color: SKY },
              { label: 'SettingsLayout (tabs)', color: GREEN },
              { label: 'page.tsx content', color: AMBER },
            ].map(({ label, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
                style={{
                  border: `1px solid ${color}44`,
                  borderRadius: 8,
                  padding: compact ? `${6 + i * 2}px ${6 + i * 2}px` : `${8 + i * 3}px ${8 + i * 3}px`,
                  margin: i === 0 ? 0 : compact ? `${3 + i}px` : `${4 + i}px`,
                  background: `${color}08`,
                }}>
                <div style={{ fontFamily: mono, fontSize: fs, color, fontWeight: 600 }}>{label}</div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 1 — Special Files */}
        {s === 1 && (
          <motion.div key="special-files"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexWrap: 'wrap' as const, gap: compact ? 5 : 7 }}>
            {[
              { name: 'loading.tsx',   desc: 'Suspense skeleton',             color: SKY },
              { name: 'error.tsx',     desc: "catches exceptions · 'use client'", color: RED },
              { name: 'not-found.tsx', desc: 'renders when notFound() called', color: AMBER },
              { name: 'template.tsx',  desc: 're-renders every nav',           color: VIOLET },
              { name: 'page.tsx',      desc: 'the actual UI',                  color: GREEN },
              { name: 'layout.tsx',    desc: 'persists across navs',           color: SLATE },
            ].map(({ name, desc, color }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08, type: 'spring', stiffness: 280, damping: 22 }}
                style={{
                  background: `${color}10`, border: `1px solid ${color}40`,
                  borderRadius: 7, padding: compact ? '5px 7px' : '6px 9px',
                  minWidth: compact ? 80 : 100,
                }}>
                <div style={{ fontFamily: mono, fontSize: compact ? 8 : 9, color, fontWeight: 700 }}>{name}</div>
                <div style={{ fontFamily: mono, fontSize: compact ? 6 : 7, color: color + '88', marginTop: 2 }}>{desc}</div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 2 — Metadata API */}
        {s === 2 && (
          <motion.div key="metadata"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>

            {/* Static */}
            <div style={{ background: `${SLATE}0c`, border: `1px solid ${SLATE}33`, borderRadius: 8, padding: compact ? 8 : 10 }}>
              <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: SLATE, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                Static metadata
              </div>
              <div style={{ fontFamily: mono, fontSize: fs, color: SLATE, lineHeight: 1.65 }}>
                <span style={{ color: SKY }}>export const </span>
                <span style={{ color: GREEN }}>metadata </span>
                <span style={{ color: SLATE }}>= {'{'}</span>
              </div>
              <div style={{ fontFamily: mono, fontSize: fs, color: SLATE, lineHeight: 1.65, paddingLeft: compact ? 10 : 14 }}>
                <span style={{ color: AMBER }}>title</span>
                <span style={{ color: SLATE }}>: </span>
                <span style={{ color: GREEN }}>'Home'</span>
                <span style={{ color: SLATE }}>,</span>
              </div>
              <div style={{ fontFamily: mono, fontSize: fs, color: SLATE, lineHeight: 1.65, paddingLeft: compact ? 10 : 14 }}>
                <span style={{ color: AMBER }}>description</span>
                <span style={{ color: SLATE }}>: </span>
                <span style={{ color: GREEN }}>'...'</span>
              </div>
              <div style={{ fontFamily: mono, fontSize: fs, color: SLATE, lineHeight: 1.65 }}>{'}'}</div>
              <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: GREEN + 'bb', marginTop: 4, background: `${GREEN}12`, borderRadius: 4, padding: '2px 6px', display: 'inline-block' }}>
                {'→ <title>Home</title>'}
              </div>
            </div>

            {/* Dynamic */}
            <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              style={{ background: `${SKY}0c`, border: `1px solid ${SKY}33`, borderRadius: 8, padding: compact ? 8 : 10 }}>
              <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: SKY, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                Dynamic metadata
              </div>
              <div style={{ fontFamily: mono, fontSize: compact ? 7 : 9, color: SLATE, lineHeight: 1.6 }}>
                <span style={{ color: SKY }}>export async function </span>
                <span style={{ color: GREEN }}>generateMetadata</span>
                <span style={{ color: SLATE }}>({'{ params }'})</span>
                <span style={{ color: SLATE }}>{' {'}</span>
              </div>
              <div style={{ fontFamily: mono, fontSize: compact ? 7 : 9, color: SLATE, lineHeight: 1.6, paddingLeft: compact ? 10 : 14 }}>
                <span style={{ color: SKY }}>return </span>
                <span style={{ color: SLATE }}>{'{ '}</span>
                <span style={{ color: AMBER }}>title</span>
                <span style={{ color: SLATE }}>: </span>
                <span style={{ color: GREEN }}>{`\`Post \${params.id}\``}</span>
                <span style={{ color: SLATE }}>{' }'}</span>
              </div>
              <div style={{ fontFamily: mono, fontSize: compact ? 7 : 9, color: SLATE, lineHeight: 1.6 }}>{'}'}</div>
              <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: SKY + 'bb', marginTop: 4, background: `${SKY}12`, borderRadius: 4, padding: '2px 6px', display: 'inline-block' }}>
                {'→ <title>Post 42</title>'}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Step 3 — RootLayout Requirements */}
        {s === 3 && (
          <motion.div key="root-layout"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>

            <div style={{ background: `${SLATE}0c`, border: `1px solid ${SLATE}33`, borderRadius: 8, padding: compact ? 8 : 10 }}>
              <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: SLATE, fontWeight: 700, marginBottom: 6, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                app/layout.tsx
                <span style={{ color: AMBER, fontWeight: 400, marginLeft: 6 }}>← REQUIRED</span>
              </div>
              {[
                { text: 'export default function RootLayout({ children }) {', color: SLATE, indent: 0 },
                { text: 'return (', color: SLATE, indent: 1 },
                { text: '<html lang="en">', color: AMBER, indent: 2 },
                { text: '<body>', color: AMBER, indent: 3 },
                { text: '{children}', color: GREEN, indent: 4 },
                { text: '</body>', color: AMBER, indent: 3 },
                { text: '</html>', color: AMBER, indent: 2 },
                { text: ')', color: SLATE, indent: 1 },
                { text: '}', color: SLATE, indent: 0 },
              ].map(({ text, color, indent }, i) => (
                <div key={i} style={{
                  fontFamily: mono, fontSize: compact ? 7 : 9, color,
                  lineHeight: 1.65, paddingLeft: indent * (compact ? 8 : 12),
                }}>
                  {text}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: compact ? 4 : 6, flexWrap: 'wrap' as const }}>
              {['global styles', 'analytics', 'auth providers'].map((badge, i) => (
                <motion.div
                  key={badge}
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  style={{
                    fontFamily: mono, fontSize: compact ? 7 : 8,
                    color: SKY, background: `${SKY}15`, border: `1px solid ${SKY}35`,
                    borderRadius: 5, padding: compact ? '3px 6px' : '4px 8px',
                  }}>
                  {badge}
                </motion.div>
              ))}
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
            color: [SKY, GREEN, SKY, AMBER][s] ?? SKY,
            textAlign: 'center' as const, maxWidth: 320,
          }}>
          {[
            'layout.tsx wraps page.tsx and persists — no re-render on child navigation',
            'loading · error · not-found · template — special filenames at any route level',
            'static metadata = exported const · dynamic = async generateMetadata() function',
            'root layout must include <html> and <body> — every page in the app flows through it',
          ][s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
