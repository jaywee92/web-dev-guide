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
  "TypeScript's blind spot",
  'Define schemas with Zod',
  'safeParse — no throw',
  'z.infer — one source of truth',
]

const codeBlock = (compact: boolean): React.CSSProperties => ({
  fontFamily: 'var(--font-mono)',
  fontSize: compact ? 11 : 13,
  background: 'var(--surface-bright)',
  borderRadius: 8,
  padding: compact ? '10px 14px' : '14px 20px',
  lineHeight: 1.8,
  display: 'inline-block',
  textAlign: 'left',
})

function Step0({ compact }: { compact: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 10 : 14, alignItems: 'center' }}>
      {/* Dev (compile time) vs Runtime */}
      <div style={{ display: 'flex', gap: compact ? 8 : 12 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          style={{
            background: `${BLUE}0d`,
            border: `1px solid ${BLUE}33`,
            borderRadius: 8,
            padding: compact ? '8px 12px' : '12px 18px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: compact ? 9 : 10, color: BLUE, fontWeight: 700, textTransform: 'uppercase', marginBottom: compact ? 4 : 6 }}>dev / compile</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 11 : 13, color: BLUE }}>type User = {'{'}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 10 : 11, color: MUTED, paddingLeft: compact ? 12 : 16 }}>id: number</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 11 : 13, color: BLUE }}>{'}'}</div>
          <div style={{ fontSize: compact ? 9 : 10, color: BLUE, marginTop: compact ? 4 : 6 }}>✓ type-checked</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.35 }}
          style={{
            background: `${RED}0d`,
            border: `1px solid ${RED}33`,
            borderRadius: 8,
            padding: compact ? '8px 12px' : '12px 18px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: compact ? 9 : 10, color: RED, fontWeight: 700, textTransform: 'uppercase', marginBottom: compact ? 4 : 6 }}>runtime</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 11 : 13, color: MUTED }}>data as User</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 10 : 11, color: MUTED, marginTop: 2 }}>{'{ id: "abc" }'}</div>
          <div style={{ fontSize: compact ? 9 : 10, color: RED, marginTop: compact ? 4 : 6 }}>✗ no check!</div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.3 }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: compact ? 9 : 10,
          color: YELLOW,
          background: `${YELLOW}12`,
          border: `1px solid ${YELLOW}33`,
          borderRadius: 5,
          padding: compact ? '4px 10px' : '5px 12px',
          textAlign: 'center',
        }}
      >
        types are erased at compile time
      </motion.div>
    </div>
  )
}

function Step1({ compact }: { compact: boolean }) {
  const fields = [
    { name: 'id', schema: 'z.number()', color: '#fb923c' },
    { name: 'name', schema: 'z.string().min(2)', color: GREEN },
    { name: 'email', schema: 'z.string().email()', color: BLUE },
    { name: 'isAdmin', schema: 'z.boolean().default(false)', color: PURPLE },
  ]
  return (
    <div style={{ ...codeBlock(compact), border: `1.5px solid ${BLUE}55` }}>
      <div style={{ color: MUTED, fontSize: compact ? 9 : 10, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' }}>z.object schema</div>
      <div>
        <span style={{ color: PURPLE }}>const </span>
        <span style={{ color: BLUE, fontWeight: 700 }}>UserSchema</span>
        <span style={{ color: MUTED }}> = z.object({'{'}</span>
      </div>
      {fields.map((f, i) => (
        <motion.div
          key={f.name}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1, duration: 0.28 }}
          style={{ paddingLeft: compact ? 12 : 16, display: 'flex', alignItems: 'center', gap: compact ? 3 : 5 }}
        >
          <span style={{ color: TEXT }}>{f.name}</span>
          <span style={{ color: MUTED }}>: </span>
          <span style={{ color: f.color, background: `${f.color}18`, borderRadius: 3, padding: '0 4px', fontSize: compact ? 10 : 11 }}>{f.schema}</span>
        </motion.div>
      ))}
      <div style={{ color: MUTED }}>{'})' }</div>
    </div>
  )
}

function Step2({ compact }: { compact: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 8 : 12 }}>
      {/* safeParse call */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 11 : 13, color: MUTED }}
      >
        <span style={{ color: BLUE }}>UserSchema</span>
        <span>.safeParse(raw)</span>
      </motion.div>

      {/* Result branches */}
      <div style={{ display: 'flex', gap: compact ? 6 : 10 }}>
        {/* Success */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          style={{
            flex: 1,
            background: `${GREEN}0d`,
            border: `1px solid ${GREEN}33`,
            borderRadius: 8,
            padding: compact ? '8px 10px' : '10px 14px',
          }}
        >
          <div style={{ fontSize: compact ? 9 : 10, color: GREEN, fontWeight: 700, marginBottom: compact ? 4 : 6, textTransform: 'uppercase' }}>success</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 10 : 11 }}>
            <div style={{ color: GREEN }}>result.success</div>
            <div style={{ color: MUTED }}>// true</div>
            <div style={{ color: BLUE, marginTop: 3 }}>result.data</div>
            <div style={{ color: MUTED }}>// User ✓</div>
          </div>
        </motion.div>

        {/* Failure */}
        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          style={{
            flex: 1,
            background: `${RED}0d`,
            border: `1px solid ${RED}33`,
            borderRadius: 8,
            padding: compact ? '8px 10px' : '10px 14px',
          }}
        >
          <div style={{ fontSize: compact ? 9 : 10, color: RED, fontWeight: 700, marginBottom: compact ? 4 : 6, textTransform: 'uppercase' }}>failure</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 10 : 11 }}>
            <div style={{ color: RED }}>result.success</div>
            <div style={{ color: MUTED }}>// false</div>
            <div style={{ color: YELLOW, marginTop: 3 }}>result.error</div>
            <div style={{ color: MUTED }}>// ZodError</div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: compact ? 9 : 10,
          color: GREEN,
          background: `${GREEN}12`,
          borderRadius: 5,
          padding: compact ? '3px 8px' : '4px 10px',
        }}
      >
        Never throws — always check success first
      </motion.div>
    </div>
  )
}

function Step3({ compact }: { compact: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 8 : 14, alignItems: 'center' }}>
      {/* Schema → infer → Type pipeline */}
      {[
        { label: 'UserSchema', sublabel: 'z.object({ ... })', color: BLUE, icon: '📋' },
        { label: 'z.infer<typeof UserSchema>', sublabel: 'derives type automatically', color: PURPLE, icon: '🔗', isKey: true },
        { label: 'type User', sublabel: '{ id: number; name: string; ... }', color: GREEN, icon: '✓' },
      ].map((node, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.18, duration: 0.3 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: '100%' }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: compact ? 6 : 10,
            background: `${node.color}0d`,
            border: `1.5px solid ${node.color}${node.isKey ? '88' : '44'}`,
            borderRadius: 8,
            padding: compact ? '6px 12px' : '8px 16px',
            width: '100%',
            boxSizing: 'border-box',
            boxShadow: node.isKey ? `0 0 14px ${node.color}22` : undefined,
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 11 : 13, color: node.color, fontWeight: node.isKey ? 700 : 400, flex: 1 }}>
              {node.label}
            </div>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 10, color: MUTED, fontStyle: 'italic' }}>
            {node.sublabel}
          </div>
          {i < 2 && <div style={{ color: MUTED, fontSize: compact ? 11 : 13, lineHeight: 1 }}>↓</div>}
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.3 }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: compact ? 9 : 10,
          color: BLUE,
          background: `${BLUE}12`,
          borderRadius: 5,
          padding: compact ? '3px 8px' : '4px 10px',
          textAlign: 'center',
        }}
      >
        Schema is the single source of truth
      </motion.div>
    </div>
  )
}

export default function ZodViz({ step, compact = false }: Props) {
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
