import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'

// ── Types ─────────────────────────────────────────────────────────────────────

type SliderControl = {
  type: 'range'
  key: string
  label: string
  min: number
  max: number
  step?: number
  unit: string
  default: number
}

type SelectControl = {
  type: 'select'
  key: string
  label: string
  options: string[]
  default: string
}

type Control = SliderControl | SelectControl

type SliderConfig = {
  controls: Control[]
  cssGen: (state: Record<string, number | string>) => Record<string, string>
  previewEl: (state: Record<string, number | string>, color: string) => React.ReactNode
  codeLines: (state: Record<string, number | string>) => string[]
}

// ── Per-topic configs ──────────────────────────────────────────────────────────

const CONFIGS: Record<string, SliderConfig> = {

  'css-flexbox': {
    controls: [
      { type: 'range',  key: 'gap',     label: 'gap',              min: 0, max: 40, unit: 'px',  default: 8 },
      { type: 'range',  key: 'grow',    label: 'flex-grow',        min: 0, max: 3, step: 1, unit: '', default: 0 },
      { type: 'range',  key: 'itemW',   label: 'item width',       min: 40, max: 160, unit: 'px', default: 80 },
      { type: 'select', key: 'justify', label: 'justify-content',  options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around'], default: 'flex-start' },
      { type: 'select', key: 'align',   label: 'align-items',      options: ['stretch', 'flex-start', 'center', 'flex-end'], default: 'stretch' },
    ],
    cssGen: (s) => ({
      display: 'flex',
      gap: `${s.gap}px`,
      justifyContent: s.justify as string,
      alignItems: s.align as string,
    }),
    previewEl: (s, color) => (
      <div style={{
        display: 'flex',
        gap: `${s.gap}px`,
        justifyContent: s.justify as string,
        alignItems: s.align as string,
        width: '100%', minHeight: 100, padding: 8,
      }}>
        {(['A', 'B', 'C'] as const).map((l, i) => (
          <motion.div
            key={l}
            layout
            animate={{ flexGrow: Number(s.grow), width: Number(s.itemW) }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            style={{
              height: 64, borderRadius: 8, flexShrink: 0,
              background: `${color}${['22', '18', '14'][i]}`,
              border: `1px solid ${color}44`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color, fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700,
            }}
          >
            {l}
          </motion.div>
        ))}
      </div>
    ),
    codeLines: (s) => [
      `.container {`,
      `  display: flex;`,
      `  gap: ${s.gap}px;`,
      `  justify-content: ${s.justify};`,
      `  align-items: ${s.align};`,
      `}`,
      `.item {`,
      `  flex-grow: ${s.grow};`,
      `  width: ${s.itemW}px;`,
      `}`,
    ],
  },

  'css-grid': {
    controls: [
      { type: 'range',  key: 'cols',    label: 'columns',    min: 1, max: 5, step: 1, unit: '', default: 3 },
      { type: 'range',  key: 'gap',     label: 'gap',        min: 0, max: 32, unit: 'px', default: 12 },
      { type: 'range',  key: 'rowH',    label: 'row height', min: 40, max: 120, unit: 'px', default: 70 },
      { type: 'select', key: 'justify', label: 'justify-items', options: ['stretch', 'start', 'center', 'end'], default: 'stretch' },
    ],
    cssGen: (s) => ({
      display: 'grid',
      gridTemplateColumns: `repeat(${s.cols}, 1fr)`,
      gap: `${s.gap}px`,
    }),
    previewEl: (s, color) => (
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${s.cols}, 1fr)`,
        gap: `${s.gap}px`,
        width: '100%', justifyItems: s.justify as string,
      }}>
        {Array.from({ length: Number(s.cols) * 2 }, (_, i) => (
          <motion.div
            key={i}
            layout
            style={{
              height: Number(s.rowH),
              borderRadius: 6,
              background: `${color}${i % 2 === 0 ? '20' : '14'}`,
              border: `1px solid ${color}33`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color, fontFamily: 'var(--font-mono)', fontSize: 11,
            }}
          >
            {i + 1}
          </motion.div>
        ))}
      </div>
    ),
    codeLines: (s) => [
      `.grid {`,
      `  display: grid;`,
      `  grid-template-columns: repeat(${s.cols}, 1fr);`,
      `  gap: ${s.gap}px;`,
      `  justify-items: ${s.justify};`,
      `}`,
    ],
  },

  'css-box-model': {
    controls: [
      { type: 'range', key: 'padding',       label: 'padding',       min: 0,  max: 60,  unit: 'px', default: 24 },
      { type: 'range', key: 'margin',         label: 'margin',        min: 0,  max: 40,  unit: 'px', default: 16 },
      { type: 'range', key: 'borderWidth',    label: 'border-width',  min: 0,  max: 12,  unit: 'px', default: 2  },
      { type: 'range', key: 'borderRadius',   label: 'border-radius', min: 0,  max: 40,  unit: 'px', default: 8  },
    ],
    cssGen: (s) => ({
      padding: `${s.padding}px`,
      margin: `${s.margin}px`,
      borderWidth: `${s.borderWidth}px`,
      borderRadius: `${s.borderRadius}px`,
    }),
    previewEl: (s, color) => (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: 160 }}>
        <motion.div
          animate={{
            padding: Number(s.padding),
            margin: Number(s.margin),
            borderWidth: Number(s.borderWidth),
            borderRadius: Number(s.borderRadius),
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          style={{
            borderStyle: 'solid', borderColor: color,
            background: `${color}14`, color,
            fontFamily: 'var(--font-mono)', fontSize: 13, textAlign: 'center',
            minWidth: 80,
          }}
        >
          .box
        </motion.div>
      </div>
    ),
    codeLines: (s) => [
      `.box {`,
      `  padding: ${s.padding}px;`,
      `  margin: ${s.margin}px;`,
      `  border: ${s.borderWidth}px solid currentColor;`,
      `  border-radius: ${s.borderRadius}px;`,
      `}`,
    ],
  },

  'css-transforms': {
    controls: [
      { type: 'range', key: 'rotate',     label: 'rotate',      min: -180, max: 180, unit: 'deg', default: 0   },
      { type: 'range', key: 'scale',      label: 'scale',       min: 25,   max: 200, unit: '%',   default: 100 },
      { type: 'range', key: 'translateX', label: 'translateX',  min: -80,  max: 80,  unit: 'px',  default: 0   },
      { type: 'range', key: 'translateY', label: 'translateY',  min: -80,  max: 80,  unit: 'px',  default: 0   },
    ],
    cssGen: (s) => ({
      transform: `rotate(${s.rotate}deg) scale(${Number(s.scale) / 100}) translate(${s.translateX}px, ${s.translateY}px)`,
    }),
    previewEl: (s, color) => (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: 200 }}>
        <motion.div
          animate={{
            rotate: Number(s.rotate),
            scale: Number(s.scale) / 100,
            x: Number(s.translateX),
            y: Number(s.translateY),
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          style={{
            width: 80, height: 80, borderRadius: 12,
            background: `${color}20`, border: `2px solid ${color}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color, fontFamily: 'var(--font-mono)', fontSize: 11,
          }}
        >
          .box
        </motion.div>
      </div>
    ),
    codeLines: (s) => [
      `.box {`,
      `  transform:`,
      `    rotate(${s.rotate}deg)`,
      `    scale(${(Number(s.scale) / 100).toFixed(2)})`,
      `    translate(${s.translateX}px, ${s.translateY}px);`,
      `}`,
    ],
  },

  'css-shadows': {
    controls: [
      { type: 'range', key: 'offsetX', label: 'offset-x',   min: -40, max: 40, unit: 'px', default: 4  },
      { type: 'range', key: 'offsetY', label: 'offset-y',   min: -40, max: 40, unit: 'px', default: 8  },
      { type: 'range', key: 'blur',    label: 'blur',        min: 0,   max: 60, unit: 'px', default: 24 },
      { type: 'range', key: 'spread',  label: 'spread',      min: -20, max: 30, unit: 'px', default: 0  },
      { type: 'range', key: 'opacity', label: 'opacity',     min: 0,   max: 100, unit: '%', default: 40 },
    ],
    cssGen: (s) => ({
      boxShadow: `${s.offsetX}px ${s.offsetY}px ${s.blur}px ${s.spread}px rgba(0,0,0,${Number(s.opacity) / 100})`,
    }),
    previewEl: (s, color) => {
      const alpha = (Number(s.opacity) / 100).toFixed(2)
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: 180 }}>
          <motion.div
            animate={{
              boxShadow: `${s.offsetX}px ${s.offsetY}px ${s.blur}px ${s.spread}px rgba(0,0,0,${alpha})`,
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            style={{
              width: 100, height: 100, borderRadius: 12,
              background: `${color}20`, border: `1px solid ${color}44`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color, fontFamily: 'var(--font-mono)', fontSize: 11,
            }}
          >
            .box
          </motion.div>
        </div>
      )
    },
    codeLines: (s) => {
      const alpha = (Number(s.opacity) / 100).toFixed(2)
      return [
        `.box {`,
        `  box-shadow:`,
        `    ${s.offsetX}px ${s.offsetY}px`,
        `    ${s.blur}px ${s.spread}px`,
        `    rgba(0, 0, 0, ${alpha});`,
        `}`,
      ]
    },
  },

  'css-transitions': {
    controls: [
      { type: 'range',  key: 'duration', label: 'duration',         min: 0,  max: 3000, step: 100, unit: 'ms', default: 300 },
      { type: 'range',  key: 'delay',    label: 'delay',            min: 0,  max: 1000, step: 50,  unit: 'ms', default: 0   },
      { type: 'select', key: 'easing',   label: 'timing-function',  options: ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'], default: 'ease' },
    ],
    cssGen: (s) => ({
      transition: `all ${s.duration}ms ${s.easing} ${s.delay}ms`,
    }),
    previewEl: (s, color) => (
      <TransitionPreview color={color} duration={Number(s.duration)} delay={Number(s.delay)} easing={s.easing as string} />
    ),
    codeLines: (s) => [
      `.box {`,
      `  transition:`,
      `    all ${s.duration}ms`,
      `    ${s.easing}`,
      `    ${s.delay}ms;`,
      `}`,
    ],
  },

  'css-typography': {
    controls: [
      { type: 'range', key: 'fontSize',      label: 'font-size',       min: 10, max: 40,  unit: 'px',  default: 16 },
      { type: 'range', key: 'lineHeight',    label: 'line-height',     min: 10, max: 30,  unit: '',    default: 16 },
      { type: 'range', key: 'letterSpacing', label: 'letter-spacing',  min: -2, max: 12,  unit: 'px',  default: 0  },
      { type: 'range', key: 'fontWeight',    label: 'font-weight',     min: 100, max: 900, step: 100, unit: '', default: 400 },
    ],
    cssGen: (s) => ({
      fontSize: `${s.fontSize}px`,
      lineHeight: `${(Number(s.lineHeight) / 10).toFixed(1)}`,
      letterSpacing: `${s.letterSpacing}px`,
      fontWeight: `${s.fontWeight}`,
    }),
    previewEl: (s, _color) => (
      <div style={{ padding: '16px 24px', width: '100%', maxWidth: 420 }}>
        <motion.p
          animate={{
            fontSize: Number(s.fontSize),
            lineHeight: Number(s.lineHeight) / 10,
            letterSpacing: Number(s.letterSpacing),
            fontWeight: Number(s.fontWeight),
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          style={{ color: 'var(--text)', fontFamily: 'var(--font-sans)' }}
        >
          The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.
        </motion.p>
      </div>
    ),
    codeLines: (s) => [
      `p {`,
      `  font-size: ${s.fontSize}px;`,
      `  line-height: ${(Number(s.lineHeight) / 10).toFixed(1)};`,
      `  letter-spacing: ${s.letterSpacing}px;`,
      `  font-weight: ${s.fontWeight};`,
      `}`,
    ],
  },
}

// ── Transition preview sub-component (needs useState for hover) ───────────────

function TransitionPreview({ color, duration, delay, easing }: { color: string; duration: number; delay: number; easing: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: 180, flexDirection: 'column', gap: 12 }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: hovered ? 160 : 80,
          height: 80,
          borderRadius: hovered ? 40 : 8,
          background: hovered ? color : `${color}20`,
          border: `2px solid ${color}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: hovered ? '#fff' : color,
          fontFamily: 'var(--font-mono)', fontSize: 11,
          cursor: 'pointer',
          transition: `all ${duration}ms ${easing} ${delay}ms`,
        }}
      >
        hover me
      </div>
      <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
        {duration}ms {easing}{delay > 0 ? ` · ${delay}ms delay` : ''}
      </span>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

interface Props {
  topicId: string
  color: string
}

export function hasSliderConfig(topicId: string): boolean {
  return topicId in CONFIGS
}

export default function SliderPlayground({ topicId, color }: Props) {
  const config = CONFIGS[topicId]
  if (!config) return null

  const initialState = useMemo(() => {
    const s: Record<string, number | string> = {}
    for (const ctrl of config.controls) {
      s[ctrl.key] = ctrl.default
    }
    return s
  }, [topicId]) // eslint-disable-line react-hooks/exhaustive-deps

  const [state, setState] = useState<Record<string, number | string>>(initialState)

  // Reset when topicId changes
  const [currentTopic, setCurrentTopic] = useState(topicId)
  if (currentTopic !== topicId) {
    setCurrentTopic(topicId)
    setState(initialState)
  }

  const update = (key: string, value: number | string) =>
    setState(s => ({ ...s, [key]: value }))

  const codeLines = config.codeLines(state)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 24, alignItems: 'start' }}>
      {/* Controls panel */}
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 12, padding: '16px 18px',
        display: 'flex', flexDirection: 'column', gap: 18,
      }}>
        {config.controls.map(ctrl => (
          <div key={ctrl.key}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                {ctrl.label}
              </label>
              <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color }}>
                {ctrl.type === 'range'
                  ? `${state[ctrl.key]}${ctrl.unit}`
                  : state[ctrl.key]
                }
              </span>
            </div>
            {ctrl.type === 'range' ? (
              <input
                type="range"
                min={ctrl.min}
                max={ctrl.max}
                step={ctrl.step ?? 1}
                value={state[ctrl.key] as number}
                onChange={e => update(ctrl.key, Number(e.target.value))}
                style={{ width: '100%', accentColor: color }}
              />
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {ctrl.options.map(opt => (
                  <button
                    key={opt}
                    onClick={() => update(ctrl.key, opt)}
                    style={{
                      padding: '3px 8px', borderRadius: 6, fontSize: 10,
                      fontFamily: 'var(--font-mono)', cursor: 'pointer', border: '1px solid',
                      borderColor: state[ctrl.key] === opt ? color : 'var(--border)',
                      background: state[ctrl.key] === opt ? `${color}18` : 'transparent',
                      color: state[ctrl.key] === opt ? color : 'var(--text-muted)',
                      transition: 'all 0.15s',
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        <button
          onClick={() => setState(initialState)}
          style={{
            padding: '6px 0', borderRadius: 8, border: '1px solid var(--border)',
            background: 'transparent', color: 'var(--text-muted)',
            fontSize: 11, fontFamily: 'var(--font-mono)', cursor: 'pointer',
            marginTop: 4, transition: 'all 0.15s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = color; (e.currentTarget as HTMLButtonElement).style.color = color }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)' }}
        >
          reset
        </button>
      </div>

      {/* Right: preview + live code */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Visual preview */}
        <div style={{
          background: 'var(--surface)', border: `1px solid ${color}22`,
          borderRadius: 12, padding: 24, minHeight: 180,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {config.previewEl(state, color)}
        </div>

        {/* Live CSS code */}
        <div style={{
          background: '#0c1118', border: '1px solid var(--border)',
          borderRadius: 12, padding: '16px 20px',
          fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.8,
        }}>
          <div style={{ fontSize: 10, color: 'var(--text-faint)', marginBottom: 10, letterSpacing: '0.5px' }}>
            GENERATED CSS
          </div>
          {codeLines.map((line, i) => {
            const indent = line.startsWith('  ')
            const isKey = indent && line.includes(':')
            const [prop, ...rest] = isKey ? line.split(':') : [line]
            const val = rest.join(':')
            return (
              <div key={i} style={{ display: 'flex' }}>
                {isKey ? (
                  <>
                    <span style={{ color: '#93c5fd' }}>{prop}</span>
                    <span style={{ color: 'var(--text-faint)' }}>:</span>
                    <span style={{ color, marginLeft: 4 }}>{val}</span>
                  </>
                ) : (
                  <span style={{ color: line === '}' ? 'var(--text-muted)' : 'var(--text-faint)' }}>{line}</span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
