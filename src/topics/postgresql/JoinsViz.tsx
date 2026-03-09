import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const stepLabels = [
  'Related data lives in separate tables',
  'Foreign key links the tables',
  'INNER JOIN — only matching rows',
  'LEFT JOIN — all left rows, NULLs for no match',
  'The full JOIN query',
]

const PURPLE = '#a78bfa'
const BLUE = '#5b9cf5'
const GREEN = '#4ade80'
const ORANGE = '#fb923c'

interface UserRow { id: number; name: string }
interface PostRow { id: number; user_id: number; title: string }

const USERS: UserRow[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Carol' },
]

const POSTS: PostRow[] = [
  { id: 1, user_id: 1, title: 'Hello World' },
  { id: 2, user_id: 1, title: 'REST APIs' },
  { id: 3, user_id: 2, title: 'SQL Joins' },
]

function ColHeader({ label, highlight, compact }: { label: string; highlight?: boolean; compact: boolean }) {
  return (
    <th style={{
      padding: compact ? '3px 7px' : '4px 10px',
      background: highlight ? `${ORANGE}33` : `${BLUE}22`,
      color: highlight ? ORANGE : BLUE,
      border: `1px solid ${highlight ? ORANGE : BLUE}33`,
      fontFamily: 'var(--font-mono)',
      fontSize: compact ? 9 : 10,
      fontWeight: 700,
      textAlign: 'left',
      whiteSpace: 'nowrap',
    }}>
      {label}
    </th>
  )
}

function Cell({ value, highlight, compact }: { value: string; highlight?: boolean; compact: boolean }) {
  return (
    <td style={{
      padding: compact ? '3px 7px' : '4px 10px',
      background: highlight ? `${ORANGE}18` : 'transparent',
      color: highlight ? ORANGE : 'var(--text-muted)',
      border: `1px solid ${highlight ? ORANGE + '44' : 'var(--border)'}`,
      fontFamily: 'var(--font-mono)',
      fontSize: compact ? 9 : 10,
      whiteSpace: 'nowrap',
      transition: 'background 0.3s',
    }}>
      {value}
    </td>
  )
}

function UsersTable({ highlightId = false, highlightKey = false, compact }: { highlightId?: boolean; highlightKey?: boolean; compact: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 10, color: GREEN, fontWeight: 700 }}>users</span>
      <table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <ColHeader label="id" highlight={highlightId} compact={compact} />
            <ColHeader label="name" compact={compact} />
          </tr>
        </thead>
        <tbody>
          {USERS.map(u => (
            <tr key={u.id}>
              <Cell value={String(u.id)} highlight={highlightId && highlightKey} compact={compact} />
              <Cell value={u.name} compact={compact} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function PostsTable({ highlightUserId = false, compact }: { highlightUserId?: boolean; compact: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 10, color: BLUE, fontWeight: 700 }}>posts</span>
      <table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <ColHeader label="id" compact={compact} />
            <ColHeader label="user_id" highlight={highlightUserId} compact={compact} />
            <ColHeader label="title" compact={compact} />
          </tr>
        </thead>
        <tbody>
          {POSTS.map(p => (
            <tr key={p.id}>
              <Cell value={String(p.id)} compact={compact} />
              <Cell value={String(p.user_id)} highlight={highlightUserId} compact={compact} />
              <Cell value={p.title} compact={compact} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ConnectingLine({ compact }: { compact: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      style={{
        height: 2,
        width: compact ? 30 : 40,
        background: ORANGE,
        borderRadius: 1,
        alignSelf: 'center',
        marginTop: compact ? 14 : 18,
      }}
    />
  )
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

// Result rows for INNER JOIN
const innerJoinRows = [
  { name: 'Alice', title: 'Hello World' },
  { name: 'Alice', title: 'REST APIs' },
  { name: 'Bob', title: 'SQL Joins' },
]

// Result rows for LEFT JOIN (Carol has no posts → NULL)
const leftJoinRows = [
  { name: 'Alice', title: 'Hello World' },
  { name: 'Alice', title: 'REST APIs' },
  { name: 'Bob', title: 'SQL Joins' },
  { name: 'Carol', title: 'NULL' },
]

function ResultTable({ rows, compact }: { rows: { name: string; title: string }[]; compact: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 10, color: GREEN, fontWeight: 700 }}>result</span>
      <table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <ColHeader label="name" compact={compact} />
            <ColHeader label="title" compact={compact} />
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <motion.tr
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <td style={{
                padding: compact ? '3px 7px' : '4px 10px',
                color: GREEN,
                border: `1px solid ${GREEN}33`,
                fontFamily: 'var(--font-mono)',
                fontSize: compact ? 9 : 10,
              }}>
                {r.name}
              </td>
              <td style={{
                padding: compact ? '3px 7px' : '4px 10px',
                color: r.title === 'NULL' ? 'var(--text-muted)' : 'var(--text)',
                border: `1px solid var(--border)`,
                fontFamily: 'var(--font-mono)',
                fontSize: compact ? 9 : 10,
                fontStyle: r.title === 'NULL' ? 'italic' : 'normal',
              }}>
                {r.title}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function JoinsViz({ step, compact = false }: Props) {
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

      {/* Step 0: two tables side by side */}
      {step === 0 && (
        <div style={{ display: 'flex', gap: compact ? 14 : 24, alignItems: 'flex-start' }}>
          <UsersTable compact={compact} />
          <PostsTable compact={compact} />
        </div>
      )}

      {/* Step 1: highlight foreign key link */}
      {step === 1 && (
        <div style={{ display: 'flex', gap: compact ? 6 : 10, alignItems: 'flex-start' }}>
          <UsersTable highlightId highlightKey compact={compact} />
          <ConnectingLine compact={compact} />
          <PostsTable highlightUserId compact={compact} />
        </div>
      )}

      {/* Step 2: INNER JOIN code + result */}
      {step === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 8 : 12 }}>
          <CodeBadge code={'SELECT users.name, posts.title\nFROM users\nINNER JOIN posts\n  ON users.id = posts.user_id;'} compact={compact} />
          <ResultTable rows={innerJoinRows} compact={compact} />
        </div>
      )}

      {/* Step 3: LEFT JOIN code + result with NULL */}
      {step === 3 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 8 : 12 }}>
          <CodeBadge code={'SELECT users.name, posts.title\nFROM users\nLEFT JOIN posts\n  ON users.id = posts.user_id;'} compact={compact} />
          <ResultTable rows={leftJoinRows} compact={compact} />
        </div>
      )}

      {/* Step 4: full query */}
      {step === 4 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 8 : 12 }}>
          <CodeBadge
            code={'SELECT users.name, posts.title\nFROM users\nJOIN posts ON users.id = posts.user_id;'}
            compact={compact}
          />
          <ResultTable rows={innerJoinRows} compact={compact} />
        </div>
      )}
    </div>
  )
}
