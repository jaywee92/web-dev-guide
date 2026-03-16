export default function MutationsBanner() {
  const C = '#f97316'

  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-mu" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-mu" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.07" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-mu)" />
      <rect width="780" height="220" fill="url(#glow-mu)" />

      {/* LEFT: Classic onSubmit */}
      <text x="20" y="18" fill={`${C}70`} fontSize="9" fontFamily="monospace" fontWeight="700">CLASSIC PATTERN</text>
      {[
        { label: '<form onSubmit={fn}>', color: 'rgba(255,255,255,0.6)' },
        { label: 'e.preventDefault()', color: '#f43f5e80' },
        { label: 'fetch("/api", {...})', color: '#60a5fa80' },
        { label: 'setState(result)', color: '#a78bfa80' },
      ].map(({ label, color }, i) => (
        <g key={i}>
          <rect x="20" y={26 + i * 36} width="174" height="26" rx="4" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <text x="30" y={43 + i * 36} fontSize="9" fontFamily="monospace" fill={color}>{label}</text>
          {i < 3 && (
            <line x1="107" y1={52 + i * 36} x2="107" y2={56 + i * 36} stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="2 2" />
          )}
        </g>
      ))}
      <text x="107" y="192" fontSize="8" fontFamily="monospace" fill="rgba(255,255,255,0.3)" textAnchor="middle">manual boilerplate</text>

      {/* Divider */}
      <line x1="208" y1="10" x2="208" y2="210" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* CENTER: React 19 form action */}
      <text x="390" y="18" fill={`${C}90`} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="700">REACT 19  ACTION</text>

      <rect x="224" y="28" width="330" height="40" rx="5" fill={`${C}10`} stroke={`${C}35`} strokeWidth="1.2" />
      <text x="389" y="43" fontSize="10" fontFamily="monospace" fill={C} textAnchor="middle" fontWeight="700">&lt;form action={'{asyncFn}'}›</text>
      <text x="389" y="58" fontSize="9" fontFamily="monospace" fill={`${C}70`} textAnchor="middle">receives FormData automatically</text>

      {/* Arrows down */}
      <line x1="389" y1="70" x2="389" y2="86" stroke={`${C}50`} strokeWidth="1.5" />
      <polygon points="385,86 389,92 393,86" fill={`${C}50`} />

      <rect x="250" y="92" width="280" height="34" rx="4" fill="rgba(0,0,0,0.3)" stroke={`${C}20`} strokeWidth="1" />
      <text x="390" y="105" fontSize="9" fontFamily="monospace" fill="rgba(255,255,255,0.7)" textAnchor="middle">{'async function action(formData) {'}</text>
      <text x="390" y="118" fontSize="9" fontFamily="monospace" fill={`${C}70`} textAnchor="middle">{"  const email = formData.get('email')"}</text>

      <line x1="389" y1="128" x2="389" y2="142" stroke={`${C}50`} strokeWidth="1.5" />
      <polygon points="385,142 389,148 393,142" fill={`${C}50`} />

      {/* useFormStatus */}
      <rect x="270" y="148" width="238" height="32" rx="4" fill={`${C}12`} stroke={`${C}30`} strokeWidth="1" />
      <text x="389" y="162" fontSize="9" fontFamily="monospace" fill={C} textAnchor="middle" fontWeight="700">useFormStatus()</text>
      <text x="389" y="174" fontSize="8" fontFamily="monospace" fill={`${C}60`} textAnchor="middle">{'{ pending } — disable button while running'}</text>

      {/* Divider */}
      <line x1="570" y1="10" x2="570" y2="210" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* RIGHT: useActionState */}
      <text x="675" y="18" fill={`${C}70`} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="700">ERRORS</text>
      <rect x="580" y="26" width="186" height="54" rx="5" fill="rgba(0,0,0,0.3)" stroke={`${C}20`} strokeWidth="1" />
      <text x="673" y="42" fontSize="9" fontFamily="monospace" fill="rgba(255,255,255,0.6)" textAnchor="middle">useActionState(fn, init)</text>
      <text x="673" y="56" fontSize="8" fontFamily="monospace" fill={`${C}60`} textAnchor="middle">(previousState, formData)</text>
      <text x="673" y="68" fontSize="8" fontFamily="monospace" fill={`${C}40`} textAnchor="middle">{'→ { errors: { email: … } }'}</text>

      {[
        { label: 'state.errors.email', note: 'per-field error' },
        { label: 'state.success',      note: 'success flag' },
      ].map(({ label, note }, i) => (
        <g key={label}>
          <rect x="580" y={92 + i * 34} width="186" height="26" rx="3" fill={`${C}08`} stroke={`${C}20`} strokeWidth="0.8" />
          <text x="590" y={106 + i * 34} fontSize="8" fontFamily="monospace" fill={`${C}80`}>{label}</text>
          <text x="590" y={116 + i * 34} fontSize="7" fontFamily="monospace" fill={`${C}45`}>{note}</text>
        </g>
      ))}

      <text x="390" y="210" fill={`${C}30`} fontSize="9" fontFamily="monospace" textAnchor="middle">onSubmit · form action · FormData · useFormStatus · useActionState</text>
    </svg>
  )
}
