import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const NODE_COLOR  = '#5b9cf5'   // blue   — document / Node
const EL_COLOR    = '#4ade80'   // green  — HTML elements
const TEXT_COLOR  = '#f5c542'   // yellow — text nodes
const SEL_COLOR   = '#67e8f9'   // cyan   — selected / highlighted element
const BADGE_COLOR = '#a78bfa'   // purple — method badges

const mono = 'var(--font-mono)'

const stepLabels = [
  'DOM Tree Structure — HTML becomes a tree of nodes',
  'Selecting Elements — querySelector finds the element you need',
  'Creating Elements — createElement builds a new node',
  'Reading & Changing Properties — textContent, classList, style',
  'DOM Interfaces — Node, Element, HTMLElement hierarchy',
  'closest() & matches() — traversal and filtering',
  'NodeList vs Array — querySelectorAll does not return an Array',
  'classList Advanced — toggle, replace, force parameter',
  'data-* Attributes — store state directly on HTML elements',
]

function NodeBox({ label, color, glow, compact, style: extra }: {
  label: string; color: string; glow?: boolean; compact: boolean; style?: React.CSSProperties
}) {
  return (
    <motion.div
      animate={glow
        ? { boxShadow: [`0 0 0px ${color}00`, `0 0 16px ${color}bb`, `0 0 0px ${color}00`] }
        : { boxShadow: `0 0 6px ${color}33` }
      }
      transition={glow ? { repeat: Infinity, duration: 0.9, ease: 'easeInOut' } : { duration: 0.3 }}
      style={{
        border: `2px solid ${color}`, background: `${color}18`, borderRadius: 6,
        padding: compact ? '4px 9px' : '6px 12px', fontFamily: mono,
        fontSize: compact ? 9 : 11, fontWeight: 700, color, textAlign: 'center' as const,
        ...extra,
      }}
    >
      {label}
    </motion.div>
  )
}

function Badge({ label, color = BADGE_COLOR, compact }: { label: string; color?: string; compact: boolean }) {
  return (
    <div style={{
      display: 'inline-block', padding: compact ? '2px 7px' : '3px 10px',
      background: `${color}18`, border: `1px solid ${color}66`,
      borderRadius: 5, fontFamily: mono, fontSize: compact ? 9 : 11, color, fontWeight: 600,
    }}>
      {label}
    </div>
  )
}

export default function DomViz({ step, compact = false }: Props) {
  const s = Math.min(step, 8)
  const panelW = compact ? 220 : 300

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 8 : 14, width: panelW }}>
      <AnimatePresence mode="wait">

        {/* Step 0: DOM tree building — nodes appear one by one */}
        {s === 0 && (
          <motion.div key="s0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}
          >
            {[
              { label: 'document', color: NODE_COLOR, indent: 0 },
              { label: '<html>', color: EL_COLOR, indent: 1 },
              { label: '<body>', color: EL_COLOR, indent: 2 },
              { label: '<h1>', color: EL_COLOR, indent: 3 },
              { label: '"Hello"', color: TEXT_COLOR, indent: 4 },
              { label: '<ul>', color: EL_COLOR, indent: 3 },
              { label: '<li>', color: EL_COLOR, indent: 4 },
            ].map(({ label, color, indent }, i) => (
              <motion.div key={label}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{ paddingLeft: indent * (compact ? 12 : 18), display: 'flex' }}
              >
                <NodeBox label={label} color={color} compact={compact} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 1: querySelector — matching element lights up cyan */}
        {s === 1 && (
          <motion.div key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}
          >
            {[
              { label: 'document', color: NODE_COLOR, sel: false, indent: 0 },
              { label: '<body>', color: EL_COLOR, sel: false, indent: 1 },
              { label: '<ul class="menu">', color: EL_COLOR, sel: false, indent: 2 },
              { label: '<li class="item">', color: SEL_COLOR, sel: true, indent: 3 },
            ].map(({ label, color, sel, indent }, i) => (
              <motion.div key={label}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                style={{ paddingLeft: indent * (compact ? 12 : 18), display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <NodeBox label={label} color={color} glow={sel} compact={compact} />
                {sel && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                    style={{ fontFamily: mono, fontSize: compact ? 9 : 10, color: SEL_COLOR }}
                  >
                    ← querySelector('.item')
                  </motion.span>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 2: createElement — new node snaps into tree */}
        {s === 2 && (
          <motion.div key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, width: '100%' }}>
              <NodeBox label="<ul>" color={EL_COLOR} compact={compact} />
              <div style={{ paddingLeft: compact ? 16 : 22, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <NodeBox label="<li>Item 1</li>" color={EL_COLOR} compact={compact} />
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.4, type: 'spring', stiffness: 260, damping: 20 }}
                >
                  <NodeBox label="<li>Item 2</li>" color={SEL_COLOR} compact={compact} />
                </motion.div>
              </div>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
              style={{ fontFamily: mono, fontSize: compact ? 9 : 10, color: SEL_COLOR, textAlign: 'center' as const }}
            >
              createElement + appendChild
            </motion.div>
          </motion.div>
        )}

        {/* Step 3: textContent & classList live updates */}
        {s === 3 && (
          <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: compact ? 10 : 14, alignItems: 'center', width: '100%' }}
          >
            {[
              { label: 'el.textContent = "New Title"', color: TEXT_COLOR },
              { label: 'el.classList.add("active")', color: EL_COLOR },
              { label: 'el.classList.remove("hidden")', color: '#f87171' },
              { label: 'el.style.color = "red"', color: '#fb923c' },
            ].map(({ label, color }, i) => (
              <motion.div key={label}
                initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{ width: '100%' }}
              >
                <Badge label={label} color={color} compact={compact} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 4: DOM Interfaces inheritance hierarchy */}
        {s === 4 && (
          <motion.div key="s4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 5, width: '100%' }}
          >
            {[
              { label: 'Node', color: NODE_COLOR, indent: 0, note: 'nodeType, childNodes, parentNode' },
              { label: 'Element', color: EL_COLOR, indent: 1, note: 'tagName, className, setAttribute' },
              { label: 'HTMLElement', color: BADGE_COLOR, indent: 2, note: 'style, dataset, offsetWidth' },
              { label: 'HTMLButtonElement', color: SEL_COLOR, indent: 3, note: 'disabled, type, click()' },
            ].map(({ label, color, indent, note }, i) => (
              <motion.div key={label}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{ paddingLeft: indent * (compact ? 14 : 20) }}
              >
                <NodeBox label={label} color={color} compact={compact} />
                {!compact && (
                  <div style={{ fontFamily: mono, fontSize: 9, color: '#64748b', paddingLeft: 6, marginTop: 2 }}>
                    {note}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 5: closest() traversal upward */}
        {s === 5 && (
          <motion.div key="s5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 5, width: '100%' }}
          >
            {[
              { label: '<section class="card">', color: SEL_COLOR, glow: true, indent: 0, note: "← closest('.card') ✓" },
              { label: '<div class="wrapper">', color: EL_COLOR, glow: false, indent: 1, note: '' },
              { label: '<span>', color: EL_COLOR, glow: false, indent: 2, note: '' },
              { label: '<button>', color: BADGE_COLOR, glow: false, indent: 3, note: '← start here' },
            ].map(({ label, color, glow, indent, note }, i) => (
              <motion.div key={label}
                initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{ paddingLeft: indent * (compact ? 12 : 18), display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <NodeBox label={label} color={color} glow={glow} compact={compact} />
                {note && (
                  <span style={{ fontFamily: mono, fontSize: compact ? 8 : 9, color: glow ? SEL_COLOR : '#64748b' }}>
                    {note}
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 6: NodeList vs Array */}
        {s === 6 && (
          <motion.div key="s6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', alignItems: 'center', gap: compact ? 8 : 14, width: '100%', justifyContent: 'center' }}
          >
            <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              style={{ border: '1px solid #334155', borderRadius: 8, padding: compact ? '8px 10px' : '12px 16px', textAlign: 'center' as const }}
            >
              <div style={{ fontFamily: mono, fontSize: compact ? 10 : 12, color: '#94a3b8', fontWeight: 700 }}>NodeList</div>
              <div style={{ fontFamily: mono, fontSize: compact ? 8 : 9, color: '#64748b', marginTop: 4 }}>
                .forEach() ✓<br />.map() ✗<br />.filter() ✗
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
              style={{ fontFamily: mono, fontSize: compact ? 11 : 16, color: SEL_COLOR, fontWeight: 700 }}
            >→</motion.div>
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}
              style={{ border: `1px solid ${EL_COLOR}66`, borderRadius: 8, padding: compact ? '8px 10px' : '12px 16px', textAlign: 'center' as const, background: `${EL_COLOR}08` }}
            >
              <div style={{ fontFamily: mono, fontSize: compact ? 10 : 12, color: EL_COLOR, fontWeight: 700 }}>Array</div>
              <div style={{ fontFamily: mono, fontSize: compact ? 8 : 9, color: EL_COLOR, marginTop: 4, opacity: 0.8 }}>
                .forEach() ✓<br />.map() ✓<br />.filter() ✓
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Step 7: classList advanced methods */}
        {s === 7 && (
          <motion.div key="s7" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: compact ? 8 : 12, width: '100%' }}
          >
            {[
              { label: '.toggle("dark")', note: 'add if absent, remove if present', color: EL_COLOR },
              { label: '.toggle("dark", true)', note: 'force = always add', color: BADGE_COLOR },
              { label: '.replace("old", "new")', note: 'atomic swap — no flash', color: SEL_COLOR },
              { label: '.add("a", "b", "c")', note: 'multiple classes at once', color: TEXT_COLOR },
            ].map(({ label, note, color }, i) => (
              <motion.div key={label}
                initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 2 }}
              >
                <Badge label={`classList${label}`} color={color} compact={compact} />
                {!compact && <div style={{ fontFamily: mono, fontSize: 9, color: '#64748b', paddingLeft: 4 }}>{note}</div>}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 8: data-* attributes */}
        {s === 8 && (
          <motion.div key="s8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: compact ? 10 : 16, alignItems: 'center', width: '100%' }}
          >
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              style={{
                fontFamily: mono, fontSize: compact ? 10 : 12,
                background: 'rgba(0,0,0,0.3)', border: `1px solid ${NODE_COLOR}44`,
                borderRadius: 7, padding: compact ? '8px 12px' : '10px 16px',
                color: NODE_COLOR, width: '100%', textAlign: 'center' as const,
              }}
            >
              {'<div data-user-id="42" data-role="admin">'}
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
              style={{ fontFamily: mono, fontSize: compact ? 14 : 20, color: SEL_COLOR }}
            >↓</motion.div>
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 5, width: '100%' }}
            >
              {[
                { code: 'el.dataset.userId', result: '"42"', color: EL_COLOR },
                { code: 'el.dataset.role', result: '"admin"', color: BADGE_COLOR },
                { code: 'el.dataset.newKey = "x"', result: 'sets data-new-key', color: TEXT_COLOR },
              ].map(({ code, result, color }) => (
                <div key={code} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: mono, fontSize: compact ? 9 : 11 }}>
                  <span style={{ color }}>{code}</span>
                  <span style={{ color: '#64748b' }}>→</span>
                  <span style={{ color: '#94a3b8' }}>{result}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Step label */}
      <motion.div
        key={`label-${s}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        style={{ fontFamily: mono, fontSize: compact ? 8 : 9, color: '#64748b', textAlign: 'center' as const, maxWidth: panelW, lineHeight: 1.4 }}
      >
        {stepLabels[s]}
      </motion.div>
    </div>
  )
}
