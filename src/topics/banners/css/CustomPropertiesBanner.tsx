export default function CustomPropertiesBanner() {
  const C = '#a78bfa'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-cp" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-cp" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-cp)" />
      <rect width="780" height="220" fill="url(#glow-cp)" />

      {/* LEFT: :root block */}
      <rect x="30" y="30" width="200" height="140" rx="6"
        fill="rgba(167,139,250,0.06)" stroke="rgba(167,139,250,0.5)" strokeWidth="1.5" />
      <text x="40" y="52" fontFamily="monospace" fontSize="12" fill="rgba(167,139,250,0.9)">:root {'{'}</text>
      <text x="52" y="76" fontFamily="monospace" fontSize="11" fill="rgba(167,139,250,0.75)">--primary:</text>
      <text x="140" y="76" fontFamily="monospace" fontSize="11" fill="rgba(167,139,250,0.9)">#a78bfa</text>
      <text x="52" y="100" fontFamily="monospace" fontSize="11" fill="rgba(167,139,250,0.75)">--spacing:</text>
      <text x="140" y="100" fontFamily="monospace" fontSize="11" fill="rgba(52,211,153,0.9)">16px</text>
      <text x="52" y="124" fontFamily="monospace" fontSize="11" fill="rgba(167,139,250,0.75)">--radius:</text>
      <text x="132" y="124" fontFamily="monospace" fontSize="11" fill="rgba(52,211,153,0.9)">8px</text>
      <text x="40" y="148" fontFamily="monospace" fontSize="12" fill="rgba(167,139,250,0.9)">{'}'}</text>

      {/* Arrows from root block to usage sites */}
      {/* Arrow 1 -> button (y=55) */}
      <path d="M 230 76 C 280 76 330 55 370 55" stroke="rgba(167,139,250,0.4)" strokeWidth="1.5" fill="none" strokeDasharray="5 3" markerEnd="url(#arr-cp)" />

      {/* Arrow 2 -> card (y=110) */}
      <path d="M 230 100 L 370 110" stroke="rgba(167,139,250,0.4)" strokeWidth="1.5" fill="none" strokeDasharray="5 3" />

      {/* Arrow 3 -> heading (y=160) */}
      <path d="M 230 124 C 280 124 330 160 370 160" stroke="rgba(167,139,250,0.4)" strokeWidth="1.5" fill="none" strokeDasharray="5 3" />

      {/* Arrowheads */}
      <polygon points="370,52 378,55 370,58" fill="rgba(167,139,250,0.6)" />
      <polygon points="368,107 376,110 368,113" fill="rgba(167,139,250,0.6)" />
      <polygon points="370,157 378,160 370,163" fill="rgba(167,139,250,0.6)" />

      {/* CENTER-RIGHT: Usage sites */}
      {/* Button rect */}
      <rect x="380" y="36" width="140" height="38" rx="6"
        fill="rgba(167,139,250,0.6)" stroke="rgba(167,139,250,0.9)" strokeWidth="1.5" />
      <text x="450" y="60" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="white">var(--primary)</text>

      {/* Card rect */}
      <rect x="380" y="90" width="140" height="38" rx="6"
        fill="rgba(167,139,250,0.15)" stroke="rgba(167,139,250,0.5)" strokeWidth="1.5" />
      <text x="450" y="114" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="rgba(167,139,250,0.9)">var(--primary)</text>

      {/* Heading text line */}
      <rect x="380" y="144" width="140" height="32" rx="4"
        fill="rgba(167,139,250,0.08)" stroke="rgba(167,139,250,0.3)" strokeWidth="1" />
      <line x1="390" y1="164" x2="510" y2="164" stroke="rgba(167,139,250,0.7)" strokeWidth="2.5" strokeLinecap="round" />
      <text x="450" y="158" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(167,139,250,0.7)">var(--primary)</text>

      {/* FAR RIGHT: Change variable indicator */}
      <rect x="560" y="26" width="190" height="165" rx="6"
        fill="rgba(167,139,250,0.04)" stroke="rgba(167,139,250,0.2)" strokeWidth="1" strokeDasharray="4 3" />
      <text x="655" y="44" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(167,139,250,0.6)">change variable</text>

      {/* Update arrow */}
      <text x="655" y="70" textAnchor="middle" fontFamily="monospace" fontSize="22" fill="rgba(167,139,250,0.5)">&#8597;</text>

      <text x="655" y="100" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(167,139,250,0.5)">all 3 update</text>
      <text x="655" y="116" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(167,139,250,0.5)">simultaneously</text>

      {/* Mini variable highlight */}
      <rect x="580" y="130" width="150" height="24" rx="4"
        fill="rgba(167,139,250,0.15)" stroke="rgba(167,139,250,0.4)" strokeWidth="1" />
      <text x="655" y="147" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={C}>--primary: #7c3aed</text>
    </svg>
  )
}
