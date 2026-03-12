// src/topics/html/LinksImagesViz.tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const GREEN = '#4ade80'
const BLUE = '#5b9cf5'
const YELLOW = '#f5c542'
const PURPLE = '#a78bfa'
const RED = '#f87171'

const stepLabels = [
  '<a> creates a link — href holds the destination',
  'Absolute URLs work from anywhere; relative URLs are for internal links',
  'target="_blank" opens in new tab — always add rel="noopener"',
  '<img> embeds images — src points to the file, alt describes it',
  'Alt text is read aloud by screen readers and shows when image fails',
]

export default function LinksImagesViz({ step, compact = false }: Props) {
  const mono = 'var(--font-mono)'
  const fs = (n: number) => compact ? Math.round(n * 0.8) : n

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 18 }}>
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

      {/* Step 0: <a> anatomy */}
      {step === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10, alignItems: 'center' }}
        >
          <div style={{ fontFamily: mono, fontSize: fs(13), fontWeight: 700, display: 'flex', gap: 0 }}>
            <span style={{ color: GREEN }}>{'<a '}</span>
            <span style={{ color: YELLOW, background: `${YELLOW}22`, borderRadius: 4, padding: '0 4px' }}>href</span>
            <span style={{ color: YELLOW }}>{'="'}</span>
            <span style={{ color: PURPLE, background: `${PURPLE}22`, borderRadius: 4, padding: '0 4px' }}>/about</span>
            <span style={{ color: YELLOW }}>{'"> '}</span>
            <span style={{ color: BLUE, background: `${BLUE}22`, borderRadius: 4, padding: '0 4px' }}>About</span>
            <span style={{ color: GREEN }}>{' </a>'}</span>
          </div>
          <div style={{ display: 'flex', gap: compact ? 12 : 20 }}>
            {[
              { color: GREEN, label: 'tag' },
              { color: YELLOW, label: 'attribute' },
              { color: PURPLE, label: 'destination' },
              { color: BLUE, label: 'link text' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: fs(9), fontFamily: mono }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: item.color }} />
                <span style={{ color: item.color }}>{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Step 1: absolute vs relative */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: compact ? 8 : 12, maxWidth: compact ? 200 : 300 }}
        >
          {[
            {
              type: 'Absolute',
              color: BLUE,
              code: 'href="https://example.com/page"',
              note: 'Works from anywhere on the web',
            },
            {
              type: 'Relative',
              color: GREEN,
              code: 'href="/about"',
              note: 'Internal links — shorter, portable',
            },
            {
              type: 'Anchor',
              color: PURPLE,
              code: 'href="#section-id"',
              note: 'In-page jump navigation',
            },
          ].map((item, i) => (
            <motion.div key={item.type}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{ borderLeft: `3px solid ${item.color}`, paddingLeft: compact ? 8 : 12 }}
            >
              <div style={{ fontSize: fs(9), color: item.color, fontFamily: mono, fontWeight: 700, marginBottom: 2 }}>
                {item.type}
              </div>
              <div style={{ fontSize: fs(10), color: 'var(--text)', fontFamily: mono }}>{item.code}</div>
              <div style={{ fontSize: fs(9), color: 'var(--text-faint)' }}>{item.note}</div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Step 2: target="_blank" + rel */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10, maxWidth: compact ? 190 : 290 }}
        >
          <div style={{ fontFamily: mono, fontSize: fs(10), color: 'var(--text)' }}>
            {'<a href="url"'}
          </div>
          <div style={{ paddingLeft: compact ? 12 : 16, fontFamily: mono, fontSize: fs(10) }}>
            <span style={{ color: YELLOW }}>target</span>
            <span style={{ color: 'var(--text)' }}>{'="_blank"'}</span>
            <span style={{ fontSize: fs(9), color: GREEN, marginLeft: 8 }}>← opens new tab</span>
          </div>
          <div style={{ paddingLeft: compact ? 12 : 16, fontFamily: mono, fontSize: fs(10) }}>
            <span style={{ color: YELLOW }}>rel</span>
            <span style={{ color: 'var(--text)' }}>{'="noopener"'}</span>
            <span style={{ fontSize: fs(9), color: RED, marginLeft: 8 }}>← security!</span>
          </div>
          <div style={{ fontFamily: mono, fontSize: fs(10), color: 'var(--text)' }}>
            {'> External Link</a>'}
          </div>
          <div style={{
            marginTop: compact ? 4 : 6,
            background: `${YELLOW}14`,
            border: `1px solid ${YELLOW}33`,
            borderRadius: 6,
            padding: compact ? '4px 8px' : '6px 10px',
            fontSize: fs(9),
            color: YELLOW,
            fontFamily: mono,
          }}>
            Without rel="noopener", the new tab can access window.opener — a security risk
          </div>
        </motion.div>
      )}

      {/* Step 3: img anatomy */}
      {step === 3 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: compact ? 8 : 12, alignItems: 'center' }}
        >
          <div style={{ fontFamily: mono, fontSize: fs(11), fontWeight: 700, textAlign: 'center' }}>
            <span style={{ color: GREEN }}>{'<img '}</span>
            <span style={{ color: YELLOW }}>src</span>
            <span style={{ color: 'var(--text)' }}>{'="'}</span>
            <span style={{ color: PURPLE }}>photo.jpg</span>
            <span style={{ color: 'var(--text)' }}>{"\" "}</span>
            <span style={{ color: YELLOW }}>alt</span>
            <span style={{ color: 'var(--text)' }}>{'="'}</span>
            <span style={{ color: BLUE }}>A sunset</span>
            <span style={{ color: 'var(--text)' }}>{"\" "}</span>
            <span style={{ color: GREEN }}>{'>'}</span>
          </div>
          {/* Visual image placeholder */}
          <div style={{
            width: compact ? 100 : 140,
            height: compact ? 60 : 80,
            borderRadius: 8,
            background: `linear-gradient(135deg, ${PURPLE}33, ${BLUE}22)`,
            border: `2px solid ${PURPLE}55`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: compact ? 22 : 32,
          }}>
            🌅
          </div>
          <div style={{ fontSize: fs(9), color: 'var(--text-faint)', fontFamily: mono }}>
            Self-closing — no content, no closing tag
          </div>
        </motion.div>
      )}

      {/* Step 4: alt text importance */}
      {step === 4 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: compact ? 8 : 12, maxWidth: compact ? 190 : 290 }}
        >
          {/* Good alt */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0 }}
            style={{ borderLeft: `3px solid ${GREEN}`, paddingLeft: compact ? 8 : 12 }}
          >
            <div style={{ fontSize: fs(8), color: GREEN, fontFamily: mono, marginBottom: 3 }}>✓ Good</div>
            <div style={{
              fontFamily: mono, fontSize: fs(9), color: 'var(--text)',
              background: `${GREEN}11`, borderRadius: 4, padding: '3px 6px',
            }}>
              {'alt="A sunset over mountain peaks"'}
            </div>
            <div style={{ fontSize: fs(9), color: 'var(--text-faint)', marginTop: 2 }}>
              Describes the actual content
            </div>
          </motion.div>
          {/* Bad alt */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
            style={{ borderLeft: `3px solid ${RED}`, paddingLeft: compact ? 8 : 12 }}
          >
            <div style={{ fontSize: fs(8), color: RED, fontFamily: mono, marginBottom: 3 }}>✗ Bad</div>
            <div style={{
              fontFamily: mono, fontSize: fs(9), color: 'var(--text)',
              background: `${RED}11`, borderRadius: 4, padding: '3px 6px',
            }}>
              {'alt="image" or alt="photo.jpg"'}
            </div>
            <div style={{ fontSize: fs(9), color: 'var(--text-faint)', marginTop: 2 }}>
              Useless to screen readers
            </div>
          </motion.div>
          {/* Decorative */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            style={{ borderLeft: `3px solid ${BLUE}`, paddingLeft: compact ? 8 : 12 }}
          >
            <div style={{ fontSize: fs(8), color: BLUE, fontFamily: mono, marginBottom: 3 }}>Decorative</div>
            <div style={{
              fontFamily: mono, fontSize: fs(9), color: 'var(--text)',
              background: `${BLUE}11`, borderRadius: 4, padding: '3px 6px',
            }}>
              {'alt=""  (empty string)'}
            </div>
            <div style={{ fontSize: fs(9), color: 'var(--text-faint)', marginTop: 2 }}>
              Screen reader skips it entirely
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
