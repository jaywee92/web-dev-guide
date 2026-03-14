export default function GitIntroBanner() {
  const C = '#2dd4bf'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-gi" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-gi" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-gi)" />
      <rect width="780" height="220" fill="url(#glow-gi)" />

      {/* Title */}
      <text x="390" y="22" textAnchor="middle" fontFamily="monospace" fontSize="11" fill={`${C}99`}>git object model</text>

      {/* Working Dir box */}
      <rect x="40" y="85" width="130" height="50" rx="4"
        fill={`${C}10`} stroke={C} strokeWidth="1.4" />
      {/* Folder icon */}
      <rect x="52" y="98" width="22" height="16" rx="2" fill="none" stroke={`${C}cc`} strokeWidth="1.2" />
      <rect x="52" y="94" width="10" height="6" rx="1" fill="none" stroke={`${C}cc`} strokeWidth="1.2" />
      <text x="105" y="107" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.8)">Working</text>
      <text x="105" y="121" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.8)">Dir</text>

      {/* Arrow 1: git add */}
      <line x1="170" y1="110" x2="255" y2="110" stroke={`${C}88`} strokeWidth="1.5" />
      <polygon points="255,106 263,110 255,114" fill={`${C}88`} />
      <text x="212" y="104" textAnchor="middle" fontFamily="monospace" fontSize="9" fill={`${C}99`}>git add</text>

      {/* Staging Area box */}
      <rect x="260" y="85" width="130" height="50" rx="4"
        fill={`${C}10`} stroke={C} strokeWidth="1.4" />
      {/* Clipboard icon */}
      <rect x="272" y="96" width="18" height="22" rx="2" fill="none" stroke={`${C}cc`} strokeWidth="1.2" />
      <rect x="276" y="93" width="10" height="5" rx="1" fill="none" stroke={`${C}cc`} strokeWidth="1.2" />
      <line x1="275" y1="104" x2="287" y2="104" stroke={`${C}88`} strokeWidth="1" />
      <line x1="275" y1="110" x2="287" y2="110" strokeWidth="1" stroke={`${C}88`} />
      <text x="340" y="107" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.8)">Staging</text>
      <text x="340" y="121" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.8)">Area</text>

      {/* Arrow 2: git commit */}
      <line x1="390" y1="110" x2="475" y2="110" stroke={`${C}88`} strokeWidth="1.5" />
      <polygon points="475,106 483,110 475,114" fill={`${C}88`} />
      <text x="432" y="104" textAnchor="middle" fontFamily="monospace" fontSize="9" fill={`${C}99`}>git commit</text>

      {/* Local Repo box */}
      <rect x="480" y="85" width="130" height="50" rx="4"
        fill={`${C}10`} stroke={C} strokeWidth="1.4" />
      {/* Cylinder / database icon */}
      <ellipse cx="502" cy="103" rx="10" ry="4" fill="none" stroke={`${C}cc`} strokeWidth="1.2" />
      <line x1="492" y1="103" x2="492" y2="115" stroke={`${C}cc`} strokeWidth="1.2" />
      <line x1="512" y1="103" x2="512" y2="115" stroke={`${C}cc`} strokeWidth="1.2" />
      <ellipse cx="502" cy="115" rx="10" ry="4" fill="none" stroke={`${C}cc`} strokeWidth="1.2" />
      <text x="560" y="107" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.8)">Local</text>
      <text x="560" y="121" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.8)">Repo</text>

      {/* Arrow 3: git push */}
      <line x1="610" y1="110" x2="673" y2="110" stroke={`${C}88`} strokeWidth="1.5" />
      <polygon points="673,106 681,110 673,114" fill={`${C}88`} />
      <text x="641" y="104" textAnchor="middle" fontFamily="monospace" fontSize="9" fill={`${C}99`}>git push</text>

      {/* Remote box — cloud shape: rect with bumpy top via arcs */}
      <path d="M682,107 Q682,87 692,87 Q694,78 706,78 Q714,72 722,78 Q734,73 738,83 Q748,83 748,93 Q748,107 738,107 Z"
        fill={`${C}10`} stroke={C} strokeWidth="1.4" />
      <text x="715" y="120" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(255,255,255,0.8)">Remote</text>

      {/* Step labels below boxes */}
      <text x="105" y="148" textAnchor="middle" fontFamily="monospace" fontSize="9" fill={`${C}66`}>edits here</text>
      <text x="325" y="148" textAnchor="middle" fontFamily="monospace" fontSize="9" fill={`${C}66`}>staged index</text>
      <text x="545" y="148" textAnchor="middle" fontFamily="monospace" fontSize="9" fill={`${C}66`}>.git/objects</text>
      <text x="715" y="133" textAnchor="middle" fontFamily="monospace" fontSize="9" fill={`${C}66`}>origin</text>
    </svg>
  )
}
