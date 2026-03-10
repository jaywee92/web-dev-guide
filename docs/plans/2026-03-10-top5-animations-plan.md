# Top 5 Visual Animations Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build 4 new pictorial animations (DomTreeBuilder, FlexboxViz, ComponentsViz, FetchViz) and upgrade EventLoopViz with richer visuals — each using a distinct visual metaphor for the concept.

**Architecture:** Each animation is a standalone TSX component in `src/topics/<category>/`. They accept `{ step: number; compact?: boolean }` and use Framer Motion + SVG + Lucide icons. No new npm packages. All animations must work in both normal and compact mode (compact = smaller sizes used in homepage hover-preview).

**Tech Stack:** React 18, TypeScript, Framer Motion (`motion`, `AnimatePresence`, `layout` prop), Lucide React (Monitor, Server icons), inline styles, SVG.

---

## Shared Patterns (read before implementing any task)

Every animation follows these conventions:

```tsx
import { motion, AnimatePresence } from 'framer-motion'
interface Props { step: number; compact?: boolean }

// Step labels array (5 entries, indices 0-4)
const stepLabels = ['...', '...', '...', '...', '...']

// Label badge at top of every animation:
<AnimatePresence mode="wait">
  <motion.div
    key={step}
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 8 }}
    style={{
      background: `${color}22`, border: `1px solid ${color}55`,
      borderRadius: 6, padding: compact ? '4px 10px' : '5px 14px',
      fontSize: compact ? 10 : 11, fontFamily: 'var(--font-mono)',
      fontWeight: 700, color, letterSpacing: '0.3px', textAlign: 'center',
    }}
  >
    {stepLabels[Math.min(step, 4)]}
  </motion.div>
</AnimatePresence>

// Spring transition used throughout:
{ type: 'spring', stiffness: 300, damping: 22 }
// Bounce ease for "snap" effects:
[0.34, 1.56, 0.64, 1]
```

**Build command after each task:**
```bash
cd /home/jaywee92/web-dev-guide && npm run build 2>&1 | tail -5
```
Expected: `✓ built in ...s` — no `error TS` lines.

---

## Task 1: DomTreeBuilder — Growing HTML Tree

**Files:**
- Modify: `src/topics/html/DomTreeBuilder.tsx` (currently a stub)

**Step 1: Replace the stub with the full implementation**

```tsx
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

// Layout: each "level" of the tree is a row
// Level 0: html
// Level 1: head, body
// Level 2: title, h1, p
// Level 3: span
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

// SVG connector line between parent and child row center
function ConnectorLines({ visible, compact }: { visible: string[]; compact: boolean }) {
  const gap = compact ? 28 : 36  // vertical gap between rows

  // Define connections as [parentId, childId] pairs
  const connections: [string, string][] = [
    ['html', 'head'], ['html', 'body'],
    ['head', 'title'], ['body', 'h1'], ['body', 'p'],
    ['p', 'span'],
  ]

  // Only render visible connections
  const activeConnections = connections.filter(
    ([p, c]) => visible.includes(p) && visible.includes(c)
  )

  if (activeConnections.length === 0) return null

  // We draw this as a simple visual hint — a short vertical line per connection
  // The actual positions are approximate since we use CSS layout
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {/* Connector lines are handled by the layout itself via border-left dashes */}
    </div>
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
        // Dim siblings when something is selected
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

// A vertical connector line between levels
function LevelConnector({ show, compact }: { show: boolean; compact: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="connector"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          exit={{ scaleY: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            width: 1,
            height: compact ? 12 : 16,
            background: 'var(--border)',
            transformOrigin: 'top',
            margin: '0 auto',
          }}
        />
      )}
    </AnimatePresence>
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
          // Show level connector line if any node in this level is visible AND the previous level has visible nodes
          const anyVisible = levelIds.some(id => visible.includes(id))
          const prevLevelHasVisible = lvlIdx === 0 ? false : LEVELS[lvlIdx - 1].some(id => visible.includes(id))
          const showConnector = anyVisible && prevLevelHasVisible

          return (
            <div key={lvlIdx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
              <LevelConnector show={showConnector} compact={compact} />
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

      {/* Step 3: selection hint */}
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
```

**Step 2: Build**
```bash
cd /home/jaywee92/web-dev-guide && npm run build 2>&1 | tail -5
```
Expected: `✓ built in ...s`

**Step 3: Commit**
```bash
git add src/topics/html/DomTreeBuilder.tsx
git commit -m "feat: DomTreeBuilder — growing HTML tree with node selection animation"
```

---

## Task 2: FlexboxViz — Live Layout Demo

**Files:**
- Modify: `src/topics/css/FlexboxViz.tsx` (currently a stub)

**Step 1: Replace the stub with the full implementation**

```tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const CSS_BLUE = '#5b9cf5'

const stepLabels = [
  'Flexbox: display: flex makes children flex items',
  'flex-direction controls the main axis',
  'justify-content distributes space on main axis',
  'align-items aligns items on the cross axis',
  'flex-wrap allows items to wrap to new lines',
]

const ITEM_COLORS = ['#4ade80', '#5b9cf5', '#f472b6', '#f5c542', '#a78bfa']

interface FlexConfig {
  flexDirection: 'row' | 'column'
  justifyContent: string
  alignItems: string
  flexWrap: 'nowrap' | 'wrap'
  itemCount: number
  cssRule: string
}

const CONFIGS: FlexConfig[] = [
  {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'nowrap',
    itemCount: 3,
    cssRule: 'display: flex',
  },
  {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'nowrap',
    itemCount: 3,
    cssRule: 'flex-direction: column',
  },
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'nowrap',
    itemCount: 3,
    cssRule: 'justify-content: space-between',
  },
  {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
    itemCount: 3,
    cssRule: 'align-items: center',
  },
  {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    itemCount: 5,
    cssRule: 'flex-wrap: wrap',
  },
]

export default function FlexboxViz({ step, compact = false }: Props) {
  const config = CONFIGS[Math.min(step, CONFIGS.length - 1)]
  const containerSize = compact ? 160 : 200
  const itemSize = compact ? 28 : 36

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
            background: `${CSS_BLUE}22`,
            border: `1px solid ${CSS_BLUE}55`,
            borderRadius: 6,
            padding: compact ? '4px 10px' : '5px 14px',
            fontSize: compact ? 10 : 11,
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            color: CSS_BLUE,
            letterSpacing: '0.3px',
            textAlign: 'center',
          }}
        >
          {stepLabels[Math.min(step, 4)]}
        </motion.div>
      </AnimatePresence>

      {/* CSS rule badge */}
      <AnimatePresence mode="wait">
        <motion.div
          key={config.cssRule}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          style={{
            background: 'rgba(0,0,0,0.3)',
            border: `1px solid ${CSS_BLUE}44`,
            borderRadius: 5,
            padding: compact ? '3px 8px' : '4px 10px',
            fontSize: compact ? 10 : 12,
            fontFamily: 'var(--font-mono)',
            color: '#f5c542',
          }}
        >
          .container {'{'} {config.cssRule} {'}'}
        </motion.div>
      </AnimatePresence>

      {/* Flex container */}
      <div
        style={{
          width: containerSize,
          height: containerSize,
          border: `2px dashed ${CSS_BLUE}66`,
          borderRadius: 8,
          background: `${CSS_BLUE}08`,
          display: 'flex',
          flexDirection: config.flexDirection,
          justifyContent: config.justifyContent,
          alignItems: config.alignItems,
          flexWrap: config.flexWrap,
          padding: 8,
          gap: compact ? 4 : 6,
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        {/* Container label */}
        <span style={{
          position: 'absolute',
          top: 4,
          left: 6,
          fontSize: 8,
          fontFamily: 'var(--font-mono)',
          color: `${CSS_BLUE}88`,
          fontWeight: 700,
          letterSpacing: '0.3px',
          textTransform: 'uppercase',
          pointerEvents: 'none',
        }}>
          flex container
        </span>

        <AnimatePresence>
          {Array.from({ length: config.itemCount }).map((_, i) => (
            <motion.div
              key={i}
              layout
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25, layout: { duration: 0.4 } }}
              style={{
                width: itemSize,
                height: itemSize,
                background: ITEM_COLORS[i % ITEM_COLORS.length],
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: compact ? 9 : 11,
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                color: '#0f0f1a',
                flexShrink: 0,
              }}
            >
              {String.fromCharCode(65 + i)}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
```

**Step 2: Build**
```bash
cd /home/jaywee92/web-dev-guide && npm run build 2>&1 | tail -5
```
Expected: `✓ built in ...s`

**Step 3: Commit**
```bash
git add src/topics/css/FlexboxViz.tsx
git commit -m "feat: FlexboxViz — live flex container with layout animation"
```

---

## Task 3: EventLoopViz — Visual Upgrade

**Files:**
- Modify: `src/topics/javascript/EventLoopViz.tsx` (upgrade existing)

**What changes:** Add glowing active zones, a visual timer bubble in Web APIs, animated SVG arrow path between Task Queue and Call Stack, and a conveyor-belt feel for queue items sliding in from right.

**Step 1: Replace the entire file with the upgraded version**

```tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const PURPLE = '#a78bfa'
const BLUE = '#5b9cf5'
const GREEN = '#4ade80'
const YELLOW = '#f5c542'

const stepLabels = [
  'JavaScript runs on a single thread',
  'Synchronous code executes on the Call Stack',
  'setTimeout moves its callback to Web APIs — timer starts',
  'When timer fires, callback enters the Task Queue',
  'Event Loop moves callback to Call Stack when it\'s empty',
]

const callStackItems: Record<number, string[]> = {
  0: [], 1: ["console.log('start')", 'main()'], 2: ['main()'], 3: ["console.log('end')", 'main()'], 4: ['callback()', 'main()'],
}
const webApiItems: Record<number, { label: string; timer: string } | null> = {
  0: null, 1: null, 2: { label: 'setTimeout', timer: '100ms' }, 3: null, 4: null,
}
const taskQueueItems: Record<number, string[]> = {
  0: [], 1: [], 2: [], 3: ['callback'], 4: [],
}
const activeZone: Record<number, 'stack' | 'webapi' | 'queue' | 'loop' | null> = {
  0: null, 1: 'stack', 2: 'webapi', 3: 'queue', 4: 'loop',
}

function StackColumn({ items, active, compact }: { items: string[]; active: boolean; compact: boolean }) {
  const w = compact ? 100 : 130
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <span style={{ fontSize: compact ? 9 : 10, fontFamily: 'var(--font-mono)', fontWeight: 700, color: PURPLE, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
        Call Stack
      </span>
      <motion.div
        animate={{ boxShadow: active ? `0 0 16px ${PURPLE}66` : '0 0 0px transparent' }}
        transition={{ duration: 0.4 }}
        style={{
          width: w,
          minHeight: compact ? 80 : 100,
          border: `2px solid ${PURPLE}${active ? 'cc' : '44'}`,
          borderRadius: 8,
          background: `${PURPLE}${active ? '18' : '0d'}`,
          display: 'flex',
          flexDirection: 'column-reverse',
          padding: 5,
          gap: 3,
          boxSizing: 'border-box',
          transition: 'border-color 0.3s, background 0.3s',
        }}
      >
        <AnimatePresence>
          {items.map((item, i) => (
            <motion.div
              key={item + i}
              initial={{ opacity: 0, y: 16, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.88 }}
              transition={{ type: 'spring', stiffness: 320, damping: 24 }}
              style={{
                background: PURPLE,
                borderRadius: 4,
                padding: compact ? '2px 5px' : '4px 8px',
                fontSize: compact ? 8 : 9,
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                color: '#0f0f1a',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {item}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

function WebApiZone({ item, active, compact }: { item: { label: string; timer: string } | null; active: boolean; compact: boolean }) {
  const w = compact ? 90 : 110
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <span style={{ fontSize: compact ? 9 : 10, fontFamily: 'var(--font-mono)', fontWeight: 700, color: BLUE, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
        Web APIs
      </span>
      <motion.div
        animate={{ boxShadow: active ? `0 0 16px ${BLUE}66` : '0 0 0px transparent' }}
        style={{
          width: w,
          minHeight: compact ? 50 : 64,
          border: `2px dashed ${BLUE}${active ? 'cc' : '44'}`,
          borderRadius: 8,
          background: `${BLUE}${active ? '18' : '0d'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 6,
          boxSizing: 'border-box',
          transition: 'border-color 0.3s, background 0.3s',
        }}
      >
        <AnimatePresence>
          {item && (
            <motion.div
              key="webapi-item"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1, boxShadow: [`0 0 0px ${BLUE}00`, `0 0 14px ${BLUE}aa`, `0 0 0px ${BLUE}00`] }}
              exit={{ opacity: 0, scale: 0.7, y: 12 }}
              transition={{ duration: 0.4, boxShadow: { repeat: Infinity, duration: 1.2 } }}
              style={{
                background: `${BLUE}22`,
                border: `1.5px solid ${BLUE}`,
                borderRadius: 6,
                padding: compact ? '4px 6px' : '6px 10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <span style={{ fontSize: compact ? 8 : 9, fontFamily: 'var(--font-mono)', fontWeight: 700, color: BLUE }}>{item.label}</span>
              <motion.span
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                style={{ fontSize: compact ? 7 : 8, fontFamily: 'var(--font-mono)', color: YELLOW }}
              >
                ⏱ {item.timer}
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

function QueueColumn({ items, active, compact }: { items: string[]; active: boolean; compact: boolean }) {
  const w = compact ? 90 : 110
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <span style={{ fontSize: compact ? 9 : 10, fontFamily: 'var(--font-mono)', fontWeight: 700, color: GREEN, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
        Task Queue
      </span>
      <motion.div
        animate={{ boxShadow: active ? `0 0 16px ${GREEN}66` : '0 0 0px transparent' }}
        style={{
          width: w,
          minHeight: compact ? 50 : 64,
          border: `2px solid ${GREEN}${active ? 'cc' : '44'}`,
          borderRadius: 8,
          background: `${GREEN}${active ? '18' : '0d'}`,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: 5,
          gap: 3,
          boxSizing: 'border-box',
          transition: 'border-color 0.3s, background 0.3s',
        }}
      >
        <AnimatePresence>
          {items.map((item, i) => (
            <motion.div
              key={item + i}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              style={{
                background: GREEN,
                borderRadius: 4,
                padding: compact ? '3px 5px' : '4px 8px',
                fontSize: compact ? 8 : 9,
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                color: '#0f0f1a',
                whiteSpace: 'nowrap',
              }}
            >
              {item}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

function EventLoopIndicator({ active, compact }: { active: boolean; compact: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: compact ? '0 4px' : '0 8px' }}>
      <motion.div
        animate={active ? { rotate: 360, color: GREEN } : { rotate: 0, color: '#4b5563' }}
        transition={active ? { repeat: Infinity, duration: 1.0, ease: 'linear' } : { duration: 0 }}
        style={{ fontSize: compact ? 18 : 24, lineHeight: 1 }}
      >
        ↻
      </motion.div>
      <span style={{ fontSize: compact ? 7 : 8, fontFamily: 'var(--font-mono)', color: active ? GREEN : '#4b5563', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
        event loop
      </span>
    </div>
  )
}

export default function EventLoopViz({ step, compact = false }: Props) {
  const stackItems = callStackItems[Math.min(step, 4)] ?? []
  const webItem = webApiItems[Math.min(step, 4)] ?? null
  const queueItems = taskQueueItems[Math.min(step, 4)] ?? []
  const zone = activeZone[Math.min(step, 4)]
  const labelColor = zone === 'stack' ? PURPLE : zone === 'webapi' ? BLUE : zone === 'queue' || zone === 'loop' ? GREEN : '#6b7280'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 14 }}>
      {/* Label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          style={{
            background: `${labelColor}22`, border: `1px solid ${labelColor}55`,
            borderRadius: 6, padding: compact ? '4px 10px' : '5px 14px',
            fontSize: compact ? 10 : 11, fontFamily: 'var(--font-mono)',
            fontWeight: 700, color: labelColor, letterSpacing: '0.3px', textAlign: 'center',
          }}
        >
          {stepLabels[Math.min(step, 4)]}
        </motion.div>
      </AnimatePresence>

      {/* Main diagram */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: compact ? 6 : 8 }}>
        <StackColumn items={stackItems} active={zone === 'stack' || zone === 'loop'} compact={compact} />
        <EventLoopIndicator active={zone === 'loop'} compact={compact} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 8, alignItems: 'center' }}>
          <QueueColumn items={queueItems} active={zone === 'queue'} compact={compact} />
          <WebApiZone item={webItem} active={zone === 'webapi'} compact={compact} />
        </div>
      </div>
    </div>
  )
}
```

**Step 2: Build**
```bash
cd /home/jaywee92/web-dev-guide && npm run build 2>&1 | tail -5
```
Expected: `✓ built in ...s`

**Step 3: Commit**
```bash
git add src/topics/javascript/EventLoopViz.tsx
git commit -m "feat: EventLoopViz upgrade — glowing zones, timer bubble, conveyor queue"
```

---

## Task 4: ComponentsViz — Lego Brick Snap Animation

**Files:**
- Modify: `src/topics/react/ComponentsViz.tsx` (currently a stub)

**Step 1: Replace the stub with the full implementation**

```tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const PINK = '#f472b6'
const BLUE = '#5b9cf5'
const PURPLE = '#a78bfa'
const GREEN = '#4ade80'

const stepLabels = [
  'A React component is a reusable building block',
  'Components can be composed — used inside each other',
  'Navigation is a component too — add it to the top',
  'Compose all components inside a root <App> component',
  'Parent passes data to children via props',
]

interface ComponentDef {
  id: string
  label: string
  color: string
  width: number
  studs: number
}

const COMPONENTS: ComponentDef[] = [
  { id: 'button', label: '<Button />', color: PINK,   width: 80,  studs: 2 },
  { id: 'card',   label: '<Card />',   color: PURPLE, width: 110, studs: 3 },
  { id: 'nav',    label: '<Nav />',    color: BLUE,   width: 160, studs: 4 },
]

const VISIBLE: Record<number, string[]> = {
  0: ['button'],
  1: ['button', 'card'],
  2: ['button', 'card', 'nav'],
  3: ['button', 'card', 'nav'],
  4: ['button', 'card', 'nav'],
}

// Lego stud — small circle on top of a block
function Studs({ count, color }: { count: number; color: string }) {
  return (
    <div style={{ display: 'flex', gap: 4, position: 'absolute', top: -5, left: 8 }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          width: 8, height: 8,
          borderRadius: '50%',
          background: color,
          border: `1.5px solid ${color}cc`,
          boxShadow: `0 1px 3px ${color}44`,
        }} />
      ))}
    </div>
  )
}

function ComponentBlock({ def, compact }: { def: ComponentDef; compact: boolean }) {
  const h = compact ? 28 : 36
  const w = compact ? def.width * 0.7 : def.width
  const studs = Math.max(1, Math.round(def.studs * (compact ? 0.7 : 1)))

  return (
    <div style={{ position: 'relative', paddingTop: 8 }}>
      <Studs count={studs} color={def.color} />
      <div style={{
        width: w,
        height: h,
        background: `${def.color}22`,
        border: `2px solid ${def.color}`,
        borderRadius: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: compact ? 8 : 10,
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        color: def.color,
        boxShadow: `0 3px 0 ${def.color}55, 0 4px 8px ${def.color}22`,
      }}>
        {def.label}
      </div>
    </div>
  )
}

function PropArrow({ from, to, label, compact }: { from: string; to: string; label: string; compact: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        fontSize: compact ? 8 : 9,
        fontFamily: 'var(--font-mono)',
        color: GREEN,
      }}
    >
      <span style={{ opacity: 0.6 }}>{from}</span>
      <motion.span
        animate={{ x: [0, 4, 0] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
      >
        →
      </motion.span>
      <span style={{
        background: `${GREEN}18`,
        border: `1px solid ${GREEN}55`,
        borderRadius: 4,
        padding: '1px 5px',
        color: GREEN,
      }}>
        {label}
      </span>
      <span style={{ opacity: 0.6 }}>{to}</span>
    </motion.div>
  )
}

export default function ComponentsViz({ step, compact = false }: Props) {
  const visible = VISIBLE[Math.min(step, 4)]
  const showApp = step >= 3
  const showProps = step >= 4
  const labelColor = step <= 1 ? PINK : step === 2 ? BLUE : PURPLE

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
            background: `${labelColor}22`, border: `1px solid ${labelColor}55`,
            borderRadius: 6, padding: compact ? '4px 10px' : '5px 14px',
            fontSize: compact ? 10 : 11, fontFamily: 'var(--font-mono)',
            fontWeight: 700, color: labelColor, letterSpacing: '0.3px', textAlign: 'center',
          }}
        >
          {stepLabels[Math.min(step, 4)]}
        </motion.div>
      </AnimatePresence>

      {/* App wrapper appears at step 3 */}
      <AnimatePresence>
        {showApp ? (
          <motion.div
            key="app-wrapper"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            style={{
              border: `2px dashed ${PURPLE}66`,
              borderRadius: 10,
              padding: compact ? '12px 10px 8px' : '16px 14px 10px',
              background: `${PURPLE}08`,
              position: 'relative',
            }}
          >
            <span style={{
              position: 'absolute', top: -10, left: 12,
              background: 'var(--surface)',
              padding: '0 6px',
              fontSize: compact ? 8 : 10,
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              color: PURPLE,
            }}>
              {'<App />'}
            </span>
            <ComponentsInner visible={visible} compact={compact} />
          </motion.div>
        ) : (
          <ComponentsInner key="no-app" visible={visible} compact={compact} />
        )}
      </AnimatePresence>

      {/* Props arrows at step 4 */}
      <AnimatePresence>
        {showProps && (
          <motion.div
            key="props"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: compact ? 3 : 4 }}
          >
            <PropArrow from="App" to="Button" label="color={pink}" compact={compact} />
            <PropArrow from="App" to="Nav" label='title="Home"' compact={compact} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ComponentsInner({ visible, compact }: { visible: string[]; compact: boolean }) {
  const allDefs = COMPONENTS.filter(c => visible.includes(c.id))
  const nav = allDefs.find(c => c.id === 'nav')
  const rest = allDefs.filter(c => c.id !== 'nav')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 6 : 8 }}>
      {/* Nav on top */}
      <AnimatePresence>
        {nav && (
          <motion.div
            key="nav"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          >
            <ComponentBlock def={nav} compact={compact} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button and Card side by side */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: compact ? 6 : 10, alignItems: 'flex-end' }}>
        <AnimatePresence>
          {rest.map(def => (
            <motion.div
              key={def.id}
              initial={{ opacity: 0, scale: 0.6, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <ComponentBlock def={def} compact={compact} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
```

**Step 2: Build**
```bash
cd /home/jaywee92/web-dev-guide && npm run build 2>&1 | tail -5
```
Expected: `✓ built in ...s`

**Step 3: Commit**
```bash
git add src/topics/react/ComponentsViz.tsx
git commit -m "feat: ComponentsViz — Lego brick snap animation with props flow"
```

---

## Task 5: FetchViz — Data Packet Journey

**Files:**
- Modify: `src/topics/webapis/FetchViz.tsx` (currently a stub)

**Step 1: Replace the stub with the full implementation**

```tsx
import { motion, AnimatePresence } from 'framer-motion'
import { Monitor, Server } from 'lucide-react'

interface Props { step: number; compact?: boolean }

const BLUE = '#5b9cf5'
const GREEN = '#4ade80'
const YELLOW = '#f5c542'
const ORANGE = '#fb923c'

const stepLabels = [
  'fetch() sends an HTTP request from the browser',
  'The request travels over the network to the server',
  'The server processes the request',
  'The server sends back a response with data',
  'The browser receives JSON data — promise resolves',
]

const JSON_LINES = [
  '{ "users": [',
  '  { "id": 1, "name": "Ana" },',
  '  { "id": 2, "name": "Ben" }',
  ']}'
]

export default function FetchViz({ step, compact = false }: Props) {
  const iconSize = compact ? 20 : 28
  const boxSize = compact ? 44 : 56
  const pathWidth = compact ? 100 : 140
  const labelColor = step <= 1 ? BLUE : step === 2 ? YELLOW : step === 3 ? ORANGE : GREEN

  // Packet direction: 0-1 = going right, 2 = stationary at server, 3 = going left, 4 = arrived
  const showPacket = step >= 1 && step <= 3
  const packetGoingRight = step === 1
  const packetAtServer = step === 2
  const packetGoingLeft = step === 3
  const showJson = step >= 4

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
            background: `${labelColor}22`, border: `1px solid ${labelColor}55`,
            borderRadius: 6, padding: compact ? '4px 10px' : '5px 14px',
            fontSize: compact ? 10 : 11, fontFamily: 'var(--font-mono)',
            fontWeight: 700, color: labelColor, letterSpacing: '0.3px', textAlign: 'center',
          }}
        >
          {stepLabels[Math.min(step, 4)]}
        </motion.div>
      </AnimatePresence>

      {/* fetch() badge */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.div
            key="fetch-badge"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              fontSize: compact ? 9 : 11,
              fontFamily: 'var(--font-mono)',
              color: YELLOW,
              background: `${YELLOW}14`,
              border: `1px solid ${YELLOW}44`,
              borderRadius: 4,
              padding: compact ? '2px 7px' : '3px 10px',
            }}
          >
            {"fetch('/api/users')"}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main diagram: Browser — path — Server */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, position: 'relative' }}>
        {/* Browser node */}
        <motion.div
          animate={{ boxShadow: step === 0 || step >= 4 ? `0 0 16px ${BLUE}66` : '0 0 0px transparent' }}
          style={{
            width: boxSize, height: boxSize,
            background: `${BLUE}18`,
            border: `2px solid ${BLUE}${step === 0 || step >= 4 ? 'cc' : '66'}`,
            borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            transition: 'border-color 0.3s',
          }}
        >
          <Monitor size={iconSize} color={BLUE} />
        </motion.div>

        {/* Path with animated packet */}
        <div style={{ width: pathWidth, position: 'relative', height: compact ? 24 : 32, display: 'flex', alignItems: 'center' }}>
          {/* Dashed line */}
          <div style={{
            position: 'absolute',
            left: 0, right: 0,
            height: 2,
            backgroundImage: `repeating-linear-gradient(90deg, ${BLUE}44 0px, ${BLUE}44 6px, transparent 6px, transparent 12px)`,
          }} />

          {/* Animated packet */}
          <AnimatePresence mode="wait">
            {packetGoingRight && (
              <motion.div
                key="packet-right"
                initial={{ x: 0, opacity: 0 }}
                animate={{ x: pathWidth - 12, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  left: 0,
                  width: 12, height: 10,
                  background: BLUE,
                  borderRadius: 2,
                }}
              />
            )}
            {packetAtServer && (
              <motion.div
                key="packet-server"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ repeat: Infinity, duration: 0.7 }}
                style={{
                  position: 'absolute',
                  right: 0,
                  width: 12, height: 10,
                  background: YELLOW,
                  borderRadius: 2,
                }}
              />
            )}
            {packetGoingLeft && (
              <motion.div
                key="packet-left"
                initial={{ x: pathWidth - 12, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  left: 0,
                  width: 12, height: 10,
                  background: GREEN,
                  borderRadius: 2,
                }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Server node */}
        <motion.div
          animate={{ boxShadow: step === 2 ? `0 0 16px ${YELLOW}66` : step === 3 ? `0 0 16px ${GREEN}44` : '0 0 0px transparent' }}
          style={{
            width: boxSize, height: boxSize,
            background: step === 2 ? `${YELLOW}18` : `${GREEN}18`,
            border: `2px solid ${step === 2 ? YELLOW : GREEN}${step >= 2 && step <= 3 ? 'cc' : '66'}`,
            borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            transition: 'border-color 0.3s, background 0.3s',
            position: 'relative',
          }}
        >
          <Server size={iconSize} color={step === 2 ? YELLOW : GREEN} />
          {/* Thinking spinner */}
          <AnimatePresence>
            {step === 2 && (
              <motion.div
                key="spinner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                exit={{ opacity: 0 }}
                transition={{ rotate: { repeat: Infinity, duration: 0.8, ease: 'linear' } }}
                style={{
                  position: 'absolute',
                  top: -8, right: -8,
                  fontSize: 12,
                  color: YELLOW,
                }}
              >
                ⟳
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Node labels */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: boxSize * 2 + pathWidth, paddingBottom: 2 }}>
        <span style={{ fontSize: compact ? 8 : 9, fontFamily: 'var(--font-mono)', color: BLUE, width: boxSize, textAlign: 'center' }}>browser</span>
        <span style={{ fontSize: compact ? 8 : 9, fontFamily: 'var(--font-mono)', color: GREEN, width: boxSize, textAlign: 'center' }}>server</span>
      </div>

      {/* JSON response unrolls at step 4 */}
      <AnimatePresence>
        {showJson && (
          <motion.div
            key="json-block"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0 }}
            style={{
              background: 'rgba(0,0,0,0.3)',
              border: `1px solid ${GREEN}44`,
              borderRadius: 6,
              padding: compact ? '5px 10px' : '8px 14px',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {JSON_LINES.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.25 }}
                  style={{
                    fontSize: compact ? 8 : 10,
                    fontFamily: 'var(--font-mono)',
                    color: i === 0 || i === JSON_LINES.length - 1 ? GREEN : '#e2e8f0',
                    whiteSpace: 'pre',
                  }}
                >
                  {line}
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 }}
              style={{
                marginTop: compact ? 4 : 6,
                display: 'inline-block',
                background: `${GREEN}22`,
                border: `1px solid ${GREEN}`,
                borderRadius: 4,
                padding: compact ? '2px 6px' : '2px 8px',
                fontSize: compact ? 8 : 10,
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                color: GREEN,
              }}
            >
              200 OK
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
```

**Step 2: Build**
```bash
cd /home/jaywee92/web-dev-guide && npm run build 2>&1 | tail -5
```
Expected: `✓ built in ...s`

**Step 3: Commit**
```bash
git add src/topics/webapis/FetchViz.tsx
git commit -m "feat: FetchViz — animated data packet journey with JSON response reveal"
```

---

## Summary

| Task | File | What it builds |
|------|------|----------------|
| 1 | `html/DomTreeBuilder.tsx` | Growing node tree with SVG branches and selection glow |
| 2 | `css/FlexboxViz.tsx` | Live flex container with Framer Motion layout animation |
| 3 | `javascript/EventLoopViz.tsx` | Upgrade: glowing zones, timer bubble, conveyor queue |
| 4 | `react/ComponentsViz.tsx` | Lego bricks snapping together with props arrows |
| 5 | `webapis/FetchViz.tsx` | Packet journey with Monitor/Server icons + JSON reveal |
