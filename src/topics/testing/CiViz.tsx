import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const PURPLE = '#a78bfa'
const GREEN = '#4ade80'
const RED = '#f87171'
const BLUE = '#5b9cf5'
const ORANGE = '#fb923c'
const MUTED = '#94a3b8'

export default function CiViz({ step, compact = false }: Props) {
  const mono = 'var(--font-mono)'
  const s = Math.min(step, 3)

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
            background: `${PURPLE}22`,
            border: `1px solid ${PURPLE}55`,
            borderRadius: 6,
            padding: compact ? '4px 10px' : '5px 14px',
            fontSize: compact ? 10 : 11,
            fontFamily: mono,
            fontWeight: 700,
            color: PURPLE,
            letterSpacing: '0.3px',
            textAlign: 'center',
          }}
        >
          {[
            'CI pipeline: push → build → test → deploy',
            'GitHub Actions workflow YAML',
            'Test results badge',
            'Coverage threshold check',
          ][s]}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {/* Step 0: pipeline boxes */}
        {s === 0 && (
          <motion.div
            key="s0"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', alignItems: 'center', gap: compact ? 4 : 6, flexWrap: 'wrap', justifyContent: 'center' }}
          >
            {[
              { label: 'push', color: BLUE },
              { label: '→', color: MUTED },
              { label: 'build', color: ORANGE },
              { label: '→', color: MUTED },
              { label: 'test', color: PURPLE },
              { label: '→', color: MUTED },
              { label: 'deploy', color: GREEN },
            ].map(({ label, color }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.07 }}
                style={{
                  fontFamily: mono,
                  fontSize: compact ? 10 : 12,
                  fontWeight: label === '→' ? 400 : 700,
                  color,
                  background: label === '→' ? 'transparent' : `${color}18`,
                  border: label === '→' ? 'none' : `2px solid ${color}55`,
                  borderRadius: 8,
                  padding: label === '→' ? '0 2px' : compact ? '6px 10px' : '8px 14px',
                }}
              >
                {label}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 1: YAML snippet */}
        {s === 1 && (
          <motion.div
            key="s1"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            style={{
              background: '#0f0f1a',
              border: `1px solid ${PURPLE}44`,
              borderRadius: 8,
              padding: compact ? '8px 12px' : '10px 16px',
              fontFamily: mono,
              fontSize: compact ? 9 : 10,
              lineHeight: 1.65,
              whiteSpace: 'pre',
              width: '100%',
              maxWidth: compact ? 260 : 300,
            }}
          >
            <span style={{ color: BLUE }}>{'on: '}</span>
            <span style={{ color: GREEN }}>{'[push, pull_request]\n'}</span>
            <span style={{ color: BLUE }}>{'jobs:\n'}</span>
            <span style={{ color: ORANGE }}>{'  test:\n'}</span>
            <span style={{ color: MUTED }}>{'    runs-on: '}</span>
            <span style={{ color: GREEN }}>{'ubuntu-latest\n'}</span>
            <span style={{ color: MUTED }}>{'    steps:\n'}</span>
            <span style={{ color: MUTED }}>{'      - uses: '}</span>
            <span style={{ color: PURPLE }}>{'actions/checkout@v4\n'}</span>
            <span style={{ color: MUTED }}>{'      - run: '}</span>
            <span style={{ color: GREEN }}>{'npm ci\n'}</span>
            <span style={{ color: MUTED }}>{'      - run: '}</span>
            <span style={{ color: GREEN }}>{'npm test'}</span>
          </motion.div>
        )}

        {/* Step 2: Badge */}
        {s === 2 && (
          <motion.div
            key="s2"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', gap: compact ? 10 : 14, alignItems: 'center' }}
          >
            {[
              { status: 'passing', color: GREEN },
              { status: 'failing', color: RED },
            ].map(({ status, color }) => (
              <motion.div
                key={status}
                initial={{ scale: 0.85 }}
                animate={{ scale: 1 }}
                style={{
                  display: 'flex',
                  borderRadius: 4,
                  overflow: 'hidden',
                  fontFamily: mono,
                  fontSize: compact ? 10 : 12,
                  fontWeight: 700,
                  border: `1px solid ${color}44`,
                }}
              >
                <div style={{
                  background: '#555',
                  color: '#e2e8f0',
                  padding: compact ? '4px 8px' : '5px 10px',
                }}>
                  tests
                </div>
                <div style={{
                  background: color,
                  color: '#0f0f1a',
                  padding: compact ? '4px 8px' : '5px 10px',
                }}>
                  {status}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 3: Coverage threshold */}
        {s === 3 && (
          <motion.div
            key="s3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', gap: compact ? 8 : 12, width: '100%', maxWidth: 280 }}
          >
            <div style={{
              background: 'var(--surface-bright)',
              border: `1px solid ${ORANGE}44`,
              borderRadius: 6,
              padding: compact ? '6px 10px' : '8px 14px',
              fontFamily: mono,
              fontSize: compact ? 9 : 10,
              lineHeight: 1.6,
              whiteSpace: 'pre',
            }}>
              <span style={{ color: MUTED }}>{'// vitest.config.ts\n'}</span>
              <span style={{ color: BLUE }}>{'coverage'}</span>
              <span style={{ color: '#e2e8f0' }}>{': {\n  '}</span>
              <span style={{ color: ORANGE }}>{'thresholds'}</span>
              <span style={{ color: '#e2e8f0' }}>{': {\n    '}</span>
              <span style={{ color: GREEN }}>{'lines'}</span>
              <span style={{ color: '#e2e8f0' }}>{': '}</span>
              <span style={{ color: PURPLE }}>{'80'}</span>
              <span style={{ color: '#e2e8f0' }}>{',\n    '}</span>
              <span style={{ color: GREEN }}>{'functions'}</span>
              <span style={{ color: '#e2e8f0' }}>{': '}</span>
              <span style={{ color: PURPLE }}>{'80\n  '}</span>
              <span style={{ color: '#e2e8f0' }}>{'}\n}'}</span>
            </div>
            {[
              { label: 'coverage: 85%', threshold: '≥ 80%', pass: true },
              { label: 'coverage: 71%', threshold: '≥ 80%', pass: false },
            ].map(({ label, threshold, pass }) => (
              <div key={label} style={{
                display: 'flex',
                alignItems: 'center',
                gap: compact ? 6 : 8,
                background: pass ? `${GREEN}12` : `${RED}12`,
                border: `1px solid ${pass ? GREEN : RED}44`,
                borderRadius: 5,
                padding: compact ? '4px 8px' : '5px 10px',
                fontFamily: mono,
                fontSize: compact ? 9 : 10,
              }}>
                <span style={{ color: pass ? GREEN : RED }}>{pass ? '✓' : '✗'}</span>
                <span style={{ color: '#e2e8f0', flex: 1 }}>{label}</span>
                <span style={{ color: MUTED }}>{threshold}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
