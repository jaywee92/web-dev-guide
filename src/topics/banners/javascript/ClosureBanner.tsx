export default function ClosureBanner() {
  const C = '#4ade80'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-cl" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-cl" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
        <marker id="arr-cl" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill={`${C}80`} />
        </marker>
      </defs>
      <rect width="780" height="220" fill="url(#dots-cl)" />
      <rect width="780" height="220" fill="url(#glow-cl)" />

      {/* Outer scope rect — outer() */}
      <rect x="60" y="18" width="660" height="184" rx="10" fill={`${C}04`} stroke={`${C}28`} strokeWidth="1.5" />
      <text x="74" y="36" fill={`${C}70`} fontSize="11" fontFamily="monospace" fontWeight="700">outer()</text>
      <text x="680" y="36" fill={`${C}30`} fontSize="10" fontFamily="monospace">global scope</text>

      {/* let count = 0 variable box */}
      <rect x="100" y="46" width="150" height="28" rx="5" fill={`${C}14`} stroke={`${C}45`} strokeWidth="1.2" />
      <text x="175" y="65" fill={`${C}ee`} fontSize="10.5" fontFamily="monospace" textAnchor="middle">let count = 0</text>

      {/* Inner scope rect — inner() */}
      <rect x="190" y="86" width="400" height="96" rx="8" fill={`${C}06`} stroke={`${C}35`} strokeWidth="1.5" strokeDasharray="5 3" />
      <text x="204" y="104" fill={`${C}80`} fontSize="11" fontFamily="monospace" fontWeight="700">inner()</text>

      {/* count++ reference box */}
      <rect x="310" y="114" width="120" height="28" rx="5" fill={`${C}18`} stroke={`${C}55`} strokeWidth="1.2" />
      <text x="370" y="133" fill={`${C}ff`} fontSize="10.5" fontFamily="monospace" textAnchor="middle">count++</text>

      {/* Closure arrow: curved path from count++ back to let count */}
      <path
        d="M370,114 C370,80 280,72 175,74"
        fill="none"
        stroke={`${C}60`}
        strokeWidth="1.5"
        strokeDasharray="4 3"
        markerEnd="url(#arr-cl)"
      />
      <text x="270" y="72" fill={`${C}70`} fontSize="9.5" fontFamily="monospace" textAnchor="middle">closure</text>

      {/* "returned & called later" label outside inner, bottom-right */}
      <rect x="610" y="110" width="92" height="36" rx="5" fill={`${C}08`} stroke={`${C}22`} strokeWidth="1" />
      <text x="656" y="124" fill={`${C}55`} fontSize="9" fontFamily="monospace" textAnchor="middle">returned &amp;</text>
      <text x="656" y="138" fill={`${C}55`} fontSize="9" fontFamily="monospace" textAnchor="middle">called later</text>

      {/* Arrow from inner scope to "returned" box */}
      <line x1="592" y1="134" x2="608" y2="128" stroke={`${C}25`} strokeWidth="1" markerEnd="url(#arr-cl)" />

      {/* Bottom label */}
      <text x="390" y="205" fill={`${C}35`} fontSize="9" fontFamily="monospace" textAnchor="middle">inner() retains reference to outer() scope variables</text>
    </svg>
  )
}
