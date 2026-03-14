export default function BoxModelBanner() {
  const C = '#60a5fa'
  const cx = 390
  const cy = 105

  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-bm" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-bm" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-bm)" />
      <rect width="780" height="220" fill="url(#glow-bm)" />

      {/* margin — outermost, 310×95 half-extents */}
      <rect x={cx - 310} y={cy - 95} width="620" height="190" rx="4"
        fill="none" stroke="rgba(251,191,36,0.35)" strokeWidth="1.5" strokeDasharray="6 4" />
      <text x={cx - 306} y={cy - 82} fontFamily="monospace" fontSize="10" fill="rgba(251,191,36,0.6)">margin</text>

      {/* border — 248×72 half-extents */}
      <rect x={cx - 248} y={cy - 72} width="496" height="144" rx="3"
        fill="none" stroke="rgba(96,165,250,0.6)" strokeWidth="2.5" />
      <text x={cx - 244} y={cy - 59} fontFamily="monospace" fontSize="10" fill="rgba(96,165,250,0.7)">border</text>

      {/* padding — 186×48 half-extents */}
      <rect x={cx - 186} y={cy - 48} width="372" height="96" rx="3"
        fill="rgba(167,139,250,0.06)" stroke="rgba(167,139,250,0.5)" strokeWidth="2" />
      <text x={cx - 182} y={cy - 36} fontFamily="monospace" fontSize="10" fill="rgba(167,139,250,0.7)">padding</text>

      {/* content — 118×24 half-extents */}
      <rect x={cx - 118} y={cy - 24} width="236" height="48" rx="3"
        fill="rgba(96,165,250,0.2)" stroke="rgba(96,165,250,0.85)" strokeWidth="2" />
      <text x={cx} y={cy + 5} textAnchor="middle" fontFamily="monospace" fontSize="12" fill="white">content</text>

      {/* Width annotation — horizontal line at y=207 */}
      <line x1="80" y1="207" x2="700" y2="207" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <line x1="80" y1="203" x2="80" y2="211" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <line x1="700" y1="203" x2="700" y2="211" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <text x="390" y="216" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.3)">width</text>

      {/* Height annotation — vertical line at x=18 */}
      <line x1="18" y1="15" x2="18" y2="200" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <line x1="14" y1="15" x2="22" y2="15" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <line x1="14" y1="200" x2="22" y2="200" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <text x="10" y="112" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.3)"
        transform="rotate(-90,10,112)">height</text>

      {/* box-sizing note — top right */}
      <rect x="610" y="8" width="162" height="36" rx="4"
        fill="rgba(96,165,250,0.06)" stroke="rgba(96,165,250,0.2)" strokeWidth="1" />
      <text x="691" y="22" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(96,165,250,0.5)">box-sizing:</text>
      <text x="691" y="36" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(96,165,250,0.7)">border-box</text>
    </svg>
  )
}
