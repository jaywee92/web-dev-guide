import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const SKY    = '#38bdf8'
const GREEN  = '#4ade80'
const AMBER  = '#fbbf24'
const SLATE  = '#94a3b8'
const RED    = '#f87171'
const VIOLET = '#a78bfa'

const mono = 'var(--font-mono)'

export default function NextjsRouteHandlersViz({ step, compact = false }: Props) {
  const s = Math.min(step, 2)
  const fs = compact ? 8 : 10
  const panelW = compact ? 220 : 300

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 16, width: '100%' }}>
      <AnimatePresence mode="wait">

        {/* Step 0: Route Handler Files */}
        {s === 0 && (
          <motion.div key="route-files"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>

            {/* File path badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 5 : 7 }}>
              <div style={{
                background: `${AMBER}18`, border: `1px solid ${AMBER}44`,
                borderRadius: 5, padding: compact ? '3px 8px' : '4px 10px',
                fontFamily: mono, fontSize: compact ? 8 : 9, color: AMBER, fontWeight: 700,
              }}>
                app/api/posts/route.ts
              </div>
            </div>

            {/* Method exports */}
            <div style={{ background: `${SKY}0c`, border: `1px solid ${SKY}33`, borderRadius: 8, padding: compact ? 8 : 10 }}>
              {[
                { method: 'GET', color: GREEN },
                { method: 'POST', color: SKY },
                { method: 'DELETE', color: RED },
              ].map(({ method, color }, i) => (
                <motion.div
                  key={method}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  style={{ fontFamily: mono, fontSize: fs, color: SLATE, lineHeight: 1.7 }}>
                  <span style={{ color: VIOLET }}>export async function </span>
                  <span style={{ color }}>{method}</span>
                  <span style={{ color: SLATE }}>{'('}</span>
                  <span style={{ color: AMBER }}>req</span>
                  <span style={{ color: SLATE }}>: </span>
                  <span style={{ color: SKY }}>Request</span>
                  <span style={{ color: SLATE }}>{') { ... }'}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: SLATE + '88', textAlign: 'center' as const }}>
              Standard Web Request/Response APIs
            </motion.div>
          </motion.div>
        )}

        {/* Step 1: Reading Request Data */}
        {s === 1 && (
          <motion.div key="request-data"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>

            <div style={{ background: `${SKY}0c`, border: `1px solid ${SKY}33`, borderRadius: 8, padding: compact ? 8 : 10 }}>
              <div style={{ fontSize: compact ? 7 : 8, fontFamily: mono, color: SKY, fontWeight: 700, marginBottom: compact ? 5 : 7, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Reading Request Data</div>

              {/* Table header */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr 1.4fr', gap: compact ? 3 : 5, marginBottom: compact ? 3 : 5 }}>
                {['Source', 'Code', 'Use case'].map((h) => (
                  <div key={h} style={{ fontFamily: mono, fontSize: compact ? 6 : 7, color: SLATE + '77', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.04em' }}>{h}</div>
                ))}
              </div>

              {[
                { source: 'JSON body', code: 'await req.json()', useCase: 'POST data' },
                { source: 'Form data', code: 'await req.formData()', useCase: 'file uploads' },
                { source: 'Query string', code: 'new URL(req.url).searchParams', useCase: 'filters' },
                { source: 'Headers', code: "req.headers.get('auth')", useCase: 'auth tokens' },
              ].map(({ source, code, useCase }, i) => (
                <motion.div
                  key={source}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr 1.4fr', gap: compact ? 3 : 5, marginBottom: compact ? 2 : 4 }}>
                  <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: SKY }}>{source}</div>
                  <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: AMBER, wordBreak: 'break-all' as const }}>{code}</div>
                  <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: SLATE }}>{useCase}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Route Handlers vs Server Actions */}
        {s === 2 && (
          <motion.div key="route-vs-actions"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>

            <div style={{ fontFamily: mono, fontSize: compact ? 8 : 9, color: SLATE + '99', textAlign: 'center' as const, fontWeight: 700 }}>
              When to use which?
            </div>

            {/* Path A: Server Action */}
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
              style={{ background: `${GREEN}0c`, border: `1px solid ${GREEN}33`, borderRadius: 8, padding: compact ? 8 : 10 }}>
              <div style={{ fontSize: compact ? 7 : 8, fontFamily: mono, color: GREEN, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Server Action ✓</div>
              <div style={{ fontFamily: mono, fontSize: compact ? 8 : 9, color: SLATE, marginBottom: compact ? 3 : 5 }}>
                Mutation in your own React UI
              </div>
              {['simpler', 'type-safe', 'no HTTP overhead'].map((reason, i) => (
                <motion.div
                  key={reason}
                  initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: GREEN + 'aa', lineHeight: 1.55 }}>
                  · {reason}
                </motion.div>
              ))}
            </motion.div>

            {/* Path B: Route Handler */}
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.07 }}
              style={{ background: `${VIOLET}0c`, border: `1px solid ${VIOLET}33`, borderRadius: 8, padding: compact ? 8 : 10 }}>
              <div style={{ fontSize: compact ? 7 : 8, fontFamily: mono, color: VIOLET, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Route Handler ✓</div>
              <div style={{ fontFamily: mono, fontSize: compact ? 8 : 9, color: SLATE, marginBottom: compact ? 3 : 5 }}>
                External API / Webhooks / Mobile app
              </div>
              {['standard HTTP', 'custom status codes', 'external clients'].map((reason, i) => (
                <motion.div
                  key={reason}
                  initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.07 + i * 0.07 }}
                  style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: VIOLET + 'aa', lineHeight: 1.55 }}>
                  · {reason}
                </motion.div>
              ))}
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
            color: [AMBER, SKY, GREEN][s] ?? SKY,
            textAlign: 'center' as const, maxWidth: 320,
          }}
        >
          {[
            'route.ts in app/api/ — export GET, POST, DELETE functions using Web Request/Response',
            'read JSON, form data, query params, and headers from the standard Request object',
            'prefer Server Actions for your own UI mutations — use Route Handlers for external HTTP APIs',
          ][s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
