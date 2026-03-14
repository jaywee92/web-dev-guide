export default function SelectorsBanner() {
  const C = '#f59e0b'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-sl" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-sl" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-sl)" />
      <rect width="780" height="220" fill="url(#glow-sl)" />

      {/* LEFT: CSS selector anatomy */}
      <text x="200" y="22" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="rgba(255,255,255,0.35)">selector anatomy</text>

      {/* .button part */}
      <rect x="40" y="50" width="72" height="28" rx="4" fill="rgba(245,158,11,0.15)" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="76" y="69" textAnchor="middle" fontFamily="monospace" fontSize="13" fill="#f59e0b">.button</text>

      {/* #submit part */}
      <rect x="120" y="50" width="76" height="28" rx="4" fill="rgba(239,68,68,0.15)" stroke="#ef4444" strokeWidth="1.5" />
      <text x="158" y="69" textAnchor="middle" fontFamily="monospace" fontSize="13" fill="#ef4444">#submit</text>

      {/* Opening brace */}
      <text x="204" y="69" fontFamily="monospace" fontSize="13" fill="rgba(255,255,255,0.4)"> {'{'} </text>

      {/* Property lines */}
      {[
        { prop: 'color', val: 'white', y: 102 },
        { prop: 'background', val: C, y: 122 },
        { prop: 'border-radius', val: '4px', y: 142 },
      ].map(({ prop, val, y }) => (
        <g key={prop}>
          <text x="56" y={y} fontFamily="monospace" fontSize="11" fill="rgba(167,139,250,0.85)">{prop}</text>
          <text x={56 + prop.length * 6.6} y={y} fontFamily="monospace" fontSize="11" fill="rgba(255,255,255,0.35)">: </text>
          <text x={56 + prop.length * 6.6 + 12} y={y} fontFamily="monospace" fontSize="11" fill="rgba(52,211,153,0.85)">{val}</text>
          <text x={56 + prop.length * 6.6 + 12 + val.length * 6.6} y={y} fontFamily="monospace" fontSize="11" fill="rgba(255,255,255,0.35)">;</text>
        </g>
      ))}

      {/* Closing brace */}
      <text x="44" y="162" fontFamily="monospace" fontSize="13" fill="rgba(255,255,255,0.4)">{'}'}</text>

      {/* Labels below selectors */}
      <line x1="76" y1="80" x2="76" y2="185" stroke="rgba(245,158,11,0.3)" strokeWidth="1" strokeDasharray="3 3" />
      <text x="76" y="198" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(245,158,11,0.7)">class</text>

      <line x1="158" y1="80" x2="158" y2="185" stroke="rgba(239,68,68,0.3)" strokeWidth="1" strokeDasharray="3 3" />
      <text x="158" y="198" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(239,68,68,0.7)">#id</text>

      {/* Divider */}
      <line x1="390" y1="15" x2="390" y2="210" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />

      {/* RIGHT: Specificity tower */}
      <text x="575" y="22" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="rgba(255,255,255,0.35)">specificity</text>

      {[
        { label: '*', score: '(0,0,0)', height: 20, fill: 'rgba(120,120,120,0.5)', stroke: 'rgba(150,150,150,0.4)', textColor: 'rgba(180,180,180,0.8)' },
        { label: 'element', score: '(0,0,1)', height: 55, fill: 'rgba(245,158,11,0.2)', stroke: 'rgba(245,158,11,0.4)', textColor: 'rgba(245,158,11,0.75)' },
        { label: '.class', score: '(0,1,0)', height: 95, fill: 'rgba(245,158,11,0.4)', stroke: 'rgba(245,158,11,0.6)', textColor: 'rgba(245,158,11,0.9)' },
        { label: '#id', score: '(1,0,0)', height: 140, fill: 'rgba(245,158,11,0.65)', stroke: '#f59e0b', textColor: '#f59e0b' },
      ].map(({ label, score, height, fill, stroke, textColor }, i) => {
        const x = 415 + i * 82
        const baseY = 200
        return (
          <g key={label}>
            <rect x={x} y={baseY - height} width="58" height={height} rx="3"
              fill={fill} stroke={stroke} strokeWidth="1" />
            <text x={x + 29} y={baseY - height - 6} textAnchor="middle" fontFamily="monospace"
              fontSize="9" fill={textColor}>{score}</text>
            <text x={x + 29} y={baseY + 13} textAnchor="middle" fontFamily="monospace"
              fontSize="10" fill={textColor}>{label}</text>
          </g>
        )
      })}
    </svg>
  )
}
