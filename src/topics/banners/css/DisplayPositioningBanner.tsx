export default function DisplayPositioningBanner() {
  const C = '#f59e0b'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-dp" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-dp" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-dp)" />
      <rect width="780" height="220" fill="url(#glow-dp)" />

      {/* 2×2 grid of panels: each ~170×80, gaps */}
      {/* Panel 1 — static (top-left, x=30, y=18) */}
      <rect x="30" y="18" width="170" height="80" rx="5"
        fill="rgba(245,158,11,0.04)" stroke="rgba(245,158,11,0.2)" strokeWidth="1" />
      <rect x="50" y="36" width="80" height="44" rx="3"
        fill="rgba(130,130,130,0.15)" stroke="rgba(180,180,180,0.35)" strokeWidth="1.2" />
      <text x="90" y="62" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="rgba(200,200,200,0.7)">box</text>
      <text x="115" y="107" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(245,158,11,0.6)">position: static</text>

      {/* Panel 2 — relative (top-right, x=210, y=18) */}
      <rect x="210" y="18" width="170" height="80" rx="5"
        fill="rgba(245,158,11,0.04)" stroke="rgba(245,158,11,0.2)" strokeWidth="1" />
      {/* ghost at original position */}
      <rect x="228" y="34" width="68" height="36" rx="3"
        fill="none" stroke="rgba(245,158,11,0.25)" strokeWidth="1" strokeDasharray="4 3" />
      {/* shifted box */}
      <rect x="244" y="44" width="68" height="36" rx="3"
        fill="rgba(245,158,11,0.15)" stroke="rgba(245,158,11,0.5)" strokeWidth="1.2" />
      <text x="278" y="66" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(245,158,11,0.85)">box</text>
      <text x="295" y="107" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(245,158,11,0.6)">position: relative</text>

      {/* Panel 3 — absolute (bottom-left, x=420, y=18) */}
      <rect x="420" y="18" width="170" height="80" rx="5"
        fill="rgba(245,158,11,0.04)" stroke="rgba(245,158,11,0.2)" strokeWidth="1" />
      {/* dashed parent */}
      <rect x="432" y="26" width="140" height="60" rx="3"
        fill="none" stroke="rgba(245,158,11,0.3)" strokeWidth="1" strokeDasharray="5 3" />
      <text x="440" y="38" fontFamily="monospace" fontSize="9" fill="rgba(245,158,11,0.4)">parent</text>
      {/* floating box */}
      <rect x="500" y="44" width="60" height="32" rx="3"
        fill="rgba(245,158,11,0.18)" stroke="rgba(245,158,11,0.55)" strokeWidth="1.2" />
      <text x="530" y="64" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(245,158,11,0.9)">box</text>
      {/* coordinate labels */}
      <text x="432" y="58" fontFamily="monospace" fontSize="8" fill="rgba(245,158,11,0.4)">top:12</text>
      <text x="432" y="68" fontFamily="monospace" fontSize="8" fill="rgba(245,158,11,0.4)">right:8</text>
      <text x="505" y="107" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(245,158,11,0.6)">position: absolute</text>

      {/* Panel 4 — fixed (bottom-right, x=600, y=18) */}
      <rect x="600" y="18" width="170" height="80" rx="5"
        fill="rgba(245,158,11,0.04)" stroke="rgba(245,158,11,0.2)" strokeWidth="1" />
      <text x="610" y="32" fontFamily="monospace" fontSize="9" fill="rgba(245,158,11,0.35)">viewport</text>
      {/* pin icon (simple cross) */}
      <line x1="748" y1="26" x2="748" y2="36" stroke="rgba(245,158,11,0.5)" strokeWidth="2" />
      <line x1="743" y1="31" x2="753" y2="31" stroke="rgba(245,158,11,0.5)" strokeWidth="2" />
      {/* fixed box in corner */}
      <rect x="636" y="50" width="60" height="32" rx="3"
        fill="rgba(245,158,11,0.18)" stroke="rgba(245,158,11,0.55)" strokeWidth="1.2" />
      <text x="666" y="70" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(245,158,11,0.9)">fixed</text>
      <text x="685" y="107" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(245,158,11,0.6)">position: fixed</text>

      {/* Second row: display types label */}
      <text x="390" y="130" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(245,158,11,0.3)">static · relative · absolute · fixed · sticky</text>

      {/* display: block vs inline mini demo */}
      {/* block items stacked */}
      <rect x="48" y="142" width="120" height="20" rx="2"
        fill="rgba(245,158,11,0.1)" stroke="rgba(245,158,11,0.3)" strokeWidth="1" />
      <text x="108" y="156" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(245,158,11,0.6)">block</text>
      <rect x="48" y="164" width="120" height="20" rx="2"
        fill="rgba(245,158,11,0.1)" stroke="rgba(245,158,11,0.3)" strokeWidth="1" />
      <text x="108" y="178" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(245,158,11,0.6)">block</text>
      <text x="108" y="198" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(245,158,11,0.45)">display: block</text>

      {/* inline items side by side */}
      {['inline', 'inline', 'inline'].map((t, i) => (
        <g key={i}>
          <rect x={260 + i * 82} y="150" width="68" height="22" rx="2"
            fill="rgba(245,158,11,0.1)" stroke="rgba(245,158,11,0.3)" strokeWidth="1" />
          <text x={294 + i * 82} y="165" textAnchor="middle" fontFamily="monospace" fontSize="10"
            fill="rgba(245,158,11,0.6)">{t}</text>
        </g>
      ))}
      <text x="343" y="198" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(245,158,11,0.45)">display: inline</text>
    </svg>
  )
}
