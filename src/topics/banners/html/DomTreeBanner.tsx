export default function DomTreeBanner() {
  const C = '#f59e0b'

  const nodeW = 80
  const nodeH = 28

  const nodes = {
    html:   { x: 390, y: 20,  label: '<html>' },
    head:   { x: 180, y: 80,  label: '<head>' },
    body:   { x: 570, y: 80,  label: '<body>' },
    title:  { x: 100, y: 148, label: '<title>' },
    meta:   { x: 260, y: 148, label: '<meta>' },
    header: { x: 440, y: 148, label: '<header>' },
    main:   { x: 570, y: 148, label: '<main>' },
    footer: { x: 700, y: 148, label: '<footer>' },
  }

  const edges: [keyof typeof nodes, keyof typeof nodes][] = [
    ['html', 'head'],
    ['html', 'body'],
    ['head', 'title'],
    ['head', 'meta'],
    ['body', 'header'],
    ['body', 'main'],
    ['body', 'footer'],
  ]

  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-dt" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-dt" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-dt)" />
      <rect width="780" height="220" fill="url(#glow-dt)" />

      {/* Edges */}
      {edges.map(([from, to]) => {
        const f = nodes[from]
        const t = nodes[to]
        return (
          <line
            key={`${from}-${to}`}
            x1={f.x}
            y1={f.y + nodeH}
            x2={t.x}
            y2={t.y}
            stroke={`${C}50`}
            strokeWidth="1.5"
          />
        )
      })}

      {/* Nodes */}
      {(Object.entries(nodes) as [string, { x: number; y: number; label: string }][]).map(([key, n]) => {
        const isRoot = key === 'html'
        const w = isRoot ? 90 : nodeW
        const h = isRoot ? 32 : nodeH
        const fontSize = isRoot ? 13 : 11
        return (
          <g key={key}>
            <rect
              x={n.x - w / 2}
              y={n.y}
              width={w}
              height={h}
              rx="5"
              fill={isRoot ? `${C}20` : `${C}0d`}
              stroke={isRoot ? C : `${C}70`}
              strokeWidth={isRoot ? 1.5 : 1}
            />
            <text
              x={n.x}
              y={n.y + h / 2 + 4}
              textAnchor="middle"
              fontFamily="monospace"
              fontSize={fontSize}
              fill={isRoot ? C : `${C}cc`}
            >
              {n.label}
            </text>
          </g>
        )
      })}

      <text x="390" y="205" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}50`}>
        Document Object Model tree structure
      </text>
    </svg>
  )
}
