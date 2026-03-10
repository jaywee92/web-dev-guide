import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const BLUE = '#5b9cf5'
const GREEN = '#4ade80'
const PURPLE = '#a78bfa'
const YELLOW = '#f5c542'

const stepLabels = [
  '<div> soup — no semantic meaning',
  '<header> — identifies the page header',
  '<nav> — marks navigation links',
  '<main> + <article> — primary page content',
  'Semantic HTML — meaningful to browsers & screen readers',
]

interface Zone {
  tag: string
  active: boolean
  color: string
  height: number
  divLabel: string
  semanticLabel: string
  content: React.ReactNode
}

export default function SemanticViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const width = compact ? 200 : 280

  const zones: Zone[] = [
    {
      tag: 'header',
      active: s >= 1,
      color: BLUE,
      height: compact ? 28 : 36,
      divLabel: 'div.header',
      semanticLabel: '<header>',
      content: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 8 }}>
          <div style={{ width: compact ? 14 : 18, height: compact ? 6 : 8, borderRadius: 2, background: s >= 1 ? BLUE : '#52525b', opacity: 0.7 }} />
          <div style={{ width: compact ? 36 : 52, height: compact ? 4 : 5, borderRadius: 2, background: s >= 1 ? BLUE : '#52525b', opacity: 0.4 }} />
          <div style={{ flex: 1 }} />
          <div style={{ width: compact ? 28 : 40, height: compact ? 4 : 5, borderRadius: 2, background: s >= 1 ? BLUE : '#52525b', opacity: 0.4, marginRight: 8 }} />
        </div>
      ),
    },
    {
      tag: 'nav',
      active: s >= 2,
      color: GREEN,
      height: compact ? 22 : 28,
      divLabel: 'div.nav',
      semanticLabel: '<nav>',
      content: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 8 }}>
          {[28, 34, 24].map((w, i) => (
            <div key={i} style={{ width: w, height: compact ? 4 : 5, borderRadius: 2, background: s >= 2 ? GREEN : '#52525b', opacity: 0.5 }} />
          ))}
        </div>
      ),
    },
    {
      tag: 'main',
      active: s >= 3,
      color: PURPLE,
      height: compact ? 52 : 72,
      divLabel: 'div.main',
      semanticLabel: '<main> + <article>',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: compact ? '4px 8px 0' : '6px 10px 0' }}>
          <div style={{ width: '65%', height: compact ? 5 : 7, borderRadius: 2, background: s >= 3 ? PURPLE : '#52525b', opacity: 0.7 }} />
          {[100, 85, 90].map((w, i) => (
            <div key={i} style={{ width: `${w}%`, height: compact ? 3 : 4, borderRadius: 2, background: s >= 3 ? PURPLE : '#52525b', opacity: 0.3 }} />
          ))}
        </div>
      ),
    },
    {
      tag: 'footer',
      active: s >= 4,
      color: YELLOW,
      height: compact ? 22 : 28,
      divLabel: 'div.footer',
      semanticLabel: '<footer>',
      content: (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: compact ? 60 : 80, height: compact ? 4 : 5, borderRadius: 2, background: s >= 4 ? YELLOW : '#52525b', opacity: 0.5 }} />
        </div>
      ),
    },
  ]

  const zoneColors = ['', BLUE, GREEN, PURPLE, YELLOW]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      {/* Browser chrome */}
      <div style={{
        width,
        border: '2px solid var(--border)',
        borderRadius: compact ? 8 : 10,
        overflow: 'hidden',
        background: 'var(--surface)',
      }}>
        {/* Browser bar */}
        <div style={{
          background: 'var(--surface-bright)',
          borderBottom: '1px solid var(--border)',
          padding: compact ? '4px 8px' : '5px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: 5,
        }}>
          {['#ef4444', '#f5c542', '#4ade80'].map(c => (
            <div key={c} style={{ width: compact ? 6 : 8, height: compact ? 6 : 8, borderRadius: '50%', background: c, opacity: 0.75 }} />
          ))}
          <div style={{
            flex: 1, marginLeft: compact ? 5 : 8,
            height: compact ? 10 : 13,
            borderRadius: 3,
            background: 'var(--border)',
            opacity: 0.5,
          }} />
        </div>

        {/* Page zones */}
        {zones.map((zone, i) => (
          <motion.div
            key={zone.tag}
            animate={{
              backgroundColor: zone.active ? `${zone.color}14` : 'rgba(63,63,70,0.06)',
              borderColor: zone.active ? `${zone.color}66` : '#3f3f46',
              boxShadow: zone.active && s === i + 1
                ? `inset 0 0 14px ${zone.color}22`
                : 'none',
            }}
            transition={{ duration: 0.4 }}
            style={{
              height: zone.height,
              borderBottom: '1px solid',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            {/* Tag label */}
            <div style={{
              position: 'absolute', top: 2, left: 5,
              fontFamily: 'var(--font-mono)',
              fontSize: compact ? 8 : 9,
              fontWeight: 700,
            }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={zone.active ? zone.semanticLabel : zone.divLabel}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ color: zone.active ? zone.color : '#52525b' }}
                >
                  {zone.active ? zone.semanticLabel : zone.divLabel}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Zone content */}
            <div style={{ width: '100%', paddingTop: compact ? 10 : 12 }}>
              {zone.content}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={s}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            textAlign: 'center',
            maxWidth: width,
            color: s === 0 ? '#71717a' : zoneColors[s],
          }}
        >
          {stepLabels[s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
