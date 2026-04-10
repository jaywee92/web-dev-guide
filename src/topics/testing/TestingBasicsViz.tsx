import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const GREEN = '#4ade80'
const BLUE = '#5b9cf5'
const ORANGE = '#fb923c'
const RED = '#f87171'
const MUTED = '#94a3b8'

export default function TestingBasicsViz({ step, compact = false }: Props) {
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
            background: `${GREEN}22`,
            border: `1px solid ${GREEN}55`,
            borderRadius: 6,
            padding: compact ? '4px 10px' : '5px 14px',
            fontSize: compact ? 10 : 11,
            fontFamily: mono,
            fontWeight: 700,
            color: GREEN,
            letterSpacing: '0.3px',
            textAlign: 'center',
          }}
        >
          {[
            'The Testing Pyramid',
            'Test anatomy: describe / it / expect',
            'Assertion results: pass vs fail',
            'Test runner output',
            'Coverage meter',
          ][s]}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {/* Step 0: Pyramid */}
        {s === 0 && (
          <motion.div
            key="s0"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 4 : 6, width: '100%', maxWidth: 280 }}
          >
            {[
              { label: 'E2E', sublabel: 'slow, few', color: RED, width: '40%' },
              { label: 'Integration', sublabel: 'medium', color: ORANGE, width: '65%' },
              { label: 'Unit', sublabel: 'fast, many', color: GREEN, width: '100%' },
            ].map(({ label, sublabel, color, width }) => (
              <motion.div
                key={label}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                style={{
                  width,
                  background: `${color}22`,
                  border: `2px solid ${color}66`,
                  borderRadius: 6,
                  padding: compact ? '5px 8px' : '7px 12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontFamily: mono,
                  fontSize: sz,
                }}
              >
                <span style={{ color, fontWeight: 700 }}>{label}</span>
                <span style={{ color: MUTED, fontSize: compact ? 8 : 10 }}>{sublabel}</span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 1: Test anatomy */}
        {s === 1 && (
          <motion.div
            key="s1"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            style={{
              background: 'var(--surface-bright)',
              border: `1px solid ${GREEN}44`,
              borderRadius: 8,
              padding: compact ? '8px 12px' : '12px 16px',
              fontFamily: mono,
              fontSize: compact ? 9 : 11,
              lineHeight: 1.6,
              whiteSpace: 'pre',
              maxWidth: compact ? 260 : 340,
            }}
          >
            <span style={{ color: BLUE }}>describe</span>
            <span style={{ color: '#e2e8f0' }}>{'(\'add()\', () => {\n  '}</span>
            <span style={{ color: GREEN }}>it</span>
            <span style={{ color: '#e2e8f0' }}>{'(\'sums two numbers\', () => {\n    '}</span>
            <span style={{ color: ORANGE }}>expect</span>
            <span style={{ color: '#e2e8f0' }}>{'(add(2, 3))'}</span>
            <span style={{ color: BLUE }}>.toBe</span>
            <span style={{ color: '#e2e8f0' }}>{'(5)\n  })\n})'}</span>
          </motion.div>
        )}

        {/* Step 2: pass vs fail assertions */}
        {s === 2 && (
          <motion.div
            key="s2"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', gap: compact ? 8 : 12, width: '100%', maxWidth: 300 }}
          >
            {[
              { label: 'expect(add(2,3)).toBe(5)', pass: true },
              { label: 'expect(add(2,3)).toBe(6)', pass: false },
            ].map(({ label, pass }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: compact ? 8 : 10,
                  background: pass ? `${GREEN}15` : `${RED}15`,
                  border: `1px solid ${pass ? GREEN : RED}44`,
                  borderRadius: 6,
                  padding: compact ? '5px 10px' : '7px 14px',
                }}
              >
                <span style={{ fontSize: compact ? 12 : 14 }}>{pass ? '✓' : '✗'}</span>
                <span style={{
                  fontFamily: mono,
                  fontSize: compact ? 9 : 10,
                  color: pass ? GREEN : RED,
                  flex: 1,
                }}>{label}</span>
                <span style={{
                  fontFamily: mono,
                  fontSize: compact ? 8 : 9,
                  color: pass ? GREEN : RED,
                  fontWeight: 700,
                }}>{pass ? 'PASS' : 'FAIL'}</span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 3: Test runner output */}
        {s === 3 && (
          <motion.div
            key="s3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            style={{
              background: '#0f0f1a',
              border: `1px solid ${GREEN}33`,
              borderRadius: 8,
              padding: compact ? '8px 12px' : '12px 16px',
              fontFamily: mono,
              fontSize: compact ? 9 : 11,
              lineHeight: 1.7,
              width: '100%',
              maxWidth: compact ? 260 : 320,
            }}
          >
            {[
              { text: '✓ add() sums two numbers', color: GREEN },
              { text: '✓ subtract() returns difference', color: GREEN },
              { text: '✗ multiply() handles zero', color: RED },
              { text: '', color: '' },
              { text: 'Tests: 1 failed | 2 passed', color: ORANGE },
            ].map(({ text, color }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{ color: color || 'transparent', whiteSpace: 'pre' }}
              >
                {text || ' '}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 4: Coverage meter */}
        {s === 4 && (
          <motion.div
            key="s4"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', gap: compact ? 8 : 12, width: '100%', maxWidth: 280 }}
          >
            {[
              { label: 'Statements', pct: 87, color: GREEN },
              { label: 'Branches', pct: 72, color: ORANGE },
              { label: 'Functions', pct: 100, color: GREEN },
              { label: 'Lines', pct: 85, color: GREEN },
            ].map(({ label, pct, color }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: mono,
                  fontSize: compact ? 9 : 10,
                  color: '#e2e8f0',
                }}>
                  <span>{label}</span>
                  <span style={{ color }}>{pct}%</span>
                </div>
                <div style={{
                  height: compact ? 5 : 7,
                  background: '#1e293b',
                  borderRadius: 4,
                  overflow: 'hidden',
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    style={{ height: '100%', background: color, borderRadius: 4 }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
