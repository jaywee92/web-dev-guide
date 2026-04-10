import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const YELLOW = '#fbbf24'
const BLUE = '#5b9cf5'
const GREEN = '#4ade80'
const PURPLE = '#a78bfa'
const ORANGE = '#fb923c'
const MUTED = '#94a3b8'

function Box({ label, color, compact }: { label: string; color: string; compact: boolean }) {
  return (
    <div style={{
      padding: compact ? '6px 10px' : '8px 14px',
      border: `2px solid ${color}55`,
      borderRadius: 8,
      background: `${color}12`,
      fontFamily: 'var(--font-mono)',
      fontSize: compact ? 9 : 11,
      fontWeight: 700,
      color,
      textAlign: 'center',
      whiteSpace: 'nowrap',
    }}>
      {label}
    </div>
  )
}

function Arrow({ label, color, compact }: { label: string; color: string; compact: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <div style={{ height: 2, width: compact ? 30 : 40, background: color, borderRadius: 1 }} />
      {label && (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 7 : 8, color: MUTED, whiteSpace: 'nowrap' }}>
          {label}
        </span>
      )}
    </div>
  )
}

export default function SsrCsrViz({ step, compact = false }: Props) {
  const mono = 'var(--font-mono)'
  const s = Math.min(step, 4)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 14 : 20, width: '100%' }}>
      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={s}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          style={{
            background: `${YELLOW}22`,
            border: `1px solid ${YELLOW}55`,
            borderRadius: 6,
            padding: compact ? '4px 10px' : '5px 14px',
            fontSize: compact ? 10 : 11,
            fontFamily: mono,
            fontWeight: 700,
            color: YELLOW,
            letterSpacing: '0.3px',
            textAlign: 'center',
          }}
        >
          {[
            'CSR: browser downloads JS, then renders',
            'SSR: server renders HTML, sends to browser',
            'Hydration: HTML + JS merge',
            'When to use CSR vs SSR',
            'Streaming SSR with Suspense',
          ][s]}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {/* Step 0: CSR flow */}
        {s === 0 && (
          <motion.div
            key="s0"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10, alignItems: 'center' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 4 : 6 }}>
              <Box label="Browser" color={BLUE} compact={compact} />
              <Arrow label="GET /" color={BLUE} compact={compact} />
              <Box label="Server" color={MUTED} compact={compact} />
              <Arrow label="empty HTML" color={MUTED} compact={compact} />
              <Box label="Browser" color={BLUE} compact={compact} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 4 : 6 }}>
              <Box label="Browser" color={BLUE} compact={compact} />
              <Arrow label="GET app.js" color={ORANGE} compact={compact} />
              <Box label="CDN" color={ORANGE} compact={compact} />
              <Arrow label="JS bundle" color={ORANGE} compact={compact} />
              <Box label="Browser" color={BLUE} compact={compact} />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{
                fontFamily: mono,
                fontSize: compact ? 8 : 9,
                color: YELLOW,
                background: `${YELLOW}15`,
                border: `1px solid ${YELLOW}44`,
                borderRadius: 5,
                padding: compact ? '3px 8px' : '4px 10px',
              }}
            >
              JS runs → React renders → UI visible
            </motion.div>
          </motion.div>
        )}

        {/* Step 1: SSR flow */}
        {s === 1 && (
          <motion.div
            key="s1"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10, alignItems: 'center' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 4 : 6 }}>
              <Box label="Browser" color={BLUE} compact={compact} />
              <Arrow label="GET /" color={BLUE} compact={compact} />
              <Box label="Server" color={GREEN} compact={compact} />
              <Arrow label="full HTML" color={GREEN} compact={compact} />
              <Box label="Browser" color={BLUE} compact={compact} />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              style={{
                fontFamily: mono,
                fontSize: compact ? 8 : 9,
                color: GREEN,
                background: `${GREEN}15`,
                border: `1px solid ${GREEN}44`,
                borderRadius: 5,
                padding: compact ? '3px 8px' : '4px 10px',
              }}
            >
              HTML arrives → content visible immediately
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{
                fontFamily: mono,
                fontSize: compact ? 8 : 9,
                color: MUTED,
              }}
            >
              (JS loads later for interactivity)
            </motion.div>
          </motion.div>
        )}

        {/* Step 2: Hydration */}
        {s === 2 && (
          <motion.div
            key="s2"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', gap: compact ? 8 : 12, alignItems: 'center', width: '100%', maxWidth: 280 }}
          >
            <div style={{ display: 'flex', gap: compact ? 6 : 10, alignItems: 'center' }}>
              <div style={{
                background: `${GREEN}15`,
                border: `2px solid ${GREEN}55`,
                borderRadius: 8,
                padding: compact ? '6px 10px' : '8px 14px',
                fontFamily: mono,
                fontSize: compact ? 9 : 10,
                color: GREEN,
                textAlign: 'center',
              }}>
                {'<html>\n  static content\n</html>'}
              </div>
              <span style={{ color: YELLOW, fontSize: compact ? 16 : 20 }}>+</span>
              <div style={{
                background: `${PURPLE}15`,
                border: `2px solid ${PURPLE}55`,
                borderRadius: 8,
                padding: compact ? '6px 10px' : '8px 14px',
                fontFamily: mono,
                fontSize: compact ? 9 : 10,
                color: PURPLE,
                textAlign: 'center',
              }}>
                React JS
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 }}
              style={{ fontSize: compact ? 14 : 18, color: YELLOW }}
            >
              ↓
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                background: `${YELLOW}15`,
                border: `2px solid ${YELLOW}55`,
                borderRadius: 8,
                padding: compact ? '6px 12px' : '8px 16px',
                fontFamily: mono,
                fontSize: compact ? 9 : 11,
                fontWeight: 700,
                color: YELLOW,
              }}
            >
              interactive page
            </motion.div>
          </motion.div>
        )}

        {/* Step 3: when to use */}
        {s === 3 && (
          <motion.div
            key="s3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', gap: compact ? 8 : 12, width: '100%', maxWidth: 300 }}
          >
            {[
              {
                title: 'CSR',
                color: BLUE,
                cases: ['dashboards', 'auth-gated apps', 'real-time UIs'],
              },
              {
                title: 'SSR',
                color: GREEN,
                cases: ['SEO pages', 'blogs & docs', 'landing pages'],
              },
            ].map(({ title, color, cases }) => (
              <div key={title} style={{
                flex: 1,
                background: `${color}12`,
                border: `1px solid ${color}44`,
                borderRadius: 8,
                padding: compact ? '8px 10px' : '10px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: compact ? 5 : 7,
              }}>
                <div style={{ fontFamily: mono, fontSize: compact ? 11 : 13, fontWeight: 700, color }}>{title}</div>
                {cases.map(c => (
                  <div key={c} style={{
                    fontFamily: mono,
                    fontSize: compact ? 8 : 9,
                    color: MUTED,
                    paddingLeft: compact ? 4 : 6,
                  }}>
                    · {c}
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        )}

        {/* Step 4: Streaming SSR */}
        {s === 4 && (
          <motion.div
            key="s4"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', gap: compact ? 8 : 12, width: '100%', maxWidth: 300 }}
          >
            <div style={{
              background: 'var(--surface-bright)',
              border: `1px solid ${PURPLE}44`,
              borderRadius: 8,
              padding: compact ? '7px 10px' : '10px 14px',
              fontFamily: mono,
              fontSize: compact ? 9 : 10,
              lineHeight: 1.6,
              whiteSpace: 'pre',
            }}>
              <span style={{ color: BLUE }}>{'<Suspense '}</span>
              <span style={{ color: YELLOW }}>{'fallback='}</span>
              <span style={{ color: GREEN }}>{'{"Loading…"}'}</span>
              <span style={{ color: BLUE }}>{'>\n  '}</span>
              <span style={{ color: PURPLE }}>{'<SlowDataComponent />\n'}</span>
              <span style={{ color: BLUE }}>{'</Suspense>'}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 4 : 6 }}>
              {[
                { label: '① shell HTML streams first', color: GREEN },
                { label: '② "Loading…" shown instantly', color: YELLOW },
                { label: '③ data resolves → chunk streams', color: ORANGE },
                { label: '④ page fills in progressively', color: PURPLE },
              ].map(({ label, color }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{ fontFamily: mono, fontSize: compact ? 8 : 9, color }}
                >
                  {label}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
