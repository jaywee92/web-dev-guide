export default function AnimatedFlowBanner() {
  const C = '#60a5fa'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-af" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-af" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
        <marker id="arr-af-r" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill={`${C}cc`} />
        </marker>
        <marker id="arr-af-l" markerWidth="7" markerHeight="7" refX="1" refY="3.5" orient="auto">
          <path d="M7,0 L0,3.5 L7,7 Z" fill="#4ade80cc" />
        </marker>
      </defs>
      <rect width="780" height="220" fill="url(#dots-af)" />
      <rect width="780" height="220" fill="url(#glow-af)" />

      {/* Browser box */}
      <rect x="40" y="85" width="110" height="50" rx="7" fill={`${C}10`} stroke={`${C}55`} strokeWidth="1.5" />
      <rect x="40" y="85" width="110" height="14" rx="7" fill={`${C}22`} />
      <rect x="40" y="92" width="110" height="7" fill={`${C}22`} />
      <circle cx="53" cy="92" r="3" fill="#f87171aa" />
      <circle cx="63" cy="92" r="3" fill="#fbbf24aa" />
      <circle cx="73" cy="92" r="3" fill="#4ade80aa" />
      <text x="95" y="119" fill={`${C}ee`} fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="700">Browser</text>

      {/* Request arrow: browser → server */}
      <line x1="152" y1="102" x2="278" y2="102" stroke={`${C}cc`} strokeWidth="1.5" markerEnd="url(#arr-af-r)" />
      <text x="215" y="97" fill={`${C}cc`} fontSize="9" fontFamily="monospace" textAnchor="middle">GET /api/data</text>
      <text x="215" y="112" fill={`${C}55`} fontSize="8" fontFamily="monospace" textAnchor="middle">~12ms</text>

      {/* Lock icon on request line */}
      <rect x="208" y="118" width="10" height="8" rx="2" fill={`${C}30`} stroke={`${C}80`} strokeWidth="1" />
      <path d="M210,118 Q210,114 213,114 Q216,114 216,118" fill="none" stroke={`${C}80`} strokeWidth="1" />

      {/* Server box */}
      <rect x="280" y="85" width="110" height="50" rx="7" fill={`${C}10`} stroke={`${C}55`} strokeWidth="1.5" />
      <text x="335" y="115" fill={`${C}ee`} fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="700">Server</text>

      {/* DB cylinder below server */}
      <rect x="295" y="148" width="80" height="28" rx="8" fill={`${C}08`} stroke={`${C}35`} strokeWidth="1.2" />
      <ellipse cx="335" cy="148" rx="40" ry="6" fill={`${C}18`} stroke={`${C}35`} strokeWidth="1.2" />
      <ellipse cx="335" cy="176" rx="40" ry="6" fill={`${C}10`} stroke={`${C}35`} strokeWidth="1.2" />
      <text x="335" y="166" fill={`${C}99`} fontSize="10" fontFamily="monospace" textAnchor="middle">DB</text>

      {/* Server → DB connector */}
      <line x1="335" y1="135" x2="335" y2="142" stroke={`${C}40`} strokeWidth="1" />

      {/* Response arrow: server → json box */}
      <line x1="392" y1="118" x2="508" y2="118" stroke="#4ade80cc" strokeWidth="1.5" markerEnd="url(#arr-af-l)" />
      <line x1="392" y1="118" x2="508" y2="118" stroke="#4ade80cc" strokeWidth="1.5" />
      {/* flip the direction: draw from json box back to server */}
      <line x1="508" y1="118" x2="394" y2="118" stroke="#4ade80cc" strokeWidth="1.5" markerEnd="url(#arr-af-l)" />
      <text x="450" y="113" fill="#4ade80cc" fontSize="9" fontFamily="monospace" textAnchor="middle">200 OK &#123; data &#125;</text>
      <text x="450" y="128" fill="#4ade8055" fontSize="8" fontFamily="monospace" textAnchor="middle">~8ms</text>

      {/* JSON box */}
      <rect x="510" y="85" width="200" height="50" rx="7" fill="#4ade8010" stroke="#4ade8040" strokeWidth="1.5" />
      <text x="610" y="104" fill="#4ade80cc" fontSize="10" fontFamily="monospace" textAnchor="middle">&#123;</text>
      <text x="610" y="118" fill="#4ade80cc" fontSize="10" fontFamily="monospace" textAnchor="middle">  id: 1, name: "..."</text>
      <text x="610" y="130" fill="#4ade80cc" fontSize="10" fontFamily="monospace" textAnchor="middle">&#125;</text>

      {/* Title */}
      <text x="390" y="22" fill={`${C}55`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="600">HTTP REQUEST-RESPONSE CYCLE</text>

      {/* HTTPS label */}
      <text x="390" y="205" fill={`${C}35`} fontSize="9" fontFamily="monospace" textAnchor="middle">TLS encrypted · stateless · TCP/IP</text>
    </svg>
  )
}
