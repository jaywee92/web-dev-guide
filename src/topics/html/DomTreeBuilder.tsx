import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const GREEN = '#4ade80'
const BLUE = '#5b9cf5'
const PURPLE = '#a78bfa'

const stepLabels = [
  'Every webpage starts with a root <html> element',
  '<head> and <body> are direct children of <html>',
  'Elements nest inside each other — forming a tree',
  'JavaScript can select any element by traversing the tree',
  'New nodes can be inserted dynamically at runtime',
]

interface Node {
  id: string
  label: string
  color: string
  parent: string | null
}

const ALL_NODES: Node[] = [
  { id: 'html',  label: '<html>',  color: GREEN,  parent: null },
  { id: 'head',  label: '<head>',  color: BLUE,   parent: 'html' },
  { id: 'body',  label: '<body>',  color: BLUE,   parent: 'html' },
  { id: 'title', label: '<title>', color: PURPLE, parent: 'head' },
  { id: 'h1',    label: '<h1>',   color: PURPLE, parent: 'body' },
  { id: 'p',     label: '<p>',    color: PURPLE, parent: 'body' },
  { id: 'span',  label: '<span>', color: '#f5c542', parent: 'p' },
]

const VISIBLE: Record<number, string[]> = {
  0: ['html'],
  1: ['html', 'head', 'body'],
  2: ['html', 'head', 'body', 'title', 'h1', 'p'],
  3: ['html', 'head', 'body', 'title', 'h1', 'p'],
  4: ['html', 'head', 'body', 'title', 'h1', 'p', 'span'],
}

const SELECTED: Record<number, string | null> = {
  0: null, 1: null, 2: null, 3: 'h1', 4: 'span',
}

const LEVELS: string[][] = [
  ['html'],
  ['head', 'body'],
  ['title', 'h1', 'p'],
  ['span'],
]

function NodeBox({ node, isSelected, isVisible, dimmed, compact }: {
  node: Node
  isSelected: boolean
  isVisible: boolean
  dimmed: boolean
  compact: boolean
}) {
  const fs = compact ? 9 : 11
  const px = compact ? 8 : 12
  const py = compact ? 3 : 5

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={node.id}
          initial={{ opacity: 0, scale: 0.6, y: -12 }}
          animate={{
            opacity: dimmed ? 0.3 : 1,
            scale: 1,
            y: 0,
            boxShadow: isSelected
              ? `0 0 0 2px ${node.color}, 0 0 16px ${node.color}88`
              : `0 0 0 1px ${node.color}44`,
          }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          style={{
            background: isSelected ? `${node.color}28` : `${node.color}14`,
            border: `1.5px solid ${node.color}`,
            borderRadius: 6,
            padding: `${py}px ${px}px`,
            fontSize: fs,
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            color: node.color,
            whiteSpace: 'nowrap',
            cursor: 'default',
          }}
        >
          {node.label}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function TreeLevel({ nodeIds, visible, selected, compact }: {
  nodeIds: string[]
  visible: string[]
  selected: string | null
  compact: boolean
}) {
  const gap = compact ? 8 : 12

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap, justifyContent: 'center', alignItems: 'center' }}>
      {nodeIds.map(id => {
        const node = ALL_NODES.find(n => n.id === id)!
        const isVisible = visible.includes(id)
        const isSelected = selected === id
        const dimmed = selected !== null && !isSelected && isVisible
        return (
          <NodeBox
            key={id}
            node={node}
            isSelected={isSelected}
            isVisible={isVisible}
            dimmed={dimmed}
            compact={compact}
          />
        )
      })}
    </div>
  )
}

function BranchConnector({ show, childCount, compact }: { show: boolean; childCount: number; compact: boolean }) {
  const h = compact ? 10 : 14
  if (!show) return null
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      exit={{ opacity: 0, scaleY: 0 }}
      transition={{ duration: 0.3 }}
      style={{ transformOrigin: 'top', width: '100%', display: 'flex', justifyContent: 'center' }}
    >
      <div style={{ height: h, width: childCount === 1 ? 1 : '60%', position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        {/* Vertical drop from parent */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 1, height: '50%', background: 'var(--border)' }} />
        {/* Horizontal bar across children (only if multiple children) */}
        {childCount > 1 && (
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'var(--border)' }} />
        )}
        {/* Vertical drops to each child */}
        {childCount > 1 && (
          <>
            <div style={{ width: 1, height: '50%', background: 'var(--border)', marginTop: 'auto' }} />
            <div style={{ width: 1, height: '50%', background: 'var(--border)', marginTop: 'auto' }} />
          </>
        )}
      </div>
    </motion.div>
  )
}

export default function DomTreeBuilder({ step, compact = false }: Props) {
  const visible = VISIBLE[Math.min(step, 4)] ?? VISIBLE[4]
  const selected = SELECTED[Math.min(step, 4)] ?? null
  const labelColor = step <= 1 ? GREEN : step === 3 ? '#f5c542' : GREEN

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 14 }}>
      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          style={{
            background: `${labelColor}22`,
            border: `1px solid ${labelColor}55`,
            borderRadius: 6,
            padding: compact ? '4px 10px' : '5px 14px',
            fontSize: compact ? 10 : 11,
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            color: labelColor,
            letterSpacing: '0.3px',
            textAlign: 'center',
          }}
        >
          {stepLabels[Math.min(step, 4)]}
        </motion.div>
      </AnimatePresence>

      {/* Tree levels */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
        {LEVELS.map((levelIds, lvlIdx) => {
          const anyVisible = levelIds.some(id => visible.includes(id))
          const prevLevelHasVisible = lvlIdx === 0 ? false : LEVELS[lvlIdx - 1].some(id => visible.includes(id))
          const showConnector = anyVisible && prevLevelHasVisible
          const visibleCount = levelIds.filter(id => visible.includes(id)).length

          return (
            <div key={lvlIdx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, width: '100%' }}>
              <AnimatePresence>
                {showConnector && (
                  <BranchConnector
                    key={`connector-${lvlIdx}`}
                    show={showConnector}
                    childCount={visibleCount}
                    compact={compact}
                  />
                )}
              </AnimatePresence>
              <TreeLevel
                nodeIds={levelIds}
                visible={visible}
                selected={selected}
                compact={compact}
              />
            </div>
          )
        })}
      </div>

      {/* Step hints */}
      <AnimatePresence>
        {step === 3 && (
          <motion.div
            key="select-hint"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              fontSize: compact ? 9 : 10,
              fontFamily: 'var(--font-mono)',
              color: '#f5c542',
              opacity: 0.85,
            }}
          >
            {'document.querySelector("h1")  →  <h1>'}
          </motion.div>
        )}
        {step === 4 && (
          <motion.div
            key="insert-hint"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              fontSize: compact ? 9 : 10,
              fontFamily: 'var(--font-mono)',
              color: '#f5c542',
              opacity: 0.85,
            }}
          >
            {'p.appendChild(span)  →  live!'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
