export default function TypographyBanner() {
  const C = '#22d3ee'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-ty" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-ty" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-ty)" />
      <rect width="780" height="220" fill="url(#glow-ty)" />

      {/* Row 1: Font size scale */}
      <text x="390" y="16" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.3)">font-size scale</text>

      {[
        { size: 12, x: 80 },
        { size: 16, x: 200 },
        { size: 20, x: 330 },
        { size: 28, x: 480 },
        { size: 36, x: 640 },
      ].map(({ size, x }) => (
        <g key={size}>
          <text x={x} y={50} textAnchor="middle" fontFamily="monospace" fontSize={size} fill={C}>Aa</text>
          <text x={x} y={62} textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(34,211,238,0.5)">{size}px</text>
        </g>
      ))}

      {/* Row 2: Line-height comparison */}
      <text x="195" y="82" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(34,211,238,0.5)">line-height: 1.0</text>
      <text x="545" y="82" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(34,211,238,0.5)">line-height: 1.6</text>

      {/* Left: cramped lines (14px spacing) */}
      <rect x="40" y="88" width="310" height="68" rx="4" fill="rgba(34,211,238,0.05)" stroke="rgba(34,211,238,0.2)" strokeWidth="1" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <line x1="55" y1={102 + i * 14} x2="330" y2={102 + i * 14} stroke="rgba(34,211,238,0.4)" strokeWidth="1.5" strokeLinecap="round" />
          {/* tick marks showing spacing */}
          <line x1="340" y1={102 + i * 14} x2="344" y2={102 + i * 14} stroke="rgba(34,211,238,0.3)" strokeWidth="1" />
        </g>
      ))}

      {/* Right: open lines (20px spacing) */}
      <rect x="390" y="88" width="350" height="68" rx="4" fill="rgba(34,211,238,0.05)" stroke="rgba(34,211,238,0.2)" strokeWidth="1" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <line x1="405" y1={102 + i * 20} x2="725" y2={102 + i * 20} stroke="rgba(34,211,238,0.4)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="730" y1={102 + i * 20} x2="734" y2={102 + i * 20} stroke="rgba(34,211,238,0.3)" strokeWidth="1" />
        </g>
      ))}

      {/* Row 3: Font weight */}
      <text x="390" y="175" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.3)">font-weight</text>

      {[
        { weight: '300', x: 80, strokeW: 0.5, label: '300' },
        { weight: '400', x: 210, strokeW: 1, label: '400' },
        { weight: '500', x: 340, strokeW: 1.5, label: '500' },
        { weight: '700', x: 500, strokeW: 2.5, label: '700' },
        { weight: '900', x: 650, strokeW: 4, label: '900' },
      ].map(({ x, strokeW, label }) => (
        <g key={label}>
          <text x={x} y={205} textAnchor="middle" fontFamily="monospace" fontSize="16"
            fill="none" stroke={C} strokeWidth={strokeW}>Bold</text>
          <text x={x} y={205} textAnchor="middle" fontFamily="monospace" fontSize="16"
            fill={`rgba(34,211,238,${0.3 + strokeW * 0.15})`}>{label === '900' ? '' : ''}</text>
          <text x={x} y={218} textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(34,211,238,0.5)">{label}</text>
        </g>
      ))}

      {/* Simplified weight display using opacity/stroke simulation */}
      {[
        { x: 80, opacity: 0.4, label: '300' },
        { x: 210, opacity: 0.6, label: '400' },
        { x: 340, opacity: 0.75, label: '500' },
        { x: 500, opacity: 0.9, label: '700' },
        { x: 650, opacity: 1.0, label: '900' },
      ].map(({ x, opacity, label }) => (
        <g key={label}>
          <text x={x} y={205} textAnchor="middle" fontFamily="monospace" fontSize="15"
            fill={C} fillOpacity={opacity}>{label}</text>
        </g>
      ))}
    </svg>
  )
}
