import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const ORANGE = '#fb923c'
const BLUE   = '#60a5fa'
const PURPLE = '#a78bfa'
const GREEN  = '#4ade80'
const RED    = '#f87171'
const GREY   = '#6b7280'

const stepLabels = [
  'var — function-scoped, hoisted to top of function',
  'let — block-scoped, lives only inside { }',
  'const — block-scoped, cannot be reassigned',
  'Values have types: string, number, boolean, null, undefined',
  "Each scope has its own copy — changes don't leak out",
]

const types = [
  { type: 'string',    ex: '"hello"',   color: GREEN  },
  { type: 'number',    ex: '42',        color: BLUE   },
  { type: 'boolean',   ex: 'true',      color: PURPLE },
  { type: 'null',      ex: 'null',      color: GREY   },
  { type: 'undefined', ex: 'undefined', color: GREY   },
]

function ScopeBox({ color, label, children, compact }: {
  color: string; label: string; children: React.ReactNode; compact: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      style={{
        border: `2px solid ${color}66`,
        borderRadius: 10, padding: compact ? 10 : 16,
        background: `${color}08`,
        boxShadow: `0 0 18px ${color}18`,
      }}
    >
      <div style={{
        fontSize: compact ? 8 : 9, fontFamily: 'var(--font-mono)', fontWeight: 700,
        color, marginBottom: 8, textTransform: 'uppercase' as const, letterSpacing: '0.5px',
      }}>
        {label}
      </div>
      {children}
    </motion.div>
  )
}

function VarLine({ keyword, name, value, color, compact }: {
  keyword: string; name: string; value: string; color: string; compact: boolean
}) {
  const fs = compact ? 9 : 11
  return (
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: fs }}>
      <span style={{ color }}>{keyword}</span>{' '}
      <span style={{ color: 'var(--text)' }}>{name}</span>{' '}
      <span style={{ color: 'var(--text-muted)' }}>= </span>
      <span style={{ color: GREEN }}>'{value}'</span>
    </div>
  )
}

export default function VariablesViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 16 }}>
      <AnimatePresence mode="wait">

        {/* Step 0: var + hoisting */}
        {s === 0 && (
          <motion.div key="var" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: compact ? 260 : 320 }}>
            <ScopeBox color={ORANGE} label="function scope" compact={compact}>
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9,
                  color: ORANGE + '66', marginBottom: 6,
                  borderLeft: `2px dashed ${ORANGE}44`, paddingLeft: 6,
                }}
              >
                {/* hoisted */} var name = undefined
              </motion.div>
              <div style={{ fontSize: compact ? 7 : 8, color: 'var(--text-muted)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>
                // ... code above ...
              </div>
              <VarLine keyword="var" name="name" value="Alice" color={ORANGE} compact={compact} />
            </ScopeBox>
          </motion.div>
        )}

        {/* Step 1: let + block scope */}
        {s === 1 && (
          <motion.div key="let" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: compact ? 260 : 320 }}>
            <ScopeBox color={BLUE} label="block scope { }" compact={compact}>
              <VarLine keyword="let" name="count" value="0" color={BLUE} compact={compact} />
              <div style={{ marginTop: 8, fontSize: compact ? 8 : 10, color: BLUE + 'aa', fontFamily: 'var(--font-mono)' }}>
                count = 1  <span style={{ color: GREEN }}>// ✓ ok</span>
              </div>
            </ScopeBox>
            <div style={{ marginTop: 8, fontSize: compact ? 8 : 10, color: RED + 'aa', fontFamily: 'var(--font-mono)', textAlign: 'center' as const }}>
              outside {'{ }'}: count → ReferenceError ❌
            </div>
          </motion.div>
        )}

        {/* Step 2: const */}
        {s === 2 && (
          <motion.div key="const" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: compact ? 260 : 320 }}>
            <ScopeBox color={PURPLE} label="const — immutable binding 🔒" compact={compact}>
              <VarLine keyword="const" name="PI" value="3.14" color={PURPLE} compact={compact} />
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{
                  marginTop: 8, fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 10,
                  color: RED, background: `${RED}12`, border: `1px solid ${RED}44`,
                  borderRadius: 5, padding: compact ? '4px 8px' : '5px 10px',
                }}
              >
                PI = 3  ❌ TypeError: Assignment to constant
              </motion.div>
            </ScopeBox>
          </motion.div>
        )}

        {/* Step 3: Types */}
        {s === 3 && (
          <motion.div key="types" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', flexWrap: 'wrap' as const, gap: compact ? 6 : 8, justifyContent: 'center', maxWidth: compact ? 260 : 340 }}>
            {types.map((t, i) => (
              <motion.div
                key={t.type}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 300, damping: 20 }}
                style={{
                  background: `${t.color}18`, border: `1.5px solid ${t.color}55`,
                  borderRadius: 8, padding: compact ? '6px 10px' : '8px 14px',
                  textAlign: 'center' as const,
                }}
              >
                <div style={{ fontSize: compact ? 8 : 9, fontFamily: 'var(--font-mono)', color: t.color, fontWeight: 700, textTransform: 'uppercase' as const }}>{t.type}</div>
                <div style={{ fontSize: compact ? 9 : 11, fontFamily: 'var(--font-mono)', color: 'var(--text)', marginTop: 2 }}>{t.ex}</div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 4: Scope isolation */}
        {s === 4 && (
          <motion.div key="isolation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', gap: compact ? 8 : 14 }}>
            {['counter A', 'counter B'].map((label, i) => (
              <ScopeBox key={label} color={BLUE} label={label} compact={compact}>
                <VarLine keyword="let" name="count" value={i === 0 ? '5' : '0'} color={BLUE} compact={compact} />
              </ScopeBox>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={s}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          style={{
            color: [ORANGE, BLUE, PURPLE, GREEN, BLUE][s],
            fontFamily: 'var(--font-mono)', fontSize: compact ? 10 : 11,
            textAlign: 'center', margin: 0, maxWidth: 340,
          }}
        >
          {stepLabels[s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
