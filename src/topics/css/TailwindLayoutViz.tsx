import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const SKY   = '#38bdf8'
const GREEN = '#4ade80'
const AMBER = '#fbbf24'
const SLATE = '#94a3b8'
const VIOLET = '#a78bfa'

const mono = 'var(--font-mono)'

export default function TailwindLayoutViz({ step, compact = false }: Props) {
  const s = Math.min(step, 3)
  const panelW = compact ? 220 : 300

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 16, width: '100%' }}>
      <AnimatePresence mode="wait">

        {/* Step 0: Spacing Scale */}
        {s === 0 && (
          <motion.div key="spacing"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW }}>
            <div style={{ fontSize: compact ? 7 : 8, fontFamily: mono, color: SLATE, marginBottom: compact ? 6 : 8, textAlign: 'center' as const }}>
              4px base unit — consistent scale
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 3 : 5 }}>
              {[
                { cls: 'p-1',  px: '4px',  w: 8  },
                { cls: 'p-2',  px: '8px',  w: 16 },
                { cls: 'p-4',  px: '16px', w: 32 },
                { cls: 'p-6',  px: '24px', w: 48 },
                { cls: 'p-8',  px: '32px', w: 64 },
                { cls: 'p-12', px: '48px', w: 96 },
              ].map(({ cls, px, w }, i) => (
                <motion.div
                  key={cls}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  style={{ display: 'flex', alignItems: 'center', gap: compact ? 6 : 10 }}>
                  <span style={{
                    fontFamily: mono, fontSize: compact ? 8 : 9, fontWeight: 700, color: SKY,
                    minWidth: compact ? 24 : 30, background: `${SKY}14`,
                    border: `1px solid ${SKY}33`, borderRadius: 4, padding: '1px 4px',
                    textAlign: 'center' as const,
                  }}>{cls}</span>
                  <div style={{
                    height: compact ? 6 : 8, width: compact ? w * 0.6 : w,
                    background: `${SKY}44`, borderRadius: 2, flexShrink: 0,
                  }} />
                  <span style={{ fontFamily: mono, fontSize: compact ? 7 : 9, color: SLATE + '88' }}>{px}</span>
                </motion.div>
              ))}
            </div>
            <div style={{ marginTop: compact ? 6 : 10, fontFamily: mono, fontSize: compact ? 7 : 8, color: AMBER + 'cc', textAlign: 'center' as const }}>
              px-* py-* mx-* my-* gap-* — same scale
            </div>
          </motion.div>
        )}

        {/* Step 1: Sizing & Centering */}
        {s === 1 && (
          <motion.div key="sizing"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 5 : 8 }}>

            {/* max-w + mx-auto centering */}
            <div style={{ border: `1px dashed ${SLATE}44`, borderRadius: 8, padding: compact ? 6 : 8 }}>
              <div style={{ fontSize: compact ? 7 : 8, fontFamily: mono, color: SLATE, marginBottom: 4 }}>viewport</div>
              <motion.div
                initial={{ width: '100%' }} animate={{ width: '66%' }} transition={{ delay: 0.4, duration: 0.5 }}
                style={{
                  margin: '0 auto',
                  background: `${SKY}1a`, border: `1px solid ${SKY}44`,
                  borderRadius: 6, padding: compact ? '4px 6px' : '5px 9px',
                  textAlign: 'center' as const,
                }}>
                <span style={{ fontFamily: mono, fontSize: compact ? 7 : 9, color: SKY }}>max-w-2xl mx-auto</span>
              </motion.div>
            </div>

            {/* Width examples */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 3 : 4 }}>
              {[
                { cls: 'w-full',   pct: 100, color: GREEN  },
                { cls: 'w-3/4',    pct: 75,  color: SKY    },
                { cls: 'w-1/2',    pct: 50,  color: AMBER  },
                { cls: 'w-1/3',    pct: 33,  color: VIOLET },
              ].map(({ cls, pct, color }, i) => (
                <motion.div
                  key={cls}
                  initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.07 }}
                  style={{ display: 'flex', alignItems: 'center', gap: compact ? 5 : 8 }}>
                  <span style={{ fontFamily: mono, fontSize: compact ? 8 : 9, color, minWidth: compact ? 34 : 42, fontWeight: 700 }}>{cls}</span>
                  <div style={{
                    height: compact ? 6 : 8, width: `${pct * (compact ? 0.45 : 0.55)}%`,
                    background: color + '44', border: `1px solid ${color}44`, borderRadius: 2,
                  }} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Flexbox */}
        {s === 2 && (
          <motion.div key="flex"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>

            {/* Navbar pattern */}
            <div>
              <div style={{ fontSize: compact ? 7 : 8, fontFamily: mono, color: SLATE, marginBottom: 4 }}>flex items-center justify-between</div>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: `${SKY}0c`, border: `1px solid ${SKY}33`, borderRadius: 8,
                  padding: compact ? '5px 8px' : '7px 12px', gap: 8,
                }}>
                <div style={{ fontFamily: mono, fontSize: compact ? 8 : 9, color: SKY, fontWeight: 700 }}>Logo</div>
                <div style={{ display: 'flex', gap: compact ? 4 : 7 }}>
                  {['Home', 'About', 'Sign in'].map((item, i) => (
                    <span key={item} style={{
                      fontFamily: mono, fontSize: compact ? 7 : 8,
                      color: i === 2 ? '#0ea5e9' : SLATE,
                      background: i === 2 ? '#0ea5e914' : 'transparent',
                      border: i === 2 ? '1px solid #0ea5e933' : 'none',
                      borderRadius: i === 2 ? 4 : 0, padding: i === 2 ? '1px 5px' : 0,
                    }}>{item}</span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar + flex-1 */}
            <div>
              <div style={{ fontSize: compact ? 7 : 8, fontFamily: mono, color: SLATE, marginBottom: 4 }}>flex — sidebar (w-64) + main (flex-1)</div>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                style={{ display: 'flex', gap: compact ? 3 : 5, height: compact ? 40 : 54 }}>
                <div style={{
                  width: compact ? 36 : 50, flexShrink: 0,
                  background: `${VIOLET}14`, border: `1px solid ${VIOLET}33`,
                  borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontFamily: mono, fontSize: compact ? 6 : 7, color: VIOLET }}>w-64</span>
                </div>
                <div style={{
                  flex: 1,
                  background: `${GREEN}0c`, border: `1px solid ${GREEN}33`,
                  borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontFamily: mono, fontSize: compact ? 6 : 7, color: GREEN }}>flex-1</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Grid */}
        {s === 3 && (
          <motion.div key="grid"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>

            {/* 3-column grid */}
            <div>
              <div style={{ fontSize: compact ? 7 : 8, fontFamily: mono, color: SLATE, marginBottom: 4 }}>grid grid-cols-3 gap-4</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: compact ? 3 : 5 }}>
                {['Card', 'Card', 'Card'].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.1, type: 'spring', stiffness: 300, damping: 22 }}
                    style={{
                      background: `${SKY}14`, border: `1px solid ${SKY}33`,
                      borderRadius: 6, padding: compact ? '4px 0' : '7px 0',
                      textAlign: 'center' as const, fontFamily: mono, fontSize: compact ? 7 : 8, color: SKY,
                    }}>
                    Card
                  </motion.div>
                ))}
              </div>
            </div>

            {/* col-span-2 */}
            <div>
              <div style={{ fontSize: compact ? 7 : 8, fontFamily: mono, color: SLATE, marginBottom: 4 }}>col-span-2 — spans two columns</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: compact ? 3 : 5 }}>
                {[
                  { label: 'col-span-2', span: 2, color: AMBER },
                  { label: '1 col',      span: 1, color: SLATE },
                ].map(({ label, span, color }) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, type: 'spring', stiffness: 300, damping: 22 }}
                    style={{
                      gridColumn: `span ${span}`,
                      background: `${color}14`, border: `1px solid ${color}33`,
                      borderRadius: 6, padding: compact ? '4px 0' : '7px 0',
                      textAlign: 'center' as const, fontFamily: mono, fontSize: compact ? 7 : 8, color,
                    }}>
                    {label}
                  </motion.div>
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
            color: [SKY, GREEN, AMBER, SKY][s] ?? SKY,
            textAlign: 'center' as const, maxWidth: 320,
          }}
        >
          {[
            'p-1=4px · p-2=8px · p-4=16px · p-8=32px — 4px steps',
            'max-w-* caps width · mx-auto centers · w-full / w-1/2 for widths',
            'flex + items-center + justify-between · flex-1 fills remaining space',
            'grid-cols-* creates columns · col-span-* stretches across columns',
          ][s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
