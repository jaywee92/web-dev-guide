import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const SKY   = '#38bdf8'
const GREEN = '#4ade80'
const AMBER = '#fbbf24'
const SLATE = '#94a3b8'
const RED   = '#f87171'

const mono = 'var(--font-mono)'

export default function TailwindViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const fs = compact ? 8 : 10
  const panelW = compact ? 220 : 300

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 16, width: '100%' }}>
      <AnimatePresence mode="wait">

        {/* Step 0: Utility-First vs Traditional */}
        {s === 0 && (
          <motion.div key="utility"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>

            {/* Traditional */}
            <div style={{ background: `${RED}0c`, border: `1px solid ${RED}33`, borderRadius: 8, padding: compact ? 8 : 10 }}>
              <div style={{ fontSize: compact ? 7 : 8, fontFamily: mono, color: RED, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Traditional CSS</div>
              <div style={{ fontFamily: mono, fontSize: fs, color: SLATE, lineHeight: 1.6 }}>
                <span style={{ color: '#7dd3fc' }}>{'<div '}</span>
                <span style={{ color: AMBER }}>{'class="card"'}</span>
                <span style={{ color: '#7dd3fc' }}>{'>'}</span>
              </div>
              <div style={{ fontFamily: mono, fontSize: compact ? 7 : 9, color: SLATE + '99', marginTop: 3 }}>
                .card {'{ padding: 1rem; background: white; }'}
              </div>
            </div>

            <div style={{ textAlign: 'center' as const, fontSize: compact ? 9 : 11, color: SKY, fontWeight: 700 }}>↓  Tailwind</div>

            {/* Tailwind */}
            <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              style={{ background: `${GREEN}0c`, border: `1px solid ${GREEN}33`, borderRadius: 8, padding: compact ? 8 : 10 }}>
              <div style={{ fontSize: compact ? 7 : 8, fontFamily: mono, color: GREEN, fontWeight: 700, marginBottom: 5, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Utility Classes</div>
              <div style={{ fontFamily: mono, fontSize: fs, color: SLATE, lineHeight: 1.7 }}>
                <span style={{ color: '#7dd3fc' }}>{'<div '}</span>
                <span style={{ color: SKY }}>{'"'}</span>
                {['p-4', 'bg-white', 'rounded-lg', 'shadow'].map((cls, i) => (
                  <span key={cls}>
                    {i > 0 && ' '}
                    <span style={{ color: AMBER }}>{cls}</span>
                  </span>
                ))}
                <span style={{ color: SKY }}>{'"'}</span>
                <span style={{ color: '#7dd3fc' }}>{'>'}</span>
              </div>
              <div style={{ fontSize: compact ? 7 : 9, color: GREEN + 'aa', fontFamily: mono, marginTop: 3 }}>
                // no CSS file needed ✓
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Step 1: BEM vs Tailwind */}
        {s === 1 && (
          <motion.div key="frameworks"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>
            <div style={{ background: `${RED}0c`, border: `1px solid ${RED}33`, borderRadius: 8, padding: compact ? 8 : 10 }}>
              <div style={{ fontSize: compact ? 7 : 8, fontFamily: mono, color: RED, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>BEM naming</div>
              {['card card--featured', 'card__title card__title--large'].map((cls, i) => (
                <div key={i} style={{ fontFamily: mono, fontSize: compact ? 8 : 9, color: SLATE, lineHeight: 1.65 }}>
                  <span style={{ color: '#7dd3fc' }}>{i === 0 ? '<div ' : '  <h2 '}</span>
                  <span style={{ color: RED + 'cc' }}>{`class="${cls}"`}</span>
                  <span style={{ color: '#7dd3fc' }}>{'>'}</span>
                </div>
              ))}
              <div style={{ fontSize: compact ? 7 : 8, color: RED + '88', fontFamily: mono, marginTop: 3 }}>// → context-switch to CSS file</div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              style={{ background: `${GREEN}0c`, border: `1px solid ${GREEN}33`, borderRadius: 8, padding: compact ? 8 : 10 }}>
              <div style={{ fontSize: compact ? 7 : 8, fontFamily: mono, color: GREEN, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Tailwind — everything in HTML</div>
              <div style={{ fontFamily: mono, fontSize: compact ? 7 : 9, color: SLATE, lineHeight: 1.65 }}>
                <span style={{ color: '#7dd3fc' }}>{'<div '}</span>
                <span style={{ color: AMBER }}>{'class="rounded-xl shadow p-6"'}</span>
                <span style={{ color: '#7dd3fc' }}>{'>'}</span>
              </div>
              <div style={{ fontFamily: mono, fontSize: compact ? 7 : 9, color: SLATE, lineHeight: 1.65 }}>
                <span style={{ color: '#7dd3fc' }}>{'  <h2 '}</span>
                <span style={{ color: AMBER }}>{'class="text-2xl font-bold"'}</span>
                <span style={{ color: '#7dd3fc' }}>{'>'}</span>
              </div>
              <div style={{ fontSize: compact ? 7 : 8, color: GREEN + 'aa', fontFamily: mono, marginTop: 3 }}>// no naming decisions ✓</div>
            </motion.div>
          </motion.div>
        )}

        {/* Step 2: Setup CDN / npm */}
        {s === 2 && (
          <motion.div key="setup"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>
            <div style={{ background: `${SKY}0c`, border: `1px solid ${SKY}33`, borderRadius: 8, padding: compact ? 8 : 10 }}>
              <div style={{ fontSize: compact ? 7 : 8, fontFamily: mono, color: SKY, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>CDN — quick start</div>
              <div style={{ fontFamily: mono, fontSize: compact ? 7 : 9, color: SLATE, lineHeight: 1.65 }}>
                <span style={{ color: '#7dd3fc' }}>{'<script '}</span>
                <span style={{ color: AMBER }}>{'src="cdn.tailwindcss.com"'}</span>
                <span style={{ color: '#7dd3fc' }}>{' />'}</span>
              </div>
              <div style={{ fontSize: compact ? 7 : 8, color: AMBER + '88', fontFamily: mono, marginTop: 3 }}>⚠ prototyping only — no purging</div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              style={{ background: `${GREEN}0c`, border: `1px solid ${GREEN}33`, borderRadius: 8, padding: compact ? 8 : 10 }}>
              <div style={{ fontSize: compact ? 7 : 8, fontFamily: mono, color: GREEN, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>npm — production</div>
              {[
                '$ npm install -D tailwindcss',
                '$ npx tailwindcss init',
                '@tailwind base;',
                '@tailwind components;',
                '@tailwind utilities;',
              ].map((line, i) => (
                <div key={i} style={{ fontFamily: mono, fontSize: compact ? 7 : 9, color: i < 2 ? GREEN : AMBER, lineHeight: 1.6 }}>
                  {line}
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Step 3: Common utility categories */}
        {s === 3 && (
          <motion.div key="utilities"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW }}>
            <div style={{ marginBottom: compact ? 6 : 8, fontSize: compact ? 8 : 9, fontFamily: mono, color: SKY, fontWeight: 700 }}>Building a button:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: compact ? 3 : 5 }}>
              {[
                { cls: 'px-6 py-3', cat: 'spacing', color: '#4ade80' },
                { cls: 'bg-indigo-600', cat: 'background', color: '#818cf8' },
                { cls: 'text-white', cat: 'text color', color: '#e2e8f0' },
                { cls: 'font-semibold', cat: 'typography', color: '#fbbf24' },
                { cls: 'rounded-lg', cat: 'border', color: SKY },
                { cls: 'shadow', cat: 'effect', color: '#94a3b8' },
                { cls: 'hover:bg-indigo-700', cat: 'state', color: '#f472b6' },
                { cls: 'transition-colors', cat: 'animation', color: '#a78bfa' },
              ].map(({ cls, cat, color }, i) => (
                <motion.div
                  key={cls}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.06, type: 'spring', stiffness: 300, damping: 22 }}
                  style={{
                    background: `${color}12`, border: `1px solid ${color}44`,
                    borderRadius: 6, padding: compact ? '3px 6px' : '4px 8px',
                  }}>
                  <div style={{ fontFamily: mono, fontSize: compact ? 8 : 9, color, fontWeight: 700 }}>{cls}</div>
                  <div style={{ fontFamily: mono, fontSize: compact ? 6 : 7, color: color + '88', marginTop: 1 }}>{cat}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 4: Responsive breakpoints */}
        {s === 4 && (
          <motion.div key="responsive"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 4 : 6 }}>
            <div style={{ fontSize: compact ? 7 : 8, fontFamily: mono, color: SLATE, marginBottom: compact ? 2 : 4 }}>Mobile-first — unprefixed = all sizes</div>
            {[
              { prefix: '',      width: '0+',     color: SLATE,  label: 'all sizes' },
              { prefix: 'sm:',   width: '640px',  color: GREEN,  label: 'small tablet' },
              { prefix: 'md:',   width: '768px',  color: SKY,    label: 'tablet' },
              { prefix: 'lg:',   width: '1024px', color: AMBER,  label: 'laptop' },
              { prefix: 'xl:',   width: '1280px', color: '#a78bfa', label: 'desktop' },
              { prefix: '2xl:',  width: '1536px', color: '#f472b6', label: 'wide screen' },
            ].map(({ prefix, width, color, label }, i) => (
              <motion.div
                key={prefix || 'base'}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: compact ? 6 : 10,
                  fontFamily: mono, fontSize: compact ? 8 : 9,
                }}>
                <span style={{
                  minWidth: compact ? 32 : 38, fontWeight: 700, color,
                  background: `${color}18`, border: `1px solid ${color}33`,
                  borderRadius: 4, padding: '1px 4px', textAlign: 'center' as const,
                }}>
                  {prefix || '—'}
                </span>
                <span style={{ color: SLATE + '88', minWidth: compact ? 40 : 50 }}>{width}</span>
                <span style={{ color: SLATE }}>{label}</span>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              style={{
                marginTop: compact ? 4 : 6, fontFamily: mono,
                fontSize: compact ? 7 : 9, color: SKY, lineHeight: 1.65,
                background: `${SKY}0c`, border: `1px solid ${SKY}2a`,
                borderRadius: 6, padding: compact ? '4px 7px' : '5px 9px',
              }}>
              <span style={{ color: SLATE }}>grid-cols-1 </span>
              <span style={{ color: GREEN }}>md:grid-cols-2 </span>
              <span style={{ color: AMBER }}>lg:grid-cols-3</span>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={s}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          style={{
            margin: 0, fontFamily: mono,
            fontSize: compact ? 9 : 10,
            color: [SKY, GREEN, AMBER, SKY, GREEN][s] ?? SKY,
            textAlign: 'center' as const, maxWidth: 320,
          }}
        >
          {[
            'utility classes — one class, one job',
            'BEM naming → context switching · Tailwind → everything in HTML',
            'CDN for quick start · npm for production with purging',
            'compose classes from spacing, color, typography, effects',
            'mobile-first · breakpoint prefixes apply upward from their width',
          ][s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
