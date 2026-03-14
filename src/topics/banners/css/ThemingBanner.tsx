export default function ThemingBanner() {
  const C = '#f5c542'
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

      {/* LEFT: Light theme panel */}
      <rect x="10" y="10" width="370" height="200" rx="8"
        fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />

      <text x="195" y="30" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(245,197,66,0.8)">[data-theme="light"]</text>

      {/* Light theme mini card */}
      <rect x="55" y="44" width="280" height="140" rx="6"
        fill="rgba(255,255,255,0.92)" stroke="rgba(200,200,200,0.4)" strokeWidth="1" />
      {/* Heading line */}
      <rect x="75" y="60" width="160" height="10" rx="3" fill="rgba(30,30,30,0.8)" />
      {/* Paragraph lines */}
      <rect x="75" y="80" width="220" height="7" rx="2" fill="rgba(80,80,80,0.4)" />
      <rect x="75" y="94" width="190" height="7" rx="2" fill="rgba(80,80,80,0.3)" />
      <rect x="75" y="108" width="200" height="7" rx="2" fill="rgba(80,80,80,0.35)" />
      {/* Button */}
      <rect x="75" y="128" width="80" height="28" rx="4" fill="rgba(245,197,66,0.85)" />
      <rect x="75" y="128" width="80" height="28" rx="4" fill="none" stroke="rgba(245,197,66,0.5)" strokeWidth="1" />
      <text x="115" y="147" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(30,30,30,0.9)">button</text>

      {/* RIGHT: Dark theme panel */}
      <rect x="400" y="10" width="370" height="200" rx="8"
        fill="rgba(5,10,20,0.9)" stroke="rgba(245,197,66,0.3)" strokeWidth="1.5" />

      <text x="585" y="30" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(245,197,66,0.8)">[data-theme="dark"]</text>

      {/* Dark theme mini card */}
      <rect x="445" y="44" width="280" height="140" rx="6"
        fill="rgba(20,28,46,0.95)" stroke="rgba(245,197,66,0.2)" strokeWidth="1" />
      {/* Heading line */}
      <rect x="465" y="60" width="160" height="10" rx="3" fill="rgba(255,255,255,0.85)" />
      {/* Paragraph lines */}
      <rect x="465" y="80" width="220" height="7" rx="2" fill="rgba(180,180,180,0.35)" />
      <rect x="465" y="94" width="190" height="7" rx="2" fill="rgba(180,180,180,0.28)" />
      <rect x="465" y="108" width="200" height="7" rx="2" fill="rgba(180,180,180,0.32)" />
      {/* Button */}
      <rect x="465" y="128" width="80" height="28" rx="4" fill="rgba(245,197,66,0.75)" />
      <text x="505" y="147" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(30,30,30,0.9)">button</text>

      {/* Center divider */}
      <line x1="390" y1="10" x2="390" y2="210" stroke="rgba(245,197,66,0.25)" strokeWidth="1.5" strokeDasharray="6 3" />

      {/* Sun icon (left side, top) — SVG shapes */}
      <circle cx="360" cy="100" r="10" fill="rgba(245,197,66,0.9)" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180
        const x1 = 360 + Math.cos(rad) * 13
        const y1 = 100 + Math.sin(rad) * 13
        const x2 = 360 + Math.cos(rad) * 18
        const y2 = 100 + Math.sin(rad) * 18
        return (
          <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="rgba(245,197,66,0.9)" strokeWidth="1.5" strokeLinecap="round" />
        )
      })}

      {/* Crescent moon (right side, top) — two overlapping circles */}
      <circle cx="428" cy="100" r="12" fill="rgba(245,197,66,0.85)" />
      <circle cx="435" cy="96" r="10" fill="rgba(5,10,20,0.95)" />
    </svg>
  )
}
