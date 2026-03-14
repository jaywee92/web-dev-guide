export default function QueriesBanner() {
  const C = '#38bdf8'
  return (
    <svg
      width="100%"
      viewBox="0 0 780 220"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', background: '#07101a' }}
    >
      <defs>
        <pattern id="dots-queries" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-queries" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-queries)" />
      <rect width="780" height="220" fill="url(#glow-queries)" />

      {/* LEFT: SQL code block */}
      <rect x="30" y="20" width="300" height="180" rx="6"
        fill="rgba(0,0,0,0.4)" stroke={`${C}30`} strokeWidth="1.2" />

      {/* Code block header bar */}
      <rect x="30" y="20" width="300" height="22" rx="6" fill="rgba(56,189,248,0.08)" />
      <text x="46" y="35" fontFamily="monospace" fontSize="10" fill={`${C}80`}>query.sql</text>

      {/* SELECT clause */}
      {[
        { keyword: 'SELECT', rest: ' name, age', y: 68 },
        { keyword: 'FROM', rest: '   users', y: 90 },
        { keyword: 'WHERE', rest: '  age > 18', y: 112 },
        { keyword: 'ORDER BY', rest: ' name', y: 134 },
        { keyword: 'LIMIT', rest: '  10', y: 156 },
      ].map(({ keyword, rest, y }) => (
        <g key={keyword}>
          <text x="50" y={y} fontFamily="monospace" fontSize="12" fill={C} fontWeight="bold">{keyword}</text>
          <text x={50 + keyword.length * 7.3} y={y} fontFamily="monospace" fontSize="12" fill="rgba(255,255,255,0.75)">{rest}</text>
        </g>
      ))}

      {/* Arrow from WHERE to result table */}
      <line x1="330" y1="112" x2="365" y2="112" stroke={`${C}60`} strokeWidth="1.5" strokeDasharray="4 3" />
      <polygon points="365,108 373,112 365,116" fill={`${C}60`} />

      {/* Divider */}
      <line x1="390" y1="20" x2="390" y2="200" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />

      {/* RIGHT: Result table */}
      <text x="580" y="30" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}80`}>result set</text>

      {/* Table header */}
      <rect x="420" y="38" width="310" height="22" rx="3" fill={`${C}20`} />
      {['id', 'name', 'age'].map((col, i) => (
        <text key={col} x={440 + i * 100} y="53" fontFamily="monospace" fontSize="11" fill={C} fontWeight="bold">{col}</text>
      ))}

      {/* Table rows — row 2 highlighted as WHERE match */}
      {[
        { id: '1', name: 'Alice', age: '24', highlight: false },
        { id: '2', name: 'Bob', age: '31', highlight: true },
        { id: '3', name: 'Carol', age: '19', highlight: false },
      ].map(({ id, name, age, highlight }, i) => {
        const y = 62 + i * 24
        return (
          <g key={id}>
            {highlight && (
              <rect x="420" y={y} width="310" height="22" rx="2" fill={`${C}18`} stroke={`${C}40`} strokeWidth="1" />
            )}
            <text x="440" y={y + 15} fontFamily="monospace" fontSize="11" fill={highlight ? C : 'rgba(255,255,255,0.6)'}>{id}</text>
            <text x="540" y={y + 15} fontFamily="monospace" fontSize="11" fill={highlight ? C : 'rgba(255,255,255,0.6)'}>{name}</text>
            <text x="640" y={y + 15} fontFamily="monospace" fontSize="11" fill={highlight ? C : 'rgba(255,255,255,0.6)'}>{age}</text>
            {highlight && (
              <text x="718" y={y + 15} fontFamily="monospace" fontSize="10" fill={`${C}90`}>← match</text>
            )}
          </g>
        )
      })}

      {/* Table grid lines */}
      <line x1="420" y1="60" x2="730" y2="60" stroke={`${C}20`} strokeWidth="1" />
      <line x1="420" y1="84" x2="730" y2="84" stroke={`${C}15`} strokeWidth="1" />
      <line x1="420" y1="108" x2="730" y2="108" stroke={`${C}15`} strokeWidth="1" />
      <line x1="420" y1="132" x2="730" y2="132" stroke={`${C}15`} strokeWidth="1" />

      {/* Column separators */}
      <line x1="520" y1="38" x2="520" y2="132" stroke={`${C}15`} strokeWidth="1" />
      <line x1="620" y1="38" x2="620" y2="132" stroke={`${C}15`} strokeWidth="1" />

      {/* WHERE label */}
      <text x="50" y="195" fontFamily="monospace" fontSize="10" fill={`${C}50`}>clause keywords highlighted · result rows filtered</text>
    </svg>
  )
}
