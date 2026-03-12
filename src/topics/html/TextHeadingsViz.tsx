// src/topics/html/TextHeadingsViz.tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const GREEN = '#4ade80'
const BLUE = '#5b9cf5'
const YELLOW = '#f5c542'
const PURPLE = '#a78bfa'
const PINK = '#ec4899'

const stepLabels = [
  'h1–h6 create a hierarchy — h1 is the most important',
  'Paragraphs separate blocks of text',
  '<strong> and <em> carry semantic meaning; <b> and <i> are purely visual',
  'Inline elements annotate text in-place',
  '<blockquote> and <pre><code> structure quoted and code content',
]

const HEADINGS = [
  { tag: 'h1', size: 22, label: 'Main title — one per page' },
  { tag: 'h2', size: 17, label: 'Section heading' },
  { tag: 'h3', size: 14, label: 'Subsection' },
  { tag: 'h4', size: 12, label: 'Sub-subsection' },
  { tag: 'h5', size: 10, label: '' },
  { tag: 'h6', size: 9,  label: '' },
]

export default function TextHeadingsViz({ step, compact = false }: Props) {
  const scale = compact ? 0.78 : 1

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
            fontSize: compact ? 9 : 11,
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            color: GREEN,
            textAlign: 'center',
            maxWidth: compact ? 200 : 340,
          }}
        >
          {stepLabels[Math.min(step, 4)]}
        </motion.div>
      </AnimatePresence>

      {/* Step 0: heading hierarchy */}
      {step === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: compact ? 4 : 6, width: '100%', maxWidth: compact ? 180 : 280 }}
        >
          {HEADINGS.map((h, i) => (
            <motion.div
              key={h.tag}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              style={{ display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: Math.round(h.size * scale),
                fontWeight: 800,
                color: GREEN,
                minWidth: compact ? 22 : 28,
              }}>
                {`<${h.tag}>`}
              </span>
              {h.label && (
                <span style={{
                  fontSize: Math.round(9 * scale),
                  color: 'var(--text-faint)',
                  fontFamily: 'var(--font-mono)',
                }}>
                  {h.label}
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Step 1: paragraph */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ maxWidth: compact ? 180 : 280, textAlign: 'left' }}
        >
          <div style={{ fontSize: compact ? 9 : 11, fontFamily: 'var(--font-mono)', color: BLUE, marginBottom: 6 }}>
            {'<p>'}
          </div>
          <div style={{ fontSize: compact ? 10 : 12, color: 'var(--text-muted)', lineHeight: 1.5, padding: '0 8px' }}>
            Paragraphs create vertical breathing room. Browsers add margin above and below automatically.
          </div>
          <div style={{ fontSize: compact ? 9 : 11, fontFamily: 'var(--font-mono)', color: BLUE, marginTop: 6 }}>
            {'</p>'}
          </div>
          <div style={{ marginTop: 6, height: 1, background: 'var(--border)' }} />
          <div style={{ fontSize: compact ? 9 : 11, fontFamily: 'var(--font-mono)', color: BLUE, marginTop: 6 }}>
            {'<p>'}
          </div>
          <div style={{ fontSize: compact ? 10 : 12, color: 'var(--text-muted)', lineHeight: 1.5, padding: '0 8px', opacity: 0.6 }}>
            Next paragraph here…
          </div>
          <div style={{ fontSize: compact ? 9 : 11, fontFamily: 'var(--font-mono)', color: BLUE }}>
            {'</p>'}
          </div>
        </motion.div>
      )}

      {/* Step 2: strong/em vs b/i */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: compact ? 8 : 12, maxWidth: compact ? 200 : 300 }}
        >
          {[
            { tag: '<strong>', label: 'Semantic importance', color: GREEN, render: (s: number) => <strong style={{ color: GREEN, fontSize: s }}>Important</strong> },
            { tag: '<b>', label: 'Visual bold only', color: 'var(--text-muted)', render: (s: number) => <b style={{ color: 'var(--text-muted)', fontSize: s }}>Bold</b> },
            { tag: '<em>', label: 'Semantic emphasis', color: BLUE, render: (s: number) => <em style={{ color: BLUE, fontStyle: 'italic', fontSize: s }}>Emphasis</em> },
            { tag: '<i>', label: 'Visual italic only', color: 'var(--text-muted)', render: (s: number) => <i style={{ color: 'var(--text-muted)', fontSize: s }}>Italic</i> },
          ].map((row, i) => (
            <motion.div
              key={row.tag}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{ display: 'flex', alignItems: 'center', gap: compact ? 6 : 10 }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 11, color: row.color, minWidth: compact ? 60 : 80 }}>
                {row.tag}
              </span>
              <span style={{ fontSize: compact ? 9 : 11, color: 'var(--text-faint)', flex: 1 }}>
                {row.label}
              </span>
              {row.render(compact ? 11 : 13)}
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Step 3: inline annotations */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: compact ? 6 : 8, justifyContent: 'center', maxWidth: compact ? 180 : 280 }}
        >
          {[
            { tag: 'mark', display: <mark>highlighted</mark>, color: YELLOW },
            { tag: 'del', display: <del>deleted</del>, color: '#f87171' },
            { tag: 'ins', display: <ins>inserted</ins>, color: GREEN },
            { tag: 'small', display: <small>small</small>, color: 'var(--text-muted)' },
            { tag: 'sub', display: <span>H<sub>2</sub>O</span>, color: BLUE },
            { tag: 'sup', display: <span>x<sup>2</sup></span>, color: PURPLE },
          ].map((item, i) => (
            <motion.div
              key={item.tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              style={{
                border: `1px solid var(--border)`,
                borderRadius: 6,
                padding: compact ? '4px 8px' : '5px 10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
              }}
            >
              <span style={{ fontSize: compact ? 9 : 11, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)' }}>
                {`<${item.tag}>`}
              </span>
              <span style={{ fontSize: compact ? 11 : 13 }}>
                {item.display}
              </span>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Step 4: blockquote + pre/code */}
      {step === 4 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: compact ? 8 : 12, maxWidth: compact ? 180 : 280 }}
        >
          <div style={{
            borderLeft: `3px solid ${PINK}`,
            paddingLeft: compact ? 8 : 12,
            color: PINK,
            fontSize: compact ? 10 : 12,
            fontStyle: 'italic',
          }}>
            <div style={{ fontSize: compact ? 8 : 10, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)', marginBottom: 4 }}>
              {'<blockquote>'}
            </div>
            "The best way to learn is by doing."
          </div>
          <div style={{
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 6,
            padding: compact ? '6px 10px' : '8px 12px',
            fontFamily: 'var(--font-mono)',
            fontSize: compact ? 9 : 11,
            color: GREEN,
          }}>
            <div style={{ color: 'var(--text-faint)', marginBottom: 4 }}>{'<pre><code>'}</div>
            {'const x = 1'}<br />
            {'const y = 2'}
          </div>
        </motion.div>
      )}
    </div>
  )
}
