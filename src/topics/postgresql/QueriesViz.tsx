import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const stepLabels = [
  'A table stores rows of structured data',
  'SELECT retrieves rows',
  'WHERE filters rows',
  'ORDER BY sorts results',
  'LIMIT controls how many rows',
]

const PURPLE = '#a78bfa'
const BLUE = '#5b9cf5'
const GREEN = '#4ade80'

interface Row {
  id: number
  name: string
  email: string
  age: number
}

const ALL_ROWS: Row[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', age: 28 },
  { id: 2, name: 'Bob', email: 'bob@example.com', age: 22 },
  { id: 3, name: 'Carol', email: 'carol@example.com', age: 31 },
  { id: 4, name: 'Dan', email: 'dan@example.com', age: 19 },
  { id: 5, name: 'Eve', email: 'eve@example.com', age: 35 },
]

function getVisibleRows(step: number): Row[] {
  if (step === 2) return ALL_ROWS.filter(r => r.age > 25) // WHERE age > 25
  if (step === 3) return [...ALL_ROWS].sort((a, b) => a.name.localeCompare(b.name)) // ORDER BY name ASC
  if (step === 4) return ALL_ROWS.slice(0, 3) // LIMIT 3
  return ALL_ROWS
}

function getHighlightedIds(step: number): Set<number> {
  if (step === 1) return new Set(ALL_ROWS.map(r => r.id)) // all rows
  if (step === 2) return new Set(ALL_ROWS.filter(r => r.age > 25).map(r => r.id))
  if (step === 3) return new Set(ALL_ROWS.map(r => r.id))
  if (step === 4) return new Set([1, 2, 3])
  return new Set()
}


function CodeBadge({ code, compact }: { code: string; compact: boolean }) {
  return (
    <div style={{
      background: `${PURPLE}15`,
      border: `1px solid ${PURPLE}44`,
      borderRadius: 6,
      padding: compact ? '4px 10px' : '6px 14px',
      fontFamily: 'var(--font-mono)',
      fontSize: compact ? 9 : 11,
      color: PURPLE,
      fontWeight: 600,
      whiteSpace: 'pre',
      lineHeight: 1.5,
    }}>
      {code}
    </div>
  )
}

const colLabels: Record<keyof Row, string> = { id: 'id', name: 'name', email: 'email', age: 'age' }

function Table({
  rows,
  highlightIds,
  showCols,
  dimRest,
  compact,
}: {
  rows: Row[]
  highlightIds: Set<number>
  showCols: (keyof Row)[]
  dimRest: boolean
  compact: boolean
}) {
  const cellPad = compact ? '3px 7px' : '4px 10px'
  const fontSize = compact ? 9 : 11

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{
        borderCollapse: 'collapse',
        fontFamily: 'var(--font-mono)',
        fontSize,
        tableLayout: 'fixed',
        width: '100%',
      }}>
        <thead>
          <tr>
            {showCols.map(col => (
              <th key={col} style={{
                padding: cellPad,
                background: `${BLUE}22`,
                color: BLUE,
                border: `1px solid ${BLUE}33`,
                fontWeight: 700,
                textAlign: 'left',
              }}>
                {colLabels[col]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {rows.map(row => {
              const highlighted = highlightIds.has(row.id)
              return (
                <motion.tr
                  key={row.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: dimRest && !highlighted ? 0.25 : 1,
                    x: 0,
                  }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                >
                  {showCols.map(col => (
                    <td key={col} style={{
                      padding: cellPad,
                      background: highlighted ? `${GREEN}18` : 'transparent',
                      color: highlighted ? GREEN : 'var(--text-muted)',
                      border: `1px solid ${highlighted ? GREEN + '44' : 'var(--border)'}`,
                      transition: 'background 0.3s, color 0.3s',
                      whiteSpace: 'nowrap',
                    }}>
                      {String(row[col])}
                    </td>
                  ))}
                </motion.tr>
              )
            })}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  )
}

const stepCode: Record<number, string> = {
  0: '-- users table',
  1: 'SELECT * FROM users;',
  2: 'SELECT name FROM users\nWHERE age > 25;',
  3: 'SELECT * FROM users\nORDER BY name ASC;',
  4: 'SELECT * FROM users\nLIMIT 3;',
}

export default function QueriesViz({ step, compact = false }: Props) {
  const rows = getVisibleRows(step)
  const highlightIds = getHighlightedIds(step)
  const dimRest = step === 2

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 14 }}>
      {/* Label badge */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          style={{
            background: `${PURPLE}22`,
            border: `1px solid ${PURPLE}55`,
            borderRadius: 6,
            padding: compact ? '4px 10px' : '5px 14px',
            fontSize: compact ? 10 : 11,
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            color: PURPLE,
            letterSpacing: '0.3px',
            textAlign: 'center',
          }}
        >
          {stepLabels[Math.min(step, stepLabels.length - 1)]}
        </motion.div>
      </AnimatePresence>

      {/* SQL code badge */}
      <CodeBadge code={stepCode[step]} compact={compact} />

      {/* Table */}
      <div style={{ width: '100%', maxWidth: compact ? 280 : 420 }}>
        <Table
          rows={rows}
          highlightIds={highlightIds}
          showCols={step === 2 ? ['name'] : ['id', 'name', 'email', 'age']}
          dimRest={dimRest}
          compact={compact}
        />
      </div>

      {/* Step 4: fade-out indicator for remaining rows */}
      {step === 4 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: compact ? 9 : 10,
            color: 'var(--text-muted)',
          }}
        >
          … 2 more rows hidden (LIMIT 3)
        </motion.div>
      )}
    </div>
  )
}
