export default function UtilityTypesBanner() {
  const PURPLE = '#818cf8'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-ut" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${PURPLE}15`} />
        </pattern>
        <radialGradient id="glow-ut" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={PURPLE} stopOpacity="0.05" />
          <stop offset="100%" stopColor={PURPLE} stopOpacity="0" />
        </radialGradient>
        <marker id="arrow-ut" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill={`${PURPLE}80`} />
        </marker>
      </defs>
      <rect width="780" height="220" fill="url(#dots-ut)" />
      <rect width="780" height="220" fill="url(#glow-ut)" />

      {/* header */}
      <text x="390" y="18" fill={`${PURPLE}55`} fontSize="9" fontFamily="monospace" textAnchor="middle">utility types — TypeScript</text>

      {/* === Row 1: Partial === */}
      {/* source */}
      <rect x="16" y="26" width="90" height="44" rx="5" fill={`${PURPLE}08`} stroke={`${PURPLE}30`} strokeWidth="1.2" />
      <text x="61" y="42" fill={`${PURPLE}cc`} fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="700">User</text>
      <text x="24" y="56" fill={`${PURPLE}80`} fontSize="8" fontFamily="monospace">name: string</text>
      <text x="24" y="66" fill={`${PURPLE}80`} fontSize="8" fontFamily="monospace">age: number</text>
      {/* arrow + label */}
      <line x1="107" y1="48" x2="158" y2="48" stroke={`${PURPLE}60`} strokeWidth="1.2" markerEnd="url(#arrow-ut)" />
      <text x="133" y="44" fill={`${PURPLE}99`} fontSize="8" fontFamily="monospace" textAnchor="middle">Partial</text>
      <text x="133" y="59" fill={`${PURPLE}55`} fontSize="7.5" fontFamily="monospace" textAnchor="middle">{'<User>'}</text>
      {/* result */}
      <rect x="160" y="26" width="110" height="44" rx="5" fill={`${PURPLE}10`} stroke={`${PURPLE}45`} strokeWidth="1.2" />
      <text x="215" y="42" fill={`${PURPLE}dd`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">Partial&lt;User&gt;</text>
      <text x="168" y="56" fill={`${PURPLE}99`} fontSize="8" fontFamily="monospace">name?: string</text>
      <text x="168" y="66" fill={`${PURPLE}99`} fontSize="8" fontFamily="monospace">age?: number</text>

      {/* === Row 2: Readonly === */}
      <rect x="16" y="82" width="90" height="44" rx="5" fill={`${PURPLE}08`} stroke={`${PURPLE}30`} strokeWidth="1.2" />
      <text x="61" y="98" fill={`${PURPLE}cc`} fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="700">User</text>
      <text x="24" y="112" fill={`${PURPLE}80`} fontSize="8" fontFamily="monospace">name: string</text>
      <text x="24" y="122" fill={`${PURPLE}80`} fontSize="8" fontFamily="monospace">age: number</text>
      <line x1="107" y1="104" x2="158" y2="104" stroke={`${PURPLE}60`} strokeWidth="1.2" markerEnd="url(#arrow-ut)" />
      <text x="133" y="100" fill={`${PURPLE}99`} fontSize="8" fontFamily="monospace" textAnchor="middle">Readonly</text>
      <text x="133" y="115" fill={`${PURPLE}55`} fontSize="7.5" fontFamily="monospace" textAnchor="middle">{'<User>'}</text>
      <rect x="160" y="82" width="110" height="44" rx="5" fill={`${PURPLE}10`} stroke={`${PURPLE}45`} strokeWidth="1.2" />
      <text x="215" y="98" fill={`${PURPLE}dd`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">Readonly&lt;User&gt;</text>
      {/* lock icon */}
      <rect x="168" y="104" width="10" height="8" rx="1.5" fill={`${PURPLE}30`} stroke={`${PURPLE}80`} strokeWidth="1" />
      <path d="M170,104 A3,3 0 0,1 176,104" fill="none" stroke={`${PURPLE}80`} strokeWidth="1.2" strokeLinecap="round" />
      <text x="182" y="112" fill={`${PURPLE}99`} fontSize="8" fontFamily="monospace">immutable fields</text>

      {/* === Row 3: Record === */}
      <rect x="16" y="138" width="90" height="44" rx="5" fill={`${PURPLE}08`} stroke={`${PURPLE}30`} strokeWidth="1.2" />
      <text x="61" y="154" fill={`${PURPLE}cc`} fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="700">string[]</text>
      <text x="24" y="168" fill={`${PURPLE}80`} fontSize="8" fontFamily="monospace">['a', 'b', 'c']</text>
      <text x="24" y="178" fill={`${PURPLE}60`} fontSize="7.5" fontFamily="monospace">keys</text>
      <line x1="107" y1="160" x2="158" y2="160" stroke={`${PURPLE}60`} strokeWidth="1.2" markerEnd="url(#arrow-ut)" />
      <text x="133" y="156" fill={`${PURPLE}99`} fontSize="8" fontFamily="monospace" textAnchor="middle">Record</text>
      <text x="133" y="171" fill={`${PURPLE}55`} fontSize="7.5" fontFamily="monospace" textAnchor="middle">{'<K, V>'}</text>
      <rect x="160" y="138" width="110" height="44" rx="5" fill={`${PURPLE}10`} stroke={`${PURPLE}45`} strokeWidth="1.2" />
      <text x="215" y="154" fill={`${PURPLE}dd`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">Record&lt;K, V&gt;</text>
      <text x="168" y="168" fill={`${PURPLE}99`} fontSize="8" fontFamily="monospace">a: V</text>
      <text x="168" y="178" fill={`${PURPLE}99`} fontSize="8" fontFamily="monospace">b: V  c: V</text>

      {/* === Right side: Pick === */}
      <rect x="310" y="26" width="90" height="60" rx="5" fill={`${PURPLE}08`} stroke={`${PURPLE}30`} strokeWidth="1.2" />
      <text x="355" y="42" fill={`${PURPLE}cc`} fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="700">User</text>
      <text x="318" y="56" fill={`${PURPLE}80`} fontSize="8" fontFamily="monospace">name: string</text>
      <text x="318" y="68" fill={`${PURPLE}55`} fontSize="8" fontFamily="monospace">age: number</text>
      <text x="318" y="79" fill={`${PURPLE}40`} fontSize="8" fontFamily="monospace">email: string</text>
      <line x1="401" y1="56" x2="452" y2="56" stroke={`${PURPLE}60`} strokeWidth="1.2" markerEnd="url(#arrow-ut)" />
      <text x="427" y="52" fill={`${PURPLE}99`} fontSize="8" fontFamily="monospace" textAnchor="middle">Pick</text>
      <text x="427" y="67" fill={`${PURPLE}55`} fontSize="7.5" fontFamily="monospace" textAnchor="middle">{'<User,\'name\'>'}</text>
      <rect x="454" y="38" width="110" height="36" rx="5" fill={`${PURPLE}10`} stroke={`${PURPLE}45`} strokeWidth="1.2" />
      <text x="509" y="54" fill={`${PURPLE}dd`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">Pick&lt;User&gt;</text>
      <text x="462" y="68" fill={`${PURPLE}ee`} fontSize="8" fontFamily="monospace">name: string ✓</text>

      {/* === Omit === */}
      <rect x="310" y="108" width="90" height="60" rx="5" fill={`${PURPLE}08`} stroke={`${PURPLE}30`} strokeWidth="1.2" />
      <text x="355" y="124" fill={`${PURPLE}cc`} fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="700">User</text>
      <text x="318" y="138" fill={`${PURPLE}80`} fontSize="8" fontFamily="monospace">name: string</text>
      <text x="318" y="150" fill={`${PURPLE}80`} fontSize="8" fontFamily="monospace">age: number</text>
      <text x="318" y="161" fill={`${PURPLE}55`} fontSize="8" fontFamily="monospace">email: string</text>
      <line x1="401" y1="138" x2="452" y2="138" stroke={`${PURPLE}60`} strokeWidth="1.2" markerEnd="url(#arrow-ut)" />
      <text x="427" y="134" fill={`${PURPLE}99`} fontSize="8" fontFamily="monospace" textAnchor="middle">Omit</text>
      <text x="427" y="149" fill={`${PURPLE}55`} fontSize="7.5" fontFamily="monospace" textAnchor="middle">{'<User,\'age\'>'}</text>
      <rect x="454" y="120" width="110" height="44" rx="5" fill={`${PURPLE}10`} stroke={`${PURPLE}45`} strokeWidth="1.2" />
      <text x="509" y="136" fill={`${PURPLE}dd`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">Omit&lt;User&gt;</text>
      <text x="462" y="150" fill={`${PURPLE}99`} fontSize="8" fontFamily="monospace">name: string</text>
      <text x="462" y="160" fill={`${PURPLE}99`} fontSize="8" fontFamily="monospace">email: string</text>

      {/* === Required === */}
      <rect x="310" y="182" width="254" height="30" rx="5" fill={`${PURPLE}06`} stroke={`${PURPLE}22`} strokeWidth="1.2" />
      <text x="320" y="200" fill={`${PURPLE}55`} fontSize="8.5" fontFamily="monospace">Required&lt;T&gt;</text>
      <text x="408" y="200" fill={`${PURPLE}99`} fontSize="8.5" fontFamily="monospace">— all optional → required</text>

      {/* === ReturnType / Parameters === */}
      <rect x="574" y="26" width="190" height="186" rx="7" fill={`${PURPLE}04`} stroke={`${PURPLE}20`} strokeWidth="1.2" />
      <text x="588" y="44" fill={`${PURPLE}60`} fontSize="8.5" fontFamily="monospace">function types</text>
      <text x="588" y="60" fill={`${PURPLE}cc`} fontSize="8.5" fontFamily="monospace">ReturnType&lt;typeof fn&gt;</text>
      <text x="588" y="75" fill={`${PURPLE}55`} fontSize="8" fontFamily="monospace">→ infer return type</text>
      <rect x="588" y="82" width="162" height="1" fill={`${PURPLE}18`} />
      <text x="588" y="98" fill={`${PURPLE}cc`} fontSize="8.5" fontFamily="monospace">Parameters&lt;typeof fn&gt;</text>
      <text x="588" y="113" fill={`${PURPLE}55`} fontSize="8" fontFamily="monospace">→ args as tuple</text>
      <rect x="588" y="120" width="162" height="1" fill={`${PURPLE}18`} />
      <text x="588" y="136" fill={`${PURPLE}cc`} fontSize="8.5" fontFamily="monospace">Awaited&lt;Promise&lt;T&gt;&gt;</text>
      <text x="588" y="151" fill={`${PURPLE}55`} fontSize="8" fontFamily="monospace">→ unwrap Promise</text>
      <rect x="588" y="158" width="162" height="1" fill={`${PURPLE}18`} />
      <text x="588" y="174" fill={`${PURPLE}cc`} fontSize="8.5" fontFamily="monospace">NonNullable&lt;T&gt;</text>
      <text x="588" y="189" fill={`${PURPLE}55`} fontSize="8" fontFamily="monospace">→ exclude null | undefined</text>
    </svg>
  )
}
