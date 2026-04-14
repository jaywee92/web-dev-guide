import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const YELLOW = '#fbbf24'
const BLUE   = '#60a5fa'
const GREEN  = '#4ade80'
const PURPLE = '#a78bfa'
const ORANGE = '#fb923c'

const stepLabels = [
  'CommonJS: require() is synchronous · ESM: import is statically analyzed',
  'Named exports use exact names · default export can be any name',
  'npm installs packages into node_modules · package.json tracks them',
  'Bundlers resolve imports, tree-shake unused code, output optimized files',
]

const labelColors = [YELLOW, BLUE, GREEN, PURPLE]

export default function ModulesViz({ step, compact = false }: Props) {
  const s = Math.min(step, 3)
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

        {/* Step 0: CJS vs ESM */}
        {s === 0 && (
          <motion.div key="cjs-esm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: 300, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{
              border: `2px solid ${ORANGE}44`,
              borderRadius: 10,
              padding: compact ? 8 : 12,
              background: `${ORANGE}06`,
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: ORANGE, fontWeight: 700, marginBottom: 6, textTransform: 'uppercase' as const }}>CommonJS (older)</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 10, color: 'var(--text-muted)' }}>
                <div>const fs = <span style={{ color: ORANGE }}>require</span>('fs')</div>
                <div>module.<span style={{ color: ORANGE }}>exports</span> = {'{ readFile }'}</div>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: 'var(--text-faint)', marginTop: 4 }}>synchronous · runtime</div>
            </div>
            <div style={{
              border: `2px solid ${YELLOW}44`,
              borderRadius: 10,
              padding: compact ? 8 : 12,
              background: `${YELLOW}06`,
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: YELLOW, fontWeight: 700, marginBottom: 6, textTransform: 'uppercase' as const }}>ESM — modern ✓</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 10, color: 'var(--text-muted)' }}>
                <div><span style={{ color: YELLOW }}>import</span> {'{ readFile }'} from 'fs/promises'</div>
                <div><span style={{ color: YELLOW }}>export</span> {'{ readFile }'}</div>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: 'var(--text-faint)', marginTop: 4 }}>static analysis · tree-shaking</div>
            </div>
          </motion.div>
        )}

        {/* Step 1: Named / Default Exports */}
        {s === 1 && (
          <motion.div key="exports" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: compact ? 260 : 300 }}>
            <div style={{
              border: `2px solid ${BLUE}44`,
              borderRadius: 10,
              padding: compact ? 10 : 14,
              background: `${BLUE}06`,
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: BLUE, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase' as const }}>utils.js</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 10, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <div><span style={{ color: YELLOW }}>export</span><span style={{ color: 'var(--text-muted)' }}> const PI = 3.14159</span></div>
                <div><span style={{ color: YELLOW }}>export</span><span style={{ color: 'var(--text-muted)' }}> function square(n) {'{ ... }'}</span></div>
                <div><span style={{ color: YELLOW }}>export default</span><span style={{ color: 'var(--text-muted)' }}> function main() {'{ ... }'}</span></div>
              </div>
            </div>
            <div style={{
              border: `2px solid ${GREEN}44`,
              borderRadius: 10,
              padding: compact ? 10 : 14,
              background: `${GREEN}06`,
              marginTop: 8,
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: GREEN, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase' as const }}>app.js</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 10, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <div>
                  <span style={{ color: YELLOW }}>import</span>
                  <span style={{ color: PURPLE }}> main</span>
                  <span style={{ color: 'var(--text-muted)' }}>, {'{ PI, square }'} from './utils.js'</span>
                </div>
                <div style={{ color: 'var(--text-faint)', fontSize: compact ? 8 : 9 }}>// default = any name · named = exact name</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: npm */}
        {s === 2 && (
          <motion.div key="npm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: compact ? 260 : 300 }}>
            <div style={{
              border: `2px solid ${GREEN}44`,
              borderRadius: 10,
              padding: compact ? 10 : 16,
              background: `${GREEN}06`,
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: GREEN, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase' as const }}>npm install date-fns</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { label: 'npm registry', note: '2M+ packages', color: GREEN },
                  { label: 'node_modules/', note: 'downloaded files (gitignore!)', color: ORANGE },
                  { label: 'package.json', note: 'dependency list', color: BLUE },
                  { label: 'package-lock.json', note: 'exact versions (commit!)', color: YELLOW },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderLeft: `3px solid ${item.color}55`,
                      paddingLeft: 8,
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 10, color: item.color, fontWeight: 700 }}>{item.label}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: 'var(--text-faint)' }}>{item.note}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Bundlers */}
        {s === 3 && (
          <motion.div key="bundler" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: compact ? 260 : 300 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              {/* Source files */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' as const, justifyContent: 'center' }}>
                {['app.js', 'utils.js', 'styles.css', 'date-fns'].map((f, i) => (
                  <motion.div
                    key={f}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 }}
                    style={{
                      padding: compact ? '3px 7px' : '4px 9px',
                      border: `1px solid ${BLUE}44`,
                      borderRadius: 5,
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

              {/* Bundler box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                style={{
                  padding: compact ? '8px 16px' : '10px 22px',
                  border: `2px solid ${PURPLE}66`,
                  borderRadius: 8,
                  background: `${PURPLE}12`,
                  fontFamily: 'var(--font-mono)',
                  fontSize: compact ? 10 : 11,
                  fontWeight: 700,
                  color: PURPLE,
                  textAlign: 'center' as const,
                }}
              >
                ⚡ Vite bundler
                <div style={{ fontSize: compact ? 8 : 9, fontWeight: 400, color: 'var(--text-faint)', marginTop: 2 }}>resolve · tree-shake · minify</div>
              </motion.div>

              <div style={{ color: 'var(--text-faint)', fontSize: 14 }}>↓</div>

              {/* Output */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                style={{
                  display: 'flex',
                  gap: 6,
                }}
              >
                {['index.js', 'index.css'].map(f => (
                  <div
                    key={f}
                    style={{
                      padding: compact ? '3px 8px' : '4px 10px',
                      border: `1px solid ${GREEN}55`,
                      borderRadius: 5,
                      fontFamily: 'var(--font-mono)',
                      fontSize: compact ? 8 : 9,
                      color: GREEN,
                      background: `${GREEN}08`,
                    }}
                  >
                    dist/{f}
                  </div>
                ))}
              </motion.div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9, color: 'var(--text-faint)', textAlign: 'center' as const }}>
                optimized for the browser
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
