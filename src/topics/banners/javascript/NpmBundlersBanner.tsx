export default function NpmBundlersBanner() {
  const C = '#fbbf24'

  const bundlers = [
    { name: 'Webpack', tag: 'configurable', color: '#60a5fa' },
    { name: 'Rollup',  tag: 'libraries',    color: '#34d399' },
    { name: 'Parcel',  tag: 'zero-config',  color: '#f472b6' },
    { name: 'Vite',    tag: 'modern',       color: '#fbbf24' },
  ]

  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-npm" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-npm" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-npm)" />
      <rect width="780" height="220" fill="url(#glow-npm)" />

      {/* LEFT: npm flow */}
      <text x="20" y="20" fill={`${C}80`} fontSize="9" fontFamily="monospace" fontWeight="700">npm install date-fns</text>

      {/* Vertical flow: registry → node_modules → import */}
      {[
        { label: 'registry',     sub: 'npmjs.com',       icon: '🌐', y: 38 },
        { label: 'node_modules', sub: 'local disk',       icon: '📁', y: 90 },
        { label: 'your code',    sub: 'import date-fns',  icon: '📄', y: 142 },
      ].map(({ label, sub, icon, y }) => (
        <g key={label}>
          <rect x="20" y={y} width="180" height="36" rx="5"
            fill={`${C}10`} stroke={`${C}30`} strokeWidth="1.2" />
          <text x="36" y={y + 15} fontSize="11" fontFamily="monospace" fill="rgba(255,255,255,0.8)">{icon}  {label}</text>
          <text x="36" y={y + 28} fontSize="9" fontFamily="monospace" fill={`${C}60`}>{sub}</text>
        </g>
      ))}

      {/* Arrows between boxes */}
      {[74, 126].map(y => (
        <g key={y}>
          <line x1="110" y1={y} x2="110" y2={y + 14} stroke={`${C}50`} strokeWidth="1.5" strokeDasharray="3 2" />
          <polygon points={`106,${y + 14} 110,${y + 16} 114,${y + 14}`} fill={`${C}50`} />
        </g>
      ))}

      {/* package.json snippet */}
      <rect x="20" y="184" width="180" height="26" rx="4" fill="rgba(0,0,0,0.3)" stroke={`${C}20`} strokeWidth="1" />
      <text x="30" y="197" fontFamily="monospace" fontSize="9" fill={`${C}80`}>"date-fns":</text>
      <text x="105" y="197" fontFamily="monospace" fontSize="9" fill="rgba(255,255,255,0.55)">"^3.6.0"</text>
      <text x="30" y="207" fontFamily="monospace" fontSize="8" fill={`${C}40`}>package.json records the version</text>

      {/* Divider */}
      <line x1="220" y1="10" x2="220" y2="210" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* CENTER: bundler pipeline */}
      <text x="390" y="20" fill={`${C}70`} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="700">BUNDLER PIPELINE</text>

      {/* Source files → bundler → dist */}
      <rect x="232" y="32" width="130" height="80" rx="5" fill="rgba(0,0,0,0.35)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <text x="297" y="46" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace" textAnchor="middle">source</text>
      {['app.ts', 'style.css', 'logo.png', 'utils.ts'].map((f, i) => (
        <text key={f} x="244" y={60 + i * 13} fontFamily="monospace" fontSize="9" fill={`${C}70`}>{f}</text>
      ))}

      {/* Arrow */}
      <line x1="364" y1="72" x2="394" y2="72" stroke={`${C}60`} strokeWidth="1.5" />
      <polygon points="394,68 402,72 394,76" fill={`${C}60`} />

      {/* Bundler box */}
      <rect x="402" y="50" width="80" height="44" rx="6" fill={`${C}18`} stroke={`${C}50`} strokeWidth="1.5" />
      <text x="442" y="70" fill={C} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="700">Vite</text>
      <text x="442" y="83" fill={`${C}70`} fontSize="8" fontFamily="monospace" textAnchor="middle">bundler</text>

      {/* Arrow out */}
      <line x1="484" y1="72" x2="514" y2="72" stroke={`${C}60`} strokeWidth="1.5" />
      <polygon points="514,68 522,72 514,76" fill={`${C}60`} />

      {/* dist output */}
      <rect x="522" y="32" width="130" height="80" rx="5" fill="rgba(0,0,0,0.35)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <text x="587" y="46" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace" textAnchor="middle">dist/</text>
      {['index.html', 'app-abc.js', 'app-abc.css'].map((f, i) => (
        <text key={f} x="534" y={60 + i * 13} fontFamily="monospace" fontSize="9" fill="#4ade80">{f}</text>
      ))}
      <text x="534" y={60 + 3 * 13} fontFamily="monospace" fontSize="8" fill="rgba(255,255,255,0.3)">minified · tree-shaken</text>

      {/* HMR note */}
      <rect x="350" y="120" width="310" height="30" rx="4" fill="rgba(251,191,36,0.06)" stroke={`${C}25`} strokeWidth="1" />
      <text x="505" y="133" fill={`${C}80`} fontSize="9" fontFamily="monospace" textAnchor="middle">Dev server: native ESM · instant startup</text>
      <text x="505" y="144" fill={`${C}50`} fontSize="8" fontFamily="monospace" textAnchor="middle">HMR replaces only changed module — no full reload</text>

      {/* RIGHT: bundler comparison pills */}
      <text x="660" y="20" fill={`${C}70`} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="700">BUNDLERS</text>
      {bundlers.map(({ name, tag, color }, i) => (
        <g key={name}>
          <rect x="592" y={34 + i * 42} width="136" height="30" rx="6"
            fill={`${color}12`} stroke={`${color}40`} strokeWidth="1.2" />
          <text x="608" y={54 + i * 42} fontFamily="monospace" fontSize="11" fill={color} fontWeight="700">{name}</text>
          <text x="730" y={54 + i * 42} fontFamily="monospace" fontSize="9" fill={`${color}80`} textAnchor="end">{tag}</text>
        </g>
      ))}

      {/* Bottom note */}
      <text x="390" y="210" fill={`${C}35`} fontSize="9" fontFamily="monospace" textAnchor="middle">npm registry · package.json · node_modules · tree-shaking · HMR</text>
    </svg>
  )
}
