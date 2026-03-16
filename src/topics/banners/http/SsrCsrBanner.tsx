export default function SsrCsrBanner() {
  const C = '#fb923c'
  const ssrColor = '#60a5fa'
  const csrColor = '#a78bfa'

  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-ssrcsr" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-ssrcsr" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.05" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-ssrcsr)" />
      <rect width="780" height="220" fill="url(#glow-ssrcsr)" />

      {/* Center divider */}
      <line x1="390" y1="10" x2="390" y2="210" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />

      {/* SSR side */}
      <text x="195" y="22" fill={`${ssrColor}99`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="700">SERVER-SIDE RENDERING</text>

      {/* Server box */}
      <rect x="40" y="32" width="110" height="56" rx="6" fill={`${ssrColor}15`} stroke={`${ssrColor}50`} strokeWidth="1.2" />
      <text x="95" y="56" fill={ssrColor} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="700">SERVER</text>
      <text x="95" y="72" fill={`${ssrColor}80`} fontSize="9" fontFamily="monospace" textAnchor="middle">builds HTML</text>
      <text x="95" y="82" fill={`${ssrColor}60`} fontSize="8" fontFamily="monospace" textAnchor="middle">per request</text>

      {/* Arrow: server → browser */}
      <line x1="152" y1="60" x2="215" y2="60" stroke={`${ssrColor}60`} strokeWidth="1.5" strokeDasharray="4 3" />
      <polygon points="215,56 223,60 215,64" fill={`${ssrColor}60`} />
      <text x="183" y="54" fill={`${ssrColor}60`} fontSize="8" fontFamily="monospace" textAnchor="middle">full HTML</text>

      {/* Browser box SSR */}
      <rect x="222" y="32" width="140" height="120" rx="6" fill="rgba(0,0,0,0.4)" stroke={`${ssrColor}30`} strokeWidth="1.2" />
      <rect x="222" y="32" width="140" height="18" rx="6" fill={`${ssrColor}18`} />
      <rect x="222" y="43" width="140" height="7" fill={`${ssrColor}18`} />
      <text x="292" y="44" fill={`${ssrColor}70`} fontSize="8" fontFamily="monospace" textAnchor="middle">browser</text>
      {/* HTML content lines */}
      {[58, 72, 86, 100, 114, 128].map((y, i) => (
        <rect key={y} x="234" y={y} width={60 + (i % 3) * 20} height="7" rx="2" fill={`${ssrColor}${i < 2 ? '40' : '20'}`} />
      ))}
      <text x="292" y="165" fill={`${ssrColor}50`} fontSize="8" fontFamily="monospace" textAnchor="middle">ready to display</text>

      {/* SSR metrics */}
      {[
        { label: 'First Paint', value: 'Fast', color: '#4ade80' },
        { label: 'SEO', value: 'Excellent', color: '#4ade80' },
        { label: 'Navigation', value: 'Full reload', color: '#fbbf24' },
      ].map(({ label, value, color }, i) => (
        <g key={label}>
          <text x="40" y={130 + i * 18} fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="monospace">{label}</text>
          <text x="200" y={130 + i * 18} fill={color} fontSize="9" fontFamily="monospace" textAnchor="end">{value}</text>
        </g>
      ))}

      {/* CSR side */}
      <text x="585" y="22" fill={`${csrColor}99`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="700">CLIENT-SIDE RENDERING</text>

      {/* Server box CSR */}
      <rect x="405" y="32" width="110" height="56" rx="6" fill={`${csrColor}15`} stroke={`${csrColor}50`} strokeWidth="1.2" />
      <text x="460" y="56" fill={csrColor} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="700">SERVER</text>
      <text x="460" y="72" fill={`${csrColor}80`} fontSize="9" fontFamily="monospace" textAnchor="middle">sends shell</text>
      <text x="460" y="82" fill={`${csrColor}60`} fontSize="8" fontFamily="monospace" textAnchor="middle">+ JS bundle</text>

      {/* Arrow: server → browser CSR */}
      <line x1="517" y1="60" x2="580" y2="60" stroke={`${csrColor}60`} strokeWidth="1.5" strokeDasharray="4 3" />
      <polygon points="580,56 588,60 580,64" fill={`${csrColor}60`} />
      <text x="548" y="54" fill={`${csrColor}60`} fontSize="8" fontFamily="monospace" textAnchor="middle">JS bundle</text>

      {/* Browser box CSR */}
      <rect x="587" y="32" width="150" height="120" rx="6" fill="rgba(0,0,0,0.4)" stroke={`${csrColor}30`} strokeWidth="1.2" />
      <rect x="587" y="32" width="150" height="18" rx="6" fill={`${csrColor}18`} />
      <rect x="587" y="43" width="150" height="7" fill={`${csrColor}18`} />
      <text x="662" y="44" fill={`${csrColor}70`} fontSize="8" fontFamily="monospace" textAnchor="middle">browser (JS executes)</text>
      {/* JS + rendered result */}
      <rect x="599" y="58" width="126" height="34" rx="3" fill={`${csrColor}12`} stroke={`${csrColor}30`} strokeWidth="1" />
      <text x="611" y="72" fill={csrColor} fontSize="9" fontFamily="monospace" fontWeight="700">{'<App />'}</text>
      <text x="611" y="86" fill={`${csrColor}60`} fontSize="8" fontFamily="monospace">renders DOM</text>
      {/* Arrow down */}
      <line x1="662" y1="94" x2="662" y2="108" stroke={`${csrColor}50`} strokeWidth="1.5" />
      <polygon points="658,108 662,114 666,108" fill={`${csrColor}50`} />
      {[116, 130].map((y, i) => (
        <rect key={y} x="599" y={y} width={60 + i * 22} height="7" rx="2" fill={`${csrColor}25`} />
      ))}
      <text x="662" y="165" fill={`${csrColor}50`} fontSize="8" fontFamily="monospace" textAnchor="middle">hydrated UI</text>

      {/* CSR metrics */}
      {[
        { label: 'First Paint', value: 'Slow', color: '#f87171' },
        { label: 'SEO', value: 'Needs config', color: '#fbbf24' },
        { label: 'Navigation', value: 'Instant', color: '#4ade80' },
      ].map(({ label, value, color }, i) => (
        <g key={label}>
          <text x="405" y={130 + i * 18} fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="monospace">{label}</text>
          <text x="735" y={130 + i * 18} fill={color} fontSize="9" fontFamily="monospace" textAnchor="end">{value}</text>
        </g>
      ))}

      {/* Bottom label */}
      <text x="390" y="208" fill={`${C}35`} fontSize="9" fontFamily="monospace" textAnchor="middle">SSR · CSR · SSG · ISR · Islands Architecture</text>
    </svg>
  )
}
