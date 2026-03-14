export default function GitCollabSetupBanner() {
  const C = '#2dd4bf'
  return (
    <svg
      width="100%"
      viewBox="0 0 780 220"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', background: '#07101a' }}
    >
      <defs>
        <pattern id="dots-collab" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-collab" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-collab)" />
      <rect width="780" height="220" fill="url(#glow-collab)" />

      {/* Title */}
      <text x="390" y="18" textAnchor="middle" fontFamily="monospace" fontSize="11" fill={`${C}99`}>collaborative git setup — shared remote</text>

      {/* Dev A — left */}
      {/* avatar */}
      <circle cx="80" cy="52" r="18" fill={`${C}18`} stroke={C} strokeWidth="1.4" />
      <circle cx="80" cy="46" r="7" fill={`${C}55`} />
      <path d="M62,68 Q80,58 98,68" fill={`${C}33`} />
      <text x="80" y="82" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={C}>Dev A</text>
      {/* local repo cylinder */}
      <ellipse cx="80" cy="100" rx="22" ry="8" fill="none" stroke={`${C}88`} strokeWidth="1.2" />
      <line x1="58" y1="100" x2="58" y2="116" stroke={`${C}88`} strokeWidth="1.2" />
      <line x1="102" y1="100" x2="102" y2="116" stroke={`${C}88`} strokeWidth="1.2" />
      <ellipse cx="80" cy="116" rx="22" ry="8" fill="none" stroke={`${C}88`} strokeWidth="1.2" />
      <text x="80" y="134" textAnchor="middle" fontFamily="monospace" fontSize="9" fill={`${C}66`}>local repo</text>
      {/* feature branch label */}
      <rect x="40" y="148" width="80" height="16" rx="3" fill="#3b82f618" stroke="#3b82f666" strokeWidth="1" />
      <text x="80" y="159" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#3b82f6">feat/login</text>

      {/* Dev B — center-left */}
      <circle cx="260" cy="52" r="18" fill={`${C}18`} stroke={C} strokeWidth="1.4" />
      <circle cx="260" cy="46" r="7" fill={`${C}55`} />
      <path d="M242,68 Q260,58 278,68" fill={`${C}33`} />
      <text x="260" y="82" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={C}>Dev B</text>
      <ellipse cx="260" cy="100" rx="22" ry="8" fill="none" stroke={`${C}88`} strokeWidth="1.2" />
      <line x1="238" y1="100" x2="238" y2="116" stroke={`${C}88`} strokeWidth="1.2" />
      <line x1="282" y1="100" x2="282" y2="116" stroke={`${C}88`} strokeWidth="1.2" />
      <ellipse cx="260" cy="116" rx="22" ry="8" fill="none" stroke={`${C}88`} strokeWidth="1.2" />
      <text x="260" y="134" textAnchor="middle" fontFamily="monospace" fontSize="9" fill={`${C}66`}>local repo</text>
      <rect x="220" y="148" width="80" height="16" rx="3" fill="#a855f718" stroke="#a855f766" strokeWidth="1" />
      <text x="260" y="159" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#a855f7">feat/search</text>

      {/* Dev C — center-right */}
      <circle cx="440" cy="52" r="18" fill={`${C}18`} stroke={C} strokeWidth="1.4" />
      <circle cx="440" cy="46" r="7" fill={`${C}55`} />
      <path d="M422,68 Q440,58 458,68" fill={`${C}33`} />
      <text x="440" y="82" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={C}>Dev C</text>
      <ellipse cx="440" cy="100" rx="22" ry="8" fill="none" stroke={`${C}88`} strokeWidth="1.2" />
      <line x1="418" y1="100" x2="418" y2="116" stroke={`${C}88`} strokeWidth="1.2" />
      <line x1="462" y1="100" x2="462" y2="116" stroke={`${C}88`} strokeWidth="1.2" />
      <ellipse cx="440" cy="116" rx="22" ry="8" fill="none" stroke={`${C}88`} strokeWidth="1.2" />
      <text x="440" y="134" textAnchor="middle" fontFamily="monospace" fontSize="9" fill={`${C}66`}>local repo</text>
      <rect x="400" y="148" width="80" height="16" rx="3" fill="#f59e0b18" stroke="#f59e0b66" strokeWidth="1" />
      <text x="440" y="159" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#f59e0b">feat/api</text>

      {/* Central GitHub cloud / Remote Repo box */}
      <rect x="560" y="38" width="180" height="130" rx="6" fill={`${C}10`} stroke={C} strokeWidth="1.6" />
      <text x="650" y="58" textAnchor="middle" fontFamily="monospace" fontSize="11" fontWeight="bold" fill={C}>GitHub</text>
      <text x="650" y="72" textAnchor="middle" fontFamily="monospace" fontSize="9" fill={`${C}66`}>Remote Repo</text>
      <line x1="568" y1="78" x2="732" y2="78" stroke={`${C}22`} strokeWidth="1" />

      {/* main branch with shield */}
      <rect x="580" y="86" width="140" height="20" rx="3" fill="#22c55e18" stroke="#22c55e55" strokeWidth="1" />
      {/* shield icon */}
      <path d="M592,90 L598,90 L598,100 Q595,103 592,100 Z" fill="none" stroke="#22c55e" strokeWidth="1.2" />
      <text x="660" y="100" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#22c55e">main  (protected)</text>

      {/* PR arrows from feature branches */}
      <rect x="580" y="114" width="140" height="16" rx="3" fill="#3b82f618" stroke="#3b82f644" strokeWidth="1" />
      <text x="650" y="125" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#3b82f6">PR: feat/login → review req.</text>
      <rect x="580" y="134" width="140" height="16" rx="3" fill="#a855f718" stroke="#a855f744" strokeWidth="1" />
      <text x="650" y="145" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#a855f7">PR: feat/search → review req.</text>
      <rect x="580" y="154" width="140" height="16" rx="3" fill="#f59e0b18" stroke="#f59e0b44" strokeWidth="1" />
      <text x="650" y="165" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#f59e0b">PR: feat/api → review req.</text>

      {/* Arrows from devs to remote */}
      {/* Dev A → remote */}
      <line x1="103" y1="108" x2="555" y2="95" stroke={`${C}44`} strokeWidth="1.2" strokeDasharray="5,3" />
      <polygon points="555,91 563,95 555,99" fill={`${C}44`} />
      {/* Dev B → remote */}
      <line x1="283" y1="108" x2="557" y2="103" stroke={`${C}44`} strokeWidth="1.2" strokeDasharray="5,3" />
      <polygon points="557,99 565,103 557,107" fill={`${C}44`} />
      {/* Dev C → remote */}
      <line x1="463" y1="108" x2="558" y2="108" stroke={`${C}44`} strokeWidth="1.2" strokeDasharray="5,3" />
      <polygon points="558,104 566,108 558,112" fill={`${C}44`} />

      {/* git push label on arrows */}
      <text x="310" y="88" fontFamily="monospace" fontSize="8" fill={`${C}55`}>git push</text>
    </svg>
  )
}
