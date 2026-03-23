import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number }

const AMBER  = '#fbbf24'
const BLUE   = '#63b3ed'
const PURPLE = '#a78bfa'
const GREEN  = '#4ade80'
const RED    = '#f87171'
const ORANGE = '#fb923c'
const MUTED  = '#64748b'

// Reusable scope box
function ScopeBox({ label, color, children, dashed = false }: {
  label: string; color: string; children: React.ReactNode; dashed?: boolean
}) {
  return (
    <div style={{
      border: `${dashed ? '1.5px dashed' : '1px solid'} ${color}44`,
      borderRadius: 6, padding: '6px 8px',
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: MUTED, marginBottom: 4 }}>
        {label}
      </div>
      {children}
    </div>
  )
}

// Reusable code chip
function Chip({ code, color }: { code: string; color: string }) {
  return (
    <div style={{
      background: `${color}1a`, border: `1px solid ${color}55`,
      borderRadius: 4, padding: '2px 7px',
      fontFamily: 'var(--font-mono)', fontSize: 9, color,
      display: 'inline-block',
    }}>
      {code}
    </div>
  )
}

const steps: React.ReactNode[] = [
  // Step 0 — var: leaky bucket
  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
    <ScopeBox label="function scope" color={AMBER}>
      <Chip code="var x ← hoisted here" color={AMBER} />
      <div style={{ marginTop: 5 }}>
        <ScopeBox label="if (true) {" color={MUTED} dashed>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Chip code="var x = 2" color={AMBER} />
            <motion.span
              animate={{ y: [-2, -7, -2] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
              style={{ color: AMBER, fontSize: 14 }}
            >↑</motion.span>
          </div>
        </ScopeBox>
      </div>
    </ScopeBox>
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: RED }}>
      // same variable — x is 2 outside the block too
    </div>
  </div>,

  // Step 1 — let: sealed room
  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
    <ScopeBox label="function scope" color={BLUE}>
      <Chip code='let outer = "apple"' color={BLUE} />
      <div style={{ marginTop: 5, position: 'relative' }}>
        <ScopeBox label="if (true) {" color={BLUE}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Chip code='let inner = "banana"' color={BLUE} />
            <span style={{ fontSize: 13 }}>🔒</span>
          </div>
        </ScopeBox>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: RED, marginTop: 4 }}
      >
        inner → ReferenceError ✗
      </motion.div>
    </ScopeBox>
  </div>,

  // Step 2 — const: name tag
  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
    <div style={{
      border: `2px solid ${PURPLE}55`, borderRadius: 6,
      padding: '10px 10px 8px', background: `${PURPLE}08`,
      flex: 1, position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: -9, left: 8,
        background: PURPLE, borderRadius: 3,
        padding: '1px 6px', fontSize: 8, color: '#0f172a', fontWeight: 800,
        fontFamily: 'var(--font-mono)',
      }}>
        user 📌
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: PURPLE, marginTop: 2 }}>
        name: "Alice"
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: PURPLE, marginTop: 2 }}>
        age: 25
      </div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingTop: 6, flexShrink: 0 }}>
      <motion.div
        initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: RED }}
      >
        user = &#123;&#125; ✗
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: GREEN }}
      >
        user.name = "Bob" ✓
      </motion.div>
    </div>
  </div>,

  // Step 3 — Primitives: 6 chips
  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
    {[
      { type: 'string',    example: '"Alice"',   color: GREEN  },
      { type: 'number',    example: '42',         color: AMBER  },
      { type: 'boolean',   example: 'true',       color: BLUE   },
      { type: 'null',      example: 'null',       color: RED    },
      { type: 'undefined', example: 'undefined',  color: MUTED  },
      { type: 'symbol',    example: 'Symbol()',   color: PURPLE },
    ].map(({ type, example, color }, i) => (
      <motion.div
        key={type}
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.07 }}
        style={{ display: 'flex', alignItems: 'center', gap: 8 }}
      >
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 8, color,
          background: `${color}14`, border: `1px solid ${color}33`,
          borderRadius: 3, padding: '1px 6px', minWidth: 62, textAlign: 'center',
        }}>
          {type}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#e2e8f0' }}>
          {example}
        </div>
      </motion.div>
    ))}
  </div>,

  // Step 4 — typeof: shipping label
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    {[
      { val: '"hello"',   result: '"string"',    color: GREEN  },
      { val: '42',        result: '"number"',    color: AMBER  },
      { val: 'true',      result: '"boolean"',   color: BLUE   },
      { val: 'null',      result: '"object" ⚠️', color: RED,   note: 'quirk!' },
      { val: 'undefined', result: '"undefined"', color: MUTED  },
    ].map(({ val, result, color, note }, i) => (
      <motion.div
        key={val}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: i * 0.08 }}
        style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 9 }}
      >
        <span style={{ color: '#94a3b8', minWidth: 72 }}>typeof {val}</span>
        <span style={{ color: MUTED }}>→</span>
        <span style={{ color, fontWeight: note ? 700 : 400 }}>{result}</span>
      </motion.div>
    ))}
  </div>,

  // Step 5 — Arithmetic: calculator
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    {[
      { expr: '10 + 3',  result: '13',    color: GREEN  },
      { expr: '10 - 3',  result: '7',     color: BLUE   },
      { expr: '10 * 3',  result: '30',    color: AMBER  },
      { expr: '10 / 3',  result: '3.33…', color: PURPLE },
      { expr: '10 % 3',  result: '1',     color: ORANGE },
      { expr: '10 ** 3', result: '1000',  color: RED    },
    ].map(({ expr, result, color }, i) => (
      <motion.div
        key={expr}
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.07 }}
        style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 9 }}
      >
        <span style={{ color: '#94a3b8', minWidth: 56 }}>{expr}</span>
        <span style={{ color: MUTED }}>→</span>
        <motion.span
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.07 + 0.2 }}
          style={{ color, fontWeight: 700 }}
        >
          {result}
        </motion.span>
      </motion.div>
    ))}
  </div>,

  // Step 6 — Comparison: strict vs lenient
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <div style={{ display: 'flex', gap: 8 }}>
      <div style={{
        flex: 1, border: `1px solid ${GREEN}44`, borderRadius: 5,
        padding: '6px 8px', background: `${GREEN}08`,
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: GREEN, marginBottom: 4, fontWeight: 700 }}>
          === strict
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#94a3b8' }}>5 === "5"</div>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: RED, marginTop: 2 }}
        >
          false ✓ (type differs)
        </motion.div>
      </div>
      <div style={{
        flex: 1, border: `1px solid ${RED}44`, borderRadius: 5,
        padding: '6px 8px', background: `${RED}08`,
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: RED, marginBottom: 4, fontWeight: 700 }}>
          == loose ⚠️
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#94a3b8' }}>5 == "5"</div>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: AMBER, marginTop: 2 }}
        >
          true ⚠️ (coerced)
        </motion.div>
      </div>
    </div>
    <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
      {[
        { op: '&&', label: 'both true', color: GREEN },
        { op: '||', label: 'one true',  color: BLUE  },
        { op: '!',  label: 'flip',      color: AMBER },
      ].map(({ op, label, color }) => (
        <div key={op} style={{
          fontFamily: 'var(--font-mono)', fontSize: 9, color,
          background: `${color}14`, border: `1px solid ${color}33`,
          borderRadius: 4, padding: '2px 8px', textAlign: 'center',
        }}>
          {op} <span style={{ color: MUTED, fontSize: 8 }}>{label}</span>
        </div>
      ))}
    </div>
  </div>,

  // Step 7 — try/catch: flow redirect
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    {[
      { label: 'try { ... }',       color: BLUE,  note: 'risky code runs here'          },
      { label: '  ↓ error thrown',  color: RED,   note: 'execution diverts', arrow: true },
      { label: 'catch (e) { ... }', color: AMBER, note: 'handle it gracefully'           },
      { label: 'finally { ... }',   color: GREEN, note: 'always runs (cleanup)'          },
    ].map(({ label, color, note, arrow }, i) => (
      <motion.div
        key={label}
        initial={{ opacity: 0, x: arrow ? 8 : -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.1 }}
        style={{ display: 'flex', alignItems: 'center', gap: 8 }}
      >
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 9,
          color, minWidth: arrow ? 'auto' : 110,
          fontStyle: arrow ? 'italic' : 'normal',
        }}>
          {label}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: MUTED }}>
          {note}
        </div>
      </motion.div>
    ))}
  </div>,
]

export default function VariablesAnalogyViz({ step }: Props) {
  const s = Math.min(step, steps.length - 1)
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={s}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.25 }}
      >
        {steps[s]}
      </motion.div>
    </AnimatePresence>
  )
}
