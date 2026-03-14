export default function VariablesBanner() {
  const ORANGE = '#fb923c', BLUE = '#60a5fa', PURPLE = '#a78bfa'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-vr" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${ORANGE}15`} />
        </pattern>
        <radialGradient id="glow-vr" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={ORANGE} stopOpacity="0.05" />
          <stop offset="100%" stopColor={ORANGE} stopOpacity="0" />
        </radialGradient>
        <pattern id="hatch-vr" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(239,68,68,0.35)" strokeWidth="2" />
        </pattern>
      </defs>
      <rect width="780" height="220" fill="url(#dots-vr)" />
      <rect width="780" height="220" fill="url(#glow-vr)" />

      {/* === VAR column === */}
      {/* function scope container */}
      <rect x="28" y="22" width="220" height="174" rx="8" fill={`${ORANGE}05`} stroke={`${ORANGE}30`} strokeWidth="1.5" />
      <text x="138" y="40" fill={`${ORANGE}70`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="700">var</text>
      <text x="138" y="54" fill={`${ORANGE}45`} fontSize="9" fontFamily="monospace" textAnchor="middle">function foo() {'{ }'}</text>

      {/* hoisting ghost at top */}
      <rect x="54" y="62" width="140" height="24" rx="4" fill={`${ORANGE}06`} stroke={`${ORANGE}18`} strokeWidth="1" strokeDasharray="3 2" />
      <text x="124" y="79" fill={`${ORANGE}30`} fontSize="9.5" fontFamily="monospace" textAnchor="middle">var x → undefined</text>
      <text x="124" y="92" fill={`${ORANGE}25`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">↑ hoisted</text>

      {/* actual var x box */}
      <rect x="54" y="110" width="140" height="28" rx="4" fill={`${ORANGE}18`} stroke={`${ORANGE}50`} strokeWidth="1.2" />
      <text x="124" y="129" fill={`${ORANGE}ee`} fontSize="10.5" fontFamily="monospace" textAnchor="middle">var x = 5</text>

      <text x="138" y="180" fill={`${ORANGE}40`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">function scope</text>
      <text x="138" y="192" fill={`${ORANGE}35`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">+ hoisting</text>

      {/* === LET column === */}
      {/* block scope container */}
      <rect x="280" y="22" width="220" height="174" rx="8" fill={`${BLUE}04`} stroke={`${BLUE}25`} strokeWidth="1.5" />
      <text x="390" y="40" fill={`${BLUE}70`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="700">let</text>

      {/* block braces */}
      <rect x="310" y="50" width="160" height="110" rx="6" fill={`${BLUE}06`} stroke={`${BLUE}28`} strokeWidth="1" strokeDasharray="4 2" />
      <text x="320" y="66" fill={`${BLUE}50`} fontSize="10" fontFamily="monospace">{'{'}</text>
      <text x="340" y="66" fill={`${BLUE}35`} fontSize="9" fontFamily="monospace">block</text>
      <text x="456" y="150" fill={`${BLUE}50`} fontSize="10" fontFamily="monospace">{'}'}</text>

      {/* TDZ zone */}
      <rect x="322" y="72" width="136" height="22" rx="3" fill="url(#hatch-vr)" stroke="rgba(239,68,68,0.3)" strokeWidth="1" />
      <text x="390" y="87" fill="rgba(239,68,68,0.6)" fontSize="8.5" fontFamily="monospace" textAnchor="middle">TDZ (temporal dead zone)</text>

      {/* let y box */}
      <rect x="322" y="100" width="136" height="28" rx="4" fill={`${BLUE}18`} stroke={`${BLUE}50`} strokeWidth="1.2" />
      <text x="390" y="119" fill={`${BLUE}ee`} fontSize="10.5" fontFamily="monospace" textAnchor="middle">let y = 10</text>

      <text x="390" y="180" fill={`${BLUE}40`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">block scope</text>
      <text x="390" y="192" fill={`${BLUE}35`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">no hoisting</text>

      {/* === CONST column === */}
      <rect x="532" y="22" width="220" height="174" rx="8" fill={`${PURPLE}04`} stroke={`${PURPLE}25`} strokeWidth="1.5" />
      <text x="642" y="40" fill={`${PURPLE}70`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="700">const</text>

      {/* block braces */}
      <rect x="562" y="50" width="160" height="110" rx="6" fill={`${PURPLE}05`} stroke={`${PURPLE}22`} strokeWidth="1" strokeDasharray="4 2" />
      <text x="572" y="66" fill={`${PURPLE}50`} fontSize="10" fontFamily="monospace">{'{'}</text>
      <text x="592" y="66" fill={`${PURPLE}35`} fontSize="9" fontFamily="monospace">block</text>
      <text x="708" y="150" fill={`${PURPLE}50`} fontSize="10" fontFamily="monospace">{'}'}</text>

      {/* const z box */}
      <rect x="574" y="86" width="136" height="28" rx="4" fill={`${PURPLE}18`} stroke={`${PURPLE}50`} strokeWidth="1.2" />
      <text x="642" y="105" fill={`${PURPLE}ee`} fontSize="10.5" fontFamily="monospace" textAnchor="middle">const z = 99</text>

      {/* Lock icon: body rect + shackle arc */}
      <rect x="622" y="124" width="16" height="12" rx="2" fill={`${PURPLE}30`} stroke={`${PURPLE}80`} strokeWidth="1" />
      <path d="M625,124 A5,5 0 0,1 635,124" fill="none" stroke={`${PURPLE}80`} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="630" cy="130" r="1.5" fill={`${PURPLE}cc`} />

      <text x="660" y="134" fill={`${PURPLE}50`} fontSize="8.5" fontFamily="monospace">immutable</text>
      <text x="660" y="146" fill={`${PURPLE}40`} fontSize="8.5" fontFamily="monospace">binding</text>

      <text x="642" y="180" fill={`${PURPLE}40`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">block scope</text>
      <text x="642" y="192" fill={`${PURPLE}35`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">immutable binding</text>
    </svg>
  )
}
