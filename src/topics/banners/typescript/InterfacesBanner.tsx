export default function InterfacesBanner() {
  const C = '#6366f1'

  return (
    <svg
      width="100%"
      viewBox="0 0 780 220"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', background: '#07101a' }}
    >
      <defs>
        <pattern id="dots-iface" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-iface" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
        <marker id="arr-iface" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill={`${C}90`} />
        </marker>
      </defs>
      <rect width="780" height="220" fill="url(#dots-iface)" />
      <rect width="780" height="220" fill="url(#glow-iface)" />

      {/* ── LEFT: interface User { } block ── */}
      <rect x="14" y="12" width="215" height="145" rx="5"
        fill="rgba(99,102,241,0.06)" stroke="rgba(99,102,241,0.35)" strokeWidth="1.2" />

      {/* Header label */}
      <text x="24" y="30" fontFamily="monospace" fontSize="10" fill="rgba(99,102,241,0.5)" fontWeight="bold">INTERFACE</text>

      <text x="24" y="48" fontFamily="monospace" fontSize="10.5" fontWeight="bold" fill={C}>interface</text>
      <text x="84" y="48" fontFamily="monospace" fontSize="10.5" fontWeight="bold" fill="rgba(255,255,255,0.85)"> User {'{'}</text>

      {/* id: number */}
      <text x="34" y="65" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.6)">id</text>
      <text x="48" y="65" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.4)">:</text>
      <text x="56" y="65" fontFamily="monospace" fontSize="10" fill="rgba(96,165,250,0.8)">number</text>

      {/* name: string */}
      <text x="34" y="82" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.6)">name</text>
      <text x="66" y="82" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.4)">:</text>
      <text x="74" y="82" fontFamily="monospace" fontSize="10" fill="rgba(134,239,172,0.8)">string</text>

      {/* email: string */}
      <text x="34" y="99" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.6)">email</text>
      <text x="74" y="99" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.4)">:</text>
      <text x="82" y="99" fontFamily="monospace" fontSize="10" fill="rgba(134,239,172,0.8)">string</text>

      {/* role?: 'admin' | 'user' */}
      <text x="34" y="116" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.6)">role</text>
      <text x="62" y="116" fontFamily="monospace" fontSize="10" fill="rgba(245,158,11,0.9)">?</text>
      <text x="70" y="116" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.4)">:</text>
      <text x="78" y="116" fontFamily="monospace" fontSize="10" fill="rgba(251,146,60,0.8)">'admin'</text>
      <text x="128" y="116" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.4)"> |</text>
      <text x="144" y="116" fontFamily="monospace" fontSize="10" fill="rgba(251,146,60,0.8)">'user'</text>

      {/* optional badge for role? */}
      <rect x="155" y="106" width="48" height="14" rx="7"
        fill="rgba(245,158,11,0.15)" stroke="rgba(245,158,11,0.45)" strokeWidth="0.8" />
      <text x="179" y="116" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgba(245,158,11,0.8)">optional</text>

      <text x="24" y="148" fontFamily="monospace" fontSize="10.5" fontWeight="bold" fill="rgba(255,255,255,0.6)">{'}'}</text>

      {/* ── Arrow → ── */}
      <line x1="232" y1="80" x2="278" y2="80"
        stroke={`${C}80`} strokeWidth="1.5" markerEnd="url(#arr-iface)" />
      <text x="255" y="74" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="rgba(99,102,241,0.5)">implements</text>

      {/* ── CENTER-RIGHT: object literal implementing User ── */}
      <rect x="282" y="12" width="240" height="145" rx="5"
        fill="rgba(99,102,241,0.06)" stroke="rgba(99,102,241,0.25)" strokeWidth="1.2" />

      <text x="292" y="30" fontFamily="monospace" fontSize="10" fill="rgba(99,102,241,0.5)" fontWeight="bold">IMPLEMENTATION</text>

      <text x="292" y="48" fontFamily="monospace" fontSize="10.5" fontWeight="bold" fill="rgba(255,255,255,0.75)">const user: User = {'{'}</text>

      {[
        { key: 'id', val: '1', color: 'rgba(96,165,250,0.8)', y: 65 },
        { key: 'name', val: '"Alice"', color: 'rgba(134,239,172,0.8)', y: 82 },
        { key: 'email', val: '"a@ex.com"', color: 'rgba(134,239,172,0.8)', y: 99 },
        { key: 'role', val: '"admin"', color: 'rgba(251,146,60,0.8)', y: 116 },
      ].map(({ key, val, color, y }) => (
        <g key={key}>
          {/* green check */}
          <circle cx="300" cy={y - 4} r="5" fill="rgba(134,239,172,0.15)" stroke="rgba(134,239,172,0.5)" strokeWidth="1" />
          <text x="300" y={y} textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgba(134,239,172,0.9)">✓</text>
          <text x="312" y={y} fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.55)">{key}: </text>
          <text x={312 + (key.length * 6) + 14} y={y} fontFamily="monospace" fontSize="10" fill={color}>{val}</text>
        </g>
      ))}

      <text x="292" y="148" fontFamily="monospace" fontSize="10.5" fontWeight="bold" fill="rgba(255,255,255,0.6)">{'}'}</text>

      {/* ── BOTTOM: extends inheritance ── */}
      <rect x="14" y="168" width="310" height="44" rx="5"
        fill="rgba(99,102,241,0.05)" stroke="rgba(99,102,241,0.2)" strokeWidth="1" />
      <text x="24" y="184" fontFamily="monospace" fontSize="10" fontWeight="bold" fill={C}>interface</text>
      <text x="77" y="184" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.75)"> AdminUser </text>
      <text x="148" y="184" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="rgba(245,158,11,0.8)">extends</text>
      <text x="204" y="184" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.75)"> User {'{'}</text>
      <text x="34" y="202" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.6)">adminSince</text>
      <text x="106" y="202" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.4)">:</text>
      <text x="114" y="202" fontFamily="monospace" fontSize="10" fill="rgba(167,139,250,0.8)">Date</text>
      <text x="140" y="202" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.4)">{'}'}</text>

      {/* inheritance arrow */}
      <line x1="229" y1="157" x2="229" y2="168"
        stroke="rgba(245,158,11,0.4)" strokeWidth="1" strokeDasharray="3 2" />

      {/* ── RIGHT side: type utility hints ── */}
      <rect x="536" y="12" width="232" height="196" rx="5"
        fill="rgba(99,102,241,0.04)" stroke="rgba(99,102,241,0.2)" strokeWidth="1" />
      <text x="652" y="30" textAnchor="middle" fontFamily="monospace" fontSize="9.5" fill="rgba(99,102,241,0.6)" fontWeight="bold">Utility Types</text>

      {[
        { label: 'Partial<User>', desc: 'all fields optional', y: 52 },
        { label: 'Required<User>', desc: 'all fields required', y: 84 },
        { label: 'Pick<User,…>', desc: 'select fields', y: 116 },
        { label: 'Omit<User,…>', desc: 'exclude fields', y: 148 },
        { label: 'Readonly<User>', desc: 'immutable', y: 180 },
      ].map(({ label, desc, y }) => (
        <g key={label}>
          <rect x="546" y={y - 14} width="212" height="26" rx="3"
            fill="rgba(99,102,241,0.07)" stroke="rgba(99,102,241,0.2)" strokeWidth="0.8" />
          <text x="556" y={y} fontFamily="monospace" fontSize="9.5" fill={C}>{label}</text>
          <text x="556" y={y + 10} fontFamily="monospace" fontSize="8" fill="rgba(255,255,255,0.35)">{desc}</text>
        </g>
      ))}
    </svg>
  )
}
