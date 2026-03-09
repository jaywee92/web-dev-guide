import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const stepLabels = [
  'A form collects user input',
  '<label> + <input> — the basic pair',
  '<select> — choose from options',
  'checkbox vs radio button',
  '<button type="submit"> — sends the form',
]

const formBorderColor = (step: number) => step === 4 ? '#4ade80' : '#5b9cf5'

export default function FormsViz({ step, compact = false }: Props) {
  const fontSize = compact ? 11 : 13
  const innerPad = compact ? 10 : 14

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      {/* Form box */}
      <motion.div
        animate={{
          borderColor: formBorderColor(step),
          boxShadow: step === 4 ? '0 0 24px rgba(74,222,128,0.4)' : '0 0 0px rgba(91,156,245,0)',
        }}
        transition={{ duration: 0.4 }}
        style={{
          border: `2px solid ${formBorderColor(step)}`,
          borderRadius: 8,
          padding: innerPad,
          width: compact ? 220 : 280,
          display: 'flex',
          flexDirection: 'column',
          gap: compact ? 6 : 8,
          fontFamily: 'var(--font-mono)',
          fontSize,
          minHeight: compact ? 60 : 80,
        }}
      >
        {/* Form label */}
        <span style={{ color: '#5b9cf5', fontSize: compact ? 10 : 11, fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          &lt;form&gt;
        </span>

        {/* Step 1: label + input */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
            >
              <span style={{ color: '#a78bfa', fontSize: compact ? 10 : 11 }}>&lt;label for="email"&gt;Email&lt;/label&gt;</span>
              <div style={{
                border: '1.5px solid #a78bfa',
                borderRadius: 4,
                padding: compact ? '3px 8px' : '4px 10px',
                color: '#c4b5fd',
                fontSize: compact ? 10 : 11,
              }}>
                &lt;input type="text" /&gt;
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 2: select */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
            >
              <span style={{ color: '#f5c542', fontSize: compact ? 10 : 11 }}>&lt;label&gt;Role&lt;/label&gt;</span>
              <div style={{
                border: '1.5px solid #f5c542',
                borderRadius: 4,
                padding: compact ? '3px 8px' : '4px 10px',
                color: '#fde68a',
                fontSize: compact ? 10 : 11,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <span>&lt;select&gt; Developer ▾</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3: checkbox + radio */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              style={{ display: 'flex', flexDirection: 'column', gap: compact ? 3 : 4 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#34d399', fontSize: compact ? 10 : 11 }}>
                <span style={{
                  width: compact ? 12 : 14, height: compact ? 12 : 14,
                  border: '1.5px solid #34d399', borderRadius: 2,
                  display: 'inline-block', flexShrink: 0,
                }} />
                checkbox (multi-select)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#34d399', fontSize: compact ? 10 : 11 }}>
                <span style={{
                  width: compact ? 12 : 14, height: compact ? 12 : 14,
                  border: '1.5px solid #34d399', borderRadius: '50%',
                  display: 'inline-block', flexShrink: 0,
                }} />
                radio (single-select)
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 4: submit button */}
        <AnimatePresence>
          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
              style={{
                background: '#4ade80',
                color: '#052e16',
                borderRadius: 4,
                padding: compact ? '4px 8px' : '6px 12px',
                fontWeight: 700,
                fontSize: compact ? 10 : 11,
                textAlign: 'center',
                marginTop: 2,
              }}
            >
              &lt;button type="submit"&gt; Submit &lt;/button&gt;
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          style={{
            color: step === 4 ? '#4ade80' : '#5b9cf5',
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            textAlign: 'center',
            maxWidth: compact ? 220 : 280,
          }}
        >
          {stepLabels[Math.min(step, stepLabels.length - 1)]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
