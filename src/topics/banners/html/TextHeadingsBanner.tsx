export default function TextHeadingsBanner() {
  const C = '#60a5fa'
  const headings = [
    { label: 'h1', fontSize: 28, x: 60, opacity: 1.0, text: 'Heading 1' },
    { label: 'h2', fontSize: 20, x: 78, opacity: 0.8, text: 'Heading 2' },
    { label: 'h3', fontSize: 16, x: 96, opacity: 0.6, text: 'Heading 3' },
    { label: 'h4', fontSize: 13, x: 114, opacity: 0.4, text: 'Heading 4' },
  ]
  const yPositions = [50, 90, 124, 152]

  const divBoxes = [
    { x: 440, y: 40, w: 280, h: 38 },
    { x: 440, y: 86, w: 280, h: 38 },
    { x: 440, y: 132, w: 280, h: 38 },
    { x: 440, y: 178, w: 280, h: 28 },
  ]

  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-th" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-th" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-th)" />
      <rect width="780" height="220" fill="url(#glow-th)" />

      {/* Column labels */}
      <text x="60" y="22" fontFamily="monospace" fontSize="11" fill={`${C}99`}>Semantic Headings</text>
      <text x="440" y="22" fontFamily="monospace" fontSize="11" fill="#6b7280">Div Soup</text>

      {/* Center divider */}
      <line x1="390" y1="10" x2="390" y2="210" stroke="#ffffff10" strokeWidth="1" strokeDasharray="4,4" />

      {/* Heading hierarchy */}
      {headings.map((h, i) => (
        <text
          key={h.label}
          x={h.x}
          y={yPositions[i] + h.fontSize}
          fontFamily="monospace"
          fontSize={h.fontSize}
          fill={C}
          opacity={h.opacity}
        >
          {`<${h.label}>`} {h.text}
        </text>
      ))}

      {/* Div soup boxes */}
      {divBoxes.map((b, i) => (
        <g key={i}>
          <rect
            x={b.x}
            y={b.y}
            width={b.w}
            height={b.h}
            rx={4}
            fill="rgba(107,114,128,0.08)"
            stroke="rgba(107,114,128,0.4)"
            strokeWidth="1"
          />
          <text
            x={b.x + 10}
            y={b.y + b.h / 2 + 4}
            fontFamily="monospace"
            fontSize="11"
            fill="#6b7280"
          >
            {'<div>'}
          </text>
        </g>
      ))}
    </svg>
  )
}
