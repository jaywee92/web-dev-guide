import { motion } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const items = ['Home', 'About', 'Blog', 'Contact']
const cards = ['Card A', 'Card B', 'Card C']

export default function FlexboxUseCasesViz({ step, compact = false }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, width: '100%' }}>

      {/* Use case labels */}
      <div style={{ display: 'flex', gap: 8 }}>
        {[
          { label: 'Navbar', s: 0 },
          { label: 'Card Row', s: 1 },
          { label: 'Center', s: 2 },
        ].map(({ label, s }) => (
          <motion.span
            key={label}
            animate={{ opacity: step === s ? 1 : 0.35, scale: step === s ? 1 : 0.95 }}
            style={{
              fontSize: 11, fontFamily: 'var(--font-mono)', padding: '3px 8px',
              borderRadius: 4, background: step === s ? 'var(--blue)' : 'var(--surface-bright)',
              color: step === s ? '#fff' : 'var(--text-muted)',
              border: '1px solid var(--border)',
            }}
          >
            {label}
          </motion.span>
        ))}
      </div>

      {/* Use case 0: Navbar */}
      {step === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            width: compact ? 240 : 360, borderRadius: 8,
            border: '1px solid var(--border)', overflow: 'hidden',
          }}
        >
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            padding: compact ? '8px 12px' : '12px 16px',
            background: 'var(--surface-bright)',
            gap: 8,
          }}>
            <span style={{ fontWeight: 700, color: '#5b9cf5', fontSize: compact ? 12 : 14 }}>Logo</span>
            <div style={{ display: 'flex', gap: compact ? 8 : 12 }}>
              {items.map(item => (
                <span key={item} style={{ fontSize: compact ? 10 : 12, color: 'var(--text-muted)' }}>{item}</span>
              ))}
            </div>
          </div>
          <div style={{ padding: 6, textAlign: 'center' }}>
            <code style={{ fontSize: 10, color: 'var(--text-faint)' }}>justify-content: space-between</code>
          </div>
        </motion.div>
      )}

      {/* Use case 1: Card row */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div style={{ display: 'flex', gap: compact ? 8 : 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            {cards.map((card, i) => (
              <motion.div
                key={card}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  width: compact ? 72 : 100, height: compact ? 52 : 72,
                  border: '1px solid #5b9cf555', borderRadius: 8,
                  background: 'var(--surface-bright)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: compact ? 10 : 12, color: '#5b9cf5',
                }}
              >
                {card}
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 8 }}>
            <code style={{ fontSize: 10, color: 'var(--text-faint)' }}>flex-wrap: wrap · gap: 12px</code>
          </div>
        </motion.div>
      )}

      {/* Use case 2: Centered modal */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            width: compact ? 200 : 300, height: compact ? 100 : 140,
            border: '1px dashed var(--border)', borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--surface)',
            position: 'relative',
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
              padding: compact ? '8px 14px' : '12px 20px',
              background: 'var(--surface-bright)',
              border: '1px solid #4ade8055',
              borderRadius: 8, textAlign: 'center',
            }}
          >
            <div style={{ fontSize: compact ? 11 : 13, fontWeight: 600, color: 'var(--text)' }}>Modal</div>
            <div style={{ fontSize: 9, color: 'var(--text-faint)', marginTop: 3 }}>perfectly centered</div>
          </motion.div>
          <div style={{ position: 'absolute', bottom: 6, fontSize: 9, color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>
            align-items: center · justify-content: center
          </div>
        </motion.div>
      )}
    </div>
  )
}
