import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const YELLOW = '#fbbf24'
const BLUE   = '#60a5fa'
const GREEN  = '#4ade80'
const RED    = '#f87171'

const stepLabels = [
  'setTimeout — runs callback once after a delay',
  'setInterval — fires callback repeatedly on a schedule',
  'clearTimeout / clearInterval — always clean up your timers',
]

const labelColors = [YELLOW, BLUE, RED]

export default function TimersViz({ step, compact = false }: Props) {
  const s = Math.min(step, 2)
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

        {/* Step 0: setTimeout */}
        {s === 0 && (
          <motion.div key="timeout" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: compact ? 260 : 300 }}>
            <div style={{
              border: `2px solid ${YELLOW}44`,
              borderRadius: 10,
              padding: compact ? 10 : 16,
              background: `${YELLOW}06`,
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: YELLOW, fontWeight: 700, marginBottom: 10, textTransform: 'uppercase' as const }}>setTimeout</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 8 : 12 }}>
                {/* Timeline */}
                <div style={{ flex: 1 }}>
                  <div style={{ position: 'relative' as const, height: compact ? 32 : 40 }}>
                    <div style={{ position: 'absolute' as const, top: '50%', left: 0, right: 0, height: 2, background: `${YELLOW}33`, transform: 'translateY(-50%)' }} />
                    {/* Sync code marker */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 }}
                      style={{
                        position: 'absolute' as const, top: '50%', left: 0,
                        transform: 'translate(-50%, -50%)',
                        width: compact ? 10 : 12, height: compact ? 10 : 12,
                        borderRadius: '50%',
                        background: GREEN,
                        border: `2px solid ${GREEN}`,
                      }}
                    />
                    {/* Callback marker */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 }}
                      style={{
                        position: 'absolute' as const, top: '50%', right: 0,
                        transform: 'translate(50%, -50%)',
                        width: compact ? 10 : 12, height: compact ? 10 : 12,
                        borderRadius: '50%',
                        background: YELLOW,
                        border: `2px solid ${YELLOW}`,
                        boxShadow: `0 0 10px ${YELLOW}88`,
                      }}
                    />
                    {/* 1000ms label */}
                    <div style={{
                      position: 'absolute' as const, top: -16, left: '50%',
                      transform: 'translateX(-50%)',
                      fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: YELLOW,
                    }}>
                      1000ms
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: 'var(--text-faint)', marginTop: 4 }}>
                    <span style={{ color: GREEN }}>sync code</span>
                    <span style={{ color: YELLOW }}>callback ✓</span>
                  </div>
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: 'var(--text-faint)', marginTop: 8 }}>
                const id = <span style={{ color: YELLOW }}>setTimeout</span>(() =&gt; {'{ ... }'}, 1000)
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 1: setInterval */}
        {s === 1 && (
          <motion.div key="interval" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: compact ? 260 : 300 }}>
            <div style={{
              border: `2px solid ${BLUE}44`,
              borderRadius: 10,
              padding: compact ? 10 : 16,
              background: `${BLUE}06`,
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: BLUE, fontWeight: 700, marginBottom: 10, textTransform: 'uppercase' as const }}>setInterval — repeating ticks</div>
              <div style={{ display: 'flex', gap: compact ? 6 : 8, justifyContent: 'center' }}>
                {[1, 2, 3, 4, 5].map((tick, i) => (
                  <motion.div
                    key={tick}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + i * 0.12, type: 'spring', stiffness: 400, damping: 20 }}
                    style={{
                      width: compact ? 28 : 36,
                      height: compact ? 28 : 36,
                      borderRadius: '50%',
                      background: tick === 5 ? `${RED}22` : `${BLUE}22`,
                      border: `2px solid ${tick === 5 ? RED : BLUE}66`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: compact ? 9 : 10,
                      fontWeight: 700,
                      color: tick === 5 ? RED : BLUE,
                    }}
                  >
                    {tick === 5 ? '🛑' : tick}
                  </motion.div>
                ))}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: 'var(--text-faint)', marginTop: 8 }}>
                const id = <span style={{ color: BLUE }}>setInterval</span>(() =&gt; {'{ ... }'}, 500)
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: RED, marginTop: 4 }}>
                // must clearInterval(id) to stop ←
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: clearTimeout / clearInterval */}
        {s === 2 && (
          <motion.div key="clear" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: 300, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{
              border: `2px solid ${RED}44`,
              borderRadius: 10,
              padding: compact ? 10 : 14,
              background: `${RED}06`,
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: RED, fontWeight: 700, marginBottom: 6, textTransform: 'uppercase' as const }}>cancel before it fires</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>const id = setTimeout(fn, 5000)</span>
                </div>
                <div>
                  <span style={{ color: RED }}>clearTimeout</span>
                  <span style={{ color: 'var(--text-muted)' }}>(id) </span>
                  <span style={{ color: GREEN }}>// never runs ✓</span>
                </div>
              </div>
            </div>
            <div style={{
              border: `2px solid ${YELLOW}44`,
              borderRadius: 10,
              padding: compact ? 10 : 14,
              background: `${YELLOW}06`,
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: YELLOW, fontWeight: 700, marginBottom: 6, textTransform: 'uppercase' as const }}>cleanup pattern (React)</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ color: 'var(--text-muted)' }}>useEffect(() =&gt; {'{'}</div>
                <div style={{ paddingLeft: 12, color: BLUE }}>const id = setInterval(fn, 1000)</div>
                <div style={{ paddingLeft: 12, color: 'var(--text-muted)' }}>return () =&gt; <span style={{ color: RED }}>clearInterval</span>(id)</div>
                <div style={{ color: 'var(--text-muted)' }}>{'}'}, [])</div>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
