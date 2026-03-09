import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const baseItems = [1, 2, 3]
const stepLabels = [
  'Array — ordered list with numeric indexes',
  'push / pop — add and remove from end',
  'map — transforms every element',
  'filter — keeps matching elements',
  'Object — unordered key-value pairs',
]

const objectEntries = [
  { key: 'name', value: '"Alice"', color: '#4ade80' },
  { key: 'age', value: '25', color: '#5b9cf5' },
]

function ArrayBox({
  value,
  index,
  highlight,
  dim,
  compact,
}: {
  value: number | string
  index: number
  highlight?: string
  dim?: boolean
  compact: boolean
}) {
  const size = compact ? 44 : 56
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <motion.div
        animate={{
          backgroundColor: highlight ?? 'rgba(74,222,128,0.08)',
          borderColor: highlight ?? '#4ade80',
          opacity: dim ? 0.25 : 1,
          scale: dim ? 0.92 : 1,
        }}
        transition={{ duration: 0.35 }}
        style={{
          width: size,
          height: size,
          border: `2px solid #4ade80`,
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: compact ? 13 : 16,
          fontWeight: 700,
          color: '#e2e8f0',
        }}
      >
        {value}
      </motion.div>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: compact ? 9 : 10,
        color: '#71717a',
      }}>
        [{index}]
      </span>
    </div>
  )
}

export default function ArraysViz({ step, compact = false }: Props) {
  const monoFont = 'var(--font-mono)'
  const fontSize = compact ? 11 : 13

  const stepColor = [
    '#4ade80',
    '#f5c542',
    '#5b9cf5',
    '#f87171',
    '#a78bfa',
  ][step] ?? '#4ade80'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>

      <AnimatePresence mode="wait">
        {/* Step 0: basic array */}
        {step === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
          >
            <div style={{
              fontFamily: monoFont,
              fontSize: fontSize - 1,
              color: '#4ade80',
              marginBottom: 4,
            }}>
              const arr = [1, 2, 3]
            </div>
            <div style={{ display: 'flex', gap: compact ? 8 : 12 }}>
              {baseItems.map((v, i) => (
                <ArrayBox key={i} value={v} index={i} compact={compact} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 1: push/pop */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
          >
            <div style={{ fontFamily: monoFont, fontSize: fontSize - 1, color: '#f5c542' }}>
              arr.push(4) → arr.pop()
            </div>
            <div style={{ display: 'flex', gap: compact ? 8 : 12, alignItems: 'flex-end' }}>
              {baseItems.map((v, i) => (
                <ArrayBox key={i} value={v} index={i} compact={compact} />
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
              >
                <motion.div
                  animate={{ opacity: [1, 1, 0], scale: [1, 1, 0.5] }}
                  transition={{ times: [0, 0.7, 1], duration: 2.5, delay: 0.6, repeat: Infinity, repeatDelay: 1 }}
                  style={{
                    width: compact ? 44 : 56,
                    height: compact ? 44 : 56,
                    border: '2px solid #f5c542',
                    borderRadius: 6,
                    background: 'rgba(245,197,66,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: monoFont,
                    fontSize: compact ? 13 : 16,
                    fontWeight: 700,
                    color: '#f5c542',
                  }}
                >
                  4
                </motion.div>
                <span style={{ fontFamily: monoFont, fontSize: compact ? 9 : 10, color: '#f5c542' }}>[3]</span>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Step 2: map */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
          >
            <div style={{ fontFamily: monoFont, fontSize: fontSize - 1, color: '#5b9cf5' }}>
              nums.map(x =&gt; x * 2)
            </div>
            <div style={{ display: 'flex', gap: compact ? 8 : 12 }}>
              {baseItems.map((v, i) => (
                <ArrayBox
                  key={i}
                  value={v * 2}
                  index={i}
                  compact={compact}
                  highlight="rgba(91,156,245,0.2)"
                />
              ))}
            </div>
            <span style={{ fontFamily: monoFont, fontSize: fontSize - 2, color: '#5b9cf5', opacity: 0.7 }}>
              [2, 4, 6] — new array returned
            </span>
          </motion.div>
        )}

        {/* Step 3: filter */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
          >
            <div style={{ fontFamily: monoFont, fontSize: fontSize - 1, color: '#f87171' }}>
              arr.filter(x =&gt; x &gt; 1)
            </div>
            <div style={{ display: 'flex', gap: compact ? 8 : 12 }}>
              {baseItems.map((v, i) => (
                <ArrayBox
                  key={i}
                  value={v}
                  index={i}
                  compact={compact}
                  dim={v <= 1}
                  highlight={v > 1 ? 'rgba(248,113,113,0.15)' : undefined}
                />
              ))}
            </div>
            <span style={{ fontFamily: monoFont, fontSize: fontSize - 2, color: '#f87171', opacity: 0.7 }}>
              [2, 3] — 1 filtered out
            </span>
          </motion.div>
        )}

        {/* Step 4: objects */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
          >
            <div style={{ fontFamily: monoFont, fontSize: fontSize - 1, color: '#a78bfa' }}>
              {`{ name: "Alice", age: 25 }`}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {objectEntries.map((entry, i) => (
                <motion.div
                  key={entry.key}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.12 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    background: `${entry.color}11`,
                    border: `1px solid ${entry.color}44`,
                    borderRadius: 6,
                    padding: compact ? '6px 12px' : '8px 16px',
                    minWidth: compact ? 180 : 220,
                  }}
                >
                  <span style={{ fontFamily: monoFont, fontSize, color: entry.color, fontWeight: 700 }}>
                    {entry.key}
                  </span>
                  <span style={{ color: '#71717a', fontFamily: monoFont, fontSize }}>:</span>
                  <span style={{ fontFamily: monoFont, fontSize, color: '#e2e8f0' }}>
                    {entry.value}
                  </span>
                </motion.div>
              ))}
            </div>
            <span style={{ fontFamily: monoFont, fontSize: fontSize - 2, color: '#a78bfa', opacity: 0.7 }}>
              accessed by key name, not index
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          style={{
            color: stepColor,
            fontFamily: monoFont,
            fontSize: 12,
            textAlign: 'center',
          }}
        >
          {stepLabels[Math.min(step, stepLabels.length - 1)]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
