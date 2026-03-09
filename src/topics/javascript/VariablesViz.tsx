import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const primitiveTypes = [
  { label: 'string', color: '#4ade80' },
  { label: 'number', color: '#5b9cf5' },
  { label: 'boolean', color: '#f5c542' },
  { label: 'null', color: '#f87171' },
  { label: 'undefined', color: '#a1a1aa' },
  { label: 'symbol', color: '#a78bfa' },
]

const typeofRows = [
  { expr: 'typeof "hi"', result: '"string"', color: '#4ade80', quirk: false },
  { expr: 'typeof 42', result: '"number"', color: '#5b9cf5', quirk: false },
  { expr: 'typeof null', result: '"object"', color: '#f87171', quirk: true },
]

const stepLabels = [
  'var — function-scoped, avoid it',
  'let — block-scoped, reassignable',
  'const — cannot be reassigned',
  'JavaScript has 6 primitive types',
  'typeof operator',
]

export default function VariablesViz({ step, compact = false }: Props) {
  const monoFont = 'var(--font-mono)'
  const fontSize = compact ? 11 : 13
  const labelColor = [
    '#f5c542',
    '#4ade80',
    '#f87171',
    '#e2e8f0',
    '#5b9cf5',
  ][step] ?? '#a1a1aa'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>

      {/* Step 0: var */}
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
          >
            <motion.div
              animate={{ boxShadow: '0 0 20px rgba(245,197,66,0.4)' }}
              style={{
                background: 'rgba(245,197,66,0.1)',
                border: '2px solid #f5c542',
                borderRadius: 8,
                padding: compact ? '10px 20px' : '14px 28px',
                fontFamily: monoFont,
                fontSize,
                color: '#f5c542',
              }}
            >
              var x = 1
            </motion.div>
            <div style={{ fontSize: compact ? 22 : 28 }}>⚠️</div>
            <span style={{ fontFamily: monoFont, fontSize: fontSize - 2, color: '#f5c542', opacity: 0.8 }}>
              function-scoped &amp; hoisted — causes surprises
            </span>
          </motion.div>
        )}

        {/* Step 1: let */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
          >
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <motion.div
                style={{
                  background: 'rgba(74,222,128,0.1)',
                  border: '2px solid #4ade80',
                  borderRadius: 8,
                  padding: compact ? '10px 16px' : '14px 24px',
                  fontFamily: monoFont,
                  fontSize,
                  color: '#4ade80',
                }}
              >
                let count = 0
              </motion.div>
              <span style={{ color: '#71717a', fontFamily: monoFont, fontSize }}>→</span>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
                style={{
                  background: 'rgba(74,222,128,0.2)',
                  border: '2px solid #4ade80',
                  borderRadius: 8,
                  padding: compact ? '10px 16px' : '14px 24px',
                  fontFamily: monoFont,
                  fontSize,
                  color: '#4ade80',
                  fontWeight: 700,
                }}
              >
                count = 1
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Step 2: const */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
          >
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{
                background: 'rgba(91,156,245,0.1)',
                border: '2px solid #5b9cf5',
                borderRadius: 8,
                padding: compact ? '10px 16px' : '14px 24px',
                fontFamily: monoFont,
                fontSize,
                color: '#5b9cf5',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <span style={{ fontSize: compact ? 16 : 20 }}>🔒</span>
                const PI = 3.14
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                background: 'rgba(248,113,113,0.1)',
                border: '2px solid #f87171',
                borderRadius: 8,
                padding: compact ? '8px 16px' : '12px 24px',
                fontFamily: monoFont,
                fontSize: fontSize - 1,
                color: '#f87171',
              }}
            >
              PI = 3 &nbsp;// ❌ TypeError!
            </motion.div>
          </motion.div>
        )}

        {/* Step 3: primitive types */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', maxWidth: 320 }}
          >
            {primitiveTypes.map((t, i) => (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08, duration: 0.35, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
                style={{
                  padding: compact ? '4px 10px' : '6px 14px',
                  borderRadius: 20,
                  background: `${t.color}22`,
                  border: `1px solid ${t.color}`,
                  fontFamily: monoFont,
                  fontSize: compact ? 10 : 12,
                  color: t.color,
                  fontWeight: 600,
                }}
              >
                {t.label}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 4: typeof */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'stretch', minWidth: compact ? 200 : 260 }}
          >
            {typeofRows.map((row, i) => (
              <motion.div
                key={row.expr}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.12 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 8,
                  background: `${row.color}11`,
                  border: `1px solid ${row.color}44`,
                  borderRadius: 6,
                  padding: compact ? '6px 12px' : '8px 16px',
                }}
              >
                <span style={{ fontFamily: monoFont, fontSize: fontSize - 1, color: '#e2e8f0' }}>
                  {row.expr}
                </span>
                <span style={{ color: '#71717a', fontSize: 12 }}>→</span>
                <span style={{ fontFamily: monoFont, fontSize: fontSize - 1, color: row.color, fontWeight: 700 }}>
                  {row.result}
                  {row.quirk && <span style={{ fontSize: 14, marginLeft: 4 }}>⚠️</span>}
                </span>
              </motion.div>
            ))}
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
            color: labelColor,
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
