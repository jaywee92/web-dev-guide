import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const BLUE = '#5b9cf5'
const CYAN = '#22d3ee'
const PURPLE = '#a78bfa'
const ORANGE = '#fb923c'

const stepLabels = [
  'Block flow — elements stack vertically',
  'display: grid — grid context enabled',
  'grid-template-columns: 1fr 3fr — sidebar + main',
  'gap: 12px — breathing room between cells',
  'grid-column: 1 / -1 — header spans full width',
]

const cssRules = [
  '.container { }',
  '.container {\n  display: grid;\n}',
  '.container {\n  display: grid;\n  grid-template-columns: 1fr 3fr;\n}',
  '.container {\n  display: grid;\n  grid-template-columns: 1fr 3fr;\n  gap: 12px;\n}',
  '.header {\n  grid-column: 1 / -1;\n}',
]

export default function GridViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const hasCols = s >= 2
  const hasGap = s >= 3
  const hasSpan = s >= 4

  const containerWidth = compact ? 200 : 280
  const gap = hasGap ? (compact ? 6 : 10) : 0
  const headerH = compact ? 24 : 32
  const midH = compact ? 50 : 68
  const footerH = compact ? 20 : 26

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 14 }}>
      {/* CSS rule badge */}
      <AnimatePresence mode="wait">
        <motion.div
          key={s}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.3 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: compact ? 9 : 11,
            color: CYAN,
            background: 'rgba(34,211,238,0.08)',
            border: '1px solid rgba(34,211,238,0.25)',
            borderRadius: 6,
            padding: compact ? '3px 8px' : '5px 12px',
            whiteSpace: 'pre',
            lineHeight: 1.5,
          }}
        >
          {cssRules[s]}
        </motion.div>
      </AnimatePresence>

      {/* Grid container */}
      <motion.div
        animate={{ gap, padding: compact ? 8 : 12 }}
        transition={{ duration: 0.4 }}
        style={{
          width: containerWidth,
          background: 'var(--surface)',
          border: '2px solid var(--border)',
          borderRadius: 8,
          display: 'grid',
          gridTemplateColumns: hasCols ? '1fr 3fr' : '1fr',
        }}
      >
        {/* Header — always spans full width */}
        <motion.div
          layout
          animate={{
            gridColumn: '1 / -1',
            height: headerH,
            background: hasSpan ? `${BLUE}22` : `${BLUE}14`,
            borderColor: hasSpan ? `${BLUE}99` : `${BLUE}55`,
            boxShadow: hasSpan ? `0 0 14px ${BLUE}44` : 'none',
          }}
          transition={{ duration: 0.4, layout: { duration: 0.4 } }}
          style={{
            border: '1.5px solid',
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: compact ? 6 : 8,
            gap: 6,
            overflow: 'hidden',
          }}
        >
          <span style={{ fontSize: compact ? 8 : 9, fontFamily: 'var(--font-mono)', color: BLUE, fontWeight: 700 }}>
            &lt;header&gt;
          </span>
          <div style={{ width: compact ? 28 : 40, height: compact ? 3 : 4, borderRadius: 2, background: BLUE, opacity: 0.4 }} />
        </motion.div>

        {/* Sidebar — only visible when hasCols */}
        <AnimatePresence>
          {hasCols && (
            <motion.div
              key="sidebar"
              layout
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1, height: midH, background: `${PURPLE}14`, borderColor: `${PURPLE}55` }}
              exit={{ opacity: 0, scaleX: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                border: '1.5px solid',
                borderRadius: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                padding: compact ? '6px 5px' : '8px 7px',
                overflow: 'hidden',
                transformOrigin: 'left',
              }}
            >
              <span style={{ fontSize: compact ? 7 : 9, fontFamily: 'var(--font-mono)', color: PURPLE, fontWeight: 700 }}>
                &lt;nav&gt;
              </span>
              {[55, 70, 45].map(w => (
                <div key={w} style={{ width: `${w}%`, height: compact ? 3 : 4, borderRadius: 2, background: PURPLE, opacity: 0.4 }} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content */}
        <motion.div
          layout
          animate={{
            height: midH,
            background: `${CYAN}14`,
            borderColor: `${CYAN}55`,
          }}
          transition={{ duration: 0.4, layout: { duration: 0.4 } }}
          style={{
            border: '1.5px solid',
            borderRadius: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            padding: compact ? '6px 5px' : '8px 7px',
            overflow: 'hidden',
          }}
        >
          <span style={{ fontSize: compact ? 7 : 9, fontFamily: 'var(--font-mono)', color: CYAN, fontWeight: 700 }}>
            &lt;article&gt;
          </span>
          {[80, 60, 90, 70].map(w => (
            <div key={w} style={{ width: `${w}%`, height: compact ? 3 : 4, borderRadius: 2, background: CYAN, opacity: 0.3 }} />
          ))}
        </motion.div>

        {/* Footer — always spans full width */}
        <motion.div
          layout
          animate={{
            gridColumn: '1 / -1',
            height: footerH,
            background: `${ORANGE}12`,
            borderColor: `${ORANGE}55`,
          }}
          transition={{ duration: 0.4, layout: { duration: 0.4 } }}
          style={{
            border: '1.5px solid',
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <span style={{ fontSize: compact ? 8 : 9, fontFamily: 'var(--font-mono)', color: ORANGE, fontWeight: 700 }}>
            &lt;footer&gt;
          </span>
        </motion.div>
      </motion.div>

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={s}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: compact ? 11 : 12,
            textAlign: 'center',
            maxWidth: containerWidth,
            color: s === 0 ? '#71717a' : CYAN,
            margin: 0,
          }}
        >
          {stepLabels[s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
