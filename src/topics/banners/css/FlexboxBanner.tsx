export default function FlexboxBanner() {
  const C = '#a78bfa'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-fx" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-fx" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
        <marker id="arrow-fx" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="rgba(167,139,250,0.6)" />
        </marker>
      </defs>
      <rect width="780" height="220" fill="url(#dots-fx)" />
      <rect width="780" height="220" fill="url(#glow-fx)" />

      {/* Flex container */}
      <rect x="40" y="28" width="700" height="148" rx="6"
        fill="rgba(167,139,250,0.04)" stroke="rgba(167,139,250,0.45)" strokeWidth="1.5" strokeDasharray="8 5" />
      <text x="52" y="44" fontFamily="monospace" fontSize="11" fill="rgba(167,139,250,0.7)">display: flex</text>

      {/* 4 flex items */}
      {[0, 1, 2, 3].map(i => {
        const x = 68 + i * 163
        return (
          <g key={i}>
            <rect x={x} y="52" width="120" height="100" rx="5"
              fill="rgba(167,139,250,0.12)" stroke="rgba(167,139,250,0.55)" strokeWidth="1.5" />
            <text x={x + 60} y="107" textAnchor="middle" fontFamily="monospace" fontSize="22"
              fill="rgba(167,139,250,0.7)">{i + 1}</text>
          </g>
        )
      })}

      {/* Main axis arrow — bottom of container */}
      <line x1="60" y1="184" x2="726" y2="184"
        stroke="rgba(167,139,250,0.4)" strokeWidth="1.2" markerEnd="url(#arrow-fx)" />
      <text x="390" y="196" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(167,139,250,0.5)">main axis →</text>

      {/* Cross axis arrow — left side */}
      <line x1="28" y1="46" x2="28" y2="178"
        stroke="rgba(167,139,250,0.4)" strokeWidth="1.2" markerEnd="url(#arrow-fx)" />
      <text x="16" y="115" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(167,139,250,0.5)"
        transform="rotate(-90,16,115)">cross</text>
    </svg>
  )
}
