import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const SKY    = '#38bdf8'
const GREEN  = '#4ade80'
const AMBER  = '#fbbf24'
const SLATE  = '#94a3b8'
const RED    = '#f87171'
const VIOLET = '#a78bfa'

const mono = 'var(--font-mono)'

export default function NextjsSuspenseViz({ step, compact = false }: Props) {
  const s = Math.min(step, 2)
  const panelW = compact ? 220 : 300

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 16, width: '100%' }}>
      <AnimatePresence mode="wait">

        {/* Step 0 — loading.tsx — Instant Skeleton UI */}
        {s === 0 && (
          <motion.div key="loading-tsx"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>

            {/* Without loading.tsx */}
            <div style={{ background: `${RED}08`, border: `1px solid ${RED}25`, borderRadius: 8, padding: compact ? '6px 8px' : '8px 10px' }}>
              <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: RED + '99', fontWeight: 700, marginBottom: compact ? 4 : 6, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                Without loading.tsx
              </div>
              <div style={{
                background: `${SLATE}0a`, border: `1px solid ${SLATE}20`,
                borderRadius: 6, height: compact ? 28 : 36,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontFamily: mono, fontSize: compact ? 9 : 11, color: SLATE + '44' }}>...</span>
              </div>
              <div style={{ fontFamily: mono, fontSize: compact ? 6 : 7, color: RED + '77', marginTop: compact ? 3 : 4 }}>
                blank screen while page loads
              </div>
            </div>

            {/* With loading.tsx */}
            <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              style={{ background: `${GREEN}0c`, border: `1px solid ${GREEN}33`, borderRadius: 8, padding: compact ? '6px 8px' : '8px 10px' }}>
              <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: GREEN, fontWeight: 700, marginBottom: compact ? 4 : 6, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                With loading.tsx
              </div>
              {/* Skeleton shimmer bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 3 : 4 }}>
                {[0.85, 0.65, 0.75].map((w, i) => (
                  <div key={i} style={{
                    height: compact ? 6 : 8, borderRadius: 4,
                    background: `linear-gradient(90deg, ${SLATE}22, ${SLATE}44, ${SLATE}22)`,
                    width: `${w * 100}%`,
                    backgroundSize: '200% 100%',
                    animation: `shimmer 1.5s infinite ${i * 0.2}s`,
                  }} />
                ))}
              </div>
              <div style={{ fontFamily: mono, fontSize: compact ? 6 : 7, color: GREEN + '99', marginTop: compact ? 4 : 5 }}>
                streaming from server ✓
              </div>
            </motion.div>

            {/* Code comment */}
            <motion.div
              initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }}
              style={{
                fontFamily: mono, fontSize: compact ? 7 : 9, color: SLATE + '88',
                background: `${SLATE}0a`, border: `1px solid ${SLATE}22`,
                borderRadius: 6, padding: compact ? '4px 7px' : '5px 9px',
              }}>
              {'// Next.js auto-wraps page.tsx in <Suspense fallback={<Loading />}>'}
            </motion.div>
          </motion.div>
        )}

        {/* Step 1 — Streaming with Suspense */}
        {s === 1 && (
          <motion.div key="streaming"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 5 : 8 }}>

            <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: SLATE + '99', marginBottom: compact ? 1 : 2 }}>
              Page regions stream independently:
            </div>

            {/* Three regions */}
            {[
              { label: 'Hero',       color: GREEN,  loaded: true,  delay: 0.05 },
              { label: 'UserPosts',  color: SKY,    loaded: false, delay: 0.13 },
              { label: 'Sidebar',    color: VIOLET, loaded: false, delay: 0.21 },
            ].map(({ label, color, loaded, delay }) => (
              <motion.div key={label}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay }}
                style={{
                  background: `${color}0a`,
                  border: `${loaded ? '1px solid' : '1px dashed'} ${color}${loaded ? '55' : '44'}`,
                  borderRadius: 8, padding: compact ? '5px 8px' : '6px 10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                <span style={{ fontFamily: mono, fontSize: compact ? 8 : 9, color, fontWeight: 700 }}>{label}</span>
                {loaded ? (
                  <span style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: GREEN }}>loaded ✓</span>
                ) : (
                  <div style={{ display: 'flex', gap: compact ? 2 : 3, alignItems: 'center' }}>
                    {[0, 1, 2].map(i => (
                      <motion.div key={i}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
                        style={{ width: compact ? 3 : 4, height: compact ? 3 : 4, borderRadius: '50%', background: color }} />
                    ))}
                    <span style={{ fontFamily: mono, fontSize: compact ? 6 : 7, color: color + '88', marginLeft: 3 }}>loading</span>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Arrow note */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
              style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: SLATE + '88', textAlign: 'center' as const }}>
              each Suspense boundary resolves independently
            </motion.div>

            {/* Code snippet */}
            <motion.div
              initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.44 }}
              style={{
                fontFamily: mono, fontSize: compact ? 7 : 9, color: SLATE + '99',
                background: `${SLATE}0a`, border: `1px solid ${SLATE}22`,
                borderRadius: 6, padding: compact ? '4px 7px' : '5px 9px',
                lineHeight: 1.6,
              }}>
              <span style={{ color: SLATE + '55' }}>{'<'}</span>
              <span style={{ color: SKY }}>Suspense</span>
              <span style={{ color: AMBER }}>{' fallback={<Skeleton />}'}</span>
              <span style={{ color: SLATE + '55' }}>{'>'}</span>
              <br />
              <span style={{ color: SLATE + '55' }}>{'  <'}</span>
              <span style={{ color: GREEN }}>SlowComponent</span>
              <span style={{ color: SLATE + '55' }}>{' />'}</span>
              <br />
              <span style={{ color: SLATE + '55' }}>{'</'}</span>
              <span style={{ color: SKY }}>Suspense</span>
              <span style={{ color: SLATE + '55' }}>{'>'}</span>
            </motion.div>
          </motion.div>
        )}

        {/* Step 2 — error.tsx and not-found.tsx */}
        {s === 2 && (
          <motion.div key="error-notfound"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>

            {/* error.tsx panel */}
            <motion.div
              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }}
              style={{ background: `${RED}0c`, border: `1px solid ${RED}44`, borderRadius: 8, padding: compact ? '6px 8px' : '8px 10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 5 : 7, marginBottom: compact ? 3 : 5 }}>
                <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: RED, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                  error.tsx
                </div>
                <span style={{
                  fontFamily: mono, fontSize: compact ? 6 : 7, color: AMBER,
                  background: `${AMBER}18`, border: `1px solid ${AMBER}44`,
                  borderRadius: 3, padding: '1px 5px',
                }}>
                  'use client'
                </span>
              </div>
              <div style={{ fontFamily: mono, fontSize: compact ? 7 : 9, color: SLATE + 'aa', lineHeight: 1.65 }}>
                <span style={{ color: SLATE + '66' }}>{'({ '}</span>
                <span style={{ color: SKY }}>error</span>
                <span style={{ color: SLATE + '66' }}>{', '}</span>
                <span style={{ color: GREEN }}>reset</span>
                <span style={{ color: SLATE + '66' }}>{' }) => '}</span>
              </div>
              <div style={{ fontFamily: mono, fontSize: compact ? 7 : 9, color: SLATE + 'aa', lineHeight: 1.65 }}>
                <span style={{ color: SLATE + '44' }}>{'  '}</span>
                <span style={{ color: AMBER }}>{'<button onClick={reset}>'}</span>
                <span style={{ color: SLATE + '77' }}>Retry</span>
                <span style={{ color: AMBER }}>{'</button>'}</span>
              </div>
              <div style={{ fontFamily: mono, fontSize: compact ? 6 : 7, color: RED + '88', marginTop: compact ? 3 : 4 }}>
                catches unhandled exceptions in route segment
              </div>
            </motion.div>

            {/* not-found.tsx panel */}
            <motion.div
              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18 }}
              style={{ background: `${AMBER}0c`, border: `1px solid ${AMBER}44`, borderRadius: 8, padding: compact ? '6px 8px' : '8px 10px' }}>
              <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: AMBER, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: compact ? 3 : 5 }}>
                not-found.tsx
              </div>
              <div style={{ fontFamily: mono, fontSize: compact ? 7 : 9, color: SLATE + 'aa', lineHeight: 1.65 }}>
                <span style={{ color: VIOLET }}>notFound</span>
                <span style={{ color: SLATE + '66' }}>()</span>
                <span style={{ color: SLATE + '55' }}>{' → renders this file'}</span>
              </div>
              <div style={{ fontFamily: mono, fontSize: compact ? 6 : 7, color: AMBER + '88', marginTop: compact ? 3 : 4 }}>
                call notFound() to trigger
              </div>
            </motion.div>

            {/* Scope note */}
            <motion.div
              initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              style={{
                fontFamily: mono, fontSize: compact ? 7 : 8, color: SLATE + '88',
                background: `${SLATE}0a`, border: `1px solid ${SLATE}22`,
                borderRadius: 6, padding: compact ? '4px 7px' : '5px 9px',
                textAlign: 'center' as const,
              }}>
              place at different route levels to scope what they catch
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
            color: [GREEN, SKY, RED][s] ?? SKY,
            textAlign: 'center' as const, maxWidth: 320,
          }}>
          {[
            'loading.tsx auto-wraps the page in Suspense — users see a skeleton instead of blank',
            'manual Suspense lets multiple sections stream independently — each resolves at its own pace',
            'error.tsx must be use client to call reset() · not-found.tsx renders when notFound() is called',
          ][s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
