export default function OverflowBanner() {
  const C = '#f87171'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-ov" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-ov" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
        <clipPath id="clip-hidden-ov">
          <rect x="210" y="55" width="150" height="90" />
        </clipPath>
        <clipPath id="clip-ellipsis-ov">
          <rect x="570" y="55" width="150" height="90" />
        </clipPath>
      </defs>
      <rect width="780" height="220" fill="url(#dots-ov)" />
      <rect width="780" height="220" fill="url(#glow-ov)" />

      {/* Box 1: overflow: visible */}
      <rect x="30" y="55" width="150" height="90" rx="4"
        fill="rgba(248,113,113,0.06)" stroke="rgba(248,113,113,0.4)" strokeWidth="1.2" />
      {/* text lines bleeding outside */}
      {[0, 1, 2, 3, 4].map(i => (
        <line key={i}
          x1="44" y1={72 + i * 16} x2={i % 2 === 0 ? 210 : 198} y2={72 + i * 16}
          stroke="rgba(248,113,113,0.35)" strokeWidth="1" />
      ))}
      {/* dots to indicate text */}
      {[0, 1, 2, 3, 4].map(i => (
        <text key={i} x="48" y={76 + i * 16} fontFamily="monospace" fontSize="10"
          fill="rgba(248,113,113,0.55)">lorem ipsum text</text>
      ))}
      <text x="105" y="162" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(248,113,113,0.65)">overflow: visible</text>

      {/* Box 2: overflow: hidden */}
      <rect x="210" y="55" width="150" height="90" rx="4"
        fill="rgba(248,113,113,0.06)" stroke="rgba(248,113,113,0.4)" strokeWidth="1.2" />
      <g clipPath="url(#clip-hidden-ov)">
        {[0, 1, 2, 3, 4].map(i => (
          <text key={i} x="222" y={76 + i * 16} fontFamily="monospace" fontSize="10"
            fill="rgba(248,113,113,0.55)">lorem ipsum text</text>
        ))}
      </g>
      {/* clip indicator line */}
      <line x1="360" y1="50" x2="360" y2="150" stroke="rgba(248,113,113,0.5)" strokeWidth="1.5" strokeDasharray="4 2" />
      <text x="285" y="162" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(248,113,113,0.65)">overflow: hidden</text>

      {/* Box 3: overflow: scroll */}
      <rect x="390" y="55" width="150" height="90" rx="4"
        fill="rgba(248,113,113,0.06)" stroke="rgba(248,113,113,0.4)" strokeWidth="1.2" />
      {[0, 1, 2, 3, 4].map(i => (
        <text key={i} x="402" y={76 + i * 16} fontFamily="monospace" fontSize="10"
          fill="rgba(248,113,113,0.5)">lorem ipsum</text>
      ))}
      {/* scrollbar track */}
      <rect x="528" y="59" width="8" height="82" rx="4"
        fill="rgba(248,113,113,0.1)" stroke="rgba(248,113,113,0.25)" strokeWidth="1" />
      {/* scrollbar thumb */}
      <rect x="529" y="68" width="6" height="30" rx="3"
        fill="rgba(248,113,113,0.55)" />
      <text x="465" y="162" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(248,113,113,0.65)">overflow: scroll</text>

      {/* Box 4: text-overflow: ellipsis */}
      <rect x="570" y="55" width="150" height="90" rx="4"
        fill="rgba(248,113,113,0.06)" stroke="rgba(248,113,113,0.4)" strokeWidth="1.2" />
      <g clipPath="url(#clip-ellipsis-ov)">
        {[0, 1, 2].map(i => (
          <text key={i} x="582" y={80 + i * 20} fontFamily="monospace" fontSize="11"
            fill="rgba(248,113,113,0.55)">long text line...</text>
        ))}
      </g>
      {/* ellipsis indicator */}
      <text x="700" y="80" fontFamily="monospace" fontSize="13" fill="rgba(248,113,113,0.7)">…</text>
      <text x="700" y="100" fontFamily="monospace" fontSize="13" fill="rgba(248,113,113,0.7)">…</text>
      <text x="700" y="120" fontFamily="monospace" fontSize="13" fill="rgba(248,113,113,0.7)">…</text>
      <text x="645" y="162" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(248,113,113,0.65)">text-overflow: ellipsis</text>

      {/* Header label */}
      <text x="390" y="210" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(248,113,113,0.3)">overflow controls content beyond bounds</text>
    </svg>
  )
}
