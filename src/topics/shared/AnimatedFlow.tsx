import { motion, AnimatePresence } from 'framer-motion'
import { Monitor, Server, Database } from 'lucide-react'

interface Props { step: number; compact?: boolean }

const nodes = [
  { icon: Monitor, label: 'Browser', color: '#5b9cf5' },
  { icon: Server, label: 'Server', color: '#4ade80' },
  { icon: Database, label: 'Database', color: '#a78bfa' },
]

const stepLabels = [
  'Client sends HTTP request →',
  'DNS resolves domain to IP →',
  'Server processes request →',
  'Database query executed →',
  '← Response sent back',
]

export default function AnimatedFlow({ step, compact = false }: Props) {
  const nodeSize = compact ? 48 : 72
  const isReturn = step === 4

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 16 : 32 }}>
        {nodes.map((node, i) => {
          const Icon = node.icon
          const active = (i === 0 && step >= 0) || (i === 1 && step >= 2) || (i === 2 && step >= 3)

          return (
            <div key={node.label} style={{ display: 'flex', alignItems: 'center' }}>
              <motion.div
                animate={{
                  boxShadow: active ? `0 0 24px ${node.color}66` : 'none',
                  borderColor: active ? node.color : 'var(--border)',
                }}
                style={{
                  width: nodeSize, height: nodeSize, borderRadius: 16,
                  background: 'var(--surface-bright)',
                  border: '2px solid var(--border)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: 4,
                }}
                transition={{ duration: 0.4 }}
              >
                <Icon size={compact ? 20 : 28} color={active ? node.color : 'var(--text-muted)'} />
                {!compact && (
                  <span style={{ fontSize: 10, color: active ? node.color : 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {node.label}
                  </span>
                )}
              </motion.div>

              {/* Arrow + packet between nodes */}
              {i < nodes.length - 1 && (
                <div style={{ position: 'relative', width: compact ? 40 : 64, height: 2, margin: '0 4px' }}>
                  <div style={{ height: 2, background: 'var(--border)', width: '100%' }} />
                  {/* Forward packet */}
                  {step >= i * 2 + 1 && !isReturn && (
                    <motion.div
                      initial={{ x: 0 }}
                      animate={{ x: compact ? 36 : 60 }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                      style={{
                        position: 'absolute', top: -4,
                        width: 10, height: 10, borderRadius: '50%',
                        background: nodes[i].color,
                      }}
                    />
                  )}
                  {/* Return packet */}
                  {isReturn && (
                    <motion.div
                      initial={{ x: compact ? 36 : 60 }}
                      animate={{ x: 0 }}
                      transition={{ duration: 0.6, delay: (2 - i) * 0.2, ease: 'easeInOut' }}
                      style={{
                        position: 'absolute', top: -4,
                        width: 10, height: 10, borderRadius: '50%',
                        background: '#f5c542',
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={step}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          style={{ color: 'var(--text-muted)', fontSize: 13, fontFamily: 'var(--font-mono)' }}
        >
          {stepLabels[Math.min(step, stepLabels.length - 1)]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
