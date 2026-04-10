import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const CYAN = '#06b6d4'
const BLUE = '#5b9cf5'
const GREEN = '#4ade80'
const PURPLE = '#a78bfa'
const ORANGE = '#fb923c'
const MUTED = '#94a3b8'

export default function DbIntroViz({ step, compact = false }: Props) {
  const mono = 'var(--font-mono)'
  const s = Math.min(step, 4)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 14 : 20, width: '100%' }}>
      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={s}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          style={{
            background: `${CYAN}22`,
            border: `1px solid ${CYAN}55`,
            borderRadius: 6,
            padding: compact ? '4px 10px' : '5px 14px',
            fontSize: compact ? 10 : 11,
            fontFamily: mono,
            fontWeight: 700,
            color: CYAN,
            letterSpacing: '0.3px',
            textAlign: 'center',
          }}
        >
          {[
            'A database: organised data storage',
            'Tables, rows, and columns',
            'SQL query anatomy',
            'Client → query → database → result',
            'Why not just files? ACID properties',
          ][s]}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {/* Step 0: what is a database */}
        {s === 0 && (
          <motion.div
            key="s0"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', gap: compact ? 8 : 12, alignItems: 'center' }}
          >
            <div style={{
              display: 'flex',
              gap: compact ? 8 : 12,
              alignItems: 'center',
            }}>
              {['📄 file.json', '📄 data.csv', '📄 config.txt'].map((label, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.45, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                  style={{
                    fontFamily: mono,
                    fontSize: compact ? 8 : 9,
                    color: MUTED,
                    background: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: 5,
                    padding: compact ? '4px 6px' : '5px 8px',
                  }}
                >
                  {label}
                </motion.div>
              ))}
            </div>
            <span style={{ fontFamily: mono, fontSize: compact ? 9 : 10, color: MUTED }}>vs</span>
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                background: `${CYAN}15`,
                border: `2px solid ${CYAN}55`,
                borderRadius: 10,
                padding: compact ? '10px 16px' : '14px 22px',
                fontFamily: mono,
                fontSize: compact ? 10 : 12,
                fontWeight: 700,
                color: CYAN,
                textAlign: 'center',
              }}
            >
              🗄️ Database
            </motion.div>
            <div style={{ display: 'flex', gap: compact ? 6 : 8 }}>
              {['structured', 'queryable', 'consistent'].map((tag, i) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  style={{
                    fontFamily: mono,
                    fontSize: compact ? 7 : 8,
                    color: CYAN,
                    background: `${CYAN}15`,
                    border: `1px solid ${CYAN}33`,
                    borderRadius: 4,
                    padding: compact ? '2px 5px' : '3px 7px',
                  }}
                >
                  {tag}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 1: table / rows / columns */}
        {s === 1 && (
          <motion.div
            key="s1"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            style={{ width: '100%', maxWidth: compact ? 260 : 320 }}
          >
            <table style={{
              borderCollapse: 'collapse',
              fontFamily: mono,
              fontSize: compact ? 9 : 10,
              tableLayout: 'fixed',
              width: '100%',
            }}>
              <thead>
                <tr>
                  {['id', 'name', 'email'].map((col) => (
                    <th key={col} style={{
                      padding: compact ? '4px 8px' : '5px 10px',
                      background: `${CYAN}22`,
                      color: CYAN,
                      border: `1px solid ${CYAN}44`,
                      fontWeight: 700,
                      textAlign: 'left',
                    }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 1, name: 'Alice', email: 'alice@ex.com' },
                  { id: 2, name: 'Bob', email: 'bob@ex.com' },
                  { id: 3, name: 'Carol', email: 'carol@ex.com' },
                ].map((row, i) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {Object.values(row).map((val, j) => (
                      <td key={j} style={{
                        padding: compact ? '4px 8px' : '5px 10px',
                        border: `1px solid ${CYAN}22`,
                        color: j === 0 ? CYAN : '#e2e8f0',
                      }}>
                        {String(val)}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* Step 2: SQL anatomy */}
        {s === 2 && (
          <motion.div
            key="s2"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', gap: compact ? 10 : 14, alignItems: 'center' }}
          >
            <div style={{
              background: 'var(--surface-bright)',
              border: `1px solid ${CYAN}44`,
              borderRadius: 8,
              padding: compact ? '8px 14px' : '12px 18px',
              fontFamily: mono,
              fontSize: compact ? 10 : 13,
              fontWeight: 700,
              letterSpacing: '0.3px',
            }}>
              <span style={{ color: BLUE }}>SELECT </span>
              <span style={{ color: '#e2e8f0' }}>name </span>
              <span style={{ color: BLUE }}>FROM </span>
              <span style={{ color: CYAN }}>users </span>
              <span style={{ color: ORANGE }}>WHERE </span>
              <span style={{ color: '#e2e8f0' }}>age {'>'} 25</span>
            </div>
            <div style={{ display: 'flex', gap: compact ? 8 : 12 }}>
              {[
                { label: 'SELECT', desc: 'columns', color: BLUE },
                { label: 'FROM', desc: 'table', color: CYAN },
                { label: 'WHERE', desc: 'filter', color: ORANGE },
              ].map(({ label, desc, color }) => (
                <div key={label} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 3,
                  fontFamily: mono,
                }}>
                  <span style={{ fontSize: compact ? 9 : 10, color, fontWeight: 700 }}>{label}</span>
                  <span style={{ fontSize: compact ? 7 : 8, color: MUTED }}>{desc}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3: client → query → db → result */}
        {s === 3 && (
          <motion.div
            key="s3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', alignItems: 'center', gap: compact ? 4 : 6, flexWrap: 'wrap', justifyContent: 'center' }}
          >
            {[
              { label: 'Client', color: BLUE },
              { label: '→', color: MUTED },
              { label: 'Query', color: CYAN },
              { label: '→', color: MUTED },
              { label: 'DB', color: GREEN },
              { label: '→', color: MUTED },
              { label: 'Result', color: PURPLE },
            ].map(({ label, color }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                style={{
                  fontFamily: mono,
                  fontSize: compact ? 9 : 11,
                  fontWeight: label === '→' ? 400 : 700,
                  color,
                  background: label === '→' ? 'transparent' : `${color}18`,
                  border: label === '→' ? 'none' : `2px solid ${color}55`,
                  borderRadius: 8,
                  padding: label === '→' ? '0 2px' : compact ? '6px 10px' : '8px 14px',
                }}
              >
                {label}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 4: why not just files / ACID */}
        {s === 4 && (
          <motion.div
            key="s4"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 9, width: '100%', maxWidth: 280 }}
          >
            {[
              { letter: 'A', word: 'Atomicity', desc: 'all-or-nothing writes', color: CYAN },
              { letter: 'C', word: 'Consistency', desc: 'rules always enforced', color: BLUE },
              { letter: 'I', word: 'Isolation', desc: 'concurrent txns are safe', color: PURPLE },
              { letter: 'D', word: 'Durability', desc: 'committed data survives crash', color: GREEN },
            ].map(({ letter, word, desc, color }, i) => (
              <motion.div
                key={letter}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: compact ? 8 : 12,
                  background: `${color}12`,
                  border: `1px solid ${color}44`,
                  borderRadius: 6,
                  padding: compact ? '5px 10px' : '6px 12px',
                }}
              >
                <span style={{
                  fontFamily: mono,
                  fontSize: compact ? 12 : 15,
                  fontWeight: 900,
                  color,
                  minWidth: compact ? 14 : 16,
                }}>
                  {letter}
                </span>
                <span style={{ fontFamily: mono, fontSize: compact ? 9 : 10, color, fontWeight: 700 }}>{word}</span>
                <span style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: MUTED, flex: 1 }}>{desc}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
