import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const YELLOW  = '#fbbf24'
const BLUE    = '#60a5fa'
const GREEN   = '#4ade80'
const PURPLE  = '#a78bfa'
const ORANGE  = '#fb923c'

const stepLabels = [
  'Objects bundle state (properties) + behavior (methods)',
  'class = blueprint · new = instance stamped from it',
  'extends inherits all parent methods — override to specialise',
  'JS walks the prototype chain to find properties',
  'this = the object a method was called on',
]

const labelColors = [YELLOW, BLUE, GREEN, PURPLE, ORANGE]

function Box({
  color, label, children, compact,
}: { color: string; label: string; children: React.ReactNode; compact: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      style={{
        border: `2px solid ${color}66`,
        borderRadius: 10,
        padding: compact ? 10 : 16,
        background: `${color}08`,
        boxShadow: `0 0 18px ${color}18`,
      }}
    >
      <div style={{
        fontSize: compact ? 8 : 9,
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        color,
        marginBottom: 8,
        textTransform: 'uppercase' as const,
        letterSpacing: '0.5px',
      }}>{label}</div>
      {children}
    </motion.div>
  )
}

function Pill({ text, color, compact }: { text: string; color: string; compact: boolean }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      background: `${color}18`,
      border: `1px solid ${color}44`,
      borderRadius: 6,
      padding: compact ? '3px 8px' : '4px 10px',
      fontFamily: 'var(--font-mono)',
      fontSize: compact ? 9 : 10,
      color,
      margin: 2,
    }}>
      {text}
    </div>
  )
}

export default function OOPViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const labelColor = labelColors[s]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 16 }}>

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={s}
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
            textAlign: 'center' as const,
          }}
        >
          {stepLabels[s]}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">

        {/* Step 0: OOP Concepts — object with props + method */}
        {s === 0 && (
          <motion.div key="oop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: compact ? 260 : 320 }}>
            <Box color={YELLOW} label="const car = { ... }" compact={compact}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 10 }}>
                  <span style={{ color: BLUE }}>make</span>
                  <span style={{ color: 'var(--text-muted)' }}>: </span>
                  <span style={{ color: GREEN }}>'Toyota'</span>
                  <span style={{ color: 'var(--text-faint)', fontSize: 8 }}> ← property</span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 10 }}>
                  <span style={{ color: BLUE }}>speed</span>
                  <span style={{ color: 'var(--text-muted)' }}>: </span>
                  <span style={{ color: ORANGE }}>0</span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 10 }}>
                  <span style={{ color: PURPLE }}>accelerate</span>
                  <span style={{ color: 'var(--text-muted)' }}>()</span>
                  <span style={{ color: 'var(--text-faint)', fontSize: 8 }}> ← method</span>
                </div>
              </div>
            </Box>
          </motion.div>
        )}

        {/* Step 1: Classes & Constructors */}
        {s === 1 && (
          <motion.div key="class" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', gap: compact ? 10 : 16, alignItems: 'flex-start', flexWrap: 'wrap' as const, justifyContent: 'center' }}>
            <Box color={BLUE} label="class Person (blueprint)" compact={compact}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: 'var(--text-muted)' }}>
                <div><span style={{ color: YELLOW }}>constructor</span>(name, age)</div>
                <div style={{ paddingLeft: 10, color: ORANGE }}>this.name = name</div>
                <div style={{ paddingLeft: 10, color: ORANGE }}>this.age = age</div>
                <div style={{ marginTop: 4 }}><span style={{ color: GREEN }}>greet</span>() {'{ ... }'}</div>
              </div>
            </Box>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['alice', 'bob'].map((name, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.15 }}
                >
                  <Box color={GREEN} label={`new Person() → ${name}`} compact={compact}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9 }}>
                      <div><span style={{ color: ORANGE }}>name</span>: <span style={{ color: GREEN }}>'{name}'</span></div>
                      <div><span style={{ color: ORANGE }}>age</span>: <span style={{ color: BLUE }}>{20 + i * 8}</span></div>
                    </div>
                  </Box>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Inheritance */}
        {s === 2 && (
          <motion.div key="extends" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, width: '100%', maxWidth: 320 }}>
            <Box color={BLUE} label="class Animal (parent)" compact={compact}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: 'var(--text-muted)' }}>
                <div><span style={{ color: GREEN }}>speak</span>() → <span style={{ color: 'var(--text-faint)'}}>'makes a sound'</span></div>
              </div>
            </Box>
            <div style={{ fontSize: 16, color: PURPLE }}>↓ extends</div>
            <Box color={GREEN} label="class Dog extends Animal (child)" compact={compact}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9 }}>
                <div style={{ color: 'var(--text-faint)' }}>inherits speak() ✓</div>
                <div><span style={{ color: GREEN }}>speak</span>() → <span style={{ color: YELLOW }}>'barks!'</span> ← override</div>
              </div>
            </Box>
          </motion.div>
        )}

        {/* Step 3: Prototype Chain */}
        {s === 3 && (
          <motion.div key="proto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, width: '100%', maxWidth: 300 }}>
            {[
              { label: 'instance (c)', props: 'own props only', color: GREEN },
              { label: 'Cat.prototype', props: 'methods live here', color: BLUE },
              { label: 'Object.prototype', props: 'hasOwnProperty, toString…', color: PURPLE },
              { label: 'null', props: 'end of chain', color: 'var(--text-faint)' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.12 }}
                style={{ width: '100%' }}
              >
                <div style={{
                  border: `1.5px solid ${item.color}55`,
                  borderRadius: 8,
                  padding: compact ? '5px 10px' : '7px 14px',
                  background: `${item.color}08`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 10, color: item.color, fontWeight: 700 }}>{item.label}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: 'var(--text-faint)' }}>{item.props}</span>
                </div>
                {i < 3 && <div style={{ textAlign: 'center' as const, color: item.color, opacity: 0.6, fontSize: 12 }}>[[Prototype]] ↓</div>}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 4: The this Keyword */}
        {s === 4 && (
          <motion.div key="this" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: compact ? 260 : 320 }}>
            <Box color={ORANGE} label="class Counter" compact={compact}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ color: 'var(--text-muted)' }}>constructor() {'{'}</div>
                <div style={{ paddingLeft: 10 }}><span style={{ color: ORANGE }}>this</span>.count = <span style={{ color: BLUE }}>0</span></div>
                <div style={{ color: 'var(--text-muted)' }}>{'}'}</div>
                <div style={{ color: 'var(--text-muted)', marginTop: 4 }}>increment() {'{'}</div>
                <div style={{ paddingLeft: 10 }}><span style={{ color: ORANGE }}>this</span>.count++</div>
                <div style={{ color: 'var(--text-muted)' }}>{'}'}</div>
              </div>
            </Box>
            <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
              <Pill text="c.increment() → this = c ✓" color={GREEN} compact={compact} />
              <Pill text="const inc = c.increment → this = ❌" color={ORANGE} compact={compact} />
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
