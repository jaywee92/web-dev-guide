export default function OOPBanner() {
  const C = '#fbbf24'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-oo" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-oo" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
        <marker id="arr-oo" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={`${C}80`} />
        </marker>
        <marker id="arr-oo-up" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="270">
          <path d="M0,0 L6,3 L0,6 Z" fill={`${C}80`} />
        </marker>
      </defs>
      <rect width="780" height="220" fill="url(#dots-oo)" />
      <rect width="780" height="220" fill="url(#glow-oo)" />

      {/* === Panel 1: Class definition === */}
      <rect x="12" y="14" width="220" height="194" rx="8" fill={`${C}04`} stroke={`${C}28`} strokeWidth="1.5" />
      <text x="122" y="30" fill={`${C}80`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="700">class definition</text>

      {/* class box */}
      <rect x="26" y="40" width="192" height="142" rx="6" fill={`${C}08`} stroke={`${C}40`} strokeWidth="1.5" />
      {/* header */}
      <rect x="26" y="40" width="192" height="26" rx="6" fill={`${C}20`} stroke={`${C}40`} strokeWidth="1.5" />
      <text x="122" y="57" fill={`${C}ee`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="700">class Animal</text>

      <text x="42" y="80" fill={`${C}60`} fontSize="9" fontFamily="monospace">constructor(name)</text>
      <line x1="42" y1="86" x2="206" y2="86" stroke={`${C}15`} strokeWidth="1" />
      <text x="42" y="104" fill={`${C}50`} fontSize="9" fontFamily="monospace">speak()</text>
      <text x="42" y="120" fill={`${C}40`} fontSize="9" fontFamily="monospace">getName()</text>
      <text x="42" y="136" fill={`${C}30`} fontSize="9" fontFamily="monospace">toString()</text>

      <text x="122" y="196" fill={`${C}35`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">blueprint for objects</text>

      {/* === Panel 2: Inheritance === */}
      <rect x="258" y="14" width="220" height="194" rx="8" fill={`${C}04`} stroke={`${C}28`} strokeWidth="1.5" />
      <text x="368" y="30" fill={`${C}80`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="700">inheritance</text>

      {/* Animal parent box */}
      <rect x="276" y="40" width="184" height="52" rx="6" fill={`${C}10`} stroke={`${C}45`} strokeWidth="1.5" />
      <rect x="276" y="40" width="184" height="22" rx="6" fill={`${C}22`} stroke={`${C}45`} strokeWidth="1.5" />
      <text x="368" y="56" fill={`${C}ee`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="700">Animal</text>
      <text x="368" y="82" fill={`${C}60`} fontSize="9" fontFamily="monospace" textAnchor="middle">speak() · getName()</text>

      {/* arrow up */}
      <line x1="368" y1="136" x2="368" y2="96" stroke={`${C}70`} strokeWidth="1.8" markerEnd="url(#arr-oo-up)" />
      <text x="382" y="120" fill={`${C}50`} fontSize="8.5" fontFamily="monospace">extends</text>

      {/* Dog child box */}
      <rect x="276" y="140" width="184" height="52" rx="6" fill={`${C}08`} stroke={`${C}30`} strokeWidth="1.5" />
      <rect x="276" y="140" width="184" height="22" rx="6" fill={`${C}14`} stroke={`${C}30`} strokeWidth="1.5" />
      <text x="368" y="156" fill={`${C}dd`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="700">Dog extends Animal</text>
      <text x="368" y="180" fill={`${C}50`} fontSize="9" fontFamily="monospace" textAnchor="middle">bark() · fetch()</text>

      <text x="368" y="200" fill={`${C}35`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">inherits parent methods</text>

      {/* === Panel 3: Prototype chain === */}
      <rect x="504" y="14" width="264" height="194" rx="8" fill={`${C}04`} stroke={`${C}28`} strokeWidth="1.5" />
      <text x="636" y="30" fill={`${C}80`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="700">prototype chain</text>

      {/* chain boxes */}
      {[
        { label: 'dog instance', x: 516 },
        { label: 'Dog.prototype', x: 584 },
        { label: 'Animal.prototype', x: 652 },
        { label: 'Object.prototype', x: 720 },
      ].map(({ label }, i) => (
        <g key={label}>
          <rect x={516 + i * 62} y="60" width={i === 2 || i === 3 ? 58 : 54} height="50" rx="4"
            fill={`${C}${i === 0 ? '14' : i === 1 ? '0e' : i === 2 ? '09' : '06'}`}
            stroke={`${C}${i === 0 ? '45' : i === 1 ? '35' : i === 2 ? '28' : '20'}`}
            strokeWidth="1.2" />
          <text x={543 + i * 62} y="88" fill={`${C}${i === 0 ? 'ee' : i === 1 ? 'cc' : i === 2 ? 'aa' : '77'}`}
            fontSize="7.5" fontFamily="monospace" textAnchor="middle">{label.split('.')[0]}</text>
          {label.includes('.') && (
            <text x={543 + i * 62} y="100" fill={`${C}${i === 0 ? 'ee' : i === 1 ? 'cc' : i === 2 ? 'aa' : '77'}`}
              fontSize="7.5" fontFamily="monospace" textAnchor="middle">.{label.split('.')[1]}</text>
          )}
          {i < 3 && (
            <line x1={572 + i * 62} y1="85" x2={578 + i * 62} y2="85"
              stroke={`${C}60`} strokeWidth="1.5" markerEnd="url(#arr-oo)" />
          )}
        </g>
      ))}

      <text x="636" y="140" fill={`${C}40`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">[[Prototype]] lookup chain</text>
      <text x="636" y="160" fill={`${C}35`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">method found → stops walking</text>
      <text x="636" y="196" fill={`${C}30`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">null at end → undefined</text>
    </svg>
  )
}
