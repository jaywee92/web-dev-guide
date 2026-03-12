// src/topics/html/ListsViz.tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const GREEN = '#4ade80'
const BLUE = '#5b9cf5'
const YELLOW = '#f5c542'
const PURPLE = '#a78bfa'
const PINK = '#ec4899'

const stepLabels = [
  '<ul> creates a bulleted list — use when order doesn\'t matter',
  '<ol> creates a numbered list — use when sequence matters',
  'Lists can nest: an <li> can contain another list',
  'Block elements fill full width; inline elements flow with text',
  '<div> groups block content; <span> groups inline content',
]

const UL_ITEMS = ['HTML', 'CSS', 'JavaScript']
const OL_ITEMS = ['Boil water', 'Add pasta', 'Cook 8 min']

export default function ListsViz({ step, compact = false }: Props) {
  const mono = 'var(--font-mono)'
  const fs = (n: number) => compact ? Math.round(n * 0.82) : n

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 16 }}>
      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          style={{
            background: `${GREEN}22`,
            border: `1px solid ${GREEN}55`,
            borderRadius: 6,
            padding: compact ? '4px 10px' : '5px 14px',
            fontSize: fs(10),
            fontFamily: mono,
            fontWeight: 700,
            color: GREEN,
            textAlign: 'center',
            maxWidth: compact ? 200 : 340,
          }}
        >
          {stepLabels[Math.min(step, 4)]}
        </motion.div>
      </AnimatePresence>

      {/* Step 0: ul */}
      {step === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: compact ? 4 : 6 }}
        >
          <div style={{ fontFamily: mono, fontSize: fs(10), color: GREEN }}>{'<ul>'}</div>
          {UL_ITEMS.map((item, i) => (
            <motion.div key={item}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12 + 0.1 }}
              style={{ display: 'flex', alignItems: 'center', gap: compact ? 6 : 10, paddingLeft: compact ? 14 : 20 }}
            >
              <div style={{ width: compact ? 5 : 6, height: compact ? 5 : 6, borderRadius: '50%', background: BLUE, flexShrink: 0 }} />
              <span style={{ fontFamily: mono, fontSize: fs(10), color: BLUE }}>{'<li>'}</span>
              <span style={{ fontSize: fs(11), color: 'var(--text)' }}>{item}</span>
              <span style={{ fontFamily: mono, fontSize: fs(10), color: BLUE }}>{'</li>'}</span>
            </motion.div>
          ))}
          <div style={{ fontFamily: mono, fontSize: fs(10), color: GREEN }}>{'</ul>'}</div>
        </motion.div>
      )}

      {/* Step 1: ol */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: compact ? 4 : 6 }}
        >
          <div style={{ fontFamily: mono, fontSize: fs(10), color: YELLOW }}>{'<ol>'}</div>
          {OL_ITEMS.map((item, i) => (
            <motion.div key={item}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12 + 0.1 }}
              style={{ display: 'flex', alignItems: 'center', gap: compact ? 6 : 10, paddingLeft: compact ? 14 : 20 }}
            >
              <span style={{ fontFamily: mono, fontSize: fs(10), color: YELLOW, minWidth: compact ? 14 : 16 }}>{i + 1}.</span>
              <span style={{ fontFamily: mono, fontSize: fs(10), color: YELLOW }}>{'<li>'}</span>
              <span style={{ fontSize: fs(11), color: 'var(--text)' }}>{item}</span>
              <span style={{ fontFamily: mono, fontSize: fs(10), color: YELLOW }}>{'</li>'}</span>
            </motion.div>
          ))}
          <div style={{ fontFamily: mono, fontSize: fs(10), color: YELLOW }}>{'</ol>'}</div>
        </motion.div>
      )}

      {/* Step 2: nested list */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ fontFamily: mono, fontSize: fs(10), display: 'flex', flexDirection: 'column', gap: compact ? 2 : 3 }}
        >
          <div style={{ color: GREEN }}>{'<ul>'}</div>
          <div style={{ paddingLeft: compact ? 12 : 16 }}>
            <span style={{ color: BLUE }}>{'<li>'}</span>
            <span style={{ color: 'var(--text)' }}> Frontend</span>
            <div style={{ paddingLeft: compact ? 12 : 16 }}>
              <div style={{ color: PURPLE }}>{'<ul>'}</div>
              {['HTML', 'CSS'].map((item, i) => (
                <motion.div key={item}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  style={{ paddingLeft: compact ? 10 : 14, color: PURPLE }}
                >
                  {`<li>${item}</li>`}
                </motion.div>
              ))}
              <div style={{ color: PURPLE }}>{'</ul>'}</div>
            </div>
            <span style={{ color: BLUE }}>{'</li>'}</span>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
            style={{ paddingLeft: compact ? 12 : 16, color: BLUE }}
          >
            {'<li>Backend</li>'}
          </motion.div>
          <div style={{ color: GREEN }}>{'</ul>'}</div>
        </motion.div>
      )}

      {/* Step 3: block vs inline */}
      {step === 3 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: compact ? 8 : 12, maxWidth: compact ? 190 : 290 }}
        >
          {/* Block */}
          <div>
            <div style={{ fontSize: fs(9), color: GREEN, fontFamily: mono, marginBottom: 4, fontWeight: 700 }}>
              Block — fills full width, new line
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 3 : 4 }}>
              {['<div>', '<p>', '<h2>'].map((tag, i) => (
                <motion.div key={tag}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    background: `${GREEN}18`,
                    border: `1px solid ${GREEN}44`,
                    borderRadius: 4,
                    padding: compact ? '3px 8px' : '4px 10px',
                    fontFamily: mono,
                    fontSize: fs(10),
                    color: GREEN,
                  }}
                >
                  {tag} <span style={{ color: 'var(--text-faint)', fontSize: fs(9) }}>fills full width</span>
                </motion.div>
              ))}
            </div>
          </div>
          {/* Inline */}
          <div>
            <div style={{ fontSize: fs(9), color: BLUE, fontFamily: mono, marginBottom: 4, fontWeight: 700 }}>
              Inline — flows with text
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: compact ? 3 : 4 }}>
              {['<span>', '<a>', '<strong>'].map((tag, i) => (
                <motion.div key={tag}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    background: `${BLUE}18`,
                    border: `1px solid ${BLUE}44`,
                    borderRadius: 4,
                    padding: compact ? '3px 8px' : '4px 10px',
                    fontFamily: mono,
                    fontSize: fs(10),
                    color: BLUE,
                  }}
                >
                  {tag}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Step 4: div vs span */}
      {step === 4 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ fontFamily: mono, fontSize: fs(10), display: 'flex', flexDirection: 'column', gap: compact ? 4 : 6, maxWidth: compact ? 190 : 290 }}
        >
          <span style={{ color: GREEN }}>{'<div class="card">'}</span>
          <div style={{ paddingLeft: compact ? 12 : 18 }}>
            <span style={{ color: BLUE }}>{'<h2>'}</span>
            <span style={{ color: 'var(--text)' }}>Product</span>
            <span style={{ color: BLUE }}>{'</h2>'}</span>
          </div>
          <div style={{ paddingLeft: compact ? 12 : 18 }}>
            <span style={{ color: BLUE }}>{'<p>'}</span>
            <span style={{ color: 'var(--text)' }}> Price: </span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{ color: PINK }}
            >
              {'<span class="price">€49</span>'}
            </motion.span>
            <span style={{ color: BLUE }}>{'</p>'}</span>
          </div>
          <span style={{ color: GREEN }}>{'</div>'}</span>
          <div style={{
            marginTop: compact ? 4 : 6,
            fontSize: fs(9),
            color: 'var(--text-faint)',
            borderTop: '1px solid var(--border)',
            paddingTop: compact ? 4 : 6,
          }}>
            {'<div> = block container  ·  <span> = inline container'}
          </div>
        </motion.div>
      )}
    </div>
  )
}
