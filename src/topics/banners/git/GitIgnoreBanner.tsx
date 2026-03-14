export default function GitIgnoreBanner() {
  const C = '#2dd4bf'
  return (
    <svg
      width="100%"
      viewBox="0 0 780 220"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', background: '#07101a' }}
    >
      <defs>
        <pattern id="dots-gitignore" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-gitignore" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-gitignore)" />
      <rect width="780" height="220" fill="url(#glow-gitignore)" />

      {/* Title */}
      <text x="390" y="18" textAnchor="middle" fontFamily="monospace" fontSize="11" fill={`${C}99`}>.gitignore — pattern matching</text>

      {/* .gitignore file box */}
      <rect x="28" y="28" width="160" height="148" rx="4" fill={`${C}0d`} stroke={C} strokeWidth="1.4" />
      {/* file header bar */}
      <rect x="28" y="28" width="160" height="22" rx="4" fill={`${C}22`} />
      <rect x="28" y="40" width="160" height="10" rx="0" fill={`${C}22`} />
      <text x="108" y="43" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={C}>.gitignore</text>
      {/* pattern lines */}
      <text x="40" y="68" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.75)">node_modules/</text>
      <text x="40" y="86" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.75)">*.log</text>
      <text x="40" y="104" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.75)">.env</text>
      <text x="40" y="122" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.75)">dist/</text>
      <text x="40" y="140" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.75)">.DS_Store</text>
      <text x="40" y="158" fontFamily="monospace" fontSize="10" fill={`${C}66`}>build/</text>

      {/* File tree box */}
      <rect x="330" y="28" width="180" height="148" rx="4" fill={`${C}0d`} stroke={`${C}66`} strokeWidth="1" />
      <text x="420" y="43" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}88`}>project/</text>
      {/* folder items */}
      {/* ignored: node_modules */}
      <text x="348" y="66" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.55)">📁 node_modules/</text>
      <text x="494" y="66" fontFamily="monospace" fontSize="10" fill="#ef4444">✗</text>
      {/* ignored: .env */}
      <text x="348" y="84" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.55)">📄 .env</text>
      <text x="494" y="84" fontFamily="monospace" fontSize="10" fill="#ef4444">✗</text>
      {/* tracked: src/ */}
      <text x="348" y="102" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.8)">📁 src/</text>
      <text x="494" y="102" fontFamily="monospace" fontSize="10" fill="#22c55e">✓</text>
      {/* tracked: package.json */}
      <text x="348" y="120" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.8)">📄 package.json</text>
      <text x="494" y="120" fontFamily="monospace" fontSize="10" fill="#22c55e">✓</text>
      {/* ignored: dist/ */}
      <text x="348" y="138" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.55)">📁 dist/</text>
      <text x="494" y="138" fontFamily="monospace" fontSize="10" fill="#ef4444">✗</text>
      {/* tracked: README */}
      <text x="348" y="156" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.8)">📄 README.md</text>
      <text x="494" y="156" fontFamily="monospace" fontSize="10" fill="#22c55e">✓</text>

      {/* Arrows from patterns to file tree items */}
      {/* node_modules/ pattern → node_modules/ file */}
      <line x1="190" y1="68" x2="328" y2="66" stroke="#ef444466" strokeWidth="1" strokeDasharray="4,3" />
      {/* .env pattern → .env file */}
      <line x1="190" y1="104" x2="328" y2="84" stroke="#ef444466" strokeWidth="1" strokeDasharray="4,3" />
      {/* dist/ pattern → dist/ file */}
      <line x1="190" y1="122" x2="328" y2="138" stroke="#ef444466" strokeWidth="1" strokeDasharray="4,3" />

      {/* Pattern syntax chips at bottom */}
      {/* * wildcard */}
      <rect x="28" y="188" width="80" height="24" rx="4" fill={`${C}18`} stroke={`${C}55`} strokeWidth="1" />
      <text x="68" y="204" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={C}>* wildcard</text>
      {/* / directory */}
      <rect x="118" y="188" width="80" height="24" rx="4" fill={`${C}18`} stroke={`${C}55`} strokeWidth="1" />
      <text x="158" y="204" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={C}>/ directory</text>
      {/* ! negation */}
      <rect x="208" y="188" width="80" height="24" rx="4" fill={`${C}18`} stroke={`${C}55`} strokeWidth="1" />
      <text x="248" y="204" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={C}>! negation</text>

      {/* Legend */}
      <text x="560" y="198" fontFamily="monospace" fontSize="10" fill="#ef4444">✗ ignored</text>
      <text x="650" y="198" fontFamily="monospace" fontSize="10" fill="#22c55e">✓ tracked</text>
    </svg>
  )
}
