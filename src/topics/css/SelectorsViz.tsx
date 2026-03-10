import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const GREEN  = '#4ade80'
const BLUE   = '#5b9cf5'
const PURPLE = '#a78bfa'
const YELLOW = '#f5c542'

interface SelectorStep {
  selector: string | null
  rule: string | null
  color: string
  targets: string[]
  specificity: string | null
  specLabel: string | null
}

const STEPS: SelectorStep[] = [
  { selector: null,     rule: null,                     color: '#52525b', targets: [],               specificity: null,    specLabel: null },
  { selector: '*',      rule: '* { color: yellow }',    color: YELLOW,    targets: ['h1','p','div'],  specificity: '0,0,0', specLabel: 'universal' },
  { selector: 'h1',     rule: 'h1 { color: green }',    color: GREEN,     targets: ['h1'],            specificity: '0,0,1', specLabel: 'type' },
  { selector: '.title', rule: '.title { color: blue }',  color: BLUE,      targets: ['h1'],            specificity: '0,1,0', specLabel: 'class' },
  { selector: '#box',   rule: '#box { color: purple }',  color: PURPLE,    targets: ['div'],           specificity: '1,0,0', specLabel: 'ID' },
]

const stepLabels = [
  'CSS selectors target HTML elements',
  '* selects every element on the page',
  'Type selector — matches by tag name',
  'Class selector — reusable, matches many elements',
  'ID selector — unique, highest specificity',
]

const htmlElements = [
  { tag: 'h1',  attrs: 'class="title"' },
  { tag: 'p',   attrs: 'class="lead"' },
  { tag: 'div', attrs: 'id="box"' },
]

export default function SelectorsViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const cfg = STEPS[s]
  const mono = 'var(--font-mono)'
  const fontSize = compact ? 9 : 11
  const panelW = compact ? 96 : 130

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 14 }}>
      <div style={{ display: 'flex', gap: compact ? 8 : 12, alignItems: 'stretch' }}>

        {/* Left: CSS rule panel */}
        <div style={{
          width: panelW,
          background: 'rgba(0,0,0,0.3)',
          border: '1px solid var(--border)',
          borderRadius: 6,
          padding: compact ? '6px 8px' : '8px 10px',
          fontFamily: mono,
          fontSize,
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
        }}>
          <span style={{ color: '#52525b', fontSize: compact ? 7 : 9 }}>style.css</span>

          <AnimatePresence mode="wait">
            {cfg.rule ? (
              <motion.div
                key={cfg.rule}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }}
                transition={{ duration: 0.3 }}
              >
                <span style={{ color: cfg.color, fontWeight: 700 }}>{cfg.selector}</span>
                <span style={{ color: '#71717a' }}>{' {'}</span>
                <div style={{ paddingLeft: 8, color: cfg.color, opacity: 0.85 }}>
                  {'color: '}{s === 1 ? 'yellow' : s === 2 ? 'green' : s === 3 ? 'blue' : 'purple'}{';'}
                </div>
                <span style={{ color: '#71717a' }}>{'}'}</span>
              </motion.div>
            ) : (
              <motion.span
                key="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                style={{ color: '#52525b', fontSize: compact ? 8 : 9 }}
              >
                {'/* no rule */'}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Specificity badge */}
          <AnimatePresence>
            {cfg.specificity && (
              <motion.div
                key={cfg.specificity}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  fontSize: compact ? 7 : 9,
                  color: cfg.color,
                  background: `${cfg.color}18`,
                  border: `1px solid ${cfg.color}44`,
                  borderRadius: 3,
                  padding: '2px 5px',
                  textAlign: 'center',
                }}
              >
                ({cfg.specificity}) {cfg.specLabel}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Arrow */}
        <motion.div
          animate={{ color: s > 0 ? cfg.color : '#3f3f46' }}
          transition={{ duration: 0.3 }}
          style={{ display: 'flex', alignItems: 'center', fontSize: compact ? 16 : 20 }}
        >
          →
        </motion.div>

        {/* Right: HTML elements panel */}
        <div style={{
          width: panelW,
          background: 'rgba(0,0,0,0.2)',
          border: '1px solid var(--border)',
          borderRadius: 6,
          padding: compact ? '6px 8px' : '8px 10px',
          fontFamily: mono,
          fontSize,
          display: 'flex',
          flexDirection: 'column',
          gap: compact ? 4 : 6,
        }}>
          <span style={{ color: '#52525b', fontSize: compact ? 7 : 9 }}>index.html</span>

          {htmlElements.map(el => {
            const targeted = cfg.targets.includes(el.tag)
            return (
              <motion.div
                key={el.tag}
                animate={{
                  color: targeted ? cfg.color : '#52525b',
                  background: targeted ? `${cfg.color}14` : 'transparent',
                  boxShadow: targeted ? `0 0 8px ${cfg.color}44` : 'none',
                }}
                transition={{ duration: 0.35 }}
                style={{ borderRadius: 3, padding: '2px 4px', fontSize }}
              >
                <span style={{ opacity: 0.5 }}>&lt;</span>
                <span style={{ fontWeight: 700 }}>{el.tag}</span>
                {!compact && (
                  <span style={{ opacity: 0.6 }}> {el.attrs}</span>
                )}
                <span style={{ opacity: 0.5 }}>&gt;</span>
              </motion.div>
            )
          })}
        </div>
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
            fontFamily: mono,
            fontSize: compact ? 11 : 12,
            textAlign: 'center',
            color: s === 0 ? '#71717a' : cfg.color,
            margin: 0,
          }}
        >
          {stepLabels[s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
