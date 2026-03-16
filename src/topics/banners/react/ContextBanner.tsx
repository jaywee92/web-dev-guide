export default function ContextBanner() {
  const C = '#f472b6'

  const nodes = [
    { label: 'App',     y: 26 },
    { label: 'Layout',  y: 76 },
    { label: 'Sidebar', y: 126 },
    { label: 'Avatar',  y: 176 },
  ]

  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-ctx" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-ctx" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-ctx)" />
      <rect width="780" height="220" fill="url(#glow-ctx)" />

      {/* ── LEFT: Prop drilling ── */}
      <text x="110" y="14" fill={`${C}70`} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="700">PROP DRILLING</text>

      {nodes.map(({ label, y }, i) => {
        const isEndpoint = i === 0 || i === 3
        return (
          <g key={label}>
            <rect x="48" y={y} width="124" height="30" rx="5"
              fill={isEndpoint ? `${C}15` : 'rgba(255,255,255,0.03)'}
              stroke={isEndpoint ? `${C}50` : 'rgba(255,255,255,0.1)'}
              strokeWidth="1.2" />
            <text x="110" y={y + 19} fontSize="10" fontFamily="monospace" textAnchor="middle"
              fill={isEndpoint ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.3)'}>
              {label}
            </text>
          </g>
        )
      })}

      {/* Connectors with "user" labels */}
      {[56, 106, 156].map((y, i) => (
        <g key={y}>
          <line x1="110" y1={y} x2="110" y2={y + 18} stroke={i === 0 ? `${C}60` : 'rgba(255,255,255,0.15)'} strokeWidth="1.5" strokeDasharray={i > 0 ? '3 2' : '0'} />
          <polygon points={`106,${y + 18} 110,${y + 20} 114,${y + 18}`} fill={i === 0 ? `${C}60` : 'rgba(255,255,255,0.15)'} />
          <text x="120" y={y + 12} fontSize="8" fontFamily="monospace" fill={i === 0 ? `${C}55` : 'rgba(255,255,255,0.2)'}>user</text>
        </g>
      ))}

      <text x="110" y="213" fill={`${C}35`} fontSize="8" fontFamily="monospace" textAnchor="middle">middle layers pass props they don't use</text>

      {/* Divider */}
      <line x1="218" y1="8" x2="218" y2="212" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* ── CENTER: Context solution ── */}
      <text x="392" y="14" fill={`${C}70`} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="700">CONTEXT SOLUTION</text>

      {/* Provider bracket */}
      <rect x="232" y="20" width="10" height="190" rx="3" fill={`${C}10`} stroke={`${C}40`} strokeWidth="1" />
      <text x="228" y="118" fontSize="8" fontFamily="monospace" fill={`${C}60`}
        transform="rotate(-90 228 118)" textAnchor="middle">Provider</text>

      {nodes.map(({ label, y }, i) => {
        const isEndpoint = i === 0 || i === 3
        return (
          <g key={label}>
            <rect x="252" y={y} width="124" height="30" rx="5"
              fill={isEndpoint ? `${C}15` : 'rgba(255,255,255,0.03)'}
              stroke={isEndpoint ? `${C}50` : 'rgba(255,255,255,0.06)'}
              strokeWidth="1.2" />
            <text x="314" y={y + 19} fontSize="10" fontFamily="monospace" textAnchor="middle"
              fill={isEndpoint ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.22)'}>
              {label}
            </text>
          </g>
        )
      })}

      {/* Clean connectors — no labels */}
      {[56, 106, 156].map((y) => (
        <line key={y} x1="314" y1={y} x2="314" y2={y + 18} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      ))}

      {/* useContext arc: Provider → Avatar */}
      <path d="M 242 35 C 430 35, 430 191, 378 191"
        stroke={C} strokeWidth="1.8" fill="none" strokeDasharray="5 3" opacity="0.75" />
      <polygon points="374,187 378,195 382,187" fill={C} opacity="0.75" />
      <text x="418" y="110" fontSize="8" fontFamily="monospace" fill={C} textAnchor="middle">useContext()</text>
      <text x="418" y="121" fontSize="7" fontFamily="monospace" fill={`${C}60`} textAnchor="middle">jumps directly</text>

      <text x="314" y="213" fill={`${C}35`} fontSize="8" fontFamily="monospace" textAnchor="middle">middle layers untouched ✅</text>

      {/* Divider */}
      <line x1="566" y1="8" x2="566" y2="212" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* ── RIGHT: useReducer cycle ── */}
      <text x="673" y="14" fill={`${C}70`} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="700">useREDUCER</text>

      {[
        { label: 'state',    sub: 'current value',    y: 28 },
        { label: 'dispatch', sub: '{ type, payload }', y: 98 },
        { label: 'reducer',  sub: '(state, action)',   y: 158 },
      ].map(({ label, sub, y }) => (
        <g key={label}>
          <rect x="617" y={y} width="112" height="38" rx="6"
            fill={`${C}12`} stroke={`${C}45`} strokeWidth="1.3" />
          <text x="673" y={y + 16} fontSize="11" fontFamily="monospace" fill={C} textAnchor="middle" fontWeight="700">{label}</text>
          <text x="673" y={y + 28} fontSize="8" fontFamily="monospace" fill={`${C}65`} textAnchor="middle">{sub}</text>
        </g>
      ))}

      {/* state → dispatch */}
      <line x1="673" y1="66" x2="673" y2="96" stroke={`${C}55`} strokeWidth="1.5" />
      <polygon points="669,94 673,98 677,94" fill={`${C}55`} />
      {/* dispatch → reducer */}
      <line x1="673" y1="136" x2="673" y2="156" stroke={`${C}55`} strokeWidth="1.5" />
      <polygon points="669,154 673,158 677,154" fill={`${C}55`} />
      {/* reducer → state (right arc) */}
      <path d="M 729 177 Q 762 113 729 46" stroke={`${C}55`} strokeWidth="1.5" fill="none" />
      <polygon points="725,48 729,42 733,48" fill={`${C}55`} />
      <text x="750" y="112" fontSize="8" fontFamily="monospace" fill={`${C}55`}>new state</text>
    </svg>
  )
}
