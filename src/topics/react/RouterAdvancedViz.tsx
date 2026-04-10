import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const COLOR  = '#61dafb'
const BLUE   = '#38bdf8'
const GREEN  = '#4ade80'
const ORANGE = '#fb923c'
const RED    = '#f87171'
const MUTED  = '#94a3b8'

const stepLabels = [
  'Route modules define the URL structure of your app',
  'Loaders run on the server before the component renders',
  'useLoaderData() gives the component its pre-fetched data',
  'Pending state: show a spinner while navigating',
  'Error boundaries catch loader failures per-route',
]

const MAX_STEP = stepLabels.length - 1

function RouteTree({ compact }: { compact: boolean }) {
  const fs = compact ? 8 : 10
  const routes = [
    { label: 'routes/', color: COLOR, depth: 0 },
    { label: '_layout.tsx', color: BLUE, depth: 1 },
    { label: 'home.tsx', color: GREEN, depth: 2 },
    { label: 'posts.$id.tsx', color: ORANGE, depth: 2 },
    { label: 'settings.tsx', color: MUTED, depth: 2 },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 3 : 4 }}>
      {routes.map((r, i) => (
        <motion.div key={r.label}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08 }}
          style={{
            marginLeft: r.depth * (compact ? 14 : 20),
            display: 'flex', alignItems: 'center', gap: compact ? 4 : 6,
            background: `${r.color}12`,
            border: `1px solid ${r.color}44`,
            borderRadius: 5,
            padding: compact ? '3px 8px' : '4px 10px',
            fontFamily: 'var(--font-mono)',
            fontSize: fs,
            color: r.color,
          }}>
          {r.depth > 0 && <span style={{ color: MUTED, fontSize: compact ? 8 : 10 }}>├─</span>}
          {r.label}
        </motion.div>
      ))}
    </div>
  )
}

function LoaderFlow({ compact }: { compact: boolean }) {
  const fs = compact ? 8 : 10
  const stages = [
    { label: 'URL match', color: BLUE },
    { label: 'loader()', color: ORANGE },
    { label: 'fetch data', color: ORANGE },
    { label: '<Component />', color: GREEN },
  ]
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 4 : 8 }}>
      {stages.map((stage, i) => (
        <div key={stage.label} style={{ display: 'flex', alignItems: 'center', gap: compact ? 4 : 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{
              background: `${stage.color}18`,
              border: `1.5px solid ${stage.color}66`,
              borderRadius: 6,
              padding: compact ? '4px 8px' : '5px 12px',
              fontFamily: 'var(--font-mono)',
              fontSize: fs,
              color: stage.color,
              fontWeight: 600,
            }}>
            {stage.label}
          </motion.div>
          {i < stages.length - 1 && (
            <motion.div animate={{ x: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 1 }}
              style={{ color: MUTED, fontSize: compact ? 12 : 16 }}>→</motion.div>
          )}
        </div>
      ))}
    </div>
  )
}

function UseLoaderData({ compact }: { compact: boolean }) {
  const fs = compact ? 8 : 10
  return (
    <div style={{
      background: 'rgba(0,0,0,0.32)',
      border: `1px solid ${COLOR}33`,
      borderRadius: 8,
      padding: compact ? '8px 10px' : '10px 14px',
      fontFamily: 'var(--font-mono)',
      fontSize: fs,
    }}>
      <div style={{ color: MUTED }}>{'// loader returns { posts }'}</div>
      <div style={{ color: COLOR }}>{'export async function loader() {'}</div>
      <div style={{ color: ORANGE, marginLeft: compact ? 8 : 14 }}>{'const posts = await db.getPosts()'}</div>
      <div style={{ color: GREEN, marginLeft: compact ? 8 : 14 }}>{'return { posts }'}</div>
      <div style={{ color: COLOR }}>{'}'}</div>
      <div style={{ marginTop: 6, color: MUTED }}>{'// component reads it'}</div>
      <div style={{ color: COLOR }}>{'export default function Posts() {'}</div>
      <div style={{ color: GREEN, marginLeft: compact ? 8 : 14 }}>{'const { posts } = useLoaderData()'}</div>
      <div style={{ color: COLOR }}>{'}'}</div>
    </div>
  )
}

function PendingState({ compact }: { compact: boolean }) {
  const fs = compact ? 8 : 10
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 6 : 10 }}>
      <div style={{
        background: `${ORANGE}14`,
        border: `1.5px solid ${ORANGE}55`,
        borderRadius: 8,
        padding: compact ? '8px 14px' : '10px 18px',
        fontFamily: 'var(--font-mono)',
        fontSize: fs,
        color: ORANGE,
        display: 'flex', alignItems: 'center', gap: compact ? 6 : 8,
      }}>
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          style={{ fontSize: compact ? 14 : 18 }}>⟳</motion.div>
        Navigating…
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 7 : 9, color: MUTED }}>
        {'useNavigation().state === "loading"'}
      </div>
    </motion.div>
  )
}

function ErrorBoundaryTree({ compact }: { compact: boolean }) {
  const fs = compact ? 8 : 10
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 4 : 6, alignItems: 'center' }}>
      <div style={{
        background: `${COLOR}14`, border: `1.5px solid ${COLOR}55`, borderRadius: 6,
        padding: compact ? '4px 12px' : '5px 16px', fontFamily: 'var(--font-mono)', fontSize: fs, color: COLOR
      }}>
        {'<RootLayout />'}
      </div>
      <div style={{ width: 1, height: compact ? 8 : 12, background: `${MUTED}44` }} />
      <div style={{ display: 'flex', gap: compact ? 8 : 14, alignItems: 'flex-start' }}>
        {/* Happy path */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 3 : 4 }}>
          <div style={{
            background: `${GREEN}14`, border: `1.5px solid ${GREEN}55`, borderRadius: 6,
            padding: compact ? '3px 8px' : '4px 12px', fontFamily: 'var(--font-mono)', fontSize: compact ? 7 : 9, color: GREEN
          }}>
            {'<Posts />'}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 7 : 8, color: GREEN }}>✓ ok</div>
        </div>
        {/* Error path */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 3 : 4 }}>
          <div style={{
            background: `${RED}14`, border: `1.5px dashed ${RED}66`, borderRadius: 6,
            padding: compact ? '3px 8px' : '4px 12px', fontFamily: 'var(--font-mono)', fontSize: compact ? 7 : 9, color: RED
          }}>
            {'ErrorBoundary'}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 7 : 8, color: RED }}>loader failed</div>
        </div>
      </div>
    </div>
  )
}

export default function RouterAdvancedViz({ step, compact = false }: Props) {
  const s = Math.min(step, MAX_STEP)
  const mono = 'var(--font-mono)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 16, width: '100%' }}>
      <AnimatePresence mode="wait">
        {s === 0 && (
          <motion.div key="s0" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}>
            <RouteTree compact={compact} />
          </motion.div>
        )}
        {s === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}>
            <LoaderFlow compact={compact} />
          </motion.div>
        )}
        {s === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}>
            <UseLoaderData compact={compact} />
          </motion.div>
        )}
        {s === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}>
            <PendingState compact={compact} />
          </motion.div>
        )}
        {s === 4 && (
          <motion.div key="s4" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}>
            <ErrorBoundaryTree compact={compact} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.p
          key={s}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          style={{ color: COLOR, fontFamily: mono, fontSize: compact ? 10 : 11, textAlign: 'center', maxWidth: 280, margin: 0 }}
        >
          {stepLabels[s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
