export default function FunctionsBanner() {
  const C = '#fbbf24'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-fn" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-fn" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-fn)" />
      <rect width="780" height="220" fill="url(#glow-fn)" />

      {/* === Panel 1: Function declaration === */}
      <rect x="22" y="20" width="228" height="180" rx="8" fill={`${C}05`} stroke={`${C}30`} strokeWidth="1.5" />
      <text x="136" y="38" fill={`${C}80`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="700">declaration</text>
      <rect x="36" y="48" width="200" height="72" rx="5" fill={`${C}10`} stroke={`${C}35`} strokeWidth="1" />
      <text x="136" y="66" fill={`${C}dd`} fontSize="9.5" fontFamily="monospace" textAnchor="middle">{'function greet(name) {'}</text>
      <text x="136" y="82" fill={`${C}aa`} fontSize="9.5" fontFamily="monospace" textAnchor="middle">{'  return "hi, " + name'}</text>
      <text x="136" y="98" fill={`${C}dd`} fontSize="9.5" fontFamily="monospace" textAnchor="middle">{'}'}</text>
      <text x="136" y="144" fill={`${C}50`} fontSize="9" fontFamily="monospace" textAnchor="middle">↑ hoisted to top</text>
      <text x="136" y="158" fill={`${C}35`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">callable before definition</text>
      <text x="136" y="190" fill={`${C}40`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">function scope</text>

      {/* === Panel 2: Arrow function === */}
      <rect x="276" y="20" width="228" height="180" rx="8" fill={`${C}04`} stroke={`${C}28`} strokeWidth="1.5" />
      <text x="390" y="38" fill={`${C}80`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="700">arrow function</text>
      <rect x="290" y="48" width="200" height="52" rx="5" fill={`${C}10`} stroke={`${C}35`} strokeWidth="1" />
      <text x="390" y="68" fill={`${C}dd`} fontSize="9.5" fontFamily="monospace" textAnchor="middle">{'const double = n => n * 2'}</text>
      <text x="390" y="84" fill={`${C}70`} fontSize="9" fontFamily="monospace" textAnchor="middle">{'// double(4) → 8'}</text>
      <rect x="290" y="112" width="200" height="44" rx="5" fill={`${C}08`} stroke={`${C}22`} strokeWidth="1" />
      <text x="390" y="129" fill={`${C}bb`} fontSize="9" fontFamily="monospace" textAnchor="middle">{'const add = (a, b) => {'}</text>
      <text x="390" y="145" fill={`${C}bb`} fontSize="9" fontFamily="monospace" textAnchor="middle">{'  return a + b'}</text>
      <text x="390" y="168" fill={`${C}40`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">lexical this · no hoisting</text>
      <text x="390" y="190" fill={`${C}35`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">concise body or block body</text>

      {/* === Panel 3: Scope chain === */}
      <rect x="530" y="20" width="228" height="180" rx="8" fill={`${C}04`} stroke={`${C}25`} strokeWidth="1.5" />
      <text x="644" y="38" fill={`${C}80`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="700">scope chain</text>
      {/* global */}
      <rect x="544" y="46" width="200" height="142" rx="6" fill={`${C}05`} stroke={`${C}20`} strokeWidth="1" strokeDasharray="4 2" />
      <text x="554" y="62" fill={`${C}45`} fontSize="8.5" fontFamily="monospace">global</text>
      <text x="660" y="62" fill={`${C}60`} fontSize="8.5" fontFamily="monospace">x = 1</text>
      {/* function */}
      <rect x="558" y="68" width="172" height="98" rx="5" fill={`${C}07`} stroke={`${C}28`} strokeWidth="1" strokeDasharray="3 2" />
      <text x="568" y="84" fill={`${C}55`} fontSize="8.5" fontFamily="monospace">function</text>
      <text x="672" y="84" fill={`${C}60`} fontSize="8.5" fontFamily="monospace">y = 2</text>
      {/* block */}
      <rect x="572" y="90" width="144" height="66" rx="4" fill={`${C}09`} stroke={`${C}30`} strokeWidth="1" strokeDasharray="3 2" />
      <text x="582" y="106" fill={`${C}65`} fontSize="8.5" fontFamily="monospace">block {'{ }'}</text>
      <text x="672" y="106" fill={`${C}70`} fontSize="8.5" fontFamily="monospace">z = 3</text>
      <text x="644" y="136" fill={`${C}aa`} fontSize="9" fontFamily="monospace" textAnchor="middle">let / const</text>
      <text x="644" y="150" fill={`${C}70`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">block-scoped here</text>
      <text x="644" y="190" fill={`${C}40`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">inner reads outer</text>
    </svg>
  )
}
