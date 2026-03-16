export default function DbIntroBanner() {
  const C = '#60a5fa'
  const sqlColor = '#34d399'
  const noSqlColor = '#a78bfa'

  const sqlRows = [
    { id: '1', name: 'Alice', role: 'admin' },
    { id: '2', name: 'Bob',   role: 'user'  },
    { id: '3', name: 'Carol', role: 'user'  },
  ]

  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-dbintro" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-dbintro" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.05" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-dbintro)" />
      <rect width="780" height="220" fill="url(#glow-dbintro)" />

      {/* Title */}
      <text x="390" y="20" fill={`${C}70`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="700">RELATIONAL vs NON-RELATIONAL</text>

      {/* Divider */}
      <line x1="390" y1="28" x2="390" y2="205" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />

      {/* LEFT: SQL / Relational */}
      <text x="195" y="40" fill={`${sqlColor}99`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="700">SQL — Relational</text>

      {/* Table header */}
      <rect x="30" y="48" width="330" height="20" rx="4" fill={`${sqlColor}20`} />
      {['id', 'name', 'role'].map((col, i) => (
        <text key={col} x={50 + i * 100} y="62" fontFamily="monospace" fontSize="11" fill={sqlColor} fontWeight="bold">{col}</text>
      ))}

      {/* Table rows */}
      {sqlRows.map(({ id, name, role }, i) => {
        const y = 70 + i * 26
        return (
          <g key={id}>
            {i % 2 === 0 && <rect x="30" y={y} width="330" height="26" fill="rgba(255,255,255,0.02)" />}
            <line x1="30" y1={y} x2="360" y2={y} stroke={`${sqlColor}15`} strokeWidth="1" />
            <text x="50" y={y + 17} fontFamily="monospace" fontSize="11" fill="rgba(255,255,255,0.65)">{id}</text>
            <text x="150" y={y + 17} fontFamily="monospace" fontSize="11" fill="rgba(255,255,255,0.65)">{name}</text>
            <text x="250" y={y + 17} fontFamily="monospace" fontSize="11" fill="rgba(255,255,255,0.65)">{role}</text>
          </g>
        )
      })}

      {/* Table border */}
      <rect x="30" y="48" width="330" height="78" rx="4" fill="none" stroke={`${sqlColor}25`} strokeWidth="1.2" />

      {/* Column separators */}
      <line x1="130" y1="48" x2="130" y2="126" stroke={`${sqlColor}15`} strokeWidth="1" />
      <line x1="230" y1="48" x2="230" y2="126" stroke={`${sqlColor}15`} strokeWidth="1" />

      {/* SQL ACID labels */}
      <text x="30" y="148" fill={`${sqlColor}50`} fontSize="9" fontFamily="monospace">ACID guarantees:</text>
      {['Atomic', 'Consistent', 'Isolated', 'Durable'].map((word, i) => (
        <rect key={word} x={30 + i * 76} y="155" width={68} height="16" rx="3"
          fill={`${sqlColor}12`} stroke={`${sqlColor}30`} strokeWidth="1">
          <title>{word}</title>
        </rect>
      ))}
      {['Atomic', 'Consistent', 'Isolated', 'Durable'].map((word, i) => (
        <text key={word} x={64 + i * 76} y="167" fill={sqlColor} fontSize="9" fontFamily="monospace" textAnchor="middle">{word}</text>
      ))}

      {/* SQL keywords */}
      <text x="30" y="195" fill={`${sqlColor}40`} fontSize="9" fontFamily="monospace">PostgreSQL · MySQL · SQLite</text>

      {/* RIGHT: NoSQL / Document */}
      <text x="585" y="40" fill={`${noSqlColor}99`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="700">NoSQL — Document</text>

      {/* JSON document */}
      <rect x="408" y="48" width="340" height="130" rx="6" fill="rgba(0,0,0,0.4)" stroke={`${noSqlColor}30`} strokeWidth="1.2" />
      <rect x="408" y="48" width="340" height="20" rx="6" fill={`${noSqlColor}12`} />
      <rect x="408" y="60" width="340" height="8" fill={`${noSqlColor}12`} />
      <text x="424" y="62" fill={`${noSqlColor}70`} fontSize="9" fontFamily="monospace">document.json</text>

      {[
        { text: '{',                        indent: 0, color: 'rgba(255,255,255,0.5)' },
        { text: '"id":',                    indent: 1, color: noSqlColor },
        { text: '"_id": "abc123",',         indent: 1, color: 'rgba(255,255,255,0.65)' },
        { text: '"name": "Alice",',         indent: 1, color: 'rgba(255,255,255,0.65)' },
        { text: '"tags": ["admin","vip"],', indent: 1, color: 'rgba(255,255,255,0.65)' },
        { text: '"meta": { "score": 42 }',  indent: 1, color: 'rgba(255,255,255,0.65)' },
        { text: '}',                        indent: 0, color: 'rgba(255,255,255,0.5)' },
      ].map(({ text, indent, color }, i) => (
        <text key={i} x={424 + indent * 14} y={84 + i * 14} fontFamily="monospace" fontSize="10" fill={color}>{text}</text>
      ))}

      {/* Flexible schema note */}
      <text x="408" y="195" fill={`${noSqlColor}40`} fontSize="9" fontFamily="monospace">MongoDB · Redis · Cassandra · Neo4j</text>

      {/* Bottom caption */}
      <text x="390" y="212" fill={`${C}35`} fontSize="9" fontFamily="monospace" textAnchor="middle">Structured rows vs flexible documents · each optimised for different workloads</text>
    </svg>
  )
}
