import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const SKY    = '#38bdf8'
const GREEN  = '#4ade80'
const VIOLET = '#a78bfa'
const AMBER  = '#fbbf24'
const SLATE  = '#94a3b8'
const PINK   = '#f472b6'

const mono = 'var(--font-mono)'

export default function TailwindAdvancedViz({ step, compact = false }: Props) {
  const s = Math.min(step, 3)
  const panelW = compact ? 220 : 300

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 16, width: '100%' }}>
      <AnimatePresence mode="wait">

        {/* Step 0: Arbitrary Values */}
        {s === 0 && (
          <motion.div key="arbitrary"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 4 : 7 }}>
            <div style={{ fontSize: compact ? 7 : 8, fontFamily: mono, color: SLATE, marginBottom: 2 }}>
              Use <span style={{ color: AMBER }}>[value]</span> to escape the design system
            </div>
            {[
              { cls: 'w-[347px]',             comment: 'exact pixel width',       color: SKY    },
              { cls: 'bg-[#1da1f2]',          comment: 'hex color',               color: '#1da1f2' },
              { cls: 'mt-[calc(100vh-4rem)]', comment: 'CSS calc expression',     color: GREEN  },
              { cls: 'grid-cols-[1fr_2fr]',   comment: 'arbitrary grid template', color: VIOLET },
              { cls: 'text-[clamp(1rem,2vw,1.5rem)]', comment: 'fluid type', color: AMBER },
            ].map(({ cls, comment, color }, i) => (
              <motion.div
                key={cls}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <span style={{
                  fontFamily: mono, fontSize: compact ? 8 : 9, fontWeight: 700, color,
                  background: `${color}10`, border: `1px solid ${color}2a`,
                  borderRadius: 5, padding: compact ? '2px 6px' : '2px 8px', display: 'inline-block',
                }}>
                  {cls}
                </span>
                <span style={{ fontFamily: mono, fontSize: compact ? 6 : 7, color: SLATE + '88', paddingLeft: 2 }}>
                  {'// '}{comment}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 1: @layer & @apply */}
        {s === 1 && (
          <motion.div key="layers"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 5 : 8 }}>
            {[
              {
                layer: 'base',
                color: SLATE,
                desc: 'global resets',
                examples: ['h1 { @apply text-3xl font-bold; }', 'a  { @apply text-blue-600; }'],
              },
              {
                layer: 'components',
                color: SKY,
                desc: 'reusable UI patterns',
                examples: ['.btn { @apply px-4 py-2 rounded; }', '.card { @apply shadow p-6 bg-white; }'],
              },
              {
                layer: 'utilities',
                color: GREEN,
                desc: 'single-purpose custom',
                examples: ['.scrollbar-hidden { scrollbar-width: none; }'],
              },
            ].map(({ layer, color, desc, examples }, i) => (
              <motion.div
                key={layer}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                style={{
                  background: `${color}0a`, border: `1px solid ${color}2a`, borderRadius: 8,
                  padding: compact ? '5px 8px' : '7px 10px',
                }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 5 : 7, marginBottom: 4 }}>
                  <span style={{
                    fontFamily: mono, fontSize: compact ? 8 : 9, fontWeight: 700, color,
                    background: `${color}1a`, border: `1px solid ${color}44`,
                    borderRadius: 4, padding: '1px 6px',
                  }}>@layer {layer}</span>
                  <span style={{ fontFamily: mono, fontSize: compact ? 6 : 7, color: SLATE }}>{desc}</span>
                </div>
                {examples.map((ex) => (
                  <div key={ex} style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: SLATE + 'cc', lineHeight: 1.5 }}>
                    {'  '}{ex}
                  </div>
                ))}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 2: @theme v4 */}
        {s === 2 && (
          <motion.div key="theme"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 4 : 7 }}>
            <div style={{
              background: `${PINK}08`, border: `1px solid ${PINK}2a`, borderRadius: 8,
              padding: compact ? '5px 8px' : '7px 10px', marginBottom: compact ? 2 : 4,
            }}>
              <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: PINK, fontWeight: 700, marginBottom: 3 }}>
                @theme {'{ ... }'}  — Tailwind v4 CSS-first config
              </div>
              <div style={{ fontFamily: mono, fontSize: compact ? 6 : 8, color: SLATE, lineHeight: 1.65 }}>
                replaces tailwind.config.js
              </div>
            </div>
            {[
              { token: '--color-brand-500', value: 'oklch(0.60 0.22 250)', generates: 'bg-brand-500 text-brand-500', color: SKY },
              { token: '--font-display',    value: '"Satoshi", sans-serif', generates: 'font-display',               color: AMBER },
              { token: '--breakpoint-3xl',  value: '120rem',               generates: '3xl: prefix',                color: GREEN },
              { token: '--animate-fade-in', value: 'fade-in 0.3s ease',    generates: 'animate-fade-in',            color: VIOLET },
            ].map(({ token, value, generates, color }, i) => (
              <motion.div
                key={token}
                initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{
                  background: `${color}0a`, border: `1px solid ${color}2a`, borderRadius: 7,
                  padding: compact ? '4px 7px' : '5px 9px',
                }}>
                <div style={{ fontFamily: mono, fontSize: compact ? 7 : 9, color, fontWeight: 700 }}>{token}</div>
                <div style={{ fontFamily: mono, fontSize: compact ? 6 : 7, color: SLATE + '88', marginTop: 1 }}>
                  {value} → <span style={{ color: color + 'cc' }}>{generates}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 3: Container Queries */}
        {s === 3 && (
          <motion.div key="container"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: panelW, display: 'flex', flexDirection: 'column', gap: compact ? 5 : 8 }}>
            <div style={{ fontSize: compact ? 7 : 8, fontFamily: mono, color: SLATE, marginBottom: 2 }}>
              <span style={{ color: AMBER }}>@container</span> — respond to parent width, not viewport
            </div>

            {/* Container sizes comparison */}
            {[
              { label: 'narrow container', w: compact ? 90 : 120, cols: 'flex-col', color: SKY,   badge: 'default' },
              { label: 'wide container',   w: compact ? 180 : 240, cols: 'flex-row', color: GREEN, badge: '@md:' },
            ].map(({ label, w, cols, color, badge }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.2 }}
                style={{
                  background: `${color}08`, border: `2px solid ${color}2a`,
                  borderRadius: 8, padding: compact ? '5px 7px' : '7px 10px',
                  width: w, position: 'relative' as const,
                }}>
                <div style={{
                  position: 'absolute' as const, top: compact ? -8 : -9, left: 8,
                  fontFamily: mono, fontSize: compact ? 6 : 7, color,
                  background: 'var(--surface)', padding: '0 3px', fontWeight: 700,
                }}>@container</div>
                <div style={{ fontFamily: mono, fontSize: compact ? 6 : 7, color: color + '88', marginBottom: 4 }}>
                  {label}
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: cols === 'flex-row' ? 'row' : 'column',
                  gap: compact ? 3 : 4,
                }}>
                  {[
                    { bg: color + '22', txt: 'img' },
                    { bg: color + '12', txt: 'text' },
                  ].map(({ bg, txt }) => (
                    <div key={txt} style={{
                      flex: cols === 'flex-row' ? 1 : undefined,
                      background: bg, borderRadius: 4,
                      padding: compact ? '2px 4px' : '3px 6px',
                      fontFamily: mono, fontSize: compact ? 6 : 7, color, textAlign: 'center' as const,
                    }}>{txt}</div>
                  ))}
                </div>
                <div style={{
                  marginTop: compact ? 3 : 4, fontFamily: mono, fontSize: compact ? 6 : 7,
                  color: color + 'aa', textAlign: 'center' as const,
                }}>{badge}: flex-{cols === 'flex-col' ? 'col' : 'row'}</div>
              </motion.div>
            ))}

            <div style={{ fontFamily: mono, fontSize: compact ? 7 : 8, color: SLATE + '88', lineHeight: 1.6 }}>
              flex-col <span style={{ color: GREEN }}>@md:flex-row</span> — adapts to container
            </div>
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
            color: [AMBER, SKY, PINK, GREEN][s] ?? SKY,
            textAlign: 'center' as const, maxWidth: 320,
          }}
        >
          {[
            'w-[347px] — square brackets escape the design system for exact values',
            '@layer base/components/utilities — @apply composes tokens into custom classes',
            '@theme in CSS replaces tailwind.config.js — tokens auto-generate utility classes',
            '@container marks parent — @sm: @md: respond to container width, not viewport',
          ][s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
