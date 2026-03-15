export default function PromisesBanner() {
  const YELLOW = '#fbbf24'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-pm" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${YELLOW}15`} />
        </pattern>
        <radialGradient id="glow-pm" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={YELLOW} stopOpacity="0.05" />
          <stop offset="100%" stopColor={YELLOW} stopOpacity="0" />
        </radialGradient>
        <marker id="arrow-pm" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill={`${YELLOW}80`} />
        </marker>
      </defs>
      <rect width="780" height="220" fill="url(#dots-pm)" />
      <rect width="780" height="220" fill="url(#glow-pm)" />

      {/* === PENDING === */}
      <circle cx="120" cy="90" r="38" fill={`${YELLOW}06`} stroke={`${YELLOW}60`} strokeWidth="1.5" strokeDasharray="6 3" />
      <text x="120" y="85" fill={`${YELLOW}cc`} fontSize="9.5" fontFamily="monospace" textAnchor="middle" fontWeight="700">Promise</text>
      <text x="120" y="100" fill={`${YELLOW}70`} fontSize="9" fontFamily="monospace" textAnchor="middle">⏳ pending</text>
      <text x="120" y="148" fill={`${YELLOW}45`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">initial state</text>

      {/* arrow to fulfilled */}
      <line x1="160" y1="78" x2="268" y2="60" stroke={`${YELLOW}60`} strokeWidth="1.2" markerEnd="url(#arrow-pm)" />
      <text x="210" y="62" fill={`${YELLOW}50`} fontSize="8" fontFamily="monospace" textAnchor="middle">.then()</text>

      {/* arrow to rejected */}
      <line x1="160" y1="102" x2="268" y2="130" stroke="rgba(239,68,68,0.55)" strokeWidth="1.2" markerEnd="url(#arrow-pm)" />
      <text x="210" y="128" fill="rgba(239,68,68,0.55)" fontSize="8" fontFamily="monospace" textAnchor="middle">.catch()</text>

      {/* === FULFILLED === */}
      <circle cx="320" cy="52" r="34" fill={`${YELLOW}10`} stroke={`${YELLOW}70`} strokeWidth="1.5" />
      <text x="320" y="46" fill={`${YELLOW}dd`} fontSize="9.5" fontFamily="monospace" textAnchor="middle" fontWeight="700">✓</text>
      <text x="320" y="60" fill={`${YELLOW}aa`} fontSize="9" fontFamily="monospace" textAnchor="middle">fulfilled</text>
      <text x="320" y="100" fill={`${YELLOW}45`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">resolved value</text>

      {/* === REJECTED === */}
      <circle cx="320" cy="142" r="34" fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.55)" strokeWidth="1.5" />
      <text x="320" y="136" fill="rgba(239,68,68,0.9)" fontSize="9.5" fontFamily="monospace" textAnchor="middle" fontWeight="700">✕</text>
      <text x="320" y="150" fill="rgba(239,68,68,0.7)" fontSize="9" fontFamily="monospace" textAnchor="middle">rejected</text>
      <text x="320" y="190" fill="rgba(239,68,68,0.4)" fontSize="8.5" fontFamily="monospace" textAnchor="middle">error reason</text>

      {/* === async/await code box === */}
      <rect x="420" y="30" width="330" height="88" rx="7" fill={`${YELLOW}07`} stroke={`${YELLOW}30`} strokeWidth="1.2" />
      <text x="436" y="50" fill={`${YELLOW}55`} fontSize="8.5" fontFamily="monospace">async / await</text>
      <text x="436" y="68" fill={`${YELLOW}dd`} fontSize="9.5" fontFamily="monospace">async function load() {'{'}</text>
      <text x="452" y="84" fill={`${YELLOW}cc`} fontSize="9.5" fontFamily="monospace">const data = await fetch(...)</text>
      <text x="436" y="100" fill={`${YELLOW}dd`} fontSize="9.5" fontFamily="monospace">{'}'}</text>

      {/* === Promise chaining note === */}
      <rect x="420" y="136" width="330" height="62" rx="7" fill={`${YELLOW}05`} stroke={`${YELLOW}22`} strokeWidth="1.2" />
      <text x="436" y="155" fill={`${YELLOW}45`} fontSize="8.5" fontFamily="monospace">chaining</text>
      <text x="436" y="172" fill={`${YELLOW}cc`} fontSize="9.5" fontFamily="monospace">fetch(url).then(r =&gt; r.json())</text>
      <text x="452" y="188" fill={`${YELLOW}99`} fontSize="9.5" fontFamily="monospace">.then(data =&gt; use(data))</text>
    </svg>
  )
}
