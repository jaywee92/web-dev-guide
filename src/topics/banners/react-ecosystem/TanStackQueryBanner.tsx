export default function TanStackQueryBanner() {
  const C = '#f43f5e'

  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-tq" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-tq" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.07" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-tq)" />
      <rect width="780" height="220" fill="url(#glow-tq)" />

      {/* LEFT: No cache — repeated fetches */}
      <text x="20" y="18" fill="#f43f5e80" fontSize="9" fontFamily="monospace" fontWeight="700">WITHOUT CACHE</text>
      {[
        { label: 'visit /posts', arrow: '→ fetch' },
        { label: 'visit /posts/1', arrow: '→ fetch' },
        { label: 'back to /posts', arrow: '→ fetch AGAIN 😩' },
      ].map(({ label, arrow }, i) => (
        <g key={i}>
          <rect x="20" y={26 + i * 48} width="174" height="34" rx="4" fill="rgba(244,63,94,0.06)" stroke="rgba(244,63,94,0.2)" strokeWidth="1" />
          <text x="30" y={42 + i * 48} fontSize="9" fontFamily="monospace" fill="rgba(255,255,255,0.55)">{label}</text>
          <text x="30" y={54 + i * 48} fontSize="8" fontFamily="monospace" fill="#f43f5e70">{arrow}</text>
        </g>
      ))}

      {/* Divider */}
      <line x1="208" y1="10" x2="208" y2="210" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* CENTER: QueryClient cache diagram */}
      <text x="390" y="18" fill={`${C}90`} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="700">TANSTACK QUERY CACHE</text>

      {/* QueryClient box */}
      <rect x="240" y="26" width="300" height="32" rx="5" fill={`${C}12`} stroke={`${C}40`} strokeWidth="1.5" />
      <text x="390" y="46" fontSize="11" fontFamily="monospace" fill={C} textAnchor="middle" fontWeight="700">QueryClient</text>

      {/* Cache entries */}
      {[
        { key: "['posts']",      status: 'fresh',  color: '#34d399' },
        { key: "['post', 1]",    status: 'fresh',  color: '#34d399' },
        { key: "['user', 'me']", status: 'stale',  color: '#fbbf24' },
      ].map(({ key, status, color }, i) => (
        <g key={key}>
          <rect x="240" y={68 + i * 32} width="300" height="24" rx="3" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <text x="252" y={84 + i * 32} fontSize="9" fontFamily="monospace" fill="rgba(255,255,255,0.65)">{key}</text>
          <rect x="484" y={70 + i * 32} width="48" height="18" rx="9" fill={`${color}20`} />
          <text x="508" y={82 + i * 32} fontSize="8" fontFamily="monospace" fill={color} textAnchor="middle">{status}</text>
        </g>
      ))}

      {/* staleTime note */}
      <rect x="240" y="172" width="300" height="22" rx="4" fill="rgba(0,0,0,0.2)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <text x="390" y="186" fontSize="8" fontFamily="monospace" fill="rgba(255,255,255,0.4)" textAnchor="middle">staleTime — controls fresh → stale transition</text>

      {/* Divider */}
      <line x1="558" y1="10" x2="558" y2="210" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* RIGHT: mutation + invalidate cycle */}
      <text x="670" y="18" fill={`${C}70`} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="700">MUTATION CYCLE</text>

      {[
        { label: 'mutate(data)',          color: C },
        { label: 'onSuccess callback',    color: '#fbbf24' },
        { label: 'invalidateQueries()',   color: '#a78bfa' },
        { label: 'auto refetch ⚡',       color: '#34d399' },
      ].map(({ label, color }, i) => (
        <g key={label}>
          <rect x="572" y={26 + i * 44} width="196" height="30" rx="4" fill={`${color}10`} stroke={`${color}30`} strokeWidth="1" />
          <text x="670" y={45 + i * 44} fontSize="9" fontFamily="monospace" fill={color} textAnchor="middle">{label}</text>
          {i < 3 && (
            <polygon points={`666,${58 + i * 44} 670,${64 + i * 44} 674,${58 + i * 44}`} fill={`${color}50`} />
          )}
        </g>
      ))}

      <text x="390" y="210" fill={`${C}30`} fontSize="9" fontFamily="monospace" textAnchor="middle">QueryClient · useQuery · staleTime · background refetch · useMutation · invalidateQueries</text>
    </svg>
  )
}
