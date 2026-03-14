export default function AnimationsBanner() {
  const C = '#f59e0b'

  return (
    <svg
      width="100%"
      viewBox="0 0 780 220"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', background: '#07101a' }}
    >
      <defs>
        <pattern id="dots-anim" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-anim" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
        <marker id="arr-anim" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill={`${C}80`} />
        </marker>
      </defs>
      <rect width="780" height="220" fill="url(#dots-anim)" />
      <rect width="780" height="220" fill="url(#glow-anim)" />

      {/* ── LEFT: @keyframes code block ── */}
      <rect x="14" y="14" width="200" height="130" rx="5"
        fill="rgba(245,158,11,0.05)" stroke="rgba(245,158,11,0.3)" strokeWidth="1.2" />
      <text x="24" y="32" fontFamily="monospace" fontSize="10" fill="rgba(245,158,11,0.8)" fontWeight="bold">@keyframes fadeUp {'{'}</text>
      <text x="30" y="50" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.55)">  from {'{'}</text>
      <text x="38" y="65" fontFamily="monospace" fontSize="9.5" fill="rgba(96,165,250,0.75)">    opacity: 0;</text>
      <text x="38" y="79" fontFamily="monospace" fontSize="9.5" fill="rgba(96,165,250,0.75)">    transform:</text>
      <text x="38" y="92" fontFamily="monospace" fontSize="9.5" fill="rgba(96,165,250,0.75)">      translateY(20px);</text>
      <text x="30" y="107" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.55)">  {'}'}</text>
      <text x="30" y="122" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.55)">  to {'{'}</text>
      <text x="38" y="136" fontFamily="monospace" fontSize="9.5" fill="rgba(134,239,172,0.75)">    opacity: 1;</text>
      {/* closing braces below the box — extend box height a little */}
      <text x="30" y="150" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.55)">  {'}'}</text>
      <text x="24" y="160" fontFamily="monospace" fontSize="10" fill="rgba(245,158,11,0.8)" fontWeight="bold">{'}'}</text>

      {/* connector from left block to timeline */}
      <line x1="214" y1="79" x2="250" y2="100" stroke={`${C}50`} strokeWidth="1"
        strokeDasharray="4 3" markerEnd="url(#arr-anim)" />

      {/* ── CENTER: Timeline bar ── */}
      {/* Timeline rail */}
      <line x1="250" y1="110" x2="530" y2="110"
        stroke="rgba(245,158,11,0.5)" strokeWidth="2.5" strokeLinecap="round" />

      {/* Keyframe markers: 0%, 25%, 75%, 100% */}
      {/* 0% at x=250 */}
      <circle cx="250" cy="110" r="6" fill="#07101a" stroke={C} strokeWidth="2" />
      <text x="250" y="100" textAnchor="middle" fontFamily="monospace" fontSize="9" fill={C}>0%</text>
      <text x="250" y="130" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="rgba(96,165,250,0.7)">opacity:0</text>
      <text x="250" y="141" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgba(96,165,250,0.55)">y:+20px</text>

      {/* 25% at x=320 */}
      <circle cx="320" cy="110" r="5" fill="#07101a" stroke="rgba(245,158,11,0.6)" strokeWidth="1.5" />
      <text x="320" y="100" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(245,158,11,0.6)">25%</text>
      <text x="320" y="130" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="rgba(255,255,255,0.4)">0.25</text>
      <text x="320" y="141" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgba(255,255,255,0.3)">y:+15px</text>

      {/* 75% at x="460" */}
      <circle cx="460" cy="110" r="5" fill="#07101a" stroke="rgba(245,158,11,0.6)" strokeWidth="1.5" />
      <text x="460" y="100" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(245,158,11,0.6)">75%</text>
      <text x="460" y="130" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="rgba(255,255,255,0.4)">0.75</text>
      <text x="460" y="141" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgba(255,255,255,0.3)">y:+5px</text>

      {/* 100% at x=530 */}
      <circle cx="530" cy="110" r="6" fill="#07101a" stroke={C} strokeWidth="2" />
      <text x="530" y="100" textAnchor="middle" fontFamily="monospace" fontSize="9" fill={C}>100%</text>
      <text x="530" y="130" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="rgba(134,239,172,0.7)">opacity:1</text>
      <text x="530" y="141" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgba(134,239,172,0.55)">y:0</text>

      {/* "Timeline" label */}
      <text x="390" y="160" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(245,158,11,0.35)">keyframe timeline</text>

      {/* ── RIGHT: animation: shorthand breakdown ── */}
      {/* Shorthand line */}
      <text x="556" y="30" fontFamily="monospace" fontSize="9.5" fill="rgba(245,158,11,0.8)" fontWeight="bold">animation:</text>
      <text x="556" y="46" fontFamily="monospace" fontSize="9" fill="rgba(255,255,255,0.65)">fadeUp 0.6s ease 0.1s 1</text>

      {/* Separator */}
      <line x1="556" y1="53" x2="766" y2="53" stroke="rgba(245,158,11,0.2)" strokeWidth="1" />

      {/* Parts */}
      {[
        { label: 'name', value: 'fadeUp', x: 556 },
        { label: 'duration', value: '0.6s', x: 620 },
        { label: 'easing', value: 'ease', x: 670 },
        { label: 'delay', value: '0.1s', x: 717 },
      ].map(({ label, value, x }) => (
        <g key={label}>
          <rect x={x} y="60" width={label === 'name' ? 58 : label === 'duration' ? 44 : label === 'easing' ? 40 : 38} height="34" rx="3"
            fill="rgba(245,158,11,0.07)" stroke="rgba(245,158,11,0.25)" strokeWidth="1" />
          <text x={x + (label === 'name' ? 29 : label === 'duration' ? 22 : label === 'easing' ? 20 : 19)} y="73"
            textAnchor="middle" fontFamily="monospace" fontSize="9.5" fill="rgba(255,255,255,0.75)">{value}</text>
          <text x={x + (label === 'name' ? 29 : label === 'duration' ? 22 : label === 'easing' ? 20 : 19)} y="87"
            textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgba(245,158,11,0.55)">{label}</text>
        </g>
      ))}

      {/* iteration-count box */}
      <rect x="556" y="104" width="72" height="34" rx="3"
        fill="rgba(245,158,11,0.07)" stroke="rgba(245,158,11,0.25)" strokeWidth="1" />
      <text x="592" y="117" textAnchor="middle" fontFamily="monospace" fontSize="9.5" fill="rgba(255,255,255,0.75)">1 / infinite</text>
      <text x="592" y="131" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgba(245,158,11,0.55)">iteration-count</text>

      {/* fill-mode box */}
      <rect x="636" y="104" width="60" height="34" rx="3"
        fill="rgba(245,158,11,0.07)" stroke="rgba(245,158,11,0.25)" strokeWidth="1" />
      <text x="666" y="117" textAnchor="middle" fontFamily="monospace" fontSize="9.5" fill="rgba(255,255,255,0.75)">forwards</text>
      <text x="666" y="131" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgba(245,158,11,0.55)">fill-mode</text>

      {/* play-state box */}
      <rect x="704" y="104" width="58" height="34" rx="3"
        fill="rgba(245,158,11,0.07)" stroke="rgba(245,158,11,0.25)" strokeWidth="1" />
      <text x="733" y="117" textAnchor="middle" fontFamily="monospace" fontSize="9.5" fill="rgba(255,255,255,0.75)">running</text>
      <text x="733" y="131" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgba(245,158,11,0.55)">play-state</text>

      {/* easing curve hint */}
      <path d="M560 185 Q580 165 600 178 Q620 191 640 170"
        fill="none" stroke="rgba(245,158,11,0.5)" strokeWidth="1.5" strokeLinecap="round" />
      <text x="650" y="175" fontFamily="monospace" fontSize="8.5" fill="rgba(245,158,11,0.45)">easing curve</text>

      {/* connector from shorthand to center timeline */}
      <line x1="550" y1="110" x2="536" y2="110"
        stroke={`${C}40`} strokeWidth="1" strokeDasharray="4 3" />
    </svg>
  )
}
