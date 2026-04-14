import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const GREEN  = '#4ade80'
const YELLOW = '#fbbf24'
const RED    = '#f87171'
const BLUE   = '#60a5fa'
const PURPLE = '#a78bfa'

const stepLabels = [
  'A Promise is pending · fulfilled · or rejected',
  '.then() chains transform the resolved value step-by-step',
  'async/await — write async code that reads like sync',
  'async/await in practice — await inside an async function',
  'Always wrap await calls in try/catch · check res.ok',
]

const labelColors = [YELLOW, BLUE, GREEN, BLUE, RED]

function StateChip({ label, color, active, compact }: {
  label: string; color: string; active: boolean; compact: boolean
}) {
  return (
    <motion.div
      animate={{ boxShadow: active ? `0 0 16px ${color}66` : 'none' }}
      transition={{ duration: 0.4 }}
      style={{
        padding: compact ? '5px 10px' : '7px 14px',
        borderRadius: 8,
        border: `2px solid ${active ? color : color + '33'}`,
        background: active ? `${color}18` : 'transparent',
        fontFamily: 'var(--font-mono)',
        fontSize: compact ? 10 : 11,
        fontWeight: 700,
        color: active ? color : color + '55',
        transition: 'all 0.3s',
      }}
    >
      {label}
    </motion.div>
  )
}

export default function PromisesViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
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

        {/* Step 0: Promise states */}
        {s === 0 && (
          <motion.div key="states" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: '100%', maxWidth: 300 }}>
            <StateChip label="⏳ pending" color={YELLOW} active compact={compact} />
            <div style={{ display: 'flex', gap: 10 }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
              >
                <div style={{ color: GREEN, fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9 }}>resolve() ↙</div>
                <StateChip label="✓ fulfilled" color={GREEN} active compact={compact} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
              >
                <div style={{ color: RED, fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9 }}>reject() ↘</div>
                <StateChip label="✗ rejected" color={RED} active compact={compact} />
              </motion.div>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: 'var(--text-faint)', textAlign: 'center' as const }}>
              once settled, state never changes
            </div>
          </motion.div>
        )}

        {/* Step 1: .then() chaining */}
        {s === 1 && (
          <motion.div key="chain" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: compact ? 260 : 300 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { label: "fetch('/api/user')", color: BLUE, result: 'Response' },
                { label: '.then(res => res.json())', color: PURPLE, result: 'JSON object' },
                { label: ".then(user => console.log(user.name))", color: GREEN, result: 'done ✓' },
                { label: '.catch(err => ...)', color: RED, result: 'handle error' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.12 }}
                  style={{ display: 'flex', gap: 8, alignItems: 'center' }}
                >
                  <div style={{
                    flex: 1,
                    border: `1.5px solid ${item.color}44`,
                    borderRadius: 6,
                    padding: compact ? '5px 8px' : '6px 10px',
                    background: `${item.color}08`,
                    fontFamily: 'var(--font-mono)',
                    fontSize: compact ? 8 : 9,
                    color: item.color,
                  }}>
                    {item.label}
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: 'var(--text-faint)' }}>→ {item.result}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: async/await syntax */}
        {s === 2 && (
          <motion.div key="await-syntax" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: compact ? 260 : 300 }}>
            <div style={{
              border: `2px solid ${GREEN}44`,
              borderRadius: 10,
              padding: compact ? 10 : 14,
              background: `${GREEN}06`,
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: GREEN, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase' as const }}>async/await — sequential flow</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div>
                  <span style={{ color: GREEN }}>async</span>
                  <span style={{ color: 'var(--text-muted)' }}> function getUser(id) {'{'}</span>
                </div>
                <div style={{ paddingLeft: 12 }}>
                  <span style={{ color: BLUE }}>const res</span>
                  <span style={{ color: 'var(--text-muted)' }}> = </span>
                  <span style={{ color: GREEN }}>await</span>
                  <span style={{ color: 'var(--text-muted)' }}> fetch(...)</span>
                </div>
                <div style={{ paddingLeft: 12 }}>
                  <span style={{ color: BLUE }}>const user</span>
                  <span style={{ color: 'var(--text-muted)' }}> = </span>
                  <span style={{ color: GREEN }}>await</span>
                  <span style={{ color: 'var(--text-muted)' }}> res.json()</span>
                </div>
                <div style={{ paddingLeft: 12 }}>
                  <span style={{ color: BLUE }}>return</span>
                  <span style={{ color: 'var(--text-muted)' }}> user</span>
                </div>
                <div style={{ color: 'var(--text-muted)' }}>{'}'}</div>
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: 'var(--text-faint)', marginTop: 6, textAlign: 'center' as const }}>
              reads top-to-bottom · no .then() nesting
            </div>
          </motion.div>
        )}

        {/* Step 3: async/await in practice */}
        {s === 3 && (
          <motion.div key="await-practice" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: compact ? 260 : 300 }}>
            <div style={{
              border: `2px solid ${BLUE}44`,
              borderRadius: 10,
              padding: compact ? 10 : 14,
              background: `${BLUE}06`,
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: BLUE, fontWeight: 700, marginBottom: 6, textTransform: 'uppercase' as const }}>async function returns a Promise</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { text: "async fn always returns a Promise", color: BLUE },
                  { text: "await pauses only the current function", color: GREEN },
                  { text: "other code runs while you await", color: YELLOW },
                  { text: "resolved value assigned as normal var", color: PURPLE },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: compact ? 8 : 9,
                      color: item.color,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <span style={{ opacity: 0.6 }}>→</span>
                    {item.text}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 4: Error handling */}
        {s === 4 && (
          <motion.div key="errors" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: compact ? 260 : 300 }}>
            <div style={{
              border: `2px solid ${RED}44`,
              borderRadius: 10,
              padding: compact ? 10 : 14,
              background: `${RED}06`,
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: RED, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase' as const }}>try/catch — safety net</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ color: 'var(--text-muted)' }}>try {'{'}</div>
                <div style={{ paddingLeft: 12 }}>
                  <span style={{ color: GREEN }}>const res</span>
                  <span style={{ color: 'var(--text-muted)' }}> = await fetch(url)</span>
                </div>
                <div style={{ paddingLeft: 12 }}>
                  <span style={{ color: BLUE }}>if (!res.ok)</span>
                  <span style={{ color: RED }}> throw</span>
                  <span style={{ color: 'var(--text-muted)' }}> new Error(...)</span>
                </div>
                <div style={{ color: 'var(--text-muted)' }}>{'}'} catch (err) {'{'}</div>
                <div style={{ paddingLeft: 12, color: RED }}>console.error(err)</div>
                <div style={{ color: 'var(--text-muted)' }}>{'}'}</div>
              </div>
            </div>
            <div style={{
              marginTop: 8,
              fontFamily: 'var(--font-mono)',
              fontSize: compact ? 8 : 9,
              color: YELLOW,
              background: `${YELLOW}10`,
              border: `1px solid ${YELLOW}33`,
              borderRadius: 6,
              padding: compact ? '4px 8px' : '5px 10px',
            }}>
              fetch() only rejects on network errors — always check res.ok ←
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
