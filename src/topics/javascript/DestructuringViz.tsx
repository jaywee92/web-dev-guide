import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const PINK   = '#f472b6'
const BLUE   = '#60a5fa'
const GREEN  = '#4ade80'
const YELLOW = '#fbbf24'
const PURPLE = '#a78bfa'
const ORANGE = '#fb923c'

const stepLabels = [
  'Array destructuring — extract by position',
  'Object destructuring — extract by name · rename · default',
  'Spread expands · rest collects remaining elements',
  'Math · Date · String — built-in global toolbox',
]

const labelColors = [PINK, BLUE, GREEN, YELLOW]

export default function DestructuringViz({ step, compact = false }: Props) {
  const s = Math.min(step, 3)
  const labelColor = labelColors[s]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 16 }}>

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={s}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          style={{
            background: `${labelColor}22`,
            border: `1px solid ${labelColor}55`,
            borderRadius: 6,
            padding: compact ? '4px 10px' : '5px 14px',
            fontSize: compact ? 10 : 11,
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            color: labelColor,
            textAlign: 'center' as const,
            maxWidth: 340,
          }}
        >
          {stepLabels[s]}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">

        {/* Step 0: Array destructuring */}
        {s === 0 && (
          <motion.div key="arr" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: compact ? 260 : 300 }}>
            <div style={{
              border: `2px solid ${PINK}44`,
              borderRadius: 10,
              padding: compact ? 10 : 16,
              background: `${PINK}06`,
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: PINK, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase' as const }}>source array</div>
              <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 10 }}>
                {[1, 2, 3, 4].map((n, i) => (
                  <motion.div
                    key={n}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 }}
                    style={{
                      width: compact ? 28 : 34,
                      height: compact ? 28 : 34,
                      borderRadius: 6,
                      background: `${PINK}18`,
                      border: `1.5px solid ${PINK}55`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: compact ? 10 : 12,
                      fontWeight: 700,
                      color: PINK,
                    }}
                  >
                    {n}
                  </motion.div>
                ))}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div>
                  <span style={{ color: BLUE }}>const </span>
                  <span style={{ color: 'var(--text-muted)' }}>[first, , , fourth] = arr</span>
                </div>
                <div><span style={{ color: GREEN }}>first</span><span style={{ color: 'var(--text-muted)' }}> → </span><span style={{ color: PINK }}>1</span></div>
                <div><span style={{ color: GREEN }}>fourth</span><span style={{ color: 'var(--text-muted)' }}> → </span><span style={{ color: PINK }}>4</span></div>
                <div style={{ color: 'var(--text-faint)', fontSize: compact ? 8 : 9 }}>// position 2 (3) is skipped</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 1: Object destructuring */}
        {s === 1 && (
          <motion.div key="obj" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: compact ? 260 : 300 }}>
            <div style={{
              border: `2px solid ${BLUE}44`,
              borderRadius: 10,
              padding: compact ? 10 : 16,
              background: `${BLUE}06`,
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: BLUE, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase' as const }}>source object</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ color: 'var(--text-muted)' }}>{'{ name: "Alice", role: "admin" }'}</div>
                <div style={{ marginTop: 6 }}>
                  <span style={{ color: BLUE }}>const </span>
                  <span style={{ color: 'var(--text-muted)' }}>{'{ name, age = 0, role: userRole }'}</span>
                </div>
                {[
                  { key: 'name', val: '"Alice"', note: 'by name', color: GREEN },
                  { key: 'age', val: '0', note: 'default', color: YELLOW },
                  { key: 'userRole', val: '"admin"', note: 'renamed', color: PURPLE },
                ].map((item, i) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    style={{ display: 'flex', gap: 6, alignItems: 'center' }}
                  >
                    <span style={{ color: item.color, fontWeight: 700 }}>{item.key}</span>
                    <span style={{ color: 'var(--text-muted)' }}>→</span>
                    <span style={{ color: item.color }}>{item.val}</span>
                    <span style={{ color: 'var(--text-faint)', fontSize: compact ? 8 : 9 }}>({item.note})</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Spread and rest */}
        {s === 2 && (
          <motion.div key="spread" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: 300, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{
              border: `2px solid ${GREEN}44`,
              borderRadius: 10,
              padding: compact ? 10 : 14,
              background: `${GREEN}06`,
            }}>
              <div style={{ fontSize: compact ? 8 : 9, fontFamily: 'var(--font-mono)', color: GREEN, fontWeight: 700, marginBottom: 6, textTransform: 'uppercase' as const }}>spread — expand</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 10 }}>
                <div style={{ color: 'var(--text-muted)' }}>const a = [1, 2, 3]</div>
                <div><span style={{ color: 'var(--text-muted)' }}>const b = [</span><span style={{ color: GREEN }}>...a</span><span style={{ color: 'var(--text-muted)' }}>, 4, 5]</span></div>
                <div style={{ color: GREEN }}>// [1, 2, 3, 4, 5]</div>
              </div>
            </div>
            <div style={{
              border: `2px solid ${ORANGE}44`,
              borderRadius: 10,
              padding: compact ? 10 : 14,
              background: `${ORANGE}06`,
            }}>
              <div style={{ fontSize: compact ? 8 : 9, fontFamily: 'var(--font-mono)', color: ORANGE, fontWeight: 700, marginBottom: 6, textTransform: 'uppercase' as const }}>rest — collect</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 10 }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>function sum(first, </span>
                  <span style={{ color: ORANGE }}>...rest</span>
                  <span style={{ color: 'var(--text-muted)' }}>)</span>
                </div>
                <div style={{ color: ORANGE }}>// rest must be last ←</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Built-in Objects */}
        {s === 3 && (
          <motion.div key="builtins" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', gap: compact ? 8 : 12, flexWrap: 'wrap' as const, justifyContent: 'center', maxWidth: 320 }}>
            {[
              { name: 'Math', color: YELLOW, examples: ['Math.round(4.6) → 5', 'Math.max(1,5,3) → 5', 'Math.random()'] },
              { name: 'Date', color: BLUE, examples: ['new Date()', '.getFullYear()', '.toISOString()'] },
              { name: 'String', color: PURPLE, examples: ['.trim()', '.includes()', '.toLowerCase()'] },
            ].map((obj, i) => (
              <motion.div
                key={obj.name}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.12 }}
                style={{
                  border: `2px solid ${obj.color}44`,
                  borderRadius: 10,
                  padding: compact ? '8px 10px' : '10px 14px',
                  background: `${obj.color}08`,
                  minWidth: compact ? 90 : 110,
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: obj.color, fontSize: compact ? 10 : 11, marginBottom: 6 }}>{obj.name}</div>
                {obj.examples.map(ex => (
                  <div key={ex} style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: 'var(--text-faint)', lineHeight: 1.6 }}>{ex}</div>
                ))}
              </motion.div>
            ))}
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
