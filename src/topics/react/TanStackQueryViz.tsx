import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const COLOR  = '#61dafb'
const PINK   = '#f43f5e'
const GREEN  = '#4ade80'
const ORANGE = '#fb923c'
const MUTED  = '#94a3b8'
const TEXT   = '#e2e8f0'

const stepLabels = [
  'useQuery takes a queryKey — the cache identifier',
  'First fetch: data is stored in the cache by key',
  'Data becomes stale after staleTime — but still shows',
  'Background refetch silently updates stale data',
  'useMutation updates server data, then invalidates cache',
]

const MAX_STEP = stepLabels.length - 1

function QueryKeyBox({ compact }: { compact: boolean }) {
  const fs = compact ? 8 : 10
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10, alignItems: 'center' }}>
      <div style={{
        background: 'rgba(0,0,0,0.3)',
        border: `1px solid ${COLOR}33`,
        borderRadius: 8,
        padding: compact ? '8px 10px' : '10px 14px',
        fontFamily: 'var(--font-mono)',
        fontSize: fs,
      }}>
        <div style={{ color: COLOR }}>{'useQuery({'}</div>
        <div style={{ color: PINK, marginLeft: compact ? 8 : 14 }}>{'queryKey: ["posts", userId],'}</div>
        <div style={{ color: GREEN, marginLeft: compact ? 8 : 14 }}>{'queryFn: () => fetchPosts(userId),'}</div>
        <div style={{ color: COLOR }}>{'})  '}</div>
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 7 : 9, color: MUTED, textAlign: 'center' }}>
        queryKey acts as the cache key
      </div>
    </motion.div>
  )
}

function CacheBox({ compact, stale, refetching }: { compact: boolean; stale: boolean; refetching: boolean }) {
  const fs = compact ? 8 : 10
  const keyColor = stale ? ORANGE : GREEN
  const keyLabel = stale ? 'stale' : 'fresh'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10, alignItems: 'center' }}>
      {/* Cache representation */}
      <div style={{
        background: 'rgba(0,0,0,0.28)',
        border: `1.5px solid ${COLOR}44`,
        borderRadius: 10,
        padding: compact ? '8px 12px' : '10px 16px',
        minWidth: compact ? 140 : 180,
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: MUTED, marginBottom: compact ? 4 : 6 }}>
          TanStack Query Cache
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: compact ? 6 : 10,
          background: `${keyColor}12`,
          border: `1px solid ${keyColor}44`,
          borderRadius: 6,
          padding: compact ? '4px 8px' : '5px 10px',
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: fs, color: PINK, fontWeight: 600 }}>
            {'"posts"'}
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: compact ? 7 : 8,
              background: `${keyColor}25`,
              border: `1px solid ${keyColor}55`,
              borderRadius: 4,
              padding: '1px 5px',
              color: keyColor,
              fontWeight: 700,
            }}>
              {refetching ? 'refetching…' : keyLabel}
            </span>
          </div>
        </div>
        <div style={{
          marginTop: compact ? 4 : 6,
          fontFamily: 'var(--font-mono)', fontSize: compact ? 7 : 8, color: TEXT + '88'
        }}>
          {stale ? '⟳ staleTime exceeded' : '● fresh data'}
        </div>
      </div>

      {/* Staleness timer */}
      {stale && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 7 : 9, color: ORANGE, textAlign: 'center' }}>
          staleTime: 5000ms elapsed
        </motion.div>
      )}
      {refetching && (
        <motion.div
          animate={{ x: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 7 : 9, color: COLOR, textAlign: 'center' }}>
          background refetch in progress…
        </motion.div>
      )}
    </div>
  )
}

function MutationFlow({ compact }: { compact: boolean }) {
  const steps = [
    { label: 'useMutation()',     color: PINK },
    { label: 'mutate(data)',      color: ORANGE },
    { label: 'POST /api/posts',   color: COLOR },
    { label: 'invalidateQueries', color: GREEN },
  ]
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 4 : 8 }}>
      {steps.map((step, i) => (
        <div key={step.label} style={{ display: 'flex', alignItems: 'center', gap: compact ? 4 : 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{
              background: `${step.color}16`,
              border: `1.5px solid ${step.color}55`,
              borderRadius: 6,
              padding: compact ? '4px 7px' : '5px 10px',
              fontFamily: 'var(--font-mono)',
              fontSize: compact ? 7 : 9,
              color: step.color,
              fontWeight: 600,
              textAlign: 'center',
              maxWidth: compact ? 68 : 90,
            }}>
            {step.label}
          </motion.div>
          {i < steps.length - 1 && (
            <motion.div animate={{ x: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 1 }}
              style={{ color: MUTED, fontSize: compact ? 12 : 16 }}>→</motion.div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function TanStackQueryViz({ step, compact = false }: Props) {
  const s = Math.min(step, MAX_STEP)
  const mono = 'var(--font-mono)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 16, width: '100%' }}>
      <AnimatePresence mode="wait">
        {s === 0 && (
          <motion.div key="s0" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}>
            <QueryKeyBox compact={compact} />
          </motion.div>
        )}
        {s === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}>
            <CacheBox compact={compact} stale={false} refetching={false} />
          </motion.div>
        )}
        {s === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}>
            <CacheBox compact={compact} stale={true} refetching={false} />
          </motion.div>
        )}
        {s === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}>
            <CacheBox compact={compact} stale={true} refetching={true} />
          </motion.div>
        )}
        {s === 4 && (
          <motion.div key="s4" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}>
            <MutationFlow compact={compact} />
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
