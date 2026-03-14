export default function TypeScriptBanner() {
  const C = '#3b82f6'
  const RED = '#f87171'
  const GREEN = '#4ade80'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-ts" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-ts" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-ts)" />
      <rect width="780" height="220" fill="url(#glow-ts)" />

      {/* Center TS badge */}
      <rect x="352" y="8" width="76" height="28" rx="6" fill={C} />
      <text x="390" y="27" fill="white" fontSize="13" fontFamily="monospace" textAnchor="middle" fontWeight="800">TS</text>

      {/* Vertical divider */}
      <line x1="390" y1="42" x2="390" y2="145" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />

      {/* === LEFT: JavaScript (no types) === */}
      <text x="195" y="58" fill="rgba(255,255,255,0.30)" fontSize="10" fontFamily="monospace" textAnchor="middle">JavaScript</text>

      {/* function code block */}
      <rect x="40" y="66" width="330" height="70" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <text x="56" y="86" fill="rgba(167,139,250,0.7)" fontSize="11" fontFamily="monospace">function</text>
      <text x="136" y="86" fill="rgba(255,255,255,0.7)" fontSize="11" fontFamily="monospace">add(</text>
      <text x="174" y="86" fill="rgba(255,255,255,0.85)" fontSize="11" fontFamily="monospace">a</text>
      <text x="182" y="86" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="monospace">,</text>
      <text x="192" y="86" fill="rgba(255,255,255,0.85)" fontSize="11" fontFamily="monospace">b</text>
      <text x="200" y="86" fill="rgba(255,255,255,0.7)" fontSize="11" fontFamily="monospace">) {'{'}</text>
      <text x="70" y="106" fill="rgba(167,139,250,0.5)" fontSize="11" fontFamily="monospace">return</text>
      <text x="120" y="106" fill="rgba(255,255,255,0.6)" fontSize="11" fontFamily="monospace">a + b</text>
      <text x="56" y="126" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="monospace">{'}'}</text>

      {/* Red wavy underlines under a and b */}
      {/* wavy under "a" at x=174, y=86 */}
      <path d="M174,90 Q176,93 178,90 Q180,87 182,90" fill="none" stroke={RED} strokeWidth="1.2" strokeLinecap="round" />
      {/* wavy under "b" at x=192, y=86 */}
      <path d="M192,90 Q194,93 196,90 Q198,87 200,90" fill="none" stroke={RED} strokeWidth="1.2" strokeLinecap="round" />

      {/* implicit any labels */}
      <text x="174" y="103" fill={`${RED}70`} fontSize="8" fontFamily="monospace">any</text>
      <text x="192" y="103" fill={`${RED}70`} fontSize="8" fontFamily="monospace">any</text>

      {/* === RIGHT: TypeScript (with types) === */}
      <text x="585" y="58" fill="rgba(255,255,255,0.30)" fontSize="10" fontFamily="monospace" textAnchor="middle">TypeScript</text>

      {/* function code block */}
      <rect x="408" y="66" width="334" height="70" rx="6" fill="rgba(255,255,255,0.02)" stroke={`${C}20`} strokeWidth="1" />
      <text x="422" y="86" fill="rgba(167,139,250,0.7)" fontSize="11" fontFamily="monospace">function</text>
      <text x="502" y="86" fill="rgba(255,255,255,0.7)" fontSize="11" fontFamily="monospace">add(</text>
      <text x="538" y="86" fill="rgba(255,255,255,0.85)" fontSize="11" fontFamily="monospace">a</text>
      <text x="546" y="86" fill={`${C}cc`} fontSize="11" fontFamily="monospace">: number</text>
      <text x="612" y="86" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="monospace">,</text>
      <text x="420" y="104" fill="rgba(255,255,255,0.85)" fontSize="11" fontFamily="monospace">b</text>
      <text x="428" y="104" fill={`${C}cc`} fontSize="11" fontFamily="monospace">: number</text>
      <text x="494" y="104" fill="rgba(255,255,255,0.7)" fontSize="11" fontFamily="monospace">)</text>
      <text x="504" y="104" fill={`${C}80`} fontSize="11" fontFamily="monospace">: number</text>
      <text x="564" y="104" fill="rgba(255,255,255,0.7)" fontSize="11" fontFamily="monospace">{'{'}</text>
      <text x="436" y="122" fill="rgba(167,139,250,0.5)" fontSize="11" fontFamily="monospace">return</text>
      <text x="486" y="122" fill="rgba(255,255,255,0.6)" fontSize="11" fontFamily="monospace">a + b</text>
      <text x="422" y="140" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="monospace">{'}'}</text>

      {/* Green checkmarks next to typed params */}
      <circle cx="624" cy="82" r="7" fill={`${GREEN}18`} stroke={`${GREEN}60`} strokeWidth="1" />
      <path d="M620,82 L623,85 L628,79" fill="none" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="582" cy="100" r="7" fill={`${GREEN}18`} stroke={`${GREEN}60`} strokeWidth="1" />
      <path d="M578,100 L581,103 L586,97" fill="none" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Error message box */}
      <rect x="40" y="154" width="700" height="28" rx="5" fill="rgba(239,68,68,0.07)" stroke="rgba(239,68,68,0.25)" strokeWidth="1" />
      <text x="56" y="164" fill={RED} fontSize="9" fontFamily="monospace">TS2345</text>
      <text x="100" y="164" fill="rgba(239,68,68,0.70)" fontSize="9" fontFamily="monospace">Argument of type 'string' is not assignable to parameter of type 'number'</text>
      <rect x="40" y="154" width="8" height="28" rx="2" fill={RED} />

      {/* Bottom labels */}
      <text x="195" y="200" fill="rgba(255,255,255,0.20)" fontSize="9" fontFamily="monospace" textAnchor="middle">implicit any — no type safety</text>
      <text x="585" y="200" fill={`${C}45`} fontSize="9" fontFamily="monospace" textAnchor="middle">explicit types — compile-time checks</text>
    </svg>
  )
}
