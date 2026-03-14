export default function StateBanner() {
  const C = '#61dafb'
  const GREEN = '#4ade80'
  const AMBER = '#f59e0b'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-st" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-st" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
        <marker id="arr-st" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="rgba(255,255,255,0.3)" />
        </marker>
      </defs>
      <rect width="780" height="220" fill="url(#dots-st)" />
      <rect width="780" height="220" fill="url(#glow-st)" />

      {/* ── LEFT: useState anatomy ── */}
      <text x="160" y="22" fill={`${C}55`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="600">useState hook</text>

      {/* Full line */}
      <text x="44" y="50" fill="rgba(255,255,255,0.35)" fontSize="10.5" fontFamily="monospace">const [</text>
      <text x="92" y="50" fill={C} fontSize="10.5" fontFamily="monospace" fontWeight="700">count</text>
      <text x="132" y="50" fill="rgba(255,255,255,0.35)" fontSize="10.5" fontFamily="monospace">, </text>
      <text x="143" y="50" fill={GREEN} fontSize="10.5" fontFamily="monospace" fontWeight="700">setCount</text>
      <text x="203" y="50" fill="rgba(255,255,255,0.35)" fontSize="10.5" fontFamily="monospace">] = useState(</text>
      <text x="284" y="50" fill={AMBER} fontSize="10.5" fontFamily="monospace" fontWeight="700">0</text>
      <text x="291" y="50" fill="rgba(255,255,255,0.35)" fontSize="10.5" fontFamily="monospace">)</text>

      {/* Underline: count */}
      <line x1="92" y1="52" x2="130" y2="52" stroke={C} strokeWidth="1.5" />
      {/* Underline: setCount */}
      <line x1="143" y1="52" x2="201" y2="52" stroke={GREEN} strokeWidth="1.5" />
      {/* Underline: 0 */}
      <line x1="284" y1="52" x2="291" y2="52" stroke={AMBER} strokeWidth="1.5" />

      {/* Labels */}
      <line x1="111" y1="55" x2="111" y2="74" stroke={`${C}55`} strokeWidth="1" />
      <text x="111" y="84" fill={C} fontSize="9" fontFamily="monospace" textAnchor="middle">state value</text>

      <line x1="172" y1="55" x2="172" y2="74" stroke={`${GREEN}55`} strokeWidth="1" />
      <text x="172" y="84" fill={GREEN} fontSize="9" fontFamily="monospace" textAnchor="middle">setter fn</text>

      <line x1="287" y1="55" x2="287" y2="74" stroke={`${AMBER}55`} strokeWidth="1" />
      <text x="287" y="84" fill={AMBER} fontSize="9" fontFamily="monospace" textAnchor="middle">initial</text>

      {/* Separator */}
      <line x1="305" y1="12" x2="305" y2="208" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />

      {/* ── CENTER: State value box ── */}
      <text x="390" y="22" fill={`${C}55`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="600">current state</text>
      <rect x="320" y="34" width="140" height="64" rx="8" fill={`${C}12`} stroke={C} strokeWidth="2" />
      <text x="390" y="58" fill={`${C}77`} fontSize="10" fontFamily="monospace" textAnchor="middle">count</text>
      <text x="390" y="85" fill={C} fontSize="28" fontFamily="monospace" textAnchor="middle" fontWeight="700">3</text>

      {/* Separator */}
      <line x1="475" y1="12" x2="475" y2="208" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />

      {/* ── RIGHT: Re-render cycle ── */}
      <text x="620" y="22" fill={`${C}55`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="600">re-render cycle</text>

      {/* Component box */}
      <rect x="555" y="34" width="130" height="46" rx="6" fill={`${C}10`} stroke={`${C}55`} strokeWidth="1.5" />
      <text x="620" y="54" fill={`${C}cc`} fontSize="10" fontFamily="monospace" textAnchor="middle">&lt;Counter&gt;</text>
      <text x="620" y="70" fill={`${C}77`} fontSize="9" fontFamily="monospace" textAnchor="middle">component</text>

      {/* Circular re-render arrow around component */}
      <path d="M685,57 A68,36 0 1,0 685,57.1" fill="none" stroke={`${C}44`} strokeWidth="1.5" strokeDasharray="5 3" />
      <polygon points="685,44 692,57 678,57" fill={`${C}66`} />
      <text x="730" y="61" fill={`${C}55`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">re-render</text>

      {/* Flow: setCount call → state update → new render */}
      <rect x="500" y="108" width="240" height="22" rx="4" fill={`${AMBER}10`} stroke={`${AMBER}44`} strokeWidth="1" />
      <text x="620" y="124" fill={`${AMBER}cc`} fontSize="9.5" fontFamily="monospace" textAnchor="middle">setCount(count + 1)</text>

      <line x1="620" y1="130" x2="620" y2="143" stroke="rgba(255,255,255,0.2)" strokeWidth="1" markerEnd="url(#arr-st)" />

      <rect x="500" y="144" width="240" height="22" rx="4" fill={`${GREEN}0a`} stroke={`${GREEN}33`} strokeWidth="1" />
      <text x="620" y="160" fill={`${GREEN}bb`} fontSize="9.5" fontFamily="monospace" textAnchor="middle">state updates → schedules render</text>

      <line x1="620" y1="166" x2="620" y2="179" stroke="rgba(255,255,255,0.2)" strokeWidth="1" markerEnd="url(#arr-st)" />

      <rect x="500" y="180" width="240" height="22" rx="4" fill={`${C}0a`} stroke={`${C}33`} strokeWidth="1" />
      <text x="620" y="196" fill={`${C}bb`} fontSize="9.5" fontFamily="monospace" textAnchor="middle">new render with count = 4</text>

      {/* Left side lower: show usage context */}
      <text x="44" y="118" fill="rgba(255,255,255,0.25)" fontSize="9.5" fontFamily="monospace">// reading state</text>
      <text x="44" y="134" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="monospace">&lt;p&gt;</text>
      <text x="62" y="134" fill={C} fontSize="10" fontFamily="monospace">&#123;count&#125;</text>
      <text x="98" y="134" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="monospace">&lt;/p&gt;</text>

      <text x="44" y="156" fill="rgba(255,255,255,0.25)" fontSize="9.5" fontFamily="monospace">// updating state</text>
      <text x="44" y="172" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="monospace">onClick=&#123;() =&gt;</text>
      <text x="44" y="188" fill={GREEN} fontSize="10" fontFamily="monospace">  setCount</text>
      <text x="104" y="188" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="monospace">(c + 1)&#125;</text>
    </svg>
  )
}
