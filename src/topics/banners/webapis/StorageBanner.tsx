export default function StorageBanner() {
  const C = '#a78bfa'

  return (
    <svg
      width="100%"
      viewBox="0 0 780 220"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', background: '#07101a' }}
    >
      <defs>
        <pattern id="dots-storage" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}1a`} />
        </pattern>
        <radialGradient id="glow-storage" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-storage)" />
      <rect width="780" height="220" fill="url(#glow-storage)" />

      {/* === localStorage box (left) === */}
      <rect x="12" y="14" width="234" height="188" rx="8" fill={`${C}0d`} stroke={C} strokeWidth="1.5" />

      {/* Title */}
      <text x="129" y="34" textAnchor="middle" fontFamily="monospace" fontSize="12" fill={C} fontWeight="bold">localStorage</text>

      {/* Persistent disk icon */}
      <rect x="106" y="40" width="46" height="34" rx="4" fill={`${C}18`} stroke={`${C}70`} strokeWidth="1" />
      <line x1="106" y1="50" x2="152" y2="50" stroke={`${C}60`} strokeWidth="1" />
      <line x1="106" y1="60" x2="152" y2="60" stroke={`${C}60`} strokeWidth="1" />
      <line x1="106" y1="70" x2="152" y2="70" stroke={`${C}60`} strokeWidth="1" />

      {/* API labels */}
      <rect x="20" y="82" width="198" height="16" rx="3" fill={`${C}12`} stroke={`${C}40`} strokeWidth="1" />
      <text x="119" y="94" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}cc`}>setItem(key, value)</text>
      <rect x="20" y="102" width="198" height="16" rx="3" fill={`${C}12`} stroke={`${C}40`} strokeWidth="1" />
      <text x="119" y="114" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}cc`}>getItem(key)</text>

      {/* Key-value example */}
      <rect x="20" y="126" width="198" height="28" rx="4" fill="#ffffff0a" stroke={`${C}30`} strokeWidth="1" />
      <text x="119" y="138" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}aa`}>"theme"</text>
      <text x="119" y="150" textAnchor="middle" fontFamily="monospace" fontSize="11" fill={C}>→  "dark"</text>

      {/* Annotation */}
      <rect x="20" y="162" width="198" height="14" rx="3" fill={`${C}0a`} />
      <text x="119" y="173" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}80`}>persists across sessions</text>

      {/* === sessionStorage box (center) === */}
      <rect x="274" y="14" width="232" height="188" rx="8" fill={`${C}0d`} stroke={`${C}bb`} strokeWidth="1.5" />

      {/* Title */}
      <text x="390" y="34" textAnchor="middle" fontFamily="monospace" fontSize="12" fill={C} fontWeight="bold">sessionStorage</text>

      {/* Tab icon */}
      <rect x="367" y="40" width="46" height="34" rx="4" fill={`${C}18`} stroke={`${C}70`} strokeWidth="1" />
      <rect x="367" y="40" width="22" height="10" rx="2" fill={`${C}40`} stroke={`${C}80`} strokeWidth="1" />
      <text x="378" y="50" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}cc`}>tab</text>

      {/* API labels */}
      <rect x="282" y="82" width="198" height="16" rx="3" fill={`${C}12`} stroke={`${C}40`} strokeWidth="1" />
      <text x="381" y="94" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}cc`}>setItem(key, value)</text>
      <rect x="282" y="102" width="198" height="16" rx="3" fill={`${C}12`} stroke={`${C}40`} strokeWidth="1" />
      <text x="381" y="114" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}cc`}>getItem(key)</text>

      {/* Key-value example */}
      <rect x="282" y="126" width="198" height="28" rx="4" fill="#ffffff0a" stroke={`${C}30`} strokeWidth="1" />
      <text x="381" y="138" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}aa`}>"formStep"</text>
      <text x="381" y="150" textAnchor="middle" fontFamily="monospace" fontSize="11" fill={C}>→  "2"</text>

      {/* Annotation */}
      <rect x="282" y="162" width="198" height="14" rx="3" fill={`${C}0a`} />
      <text x="381" y="173" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}80`}>cleared on tab close</text>

      {/* === Cookie box (right) === */}
      <rect x="534" y="14" width="234" height="188" rx="8" fill={`${C}0d`} stroke={`${C}aa`} strokeWidth="1.5" />

      {/* Title */}
      <text x="651" y="34" textAnchor="middle" fontFamily="monospace" fontSize="12" fill={C} fontWeight="bold">Cookie</text>

      {/* Envelope icon */}
      <rect x="628" y="40" width="46" height="32" rx="3" fill={`${C}18`} stroke={`${C}70`} strokeWidth="1" />
      <polyline points="628,40 651,58 674,40" fill="none" stroke={`${C}80`} strokeWidth="1" />

      {/* Flag chips */}
      <rect x="542" y="80" width="56" height="14" rx="7" fill={`${C}20`} stroke={`${C}60`} strokeWidth="1" />
      <text x="570" y="91" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}cc`}>expires</text>
      <rect x="604" y="80" width="56" height="14" rx="7" fill={`${C}20`} stroke={`${C}60`} strokeWidth="1" />
      <text x="632" y="91" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}cc`}>httpOnly</text>
      <rect x="666" y="80" width="56" height="14" rx="7" fill={`${C}20`} stroke={`${C}60`} strokeWidth="1" />
      <text x="694" y="91" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}cc`}>Secure</text>

      {/* API labels */}
      <rect x="542" y="102" width="214" height="16" rx="3" fill={`${C}12`} stroke={`${C}40`} strokeWidth="1" />
      <text x="649" y="114" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}cc`}>document.cookie = "k=v; path=/"</text>

      {/* Key-value example */}
      <rect x="542" y="126" width="214" height="28" rx="4" fill="#ffffff0a" stroke={`${C}30`} strokeWidth="1" />
      <text x="649" y="138" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}aa`}>"session"</text>
      <text x="649" y="150" textAnchor="middle" fontFamily="monospace" fontSize="11" fill={C}>→  "abc123"</text>

      {/* Annotation */}
      <rect x="542" y="162" width="214" height="14" rx="3" fill={`${C}0a`} />
      <text x="649" y="173" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}80`}>sent with HTTP requests</text>

      {/* Footer label */}
      <text x="390" y="212" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}50`}>
        Web Storage API · localStorage · sessionStorage · Cookies
      </text>
    </svg>
  )
}
