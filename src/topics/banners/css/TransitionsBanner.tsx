export default function TransitionsBanner() {
  const C = '#2dd4bf'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-tn" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-tn" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-tn)" />
      <rect width="780" height="220" fill="url(#glow-tn)" />

      {/* LEFT: Default state button */}
      <text x="130" y="30" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.3)">default</text>
      <rect x="30" y="40" width="200" height="50" rx="6"
        fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <text x="130" y="71" textAnchor="middle" fontFamily="monospace" fontSize="13" fill="rgba(255,255,255,0.6)">hover me</text>

      {/* Center: Transition label + arrow */}
      <line x1="242" y1="65" x2="342" y2="65" stroke="rgba(45,212,191,0.4)" strokeWidth="1.5" />
      <polygon points="342,61 352,65 342,69" fill="rgba(45,212,191,0.6)" />
      <text x="295" y="55" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(45,212,191,0.7)">transition:</text>
      <text x="295" y="86" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(45,212,191,0.6)">all 0.3s ease</text>

      {/* RIGHT: Hover state button */}
      <text x="510" y="30" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(45,212,191,0.7)">:hover</text>
      {/* Glow behind */}
      <rect x="352" y="32" width="316" height="66" rx="10" fill="rgba(45,212,191,0.08)" />
      {/* Button wider + teal */}
      <rect x="360" y="38" width="300" height="50" rx="6"
        fill="rgba(45,212,191,0.25)" stroke={C} strokeWidth="2" />
      <text x="510" y="71" textAnchor="middle" fontFamily="monospace" fontSize="13" fill={C}>hover me --&gt;</text>

      {/* Bottom: Easing curve comparison */}
      <text x="390" y="115" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.3)">easing functions</text>

      {/* Linear curve */}
      <rect x="30" y="125" width="200" height="70" rx="4"
        fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <line x1="50" y1="185" x2="210" y2="135" stroke="rgba(45,212,191,0.7)" strokeWidth="2" strokeLinecap="round" />
      <text x="130" y="205" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(45,212,191,0.6)">linear</text>

      {/* Ease curve (S-curve) */}
      <rect x="285" y="125" width="200" height="70" rx="4"
        fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <path d="M 305 185 C 330 185 340 135 465 135"
        stroke="rgba(45,212,191,0.7)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <text x="385" y="205" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(45,212,191,0.6)">ease</text>

      {/* Ease-in curve (steep start) */}
      <rect x="540" y="125" width="200" height="70" rx="4"
        fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <path d="M 560 185 C 560 160 680 138 720 135"
        stroke="rgba(45,212,191,0.7)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <text x="640" y="205" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(45,212,191,0.6)">ease-in</text>
    </svg>
  )
}
