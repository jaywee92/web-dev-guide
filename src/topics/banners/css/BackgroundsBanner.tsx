export default function BackgroundsBanner() {
  const C = '#34d399'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-bg" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-bg" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="grad-bg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={C} stopOpacity="0.8" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </linearGradient>
        {/* Crosshatch pattern for image simulation */}
        <pattern id="crosshatch-bg" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
          <line x1="0" y1="12" x2="12" y2="0" stroke="rgba(52,211,153,0.4)" strokeWidth="1" />
          <line x1="0" y1="6" x2="6" y2="0" stroke="rgba(52,211,153,0.2)" strokeWidth="0.5" />
        </pattern>
        {/* Cover pattern - fills edge to edge */}
        <pattern id="cover-bg" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="rgba(52,211,153,0.15)" />
          <circle cx="10" cy="10" r="7" fill="none" stroke="rgba(52,211,153,0.4)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="780" height="220" fill="url(#dots-bg)" />
      <rect width="780" height="220" fill="url(#glow-bg)" />

      {/* 2x2 grid of boxes */}
      {/* Top-left: background-color */}
      <rect x="30" y="30" width="330" height="80" rx="6" fill="rgba(52,211,153,0.65)" stroke="rgba(52,211,153,0.8)" strokeWidth="1.5" />
      <text x="195" y="62" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="rgba(0,0,0,0.7)">background-color</text>
      <text x="195" y="80" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(0,0,0,0.5)">#34d399</text>

      {/* Top-right: linear-gradient */}
      <rect x="420" y="30" width="330" height="80" rx="6" fill="url(#grad-bg)" stroke="rgba(52,211,153,0.5)" strokeWidth="1.5" />
      <text x="585" y="62" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="rgba(52,211,153,0.9)">linear-gradient</text>
      <text x="585" y="80" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(52,211,153,0.6)">green → transparent</text>

      {/* Bottom-left: background-image (crosshatch) */}
      <rect x="30" y="128" width="330" height="80" rx="6" fill="rgba(52,211,153,0.05)" stroke="rgba(52,211,153,0.4)" strokeWidth="1.5" />
      <rect x="30" y="128" width="330" height="80" rx="6" fill="url(#crosshatch-bg)" />
      <text x="195" y="162" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="rgba(52,211,153,0.9)">background-image</text>
      <text x="195" y="180" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(52,211,153,0.6)">url(...)</text>

      {/* Bottom-right: background-size cover vs contain */}
      <rect x="420" y="128" width="330" height="80" rx="6" fill="rgba(52,211,153,0.05)" stroke="rgba(52,211,153,0.4)" strokeWidth="1.5" />

      {/* cover — fills edge to edge */}
      <rect x="430" y="133" width="145" height="70" rx="3" fill="url(#cover-bg)" />
      <text x="502" y="162" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(52,211,153,0.9)">cover</text>
      <text x="502" y="176" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(52,211,153,0.6)">fills edge-to-edge</text>

      {/* contain — shows gaps */}
      <rect x="585" y="133" width="145" height="70" rx="3" fill="rgba(52,211,153,0.05)" stroke="rgba(52,211,153,0.2)" strokeWidth="1" />
      <rect x="600" y="140" width="115" height="56" rx="2" fill="url(#cover-bg)" />
      <text x="657" y="162" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(52,211,153,0.9)">contain</text>
      <text x="657" y="176" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(52,211,153,0.6)">with gaps</text>
    </svg>
  )
}
