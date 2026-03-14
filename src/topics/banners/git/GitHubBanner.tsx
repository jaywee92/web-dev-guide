export default function GitHubBanner() {
  const C = '#2dd4bf'
  return (
    <svg
      width="100%"
      viewBox="0 0 780 220"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', background: '#07101a' }}
    >
      <defs>
        <pattern id="dots-github" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-github" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-github)" />
      <rect width="780" height="220" fill="url(#glow-github)" />

      {/* Title */}
      <text x="390" y="18" textAnchor="middle" fontFamily="monospace" fontSize="11" fill={`${C}99`}>GitHub — repository lifecycle</text>

      {/* Local Repo box */}
      <rect x="28" y="60" width="120" height="80" rx="4" fill={`${C}10`} stroke={C} strokeWidth="1.4" />
      {/* cylinder icon */}
      <ellipse cx="60" cy="86" rx="12" ry="5" fill="none" stroke={`${C}cc`} strokeWidth="1.2" />
      <line x1="48" y1="86" x2="48" y2="102" stroke={`${C}cc`} strokeWidth="1.2" />
      <line x1="72" y1="86" x2="72" y2="102" stroke={`${C}cc`} strokeWidth="1.2" />
      <ellipse cx="60" cy="102" rx="12" ry="5" fill="none" stroke={`${C}cc`} strokeWidth="1.2" />
      <text x="92" y="93" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.8)">Local</text>
      <text x="92" y="107" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.8)">Repo</text>
      <text x="88" y="152" textAnchor="middle" fontFamily="monospace" fontSize="9" fill={`${C}55`}>on your machine</text>

      {/* Arrow: git push */}
      <line x1="150" y1="100" x2="218" y2="100" stroke={`${C}88`} strokeWidth="1.5" />
      <polygon points="218,96 226,100 218,104" fill={`${C}88`} />
      <text x="184" y="92" textAnchor="middle" fontFamily="monospace" fontSize="9" fill={`${C}99`}>git push</text>

      {/* GitHub cloud box */}
      <rect x="228" y="50" width="150" height="100" rx="6" fill={`${C}10`} stroke={C} strokeWidth="1.6" />
      {/* Octocat-like simple face */}
      <circle cx="263" cy="86" r="18" fill="none" stroke={`${C}cc`} strokeWidth="1.2" />
      {/* eyes */}
      <circle cx="257" cy="83" r="2.5" fill={`${C}cc`} />
      <circle cx="269" cy="83" r="2.5" fill={`${C}cc`} />
      {/* mouth */}
      <path d="M257,91 Q263,96 269,91" fill="none" stroke={`${C}cc`} strokeWidth="1.2" />
      {/* tentacle ears */}
      <path d="M245,86 Q240,80 244,74" fill="none" stroke={`${C}99`} strokeWidth="1" />
      <path d="M281,86 Q286,80 282,74" fill="none" stroke={`${C}99`} strokeWidth="1" />
      <text x="303" y="80" fontFamily="monospace" fontSize="11" fontWeight="bold" fill={C}>GitHub</text>
      {/* star and fork counts */}
      <text x="293" y="96" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.7)">★ 42</text>
      <text x="293" y="112" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.7)">⎇ 7</text>
      <text x="303" y="162" textAnchor="middle" fontFamily="monospace" fontSize="9" fill={`${C}55`}>origin remote</text>

      {/* Arrow: Pull Request */}
      <line x1="380" y1="100" x2="448" y2="100" stroke={`${C}88`} strokeWidth="1.5" />
      <polygon points="448,96 456,100 448,104" fill={`${C}88`} />
      <text x="418" y="90" textAnchor="middle" fontFamily="monospace" fontSize="8" fill={`${C}99`}>Pull</text>
      <text x="418" y="100" textAnchor="middle" fontFamily="monospace" fontSize="8" fill={`${C}99`}>Request</text>

      {/* PR diff box */}
      <rect x="458" y="55" width="140" height="90" rx="4" fill="#0f1f2e" stroke={`${C}66`} strokeWidth="1.2" />
      <text x="528" y="73" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}88`}>PR #12</text>
      <line x1="458" y1="78" x2="598" y2="78" stroke={`${C}33`} strokeWidth="1" />
      {/* diff lines */}
      <text x="468" y="93" fontFamily="monospace" fontSize="10" fill="#22c55e">+ add login route</text>
      <text x="468" y="107" fontFamily="monospace" fontSize="10" fill="#22c55e">+ validate tokens</text>
      <text x="468" y="121" fontFamily="monospace" fontSize="10" fill="#ef4444">- old auth method</text>
      <text x="468" y="135" fontFamily="monospace" fontSize="10" fill="#ef4444">- deprecated call</text>
      <text x="528" y="155" textAnchor="middle" fontFamily="monospace" fontSize="9" fill={`${C}55`}>code review</text>

      {/* Arrow: Merge */}
      <line x1="600" y1="100" x2="660" y2="100" stroke="#22c55e88" strokeWidth="1.5" />
      <polygon points="660,96 668,100 660,104" fill="#22c55e88" />
      <text x="630" y="92" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#22c55e99">merge</text>

      {/* Main branch circle */}
      <circle cx="700" cy="100" r="24" fill="#22c55e18" stroke="#22c55e" strokeWidth="1.6" />
      <text x="700" y="96" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(255,255,255,0.85)">main</text>
      <text x="700" y="108" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#22c55e">✓ merged</text>
      <text x="700" y="140" textAnchor="middle" fontFamily="monospace" fontSize="9" fill={`${C}55`}>updated</text>
    </svg>
  )
}
