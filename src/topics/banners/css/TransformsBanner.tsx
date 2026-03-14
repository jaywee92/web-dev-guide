export default function TransformsBanner() {
  const C = '#f97316'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-tr" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-tr" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-tr)" />
      <rect width="780" height="220" fill="url(#glow-tr)" />

      {/* Title */}
      <text x="390" y="16" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="rgba(255,255,255,0.3)">CSS transforms</text>

      {/* Reference square (far left) */}
      <rect x="30" y="80" width="60" height="60" rx="3"
        fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="60" y="154" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(255,255,255,0.3)">reference</text>

      {/* 1. translate(40px, 20px) */}
      {/* Ghost at original position */}
      <rect x="130" y="80" width="60" height="60" rx="3"
        fill="none" stroke="rgba(249,115,22,0.2)" strokeWidth="1" strokeDasharray="3 3" />
      {/* Shifted box */}
      <rect x="170" y="100" width="60" height="60" rx="3"
        fill="rgba(249,115,22,0.2)" stroke={C} strokeWidth="1.5" />
      {/* Movement arrows */}
      <line x1="160" y1="110" x2="172" y2="110" stroke="rgba(249,115,22,0.6)" strokeWidth="1" />
      <polygon points="172,107 178,110 172,113" fill="rgba(249,115,22,0.6)" />
      <line x1="160" y1="110" x2="160" y2="122" stroke="rgba(249,115,22,0.6)" strokeWidth="1" />
      <polygon points="157,122 160,128 163,122" fill="rgba(249,115,22,0.6)" />
      <text x="190" y="177" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(249,115,22,0.8)">translate</text>
      <text x="190" y="189" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(249,115,22,0.6)">(40px,20px)</text>

      {/* 2. rotate(45deg) */}
      <g transform="rotate(45, 320, 110)">
        <rect x="290" y="80" width="60" height="60" rx="3"
          fill="rgba(249,115,22,0.2)" stroke={C} strokeWidth="1.5" />
      </g>
      {/* Ghost outline */}
      <rect x="290" y="80" width="60" height="60" rx="3"
        fill="none" stroke="rgba(249,115,22,0.15)" strokeWidth="1" strokeDasharray="3 3" />
      <text x="320" y="177" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(249,115,22,0.8)">rotate</text>
      <text x="320" y="189" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(249,115,22,0.6)">(45deg)</text>

      {/* 3. scale(1.5) */}
      {/* Ghost at original size */}
      <rect x="440" y="85" width="60" height="60" rx="3"
        fill="none" stroke="rgba(249,115,22,0.15)" strokeWidth="1" strokeDasharray="3 3" />
      {/* Scaled box (1.5x = 90px, centered at 470) */}
      <rect x="425" y="75" width="90" height="90" rx="4"
        fill="rgba(249,115,22,0.2)" stroke={C} strokeWidth="1.5" />
      <text x="470" y="182" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(249,115,22,0.8)">scale</text>
      <text x="470" y="194" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(249,115,22,0.6)">(1.5)</text>

      {/* 4. skewX(20deg) */}
      <g transform="skewX(-20)">
        <rect x="640" y="80" width="60" height="60" rx="3"
          fill="rgba(249,115,22,0.2)" stroke={C} strokeWidth="1.5" />
      </g>
      {/* Ghost */}
      <rect x="610" y="80" width="60" height="60" rx="3"
        fill="none" stroke="rgba(249,115,22,0.15)" strokeWidth="1" strokeDasharray="3 3" />
      <text x="640" y="177" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(249,115,22,0.8)">skewX</text>
      <text x="640" y="189" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(249,115,22,0.6)">(20deg)</text>
    </svg>
  )
}
