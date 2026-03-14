export default function ColorsUnitsBanner() {
  const C = '#a78bfa'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-cu" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-cu" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-cu)" />
      <rect width="780" height="220" fill="url(#glow-cu)" />

      {/* LEFT: Color format swatches */}
      <text x="200" y="22" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="rgba(255,255,255,0.35)">color formats</text>

      {[
        { label: 'hex', x: 70 },
        { label: 'rgb()', x: 155 },
        { label: 'hsl()', x: 240 },
        { label: 'oklch()', x: 325 },
      ].map(({ label, x }) => (
        <g key={label}>
          <circle cx={x} cy={100} r="28" fill={C} opacity="0.9" />
          <circle cx={x} cy={100} r="28" fill="none" stroke={C} strokeWidth="1.5" opacity="0.6" />
          <text x={x} y="148" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="rgba(167,139,250,0.85)">{label}</text>
        </g>
      ))}

      {/* Divider */}
      <line x1="390" y1="15" x2="390" y2="210" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />

      {/* RIGHT: Units comparison bars */}
      <text x="585" y="22" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="rgba(255,255,255,0.35)">units</text>

      {[
        { label: 'px', value: '180px', width: 180, y: 45 },
        { label: 'rem', value: '1.5rem', width: 120, y: 78 },
        { label: '%', value: '100%', width: 200, y: 111 },
        { label: 'vw', value: '50vw', width: 160, y: 144 },
        { label: 'em', value: '1em', width: 100, y: 177 },
      ].map(({ label, value, width, y }) => (
        <g key={label}>
          <text x="400" y={y + 10} fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.4)" textAnchor="end">{label}</text>
          <rect x="408" y={y} width={width} height="16" rx="3"
            fill="rgba(167,139,250,0.25)" stroke="rgba(167,139,250,0.6)" strokeWidth="1" />
          <text x={408 + width + 6} y={y + 11} fontFamily="monospace" fontSize="10" fill="rgba(167,139,250,0.85)">{value}</text>
        </g>
      ))}
    </svg>
  )
}
