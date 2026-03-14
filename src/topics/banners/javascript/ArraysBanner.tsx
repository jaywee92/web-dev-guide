export default function ArraysBanner() {
  const C = '#34d399'
  const items = ['42', '"hi"', 'true', 'null', '[]']
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-ar" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-ar" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
        <marker id="arr-ar" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={`${C}80`} />
        </marker>
      </defs>
      <rect width="780" height="220" fill="url(#dots-ar)" />
      <rect width="780" height="220" fill="url(#glow-ar)" />

      {/* Top: Array boxes */}
      <text x="390" y="18" fill={`${C}50`} fontSize="9" fontFamily="monospace" textAnchor="middle">mixed-type array</text>
      {items.map((val, i) => {
        const bx = 65 + i * 132
        return (
          <g key={i}>
            <rect x={bx} y="24" width="112" height="48" rx="5"
              fill={`${C}${i === 0 ? '18' : i === 1 ? '12' : i === 2 ? '0e' : i === 3 ? '09' : '07'}`}
              stroke={`${C}${i === 0 ? '55' : i === 1 ? '40' : i === 2 ? '30' : i === 3 ? '22' : '18'}`}
              strokeWidth="1.2" />
            <text x={bx + 56} y="54" fill={`${C}${i === 0 ? 'ee' : i === 1 ? 'cc' : i === 2 ? 'aa' : i === 3 ? '77' : '55'}`}
              fontSize="11" fontFamily="monospace" textAnchor="middle">{val}</text>
            <text x={bx + 56} y="86" fill={`${C}35`} fontSize="9" fontFamily="monospace" textAnchor="middle">[{i}]</text>
          </g>
        )
      })}

      {/* Divider */}
      <line x1="30" y1="100" x2="750" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

      {/* Bottom: 3 method diagrams */}

      {/* push / pop */}
      <text x="130" y="116" fill={`${C}70`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="700">push / pop</text>
      {/* small array */}
      {[0, 1, 2].map(i => (
        <rect key={i} x={30 + i * 36} y="122" width="30" height="24" rx="3"
          fill={`${C}10`} stroke={`${C}30`} strokeWidth="1" />
      ))}
      {/* push arrow + element */}
      <line x1="138" y1="134" x2="158" y2="134" stroke={`${C}60`} strokeWidth="1.5" markerEnd="url(#arr-ar)" />
      <rect x="162" y="122" width="30" height="24" rx="3" fill={`${C}20`} stroke={`${C}50`} strokeWidth="1.2" strokeDasharray="3 2" />
      <text x="177" y="138" fill={`${C}bb`} fontSize="9" fontFamily="monospace" textAnchor="middle">+</text>
      {/* pop arrow */}
      <line x1="194" y1="150" x2="175" y2="165" stroke={`${C}40`} strokeWidth="1.5" markerEnd="url(#arr-ar)" />
      <text x="205" y="155" fill={`${C}40`} fontSize="8" fontFamily="monospace">pop</text>
      <text x="130" y="195" fill={`${C}35`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">mutates end</text>

      {/* map */}
      <text x="390" y="116" fill={`${C}70`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="700">map</text>
      {/* source array */}
      {[0, 1, 2].map(i => (
        <rect key={i} x={285 + i * 34} y="122" width="28" height="24" rx="3"
          fill={`${C}10`} stroke={`${C}28`} strokeWidth="1" />
      ))}
      {/* fn label + arrow */}
      <rect x="390" y="126" width="32" height="16" rx="3" fill={`${C}18`} stroke={`${C}40`} strokeWidth="1" />
      <text x="406" y="138" fill={`${C}cc`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">fn</text>
      <line x1="388" y1="134" x2="375" y2="134" stroke={`${C}50`} strokeWidth="1.5" markerEnd="url(#arr-ar)" />
      <line x1="424" y1="134" x2="436" y2="134" stroke={`${C}50`} strokeWidth="1.5" markerEnd="url(#arr-ar)" />
      {/* result array */}
      {[0, 1, 2].map(i => (
        <rect key={i} x={438 + i * 34} y="122" width="28" height="24" rx="3"
          fill={`${C}18`} stroke={`${C}45`} strokeWidth="1" />
      ))}
      <text x="390" y="195" fill={`${C}35`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">new array, same length</text>

      {/* filter */}
      <text x="650" y="116" fill={`${C}70`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="700">filter</text>
      {/* source array */}
      {[0, 1, 2, 3].map(i => (
        <rect key={i} x={568 + i * 28} y="122" width="22" height="24" rx="3"
          fill={`${C}${i % 2 === 0 ? '12' : '06'}`} stroke={`${C}${i % 2 === 0 ? '35' : '18'}`} strokeWidth="1" />
      ))}
      {/* funnel shape */}
      <polygon points="692,122 712,122 706,146 698,146" fill={`${C}10`} stroke={`${C}35`} strokeWidth="1" />
      <line x1="692" y1="134" x2="688" y2="134" stroke={`${C}40`} strokeWidth="1.5" markerEnd="url(#arr-ar)" />
      <line x1="714" y1="134" x2="720" y2="134" stroke={`${C}40`} strokeWidth="1.5" markerEnd="url(#arr-ar)" />
      {/* result array (smaller) */}
      {[0, 1].map(i => (
        <rect key={i} x={722 + i * 26} y="122" width="20" height="24" rx="3"
          fill={`${C}18`} stroke={`${C}45`} strokeWidth="1" />
      ))}
      <text x="650" y="195" fill={`${C}35`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">new array, filtered</text>
    </svg>
  )
}
