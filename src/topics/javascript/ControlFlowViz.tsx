import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const BLUE   = '#60a5fa'
const GREEN  = '#4ade80'
const YELLOW = '#fbbf24'
const PURPLE = '#a78bfa'
const RED    = '#f87171'

const stepLabels = [
  'if/else — first matching condition wins, rest are skipped',
  'switch — jump to the matching case · break to stop fall-through',
  'for loop — init · condition · update · repeat',
  'while checks before · do-while always runs the body at least once',
  'break stops the loop · continue skips to the next iteration',
]

const labelColors = [BLUE, YELLOW, GREEN, PURPLE, RED]

export default function ControlFlowViz({ step, compact = false }: Props) {
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

        {/* Step 0: if / else if / else */}
        {s === 0 && (
          <motion.div key="if" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: compact ? 240 : 290 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[
                { cond: 'temp > 30', result: '"Hot"', active: false, color: RED },
                { cond: 'temp > 20', result: '"Warm"', active: true, color: YELLOW },
                { cond: 'else', result: '"Cool"', active: false, color: BLUE },
              ].map((branch, i) => (
                <motion.div
                  key={branch.cond}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.12 }}
                  style={{
                    border: `1.5px solid ${branch.active ? branch.color : branch.color + '33'}`,
                    borderRadius: 8,
                    padding: compact ? '6px 10px' : '8px 14px',
                    background: branch.active ? `${branch.color}15` : `${branch.color}05`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 10, color: branch.active ? branch.color : 'var(--text-muted)' }}>
                    {branch.cond === 'else' ? 'else' : `if (${branch.cond})`}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: branch.active ? GREEN : 'var(--text-faint)' }}>
                    → {branch.result} {branch.active ? '✓' : ''}
                  </span>
                </motion.div>
              ))}
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: 'var(--text-faint)', textAlign: 'center' as const, marginTop: 4 }}>
                const temp = 22
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 1: switch */}
        {s === 1 && (
          <motion.div key="switch" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: compact ? 240 : 280 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 10, color: YELLOW, marginBottom: 4 }}>
                switch(<span style={{ color: GREEN }}>'Mon'</span>)
              </div>
              {[
                { label: "case 'Sat':", match: false },
                { label: "case 'Sun':", match: false },
                { label: "case 'Mon':", match: true },
                { label: "default:", match: false },
              ].map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    border: `1.5px solid ${c.match ? YELLOW : YELLOW + '22'}`,
                    borderRadius: 6,
                    padding: compact ? '5px 10px' : '6px 12px',
                    background: c.match ? `${YELLOW}15` : 'transparent',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 10, color: c.match ? YELLOW : 'var(--text-faint)' }}>{c.label}</span>
                  {c.match && <span style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: GREEN }}>→ 'Monday' + break ✓</span>}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: for loop */}
        {s === 2 && (
          <motion.div key="for" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: compact ? 260 : 300 }}>
            <div style={{
              border: `2px solid ${GREEN}44`,
              borderRadius: 10,
              padding: compact ? 10 : 16,
              background: `${GREEN}06`,
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 10, marginBottom: 10 }}>
                <span style={{ color: GREEN }}>for</span>
                <span style={{ color: 'var(--text-muted)' }}> (</span>
                <span style={{ color: BLUE }}>let i = 0</span>
                <span style={{ color: 'var(--text-faint)' }}>; </span>
                <span style={{ color: YELLOW }}>i {'<'} 3</span>
                <span style={{ color: 'var(--text-faint)' }}>; </span>
                <span style={{ color: PURPLE }}>i++</span>
                <span style={{ color: 'var(--text-muted)' }}>)</span>
              </div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + i * 0.15, type: 'spring', stiffness: 400, damping: 20 }}
                    style={{
                      width: compact ? 28 : 36,
                      height: compact ? 28 : 36,
                      borderRadius: 8,
                      background: `${GREEN}22`,
                      border: `2px solid ${GREEN}66`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: compact ? 12 : 14,
                      fontWeight: 700,
                      color: GREEN,
                    }}
                  >
                    {i}
                  </motion.div>
                ))}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: 'var(--text-faint)', textAlign: 'center' as const, marginTop: 8 }}>
                fruits[0], fruits[1], fruits[2]
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: while / do-while */}
        {s === 3 && (
          <motion.div key="while" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: 300, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{
              border: `2px solid ${PURPLE}44`,
              borderRadius: 10,
              padding: compact ? 10 : 14,
              background: `${PURPLE}06`,
            }}>
              <div style={{ fontSize: compact ? 8 : 9, fontFamily: 'var(--font-mono)', color: PURPLE, fontWeight: 700, marginBottom: 6, textTransform: 'uppercase' as const }}>while — checks first</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 10 }}>
                <div style={{ color: YELLOW, background: `${YELLOW}15`, border: `1px solid ${YELLOW}44`, borderRadius: 6, padding: compact ? '4px 8px' : '5px 10px' }}>
                  attempts {'<'} 3 ?
                </div>
                <span style={{ color: GREEN }}>→ run body</span>
              </div>
            </div>
            <div style={{
              border: `2px solid ${BLUE}44`,
              borderRadius: 10,
              padding: compact ? 10 : 14,
              background: `${BLUE}06`,
            }}>
              <div style={{ fontSize: compact ? 8 : 9, fontFamily: 'var(--font-mono)', color: BLUE, fontWeight: 700, marginBottom: 6, textTransform: 'uppercase' as const }}>do-while — always runs once</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 10 }}>
                <div style={{ color: GREEN, background: `${GREEN}15`, border: `1px solid ${GREEN}44`, borderRadius: 6, padding: compact ? '4px 8px' : '5px 10px' }}>
                  do {'{'} run {'}'} first
                </div>
                <span style={{ color: YELLOW }}>→ then check</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 4: break / continue */}
        {s === 4 && (
          <motion.div key="break" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: compact ? 260 : 300 }}>
            <div style={{
              border: `2px solid ${RED}44`,
              borderRadius: 10,
              padding: compact ? 10 : 16,
              background: `${RED}06`,
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: 'var(--text-faint)', marginBottom: 8 }}>for i in 0..9</div>
              <div style={{ display: 'flex', gap: compact ? 4 : 6, flexWrap: 'wrap' as const, justifyContent: 'center' }}>
                {[0, 1, 2, 'skip3', 4, 5, 6, 'stop7'].map((item, idx) => {
                  const isSkip = item === 'skip3'
                  const isStop = item === 'stop7'
                  const val = isSkip ? 3 : isStop ? 7 : item as number
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.07 }}
                      style={{
                        width: compact ? 26 : 32,
                        height: compact ? 26 : 32,
                        borderRadius: 6,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--font-mono)',
                        fontSize: compact ? 9 : 10,
                        fontWeight: 700,
                        background: isSkip ? `${YELLOW}20` : isStop ? `${RED}20` : `${GREEN}20`,
                        border: `1.5px solid ${isSkip ? YELLOW : isStop ? RED : GREEN}55`,
                        color: isSkip ? YELLOW : isStop ? RED : GREEN,
                        position: 'relative' as const,
                      }}
                    >
                      {val}
                      {isSkip && <span style={{ position: 'absolute' as const, top: -8, fontSize: 8, color: YELLOW }}>skip</span>}
                      {isStop && <span style={{ position: 'absolute' as const, top: -8, fontSize: 8, color: RED }}>stop</span>}
                    </motion.div>
                  )
                })}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: 'var(--text-faint)', textAlign: 'center' as const, marginTop: 8 }}>
                output: 0 1 2 4 5 6
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
