export default function LinksImagesBanner() {
  const C = '#34d399'

  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-li" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-li" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="img-grad-li" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={C} stopOpacity="0.25" />
          <stop offset="100%" stopColor={C} stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-li)" />
      <rect width="780" height="220" fill="url(#glow-li)" />

      {/* Divider */}
      <line x1="390" y1="10" x2="390" y2="210" stroke="#ffffff10" strokeWidth="1" strokeDasharray="4,4" />

      {/* --- LEFT HALF: <a> tag flow --- */}
      <text x="60" y="22" fontFamily="monospace" fontSize="11" fill={`${C}80`}>Links</text>

      {/* <a> box */}
      <rect x="50" y="60" width="110" height="48" rx="6" fill="rgba(52,211,153,0.08)" stroke="rgba(52,211,153,0.55)" strokeWidth="1.2" />
      <text x="105" y="80" textAnchor="middle" fontFamily="monospace" fontSize="13" fill={C}>{'<a>'}</text>
      <text x="105" y="97" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}80`}>href="#"</text>

      {/* Arrow */}
      <line x1="165" y1="84" x2="215" y2="84" stroke={`${C}80`} strokeWidth="1.5" markerEnd="url(#arr-li)" />
      <defs>
        <marker id="arr-li" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill={`${C}80`} />
        </marker>
      </defs>

      {/* Destination page box */}
      <rect x="220" y="48" width="120" height="72" rx="6" fill="rgba(52,211,153,0.05)" stroke="rgba(52,211,153,0.35)" strokeWidth="1" />
      <text x="280" y="72" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}90`}>destination</text>
      {/* Page lines */}
      <line x1="240" y1="84" x2="320" y2="84" stroke={`${C}30`} strokeWidth="2" />
      <line x1="240" y1="96" x2="300" y2="96" stroke={`${C}30`} strokeWidth="2" />
      <line x1="240" y1="108" x2="310" y2="108" stroke={`${C}30`} strokeWidth="2" />

      <text x="185" y="160" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}55`}>navigates to URL</text>

      {/* --- RIGHT HALF: <img> tag --- */}
      <text x="450" y="22" fontFamily="monospace" fontSize="11" fill={`${C}80`}>Images</text>

      {/* Placeholder image rect */}
      <rect x="450" y="35" width="130" height="80" rx="6" fill="url(#img-grad-li)" stroke="rgba(52,211,153,0.4)" strokeWidth="1.2" />
      {/* Mountain icon suggestion */}
      <path d="M460 105 L490 65 L510 85 L530 55 L570 105 Z" fill="rgba(52,211,153,0.2)" />
      <circle cx="548" cy="65" r="8" fill="rgba(52,211,153,0.3)" />

      {/* <img> tag box */}
      <rect x="450" y="126" width="130" height="32" rx="6" fill="rgba(52,211,153,0.08)" stroke="rgba(52,211,153,0.55)" strokeWidth="1.2" />
      <text x="515" y="147" textAnchor="middle" fontFamily="monospace" fontSize="12" fill={C}>{'<img />'}</text>

      {/* Attribute chips */}
      {['src', 'alt', 'width'].map((attr, i) => (
        <g key={attr}>
          <rect x={450 + i * 50} y="168" width="42" height="22" rx="4" fill="rgba(52,211,153,0.1)" stroke="rgba(52,211,153,0.4)" strokeWidth="1" />
          <text x={450 + i * 50 + 21} y="183" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}cc`}>{attr}</text>
        </g>
      ))}
    </svg>
  )
}
