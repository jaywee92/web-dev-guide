import { motion, AnimatePresence } from 'framer-motion'
import { Monitor, Server } from 'lucide-react'

interface Props { step: number; compact?: boolean }

const BLUE = '#5b9cf5'
const GREEN = '#4ade80'
const YELLOW = '#f5c542'

const stepLabels = [
  'fetch() sends an HTTP request from the browser',
  'The request travels over the network to the server',
  'The server processes the request',
  'The server sends back a response with data',
  'The browser receives JSON data — promise resolves',
]

const JSON_LINES = [
  '{ "users": [',
  '  { "id": 1, "name": "Ana" },',
  '  { "id": 2, "name": "Ben" }',
  ']}',
]

export default function FetchViz({ step, compact = false }: Props) {
  const iconSize = compact ? 20 : 28
  const boxSize = compact ? 44 : 56
  const pathWidth = compact ? 100 : 140
  const labelColor = step <= 1 ? BLUE : step === 2 ? YELLOW : step === 3 ? '#fb923c' : GREEN

  const packetGoingRight = step === 1
  const packetAtServer = step === 2
  const packetGoingLeft = step === 3
  const showJson = step >= 4

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 14 }}>
      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          style={{
            background: `${labelColor}22`, border: `1px solid ${labelColor}55`,
            borderRadius: 6, padding: compact ? '4px 10px' : '5px 14px',
            fontSize: compact ? 10 : 11, fontFamily: 'var(--font-mono)',
            fontWeight: 700, color: labelColor, letterSpacing: '0.3px', textAlign: 'center',
          }}
        >
          {stepLabels[Math.min(step, 4)]}
        </motion.div>
      </AnimatePresence>

      {/* fetch() badge */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.div
            key="fetch-badge"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              fontSize: compact ? 9 : 11,
              fontFamily: 'var(--font-mono)',
              color: YELLOW,
              background: `${YELLOW}14`,
              border: `1px solid ${YELLOW}44`,
              borderRadius: 4,
              padding: compact ? '2px 7px' : '3px 10px',
            }}
          >
            {"fetch('/api/users')"}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main diagram: Browser — path — Server */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, position: 'relative' }}>
        {/* Browser node */}
        <motion.div
          animate={{ boxShadow: step === 0 || step >= 4 ? `0 0 16px ${BLUE}66` : '0 0 0px transparent' }}
          transition={{ duration: 0.4 }}
          style={{
            width: boxSize, height: boxSize,
            background: `${BLUE}18`,
            border: `2px solid ${step === 0 || step >= 4 ? BLUE : `${BLUE}66`}`,
            borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            transition: 'border-color 0.3s',
          }}
        >
          <Monitor size={iconSize} color={BLUE} />
        </motion.div>

        {/* Path with animated packet */}
        <div style={{ width: pathWidth, position: 'relative', height: compact ? 24 : 32, display: 'flex', alignItems: 'center' }}>
          {/* Dashed line */}
          <div style={{
            position: 'absolute',
            left: 0, right: 0,
            height: 2,
            backgroundImage: `repeating-linear-gradient(90deg, ${BLUE}44 0px, ${BLUE}44 6px, transparent 6px, transparent 12px)`,
          }} />

          {/* Animated packet */}
          <AnimatePresence mode="wait">
            {packetGoingRight && (
              <motion.div
                key="packet-right"
                initial={{ x: 0, opacity: 0 }}
                animate={{ x: pathWidth - 12, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', left: 0,
                  width: 12, height: 10,
                  background: BLUE, borderRadius: 2,
                }}
              />
            )}
            {packetAtServer && (
              <motion.div
                key="packet-server"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ repeat: Infinity, duration: 0.7 }}
                style={{
                  position: 'absolute', left: pathWidth - 12,
                  width: 12, height: 10,
                  background: YELLOW, borderRadius: 2,
                }}
              />
            )}
            {packetGoingLeft && (
              <motion.div
                key="packet-left"
                initial={{ x: pathWidth - 12, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', left: 0,
                  width: 12, height: 10,
                  background: GREEN, borderRadius: 2,
                }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Server node */}
        <motion.div
          animate={{
            boxShadow: step === 2 ? `0 0 16px ${YELLOW}66`
              : step === 3 ? `0 0 16px ${GREEN}44`
              : '0 0 0px transparent'
          }}
          transition={{ duration: 0.4 }}
          style={{
            width: boxSize, height: boxSize,
            background: step === 2 ? `${YELLOW}18` : step >= 3 ? `${GREEN}18` : `${BLUE}18`,
            border: `2px solid ${step === 2 ? YELLOW : step >= 3 ? GREEN : `${GREEN}66`}`,
            borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            transition: 'border-color 0.3s, background 0.3s',
            position: 'relative',
          }}
        >
          <Server size={iconSize} color={step === 2 ? YELLOW : step >= 3 ? GREEN : `${GREEN}88`} />
          {/* Thinking spinner */}
          <AnimatePresence>
            {step === 2 && (
              <motion.div
                key="spinner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                exit={{ opacity: 0 }}
                transition={{ rotate: { repeat: Infinity, duration: 0.8, ease: 'linear' }, opacity: { duration: 0.2 } }}
                style={{
                  position: 'absolute', top: -8, right: -8,
                  fontSize: 12, color: YELLOW,
                }}
              >
                ⟳
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Node labels */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        width: boxSize * 2 + pathWidth,
      }}>
        <span style={{ fontSize: compact ? 8 : 9, fontFamily: 'var(--font-mono)', color: BLUE, width: boxSize, textAlign: 'center' }}>browser</span>
        <span style={{ fontSize: compact ? 8 : 9, fontFamily: 'var(--font-mono)', color: GREEN, width: boxSize, textAlign: 'center' }}>server</span>
      </div>

      {/* JSON response unrolls at step 4 */}
      <AnimatePresence>
        {showJson && (
          <motion.div
            key="json-block"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0 }}
            style={{
              background: 'rgba(0,0,0,0.3)',
              border: `1px solid ${GREEN}44`,
              borderRadius: 6,
              padding: compact ? '5px 10px' : '8px 14px',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {JSON_LINES.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.25 }}
                  style={{
                    fontSize: compact ? 8 : 10,
                    fontFamily: 'var(--font-mono)',
                    color: i === 0 || i === JSON_LINES.length - 1 ? GREEN : '#e2e8f0',
                    whiteSpace: 'pre',
                  }}
                >
                  {line}
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: JSON_LINES.length * 0.08 + 0.15 }}
              style={{
                marginTop: compact ? 4 : 6,
                display: 'inline-block',
                background: `${GREEN}22`,
                border: `1px solid ${GREEN}`,
                borderRadius: 4,
                padding: compact ? '2px 6px' : '2px 8px',
                fontSize: compact ? 8 : 10,
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                color: GREEN,
              }}
            >
              200 OK
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
