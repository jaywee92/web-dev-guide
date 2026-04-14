import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const YELLOW = '#fbbf24'
const BLUE   = '#60a5fa'
const GREEN  = '#4ade80'
const PURPLE = '#a78bfa'
const ORANGE = '#fb923c'

const stepLabels = [
  'npm registry — 2M+ packages · install to node_modules',
  'package.json = ingredient list · lockfile = exact recipe',
  'Bundler resolves imports · tree-shakes · minifies',
  'Webpack · Rollup · Parcel · Vite — pick the right tool',
  'Vite dev server: native ESM + instant HMR · Rollup for prod',
]

const labelColors = [YELLOW, BLUE, GREEN, PURPLE, ORANGE]

export default function NpmBundlersViz({ step, compact = false }: Props) {
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
            maxWidth: 340,
          }}
        >
          {stepLabels[s]}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">

        {/* Step 0: npm Registry */}
        {s === 0 && (
          <motion.div key="registry" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: compact ? 260 : 300 }}>
            <div style={{
              border: `2px solid ${YELLOW}44`,
              borderRadius: 10,
              padding: compact ? 10 : 16,
              background: `${YELLOW}06`,
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: YELLOW, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase' as const }}>npm install date-fns</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                <div style={{
                  padding: compact ? '6px 10px' : '8px 14px',
                  border: `1.5px solid ${BLUE}55`,
                  borderRadius: 8,
                  fontFamily: 'var(--font-mono)',
                  fontSize: compact ? 9 : 10,
                  color: BLUE,
                  background: `${BLUE}08`,
                  textAlign: 'center' as const,
                }}>
                  npm<br />
                  <span style={{ fontSize: compact ? 7 : 8, color: 'var(--text-faint)' }}>2M+ packages</span>
                </div>
                <span style={{ color: 'var(--text-faint)', fontSize: 18 }}>→</span>
                <div style={{
                  padding: compact ? '6px 10px' : '8px 14px',
                  border: `1.5px solid ${GREEN}55`,
                  borderRadius: 8,
                  fontFamily: 'var(--font-mono)',
                  fontSize: compact ? 9 : 10,
                  color: GREEN,
                  background: `${GREEN}08`,
                  textAlign: 'center' as const,
                }}>
                  node_modules/<br />
                  <span style={{ fontSize: compact ? 7 : 8, color: 'var(--text-faint)' }}>gitignore!</span>
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: 'var(--text-faint)', marginTop: 8, textAlign: 'center' as const }}>
                import {'{ format }'} from 'date-fns'  → works ✓
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 1: package.json & Lockfile */}
        {s === 1 && (
          <motion.div key="lockfile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: 300, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              {
                label: 'package.json',
                desc: 'ingredient list — approximate versions',
                lines: ['"date-fns": "^3.6.0"', '"vite": "^5.0.0"'],
                color: BLUE,
              },
              {
                label: 'package-lock.json',
                desc: 'exact recipe — commit this!',
                lines: ['"date-fns": "3.6.0"', '"resolved": "https://..."'],
                color: GREEN,
              },
              {
                label: 'node_modules/',
                desc: 'the pantry — never commit',
                lines: ['recreate with: npm ci'],
                color: ORANGE,
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.12 }}
                style={{
                  border: `1.5px solid ${item.color}44`,
                  borderRadius: 8,
                  padding: compact ? '7px 10px' : '9px 14px',
                  background: `${item.color}06`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 10, color: item.color, fontWeight: 700 }}>{item.label}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 7 : 8, color: 'var(--text-faint)' }}>{item.desc}</span>
                </div>
                {item.lines.map(line => (
                  <div key={line} style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: 'var(--text-faint)' }}>{line}</div>
                ))}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 2: What Bundlers Do */}
        {s === 2 && (
          <motion.div key="bundler-flow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: compact ? 260 : 300 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' as const, justifyContent: 'center' }}>
                {['app.js', 'utils.ts', 'styles.css', 'logo.png', 'date-fns'].map((f, i) => (
                  <motion.div
                    key={f}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.07 }}
                    style={{
                      padding: compact ? '2px 6px' : '3px 8px',
                      border: `1px solid ${BLUE}44`,
                      borderRadius: 4,
                      fontFamily: 'var(--font-mono)',
                      fontSize: compact ? 8 : 9,
                      color: BLUE,
                      background: `${BLUE}08`,
                    }}
                  >
                    {f}
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
              >
                <div style={{ color: 'var(--text-faint)', fontSize: 14 }}>↓</div>
                <div style={{
                  padding: compact ? '6px 14px' : '8px 18px',
                  border: `2px solid ${GREEN}55`,
                  borderRadius: 8,
                  background: `${GREEN}10`,
                  fontFamily: 'var(--font-mono)',
                  fontSize: compact ? 9 : 10,
                  fontWeight: 700,
                  color: GREEN,
                }}>
                  resolve → tree-shake → minify
                </div>
                <div style={{ color: 'var(--text-faint)', fontSize: 14 }}>↓</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.65 }}
                style={{ display: 'flex', gap: 6 }}
              >
                {['dist/app-abc123.js', 'dist/app-abc123.css'].map(f => (
                  <div
                    key={f}
                    style={{
                      padding: compact ? '4px 8px' : '5px 10px',
                      border: `1.5px solid ${YELLOW}55`,
                      borderRadius: 6,
                      fontFamily: 'var(--font-mono)',
                      fontSize: compact ? 8 : 9,
                      color: YELLOW,
                      background: `${YELLOW}08`,
                    }}
                  >
                    {f}
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Bundlers compared */}
        {s === 3 && (
          <motion.div key="compare" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 8, width: '100%', maxWidth: 300 }}>
            {[
              { name: 'Webpack', desc: 'most mature · very configurable · complex config', color: BLUE },
              { name: 'Rollup', desc: 'best tree-shaking · ideal for libraries', color: GREEN },
              { name: 'Parcel', desc: 'zero-config · great for beginners', color: ORANGE },
              { name: 'Vite ✓', desc: 'instant HMR + Rollup for prod · modern default', color: YELLOW },
            ].map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  border: `1.5px solid ${item.color}${item.name === 'Vite ✓' ? '77' : '33'}`,
                  borderRadius: 8,
                  padding: compact ? '5px 10px' : '7px 12px',
                  background: item.name === 'Vite ✓' ? `${item.color}12` : `${item.color}05`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 10, color: item.color, fontWeight: 700 }}>{item.name}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 7 : 8, color: 'var(--text-faint)', maxWidth: '60%', textAlign: 'right' as const }}>{item.desc}</span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 4: Dev Server & HMR */}
        {s === 4 && (
          <motion.div key="hmr" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: compact ? 260 : 300 }}>
            <div style={{
              border: `2px solid ${ORANGE}44`,
              borderRadius: 10,
              padding: compact ? 10 : 16,
              background: `${ORANGE}06`,
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: ORANGE, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase' as const }}>Vite dev server + HMR</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { emoji: '⚡', text: 'serves native ESM — no bundle step', color: YELLOW },
                  { emoji: '🔄', text: 'HMR: only changed module is swapped', color: ORANGE },
                  { emoji: '🎭', text: 'app state preserved on update', color: GREEN },
                  { emoji: '📦', text: 'npm run build → Rollup production output', color: PURPLE },
                ].map((item, i) => (
                  <motion.div
                    key={item.emoji}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    style={{
                      display: 'flex',
                      gap: 8,
                      alignItems: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: compact ? 9 : 10,
                    }}
                  >
                    <span>{item.emoji}</span>
                    <span style={{ color: item.color }}>{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
