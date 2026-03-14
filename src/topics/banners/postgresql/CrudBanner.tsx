export default function CrudBanner() {
  const C = '#38bdf8'
  return (
    <svg
      width="100%"
      viewBox="0 0 780 220"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', background: '#07101a' }}
    >
      <defs>
        <pattern id="dots-crud" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-crud" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-crud)" />
      <rect width="780" height="220" fill="url(#glow-crud)" />

      {/* 4 CRUD panels in 2×2 grid */}
      {/* Panel 1: CREATE — top left */}
      <g transform="translate(20, 14)">
        <rect x="0" y="0" width="365" height="90" rx="6"
          fill="rgba(0,0,0,0.4)" stroke="rgba(52,211,153,0.3)" strokeWidth="1.2" />
        {/* Label */}
        <rect x="0" y="0" width="72" height="20" rx="6" fill="rgba(52,211,153,0.18)" />
        <text x="36" y="14" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="rgba(52,211,153,0.9)" fontWeight="bold">CREATE</text>
        {/* SQL */}
        <text x="82" y="14" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.35)">INSERT INTO users (name) VALUES ('Alice')</text>
        {/* Mini table header */}
        <text x="12" y="36" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.4)">id</text>
        <text x="60" y="36" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.4)">name</text>
        {/* Existing row */}
        <text x="12" y="52" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.5)">1</text>
        <text x="60" y="52" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.5)">Charlie</text>
        {/* New row highlighted green */}
        <rect x="6" y="56" width="180" height="18" rx="3" fill="rgba(52,211,153,0.15)" stroke="rgba(52,211,153,0.4)" strokeWidth="1" />
        <text x="12" y="69" fontFamily="monospace" fontSize="10" fill="rgba(52,211,153,0.9)">2</text>
        <text x="60" y="69" fontFamily="monospace" fontSize="10" fill="rgba(52,211,153,0.9)">Alice</text>
        {/* + indicator */}
        <circle cx="222" cy="65" r="8" fill="rgba(52,211,153,0.2)" stroke="rgba(52,211,153,0.7)" strokeWidth="1.2" />
        <text x="222" y="69" textAnchor="middle" fontFamily="monospace" fontSize="12" fill="rgba(52,211,153,0.9)" fontWeight="bold">+</text>
        <text x="238" y="69" fontFamily="monospace" fontSize="10" fill="rgba(52,211,153,0.6)">new row inserted</text>
        {/* Divider line */}
        <line x1="6" y1="56" x2="190" y2="56" stroke="rgba(52,211,153,0.2)" strokeWidth="1" />
        <line x1="6" y1="42" x2="190" y2="42" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      </g>

      {/* Panel 2: READ — top right */}
      <g transform="translate(395, 14)">
        <rect x="0" y="0" width="365" height="90" rx="6"
          fill="rgba(0,0,0,0.4)" stroke={`${C}30`} strokeWidth="1.2" />
        {/* Label */}
        <rect x="0" y="0" width="50" height="20" rx="6" fill={`${C}18`} />
        <text x="25" y="14" textAnchor="middle" fontFamily="monospace" fontSize="11" fill={C} fontWeight="bold">READ</text>
        {/* SQL */}
        <text x="60" y="14" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.35)">SELECT * FROM users WHERE id = 1</text>
        {/* Mini table header */}
        <text x="12" y="36" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.4)">id</text>
        <text x="60" y="36" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.4)">name</text>
        {/* Rows */}
        {[
          { id: '1', name: 'Alice', highlight: true },
          { id: '2', name: 'Bob', highlight: false },
          { id: '3', name: 'Carol', highlight: false },
        ].map(({ id, name, highlight }, i) => (
          <g key={id}>
            {highlight && (
              <rect x="6" y={39 + i * 18} width="180" height="17" rx="2" fill={`${C}18`} stroke={`${C}40`} strokeWidth="1" />
            )}
            <text x="12" y={51 + i * 18} fontFamily="monospace" fontSize="10" fill={highlight ? C : 'rgba(255,255,255,0.45)'}>{id}</text>
            <text x="60" y={51 + i * 18} fontFamily="monospace" fontSize="10" fill={highlight ? C : 'rgba(255,255,255,0.45)'}>{name}</text>
          </g>
        ))}
        <line x1="6" y1="42" x2="190" y2="42" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <text x="210" y="58" fontFamily="monospace" fontSize="10" fill={`${C}60`}>row fetched</text>
        <text x="210" y="72" fontFamily="monospace" fontSize="10" fill={`${C}40`}>no side effects</text>
      </g>

      {/* Panel 3: UPDATE — bottom left */}
      <g transform="translate(20, 118)">
        <rect x="0" y="0" width="365" height="90" rx="6"
          fill="rgba(0,0,0,0.4)" stroke="rgba(251,191,36,0.3)" strokeWidth="1.2" />
        {/* Label */}
        <rect x="0" y="0" width="66" height="20" rx="6" fill="rgba(251,191,36,0.15)" />
        <text x="33" y="14" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="rgba(251,191,36,0.9)" fontWeight="bold">UPDATE</text>
        {/* SQL */}
        <text x="76" y="14" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.35)">UPDATE users SET name='Bob' WHERE id=1</text>
        {/* Before row */}
        <text x="12" y="36" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.4)">before</text>
        <rect x="6" y="39" width="110" height="17" rx="2" fill="rgba(255,255,255,0.05)" />
        <text x="12" y="51" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.5)">1</text>
        <text x="30" y="51" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.5)">Alice</text>
        {/* Arrow */}
        <text x="128" y="51" fontFamily="monospace" fontSize="14" fill="rgba(251,191,36,0.8)">→</text>
        {/* After row */}
        <text x="152" y="36" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.4)">after</text>
        <rect x="146" y="39" width="110" height="17" rx="2" fill="rgba(251,191,36,0.12)" stroke="rgba(251,191,36,0.4)" strokeWidth="1" />
        <text x="152" y="51" fontFamily="monospace" fontSize="10" fill="rgba(251,191,36,0.9)">1</text>
        <text x="170" y="51" fontFamily="monospace" fontSize="10" fill="rgba(251,191,36,0.9)">Bob</text>
        {/* Note */}
        <text x="268" y="46" fontFamily="monospace" fontSize="10" fill="rgba(251,191,36,0.5)">value</text>
        <text x="268" y="58" fontFamily="monospace" fontSize="10" fill="rgba(251,191,36,0.5)">changed</text>
        <line x1="6" y1="42" x2="116" y2="42" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <line x1="146" y1="42" x2="256" y2="42" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      </g>

      {/* Panel 4: DELETE — bottom right */}
      <g transform="translate(395, 118)">
        <rect x="0" y="0" width="365" height="90" rx="6"
          fill="rgba(0,0,0,0.4)" stroke="rgba(248,113,113,0.3)" strokeWidth="1.2" />
        {/* Label */}
        <rect x="0" y="0" width="62" height="20" rx="6" fill="rgba(248,113,113,0.15)" />
        <text x="31" y="14" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="rgba(248,113,113,0.9)" fontWeight="bold">DELETE</text>
        {/* SQL */}
        <text x="72" y="14" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.35)">DELETE FROM users WHERE id = 1</text>
        {/* Mini table header */}
        <text x="12" y="36" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.4)">id</text>
        <text x="60" y="36" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.4)">name</text>
        {/* Row to delete — crossed out */}
        <rect x="6" y="39" width="180" height="17" rx="2" fill="rgba(248,113,113,0.1)" stroke="rgba(248,113,113,0.35)" strokeWidth="1" />
        <text x="12" y="51" fontFamily="monospace" fontSize="10" fill="rgba(248,113,113,0.7)">1</text>
        <text x="60" y="51" fontFamily="monospace" fontSize="10" fill="rgba(248,113,113,0.7)">Alice</text>
        {/* Strikethrough line */}
        <line x1="8" y1="48" x2="184" y2="48" stroke="rgba(248,113,113,0.6)" strokeWidth="1.5" />
        {/* − indicator */}
        <circle cx="222" cy="48" r="8" fill="rgba(248,113,113,0.15)" stroke="rgba(248,113,113,0.6)" strokeWidth="1.2" />
        <text x="222" y="52" textAnchor="middle" fontFamily="monospace" fontSize="14" fill="rgba(248,113,113,0.9)" fontWeight="bold">−</text>
        <text x="238" y="51" fontFamily="monospace" fontSize="10" fill="rgba(248,113,113,0.6)">row removed</text>
        {/* Remaining rows */}
        <text x="12" y="70" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.4)">2</text>
        <text x="60" y="70" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.4)">Bob</text>
        <line x1="6" y1="42" x2="190" y2="42" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      </g>
    </svg>
  )
}
