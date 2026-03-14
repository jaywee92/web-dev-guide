export default function ResponsiveBanner() {
  const C = '#2dd4bf'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-rp" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-rp" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
        <marker id="arrow-rp" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="rgba(45,212,191,0.5)" />
        </marker>
      </defs>
      <rect width="780" height="220" fill="url(#dots-rp)" />
      <rect width="780" height="220" fill="url(#glow-rp)" />

      {/* Mobile silhouette — x=60, w=80, h=140, y=30 */}
      <rect x="60" y="30" width="80" height="140" rx="8"
        fill="rgba(45,212,191,0.06)" stroke="rgba(45,212,191,0.5)" strokeWidth="1.5" />
      {/* screen interior */}
      <rect x="66" y="42" width="68" height="116" rx="4" fill="rgba(45,212,191,0.04)" />
      {/* header block */}
      <rect x="70" y="46" width="60" height="18" rx="2"
        fill="rgba(45,212,191,0.2)" stroke="rgba(45,212,191,0.4)" strokeWidth="1" />
      {/* content block */}
      <rect x="70" y="68" width="60" height="82" rx="2"
        fill="rgba(45,212,191,0.08)" stroke="rgba(45,212,191,0.25)" strokeWidth="1" />
      <text x="100" y="182" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(45,212,191,0.7)">&lt; 768px</text>
      <text x="100" y="196" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(45,212,191,0.45)">mobile</text>

      {/* Arrow: mobile → tablet */}
      <line x1="148" y1="100" x2="212" y2="100"
        stroke="rgba(45,212,191,0.4)" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#arrow-rp)" />
      <text x="180" y="94" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(45,212,191,0.4)">breakpoint</text>

      {/* Tablet silhouette — x=218, w=140, h=140, y=30 */}
      <rect x="218" y="30" width="140" height="140" rx="8"
        fill="rgba(45,212,191,0.06)" stroke="rgba(45,212,191,0.5)" strokeWidth="1.5" />
      <rect x="224" y="42" width="128" height="116" rx="4" fill="rgba(45,212,191,0.04)" />
      {/* sidebar + main layout */}
      <rect x="228" y="46" width="36" height="108" rx="2"
        fill="rgba(45,212,191,0.15)" stroke="rgba(45,212,191,0.35)" strokeWidth="1" />
      <rect x="268" y="46" width="80" height="108" rx="2"
        fill="rgba(45,212,191,0.08)" stroke="rgba(45,212,191,0.25)" strokeWidth="1" />
      <text x="288" y="182" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(45,212,191,0.7)">768px+</text>
      <text x="288" y="196" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(45,212,191,0.45)">tablet</text>

      {/* Arrow: tablet → desktop */}
      <line x1="366" y1="100" x2="432" y2="100"
        stroke="rgba(45,212,191,0.4)" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#arrow-rp)" />
      <text x="399" y="94" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(45,212,191,0.4)">breakpoint</text>

      {/* Desktop silhouette — x=438, w=280, h=140, y=30 */}
      <rect x="438" y="30" width="304" height="140" rx="8"
        fill="rgba(45,212,191,0.06)" stroke="rgba(45,212,191,0.5)" strokeWidth="1.5" />
      <rect x="444" y="42" width="292" height="116" rx="4" fill="rgba(45,212,191,0.04)" />
      {/* sidebar + wider main layout */}
      <rect x="448" y="46" width="70" height="108" rx="2"
        fill="rgba(45,212,191,0.15)" stroke="rgba(45,212,191,0.35)" strokeWidth="1" />
      <rect x="522" y="46" width="210" height="108" rx="2"
        fill="rgba(45,212,191,0.08)" stroke="rgba(45,212,191,0.25)" strokeWidth="1" />
      <text x="590" y="182" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(45,212,191,0.7)">1024px+</text>
      <text x="590" y="196" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(45,212,191,0.45)">desktop</text>

      {/* @media label top-center */}
      <text x="390" y="18" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="rgba(45,212,191,0.35)">@media (min-width: …) {'{ … }'}</text>
    </svg>
  )
}
