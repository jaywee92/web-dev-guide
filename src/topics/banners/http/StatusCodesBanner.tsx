export default function StatusCodesBanner() {
  const C = '#f59e0b'
  const bars = [
    { range: '1xx', color: '#94a3b8', h: 28, desc: 'Informational · 100 Continue · 101 Switching' },
    { range: '2xx', color: '#4ade80', h: 36, desc: 'Success · 200 OK · 201 Created · 204 No Content' },
    { range: '3xx', color: '#60a5fa', h: 28, desc: 'Redirect · 301 Moved Permanently · 304 Not Modified' },
    { range: '4xx', color: '#f97316', h: 40, desc: 'Client Error · 400 Bad Request · 401 · 403 · 404' },
    { range: '5xx', color: '#f87171', h: 28, desc: 'Server Error · 500 Internal · 503 Unavailable' },
  ]

  const totalH = bars.reduce((sum, b) => sum + b.h, 0)
  const gap = (170 - totalH) / (bars.length - 1)
  const startY = 22
  const barX = 60, barW = 660

  let currentY = startY
  const positions = bars.map(b => {
    const y = currentY
    currentY += b.h + gap
    return y
  })

  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-sc" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-sc" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-sc)" />
      <rect width="780" height="220" fill="url(#glow-sc)" />

      {/* Title */}
      <text x="390" y="14" fill={`${C}66`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="600">HTTP STATUS CODES</text>

      {bars.map((bar, i) => {
        const y = positions[i]
        const midY = y + bar.h / 2 + 4
        return (
          <g key={bar.range}>
            {/* Bar background */}
            <rect x={barX} y={y} width={barW} height={bar.h} rx="5"
              fill={`${bar.color}12`} stroke={`${bar.color}40`} strokeWidth="1.2" />
            {/* Left accent */}
            <rect x={barX} y={y} width="38" height={bar.h} rx="5"
              fill={`${bar.color}28`} />
            <rect x={barX + 32} y={y} width="6" height={bar.h}
              fill={`${bar.color}28`} />
            {/* Range label */}
            <text x={barX + 19} y={midY} fill={bar.color} fontSize="12" fontFamily="monospace"
              textAnchor="middle" fontWeight="800">{bar.range}</text>
            {/* Description */}
            <text x={barX + 52} y={midY} fill={`${bar.color}cc`} fontSize="10" fontFamily="monospace"
              dominantBaseline="middle">{bar.desc}</text>
          </g>
        )
      })}

      {/* Bottom legend */}
      <text x="390" y="210" fill={`${C}35`} fontSize="9" fontFamily="monospace" textAnchor="middle">RFC 9110 · HTTP/1.1 · HTTP/2 · HTTP/3</text>
    </svg>
  )
}
