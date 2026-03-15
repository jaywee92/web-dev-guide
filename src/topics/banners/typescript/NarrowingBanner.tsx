export default function NarrowingBanner() {
  const PURPLE = '#818cf8'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-nr" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${PURPLE}15`} />
        </pattern>
        <radialGradient id="glow-nr" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={PURPLE} stopOpacity="0.05" />
          <stop offset="100%" stopColor={PURPLE} stopOpacity="0" />
        </radialGradient>
        <marker id="arrow-nr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill={`${PURPLE}80`} />
        </marker>
      </defs>
      <rect width="780" height="220" fill="url(#dots-nr)" />
      <rect width="780" height="220" fill="url(#glow-nr)" />

      {/* header label */}
      <text x="390" y="20" fill={`${PURPLE}55`} fontSize="9" fontFamily="monospace" textAnchor="middle">type narrowing — TypeScript</text>

      {/* === typeof column === */}
      <rect x="22" y="30" width="226" height="174" rx="7" fill={`${PURPLE}05`} stroke={`${PURPLE}28`} strokeWidth="1.5" />
      <text x="135" y="48" fill={`${PURPLE}80`} fontSize="9.5" fontFamily="monospace" textAnchor="middle" fontWeight="700">typeof</text>
      <rect x="36" y="56" width="198" height="34" rx="5" fill={`${PURPLE}0e`} stroke={`${PURPLE}35`} strokeWidth="1" />
      <text x="46" y="70" fill={`${PURPLE}cc`} fontSize="9" fontFamily="monospace">if (typeof x ===</text>
      <text x="170" y="70" fill="#34d399" fontSize="9" fontFamily="monospace">'string'</text>
      <text x="46" y="84" fill={`${PURPLE}aa`} fontSize="9" fontFamily="monospace">{')'} {'{'} /* x: string */ {'}'}</text>
      <line x1="135" y1="92" x2="135" y2="110" stroke={`${PURPLE}50`} strokeWidth="1.2" markerEnd="url(#arrow-nr)" />
      <rect x="60" y="112" width="150" height="26" rx="4" fill={`${PURPLE}15`} stroke={`${PURPLE}55`} strokeWidth="1.2" />
      <text x="135" y="130" fill={`${PURPLE}ee`} fontSize="9.5" fontFamily="monospace" textAnchor="middle">x: string ✓</text>
      <text x="135" y="178" fill={`${PURPLE}40`} fontSize="8" fontFamily="monospace" textAnchor="middle">primitives: string | number</text>
      <text x="135" y="191" fill={`${PURPLE}35`} fontSize="8" fontFamily="monospace" textAnchor="middle">boolean | symbol | undefined</text>

      {/* === instanceof column === */}
      <rect x="277" y="30" width="226" height="174" rx="7" fill={`${PURPLE}05`} stroke={`${PURPLE}28`} strokeWidth="1.5" />
      <text x="390" y="48" fill={`${PURPLE}80`} fontSize="9.5" fontFamily="monospace" textAnchor="middle" fontWeight="700">instanceof</text>
      <rect x="291" y="56" width="198" height="34" rx="5" fill={`${PURPLE}0e`} stroke={`${PURPLE}35`} strokeWidth="1" />
      <text x="301" y="70" fill={`${PURPLE}cc`} fontSize="9" fontFamily="monospace">if (x instanceof</text>
      <text x="301" y="84" fill="#34d399" fontSize="9" fontFamily="monospace">    Error) {'{ /* x: Error */ }'}</text>
      <line x1="390" y1="92" x2="390" y2="110" stroke={`${PURPLE}50`} strokeWidth="1.2" markerEnd="url(#arrow-nr)" />
      <rect x="315" y="112" width="150" height="26" rx="4" fill={`${PURPLE}15`} stroke={`${PURPLE}55`} strokeWidth="1.2" />
      <text x="390" y="130" fill={`${PURPLE}ee`} fontSize="9.5" fontFamily="monospace" textAnchor="middle">x: Error ✓</text>
      <text x="390" y="178" fill={`${PURPLE}40`} fontSize="8" fontFamily="monospace" textAnchor="middle">class instances:</text>
      <text x="390" y="191" fill={`${PURPLE}35`} fontSize="8" fontFamily="monospace" textAnchor="middle">Date · Error · Map · Set</text>

      {/* === in column === */}
      <rect x="532" y="30" width="226" height="174" rx="7" fill={`${PURPLE}05`} stroke={`${PURPLE}28`} strokeWidth="1.5" />
      <text x="645" y="48" fill={`${PURPLE}80`} fontSize="9.5" fontFamily="monospace" textAnchor="middle" fontWeight="700">in</text>
      <rect x="546" y="56" width="198" height="34" rx="5" fill={`${PURPLE}0e`} stroke={`${PURPLE}35`} strokeWidth="1" />
      <text x="556" y="70" fill={`${PURPLE}cc`} fontSize="9" fontFamily="monospace">if (</text>
      <text x="575" y="70" fill="#34d399" fontSize="9" fontFamily="monospace">'fly'</text>
      <text x="608" y="70" fill={`${PURPLE}cc`} fontSize="9" fontFamily="monospace">in obj) {'{'}</text>
      <text x="556" y="84" fill={`${PURPLE}aa`} fontSize="9" fontFamily="monospace">  /* obj: Bird */ {'}'}</text>
      <line x1="645" y1="92" x2="645" y2="110" stroke={`${PURPLE}50`} strokeWidth="1.2" markerEnd="url(#arrow-nr)" />
      <rect x="570" y="112" width="150" height="26" rx="4" fill={`${PURPLE}15`} stroke={`${PURPLE}55`} strokeWidth="1.2" />
      <text x="645" y="130" fill={`${PURPLE}ee`} fontSize="9.5" fontFamily="monospace" textAnchor="middle">obj: Bird ✓</text>
      <text x="645" y="178" fill={`${PURPLE}40`} fontSize="8" fontFamily="monospace" textAnchor="middle">discriminated unions</text>
      <text x="645" y="191" fill={`${PURPLE}35`} fontSize="8" fontFamily="monospace" textAnchor="middle">shape / property checks</text>
    </svg>
  )
}
