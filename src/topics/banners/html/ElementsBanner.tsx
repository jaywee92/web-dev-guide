export default function ElementsBanner() {
  const C = '#f97316'
  const tags = ['<h1>', '<p>', '<img />', '<a>', '<div>', '<span>']
  const boxW = 95
  const boxH = 58
  const totalW = tags.length * boxW + (tags.length - 1) * 14
  const startX = (780 - totalW) / 2
  const centerY = 90

  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-el" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-el" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-el)" />
      <rect width="780" height="220" fill="url(#glow-el)" />

      {tags.map((tag, i) => {
        const x = startX + i * (boxW + 14)
        const y = centerY - boxH / 2
        return (
          <g key={tag}>
            <rect
              x={x}
              y={y}
              width={boxW}
              height={boxH}
              rx={6}
              fill="rgba(249,115,22,0.08)"
              stroke="rgba(249,115,22,0.55)"
              strokeWidth="1.2"
            />
            <text
              x={x + boxW / 2}
              y={y + boxH / 2 + 5}
              textAnchor="middle"
              fontFamily="monospace"
              fontSize={i === 2 ? 10 : 12}
              fill={C}
            >
              {tag}
            </text>
          </g>
        )
      })}

      <text
        x="390"
        y="168"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="11"
        fill="rgba(249,115,22,0.55)"
      >
        block vs inline · semantic meaning · attributes
      </text>
    </svg>
  )
}
