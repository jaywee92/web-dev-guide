import { useState, useCallback } from 'react'
import { Copy, Plus, Trash2, Check } from 'lucide-react'

type GradientType = 'linear' | 'radial' | 'conic'

interface ColorStop {
  id: number
  color: string
  position: number
}

interface State {
  type: GradientType
  angle: number
  stops: ColorStop[]
  copied: boolean
}

let nextId = 3

const DEFAULT_STOPS: ColorStop[] = [
  { id: 1, color: '#6366f1', position: 0 },
  { id: 2, color: '#ec4899', position: 100 },
]

function buildGradientCSS(type: GradientType, angle: number, stops: ColorStop[]): string {
  const sortedStops = [...stops].sort((a, b) => a.position - b.position)
  const stopStr = sortedStops.map(s => `${s.color} ${s.position}%`).join(', ')

  if (type === 'linear') return `linear-gradient(${angle}deg, ${stopStr})`
  if (type === 'radial') return `radial-gradient(circle, ${stopStr})`
  return `conic-gradient(from 0deg, ${stopStr})`
}

export default function GradientPlayground() {
  const [state, setState] = useState<State>({
    type: 'linear',
    angle: 135,
    stops: DEFAULT_STOPS,
    copied: false,
  })

  const gradientValue = buildGradientCSS(state.type, state.angle, state.stops)
  const cssOutput = `background: ${gradientValue};`

  const setType = (type: GradientType) => setState(s => ({ ...s, type }))
  const setAngle = (angle: number) => setState(s => ({ ...s, angle }))

  const updateStop = useCallback((id: number, field: 'color' | 'position', value: string | number) => {
    setState(s => ({
      ...s,
      stops: s.stops.map(stop => stop.id === id ? { ...stop, [field]: value } : stop),
    }))
  }, [])

  const addStop = () => {
    setState(s => ({
      ...s,
      stops: [...s.stops, { id: nextId++, color: '#a855f7', position: 50 }],
    }))
  }

  const removeStop = (id: number) => {
    setState(s => ({
      ...s,
      stops: s.stops.length > 2 ? s.stops.filter(stop => stop.id !== id) : s.stops,
    }))
  }

  const copyCSS = () => {
    navigator.clipboard.writeText(cssOutput).then(() => {
      setState(s => ({ ...s, copied: true }))
      setTimeout(() => setState(s => ({ ...s, copied: false })), 1800)
    })
  }

  const sortedStops = [...state.stops].sort((a, b) => a.position - b.position)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
      {/* Controls */}
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius)', padding: 24, display: 'flex', flexDirection: 'column', gap: 20,
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', margin: 0 }}>Controls</h3>

        {/* Type selector */}
        <div>
          <label style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>
            gradient type
          </label>
          <div style={{ display: 'flex', gap: 6 }}>
            {(['linear', 'radial', 'conic'] as GradientType[]).map(t => (
              <button
                key={t}
                onClick={() => setType(t)}
                style={{
                  flex: 1,
                  padding: '6px 0',
                  border: '1px solid var(--border)',
                  borderRadius: 6,
                  fontSize: 12,
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  background: state.type === t ? 'var(--blue)' : 'var(--surface)',
                  color: state.type === t ? '#fff' : 'var(--text-muted)',
                  transition: 'all 0.15s',
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Angle slider — linear only */}
        {state.type === 'linear' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <label style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>angle</label>
              <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--blue)' }}>{state.angle}deg</span>
            </div>
            <input
              type="range" min={0} max={360}
              value={state.angle}
              onChange={e => setAngle(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--blue)' }}
            />
          </div>
        )}

        {/* Color stops */}
        <div>
          <label style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'block', marginBottom: 10 }}>
            color stops
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {sortedStops.map(stop => (
              <div key={stop.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="color"
                  value={stop.color}
                  onChange={e => updateStop(stop.id, 'color', e.target.value)}
                  style={{ width: 32, height: 32, border: 'none', borderRadius: 4, cursor: 'pointer', padding: 0 }}
                />
                <input
                  type="range" min={0} max={100}
                  value={stop.position}
                  onChange={e => updateStop(stop.id, 'position', Number(e.target.value))}
                  style={{ flex: 1, accentColor: stop.color }}
                />
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', width: 32, textAlign: 'right' }}>
                  {stop.position}%
                </span>
                <button
                  onClick={() => removeStop(stop.id)}
                  disabled={state.stops.length <= 2}
                  style={{
                    background: 'none', border: 'none', cursor: state.stops.length <= 2 ? 'default' : 'pointer',
                    color: state.stops.length <= 2 ? 'var(--border)' : 'var(--text-muted)',
                    padding: 2,
                  }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addStop}
            style={{
              marginTop: 10, display: 'flex', alignItems: 'center', gap: 4,
              background: 'none', border: '1px dashed var(--border)', borderRadius: 6,
              padding: '6px 12px', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 12,
              width: '100%', justifyContent: 'center',
            }}
          >
            <Plus size={12} /> Add stop
          </button>
        </div>
      </div>

      {/* Preview */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Gradient preview box */}
        <div style={{
          height: 200,
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
          background: gradientValue,
          transition: 'background 0.2s',
        }} />

        {/* CSS output */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius)', padding: 16,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
            <pre style={{
              margin: 0, fontFamily: 'var(--font-mono)', fontSize: 12,
              color: 'var(--blue)', whiteSpace: 'pre-wrap', wordBreak: 'break-all', flex: 1,
            }}>
              {cssOutput}
            </pre>
            <button
              onClick={copyCSS}
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                background: state.copied ? 'var(--green)' : 'var(--blue)',
                color: '#fff', border: 'none', borderRadius: 6,
                padding: '6px 12px', cursor: 'pointer', fontSize: 12,
                fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0,
                transition: 'background 0.2s',
              }}
            >
              {state.copied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy CSS</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
