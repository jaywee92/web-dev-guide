export default function RouterBanner() {
  const C = '#f59e0b'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-rt" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-rt" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
        <marker id="arr-rt" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill={`${C}88`} />
        </marker>
      </defs>
      <rect width="780" height="220" fill="url(#dots-rt)" />
      <rect width="780" height="220" fill="url(#glow-rt)" />

      {/* ── TOP: URL bar ── */}
      <rect x="60" y="14" width="660" height="30" rx="6" fill={`${C}08`} stroke={`${C}33`} strokeWidth="1.2" />
      {/* Browser bar decoration */}
      <circle cx="80" cy="29" r="5" fill={`${C}20`} />
      <circle cx="96" cy="29" r="5" fill={`${C}14`} />
      <circle cx="112" cy="29" r="5" fill={`${C}0e`} />
      <rect x="124" y="20" width="440" height="18" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <text x="344" y="33" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="monospace" textAnchor="middle">https://example.com</text>

      {/* URL chips */}
      {/* Active chip: / */}
      <rect x="575" y="19" width="36" height="20" rx="4" fill={C} />
      <text x="593" y="34" fill="#07101a" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="700">/</text>
      {/* /about chip */}
      <rect x="617" y="19" width="48" height="20" rx="4" fill={`${C}22`} stroke={`${C}55`} strokeWidth="1" />
      <text x="641" y="34" fill={`${C}cc`} fontSize="10" fontFamily="monospace" textAnchor="middle">/about</text>
      {/* /products/42 chip */}
      <rect x="671" y="19" width="42" height="20" rx="4" fill={`${C}16`} stroke={`${C}44`} strokeWidth="1" />
      <text x="692" y="34" fill={`${C}99`} fontSize="9" fontFamily="monospace" textAnchor="middle">/p/42</text>

      {/* ── CENTER: Routing table ── */}
      <text x="390" y="64" fill={`${C}44`} fontSize="9.5" fontFamily="monospace" textAnchor="middle" fontWeight="600">Routes</text>

      {/* Row 1: / → Home (highlighted — active) */}
      <rect x="90" y="70" width="600" height="28" rx="5" fill={`${C}18`} stroke={C} strokeWidth="1.5" />
      <text x="240" y="89" fill={C} fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="700">/</text>
      <text x="390" y="89" fill={`${C}66`} fontSize="10" fontFamily="monospace" textAnchor="middle">→</text>
      <text x="540" y="89" fill={C} fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="700">&lt;Home /&gt;</text>
      {/* Active badge */}
      <rect x="650" y="74" width="34" height="16" rx="3" fill={C} />
      <text x="667" y="86" fill="#07101a" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="700">active</text>

      {/* Row 2: /about → About */}
      <rect x="90" y="104" width="600" height="28" rx="5" fill={`${C}06`} stroke={`${C}22`} strokeWidth="1" />
      <text x="240" y="123" fill={`${C}99`} fontSize="11" fontFamily="monospace" textAnchor="middle">/about</text>
      <text x="390" y="123" fill={`${C}33`} fontSize="10" fontFamily="monospace" textAnchor="middle">→</text>
      <text x="540" y="123" fill={`${C}88`} fontSize="11" fontFamily="monospace" textAnchor="middle">&lt;About /&gt;</text>

      {/* Row 3: /products/:id → Product */}
      <rect x="90" y="138" width="600" height="28" rx="5" fill={`${C}06`} stroke={`${C}22`} strokeWidth="1" />
      <text x="240" y="157" fill={`${C}77`} fontSize="11" fontFamily="monospace" textAnchor="middle">/products/</text>
      <text x="312" y="157" fill={`${C}dd`} fontSize="11" fontFamily="monospace">:id</text>
      <text x="390" y="157" fill={`${C}33`} fontSize="10" fontFamily="monospace" textAnchor="middle">→</text>
      <text x="540" y="157" fill={`${C}88`} fontSize="11" fontFamily="monospace" textAnchor="middle">&lt;Product /&gt;</text>

      {/* ── BOTTOM: useParams extraction ── */}
      {/* Arrow from :id row */}
      <line x1="312" y1="166" x2="312" y2="179" stroke={`${C}44`} strokeWidth="1" markerEnd="url(#arr-rt)" />
      <rect x="200" y="179" width="230" height="28" rx="5" fill={`${C}0e`} stroke={`${C}44`} strokeWidth="1.2" />
      <text x="315" y="190" fill={`${C}55`} fontSize="9.5" fontFamily="monospace" textAnchor="middle">useParams()</text>
      <text x="315" y="203" fill={`${C}cc`} fontSize="9.5" fontFamily="monospace" textAnchor="middle">&#123; id: "42" &#125;</text>
      {/* Arrow to Product component */}
      <line x1="430" y1="193" x2="500" y2="193" stroke={`${C}44`} strokeWidth="1" strokeDasharray="3 2" markerEnd="url(#arr-rt)" />
      <text x="465" y="188" fill={`${C}44`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">injects</text>
      <rect x="500" y="183" width="120" height="22" rx="4" fill={`${C}0a`} stroke={`${C}33`} strokeWidth="1" />
      <text x="560" y="198" fill={`${C}88`} fontSize="9.5" fontFamily="monospace" textAnchor="middle">&lt;Product id="42"&gt;</text>
    </svg>
  )
}
