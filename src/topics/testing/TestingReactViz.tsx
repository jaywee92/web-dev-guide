import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const ORANGE = '#f97316'
const BLUE = '#5b9cf5'
const GREEN = '#4ade80'
const PURPLE = '#a78bfa'
const MUTED = '#94a3b8'

export default function TestingReactViz({ step, compact = false }: Props) {
  const mono = 'var(--font-mono)'
  const sz = compact ? 10 : 12
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
            background: `${ORANGE}22`,
            border: `1px solid ${ORANGE}55`,
            borderRadius: 6,
            padding: compact ? '4px 10px' : '5px 14px',
            fontSize: compact ? 10 : 11,
            fontFamily: mono,
            fontWeight: 700,
            color: ORANGE,
            letterSpacing: '0.3px',
            textAlign: 'center',
          }}
        >
          {[
            'render → query → assertion',
            'getBy vs queryBy vs findBy',
            'userEvent: simulating interactions',
            'Mock functions: tracking calls',
            'waitFor: async assertions',
          ][s]}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {/* Step 0: render → query → assertion flow */}
        {s === 0 && (
          <motion.div
            key="s0"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', alignItems: 'center', gap: compact ? 6 : 10 }}
          >
            {[
              { label: 'render()', color: BLUE },
              { label: '→', color: MUTED },
              { label: 'query()', color: ORANGE },
              { label: '→', color: MUTED },
              { label: 'expect()', color: GREEN },
            ].map(({ label, color }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  fontFamily: mono,
                  fontSize: sz,
                  color,
                  fontWeight: label === '→' ? 400 : 700,
                  background: label === '→' ? 'transparent' : `${color}15`,
                  border: label === '→' ? 'none' : `1px solid ${color}44`,
                  borderRadius: 6,
                  padding: label === '→' ? '0 2px' : compact ? '5px 8px' : '7px 12px',
                }}
              >
                {label}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 1: getBy vs queryBy vs findBy */}
        {s === 1 && (
          <motion.div
            key="s1"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 9, width: '100%', maxWidth: 320 }}
          >
            {[
              { fn: 'getBy…', note: 'throws if missing', sync: true, color: ORANGE },
              { fn: 'queryBy…', note: 'returns null if missing', sync: true, color: BLUE },
              { fn: 'findBy…', note: 'async, returns Promise', sync: false, color: PURPLE },
            ].map(({ fn, note, sync, color }) => (
              <motion.div
                key={fn}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: compact ? 8 : 12,
                  background: `${color}12`,
                  border: `1px solid ${color}44`,
                  borderRadius: 6,
                  padding: compact ? '5px 10px' : '7px 14px',
                }}
              >
                <span style={{ fontFamily: mono, fontSize: compact ? 9 : 11, color, fontWeight: 700, minWidth: 80 }}>{fn}</span>
                <span style={{ fontFamily: mono, fontSize: compact ? 8 : 9, color: MUTED, flex: 1 }}>{note}</span>
                <span style={{
                  fontFamily: mono,
                  fontSize: compact ? 8 : 9,
                  color: sync ? GREEN : PURPLE,
                  background: sync ? `${GREEN}15` : `${PURPLE}15`,
                  border: `1px solid ${sync ? GREEN : PURPLE}44`,
                  borderRadius: 4,
                  padding: '2px 5px',
                }}>
                  {sync ? 'sync' : 'async'}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 2: userEvent */}
        {s === 2 && (
          <motion.div
            key="s2"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            style={{
              background: 'var(--surface-bright)',
              border: `1px solid ${ORANGE}44`,
              borderRadius: 8,
              padding: compact ? '8px 12px' : '12px 16px',
              fontFamily: mono,
              fontSize: compact ? 9 : 10,
              lineHeight: 1.7,
              width: '100%',
              maxWidth: compact ? 260 : 320,
              whiteSpace: 'pre',
            }}
          >
            <span style={{ color: MUTED }}>{'// setup once\n'}</span>
            <span style={{ color: BLUE }}>{'const user = '}</span>
            <span style={{ color: ORANGE }}>{'userEvent'}</span>
            <span style={{ color: '#e2e8f0' }}>{'.setup()\n\n'}</span>
            <span style={{ color: MUTED }}>{'// simulate interactions\n'}</span>
            <span style={{ color: ORANGE }}>{'await user'}</span>
            <span style={{ color: '#e2e8f0' }}>{'.click(button)\n'}</span>
            <span style={{ color: ORANGE }}>{'await user'}</span>
            <span style={{ color: '#e2e8f0' }}>{'.type(input, '}</span>
            <span style={{ color: GREEN }}>{'"hello"'}</span>
            <span style={{ color: '#e2e8f0' }}>{')\n'}</span>
            <span style={{ color: ORANGE }}>{'await user'}</span>
            <span style={{ color: '#e2e8f0' }}>{'.keyboard('}</span>
            <span style={{ color: GREEN }}>{'"Enter"'}</span>
            <span style={{ color: '#e2e8f0' }}>{')'}</span>
          </motion.div>
        )}

        {/* Step 3: Mock function tracking */}
        {s === 3 && (
          <motion.div
            key="s3"
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
              <span style={{ color: BLUE }}>{'const onSubmit = '}</span>
              <span style={{ color: PURPLE }}>{'vi.fn()\n'}</span>
              <span style={{ color: MUTED }}>{'// ... render and interact ...\n'}</span>
              <span style={{ color: ORANGE }}>{'expect'}</span>
              <span style={{ color: '#e2e8f0' }}>(onSubmit)</span>
              <span style={{ color: BLUE }}>{'.toHaveBeenCalledWith'}</span>
              <span style={{ color: '#e2e8f0' }}>{`({ email: 'a@b.com' })`}</span>
            </div>
            <div style={{ display: 'flex', gap: compact ? 6 : 8 }}>
              {[
                { label: 'called', value: '1x', color: GREEN },
                { label: 'args[0]', value: '{ email }', color: ORANGE },
                { label: 'returned', value: 'undefined', color: MUTED },
              ].map(({ label, value, color }) => (
                <div key={label} style={{
                  flex: 1,
                  background: `${color}12`,
                  border: `1px solid ${color}44`,
                  borderRadius: 5,
                  padding: compact ? '4px 6px' : '5px 8px',
                  textAlign: 'center',
                }}>
                  <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: MUTED }}>{label}</div>
                  <div style={{ fontFamily: mono, fontSize: compact ? 8 : 9, color, fontWeight: 700 }}>{value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 4: waitFor async */}
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
              border: `1px solid ${BLUE}44`,
              borderRadius: 8,
              padding: compact ? '7px 10px' : '10px 14px',
              fontFamily: mono,
              fontSize: compact ? 9 : 10,
              lineHeight: 1.6,
              whiteSpace: 'pre',
            }}>
              <span style={{ color: MUTED }}>{'// wait for DOM to update\n'}</span>
              <span style={{ color: PURPLE }}>{'await '}</span>
              <span style={{ color: BLUE }}>{'waitFor'}</span>
              <span style={{ color: '#e2e8f0' }}>{'(() => {\n  '}</span>
              <span style={{ color: ORANGE }}>{'expect'}</span>
              <span style={{ color: '#e2e8f0' }}>(screen.</span>
              <span style={{ color: BLUE }}>getByText</span>
              <span style={{ color: '#e2e8f0' }}>{`('Saved!'))\n  .`}</span>
              <span style={{ color: GREEN }}>toBeInTheDocument</span>
              <span style={{ color: '#e2e8f0' }}>{'()\n})'}</span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: compact ? 6 : 8,
              fontFamily: mono,
              fontSize: compact ? 8 : 9,
              color: MUTED,
            }}>
              <span style={{ color: ORANGE }}>fetch()</span>
              <span>→</span>
              <span style={{ color: PURPLE }}>Promise</span>
              <span>→</span>
              <span style={{ color: GREEN }}>DOM updates</span>
              <span>→</span>
              <span style={{ color: BLUE }}>assertion ✓</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
