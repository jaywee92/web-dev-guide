import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const SKY   = '#38bdf8'
const GREEN = '#4ade80'
const AMBER = '#fbbf24'
const SLATE = '#94a3b8'
const PINK  = '#f472b6'

const mono = 'var(--font-mono)'

export default function NextjsNavigationViz({ step, compact = false }: Props) {
  const s = Math.min(step, 3)
  const panelW = compact ? 220 : 300
  const fs = compact ? 8 : 10

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 16, width: '100%' }}>
      <AnimatePresence mode="wait">

        {/* Step 0 — Link Component */}
        {s === 0 && (
          <motion.div key="link-component"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>

            {/* Bad: plain <a> */}
            <div style={{ background: '#f871710c', border: '1px solid #f8717133', borderRadius: 8, padding: compact ? 8 : 10 }}>
              <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: '#f87171', fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                Plain anchor — full page reload ✗
              </div>
              <div style={{ fontFamily: mono, fontSize: fs, color: SLATE, lineHeight: 1.65 }}>
                <span style={{ color: '#7dd3fc' }}>{'<a '}</span>
                <span style={{ color: AMBER }}>{'href="/about"'}</span>
                <span style={{ color: '#7dd3fc' }}>{'>'}</span>
                <span style={{ color: SLATE }}>About</span>
                <span style={{ color: '#7dd3fc' }}>{'</a>'}</span>
              </div>
            </div>

            {/* Good: Link */}
            <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              style={{ background: `${GREEN}0c`, border: `1px solid ${GREEN}33`, borderRadius: 8, padding: compact ? 8 : 10 }}>
              <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: GREEN, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                Link — client-side nav · prefetches on scroll ✓
              </div>
              <div style={{ fontFamily: mono, fontSize: fs, color: SLATE, lineHeight: 1.65 }}>
                <span style={{ color: '#7dd3fc' }}>{'<Link '}</span>
                <span style={{ color: AMBER }}>{'href="/about"'}</span>
                <span style={{ color: '#7dd3fc' }}>{'>'}</span>
                <span style={{ color: SLATE }}>About</span>
                <span style={{ color: '#7dd3fc' }}>{'</Link>'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: compact ? 5 : 7 }}>
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 1.4 }}
                  style={{ width: 7, height: 7, borderRadius: '50%', background: SKY, flexShrink: 0 }} />
                <span style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: SKY + 'cc' }}>
                  prefetching in viewport…
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Step 1 — useRouter */}
        {s === 1 && (
          <motion.div key="use-router"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 5 : 8 }}>

            <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: SLATE + '99', marginBottom: compact ? 2 : 4 }}>
              import {'{ useRouter }'} from 'next/navigation'
            </div>

            {[
              { code: "router.push('/dashboard')", desc: 'adds to history',           color: GREEN },
              { code: "router.replace('/login')",  desc: 'replaces current entry',    color: SKY },
              { code: "router.back()",             desc: '← history',                 color: AMBER },
              { code: "router.forward()",          desc: '→ history',                 color: AMBER },
            ].map(({ code, desc, color }, i) => (
              <motion.div
                key={code}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.09 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: compact ? 6 : 10,
                  background: `${color}0c`, border: `1px solid ${color}2a`,
                  borderRadius: 6, padding: compact ? '4px 7px' : '5px 9px',
                }}>
                <span style={{ fontFamily: mono, fontSize: compact ? 8 : 9, color, fontWeight: 700, flex: '1 1 auto' }}>{code}</span>
                <span style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: SLATE + '88', flexShrink: 0 }}>{desc}</span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 2 — usePathname & useSearchParams */}
        {s === 2 && (
          <motion.div key="pathname-search"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>

            <div style={{ display: 'flex', gap: compact ? 5 : 8 }}>
              {/* usePathname */}
              <div style={{ flex: 1, background: `${SKY}0c`, border: `1px solid ${SKY}33`, borderRadius: 8, padding: compact ? 6 : 8 }}>
                <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: SKY, fontWeight: 700, marginBottom: 4 }}>usePathname()</div>
                <div style={{ fontFamily: mono, fontSize: compact ? 7 : 9, color: SLATE, lineHeight: 1.55 }}>
                  <span style={{ color: SLATE + '88' }}>→ </span>
                  <span style={{ color: SKY }}>'/dashboard/settings'</span>
                </div>
              </div>

              {/* useSearchParams */}
              <div style={{ flex: 1, background: `${GREEN}0c`, border: `1px solid ${GREEN}33`, borderRadius: 8, padding: compact ? 6 : 8 }}>
                <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: GREEN, fontWeight: 700, marginBottom: 4 }}>useSearchParams()</div>
                <div style={{ fontFamily: mono, fontSize: compact ? 7 : 9, color: SLATE, lineHeight: 1.55 }}>
                  <span style={{ color: AMBER }}>.get('q')</span>
                  <span style={{ color: SLATE + '88' }}> → </span>
                  <span style={{ color: GREEN }}>'react'</span>
                </div>
                <div style={{ fontFamily: mono, fontSize: compact ? 6 : 7, color: SLATE + '66', marginTop: 2 }}>?q=react</div>
              </div>
            </div>

            {/* Nav bar mockup */}
            <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              style={{ background: `${SLATE}0c`, border: `1px solid ${SLATE}22`, borderRadius: 8, padding: compact ? 6 : 8 }}>
              <div style={{ fontFamily: mono, fontSize: compact ? 6 : 7, color: SLATE + '77', marginBottom: compact ? 4 : 6 }}>Nav bar — active class via usePathname</div>
              <div style={{ display: 'flex', gap: compact ? 5 : 8 }}>
                {[
                  { label: 'Home',      path: '/' },
                  { label: 'Dashboard', path: '/dashboard' },
                  { label: 'Settings',  path: '/dashboard/settings' },
                ].map(({ label, path }) => {
                  const active = path === '/dashboard/settings'
                  return (
                    <div key={path} style={{
                      fontFamily: mono, fontSize: compact ? 8 : 9,
                      color: active ? AMBER : SLATE + '88',
                      background: active ? `${AMBER}18` : 'transparent',
                      border: `1px solid ${active ? AMBER + '44' : 'transparent'}`,
                      borderRadius: 5, padding: compact ? '2px 5px' : '3px 7px',
                    }}>
                      {label}
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Step 3 — redirect() and notFound() */}
        {s === 3 && (
          <motion.div key="redirect-notfound"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>

            {/* redirect */}
            <div style={{ background: `${SKY}0c`, border: `1px solid ${SKY}33`, borderRadius: 8, padding: compact ? 8 : 10 }}>
              <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: SKY, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                redirect()
              </div>
              <div style={{ fontFamily: mono, fontSize: fs, color: SLATE, lineHeight: 1.65 }}>
                <span style={{ color: GREEN }}>redirect</span>
                <span style={{ color: SLATE }}>{'('}</span>
                <span style={{ color: AMBER }}>'/login'</span>
                <span style={{ color: SLATE }}>{')'}</span>
              </div>
              <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: SKY + '99', marginTop: 4, lineHeight: 1.5 }}>
                Server Component / Server Action · no Client Component needed · throws internally
              </div>
            </div>

            {/* notFound */}
            <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              style={{ background: `${AMBER}0c`, border: `1px solid ${AMBER}33`, borderRadius: 8, padding: compact ? 8 : 10 }}>
              <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: AMBER, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                notFound()
              </div>
              <div style={{ fontFamily: mono, fontSize: fs, color: SLATE, lineHeight: 1.65 }}>
                <span style={{ color: GREEN }}>notFound</span>
                <span style={{ color: SLATE }}>{'()'}</span>
              </div>
              <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: AMBER + '99', marginTop: 4, lineHeight: 1.5 }}>
                renders nearest not-found.tsx · code after never runs
              </div>
            </motion.div>

            {/* Shared note */}
            <motion.div
              initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              style={{
                fontFamily: mono, fontSize: compact ? 7 : 8,
                color: PINK, textAlign: 'center' as const,
                background: `${PINK}0c`, border: `1px solid ${PINK}2a`,
                borderRadius: 6, padding: compact ? '4px 8px' : '5px 10px',
              }}>
              both throw internally — nothing after them executes
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
            color: [GREEN, SKY, AMBER, SKY][s] ?? SKY,
            textAlign: 'center' as const, maxWidth: 320,
          }}>
          {[
            'Link prefetches pages in the viewport — navigation feels instant',
            'useRouter for programmatic nav after events — push adds history, replace does not',
            'usePathname for active links · useSearchParams for ?key=value query strings',
            'redirect() and notFound() work in Server Components — no useRouter needed',
          ][s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
