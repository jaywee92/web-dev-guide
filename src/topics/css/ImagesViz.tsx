import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const PINK   = '#ec4899'
const CYAN   = '#22d3ee'
const GREEN  = '#4ade80'
const YELLOW = '#f5c542'
const RED    = '#f87171'

const stepLabels = [
  'No object-fit — image stretches to fill, aspect ratio lost',
  'object-fit: contain — whole image visible, letterboxed',
  'object-fit: cover — fills container, image may crop',
  'fill vs cover — distorted vs cropped',
  'aspect-ratio — container maintains its shape at any width',
]

function Container({ label, color, w, h, children, compact }: {
  label: string; color: string; w: number; h: number;
  children: React.ReactNode; compact: boolean
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div style={{ fontSize: compact ? 7 : 8, fontFamily: 'var(--font-mono)', color, fontWeight: 700 }}>{label}</div>
      <motion.div
        animate={{ borderColor: color + 'cc' }}
        style={{
          width: w, height: h, border: `2px solid`,
          borderRadius: 8, overflow: 'hidden',
          background: 'rgba(0,0,0,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default function ImagesViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const cw = compact ? 120 : 160
  const ch = compact ? 70  : 90
  const iw = compact ? 60  : 80
  const ih = compact ? 90  : 120

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 18 }}>
      <AnimatePresence mode="wait">

        {/* Step 0: stretched */}
        {s === 0 && (
          <motion.div key="stretch" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Container label="no object-fit — stretched ⚠" color={RED} w={cw} h={ch} compact={compact}>
              <motion.div
                animate={{ scaleX: cw / iw, scaleY: ch / ih }}
                transition={{ duration: 0.5 }}
                style={{
                  width: iw, height: ih,
                  background: `linear-gradient(160deg, ${PINK}, ${CYAN})`,
                  borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transformOrigin: 'center',
                }}
              >
                <span style={{ fontSize: compact ? 14 : 18 }}>🌄</span>
              </motion.div>
            </Container>
          </motion.div>
        )}

        {/* Step 1: contain */}
        {s === 1 && (
          <motion.div key="contain" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Container label="object-fit: contain" color={YELLOW} w={cw} h={ch} compact={compact}>
              {/* Letterbox bars */}
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: compact ? 18 : 24, background: 'rgba(0,0,0,0.5)' }} />
              <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: compact ? 18 : 24, background: 'rgba(0,0,0,0.5)' }} />
              <div style={{
                width: compact ? 50 : 68, height: compact ? 70 : 90,
                background: `linear-gradient(160deg, ${PINK}, ${CYAN})`,
                borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: compact ? 14 : 18 }}>🌄</span>
              </div>
            </Container>
          </motion.div>
        )}

        {/* Step 2: cover */}
        {s === 2 && (
          <motion.div key="cover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Container label="object-fit: cover" color={GREEN} w={cw} h={ch} compact={compact}>
              <div style={{
                width: cw + 4, height: cw * 1.3,
                background: `linear-gradient(160deg, ${PINK}, ${CYAN})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: compact ? 18 : 24 }}>🌄</span>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `${GREEN}cc` }}
              />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: `${GREEN}cc` }} />
            </Container>
          </motion.div>
        )}

        {/* Step 3: fill vs cover */}
        {s === 3 && (
          <motion.div key="compare" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', gap: compact ? 10 : 16 }}>
            <Container label="fill — distorted" color={RED} w={compact ? 100 : 130} h={ch} compact={compact}>
              <div style={{
                width: compact ? 100 : 130, height: ch,
                background: `linear-gradient(160deg, ${PINK}, ${CYAN})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: compact ? 16 : 22 }}>🌄</span>
              </div>
            </Container>
            <Container label="cover — crisp" color={GREEN} w={compact ? 100 : 130} h={ch} compact={compact}>
              <div style={{
                width: compact ? 100 : 130, height: compact ? 100 : 140,
                background: `linear-gradient(160deg, ${PINK}, ${CYAN})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: compact ? 16 : 22 }}>🌄</span>
              </div>
            </Container>
          </motion.div>
        )}

        {/* Step 4: aspect-ratio */}
        {s === 4 && (
          <motion.div key="ratio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10, alignItems: 'center' }}>
            {[compact ? 200 : 260, compact ? 140 : 180, compact ? 100 : 130].map((width, i) => (
              <motion.div
                key={width}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  width, aspectRatio: '16/9',
                  background: `linear-gradient(135deg, ${CYAN}44, ${PINK}44)`,
                  border: `1.5px solid ${CYAN}55`, borderRadius: 6,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: compact ? 7 : 8, fontFamily: 'var(--font-mono)', color: CYAN }}>16:9</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={s}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          style={{
            color: [RED, YELLOW, GREEN, GREEN, CYAN][s],
            fontFamily: 'var(--font-mono)', fontSize: compact ? 10 : 11,
            textAlign: 'center', margin: 0, maxWidth: 340,
          }}
        >
          {stepLabels[s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
