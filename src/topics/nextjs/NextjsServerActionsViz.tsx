import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const SKY    = '#38bdf8'
const GREEN  = '#4ade80'
const AMBER  = '#fbbf24'
const SLATE  = '#94a3b8'
const RED    = '#f87171'
const VIOLET = '#a78bfa'

const mono = 'var(--font-mono)'

export default function NextjsServerActionsViz({ step, compact = false }: Props) {
  const s = Math.min(step, 3)
  const fs = compact ? 8 : 10
  const panelW = compact ? 220 : 300

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 16, width: '100%' }}>
      <AnimatePresence mode="wait">

        {/* Step 0: 'use server' Functions */}
        {s === 0 && (
          <motion.div key="use-server"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>

            {/* File panel */}
            <div style={{ background: `${AMBER}0c`, border: `1px solid ${AMBER}33`, borderRadius: 8, padding: compact ? 8 : 10 }}>
              <div style={{ fontFamily: mono, fontSize: fs, color: AMBER, fontWeight: 700, lineHeight: 1.6 }}>
                {'\'use server\''}
              </div>
              <div style={{ fontFamily: mono, fontSize: fs, color: SLATE, lineHeight: 1.6, marginTop: 3 }}>
                <span style={{ color: VIOLET }}>export async function </span>
                <span style={{ color: SKY }}>createPost</span>
                <span style={{ color: SLATE }}>{'(data) {'}</span>
              </div>
              <div style={{ fontFamily: mono, fontSize: fs, color: SLATE + '88', lineHeight: 1.6, paddingLeft: compact ? 10 : 14 }}>
                {'// runs on server'}
              </div>
              <div style={{ fontFamily: mono, fontSize: fs, color: SLATE, lineHeight: 1.6 }}>
                <span style={{ color: SLATE }}>{'}'}</span>
              </div>
            </div>

            {/* Call sites */}
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: compact ? 4 : 6 }}>
              {[
                { label: 'from Server Component', color: SKY },
                { label: 'from form action prop', color: GREEN },
                { label: 'from Client Component', color: VIOLET },
              ].map(({ label, color }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  style={{ display: 'flex', alignItems: 'center', gap: compact ? 6 : 8 }}>
                  <div style={{
                    width: compact ? 12 : 14, height: 1,
                    background: color, opacity: 0.7,
                  }} />
                  <div style={{
                    background: `${color}14`, border: `1px solid ${color}44`,
                    borderRadius: 5, padding: compact ? '2px 7px' : '3px 9px',
                    fontFamily: mono, fontSize: compact ? 8 : 9, color,
                  }}>
                    {label}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: SLATE + '99', textAlign: 'center' as const }}>
              serialized over HTTP transparently — no manual fetch needed
            </motion.div>
          </motion.div>
        )}

        {/* Step 1: Form Actions */}
        {s === 1 && (
          <motion.div key="form-actions"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>

            {/* Old pattern */}
            <div style={{ background: `${RED}0c`, border: `1px solid ${RED}33`, borderRadius: 8, padding: compact ? 8 : 10, opacity: 0.7 }}>
              <div style={{ fontSize: compact ? 7 : 8, fontFamily: mono, color: RED, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Classic Form</div>
              <div style={{ fontFamily: mono, fontSize: fs, color: SLATE, lineHeight: 1.6 }}>
                <span style={{ color: '#7dd3fc' }}>{'<form '}</span>
                <span style={{ color: AMBER }}>onSubmit</span>
                <span style={{ color: SLATE }}>{'={'}</span>
                <span style={{ color: VIOLET }}>{'{handleSubmit}'}</span>
                <span style={{ color: '#7dd3fc' }}>{'>'}</span>
              </div>
              <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: SLATE + '77', lineHeight: 1.5, paddingLeft: compact ? 10 : 14 }}>
                e.preventDefault()
              </div>
              <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: SLATE + '77', lineHeight: 1.5, paddingLeft: compact ? 10 : 14 }}>
                fetch('/api/submit', ...)
              </div>
            </div>

            {/* New pattern */}
            <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              style={{ background: `${GREEN}0c`, border: `1px solid ${GREEN}33`, borderRadius: 8, padding: compact ? 8 : 10 }}>
              <div style={{ fontSize: compact ? 7 : 8, fontFamily: mono, color: GREEN, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Server Action</div>
              <div style={{ fontFamily: mono, fontSize: fs, color: SLATE, lineHeight: 1.6 }}>
                <span style={{ color: '#7dd3fc' }}>{'<form '}</span>
                <span style={{ color: AMBER }}>action</span>
                <span style={{ color: SLATE }}>{'='}</span>
                <span style={{ color: VIOLET }}>{'{createPost}'}</span>
                <span style={{ color: '#7dd3fc' }}>{'>'}</span>
              </div>
              <div style={{ fontSize: compact ? 7 : 8, color: GREEN + 'aa', fontFamily: mono, marginTop: 3 }}>
                works without JavaScript ✓ progressive enhancement
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Step 2: useActionState */}
        {s === 2 && (
          <motion.div key="use-action-state"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>

            {/* State machine */}
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: compact ? 4 : 5 }}>
              {[
                { label: 'Initial', sub: 'form renders', color: SLATE },
                { label: 'Pending', sub: 'isPending = true', color: AMBER },
                { label: 'Success', sub: "state = { success: true }", color: GREEN },
                { label: 'Error', sub: "state = { error: 'msg' }", color: RED },
              ].map(({ label, sub, color }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  style={{ display: 'flex', alignItems: 'center', gap: compact ? 6 : 8 }}>
                  <div style={{
                    background: `${color}18`, border: `1px solid ${color}44`,
                    borderRadius: 5, padding: compact ? '2px 7px' : '3px 9px',
                    fontFamily: mono, fontSize: compact ? 8 : 9, color, fontWeight: 700,
                    minWidth: compact ? 52 : 64, textAlign: 'center' as const,
                  }}>
                    {label}
                  </div>
                  {i < 3 && (
                    <div style={{ color: color + '66', fontSize: compact ? 9 : 11 }}>→</div>
                  )}
                  <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: SLATE + '99' }}>
                    {sub}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}
              style={{ background: `${SKY}0c`, border: `1px solid ${SKY}2a`, borderRadius: 6, padding: compact ? '4px 7px' : '5px 9px', fontFamily: mono, fontSize: compact ? 7 : 8, color: SLATE, lineHeight: 1.6 }}>
              <span style={{ color: VIOLET }}>const </span>
              <span style={{ color: SLATE }}>{'['}</span>
              <span style={{ color: SKY }}>state</span>
              <span style={{ color: SLATE }}>{', '}</span>
              <span style={{ color: SKY }}>action</span>
              <span style={{ color: SLATE }}>{', '}</span>
              <span style={{ color: AMBER }}>isPending</span>
              <span style={{ color: SLATE }}>] = </span>
              <span style={{ color: GREEN }}>useActionState</span>
              <span style={{ color: SLATE }}>{'('}</span>
              <span style={{ color: SKY }}>createPost</span>
              <span style={{ color: SLATE }}>{', '}</span>
              <span style={{ color: VIOLET }}>null</span>
              <span style={{ color: SLATE }}>{')'}</span>
            </motion.div>
          </motion.div>
        )}

        {/* Step 3: Calling Actions from Client Components */}
        {s === 3 && (
          <motion.div key="client-actions"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>

            {/* Form-based */}
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
              style={{ background: `${GREEN}0c`, border: `1px solid ${GREEN}33`, borderRadius: 8, padding: compact ? 8 : 10 }}>
              <div style={{ fontSize: compact ? 7 : 8, fontFamily: mono, color: GREEN, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Form-based</div>
              <div style={{ fontFamily: mono, fontSize: fs, color: SLATE, lineHeight: 1.6 }}>
                <span style={{ color: '#7dd3fc' }}>{'<form '}</span>
                <span style={{ color: AMBER }}>action</span>
                <span style={{ color: SLATE }}>{'='}</span>
                <span style={{ color: VIOLET }}>{'{deleteItem}'}</span>
                <span style={{ color: '#7dd3fc' }}>{' />'}</span>
              </div>
            </motion.div>

            {/* Programmatic */}
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.07 }}
              style={{ background: `${VIOLET}0c`, border: `1px solid ${VIOLET}33`, borderRadius: 8, padding: compact ? 8 : 10 }}>
              <div style={{ fontSize: compact ? 7 : 8, fontFamily: mono, color: VIOLET, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Programmatic</div>
              <div style={{ fontFamily: mono, fontSize: fs, color: SLATE, lineHeight: 1.6 }}>
                <span style={{ color: '#7dd3fc' }}>{'<button '}</span>
                <span style={{ color: AMBER }}>onClick</span>
                <span style={{ color: SLATE }}>{'={() => '}</span>
              </div>
              <div style={{ fontFamily: mono, fontSize: fs, color: SLATE, lineHeight: 1.6, paddingLeft: compact ? 10 : 14 }}>
                <span style={{ color: GREEN }}>startTransition</span>
                <span style={{ color: SLATE }}>{'(() => '}</span>
                <span style={{ color: SKY }}>deleteItem</span>
                <span style={{ color: SLATE }}>{'(id))}'}</span>
              </div>
              <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: VIOLET + '99', marginTop: 3 }}>
                useTransition gives isPending without a form
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: SLATE + '88', textAlign: 'center' as const }}>
              import the Server Action file → call like any async function
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
            color: [AMBER, GREEN, SKY, VIOLET][s] ?? SKY,
            textAlign: 'center' as const, maxWidth: 320,
          }}
        >
          {[
            "'use server' = Server Action — callable from forms, Server Components, and Client Components",
            'pass Server Action to form action prop — no onSubmit, no fetch, works without JS',
            'useActionState wraps the action — [state, action, isPending] for forms with error/loading UI',
            'call Server Actions from Client Components with useTransition for non-form mutations',
          ][s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
