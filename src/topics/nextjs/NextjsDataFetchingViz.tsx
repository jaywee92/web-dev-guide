import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const SKY    = '#38bdf8'
const GREEN  = '#4ade80'
const AMBER  = '#fbbf24'
const SLATE  = '#94a3b8'
const RED    = '#f87171'
const VIOLET = '#a78bfa'

const mono = 'var(--font-mono)'

export default function NextjsDataFetchingViz({ step, compact = false }: Props) {
  const s = Math.min(step, 3)
  const fs = compact ? 8 : 10
  const panelW = compact ? 220 : 300

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 16, width: '100%' }}>
      <AnimatePresence mode="wait">

        {/* Step 0: fetch() in Server Components */}
        {s === 0 && (
          <motion.div key="fetch-server"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>

            {/* Old pattern */}
            <div style={{ background: `${RED}0c`, border: `1px solid ${RED}33`, borderRadius: 8, padding: compact ? 8 : 10, opacity: 0.7 }}>
              <div style={{ fontSize: compact ? 7 : 8, fontFamily: mono, color: RED, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Old Pattern</div>
              <div style={{ fontFamily: mono, fontSize: fs, color: SLATE, lineHeight: 1.6 }}>
                <span style={{ color: VIOLET }}>useEffect</span>
                <span style={{ color: SLATE }}>{'(() => {'}</span>
              </div>
              <div style={{ fontFamily: mono, fontSize: fs, color: SLATE, lineHeight: 1.6, paddingLeft: compact ? 10 : 14 }}>
                <span style={{ color: SKY }}>fetch</span>
                <span style={{ color: SLATE }}>{'('}</span>
                <span style={{ color: AMBER }}>{'"/api/posts"'}</span>
                <span style={{ color: SLATE }}>{')'}</span>
              </div>
              <div style={{ fontFamily: mono, fontSize: fs, color: SLATE, lineHeight: 1.6 }}>
                <span style={{ color: SLATE }}>{'}, [])'}</span>
              </div>
              <div style={{ fontSize: compact ? 7 : 8, color: RED + '99', fontFamily: mono, marginTop: 3 }}>client, extra roundtrip ✗</div>
            </div>

            {/* New pattern */}
            <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              style={{ background: `${GREEN}0c`, border: `1px solid ${GREEN}33`, borderRadius: 8, padding: compact ? 8 : 10 }}>
              <div style={{ fontSize: compact ? 7 : 8, fontFamily: mono, color: GREEN, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>New Pattern</div>
              <div style={{ fontFamily: mono, fontSize: fs, color: SLATE + '88', lineHeight: 1.6 }}>
                {'// Server Component — no useEffect needed'}
              </div>
              <div style={{ fontFamily: mono, fontSize: fs, color: SLATE, lineHeight: 1.6 }}>
                <span style={{ color: VIOLET }}>const </span>
                <span style={{ color: SKY }}>res </span>
                <span style={{ color: SLATE }}>= </span>
                <span style={{ color: AMBER }}>await </span>
                <span style={{ color: SKY }}>fetch</span>
                <span style={{ color: SLATE }}>{'('}</span>
                <span style={{ color: GREEN }}>{'\'https://api.example.com/posts\''}</span>
                <span style={{ color: SLATE }}>{')'}</span>
              </div>
              <div style={{ fontFamily: mono, fontSize: fs, color: SLATE, lineHeight: 1.6 }}>
                <span style={{ color: VIOLET }}>const </span>
                <span style={{ color: SKY }}>posts </span>
                <span style={{ color: SLATE }}>= </span>
                <span style={{ color: AMBER }}>await </span>
                <span style={{ color: SKY }}>res</span>
                <span style={{ color: SLATE }}>.json()</span>
              </div>
              <div style={{ fontSize: compact ? 7 : 8, color: GREEN + 'aa', fontFamily: mono, marginTop: 3 }}>runs on server · zero client JS ✓</div>
            </motion.div>
          </motion.div>
        )}

        {/* Step 1: Cache Options & Revalidation */}
        {s === 1 && (
          <motion.div key="cache-options"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>

            <div style={{ background: `${SKY}0c`, border: `1px solid ${SKY}33`, borderRadius: 8, padding: compact ? 8 : 10 }}>
              <div style={{ fontSize: compact ? 7 : 8, fontFamily: mono, color: SKY, fontWeight: 700, marginBottom: compact ? 5 : 7, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Cache Options</div>

              {/* Table header */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.5fr', gap: compact ? 3 : 5, marginBottom: compact ? 3 : 5 }}>
                {['Option', 'Behavior', 'Use case'].map((h) => (
                  <div key={h} style={{ fontFamily: mono, fontSize: compact ? 6 : 7, color: SLATE + '77', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.04em' }}>{h}</div>
                ))}
              </div>

              {[
                { option: 'force-cache', behavior: 'cached ∞', useCase: 'static content' },
                { option: 'no-store', behavior: 'always fresh', useCase: 'real-time data' },
                { option: '{ next: { revalidate: 60 } }', behavior: 'refresh 60s', useCase: 'semi-static' },
              ].map(({ option, behavior, useCase }, i) => (
                <motion.div
                  key={option}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.5fr', gap: compact ? 3 : 5, marginBottom: compact ? 2 : 4 }}>
                  <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: AMBER, wordBreak: 'break-all' as const }}>{option}</div>
                  <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: SKY }}>{behavior}</div>
                  <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: SLATE }}>{useCase}</div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              style={{ background: `${GREEN}0c`, border: `1px solid ${GREEN}33`, borderRadius: 6, padding: compact ? '4px 8px' : '6px 10px' }}>
              <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: GREEN }}>
                revalidatePath() / revalidateTag() to bust cache manually
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Step 2: Parallel Fetching */}
        {s === 2 && (
          <motion.div key="parallel-fetch"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>

            {/* Sequential */}
            <div style={{ background: `${RED}0c`, border: `1px solid ${RED}33`, borderRadius: 8, padding: compact ? 8 : 10 }}>
              <div style={{ fontSize: compact ? 7 : 8, fontFamily: mono, color: RED, fontWeight: 700, marginBottom: compact ? 5 : 7, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>waterfall ✗</div>
              {['fetch1', 'fetch2', 'fetch3'].map((label, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  style={{ display: 'flex', alignItems: 'center', gap: compact ? 4 : 6, marginBottom: compact ? 3 : 4 }}>
                  <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: SLATE + '88', minWidth: compact ? 38 : 46 }}>{label}</div>
                  <div style={{
                    height: compact ? 8 : 10, borderRadius: 4,
                    background: `${RED}55`, border: `1px solid ${RED}66`,
                    marginLeft: i * (compact ? 22 : 30),
                    width: compact ? 50 : 65,
                  }} />
                </motion.div>
              ))}
            </div>

            {/* Parallel */}
            <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              style={{ background: `${GREEN}0c`, border: `1px solid ${GREEN}33`, borderRadius: 8, padding: compact ? 8 : 10 }}>
              <div style={{ fontSize: compact ? 7 : 8, fontFamily: mono, color: GREEN, fontWeight: 700, marginBottom: compact ? 5 : 7, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Promise.all() ✓</div>
              {['fetch1', 'fetch2', 'fetch3'].map((label, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.07 }}
                  style={{ display: 'flex', alignItems: 'center', gap: compact ? 4 : 6, marginBottom: compact ? 3 : 4 }}>
                  <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: SLATE + '88', minWidth: compact ? 38 : 46 }}>{label}</div>
                  <div style={{
                    height: compact ? 8 : 10, borderRadius: 4,
                    background: `${GREEN}55`, border: `1px solid ${GREEN}66`,
                    width: compact ? 65 : 85,
                  }} />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
              style={{ background: `${SKY}0c`, border: `1px solid ${SKY}2a`, borderRadius: 6, padding: compact ? '4px 7px' : '5px 9px', fontFamily: mono, fontSize: compact ? 7 : 8, color: SLATE, lineHeight: 1.6 }}>
              <span style={{ color: VIOLET }}>const </span>
              <span style={{ color: SLATE }}>{'['}</span>
              <span style={{ color: SKY }}>user</span>
              <span style={{ color: SLATE }}>{', '}</span>
              <span style={{ color: SKY }}>posts</span>
              <span style={{ color: SLATE }}>] = </span>
              <span style={{ color: AMBER }}>await </span>
              <span style={{ color: GREEN }}>Promise.all</span>
              <span style={{ color: SLATE }}>{'(['}</span>
              <span style={{ color: SKY }}>getUser</span>
              <span style={{ color: SLATE }}>{'(), '}</span>
              <span style={{ color: SKY }}>getPosts</span>
              <span style={{ color: SLATE }}>{'()])'}</span>
            </motion.div>
          </motion.div>
        )}

        {/* Step 3: Database Access & ORM */}
        {s === 3 && (
          <motion.div key="db-access"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>

            <div style={{ background: `${SKY}0c`, border: `1px solid ${SKY}33`, borderRadius: 8, padding: compact ? 8 : 10 }}>
              <div style={{ fontSize: compact ? 7 : 8, fontFamily: mono, color: SKY, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Direct DB Import</div>
              <div style={{ fontFamily: mono, fontSize: fs, color: SLATE + '88', lineHeight: 1.6 }}>
                {'// Direct import — no API layer'}
              </div>
              {[
                { pre: 'import ', clr: VIOLET, mid: '{ db } ', clr2: SLATE, post: 'from ', clr3: GREEN, end: "'@/lib/db'" },
              ].map((_, i) => (
                <div key={i} style={{ fontFamily: mono, fontSize: fs, color: SLATE, lineHeight: 1.6 }}>
                  <span style={{ color: AMBER }}>import </span>
                  <span style={{ color: SLATE }}>{'{ '}</span>
                  <span style={{ color: SKY }}>db</span>
                  <span style={{ color: SLATE }}>{' } '}</span>
                  <span style={{ color: AMBER }}>from </span>
                  <span style={{ color: GREEN }}>{'\'@/lib/db\''}</span>
                </div>
              ))}
              <div style={{ fontFamily: mono, fontSize: fs, color: SLATE, lineHeight: 1.6 }}>
                <span style={{ color: VIOLET }}>const </span>
                <span style={{ color: SKY }}>users </span>
                <span style={{ color: SLATE }}>= </span>
                <span style={{ color: AMBER }}>await </span>
                <span style={{ color: SKY }}>db</span>
                <span style={{ color: SLATE }}>.users.</span>
                <span style={{ color: GREEN }}>findMany</span>
                <span style={{ color: SLATE }}>{'({'}</span>
              </div>
              <div style={{ fontFamily: mono, fontSize: fs, color: SLATE, lineHeight: 1.6, paddingLeft: compact ? 10 : 14 }}>
                <span style={{ color: AMBER }}>where</span>
                <span style={{ color: SLATE }}>{': { '}</span>
                <span style={{ color: SKY }}>active</span>
                <span style={{ color: SLATE }}>{': '}</span>
                <span style={{ color: VIOLET }}>true</span>
                <span style={{ color: SLATE }}>{' },'}</span>
              </div>
              <div style={{ fontFamily: mono, fontSize: fs, color: SLATE, lineHeight: 1.6 }}>
                <span style={{ color: SLATE }}>{'});'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: compact ? 6 : 8 }}>
              {[
                { label: 'Prisma', color: GREEN },
                { label: 'Drizzle', color: AMBER },
              ].map(({ label, color }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  style={{
                    background: `${color}18`, border: `1px solid ${color}44`,
                    borderRadius: 6, padding: compact ? '3px 8px' : '4px 10px',
                    fontFamily: mono, fontSize: compact ? 8 : 9, color, fontWeight: 700,
                  }}>
                  {label}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              style={{ background: `${RED}0c`, border: `1px solid ${RED}33`, borderRadius: 6, padding: compact ? '4px 8px' : '6px 10px', display: 'flex', flexDirection: 'column' as const, gap: 2 }}>
              <div style={{ fontFamily: mono, fontSize: compact ? 8 : 9, color: RED, fontWeight: 700 }}>
                import <span style={{ color: AMBER }}>'server-only'</span>
              </div>
              <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: RED + '99' }}>
                prevents accidental client import
              </div>
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
            color: [GREEN, AMBER, SKY, VIOLET][s] ?? SKY,
            textAlign: 'center' as const, maxWidth: 320,
          }}
        >
          {[
            'fetch() directly in Server Components — no useEffect, no API route, no client JS',
            'force-cache = static · no-store = always fresh · revalidate: 60 = ISR',
            'sequential awaits = waterfall — use Promise.all() to fetch all independent data in parallel',
            'import database clients directly — add server-only to prevent accidental browser import',
          ][s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
