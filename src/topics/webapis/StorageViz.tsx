import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const COLOR = '#5b9cf5'
const SET_COLOR = '#4ade80'
const GET_COLOR = '#f5c542'
const PERSIST_COLOR = '#5b9cf5'
const SESSION_COLOR = '#ec4899'

const stepLabels = [
  'Browsers can store data locally — no server needed',
  'setItem — store a key-value pair',
  'getItem — retrieve stored value',
  'localStorage persists across sessions',
  'sessionStorage clears when tab closes',
]

interface KVRow {
  key: string
  value: string
  highlight?: boolean
  color?: string
}

function StorageTable({
  title,
  rows,
  color,
  compact,
  dimmed,
}: {
  title: string
  rows: KVRow[]
  color: string
  compact: boolean
  dimmed?: boolean
}) {
  return (
    <div style={{ opacity: dimmed ? 0.45 : 1, transition: 'opacity 0.3s' }}>
      <div style={{
        border: `2px solid ${color}`,
        background: `${color}12`,
        borderRadius: 8,
        overflow: 'hidden',
        minWidth: compact ? 130 : 170,
      }}>
        {/* Table header */}
        <div style={{
          background: `${color}28`,
          padding: compact ? '4px 8px' : '5px 10px',
          fontFamily: 'var(--font-mono)',
          fontSize: compact ? 9 : 10,
          fontWeight: 700,
          color,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          {title}
        </div>
        {/* Column labels */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          padding: compact ? '3px 8px' : '4px 10px',
          borderBottom: `1px solid ${color}33`,
          fontFamily: 'var(--font-mono)',
          fontSize: compact ? 8 : 9,
          color,
          opacity: 0.6,
        }}>
          <span>key</span>
          <span>value</span>
        </div>
        {/* Rows */}
        {rows.length === 0 && (
          <div style={{
            padding: compact ? '4px 8px' : '6px 10px',
            fontFamily: 'var(--font-mono)',
            fontSize: compact ? 8 : 9,
            color,
            opacity: 0.35,
            fontStyle: 'italic',
          }}>
            (empty)
          </div>
        )}
        <AnimatePresence initial={false}>
          {rows.map(row => (
            <motion.div
              key={row.key}
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: 'auto',
                background: row.highlight ? `${row.color ?? GET_COLOR}28` : 'transparent',
              }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                padding: compact ? '3px 8px' : '5px 10px',
                borderBottom: `1px solid ${color}18`,
                fontFamily: 'var(--font-mono)',
                fontSize: compact ? 9 : 10,
                fontWeight: row.highlight ? 700 : 400,
                color: row.highlight ? (row.color ?? GET_COLOR) : `${color}cc`,
                overflow: 'hidden',
              }}
            >
              <span>{row.key}</span>
              <span>{row.value}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

function PersistBadge({ icon, label, color, compact }: { icon: string; label: string; color: string; compact: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: compact ? 3 : 5,
      }}
    >
      <div style={{ fontSize: compact ? 20 : 28, lineHeight: 1 }}>{icon}</div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: compact ? 8 : 9,
        fontWeight: 700,
        color,
        textAlign: 'center',
      }}>
        {label}
      </div>
    </motion.div>
  )
}

export default function StorageViz({ step, compact = false }: Props) {
  const labelColor =
    step === 0 ? COLOR
    : step === 1 ? SET_COLOR
    : step === 2 ? GET_COLOR
    : step === 3 ? PERSIST_COLOR
    : SESSION_COLOR

  // Build local storage rows
  const localRows: KVRow[] = []
  if (step >= 1) {
    localRows.push({
      key: 'name',
      value: '"Alice"',
      highlight: step === 2,
      color: GET_COLOR,
    })
  }
  if (step >= 1 && step <= 3) {
    localRows.push({ key: 'theme', value: '"dark"' })
  }

  // Session storage rows — only shown step 4
  const sessionRows: KVRow[] = step === 4 ? [] : []

  const showSideBySide = step >= 4

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 18 }}>
      {/* Label badge */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
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
            textAlign: 'center',
          }}
        >
          {stepLabels[Math.min(step, stepLabels.length - 1)]}
        </motion.div>
      </AnimatePresence>

      {/* Tables */}
      <div style={{ display: 'flex', gap: compact ? 10 : 16, alignItems: 'flex-start' }}>
        {/* localStorage */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 6 : 8 }}>
          <StorageTable
            title="localStorage"
            rows={localRows}
            color={showSideBySide ? PERSIST_COLOR : labelColor}
            compact={compact}
          />

          {/* Persist badge — step 3 */}
          <AnimatePresence>
            {step === 3 && (
              <PersistBadge
                key="persist"
                icon="✓"
                label="survives tab close"
                color={PERSIST_COLOR}
                compact={compact}
              />
            )}
          </AnimatePresence>

          {/* Step 4 persist indicator */}
          <AnimatePresence>
            {step >= 4 && (
              <PersistBadge
                key="persist-4"
                icon="✓"
                label="persists"
                color={PERSIST_COLOR}
                compact={compact}
              />
            )}
          </AnimatePresence>
        </div>

        {/* sessionStorage — only step 4 */}
        <AnimatePresence>
          {showSideBySide && (
            <motion.div
              key="session-col"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 6 : 8 }}
            >
              <StorageTable
                title="sessionStorage"
                rows={sessionRows}
                color={SESSION_COLOR}
                compact={compact}
              />
              <PersistBadge
                icon="✕"
                label="cleared on close"
                color={SESSION_COLOR}
                compact={compact}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Step 2: getItem return value */}
      <AnimatePresence>
        {step === 2 && (
          <motion.div
            key="getitem-result"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            style={{
              border: `1px solid ${GET_COLOR}55`,
              background: `${GET_COLOR}12`,
              borderRadius: 6,
              padding: compact ? '4px 10px' : '5px 14px',
              fontFamily: 'var(--font-mono)',
              fontSize: compact ? 9 : 10,
              color: GET_COLOR,
            }}
          >
            getItem("name") → <strong>"Alice"</strong>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
