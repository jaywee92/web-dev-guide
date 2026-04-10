import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const COLOR = '#61dafb'
const PINK  = '#f472b6'
const GREEN = '#4ade80'
const MUTED = '#94a3b8'
const TEXT  = '#e2e8f0'

const stepLabels = [
  'React is a library for building UIs from components',
  'Components form a tree — App is the root',
  'JSX lets you write HTML-like syntax in JavaScript',
  'React keeps a Virtual DOM — diffs it against the real DOM',
  'Only changed nodes get updated in the real DOM',
]

const MAX_STEP = stepLabels.length - 1

interface Node { id: string; label: string; color: string; children?: string[] }

const TREE: Node[] = [
  { id: 'app',    label: '<App />',    color: COLOR,  children: ['header', 'main', 'footer'] },
  { id: 'header', label: '<Header />', color: PINK,   children: [] },
  { id: 'main',   label: '<Main />',   color: GREEN,  children: [] },
  { id: 'footer', label: '<Footer />', color: MUTED,  children: [] },
]

function TreeNode({ node, compact, depth = 0 }: { node: Node; compact: boolean; depth?: number }) {
  const fs = compact ? 9 : 11
  const px = compact ? 8 : 12
  const py = compact ? 3 : 5
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: depth * 0.08 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: compact ? 4 : 6, marginLeft: depth * (compact ? 14 : 20) }}
    >
      <div style={{
        background: `${node.color}18`,
        border: `1.5px solid ${node.color}66`,
        borderRadius: 6,
        padding: `${py}px ${px}px`,
        fontFamily: 'var(--font-mono)',
        fontSize: fs,
        fontWeight: 700,
        color: node.color,
      }}>
        {node.label}
      </div>
    </motion.div>
  )
}

function ComponentTree({ compact, showChildren }: { compact: boolean; showChildren: boolean }) {
  const root = TREE[0]
  const children = TREE.slice(1)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 4 : 6 }}>
      <TreeNode node={root} compact={compact} depth={0} />
      <AnimatePresence>
        {showChildren && children.map((node) => (
          <motion.div key={node.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
            <TreeNode node={node} compact={compact} depth={1} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

function JSXPanel({ compact }: { compact: boolean }) {
  const fs = compact ? 9 : 11
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 8 : 14 }}>
      <div style={{
        background: 'rgba(0,0,0,0.35)',
        border: `1px solid ${COLOR}33`,
        borderRadius: 8,
        padding: compact ? '8px 10px' : '10px 14px',
        fontFamily: 'var(--font-mono)',
        fontSize: fs,
      }}>
        <span style={{ color: PINK }}>{'return ('}</span><br />
        <span style={{ color: COLOR, marginLeft: compact ? 8 : 12 }}>{'<div>'}</span><br />
        <span style={{ color: GREEN, marginLeft: compact ? 16 : 24 }}>{'<h1>Hello</h1>'}</span><br />
        <span style={{ color: COLOR, marginLeft: compact ? 8 : 12 }}>{'</div>'}</span><br />
        <span style={{ color: PINK }}>{')'}</span>
      </div>
      <motion.div
        animate={{ x: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
        style={{ fontSize: compact ? 16 : 22, color: COLOR }}
      >
        →
      </motion.div>
      <div style={{
        background: `${GREEN}14`,
        border: `1.5px solid ${GREEN}55`,
        borderRadius: 8,
        padding: compact ? '8px 10px' : '10px 14px',
        fontFamily: 'var(--font-mono)',
        fontSize: fs,
        color: GREEN,
      }}>
        {'<div>'}<br />
        <span style={{ marginLeft: compact ? 8 : 12 }}>{'<h1>Hello</h1>'}</span><br />
        {'</div>'}
      </div>
    </div>
  )
}

function DomPanel({ compact }: { compact: boolean }) {
  const fs = compact ? 9 : 11
  const box = (label: string, color: string, changed: boolean) => (
    <motion.div
      key={label}
      animate={changed ? { backgroundColor: [`${color}00`, `${color}44`, `${color}14`] } : {}}
      transition={{ duration: 0.9, repeat: changed ? Infinity : 0, repeatDelay: 1 }}
      style={{
        background: `${color}14`,
        border: `1.5px solid ${changed ? color : color + '44'}`,
        borderRadius: 6,
        padding: compact ? '4px 8px' : '5px 12px',
        fontFamily: 'var(--font-mono)',
        fontSize: fs,
        color: changed ? color : MUTED,
        fontWeight: changed ? 700 : 400,
      }}
    >
      {label}
    </motion.div>
  )

  return (
    <div style={{ display: 'flex', gap: compact ? 10 : 18, alignItems: 'flex-start' }}>
      {/* Virtual DOM */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 4 : 6, alignItems: 'center' }}>
        <div style={{ fontSize: compact ? 9 : 10, color: MUTED, fontFamily: 'var(--font-mono)', marginBottom: 2 }}>Virtual DOM</div>
        {box('<div>', COLOR, false)}
        {box('<h1>Hi</h1>', COLOR, true)}
        {box('<p>Text</p>', COLOR, false)}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignSelf: 'center', gap: 4 }}>
        <motion.div animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1 }} style={{ color: COLOR, fontSize: 18 }}>→</motion.div>
        <div style={{ fontSize: compact ? 8 : 9, color: MUTED, fontFamily: 'var(--font-mono)', textAlign: 'center' }}>diff</div>
      </div>
      {/* Real DOM */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 4 : 6, alignItems: 'center' }}>
        <div style={{ fontSize: compact ? 9 : 10, color: MUTED, fontFamily: 'var(--font-mono)', marginBottom: 2 }}>Real DOM</div>
        {box('<div>', MUTED, false)}
        {box('<h1>Hi</h1>', GREEN, true)}
        {box('<p>Text</p>', MUTED, false)}
      </div>
    </div>
  )
}

export default function ReactIntroViz({ step, compact = false }: Props) {
  const s = Math.min(step, MAX_STEP)
  const mono = 'var(--font-mono)'
  const sz = compact ? 10 : 12

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 14 : 20, width: '100%' }}>
      <AnimatePresence mode="wait">
        {s === 0 && (
          <motion.div key="s0" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 14 }}>
            <div style={{
              width: compact ? 60 : 80, height: compact ? 60 : 80,
              borderRadius: '50%',
              background: `${COLOR}18`,
              border: `3px solid ${COLOR}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: compact ? 28 : 38, color: COLOR, fontWeight: 900, fontFamily: mono,
            }}>
              ⚛
            </div>
            <div style={{ fontFamily: mono, fontSize: sz, color: TEXT, textAlign: 'center', maxWidth: 200, lineHeight: 1.5 }}>
              A <span style={{ color: COLOR, fontWeight: 700 }}>library</span> for building user interfaces from <span style={{ color: PINK, fontWeight: 700 }}>reusable components</span>
            </div>
          </motion.div>
        )}
        {s === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}>
            <ComponentTree compact={compact} showChildren={true} />
          </motion.div>
        )}
        {s === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}>
            <JSXPanel compact={compact} />
          </motion.div>
        )}
        {(s === 3 || s === 4) && (
          <motion.div key="s3-4" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}>
            <DomPanel compact={compact} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.p
          key={s}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          style={{ color: COLOR, fontFamily: mono, fontSize: compact ? 10 : 11, textAlign: 'center', maxWidth: 260, margin: 0 }}
        >
          {stepLabels[s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
