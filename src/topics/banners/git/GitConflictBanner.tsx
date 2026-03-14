export default function GitConflictBanner() {
  const C = '#2dd4bf'
  return (
    <svg
      width="100%"
      viewBox="0 0 780 220"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', background: '#07101a' }}
    >
      <defs>
        <pattern id="dots-conflict" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-conflict" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-conflict)" />
      <rect width="780" height="220" fill="url(#glow-conflict)" />

      {/* Title */}
      <text x="390" y="18" textAnchor="middle" fontFamily="monospace" fontSize="11" fill={`${C}99`}>merge conflict — detect and resolve</text>

      {/* Main branch horizontal line */}
      <line x1="30" y1="90" x2="740" y2="90" stroke={`${C}44`} strokeWidth="1.5" />
      <text x="26" y="86" textAnchor="end" fontFamily="monospace" fontSize="9" fill={`${C}66`}>main</text>

      {/* commit c1 */}
      <circle cx="80" cy="90" r="10" fill={`${C}22`} stroke={C} strokeWidth="1.4" />
      <text x="80" y="94" textAnchor="middle" fontFamily="monospace" fontSize="8" fill={C}>c1</text>

      {/* commit c2 — branch point */}
      <circle cx="180" cy="90" r="10" fill={`${C}22`} stroke={C} strokeWidth="1.4" />
      <text x="180" y="94" textAnchor="middle" fontFamily="monospace" fontSize="8" fill={C}>c2</text>
      <text x="180" y="108" textAnchor="middle" fontFamily="monospace" fontSize="8" fill={`${C}66`}>branch point</text>

      {/* Branch A — curves up from c2 */}
      <path d="M190,85 Q230,40 280,40" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
      {/* Branch A commit */}
      <circle cx="280" cy="40" r="10" fill="#3b82f622" stroke="#3b82f6" strokeWidth="1.4" />
      <text x="280" y="44" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#3b82f6">A1</text>
      <text x="280" y="26" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#3b82f6">branch-a</text>
      {/* Branch A back to main */}
      <path d="M290,40 Q340,40 380,90" fill="none" stroke="#3b82f666" strokeWidth="1" strokeDasharray="4,3" />

      {/* Branch B — curves down from c2 */}
      <path d="M190,95 Q230,140 280,140" fill="none" stroke="#a855f7" strokeWidth="1.5" />
      {/* Branch B commit */}
      <circle cx="280" cy="140" r="10" fill="#a855f722" stroke="#a855f7" strokeWidth="1.4" />
      <text x="280" y="144" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#a855f7">B1</text>
      <text x="280" y="160" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#a855f7">branch-b</text>
      {/* Branch B back to main */}
      <path d="M290,140 Q340,140 380,90" fill="none" stroke="#a855f766" strokeWidth="1" strokeDasharray="4,3" />

      {/* Conflict point on main */}
      <circle cx="380" cy="90" r="12" fill="#ef444422" stroke="#ef4444" strokeWidth="1.6" />
      <text x="380" y="94" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#ef4444">⚡</text>
      <text x="380" y="116" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#ef444499">conflict!</text>

      {/* Conflict marker code box */}
      <rect x="400" y="28" width="200" height="120" rx="4" fill="#0f1520" stroke="#ef444466" strokeWidth="1.2" />
      <text x="500" y="44" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#ef444488">CONFLICT: same file</text>
      <line x1="408" y1="50" x2="592" y2="50" stroke="#ef444433" strokeWidth="1" />
      <text x="412" y="66" fontFamily="monospace" fontSize="9" fill="#3b82f6">{'<<<<<<< HEAD'}</text>
      <text x="412" y="80" fontFamily="monospace" fontSize="9" fill="#3b82f6aa">{'  feature-A change'}</text>
      <text x="412" y="94" fontFamily="monospace" fontSize="9" fill={`${C}55`}>{'======='}</text>
      <text x="412" y="108" fontFamily="monospace" fontSize="9" fill="#a855f7aa">{'  feature-B change'}</text>
      <text x="412" y="122" fontFamily="monospace" fontSize="9" fill="#a855f7">{'>>>>>>> feature-b'}</text>
      <text x="500" y="142" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgba(255,255,255,0.4)">edit to resolve, then commit</text>

      {/* Resolution arrow */}
      <line x1="605" y1="88" x2="650" y2="88" stroke="#22c55e88" strokeWidth="1.5" />
      <polygon points="650,84 658,88 650,92" fill="#22c55e88" />
      <text x="627" y="80" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#22c55e88">resolve</text>

      {/* Resolved commit */}
      <circle cx="680" cy="90" r="16" fill="#22c55e18" stroke="#22c55e" strokeWidth="1.6" />
      <text x="680" y="87" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#22c55e">merge</text>
      <text x="680" y="99" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#22c55e">commit</text>
      <text x="680" y="116" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#22c55e99">Resolved ✓</text>

      {/* connect resolved back to main line */}
      <line x1="696" y1="90" x2="740" y2="90" stroke="#22c55e55" strokeWidth="1.5" />
    </svg>
  )
}
