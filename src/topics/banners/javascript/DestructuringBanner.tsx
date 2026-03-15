export default function DestructuringBanner() {
  const C = '#fbbf24'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-ds" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-ds" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
        <marker id="arr-ds" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={`${C}80`} />
        </marker>
      </defs>
      <rect width="780" height="220" fill="url(#dots-ds)" />
      <rect width="780" height="220" fill="url(#glow-ds)" />

      {/* === Section 1: Object destructuring === */}
      <text x="195" y="16" fill={`${C}60`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="700">object destructuring</text>

      {/* source object */}
      <rect x="22" y="24" width="150" height="82" rx="6" fill={`${C}0a`} stroke={`${C}40`} strokeWidth="1.5" />
      <text x="97" y="42" fill={`${C}cc`} fontSize="9.5" fontFamily="monospace" textAnchor="middle">{'{ name,'}</text>
      <text x="97" y="58" fill={`${C}cc`} fontSize="9.5" fontFamily="monospace" textAnchor="middle">{'  age,'}</text>
      <text x="97" y="74" fill={`${C}cc`} fontSize="9.5" fontFamily="monospace" textAnchor="middle">{'  city }'}</text>
      <text x="97" y="98" fill={`${C}40`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">source object</text>

      {/* arrow */}
      <line x1="174" y1="65" x2="204" y2="65" stroke={`${C}70`} strokeWidth="1.8" markerEnd="url(#arr-ds)" />

      {/* extracted variable boxes */}
      {['name', 'age', 'city'].map((key, i) => (
        <g key={key}>
          <rect x="208" y={24 + i * 30} width="80" height="22" rx="4" fill={`${C}14`} stroke={`${C}45`} strokeWidth="1.2" />
          <text x="248" y={39 + i * 30} fill={`${C}ee`} fontSize="9.5" fontFamily="monospace" textAnchor="middle">{key}</text>
        </g>
      ))}
      <text x="248" y="118" fill={`${C}40`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">extracted vars</text>

      {/* syntax hint */}
      <rect x="22" y="130" width="306" height="24" rx="4" fill={`${C}07`} stroke={`${C}20`} strokeWidth="1" />
      <text x="175" y="146" fill={`${C}70`} fontSize="9" fontFamily="monospace" textAnchor="middle">{'const { name, age, city } = person'}</text>

      {/* divider */}
      <line x1="360" y1="10" x2="360" y2="210" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* === Section 2: Array destructuring === */}
      <text x="570" y="16" fill={`${C}60`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="700">array destructuring</text>

      {/* source array */}
      {['a', 'b', 'c'].map((label, i) => (
        <g key={label}>
          <rect x={380 + i * 46} y="24" width="38" height="32" rx="4" fill={`${C}10`} stroke={`${C}35`} strokeWidth="1.2" />
          <text x={399 + i * 46} y="45" fill={`${C}dd`} fontSize="10" fontFamily="monospace" textAnchor="middle">{label}</text>
        </g>
      ))}
      {/* rest box */}
      <rect x="518" y="24" width="64" height="32" rx="4" fill={`${C}08`} stroke={`${C}25`} strokeWidth="1" strokeDasharray="3 2" />
      <text x="550" y="45" fill={`${C}80`} fontSize="9.5" fontFamily="monospace" textAnchor="middle">...rest</text>
      <text x="570" y="72" fill={`${C}40`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">source array</text>

      {/* arrow down */}
      <line x1="480" y1="80" x2="480" y2="100" stroke={`${C}70`} strokeWidth="1.8" markerEnd="url(#arr-ds)" />

      {/* extracted variable boxes */}
      {['a', 'b', 'c'].map((label, i) => (
        <g key={label}>
          <rect x={380 + i * 46} y="105" width="38" height="28" rx="4" fill={`${C}14`} stroke={`${C}45`} strokeWidth="1.2" />
          <text x={399 + i * 46} y="124" fill={`${C}ee`} fontSize="10" fontFamily="monospace" textAnchor="middle">{label}</text>
        </g>
      ))}
      <rect x="518" y="105" width="64" height="28" rx="4" fill={`${C}09`} stroke={`${C}28`} strokeWidth="1" strokeDasharray="3 2" />
      <text x="550" y="124" fill={`${C}80`} fontSize="9.5" fontFamily="monospace" textAnchor="middle">...rest</text>
      <text x="550" y="148" fill={`${C}40`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">remaining items</text>

      {/* syntax hint */}
      <rect x="368" y="160" width="390" height="24" rx="4" fill={`${C}07`} stroke={`${C}20`} strokeWidth="1" />
      <text x="563" y="176" fill={`${C}70`} fontSize="9" fontFamily="monospace" textAnchor="middle">{'const [a, b, c, ...rest] = array'}</text>
    </svg>
  )
}
