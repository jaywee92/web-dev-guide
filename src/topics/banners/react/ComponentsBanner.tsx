export default function ComponentsBanner() {
  const C = '#61dafb'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-cmp" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-cmp" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
        <marker id="arr-cmp" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill={`${C}99`} />
        </marker>
      </defs>
      <rect width="780" height="220" fill="url(#dots-cmp)" />
      <rect width="780" height="220" fill="url(#glow-cmp)" />

      {/* App box — top center */}
      <rect x="340" y="18" width="100" height="30" rx="5" fill={`${C}20`} stroke={C} strokeWidth="1.5" />
      <text x="390" y="38" fill={C} fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="700">&lt;App&gt;</text>

      {/* Lines from App to children */}
      {/* App center-bottom → branch point */}
      <line x1="390" y1="48" x2="390" y2="65" stroke={`${C}55`} strokeWidth="1.2" />
      <line x1="175" y1="65" x2="605" y2="65" stroke={`${C}55`} strokeWidth="1.2" />
      {/* Down to Header */}
      <line x1="175" y1="65" x2="175" y2="80" stroke={`${C}55`} strokeWidth="1.2" />
      {/* Down to Main */}
      <line x1="390" y1="65" x2="390" y2="80" stroke={`${C}55`} strokeWidth="1.2" />
      {/* Down to Footer */}
      <line x1="605" y1="65" x2="605" y2="80" stroke={`${C}55`} strokeWidth="1.2" />

      {/* Header box */}
      <rect x="120" y="80" width="110" height="30" rx="5" fill={`${C}14`} stroke={`${C}88`} strokeWidth="1.2" />
      <text x="175" y="100" fill={`${C}dd`} fontSize="10.5" fontFamily="monospace" textAnchor="middle">&lt;Header&gt;</text>

      {/* Main box */}
      <rect x="335" y="80" width="110" height="30" rx="5" fill={`${C}22`} stroke={C} strokeWidth="1.5" />
      <text x="390" y="100" fill={C} fontSize="10.5" fontFamily="monospace" textAnchor="middle">&lt;Main&gt;</text>

      {/* Footer box */}
      <rect x="550" y="80" width="110" height="30" rx="5" fill={`${C}14`} stroke={`${C}88`} strokeWidth="1.2" />
      <text x="605" y="100" fill={`${C}dd`} fontSize="10.5" fontFamily="monospace" textAnchor="middle">&lt;Footer&gt;</text>

      {/* Main → ProductList */}
      <line x1="390" y1="110" x2="390" y2="125" stroke={`${C}55`} strokeWidth="1.2" />
      <line x1="390" y1="125" x2="355" y2="125" stroke={`${C}55`} strokeWidth="1.2" />
      <line x1="355" y1="125" x2="355" y2="140" stroke={`${C}55`} strokeWidth="1.2" />

      {/* ProductList box */}
      <rect x="295" y="140" width="120" height="28" rx="5" fill={`${C}18`} stroke={`${C}77`} strokeWidth="1.2" />
      <text x="355" y="159" fill={`${C}cc`} fontSize="10" fontFamily="monospace" textAnchor="middle">&lt;ProductList&gt;</text>

      {/* ProductList → 3 ProductCard boxes */}
      <line x1="355" y1="168" x2="355" y2="178" stroke={`${C}55`} strokeWidth="1.2" />
      <line x1="210" y1="178" x2="490" y2="178" stroke={`${C}55`} strokeWidth="1.2" />
      <line x1="210" y1="178" x2="210" y2="190" stroke={`${C}55`} strokeWidth="1.2" />
      <line x1="355" y1="178" x2="355" y2="190" stroke={`${C}55`} strokeWidth="1.2" />
      <line x1="490" y1="178" x2="490" y2="190" stroke={`${C}55`} strokeWidth="1.2" />

      {/* ProductCard boxes */}
      <rect x="156" y="190" width="108" height="24" rx="4" fill={`${C}10`} stroke={`${C}55`} strokeWidth="1" />
      <text x="210" y="207" fill={`${C}aa`} fontSize="9.5" fontFamily="monospace" textAnchor="middle">&lt;ProductCard&gt;</text>

      <rect x="301" y="190" width="108" height="24" rx="4" fill={`${C}10`} stroke={`${C}55`} strokeWidth="1" />
      <text x="355" y="207" fill={`${C}aa`} fontSize="9.5" fontFamily="monospace" textAnchor="middle">&lt;ProductCard&gt;</text>

      <rect x="436" y="190" width="108" height="24" rx="4" fill={`${C}10`} stroke={`${C}55`} strokeWidth="1" />
      <text x="490" y="207" fill={`${C}aa`} fontSize="9.5" fontFamily="monospace" textAnchor="middle">&lt;ProductCard&gt;</text>

      {/* Props arrow: App → Header with "props" label */}
      <line x1="340" y1="33" x2="230" y2="80" stroke={`${C}77`} strokeWidth="1" strokeDasharray="4 2" markerEnd="url(#arr-cmp)" />
      <text x="262" y="58" fill={`${C}99`} fontSize="9" fontFamily="monospace" textAnchor="middle">props</text>
    </svg>
  )
}
