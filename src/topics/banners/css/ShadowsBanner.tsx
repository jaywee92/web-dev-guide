export default function ShadowsBanner() {
  const C = '#60a5fa'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-sh" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-sh" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-sh)" />
      <rect width="780" height="220" fill="url(#glow-sh)" />

      {/* Title */}
      <text x="390" y="18" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="rgba(255,255,255,0.3)">box-shadow</text>

      {/* 5 card boxes in a row */}
      {/* Card 1: No shadow */}
      <rect x="18" y="55" width="110" height="70" rx="6"
        fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
      <text x="73" y="96" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.5)">no shadow</text>
      <text x="73" y="146" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(255,255,255,0.3)">none</text>

      {/* Card 2: Simple shadow */}
      <rect x="162" y="61" width="110" height="70" rx="6" fill="rgba(0,0,0,0.5)" />
      <rect x="158" y="57" width="110" height="70" rx="6"
        fill="rgba(255,255,255,0.08)" stroke="rgba(96,165,250,0.3)" strokeWidth="1.5" />
      <text x="213" y="96" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.5)">simple</text>
      <text x="213" y="146" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(96,165,250,0.6)">2px 2px 8px</text>

      {/* Card 3: Large blur (soft shadow) */}
      <rect x="300" y="63" width="120" height="80" rx="10" fill="rgba(0,0,20,0.6)" opacity="0.7" />
      <rect x="296" y="55" width="116" height="76" rx="6"
        fill="rgba(255,255,255,0.08)" stroke="rgba(96,165,250,0.3)" strokeWidth="1.5" />
      <text x="354" y="96" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.5)">large blur</text>
      <text x="354" y="146" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(96,165,250,0.6)">0 8px 24px</text>

      {/* Card 4: Colored glow */}
      <rect x="432" y="48" width="128" height="84" rx="10" fill="rgba(96,165,250,0.08)" />
      <rect x="440" y="55" width="112" height="70" rx="6"
        fill="rgba(255,255,255,0.08)" stroke={C} strokeWidth="2" />
      <rect x="436" y="51" width="120" height="78" rx="8" fill="none" stroke="rgba(96,165,250,0.2)" strokeWidth="4" />
      <text x="496" y="94" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.5)">colored glow</text>
      <text x="496" y="146" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(96,165,250,0.6)">0 0 20px #60a5fa55</text>

      {/* Card 5: Multi-layer */}
      <rect x="584" y="64" width="118" height="78" rx="10" fill="rgba(0,0,0,0.5)" opacity="0.5" />
      <rect x="580" y="60" width="118" height="78" rx="10" fill="rgba(96,165,250,0.06)" />
      <rect x="576" y="54" width="122" height="82" rx="12" fill="none" stroke="rgba(96,165,250,0.15)" strokeWidth="3" />
      <rect x="580" y="56" width="114" height="70" rx="6"
        fill="rgba(255,255,255,0.08)" stroke={C} strokeWidth="1.5" />
      <text x="637" y="95" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.5)">multi-layer</text>
      <text x="637" y="146" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(96,165,250,0.6)">multiple</text>
    </svg>
  )
}
