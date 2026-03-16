export default function RouterAdvancedBanner() {
  const C = '#38bdf8'

  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-ra" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-ra" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-ra)" />
      <rect width="780" height="220" fill="url(#glow-ra)" />

      {/* LEFT: Library mode */}
      <text x="20" y="18" fill={`${C}70`} fontSize="9" fontFamily="monospace" fontWeight="700">LIBRARY MODE</text>
      <rect x="20" y="26" width="180" height="22" rx="4" fill={`${C}10`} stroke={`${C}30`} strokeWidth="1" />
      <text x="30" y="41" fontSize="10" fontFamily="monospace" fill="rgba(255,255,255,0.7)">&lt;BrowserRouter&gt;</text>
      <rect x="36" y="54" width="148" height="20" rx="3" fill={`${C}08`} stroke={`${C}20`} strokeWidth="1" />
      <text x="46" y="68" fontSize="9" fontFamily="monospace" fill="rgba(255,255,255,0.55)">&lt;Routes&gt;&lt;Route /&gt;&lt;/Routes&gt;</text>
      <rect x="52" y="80" width="116" height="20" rx="3" fill={`${C}06`} stroke={`${C}18`} strokeWidth="1" />
      <text x="62" y="94" fontSize="9" fontFamily="monospace" fill="rgba(255,255,255,0.4)">{'element={<Page />}'}</text>
      <text x="20" y="120" fontSize="8" fontFamily="monospace" fill={`${C}50`}>Manual wiring</text>
      <text x="20" y="132" fontSize="8" fontFamily="monospace" fill={`${C}40`}>No SSR · No loaders</text>

      {/* Divider */}
      <line x1="220" y1="10" x2="220" y2="210" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* CENTER: Framework mode — routes.js → module */}
      <text x="390" y="18" fill={`${C}80`} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="700">FRAMEWORK MODE</text>

      {/* routes.js box */}
      <rect x="240" y="28" width="120" height="60" rx="5" fill={`${C}12`} stroke={`${C}40`} strokeWidth="1.2" />
      <text x="300" y="44" fill={C} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="700">routes.js</text>
      {["index('home.jsx')", "route('/about',...)", "route('/p/:id',...)"].map((line, i) => (
        <text key={i} x="250" y={58 + i * 12} fontSize="8" fontFamily="monospace" fill={`${C}80`}>{line}</text>
      ))}

      {/* Arrow */}
      <line x1="362" y1="58" x2="392" y2="58" stroke={`${C}60`} strokeWidth="1.5" />
      <polygon points="392,54 400,58 392,62" fill={`${C}60`} />

      {/* Route module box */}
      <rect x="402" y="28" width="148" height="80" rx="5" fill="rgba(0,0,0,0.3)" stroke={`${C}25`} strokeWidth="1" />
      <text x="476" y="44" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace" textAnchor="middle">route module</text>
      {[
        { label: 'clientLoader', color: '#34d399' },
        { label: 'action',       color: '#f97316' },
        { label: 'ErrorBoundary',color: '#f43f5e' },
        { label: 'default',      color: C },
      ].map(({ label, color }, i) => (
        <g key={label}>
          <rect x="412" y={50 + i * 14} width="128" height="11" rx="2" fill={`${color}12`} stroke={`${color}30`} strokeWidth="0.8" />
          <text x="420" y={59 + i * 14} fontSize="8" fontFamily="monospace" fill={color}>{label}</text>
        </g>
      ))}

      {/* Bottom note */}
      <text x="390" y="126" fill={`${C}60`} fontSize="8" fontFamily="monospace" textAnchor="middle">loaderData · actionData injected automatically</text>

      {/* Divider */}
      <line x1="560" y1="10" x2="560" y2="210" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* RIGHT: Rendering strategy pills */}
      <text x="670" y="18" fill={`${C}70`} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="700">STRATEGIES</text>
      {[
        { label: 'CSR', sub: 'SPA · client', color: '#60a5fa' },
        { label: 'SSR', sub: 'server · each req', color: '#34d399' },
        { label: 'SSG', sub: 'build time · static', color: '#fbbf24' },
      ].map(({ label, sub, color }, i) => (
        <g key={label}>
          <rect x="578" y={30 + i * 50} width="184" height="38" rx="6" fill={`${color}10`} stroke={`${color}35`} strokeWidth="1.2" />
          <text x="596" y={54 + i * 50} fontFamily="monospace" fontSize="14" fill={color} fontWeight="700">{label}</text>
          <text x="650" y={54 + i * 50} fontFamily="monospace" fontSize="9" fill={`${color}70`}>{sub}</text>
        </g>
      ))}

      <text x="390" y="210" fill={`${C}30`} fontSize="9" fontFamily="monospace" textAnchor="middle">routes.js · route modules · loader · action · CSR · SSR · SSG</text>
    </svg>
  )
}
