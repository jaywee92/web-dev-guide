export default function ControlFlowBanner() {
  const C = '#fbbf24'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-cf" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-cf" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
        <marker id="arr-cf" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={`${C}80`} />
        </marker>
      </defs>
      <rect width="780" height="220" fill="url(#dots-cf)" />
      <rect width="780" height="220" fill="url(#glow-cf)" />

      {/* === Panel 1: if / else === */}
      <rect x="12" y="14" width="228" height="194" rx="8" fill={`${C}04`} stroke={`${C}28`} strokeWidth="1.5" />
      <text x="126" y="30" fill={`${C}80`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="700">if / else</text>

      {/* diamond decision */}
      <polygon points="126,44 162,78 126,112 90,78" fill={`${C}10`} stroke={`${C}50`} strokeWidth="1.5" />
      <text x="126" y="82" fill={`${C}ee`} fontSize="9" fontFamily="monospace" textAnchor="middle">condition?</text>

      {/* true branch */}
      <line x1="90" y1="78" x2="50" y2="78" stroke={`${C}60`} strokeWidth="1.5" markerEnd="url(#arr-cf)" />
      <rect x="18" y="120" width="64" height="26" rx="4" fill="#22c55e18" stroke="#22c55e50" strokeWidth="1.2" />
      <text x="50" y="137" fill="#22c55ecc" fontSize="9" fontFamily="monospace" textAnchor="middle">true</text>
      <line x1="50" y1="78" x2="50" y2="118" stroke={`${C}40`} strokeWidth="1.2" />
      <text x="50" y="108" fill="#22c55e80" fontSize="8" fontFamily="monospace" textAnchor="middle">true</text>

      {/* false branch */}
      <line x1="162" y1="78" x2="202" y2="78" stroke={`${C}60`} strokeWidth="1.5" markerEnd="url(#arr-cf)" />
      <rect x="176" y="120" width="54" height="26" rx="4" fill="#ef444418" stroke="#ef444450" strokeWidth="1.2" />
      <text x="203" y="137" fill="#ef4444cc" fontSize="9" fontFamily="monospace" textAnchor="middle">false</text>
      <line x1="203" y1="78" x2="203" y2="118" stroke={`${C}40`} strokeWidth="1.2" />
      <text x="203" y="108" fill="#ef444480" fontSize="8" fontFamily="monospace" textAnchor="middle">false</text>

      <text x="126" y="170" fill={`${C}40`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">branching logic</text>
      <text x="126" y="196" fill={`${C}35`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">else if chains allowed</text>

      {/* === Panel 2: for loop === */}
      <rect x="266" y="14" width="228" height="194" rx="8" fill={`${C}04`} stroke={`${C}28`} strokeWidth="1.5" />
      <text x="380" y="30" fill={`${C}80`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="700">for loop</text>

      {/* circular arrow above */}
      <path d="M320,70 A44,20 0 1,1 440,70" fill="none" stroke={`${C}50`} strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arr-cf)" />
      <text x="380" y="58" fill={`${C}50`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">i++</text>

      {/* index boxes */}
      {[0, 1, 2, 3].map(i => (
        <g key={i}>
          <rect x={284 + i * 46} y="78" width="38" height="32" rx="4"
            fill={i === 0 ? `${C}20` : `${C}0e`}
            stroke={i === 0 ? `${C}60` : `${C}30`}
            strokeWidth="1.2" />
          <text x={303 + i * 46} y="99" fill={i === 0 ? `${C}ee` : `${C}99`} fontSize="11" fontFamily="monospace" textAnchor="middle">{i}</text>
        </g>
      ))}

      <text x="380" y="130" fill={`${C}50`} fontSize="9" fontFamily="monospace" textAnchor="middle">{'for (let i = 0; i < 4; i++)'}</text>
      <text x="380" y="154" fill={`${C}40`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">iterates each index</text>
      <text x="380" y="196" fill={`${C}35`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">also: for...of · for...in</text>

      {/* === Panel 3: break / continue === */}
      <rect x="520" y="14" width="248" height="194" rx="8" fill={`${C}04`} stroke={`${C}28`} strokeWidth="1.5" />
      <text x="644" y="30" fill={`${C}80`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="700">break / continue</text>

      {/* loop row */}
      {[0, 1, 2, 3, 4].map(i => {
        const skip = i === 2
        const stop = i === 4
        return (
          <g key={i}>
            <rect x={532 + i * 42} y="50" width="34" height="28" rx="4"
              fill={skip ? '#3b82f618' : stop ? '#ef444418' : `${C}0e`}
              stroke={skip ? '#3b82f650' : stop ? '#ef444450' : `${C}28`}
              strokeWidth="1.2"
              strokeDasharray={skip ? '3 2' : 'none'} />
            <text x={549 + i * 42} y="69" fill={skip ? '#3b82f6cc' : stop ? '#ef4444cc' : `${C}99`}
              fontSize="9" fontFamily="monospace" textAnchor="middle">{i}</text>
          </g>
        )
      })}

      {/* continue label */}
      <text x="618" y="46" fill="#3b82f6aa" fontSize="8.5" fontFamily="monospace" textAnchor="middle">skip</text>
      <line x1="618" y1="48" x2="618" y2="50" stroke="#3b82f660" strokeWidth="1" markerEnd="url(#arr-cf)" />

      {/* break wall */}
      <line x1="724" y1="44" x2="724" y2="84" stroke="#ef444460" strokeWidth="2.5" strokeLinecap="round" />
      <text x="738" y="68" fill="#ef4444aa" fontSize="8.5" fontFamily="monospace">stop</text>

      <text x="644" y="108" fill={`${C}50`} fontSize="9" fontFamily="monospace" textAnchor="middle">continue → skip iteration</text>
      <text x="644" y="124" fill={`${C}45`} fontSize="9" fontFamily="monospace" textAnchor="middle">break → exit loop</text>
      <text x="644" y="196" fill={`${C}35`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">works in all loop types</text>
    </svg>
  )
}
