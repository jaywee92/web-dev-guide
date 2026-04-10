import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const WHITE  = '#e2e8f0'
const DIM    = '#94a3b8'
const MUTED  = '#64748b'
const GREEN  = '#4ade80'
const BLUE   = '#60a5fa'
const PURPLE = '#a78bfa'
const ORANGE = '#fb923c'
const YELLOW = '#fbbf24'

const stepLabels = [
  'Next.js = React + Server + Router',
  'File-based routing',
  'Server Components by default',
  'Client Components',
  'App Router file conventions',
  'Build & deployment',
]

// ─── Step 0 — What is Next.js ─────────────────────────────────────────────────

function Step0({ compact }: { compact: boolean }) {
  const sz = compact ? 11 : 13
  const iconSz = compact ? 28 : 36

  const pieces = [
    { label: 'React', icon: '⚛️', color: BLUE },
    { label: 'Server', icon: '🖥️', color: GREEN },
    { label: 'Router', icon: '🔀', color: PURPLE },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 16 }}>
      {/* Three ingredients */}
      <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 8 : 14 }}>
        {pieces.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.35 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              padding: compact ? '6px 10px' : '8px 14px',
              background: `${p.color}18`,
              border: `1.5px solid ${p.color}55`,
              borderRadius: 10,
              minWidth: compact ? 54 : 66,
            }}
          >
            <span style={{ fontSize: iconSz * 0.7 }}>{p.icon}</span>
            <span style={{ color: p.color, fontFamily: 'var(--font-mono)', fontSize: sz - 1, fontWeight: 600 }}>{p.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Arrow */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ delay: 0.55, duration: 0.3 }}
        style={{ color: MUTED, fontSize: compact ? 16 : 20 }}
      >↓</motion.div>

      {/* Result */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.75, type: 'spring', stiffness: 220 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: compact ? 8 : 12,
          padding: compact ? '8px 16px' : '12px 22px',
          background: `${WHITE}12`,
          border: `2px solid ${WHITE}44`,
          borderRadius: 12,
        }}
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          style={{ fontSize: compact ? 18 : 24 }}
        >▲</motion.div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ color: WHITE, fontFamily: 'var(--font-mono)', fontSize: sz + 1, fontWeight: 700 }}>Next.js</span>
          <span style={{ color: MUTED, fontFamily: 'var(--font-mono)', fontSize: sz - 2 }}>The React Framework</span>
        </div>
      </motion.div>
    </div>
  )
}

// ─── Step 1 — File-based routing ──────────────────────────────────────────────

function Step1({ compact }: { compact: boolean }) {
  const sz = compact ? 10 : 12

  const routes = [
    { file: 'app/page.tsx', url: '/', color: GREEN },
    { file: 'app/about/page.tsx', url: '/about', color: BLUE },
    { file: 'app/blog/[slug]/page.tsx', url: '/blog/:slug', color: PURPLE },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>
      {routes.map((r, i) => (
        <motion.div
          key={r.file}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.18, duration: 0.35 }}
          style={{ display: 'flex', alignItems: 'center', gap: compact ? 6 : 10 }}
        >
          {/* File box */}
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: sz,
            background: 'var(--surface-bright)',
            border: `1.5px solid ${r.color}55`,
            borderRadius: 7,
            padding: compact ? '4px 8px' : '5px 10px',
            color: r.color,
            whiteSpace: 'nowrap',
          }}>
            {r.file}
          </div>

          {/* Arrow */}
          <span style={{ color: MUTED, fontFamily: 'var(--font-mono)', fontSize: sz }}>→</span>

          {/* URL box */}
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: sz,
            background: `${r.color}18`,
            border: `1px solid ${r.color}44`,
            borderRadius: 7,
            padding: compact ? '4px 8px' : '5px 10px',
            color: WHITE,
            whiteSpace: 'nowrap',
          }}>
            {r.url}
          </div>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.4 }}
        style={{ color: MUTED, fontFamily: 'var(--font-mono)', fontSize: sz - 1, marginTop: 2 }}
      >
        No router config — just create files
      </motion.div>
    </div>
  )
}

// ─── Step 2 — Server Components ───────────────────────────────────────────────

function Step2({ compact }: { compact: boolean }) {
  const sz = compact ? 11 : 13

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: sz,
        background: 'var(--surface-bright)',
        border: `1.5px solid ${GREEN}44`,
        borderRadius: 8,
        padding: compact ? '8px 12px' : '12px 18px',
        lineHeight: 1.8,
      }}>
        <div style={{ color: MUTED, fontSize: sz - 2, marginBottom: 4 }}>// No 'use client' → Server Component</div>
        <div>
          <span style={{ color: PURPLE }}>async function </span>
          <span style={{ color: YELLOW }}>Page</span>
          <span style={{ color: WHITE }}>() {'{'}</span>
        </div>
        <motion.div
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.35 }}
          style={{ paddingLeft: compact ? 12 : 18 }}
        >
          <span style={{ color: PURPLE }}>const </span>
          <span style={{ color: WHITE }}>data </span>
          <span style={{ color: DIM }}>= </span>
          <span style={{ color: PURPLE }}>await </span>
          <span style={{ color: BLUE }}>db.query</span>
          <span style={{ color: WHITE }}>(...)</span>
        </motion.div>
        <div style={{ paddingLeft: compact ? 12 : 18 }}>
          <span style={{ color: PURPLE }}>return </span>
          <span style={{ color: DIM }}>{'<'}</span>
          <span style={{ color: ORANGE }}>div</span>
          <span style={{ color: DIM }}>{'>'}</span>
          <span style={{ color: WHITE }}>...</span>
          <span style={{ color: DIM }}>{'</>'}</span>
        </div>
        <div><span style={{ color: WHITE }}>{'}'}</span></div>
      </div>

      {/* Badges */}
      <div style={{ display: 'flex', gap: compact ? 6 : 8, flexWrap: 'wrap' }}>
        {[
          { label: 'runs on server 🖥️', color: GREEN },
          { label: 'direct DB/API calls', color: BLUE },
          { label: 'smaller JS bundle', color: PURPLE },
        ].map((b, i) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 + i * 0.12, type: 'spring' }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: compact ? 9 : 11,
              padding: compact ? '2px 7px' : '3px 9px',
              background: `${b.color}18`,
              border: `1px solid ${b.color}55`,
              borderRadius: 20,
              color: b.color,
            }}
          >
            {b.label}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ─── Step 3 — Client Components ───────────────────────────────────────────────

function Step3({ compact }: { compact: boolean }) {
  const sz = compact ? 11 : 13

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: sz,
        background: 'var(--surface-bright)',
        border: `1.5px solid ${ORANGE}44`,
        borderRadius: 8,
        padding: compact ? '8px 12px' : '12px 18px',
        lineHeight: 1.8,
      }}>
        <motion.div
          animate={{ color: [ORANGE, YELLOW, ORANGE] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ fontWeight: 700, fontSize: sz, marginBottom: 2 }}
        >
          'use client'
        </motion.div>
        <div>
          <span style={{ color: PURPLE }}>import </span>
          <span style={{ color: WHITE }}>{'{ '}</span>
          <span style={{ color: BLUE }}>useState</span>
          <span style={{ color: WHITE }}>{', '}</span>
          <span style={{ color: BLUE }}>useEffect</span>
          <span style={{ color: WHITE }}>{' }'}</span>
          <span style={{ color: PURPLE }}> from </span>
          <span style={{ color: GREEN }}>'react'</span>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <span style={{ color: PURPLE }}>function </span>
          <span style={{ color: YELLOW }}>Counter</span>
          <span style={{ color: WHITE }}>() {'{'}</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.4 }}
          style={{ paddingLeft: compact ? 12 : 18 }}
        >
          <span style={{ color: PURPLE }}>const </span>
          <span style={{ color: WHITE }}>{'[count, setCount] = '}</span>
          <span style={{ color: BLUE }}>useState</span>
          <span style={{ color: WHITE }}>(0)</span>
        </motion.div>
        <div style={{ paddingLeft: compact ? 12 : 18 }}>
          <span style={{ color: DIM }}>{'...'}</span>
        </div>
        <div><span style={{ color: WHITE }}>{'}'}</span></div>
      </div>

      <div style={{ display: 'flex', gap: compact ? 6 : 8, flexWrap: 'wrap' }}>
        {[
          { label: 'runs in browser 🌐', color: BLUE },
          { label: 'useState / useEffect', color: ORANGE },
          { label: 'interactive', color: GREEN },
        ].map((b, i) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.55 + i * 0.12, type: 'spring' }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: compact ? 9 : 11,
              padding: compact ? '2px 7px' : '3px 9px',
              background: `${b.color}18`,
              border: `1px solid ${b.color}55`,
              borderRadius: 20,
              color: b.color,
            }}
          >
            {b.label}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ─── Step 4 — App Router file conventions ─────────────────────────────────────

function Step4({ compact }: { compact: boolean }) {
  const sz = compact ? 10 : 12

  const files = [
    { name: 'layout.tsx', desc: 'wraps children — persists across routes', color: BLUE },
    { name: 'page.tsx', desc: 'route content — renders the UI', color: GREEN },
    { name: 'loading.tsx', desc: 'Suspense fallback while loading', color: YELLOW },
    { name: 'error.tsx', desc: 'error boundary for this route', color: ORANGE },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 5 : 8 }}>
      {files.map((f, i) => (
        <motion.div
          key={f.name}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.14, duration: 0.32 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: compact ? 8 : 12,
          }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: sz,
            color: f.color,
            background: `${f.color}18`,
            border: `1.5px solid ${f.color}55`,
            borderRadius: 7,
            padding: compact ? '3px 8px' : '4px 10px',
            minWidth: compact ? 90 : 108,
            fontWeight: 600,
          }}>
            {f.name}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: sz - 1,
            color: DIM,
          }}>
            {f.desc}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// ─── Step 5 — Deployment ──────────────────────────────────────────────────────

function Step5({ compact }: { compact: boolean }) {
  const sz = compact ? 10 : 12

  const outputs = [
    { label: 'Static pages', icon: '📄', color: GREEN, desc: 'pre-rendered HTML' },
    { label: 'Dynamic routes', icon: '⚡', color: BLUE, desc: 'server-rendered on request' },
    { label: 'API routes', icon: '🔌', color: PURPLE, desc: 'serverless functions' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 8 : 12 }}>
      {/* Source → build */}
      <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 8 : 12 }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: sz,
          color: WHITE,
          background: 'var(--surface-bright)',
          border: `1.5px solid ${WHITE}33`,
          borderRadius: 8,
          padding: compact ? '5px 10px' : '7px 14px',
        }}>Next.js app</div>

        <motion.div
          style={{ color: MUTED, fontFamily: 'var(--font-mono)', fontSize: sz }}
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >→</motion.div>

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: sz,
          color: YELLOW,
          background: `${YELLOW}18`,
          border: `1.5px solid ${YELLOW}55`,
          borderRadius: 8,
          padding: compact ? '5px 10px' : '7px 14px',
          fontWeight: 700,
        }}>next build</div>

        <motion.div
          style={{ color: MUTED, fontFamily: 'var(--font-mono)', fontSize: sz }}
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
        >→</motion.div>

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: sz,
          color: WHITE,
          background: 'var(--surface-bright)',
          border: `1.5px solid ${WHITE}33`,
          borderRadius: 8,
          padding: compact ? '5px 10px' : '7px 14px',
        }}>▲ Vercel</div>
      </div>

      {/* Output types */}
      <div style={{ display: 'flex', gap: compact ? 6 : 10 }}>
        {outputs.map((o, i) => (
          <motion.div
            key={o.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.14, duration: 0.35 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              padding: compact ? '5px 8px' : '7px 12px',
              background: `${o.color}18`,
              border: `1.5px solid ${o.color}55`,
              borderRadius: 8,
              minWidth: compact ? 72 : 88,
            }}
          >
            <span style={{ fontSize: compact ? 14 : 18 }}>{o.icon}</span>
            <span style={{ color: o.color, fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 11, fontWeight: 600, textAlign: 'center' }}>{o.label}</span>
            <span style={{ color: MUTED, fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, textAlign: 'center' }}>{o.desc}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ─── Main export ───────────────────────────────────────────────────────────────

export default function NextjsBasicsViz({ step, compact = false }: Props) {
  const s = Math.min(step, 5)

  const stepContent: Record<number, React.ReactNode> = {
    0: <Step0 compact={compact} />,
    1: <Step1 compact={compact} />,
    2: <Step2 compact={compact} />,
    3: <Step3 compact={compact} />,
    4: <Step4 compact={compact} />,
    5: <Step5 compact={compact} />,
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 20, width: '100%' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={`label-${s}`}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `${WHITE}12`,
            border: `1px solid ${WHITE}33`,
            borderRadius: 20,
            padding: compact ? '3px 10px' : '4px 14px',
            fontSize: compact ? 10 : 11,
            fontFamily: 'var(--font-mono)',
            color: WHITE,
            fontWeight: 600,
            letterSpacing: '0.2px',
          }}
        >
          {stepLabels[s]}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={`step-${s}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
        >
          {stepContent[s]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
