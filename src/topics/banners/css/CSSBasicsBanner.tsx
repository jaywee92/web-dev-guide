export default function CSSBasicsBanner() {
  const C = '#60a5fa'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-cb" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-cb" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-cb)" />
      <rect width="780" height="220" fill="url(#glow-cb)" />

      {/* LEFT: CSS rule anatomy */}
      {/* Selector box */}
      <rect x="60" y="30" width="44" height="26" rx="4"
        fill="rgba(96,165,250,0.1)" stroke="rgba(96,165,250,0.5)" strokeWidth="1.2" />
      <text x="82" y="48" textAnchor="middle" fontFamily="monospace" fontSize="13" fill="#60a5fa">p</text>

      {/* Opening brace */}
      <text x="112" y="48" fontFamily="monospace" fontSize="13" fill="rgba(255,255,255,0.5)">{'{'}</text>

      {/* Property-value lines */}
      {[
        { prop: 'color', val: 'blue', y: 72 },
        { prop: 'font-size', val: '16px', y: 96 },
        { prop: 'margin', val: '0', y: 120 },
      ].map(({ prop, val, y }) => (
        <g key={prop}>
          <text x="128" y={y} fontFamily="monospace" fontSize="12" fill="rgba(167,139,250,0.9)">{prop}</text>
          <text x={128 + prop.length * 7.2 + 2} y={y} fontFamily="monospace" fontSize="12" fill="rgba(255,255,255,0.4)">:</text>
          <text x={128 + prop.length * 7.2 + 10} y={y} fontFamily="monospace" fontSize="12" fill="rgba(52,211,153,0.9)">{val}</text>
          <text x={128 + prop.length * 7.2 + 10 + val.length * 7.2} y={y} fontFamily="monospace" fontSize="12" fill="rgba(255,255,255,0.4)">;</text>
        </g>
      ))}

      {/* Closing brace */}
      <text x="112" y="144" fontFamily="monospace" fontSize="13" fill="rgba(255,255,255,0.5)">{'}'}</text>

      {/* Labels: selector, property, value */}
      <line x1="82" y1="60" x2="82" y2="172" stroke="rgba(96,165,250,0.3)" strokeWidth="1" strokeDasharray="3 3" />
      <text x="82" y="185" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(96,165,250,0.6)">selector</text>

      <line x1="160" y1="96" x2="160" y2="172" stroke="rgba(167,139,250,0.3)" strokeWidth="1" strokeDasharray="3 3" />
      <text x="160" y="185" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(167,139,250,0.6)">property</text>

      <line x1="248" y1="96" x2="248" y2="172" stroke="rgba(52,211,153,0.3)" strokeWidth="1" strokeDasharray="3 3" />
      <text x="248" y="185" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(52,211,153,0.6)">value</text>

      {/* Divider */}
      <line x1="390" y1="20" x2="390" y2="200" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />

      {/* RIGHT: Cascade priority tower */}
      <text x="555" y="22" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="rgba(255,255,255,0.35)">specificity</text>

      {[
        { label: '*', score: '0,0,0', height: 30, color: 'rgba(100,100,100,0.7)', textColor: 'rgba(180,180,180,0.8)' },
        { label: 'element', score: '0,0,1', height: 60, color: 'rgba(96,165,250,0.25)', textColor: 'rgba(96,165,250,0.8)' },
        { label: '.class', score: '0,1,0', height: 100, color: 'rgba(96,165,250,0.45)', textColor: 'rgba(96,165,250,0.9)' },
        { label: '#id', score: '1,0,0', height: 140, color: 'rgba(96,165,250,0.7)', textColor: '#60a5fa' },
      ].map(({ label, score, height, color, textColor }, i) => {
        const x = 420 + i * 75
        const baseY = 170
        return (
          <g key={label}>
            <rect x={x} y={baseY - height} width="56" height={height} rx="4"
              fill={color} stroke="rgba(96,165,250,0.3)" strokeWidth="1" />
            <text x={x + 28} y={baseY - height - 6} textAnchor="middle" fontFamily="monospace"
              fontSize="10" fill={textColor}>{score}</text>
            <text x={x + 28} y={baseY + 14} textAnchor="middle" fontFamily="monospace"
              fontSize="10" fill={textColor}>{label}</text>
          </g>
        )
      })}
    </svg>
  )
}
