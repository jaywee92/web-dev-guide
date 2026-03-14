export default function MediaEmbedsBanner() {
  const C = '#ec4899'

  const panelW = 190
  const panelH = 130
  const panels = [
    { x: 55, label: '<video>', type: 'video' },
    { x: 295, label: '<audio>', type: 'audio' },
    { x: 535, label: '<iframe>', type: 'iframe' },
  ]

  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-me" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-me" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="video-grad-me" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={C} stopOpacity="0.15" />
          <stop offset="100%" stopColor={C} stopOpacity="0.04" />
        </linearGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-me)" />
      <rect width="780" height="220" fill="url(#glow-me)" />

      {panels.map((panel) => {
        const cx = panel.x + panelW / 2
        const py = 30

        return (
          <g key={panel.type}>
            {/* Panel rect */}
            <rect
              x={panel.x}
              y={py}
              width={panelW}
              height={panelH}
              rx="8"
              fill={
                panel.type === 'iframe'
                  ? 'rgba(236,72,153,0.04)'
                  : 'url(#video-grad-me)'
              }
              stroke={`${C}55`}
              strokeWidth="1.2"
              strokeDasharray={panel.type === 'iframe' ? '6,4' : undefined}
            />

            {/* Video: play button */}
            {panel.type === 'video' && (
              <g>
                <circle cx={cx} cy={py + panelH / 2} r="26" fill={`${C}20`} stroke={`${C}80`} strokeWidth="1.5" />
                {/* Play triangle */}
                <path
                  d={`M${cx - 8},${py + panelH / 2 - 12} L${cx + 18},${py + panelH / 2} L${cx - 8},${py + panelH / 2 + 12} Z`}
                  fill={C}
                  opacity="0.85"
                />
              </g>
            )}

            {/* Audio: waveform */}
            {panel.type === 'audio' && (
              <g>
                {/* Waveform bars */}
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((b) => {
                  const barX = cx - 60 + b * 10
                  const barH = [10, 22, 18, 34, 26, 40, 28, 36, 22, 18, 30, 14, 10][b]
                  return (
                    <rect
                      key={b}
                      x={barX}
                      y={py + panelH / 2 - barH / 2}
                      width="6"
                      height={barH}
                      rx="3"
                      fill={C}
                      opacity={0.3 + (barH / 40) * 0.55}
                    />
                  )
                })}
              </g>
            )}

            {/* Iframe: dashed interior + text */}
            {panel.type === 'iframe' && (
              <g>
                <rect
                  x={panel.x + 16}
                  y={py + 16}
                  width={panelW - 32}
                  height={panelH - 32}
                  rx="4"
                  fill="none"
                  stroke={`${C}30`}
                  strokeWidth="1"
                  strokeDasharray="4,3"
                />
                <text x={cx} y={py + panelH / 2 - 6} textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}70`}>
                  external
                </text>
                <text x={cx} y={py + panelH / 2 + 8} textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}70`}>
                  content
                </text>
              </g>
            )}

            {/* Label below */}
            <text
              x={cx}
              y={py + panelH + 18}
              textAnchor="middle"
              fontFamily="monospace"
              fontSize="12"
              fill={C}
            >
              {panel.label}
            </text>
          </g>
        )
      })}

      <text x="390" y="205" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}50`}>
        video · audio · iframe embeds
      </text>
    </svg>
  )
}
