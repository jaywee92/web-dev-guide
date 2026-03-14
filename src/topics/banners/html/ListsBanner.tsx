export default function ListsBanner() {
  const C = '#a78bfa'

  const ulItems = ['List item one', 'List item two', 'List item three']
  const olItems = ['First item', 'Second item', 'Third item']
  const dlPairs = [
    { dt: 'Term', dd: 'Definition' },
    { dt: 'Another', dd: 'Description' },
  ]

  const panelW = 200
  const panelH = 148
  const panels = [
    { x: 40, label: '<ul>', type: 'ul' },
    { x: 290, label: '<ol>', type: 'ol' },
    { x: 540, label: '<dl>', type: 'dl' },
  ]

  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-ls" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-ls" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-ls)" />
      <rect width="780" height="220" fill="url(#glow-ls)" />

      {panels.map((panel) => (
        <g key={panel.type}>
          {/* Panel label */}
          <text
            x={panel.x + panelW / 2}
            y="28"
            textAnchor="middle"
            fontFamily="monospace"
            fontSize="13"
            fill={C}
          >
            {panel.label}
          </text>

          {/* Panel box */}
          <rect
            x={panel.x}
            y="38"
            width={panelW}
            height={panelH}
            rx="6"
            fill="rgba(167,139,250,0.07)"
            stroke="rgba(167,139,250,0.4)"
            strokeWidth="1.2"
          />

          {/* UL items */}
          {panel.type === 'ul' && ulItems.map((item, i) => (
            <g key={i}>
              <circle cx={panel.x + 18} cy={60 + i * 36} r="3.5" fill={C} opacity="0.8" />
              <text
                x={panel.x + 30}
                y={60 + i * 36 + 4}
                fontFamily="monospace"
                fontSize="11"
                fill={`${C}cc`}
              >
                {item}
              </text>
            </g>
          ))}

          {/* OL items */}
          {panel.type === 'ol' && olItems.map((item, i) => (
            <g key={i}>
              <text
                x={panel.x + 14}
                y={60 + i * 36 + 4}
                fontFamily="monospace"
                fontSize="11"
                fill={C}
                opacity="0.9"
              >
                {i + 1}.
              </text>
              <text
                x={panel.x + 30}
                y={60 + i * 36 + 4}
                fontFamily="monospace"
                fontSize="11"
                fill={`${C}cc`}
              >
                {item}
              </text>
            </g>
          ))}

          {/* DL pairs */}
          {panel.type === 'dl' && dlPairs.map((pair, i) => (
            <g key={i}>
              <text
                x={panel.x + 14}
                y={55 + i * 52 + 4}
                fontFamily="monospace"
                fontSize="11"
                fill={C}
                fontWeight="bold"
              >
                {pair.dt}
              </text>
              <text
                x={panel.x + 26}
                y={55 + i * 52 + 22}
                fontFamily="monospace"
                fontSize="10"
                fill={`${C}99`}
              >
                {pair.dd}
              </text>
            </g>
          ))}
        </g>
      ))}

      <text x="390" y="204" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}50`}>
        unordered · ordered · description lists
      </text>
    </svg>
  )
}
