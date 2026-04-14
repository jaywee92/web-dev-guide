import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const ORANGE = '#fb923c'
const BLUE   = '#60a5fa'
const GREEN  = '#4ade80'
const PURPLE = '#a78bfa'
const YELLOW = '#fbbf24'
const PINK   = '#f472b6'

const stepLabels = [
  'Declarations are hoisted — expressions are not',
  'Inner functions see outer scope — the scope chain',
  'Higher-order: pass functions like any value',
  'Arrow functions — implicit return when body is one expression',
  'Arrow functions inherit this from outer scope',
  'Default parameters fill in missing args · rest collects the rest',
]

const labelColors = [ORANGE, BLUE, PURPLE, GREEN, YELLOW, PINK]

function CodeLine({ keyword, name, value, kColor, compact }: {
  keyword: string; name?: string; value: string; kColor: string; compact: boolean
}) {
  return (
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 10, lineHeight: 1.5 }}>
      <span style={{ color: kColor }}>{keyword}</span>
      {name && <span style={{ color: 'var(--text)' }}> {name}</span>}
      <span style={{ color: 'var(--text-muted)' }}> {value}</span>
    </div>
  )
}

function ScopeBox({ color, label, children, compact }: {
  color: string; label: string; children: React.ReactNode; compact: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      style={{
        border: `2px solid ${color}55`,
        borderRadius: 10,
        padding: compact ? 10 : 14,
        background: `${color}08`,
      }}
    >
      <div style={{
        fontSize: compact ? 8 : 9,
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        color,
        marginBottom: 6,
        textTransform: 'uppercase' as const,
        letterSpacing: '0.5px',
      }}>{label}</div>
      {children}
    </motion.div>
  )
}

export default function FunctionsViz({ step, compact = false }: Props) {
  const s = Math.min(step, 5)
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

        {/* Step 0: Declaration vs Expression */}
        {s === 0 && (
          <motion.div key="decl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: 320, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <ScopeBox color={GREEN} label="function declaration — hoisted" compact={compact}>
              <CodeLine keyword="function" name="greet" value="(name) { ... }" kColor={GREEN} compact={compact} />
              <div style={{ marginTop: 6, fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: GREEN + 'aa' }}>
                greet("Alice")  <span style={{ color: GREEN }}>// ✓ works before definition</span>
              </div>
            </ScopeBox>
            <ScopeBox color={ORANGE} label="function expression — not hoisted" compact={compact}>
              <CodeLine keyword="const" name="greet" value="= (name) => `Hello, ${name}`" kColor={ORANGE} compact={compact} />
              <div style={{ marginTop: 6, fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: '#f87171aa' }}>
                // calling before → ReferenceError ❌
              </div>
            </ScopeBox>
          </motion.div>
        )}

        {/* Step 1: Scope chain — nested dolls */}
        {s === 1 && (
          <motion.div key="scope" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: compact ? 260 : 300 }}>
            <ScopeBox color={BLUE} label="global scope" compact={compact}>
              <CodeLine keyword="const" name="outer" value={'= "I am outer"'} kColor={BLUE} compact={compact} />
              <div style={{ marginTop: 8 }}>
                <ScopeBox color={GREEN} label="inner function scope" compact={compact}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9 }}>
                    <span style={{ color: 'var(--text-muted)' }}>console.log(</span>
                    <span style={{ color: BLUE }}>outer</span>
                    <span style={{ color: 'var(--text-muted)' }}>)</span>
                    <span style={{ color: GREEN }}> // ✓ visible</span>
                  </div>
                </ScopeBox>
              </div>
            </ScopeBox>
          </motion.div>
        )}

        {/* Step 2: Higher-order functions */}
        {s === 2 && (
          <motion.div key="hof" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: compact ? 260 : 320 }}>
            <ScopeBox color={PURPLE} label=".map() — higher-order function" compact={compact}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <CodeLine keyword="const" name="double" value="= n => n * 2" kColor={PURPLE} compact={compact} />
                <div style={{ marginTop: 4, display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
                  {[1, 2, 3].map((n, i) => (
                    <motion.div
                      key={n}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                      style={{ display: 'flex', alignItems: 'center', gap: 4 }}
                    >
                      <span style={{ color: BLUE }}>{n}</span>
                      <span style={{ color: 'var(--text-faint)' }}>→</span>
                      <span style={{ color: GREEN }}>{n * 2}</span>
                    </motion.div>
                  ))}
                </div>
                <div style={{ color: GREEN, marginTop: 4 }}>// [2, 4, 6]</div>
              </div>
            </ScopeBox>
          </motion.div>
        )}

        {/* Step 3: Arrow Function Syntax */}
        {s === 3 && (
          <motion.div key="arrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: 320, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { label: 'traditional', code: 'function(n) { return n * 2; }', color: ORANGE },
              { label: 'arrow explicit', code: '(n) => { return n * 2; }', color: BLUE },
              { label: 'arrow implicit ✓', code: 'n => n * 2', color: GREEN },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.12 }}
                style={{
                  border: `1.5px solid ${item.color}44`,
                  borderRadius: 8,
                  padding: compact ? '6px 10px' : '8px 14px',
                  background: `${item.color}08`,
                }}
              >
                <div style={{ fontSize: compact ? 8 : 9, color: item.color, fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: 3, textTransform: 'uppercase' as const }}>{item.label}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 10, color: 'var(--text)' }}>{item.code}</div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 4: Lexical this */}
        {s === 4 && (
          <motion.div key="this" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: compact ? 260 : 320 }}>
            <ScopeBox color={YELLOW} label="class Timer — lexical this" compact={compact}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ color: 'var(--text-muted)' }}>start() {'{'}</div>
                <div style={{ paddingLeft: 12 }}>
                  <span style={{ color: BLUE }}>setInterval</span>
                  <span style={{ color: 'var(--text-muted)' }}>(</span>
                  <span style={{ color: GREEN }}>() =&gt;</span>
                  <span style={{ color: 'var(--text-muted)' }}> {'{'}</span>
                </div>
                <div style={{ paddingLeft: 24 }}>
                  <span style={{ color: YELLOW }}>this</span>
                  <span style={{ color: 'var(--text-muted)' }}>.seconds++ </span>
                  <span style={{ color: GREEN }}>// ✓ inherited</span>
                </div>
                <div style={{ paddingLeft: 12, color: 'var(--text-muted)' }}>{'}'}, 1000)</div>
                <div style={{ color: 'var(--text-muted)' }}>{'}'}</div>
              </div>
            </ScopeBox>
            <div style={{
              marginTop: 8, fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9,
              color: '#f87171', background: '#f8717115', border: '1px solid #f8717144',
              borderRadius: 6, padding: compact ? '4px 8px' : '5px 10px',
            }}>
              regular function: this = undefined ❌
            </div>
          </motion.div>
        )}

        {/* Step 5: Default & Rest Parameters */}
        {s === 5 && (
          <motion.div key="params" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: 320, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <ScopeBox color={PINK} label="default parameter — fallback" compact={compact}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9 }}>
                <div>
                  <span style={{ color: PINK }}>function</span>
                  <span style={{ color: 'var(--text)' }}> greet</span>
                  <span style={{ color: 'var(--text-muted)' }}>(name = </span>
                  <span style={{ color: GREEN }}>'World'</span>
                  <span style={{ color: 'var(--text-muted)' }}>)</span>
                </div>
                <div style={{ marginTop: 4, color: GREEN }}>greet()         // 'Hello, World!'</div>
                <div style={{ color: GREEN }}>greet('Alice')  // 'Hello, Alice!'</div>
              </div>
            </ScopeBox>
            <ScopeBox color={BLUE} label="rest parameter — collect remaining" compact={compact}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9 }}>
                <div>
                  <span style={{ color: PINK }}>function</span>
                  <span style={{ color: 'var(--text)' }}> sum</span>
                  <span style={{ color: 'var(--text-muted)' }}>(</span>
                  <span style={{ color: BLUE }}>...nums</span>
                  <span style={{ color: 'var(--text-muted)' }}>)</span>
                </div>
                <div style={{ marginTop: 4, color: GREEN }}>sum(1, 2, 3, 4) // 10</div>
              </div>
            </ScopeBox>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
