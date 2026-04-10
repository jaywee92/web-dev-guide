import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const BLUE = '#3b82f6'
const GREEN = '#4ade80'
const YELLOW = '#fbbf24'
const RED = '#f87171'
const PURPLE = '#a78bfa'
const MUTED = '#94a3b8'
const TEXT = '#e2e8f0'

const stepLabels = [
  'Numeric enums',
  'String enums',
  'Exhaustive switch',
  'Real-world: RBAC roles',
]


function KVRow({ k, v, color, delay, compact }: { k: string; v: string | number; color: string; delay: number; compact: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      style={{ display: 'flex', alignItems: 'center', gap: compact ? 6 : 10 }}
    >
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: compact ? 11 : 13,
        color: TEXT,
        minWidth: compact ? 70 : 90,
      }}>
        {k}
      </div>
      <div style={{ color: MUTED, fontSize: compact ? 10 : 11 }}>→</div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: compact ? 10 : 12,
        color,
        background: `${color}18`,
        border: `1px solid ${color}44`,
        borderRadius: 5,
        padding: compact ? '1px 8px' : '2px 10px',
        fontWeight: 600,
      }}>
        {String(v)}
      </div>
    </motion.div>
  )
}

function Step0({ compact }: { compact: boolean }) {
  const members = [
    { key: 'Up', val: 0 },
    { key: 'Down', val: 1 },
    { key: 'Left', val: 2 },
    { key: 'Right', val: 3 },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 10 : 11, color: PURPLE, marginBottom: compact ? 4 : 6 }}>
        <span style={{ color: PURPLE }}>enum </span>
        <span style={{ color: BLUE, fontWeight: 700 }}>Direction</span>
        <span style={{ color: MUTED }}> {'{'} ... {'}'}</span>
      </div>
      {members.map((m, i) => (
        <KVRow key={m.key} k={m.key} v={m.val} color={YELLOW} delay={i * 0.1} compact={compact} />
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.3 }}
        style={{
          marginTop: compact ? 4 : 6,
          fontFamily: 'var(--font-mono)',
          fontSize: compact ? 9 : 10,
          color: MUTED,
          background: `${MUTED}12`,
          borderRadius: 5,
          padding: compact ? '3px 8px' : '4px 10px',
        }}
      >
        Direction[0] → "Up" (reverse lookup)
      </motion.div>
    </div>
  )
}

function Step1({ compact }: { compact: boolean }) {
  const members = [
    { key: 'Draft', val: '"draft"' },
    { key: 'Published', val: '"published"' },
    { key: 'Archived', val: '"archived"' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 10 : 11, color: PURPLE, marginBottom: compact ? 4 : 6 }}>
        <span style={{ color: PURPLE }}>enum </span>
        <span style={{ color: BLUE, fontWeight: 700 }}>Status</span>
        <span style={{ color: MUTED }}> {'{'} ... {'}'}</span>
      </div>
      {members.map((m, i) => (
        <KVRow key={m.key} k={m.key} v={m.val} color={GREEN} delay={i * 0.12} compact={compact} />
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        style={{
          marginTop: compact ? 4 : 6,
          fontFamily: 'var(--font-mono)',
          fontSize: compact ? 9 : 10,
          color: GREEN,
          background: `${GREEN}12`,
          borderRadius: 5,
          padding: compact ? '3px 8px' : '4px 10px',
        }}
      >
        ✓ Values are readable in logs & APIs
      </motion.div>
    </div>
  )
}

function Step2({ compact }: { compact: boolean }) {
  const cases = [
    { label: 'case Red:', result: '"#ff0000"', color: RED },
    { label: 'case Green:', result: '"#00ff00"', color: GREEN },
    { label: 'case Blue:', result: '"#0000ff"', color: BLUE },
    { label: 'default:', result: 'never ✓', color: MUTED, isNever: true },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 4 : 6 }}>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: compact ? 10 : 11,
        color: MUTED,
        marginBottom: compact ? 4 : 6,
      }}>
        <span style={{ color: PURPLE }}>switch </span>(color)
      </div>
      {cases.map((c, i) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1, duration: 0.28 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: compact ? 6 : 10,
            background: c.isNever ? `${BLUE}0d` : `${c.color}0d`,
            borderRadius: 6,
            padding: compact ? '4px 8px' : '5px 10px',
            border: `1px solid ${c.isNever ? BLUE : c.color}22`,
          }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: compact ? 10 : 11,
            color: c.isNever ? MUTED : c.color,
            minWidth: compact ? 78 : 90,
          }}>
            {c.label}
          </div>
          <div style={{ color: MUTED, fontSize: compact ? 10 : 11 }}>→</div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: compact ? 10 : 11,
            color: c.isNever ? BLUE : c.color,
            fontWeight: c.isNever ? 700 : 400,
          }}>
            {c.result}
          </div>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.3 }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: compact ? 9 : 10,
          color: BLUE,
          background: `${BLUE}12`,
          borderRadius: 5,
          padding: compact ? '3px 8px' : '4px 10px',
          marginTop: compact ? 2 : 4,
        }}
      >
        Add Color.Purple → compile error immediately
      </motion.div>
    </div>
  )
}

function Step3({ compact }: { compact: boolean }) {
  const roles = [
    { name: 'Admin', val: '"admin"', canEdit: true },
    { name: 'Editor', val: '"editor"', canEdit: true },
    { name: 'Viewer', val: '"viewer"', canEdit: false },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: compact ? 10 : 11,
        color: PURPLE,
        marginBottom: compact ? 4 : 6,
      }}>
        <span style={{ color: PURPLE }}>enum </span>
        <span style={{ color: BLUE, fontWeight: 700 }}>Role</span>
      </div>
      {roles.map((r, i) => (
        <motion.div
          key={r.name}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.12, duration: 0.3 }}
          style={{ display: 'flex', alignItems: 'center', gap: compact ? 6 : 10 }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: compact ? 11 : 12,
            color: TEXT,
            minWidth: compact ? 44 : 52,
          }}>
            {r.name}
          </div>
          <div style={{ color: MUTED, fontSize: compact ? 10 : 11 }}>→</div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: compact ? 10 : 11,
            color: GREEN,
            background: `${GREEN}18`,
            border: `1px solid ${GREEN}44`,
            borderRadius: 4,
            padding: '1px 7px',
          }}>
            {r.val}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: compact ? 9 : 10,
            color: r.canEdit ? GREEN : RED,
            marginLeft: compact ? 4 : 6,
          }}>
            canEdit: {r.canEdit ? 'true ✓' : 'false ✗'}
          </div>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        style={{
          marginTop: compact ? 2 : 4,
          fontFamily: 'var(--font-mono)',
          fontSize: compact ? 9 : 10,
          color: RED,
          background: `${RED}12`,
          borderRadius: 5,
          padding: compact ? '3px 8px' : '4px 10px',
        }}
      >
        canEdit("admin") // Error: string ≠ Role
      </motion.div>
    </div>
  )
}

export default function EnumsViz({ step, compact = false }: Props) {
  const clampedStep = Math.min(step, stepLabels.length - 1)

  const stepContent: Record<number, React.ReactNode> = {
    0: <Step0 compact={compact} />,
    1: <Step1 compact={compact} />,
    2: <Step2 compact={compact} />,
    3: <Step3 compact={compact} />,
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 20 }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={`label-${clampedStep}`}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `${BLUE}22`,
            border: `1px solid ${BLUE}55`,
            borderRadius: 20,
            padding: compact ? '3px 10px' : '4px 14px',
            fontSize: compact ? 10 : 11,
            fontFamily: 'var(--font-mono)',
            color: BLUE,
            fontWeight: 600,
          }}
        >
          {stepLabels[clampedStep]}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={`step-${clampedStep}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
        >
          {stepContent[clampedStep]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
