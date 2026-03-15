export default function TailwindBanner() {
  const CYAN = '#06b6d4'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-tw" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${CYAN}15`} />
        </pattern>
        <radialGradient id="glow-tw" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={CYAN} stopOpacity="0.05" />
          <stop offset="100%" stopColor={CYAN} stopOpacity="0" />
        </radialGradient>
        <marker id="arr-tw" markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto">
          <polygon points="0 0, 7 3.5, 0 7" fill={`${CYAN}90`} />
        </marker>
      </defs>
      <rect width="780" height="220" fill="url(#dots-tw)" />
      <rect width="780" height="220" fill="url(#glow-tw)" />

      {/* === Left: HTML element === */}
      <text x="130" y="18" fill={`${CYAN}70`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="700">HTML element</text>
      <rect x="18" y="24" width="224" height="44" rx="6" fill={`${CYAN}08`} stroke={`${CYAN}35`} strokeWidth="1.3" />
      <text x="28" y="40" fill={`${CYAN}50`} fontSize="8.5" fontFamily="monospace">{'<div class="'}</text>
      <text x="28" y="54" fill={`${CYAN}ee`} fontSize="8.5" fontFamily="monospace">  flex p-4 bg-white</text>
      <text x="28" y="68" fill={`${CYAN}ee`} fontSize="8.5" fontFamily="monospace">  rounded-lg shadow{'">'}</text>

      {/* Arrows from element box to utility pills */}
      <line x1="242" y1="40" x2="310" y2="60" stroke={`${CYAN}35`} strokeWidth="1" markerEnd="url(#arr-tw)" />
      <line x1="242" y1="46" x2="310" y2="92" stroke={`${CYAN}35`} strokeWidth="1" markerEnd="url(#arr-tw)" />
      <line x1="242" y1="46" x2="310" y2="122" stroke={`${CYAN}35`} strokeWidth="1" markerEnd="url(#arr-tw)" />
      <line x1="242" y1="52" x2="310" y2="152" stroke={`${CYAN}35`} strokeWidth="1" markerEnd="url(#arr-tw)" />
      <line x1="242" y1="58" x2="310" y2="182" stroke={`${CYAN}35`} strokeWidth="1" markerEnd="url(#arr-tw)" />

      {/* === Center: Exploded utility pills === */}
      <text x="430" y="18" fill={`${CYAN}70`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="700">utility classes</text>

      {/* flex */}
      <rect x="310" y="48" width="54" height="22" rx="4" fill={`${CYAN}20`} stroke={`${CYAN}60`} strokeWidth="1.2" />
      <text x="337" y="63" fill={`${CYAN}ee`} fontSize="9.5" fontFamily="monospace" textAnchor="middle" fontWeight="700">flex</text>
      <text x="374" y="63" fill={`${CYAN}70`} fontSize="8.5" fontFamily="monospace">display: flex</text>

      {/* p-4 */}
      <rect x="310" y="80" width="54" height="22" rx="4" fill={`${CYAN}18`} stroke={`${CYAN}50`} strokeWidth="1.2" />
      <text x="337" y="95" fill={`${CYAN}ee`} fontSize="9.5" fontFamily="monospace" textAnchor="middle" fontWeight="700">p-4</text>
      <text x="374" y="95" fill={`${CYAN}70`} fontSize="8.5" fontFamily="monospace">padding: 1rem</text>

      {/* bg-white */}
      <rect x="310" y="112" width="64" height="22" rx="4" fill={`${CYAN}15`} stroke={`${CYAN}45`} strokeWidth="1.2" />
      <text x="342" y="127" fill={`${CYAN}ee`} fontSize="9.5" fontFamily="monospace" textAnchor="middle" fontWeight="700">bg-white</text>
      <text x="384" y="127" fill={`${CYAN}70`} fontSize="8.5" fontFamily="monospace">background: #fff</text>

      {/* rounded-lg */}
      <rect x="310" y="144" width="82" height="22" rx="4" fill={`${CYAN}12`} stroke={`${CYAN}40`} strokeWidth="1.2" />
      <text x="351" y="159" fill={`${CYAN}ee`} fontSize="9.5" fontFamily="monospace" textAnchor="middle" fontWeight="700">rounded-lg</text>
      <text x="402" y="159" fill={`${CYAN}70`} fontSize="8.5" fontFamily="monospace">border-radius: 8px</text>

      {/* shadow */}
      <rect x="310" y="176" width="64" height="22" rx="4" fill={`${CYAN}10`} stroke={`${CYAN}38`} strokeWidth="1.2" />
      <text x="342" y="191" fill={`${CYAN}ee`} fontSize="9.5" fontFamily="monospace" textAnchor="middle" fontWeight="700">shadow</text>
      <text x="384" y="191" fill={`${CYAN}70`} fontSize="8.5" fontFamily="monospace">box-shadow: 0 1px 3px …</text>

      {/* === Right: Rendered result === */}
      <text x="672" y="18" fill={`${CYAN}70`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="700">visual result</text>

      {/* shadow offset rect */}
      <rect x="589" y="72" width="166" height="100" rx="8" fill="none" stroke={`${CYAN}15`} strokeWidth="6" />
      {/* card body */}
      <rect x="584" y="68" width="166" height="100" rx="8" fill="#1e293b" stroke={`${CYAN}50`} strokeWidth="1.5" />
      <text x="667" y="104" fill={`${CYAN}cc`} fontSize="10" fontFamily="monospace" textAnchor="middle">flex layout</text>
      <text x="667" y="120" fill={`${CYAN}80`} fontSize="9" fontFamily="monospace" textAnchor="middle">padded · white bg</text>
      <text x="667" y="136" fill={`${CYAN}60`} fontSize="9" fontFamily="monospace" textAnchor="middle">rounded · shadow</text>

      {/* Bottom label */}
      <text x="390" y="214" fill={`${CYAN}30`} fontSize="9" fontFamily="monospace" textAnchor="middle">Utility-first CSS — compose styles directly in HTML</text>
    </svg>
  )
}
