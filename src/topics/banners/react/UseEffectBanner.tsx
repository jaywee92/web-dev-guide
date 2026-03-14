export default function UseEffectBanner() {
  const C = '#61dafb'
  const GREEN = '#4ade80'
  const RED = '#f87171'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-ue" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-ue" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-ue)" />
      <rect width="780" height="220" fill="url(#glow-ue)" />

      {/* Title */}
      <text x="390" y="18" fill={`${C}55`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="600">useEffect dependency patterns</text>

      {/* Timeline baseline: x=60 to x=720 */}
      {/* Row labels */}
      <text x="59" y="56" fill={`${C}88`} fontSize="10" fontFamily="monospace" textAnchor="end">[]</text>
      <text x="59" y="112" fill={`${C}88`} fontSize="10" fontFamily="monospace" textAnchor="end">[dep]</text>
      <text x="59" y="168" fill={`${C}88`} fontSize="10" fontFamily="monospace" textAnchor="end">—</text>

      {/* Row 1 timeline: [] — mount only */}
      <line x1="62" y1="52" x2="720" y2="52" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      {/* Effect at mount (x=80) */}
      <polygon points="80,44 90,58 70,58" fill={GREEN} opacity="0.9" />
      {/* Cleanup at unmount (x=680) */}
      <rect x="671" y="44" width="16" height="16" rx="2" fill={RED} opacity="0.85" />
      {/* Label */}
      <text x="390" y="70" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="monospace" textAnchor="middle">runs once</text>
      {/* Mount / Unmount labels */}
      <text x="80" y="42" fill={`${GREEN}88`} fontSize="8" fontFamily="monospace" textAnchor="middle">mount</text>
      <text x="679" y="42" fill={`${RED}88`} fontSize="8" fontFamily="monospace" textAnchor="middle">unmount</text>

      {/* Row 2 timeline: [dep] — mount + dep change */}
      <line x1="62" y1="108" x2="720" y2="108" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      {/* Effect markers */}
      <polygon points="80,100 90,114 70,114" fill={GREEN} opacity="0.9" />
      <polygon points="280,100 290,114 270,114" fill={GREEN} opacity="0.75" />
      <polygon points="480,100 490,114 470,114" fill={GREEN} opacity="0.6" />
      {/* Cleanup markers between effects */}
      <rect x="176" y="100" width="14" height="14" rx="2" fill={RED} opacity="0.6" />
      <rect x="376" y="100" width="14" height="14" rx="2" fill={RED} opacity="0.5" />
      {/* Label */}
      <text x="390" y="128" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="monospace" textAnchor="middle">runs on dep change</text>
      {/* dep change markers */}
      <line x1="280" y1="108" x2="280" y2="136" stroke={`${C}22`} strokeWidth="1" strokeDasharray="2 2" />
      <line x1="480" y1="108" x2="480" y2="136" stroke={`${C}22`} strokeWidth="1" strokeDasharray="2 2" />
      <text x="280" y="146" fill={`${C}44`} fontSize="8" fontFamily="monospace" textAnchor="middle">dep changed</text>
      <text x="480" y="146" fill={`${C}44`} fontSize="8" fontFamily="monospace" textAnchor="middle">dep changed</text>

      {/* Row 3 timeline: no array — every render */}
      <line x1="62" y1="164" x2="720" y2="164" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      {/* Effect markers at every render */}
      <polygon points="80,156 90,170 70,170" fill={GREEN} opacity="0.9" />
      <polygon points="180,156 190,170 170,170" fill={GREEN} opacity="0.78" />
      <polygon points="280,156 290,170 270,170" fill={GREEN} opacity="0.66" />
      <polygon points="380,156 390,170 370,170" fill={GREEN} opacity="0.54" />
      <polygon points="480,156 490,170 470,170" fill={GREEN} opacity="0.42" />
      {/* Cleanup between */}
      <rect x="126" y="156" width="12" height="12" rx="1" fill={RED} opacity="0.5" />
      <rect x="226" y="156" width="12" height="12" rx="1" fill={RED} opacity="0.45" />
      <rect x="326" y="156" width="12" height="12" rx="1" fill={RED} opacity="0.4" />
      <rect x="426" y="156" width="12" height="12" rx="1" fill={RED} opacity="0.35" />
      {/* Label */}
      <text x="390" y="186" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="monospace" textAnchor="middle">runs every render</text>
      {/* More dots hint */}
      <text x="590" y="168" fill={`${GREEN}44`} fontSize="13" fontFamily="monospace">· · ·</text>

      {/* Legend */}
      <polygon points="700,198 708,212 692,212" fill={GREEN} opacity="0.8" />
      <text x="714" y="209" fill={`${GREEN}99`} fontSize="9" fontFamily="monospace">effect</text>
      <rect x="700" y="196" width="0" height="0" />
      <rect x="660" y="200" width="12" height="12" rx="2" fill={RED} opacity="0.75" />
      <text x="676" y="210" fill={`${RED}99`} fontSize="9" fontFamily="monospace">cleanup</text>
    </svg>
  )
}
