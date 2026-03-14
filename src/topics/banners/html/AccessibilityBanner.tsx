export default function AccessibilityBanner() {
  const C = '#f59e0b'

  const steps = [
    { label: '<div>', sub: 'plain', x: 40 },
    { label: 'role=\n"button"', sub: '+role', x: 172 },
    { label: 'aria-label\n="..."', sub: '+aria', x: 304 },
    { label: 'focus\nring', sub: '+focus', x: 436 },
    { label: '"button,\nClose"', sub: 'screen\nreader', x: 568 },
  ]

  const boxW = 96
  const boxH = 56
  const centerY = 90

  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-ax" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-ax" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
        <marker id="arr-ax" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill={`${C}90`} />
        </marker>
      </defs>
      <rect width="780" height="220" fill="url(#dots-ax)" />
      <rect width="780" height="220" fill="url(#glow-ax)" />

      {steps.map((step, i) => {
        const cx = step.x + boxW / 2
        const y = centerY - boxH / 2

        // Color progresses: gray → amber
        const progress = i / (steps.length - 1)
        const isLast = i === steps.length - 1
        const strokeColor = i === 0
          ? '#6b7280'
          : isLast
          ? C
          : `rgba(245,158,11,${0.3 + progress * 0.5})`
        const fillColor = i === 0
          ? 'rgba(107,114,128,0.08)'
          : isLast
          ? `${C}18`
          : `rgba(245,158,11,${0.04 + progress * 0.06})`

        // Speech bubble for last step
        const isSpeech = isLast
        const lines = step.label.split('\n')

        return (
          <g key={i}>
            {/* Arrow from previous */}
            {i > 0 && (
              <line
                x1={step.x - 14}
                y1={centerY}
                x2={step.x + 2}
                y2={centerY}
                stroke={`${C}90`}
                strokeWidth="1.5"
                markerEnd="url(#arr-ax)"
              />
            )}

            {/* Box */}
            <rect
              x={step.x}
              y={y}
              width={boxW}
              height={boxH}
              rx={isSpeech ? 8 : 5}
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth={i === 3 ? 0 : 1.2}
              strokeDasharray={i === 3 ? undefined : undefined}
            />

            {/* Focus ring dashed border for step 4 */}
            {i === 3 && (
              <>
                <rect x={step.x} y={y} width={boxW} height={boxH} rx="5" fill={fillColor} stroke="rgba(245,158,11,0.3)" strokeWidth="1" />
                <rect x={step.x - 3} y={y - 3} width={boxW + 6} height={boxH + 6} rx="7" fill="none" stroke={C} strokeWidth="1.5" strokeDasharray="4,3" />
              </>
            )}

            {/* Speech bubble tail for last step */}
            {isSpeech && (
              <path
                d={`M${step.x + 12} ${y + boxH} L${step.x + 6} ${y + boxH + 8} L${step.x + 22} ${y + boxH}`}
                fill={`${C}18`}
                stroke={strokeColor}
                strokeWidth="1"
              />
            )}

            {/* Text lines */}
            {lines.map((line, li) => (
              <text
                key={li}
                x={cx}
                y={y + boxH / 2 + (lines.length === 1 ? 4 : li === 0 ? -4 : 12)}
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="10"
                fill={i === 0 ? '#6b7280' : `${C}cc`}
              >
                {line}
              </text>
            ))}

            {/* Step label below */}
            {step.sub.split('\n').map((s, si) => (
              <text
                key={si}
                x={cx}
                y={centerY + boxH / 2 + 18 + si * 12}
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="10"
                fill={i === 0 ? '#4b5563' : `${C}70`}
              >
                {s}
              </text>
            ))}
          </g>
        )
      })}

      <text x="390" y="205" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}45`}>
        ARIA roles · labels · keyboard navigation · screen reader support
      </text>
    </svg>
  )
}
