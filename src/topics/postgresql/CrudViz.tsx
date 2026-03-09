import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const stepLabels = [
  'CREATE TABLE — define the schema',
  'INSERT — add rows',
  'UPDATE — modify rows',
  'DELETE — remove rows',
  'Constraints enforce data integrity',
]

const PURPLE = '#a78bfa'
const BLUE = '#5b9cf5'
const GREEN = '#4ade80'
const RED = '#f87171'
const ORANGE = '#fb923c'
const YELLOW = '#fbbf24'

interface Row {
  id: number
  name: string
  email: string
  age: number | null
  _state?: 'new' | 'updated' | 'deleted' | 'normal'
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

function ColDef({
  col,
  type,
  constraint,
  constraintColor,
  compact,
}: {
  col: string
  type: string
  constraint?: string
  constraintColor?: string
  compact: boolean
}) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: compact ? 6 : 10,
      fontFamily: 'var(--font-mono)',
      fontSize: compact ? 9 : 11,
    }}>
      <span style={{ color: GREEN, minWidth: compact ? 40 : 50 }}>{col}</span>
      <span style={{ color: BLUE }}>{type}</span>
      {constraint && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            background: `${constraintColor ?? ORANGE}22`,
            border: `1px solid ${constraintColor ?? ORANGE}55`,
            borderRadius: 4,
            padding: compact ? '1px 5px' : '2px 7px',
            fontSize: compact ? 8 : 9,
            color: constraintColor ?? ORANGE,
            fontWeight: 700,
          }}
        >
          {constraint}
        </motion.span>
      )}
    </div>
  )
}

const INITIAL_ROWS: Row[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', age: 28, _state: 'normal' },
  { id: 2, name: 'Bob', email: 'bob@example.com', age: 22, _state: 'normal' },
]

function TableView({ rows, compact }: { rows: Row[]; compact: boolean }) {
  const cellPad = compact ? '3px 7px' : '4px 10px'
  const fontSize = compact ? 9 : 11

  return (
    <table style={{ borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize }}>
      <thead>
        <tr>
          {['id', 'name', 'email', 'age'].map(col => (
            <th key={col} style={{
              padding: cellPad,
              background: `${BLUE}22`,
              color: BLUE,
              border: `1px solid ${BLUE}33`,
              fontWeight: 700,
              textAlign: 'left',
            }}>
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <AnimatePresence>
          {rows.map(row => {
            const isNew = row._state === 'new'
            const isUpdated = row._state === 'updated'
            const isDeleted = row._state === 'deleted'
            const rowColor = isNew ? GREEN : isUpdated ? YELLOW : isDeleted ? RED : undefined

            return (
              <motion.tr
                key={row.id}
                layout
                initial={{ opacity: 0, y: isNew ? 16 : 0 }}
                animate={{ opacity: isDeleted ? 0 : 1, y: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              >
                {[String(row.id), row.name, row.email, String(row.age ?? 'null')].map((val, i) => (
                  <td key={i} style={{
                    padding: cellPad,
                    background: rowColor ? `${rowColor}18` : 'transparent',
                    color: rowColor ?? 'var(--text-muted)',
                    border: `1px solid ${rowColor ? rowColor + '44' : 'var(--border)'}`,
                    transition: 'background 0.3s, color 0.3s',
                    whiteSpace: 'nowrap',
                  }}>
                    {val}
                  </td>
                ))}
              </motion.tr>
            )
          })}
        </AnimatePresence>
      </tbody>
    </table>
  )
}

const constraintDefs = [
  { col: 'id', type: 'SERIAL', constraint: 'PRIMARY KEY', constraintColor: ORANGE },
  { col: 'name', type: 'TEXT', constraint: 'NOT NULL', constraintColor: YELLOW },
  { col: 'email', type: 'TEXT', constraint: 'UNIQUE NOT NULL', constraintColor: BLUE },
  { col: 'age', type: 'INTEGER', constraint: undefined, constraintColor: undefined },
]

export default function CrudViz({ step, compact = false }: Props) {
  // Rows at each step
  const step1Rows: Row[] = [
    ...INITIAL_ROWS,
    { id: 3, name: 'Carol', email: 'carol@example.com', age: null, _state: 'new' },
  ]
  const step2Rows: Row[] = [
    { id: 1, name: 'Alice', email: 'new@example.com', age: 28, _state: 'updated' },
    { id: 2, name: 'Bob', email: 'bob@example.com', age: 22, _state: 'normal' },
    { id: 3, name: 'Carol', email: 'carol@example.com', age: null, _state: 'normal' },
  ]
  const step3Rows: Row[] = [
    { id: 1, name: 'Alice', email: 'new@example.com', age: 28, _state: 'deleted' },
    { id: 2, name: 'Bob', email: 'bob@example.com', age: 22, _state: 'normal' },
    { id: 3, name: 'Carol', email: 'carol@example.com', age: null, _state: 'normal' },
  ]

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

      {/* Step 0: CREATE TABLE DDL */}
      {step === 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>
          <CodeBadge code={'CREATE TABLE users ('} compact={compact} />
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: compact ? 4 : 6,
            paddingLeft: compact ? 12 : 18,
            borderLeft: `2px solid ${PURPLE}33`,
          }}>
            {constraintDefs.map(def => (
              <ColDef key={def.col} {...def} compact={compact} />
            ))}
          </div>
          <CodeBadge code={');'} compact={compact} />
        </div>
      )}

      {/* Step 1: INSERT — new row appears */}
      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 8 : 12 }}>
          <CodeBadge
            code={"INSERT INTO users (name, email)\nVALUES ('Carol', 'carol@example.com');"}
            compact={compact}
          />
          <TableView rows={step1Rows} compact={compact} />
        </div>
      )}

      {/* Step 2: UPDATE — row highlights and value changes */}
      {step === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 8 : 12 }}>
          <CodeBadge
            code={"UPDATE users\nSET email = 'new@example.com'\nWHERE id = 1;"}
            compact={compact}
          />
          <TableView rows={step2Rows} compact={compact} />
        </div>
      )}

      {/* Step 3: DELETE — row fades out */}
      {step === 3 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 8 : 12 }}>
          <CodeBadge
            code={'DELETE FROM users WHERE id = 1;'}
            compact={compact}
          />
          <TableView rows={step3Rows} compact={compact} />
        </div>
      )}

      {/* Step 4: constraints as badges */}
      {step === 4 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 4 : 6 }}>
          {[
            { col: 'id', type: 'SERIAL', constraint: 'PRIMARY KEY', constraintColor: ORANGE },
            { col: 'name', type: 'TEXT', constraint: 'NOT NULL', constraintColor: YELLOW },
            { col: 'email', type: 'TEXT', constraint: 'UNIQUE', constraintColor: BLUE },
            { col: 'user_id', type: 'INT', constraint: 'FOREIGN KEY', constraintColor: GREEN },
          ].map(def => (
            <ColDef key={def.col} {...def} compact={compact} />
          ))}
        </div>
      )}
    </div>
  )
}
