export default function DataFetchingBanner() {
  const C = '#34d399'

  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-df" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-df" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-df)" />
      <rect width="780" height="220" fill="url(#glow-df)" />

      {/* LEFT: Fetch-on-render waterfall */}
      <text x="20" y="18" fill="#f43f5e90" fontSize="9" fontFamily="monospace" fontWeight="700">FETCH-ON-RENDER  🌊 waterfall</text>
      {[
        { label: 'fetch posts',    color: '#60a5fa' },
        { label: 'fetch comments', color: '#a78bfa' },
        { label: 'fetch likes',    color: '#f472b6' },
      ].map(({ label, color }, i) => (
        <g key={label}>
          <rect x="20" y={26 + i * 46} width="160" height="28" rx="4" fill={`${color}15`} stroke={`${color}40`} strokeWidth="1" />
          <text x="28" y={45 + i * 46} fontSize="9" fontFamily="monospace" fill={color}>{label}</text>
          {i < 2 && (
            <line x1="100" y1={54 + i * 46} x2="100" y2={58 + i * 46} stroke={`${color}40`} strokeWidth="1" strokeDasharray="2 2" />
          )}
        </g>
      ))}
      <rect x="20" y="172" width="160" height="18" rx="3" fill="rgba(244,63,94,0.12)" stroke="rgba(244,63,94,0.3)" strokeWidth="1" />
      <text x="100" y="184" fontSize="8" fontFamily="monospace" fill="#f43f5e" textAnchor="middle">total = 3 × 500ms = 1500ms</text>

      {/* Time axis */}
      <line x1="20" y1="200" x2="186" y2="200" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <text x="20" y="212" fontSize="8" fontFamily="monospace" fill="rgba(255,255,255,0.3)">t=0</text>
      <text x="186" y="212" fontSize="8" fontFamily="monospace" fill="rgba(255,255,255,0.3)" textAnchor="end">t=1500ms</text>

      {/* CENTER divider + label */}
      <line x1="210" y1="10" x2="210" y2="210" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <text x="390" y="110" fill="rgba(255,255,255,0.12)" fontSize="28" fontFamily="monospace" textAnchor="middle" fontWeight="700">vs</text>

      {/* RIGHT: Render-as-you-fetch */}
      <text x="420" y="18" fill={`${C}90`} fontSize="9" fontFamily="monospace" fontWeight="700">RENDER-AS-YOU-FETCH  ⚡ parallel</text>
      {[
        { label: 'fetch posts',    color: '#60a5fa' },
        { label: 'fetch comments', color: '#a78bfa' },
        { label: 'fetch likes',    color: '#f472b6' },
      ].map(({ label, color }, i) => (
        <g key={label}>
          <rect x="420" y={26 + i * 38} width="160" height="24" rx="4" fill={`${color}15`} stroke={`${color}40`} strokeWidth="1" />
          <text x="428" y={42 + i * 38} fontSize="9" fontFamily="monospace" fill={color}>{label}</text>
        </g>
      ))}
      <rect x="420" y="142" width="160" height="18" rx="3" fill={`${C}12`} stroke={`${C}35`} strokeWidth="1" />
      <text x="500" y="154" fontSize="8" fontFamily="monospace" fill={C} textAnchor="middle">total = max(500ms) = 500ms</text>

      {/* Time axis right */}
      <line x1="420" y1="200" x2="586" y2="200" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <text x="420" y="212" fontSize="8" fontFamily="monospace" fill="rgba(255,255,255,0.3)">t=0</text>
      <text x="586" y="212" fontSize="8" fontFamily="monospace" fill="rgba(255,255,255,0.3)" textAnchor="end">t=500ms</text>

      {/* Divider */}
      <line x1="600" y1="10" x2="600" y2="210" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* FAR RIGHT: Suspense + use */}
      <text x="690" y="18" fill={`${C}70`} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="700">SUSPENSE</text>
      <rect x="612" y="26" width="156" height="52" rx="5" fill={`${C}08`} stroke={`${C}25`} strokeWidth="1" />
      <text x="690" y="42" fontSize="9" fontFamily="monospace" fill={`${C}80`} textAnchor="middle">&lt;Suspense fallback=…&gt;</text>
      <rect x="628" y="48" width="124" height="22" rx="3" fill={`${C}12`} stroke={`${C}30`} strokeWidth="0.8" />
      <text x="690" y="63" fontSize="9" fontFamily="monospace" fill={C} textAnchor="middle">use(promise)</text>

      <rect x="612" y="90" width="156" height="30" rx="4" fill="rgba(244,63,94,0.08)" stroke="rgba(244,63,94,0.2)" strokeWidth="1" />
      <text x="690" y="108" fontSize="9" fontFamily="monospace" fill="#f43f5e80" textAnchor="middle">&lt;ErrorBoundary&gt;</text>

      <text x="690" y="145" fontSize="8" fontFamily="monospace" fill={`${C}50`} textAnchor="middle">Suspends until</text>
      <text x="690" y="157" fontSize="8" fontFamily="monospace" fill={`${C}50`} textAnchor="middle">promise resolves</text>

      <text x="390" y="210" fill={`${C}30`} fontSize="9" fontFamily="monospace" textAnchor="middle">fetch-on-render · render-as-you-fetch · Suspense · use() · loaders</text>
    </svg>
  )
}
