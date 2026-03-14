export default function GenericsBanner() {
  const C = '#8b5cf6'

  return (
    <svg
      width="100%"
      viewBox="0 0 780 220"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', background: '#07101a' }}
    >
      <defs>
        <pattern id="dots-gen" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-gen" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.07" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
        <marker id="arr-gen" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill={`${C}90`} />
        </marker>
        <marker id="arr-gen-b" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="rgba(96,165,250,0.7)" />
        </marker>
        <marker id="arr-gen-g" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="rgba(134,239,172,0.7)" />
        </marker>
        <marker id="arr-gen-a" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="rgba(245,158,11,0.7)" />
        </marker>
      </defs>
      <rect width="780" height="220" fill="url(#dots-gen)" />
      <rect width="780" height="220" fill="url(#glow-gen)" />

      {/* ── TOP CENTER: function signature ── */}
      <rect x="160" y="12" width="400" height="36" rx="5"
        fill="rgba(139,92,246,0.08)" stroke="rgba(139,92,246,0.4)" strokeWidth="1.5" />

      <text x="174" y="35" fontFamily="monospace" fontSize="11" fill="rgba(255,255,255,0.6)">function identity</text>
      {/* <T> highlighted */}
      <text x="305" y="35" fontFamily="monospace" fontSize="11" fontWeight="bold" fill={C}>{'<T>'}</text>
      <text x="336" y="35" fontFamily="monospace" fontSize="11" fill="rgba(255,255,255,0.6)">(value: </text>
      <text x="393" y="35" fontFamily="monospace" fontSize="11" fontWeight="bold" fill={C}>T</text>
      <text x="402" y="35" fontFamily="monospace" fontSize="11" fill="rgba(255,255,255,0.6)">): </text>
      <text x="424" y="35" fontFamily="monospace" fontSize="11" fontWeight="bold" fill={C}>T</text>

      {/* T annotation bubble */}
      <rect x="295" y="8" width="24" height="10" rx="5"
        fill="rgba(139,92,246,0.25)" stroke={`${C}70`} strokeWidth="0.8" />
      <text x="307" y="16" textAnchor="middle" fontFamily="monospace" fontSize="7" fill={C}>type param</text>

      {/* ── THREE CALL-SITE BOXES ── */}

      {/* 1. identity(42) → T = number */}
      <rect x="36" y="68" width="185" height="60" rx="5"
        fill="rgba(96,165,250,0.06)" stroke="rgba(96,165,250,0.35)" strokeWidth="1.2" />
      <text x="46" y="86" fontFamily="monospace" fontSize="10.5" fill="rgba(255,255,255,0.65)">identity(</text>
      <text x="107" y="86" fontFamily="monospace" fontSize="10.5" fill="rgba(96,165,250,0.9)">42</text>
      <text x="121" y="86" fontFamily="monospace" fontSize="10.5" fill="rgba(255,255,255,0.65)">)</text>
      {/* arrow → */}
      <line x1="136" y1="98" x2="162" y2="98" stroke="rgba(96,165,250,0.6)" strokeWidth="1.2" markerEnd="url(#arr-gen-b)" />
      <text x="46" y="116" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.4)">T inferred =</text>
      <text x="128" y="116" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="rgba(96,165,250,0.9)">number</text>

      {/* "T inferred" badge */}
      <rect x="167" y="89" width="48" height="18" rx="9"
        fill="rgba(96,165,250,0.15)" stroke="rgba(96,165,250,0.4)" strokeWidth="0.8" />
      <text x="191" y="102" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgba(96,165,250,0.85)">T=number</text>

      {/* connector up to signature */}
      <line x1="128" y1="68" x2="265" y2="48" stroke="rgba(96,165,250,0.25)" strokeWidth="1"
        strokeDasharray="4 3" markerEnd="url(#arr-gen-b)" />

      {/* 2. identity("hi") → T = string */}
      <rect x="258" y="68" width="200" height="60" rx="5"
        fill="rgba(134,239,172,0.06)" stroke="rgba(134,239,172,0.35)" strokeWidth="1.2" />
      <text x="268" y="86" fontFamily="monospace" fontSize="10.5" fill="rgba(255,255,255,0.65)">identity(</text>
      <text x="329" y="86" fontFamily="monospace" fontSize="10.5" fill="rgba(134,239,172,0.9)">"hi"</text>
      <text x="357" y="86" fontFamily="monospace" fontSize="10.5" fill="rgba(255,255,255,0.65)">)</text>
      <line x1="368" y1="98" x2="394" y2="98" stroke="rgba(134,239,172,0.6)" strokeWidth="1.2" markerEnd="url(#arr-gen-g)" />
      <text x="268" y="116" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.4)">T inferred =</text>
      <text x="350" y="116" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="rgba(134,239,172,0.9)">string</text>

      <rect x="398" y="89" width="48" height="18" rx="9"
        fill="rgba(134,239,172,0.15)" stroke="rgba(134,239,172,0.4)" strokeWidth="0.8" />
      <text x="422" y="102" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgba(134,239,172,0.85)">T=string</text>

      {/* connector up */}
      <line x1="358" y1="68" x2="360" y2="48" stroke="rgba(134,239,172,0.25)" strokeWidth="1"
        strokeDasharray="4 3" markerEnd="url(#arr-gen-g)" />

      {/* 3. identity(true) → T = boolean */}
      <rect x="480" y="68" width="195" height="60" rx="5"
        fill="rgba(245,158,11,0.06)" stroke="rgba(245,158,11,0.35)" strokeWidth="1.2" />
      <text x="490" y="86" fontFamily="monospace" fontSize="10.5" fill="rgba(255,255,255,0.65)">identity(</text>
      <text x="551" y="86" fontFamily="monospace" fontSize="10.5" fill="rgba(245,158,11,0.9)">true</text>
      <text x="581" y="86" fontFamily="monospace" fontSize="10.5" fill="rgba(255,255,255,0.65)">)</text>
      <line x1="592" y1="98" x2="618" y2="98" stroke="rgba(245,158,11,0.6)" strokeWidth="1.2" markerEnd="url(#arr-gen-a)" />
      <text x="490" y="116" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.4)">T inferred =</text>
      <text x="572" y="116" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="rgba(245,158,11,0.9)">boolean</text>

      <rect x="622" y="89" width="50" height="18" rx="9"
        fill="rgba(245,158,11,0.15)" stroke="rgba(245,158,11,0.4)" strokeWidth="0.8" />
      <text x="647" y="102" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgba(245,158,11,0.85)">T=boolean</text>

      {/* connector up */}
      <line x1="577" y1="68" x2="460" y2="48" stroke="rgba(245,158,11,0.25)" strokeWidth="1"
        strokeDasharray="4 3" markerEnd="url(#arr-gen-a)" />

      {/* ── BOTTOM: common generic types ── */}
      <rect x="36" y="148" width="700" height="58" rx="5"
        fill="rgba(139,92,246,0.05)" stroke="rgba(139,92,246,0.2)" strokeWidth="1" />
      <text x="386" y="165" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(139,92,246,0.5)" fontWeight="bold">Common Generic Types</text>

      {[
        { label: 'Array<T>', desc: 'ordered list', x: 68 },
        { label: 'Promise<T>', desc: 'async value', x: 210 },
        { label: 'Map<K,V>', desc: 'key→value pairs', x: 352 },
        { label: 'Set<T>', desc: 'unique values', x: 494 },
        { label: 'Record<K,V>', desc: 'typed object', x: 622 },
      ].map(({ label, desc, x }) => (
        <g key={label}>
          <rect x={x} y="172" width={label.length * 8 + 10} height="26" rx="3"
            fill="rgba(139,92,246,0.1)" stroke="rgba(139,92,246,0.3)" strokeWidth="0.8" />
          <text x={x + 5} y="183" fontFamily="monospace" fontSize="9.5" fill={C}>{label}</text>
          <text x={x + 5} y="194" fontFamily="monospace" fontSize="8" fill="rgba(255,255,255,0.35)">{desc}</text>
        </g>
      ))}

      {/* right-side: generic constraint hint */}
      <text x="686" y="35" fontFamily="monospace" fontSize="9" fill="rgba(139,92,246,0.45)">T extends</text>
      <text x="686" y="48" fontFamily="monospace" fontSize="9" fill="rgba(139,92,246,0.6)">object</text>
    </svg>
  )
}
