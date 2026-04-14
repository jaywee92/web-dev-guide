export default function ReactIntroBanner() {
  const C = '#f472b6'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#0d0a12' }}>
      <defs>
        <pattern id="dots-ri" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-ri" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.07" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-ri)" />
      <rect width="780" height="220" fill="url(#glow-ri)" />

      {/* React logo — center atom */}
      {/* Nucleus */}
      <circle cx="390" cy="110" r="10" fill={C} opacity="0.9" />

      {/* Orbit ellipses */}
      <ellipse cx="390" cy="110" rx="72" ry="26" fill="none" stroke={C} strokeWidth="1.5" opacity="0.5" />
      <ellipse cx="390" cy="110" rx="72" ry="26" fill="none" stroke={C} strokeWidth="1.5" opacity="0.5"
        transform="rotate(60 390 110)" />
      <ellipse cx="390" cy="110" rx="72" ry="26" fill="none" stroke={C} strokeWidth="1.5" opacity="0.5"
        transform="rotate(-60 390 110)" />

      {/* Orbiting dots */}
      <circle cx="462" cy="110" r="5" fill={C} opacity="0.8" />
      <circle cx="354" cy="84" r="5" fill={C} opacity="0.6" />
      <circle cx="354" cy="136" r="5" fill={C} opacity="0.6" />

      {/* Left panel — "Your Code" */}
      <rect x="60" y="72" width="210" height="76" rx="8" fill={`${C}0c`} stroke={`${C}40`} strokeWidth="1.2" />
      <text x="165" y="94" fill={`${C}99`} fontSize="9" fontFamily="monospace" textAnchor="middle" letterSpacing="0.08em">YOUR APP</text>
      <rect x="80" y="102" width="80" height="18" rx="4" fill={`${C}18`} stroke={`${C}55`} strokeWidth="1" />
      <text x="120" y="115" fill={`${C}cc`} fontSize="9.5" fontFamily="monospace" textAnchor="middle">&lt;App /&gt;</text>
      <rect x="175" y="102" width="80" height="18" rx="4" fill={`${C}18`} stroke={`${C}55`} strokeWidth="1" />
      <text x="215" y="115" fill={`${C}cc`} fontSize="9.5" fontFamily="monospace" textAnchor="middle">&lt;Page /&gt;</text>
      <text x="165" y="140" fill={`${C}55`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">JSX → components</text>

      {/* Arrow left → center */}
      <line x1="270" y1="110" x2="308" y2="110" stroke={`${C}55`} strokeWidth="1.2" strokeDasharray="4 3" />
      <polygon points="308,106 316,110 308,114" fill={`${C}55`} />

      {/* Arrow center → right */}
      <line x1="470" y1="110" x2="508" y2="110" stroke={`${C}55`} strokeWidth="1.2" strokeDasharray="4 3" />
      <polygon points="508,106 516,110 508,114" fill={`${C}55`} />

      {/* Right panel — Browser DOM */}
      <rect x="520" y="72" width="200" height="76" rx="8" fill={`${C}0c`} stroke={`${C}40`} strokeWidth="1.2" />
      <text x="620" y="94" fill={`${C}99`} fontSize="9" fontFamily="monospace" textAnchor="middle" letterSpacing="0.08em">REAL DOM</text>
      <rect x="538" y="102" width="68" height="18" rx="4" fill="#1a1a2e" stroke={`${C}33`} strokeWidth="1" />
      <text x="572" y="115" fill={`${C}88`} fontSize="9" fontFamily="monospace" textAnchor="middle">&lt;div&gt;</text>
      <rect x="614" y="102" width="90" height="18" rx="4" fill="#1a1a2e" stroke={`${C}33`} strokeWidth="1" />
      <text x="659" y="115" fill={`${C}88`} fontSize="9" fontFamily="monospace" textAnchor="middle">&lt;button&gt;</text>
      <text x="620" y="140" fill={`${C}55`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">Virtual DOM diff</text>

      {/* Center label */}
      <text x="390" y="172" fill={`${C}66`} fontSize="9" fontFamily="monospace" textAnchor="middle" letterSpacing="0.1em">REACT RUNTIME</text>
    </svg>
  )
}
