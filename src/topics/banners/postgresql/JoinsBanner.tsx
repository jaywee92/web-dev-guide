export default function JoinsBanner() {
  const C = '#38bdf8'
  return (
    <svg
      width="100%"
      viewBox="0 0 780 220"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', background: '#07101a' }}
    >
      <defs>
        <pattern id="dots-joins" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-joins" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
        {/* Clip paths for the 4 join panels */}
        <clipPath id="clip-left-inner">
          <circle cx="22" cy="18" r="16" />
        </clipPath>
        <clipPath id="clip-right-inner">
          <circle cx="34" cy="18" r="16" />
        </clipPath>
      </defs>
      <rect width="780" height="220" fill="url(#dots-joins)" />
      <rect width="780" height="220" fill="url(#glow-joins)" />

      {/* TOP CENTER: Main Venn diagram */}
      {/* Table A circle */}
      <circle cx="340" cy="72" r="44" fill={`${C}10`} stroke={C} strokeWidth="1.5" />
      {/* Table B circle */}
      <circle cx="380" cy="72" r="44" fill="rgba(168,85,247,0.08)" stroke="rgba(168,85,247,0.7)" strokeWidth="1.5" />
      {/* Intersection highlight */}
      <ellipse cx="360" cy="72" rx="16" ry="30" fill={`${C}20`} />

      {/* Labels on main Venn */}
      <text x="320" y="76" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={C}>users</text>
      <text x="400" y="76" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(168,85,247,0.9)">orders</text>

      {/* ON condition */}
      <text x="390" y="145" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.4)">ON users.id = orders.user_id</text>

      {/* 4 join panels in 2x2 grid */}
      {/* Panel positions: [INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN] */}
      {[
        {
          label: 'INNER JOIN',
          x: 30, y: 30,
          leftFill: 'none', rightFill: 'none', interFill: `${C}50`,
          leftStroke: `${C}40`, rightStroke: 'rgba(168,85,247,0.4)',
        },
        {
          label: 'LEFT JOIN',
          x: 220, y: 30,
          leftFill: `${C}30`, rightFill: 'none', interFill: `${C}50`,
          leftStroke: C, rightStroke: 'rgba(168,85,247,0.4)',
        },
        {
          label: 'RIGHT JOIN',
          x: 30, y: 145,
          leftFill: 'none', rightFill: 'rgba(168,85,247,0.35)', interFill: 'rgba(168,85,247,0.5)',
          leftStroke: `${C}40`, rightStroke: 'rgba(168,85,247,0.9)',
        },
        {
          label: 'FULL OUTER',
          x: 220, y: 145,
          leftFill: `${C}30`, rightFill: 'rgba(168,85,247,0.35)', interFill: `${C}50`,
          leftStroke: C, rightStroke: 'rgba(168,85,247,0.9)',
        },
      ].map(({ label, x, y, leftFill, rightFill, interFill, leftStroke, rightStroke }) => (
        <g key={label} transform={`translate(${x}, ${y})`}>
          {/* Panel background */}
          <rect x="0" y="0" width="160" height="100" rx="6"
            fill="rgba(0,0,0,0.35)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          {/* Label */}
          <text x="80" y="16" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={C} fontWeight="bold">{label}</text>
          {/* Mini Venn circles */}
          <circle cx="64" cy="58" r="26" fill={leftFill} stroke={leftStroke} strokeWidth="1.2" />
          <circle cx="96" cy="58" r="26" fill={rightFill} stroke={rightStroke} strokeWidth="1.2" />
          {/* Intersection overlay */}
          <ellipse cx="80" cy="58" rx="10" ry="22" fill={interFill} />
          {/* Table labels */}
          <text x="52" y="62" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(255,255,255,0.5)">A</text>
          <text x="108" y="62" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(255,255,255,0.5)">B</text>
        </g>
      ))}

      {/* Right side: join condition detail */}
      <rect x="460" y="20" width="290" height="180" rx="6"
        fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <text x="605" y="40" textAnchor="middle" fontFamily="monospace" fontSize="11" fill={`${C}90`} fontWeight="bold">Join Condition</text>

      {[
        { type: 'INNER JOIN', desc: 'only matching rows', color: C },
        { type: 'LEFT JOIN', desc: 'all left + matches', color: C },
        { type: 'RIGHT JOIN', desc: 'all right + matches', color: 'rgba(168,85,247,0.9)' },
        { type: 'FULL OUTER', desc: 'all rows, NULL gaps', color: 'rgba(251,191,36,0.9)' },
      ].map(({ type, desc, color }, i) => (
        <g key={type}>
          <text x="476" y={68 + i * 34} fontFamily="monospace" fontSize="11" fill={color} fontWeight="bold">{type}</text>
          <text x="476" y={84 + i * 34} fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.45)">{desc}</text>
        </g>
      ))}
    </svg>
  )
}
