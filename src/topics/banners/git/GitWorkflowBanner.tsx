export default function GitWorkflowBanner() {
  const C = '#2dd4bf'
  const P = '#a78bfa'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-gw" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-gw" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-gw)" />
      <rect width="780" height="220" fill="url(#glow-gw)" />

      {/* Title */}
      <text x="390" y="18" textAnchor="middle" fontFamily="monospace" fontSize="11" fill={`${C}99`}>branch &amp; merge workflow</text>

      {/* Main branch line */}
      <line x1="40" y1="130" x2="740" y2="130" stroke={C} strokeWidth="2" />

      {/* Feature branch arc */}
      <path d="M220,130 C240,60 260,60 300,60 L520,60 C560,60 580,130 580,130"
        fill="none" stroke={P} strokeWidth="2" />

      {/* Main branch commits */}
      {/* c1 at x=100 */}
      <circle cx="100" cy="130" r="8" fill="#07101a" stroke={C} strokeWidth="2" />
      <text x="100" y="134" textAnchor="middle" fontFamily="monospace" fontSize="8" fill={C}>c1</text>

      {/* c2 at x=220 — branch point */}
      <circle cx="220" cy="130" r="8" fill="#07101a" stroke={C} strokeWidth="2" />
      <text x="220" y="134" textAnchor="middle" fontFamily="monospace" fontSize="8" fill={C}>c2</text>

      {/* M merge at x=580 */}
      <circle cx="580" cy="130" r="9" fill="#07101a" stroke={C} strokeWidth="2.5" />
      <text x="580" y="134" textAnchor="middle" fontFamily="monospace" fontSize="8" fill={C}>M</text>

      {/* HEAD at x=720 */}
      <circle cx="720" cy="130" r="8" fill={C} stroke={C} strokeWidth="2" />
      <text x="720" y="134" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#07101a">H</text>
      <text x="720" y="148" textAnchor="middle" fontFamily="monospace" fontSize="9" fill={`${C}cc`}>HEAD</text>

      {/* Feature branch commits */}
      {/* c3 at x=340, y=60 */}
      <circle cx="340" cy="60" r="8" fill="#07101a" stroke={P} strokeWidth="2" />
      <text x="340" y="64" textAnchor="middle" fontFamily="monospace" fontSize="8" fill={P}>c3</text>

      {/* c4 at x=430, y=60 */}
      <circle cx="430" cy="60" r="8" fill="#07101a" stroke={P} strokeWidth="2" />
      <text x="430" y="64" textAnchor="middle" fontFamily="monospace" fontSize="8" fill={P}>c4</text>

      {/* c5 at x=520, y=60 */}
      <circle cx="520" cy="60" r="8" fill="#07101a" stroke={P} strokeWidth="2" />
      <text x="520" y="64" textAnchor="middle" fontFamily="monospace" fontSize="8" fill={P}>c5</text>

      {/* Branch labels */}
      <text x="50" y="148" fontFamily="monospace" fontSize="10" fill={C}>main</text>
      <text x="385" y="42" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={P}>feature/login</text>

      {/* Command labels */}
      <text x="220" y="182" textAnchor="middle" fontFamily="monospace" fontSize="9" fill={`${P}aa`}>git checkout -b</text>
      <text x="580" y="182" textAnchor="middle" fontFamily="monospace" fontSize="9" fill={`${C}aa`}>git merge</text>

      {/* Dashed vertical guide lines at branch/merge points */}
      <line x1="220" y1="60" x2="220" y2="122" stroke={`${P}44`} strokeWidth="1" strokeDasharray="4 3" />
      <line x1="580" y1="60" x2="580" y2="121" stroke={`${P}44`} strokeWidth="1" strokeDasharray="4 3" />

      {/* Arrow tip on main line */}
      <polygon points="736,126 744,130 736,134" fill={C} />
    </svg>
  )
}
