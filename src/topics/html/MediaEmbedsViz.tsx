// src/topics/html/MediaEmbedsViz.tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const GREEN = '#4ade80'
const BLUE = '#5b9cf5'
const PURPLE = '#a78bfa'
const CYAN = '#22d3ee'

const stepLabels = [
  '<iframe> embeds another HTML document inside your page',
  '<video> plays video natively — controls attribute adds the UI',
  '<audio> works the same as video, but for sound',
  '<picture> serves the right image for the right screen size',
  '<code> for inline code, <pre><code> for multi-line blocks',
]

export default function MediaEmbedsViz({ step, compact = false }: Props) {
  const mono = 'var(--font-mono)'
  const fs = (n: number) => compact ? Math.round(n * 0.8) : n

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

      {/* Step 0: iframe — page within a page */}
      {step === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 6 : 10 }}
        >
          {/* Outer page */}
          <div style={{
            width: compact ? 150 : 220,
            height: compact ? 100 : 140,
            border: `2px solid ${BLUE}`,
            borderRadius: 8,
            position: 'relative',
            background: 'rgba(91,156,245,0.06)',
            overflow: 'hidden',
          }}>
            <div style={{ fontSize: fs(8), color: BLUE, fontFamily: mono, padding: compact ? '4px 6px' : '6px 8px' }}>
              your-page.html
            </div>
            {/* iframe inside */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                position: 'absolute',
                left: compact ? 20 : 28,
                right: compact ? 8 : 12,
                bottom: compact ? 8 : 12,
                top: compact ? 26 : 32,
                border: `2px solid ${PURPLE}`,
                borderRadius: 5,
                background: `${PURPLE}12`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: compact ? 2 : 4,
              }}
            >
              <div style={{ fontSize: fs(7), color: PURPLE, fontFamily: mono }}>{'<iframe>'}</div>
              <div style={{ fontSize: fs(18) }}>🎬</div>
              <div style={{ fontSize: fs(7), color: 'var(--text-faint)' }}>embedded content</div>
            </motion.div>
          </div>
          <div style={{ fontFamily: mono, fontSize: fs(9), color: PURPLE, textAlign: 'center' }}>
            {'src="https://youtube.com/embed/..."'}
          </div>
        </motion.div>
      )}

      {/* Step 1: video */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10, alignItems: 'center' }}
        >
          {/* Video player mockup */}
          <div style={{
            width: compact ? 160 : 220,
            background: '#000',
            borderRadius: 8,
            border: `2px solid ${BLUE}55`,
            overflow: 'hidden',
          }}>
            <div style={{
              height: compact ? 70 : 100,
              background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: compact ? 28 : 40,
            }}>🎬</div>
            {/* Controls bar */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                height: compact ? 22 : 30,
                background: 'rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: compact ? 6 : 8,
                padding: '0 8px',
              }}
            >
              {['▶', '🔊', '⛶'].map((icon, i) => (
                <span key={i} style={{ fontSize: compact ? 10 : 12, opacity: 0.8 }}>{icon}</span>
              ))}
              <div style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.2)', borderRadius: 2 }}>
                <div style={{ width: '30%', height: '100%', background: BLUE, borderRadius: 2 }} />
              </div>
            </motion.div>
          </div>
          <div style={{ fontFamily: mono, fontSize: fs(9), color: BLUE, textAlign: 'center' }}>
            {'<video controls width="640" height="360">'}
          </div>
        </motion.div>
      )}

      {/* Step 2: audio */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: compact ? 8 : 12, alignItems: 'center' }}
        >
          {/* Audio player mockup */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            style={{
              width: compact ? 160 : 220,
              height: compact ? 40 : 50,
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 8,
              border: `2px solid ${GREEN}55`,
              display: 'flex',
              alignItems: 'center',
              gap: compact ? 6 : 8,
              padding: `0 ${compact ? 8 : 12}px`,
            }}
          >
            <span style={{ fontSize: compact ? 14 : 18 }}>▶</span>
            <div style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.15)', borderRadius: 2 }}>
              <div style={{ width: '45%', height: '100%', background: GREEN, borderRadius: 2 }} />
            </div>
            <span style={{ fontSize: compact ? 8 : 10, color: 'var(--text-muted)', fontFamily: mono }}>2:34</span>
            <span style={{ fontSize: compact ? 12 : 16 }}>🔊</span>
          </motion.div>
          <div style={{ fontFamily: mono, fontSize: fs(9), color: GREEN, textAlign: 'center' }}>
            {'<audio controls>'}
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: compact ? 3 : 4,
            maxWidth: compact ? 170 : 240,
          }}>
            {[
              { src: 'podcast.mp3', type: 'audio/mpeg', note: 'Chrome, Firefox, Safari' },
              { src: 'podcast.ogg', type: 'audio/ogg', note: 'Firefox fallback' },
            ].map((item, i) => (
              <motion.div
                key={item.src}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 + 0.2 }}
                style={{ fontFamily: mono, fontSize: fs(9), color: 'var(--text-faint)' }}
              >
                {`<source src="${item.src}" type="${item.type}">`}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Step 3: picture / responsive images */}
      {step === 3 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10, maxWidth: compact ? 190 : 280 }}
        >
          {[
            { media: '(min-width: 800px)', src: 'large.webp', note: 'Desktop', color: PURPLE },
            { media: '(min-width: 400px)', src: 'medium.jpg', note: 'Tablet', color: BLUE },
            { media: null as string | null, src: 'small.jpg', note: 'Fallback <img>', color: GREEN },
          ].map((item, i) => (
            <motion.div
              key={item.src}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12 }}
              style={{
                borderLeft: `3px solid ${item.color}`,
                paddingLeft: compact ? 8 : 12,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <div style={{ fontSize: fs(8), color: item.color, fontFamily: mono, fontWeight: 700 }}>
                {item.note}
              </div>
              {item.media ? (
                <div style={{ fontFamily: mono, fontSize: fs(9), color: 'var(--text)' }}>
                  {`<source media="${item.media}" srcset="${item.src}">`}
                </div>
              ) : (
                <div style={{ fontFamily: mono, fontSize: fs(9), color: item.color }}>
                  {`<img src="${item.src}" alt="...">`}
                </div>
              )}
            </motion.div>
          ))}
          <div style={{ fontSize: fs(9), color: 'var(--text-faint)', fontFamily: mono }}>
            Browser picks first matching source
          </div>
        </motion.div>
      )}

      {/* Step 4: code + pre/code */}
      {step === 4 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: compact ? 8 : 12, maxWidth: compact ? 190 : 280 }}
        >
          {/* Inline code */}
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
            <div style={{ fontSize: fs(9), color: 'var(--text-faint)', fontFamily: mono, marginBottom: 3 }}>
              Inline code:
            </div>
            <div style={{ fontSize: fs(11), color: 'var(--text)' }}>
              Use the{' '}
              <span style={{
                fontFamily: mono,
                fontSize: fs(10),
                background: 'rgba(255,255,255,0.08)',
                borderRadius: 4,
                padding: '1px 5px',
                color: CYAN,
                border: '1px solid rgba(255,255,255,0.12)',
              }}>
                console.log()
              </span>
              {' '}function.
            </div>
          </motion.div>
          {/* Block code */}
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div style={{ fontSize: fs(9), color: 'var(--text-faint)', fontFamily: mono, marginBottom: 3 }}>
              {'<pre><code>:'}
            </div>
            <div style={{
              background: 'rgba(0,0,0,0.35)',
              borderRadius: 6,
              padding: compact ? '6px 10px' : '8px 12px',
              fontFamily: mono,
              fontSize: fs(10),
              color: CYAN,
              lineHeight: 1.6,
            }}>
              {'function greet(name) {'}<br />
              {'  return `Hello, ${name}!`'}<br />
              {'}'}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
