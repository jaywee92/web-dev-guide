export default function GridBanner() {
  const C = '#34d399'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-gr" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-gr" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-gr)" />
      <rect width="780" height="220" fill="url(#glow-gr)" />

      {/* Grid layout: x=60–720, y=20–200 */}
      {/* header: top row, full width, 40px */}
      <rect x="60" y="20" width="660" height="40" rx="3"
        fill="rgba(52,211,153,0.12)" stroke="rgba(52,211,153,0.4)" strokeWidth="1.2" />
      <text x="390" y="45" textAnchor="middle" fontFamily="monospace" fontSize="12" fill="rgba(52,211,153,0.85)">header</text>

      {/* sidebar: left col, rows 2–3, 120px wide, y=62, h=96 */}
      <rect x="60" y="62" width="120" height="96" rx="3"
        fill="rgba(52,211,153,0.08)" stroke="rgba(52,211,153,0.35)" strokeWidth="1.2" />
      <text x="120" y="114" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="rgba(52,211,153,0.75)">sidebar</text>

      {/* main: center+right, rows 2–3 */}
      <rect x="182" y="62" width="538" height="96" rx="3"
        fill="rgba(52,211,153,0.1)" stroke="rgba(52,211,153,0.38)" strokeWidth="1.2" />
      <text x="451" y="114" textAnchor="middle" fontFamily="monospace" fontSize="12" fill="rgba(52,211,153,0.85)">main</text>

      {/* footer: bottom row, full width */}
      <rect x="60" y="160" width="660" height="40" rx="3"
        fill="rgba(52,211,153,0.12)" stroke="rgba(52,211,153,0.4)" strokeWidth="1.2" />
      <text x="390" y="185" textAnchor="middle" fontFamily="monospace" fontSize="12" fill="rgba(52,211,153,0.85)">footer</text>

      {/* Grid lines */}
      <line x1="60" y1="60" x2="720" y2="60" stroke="rgba(52,211,153,0.15)" strokeWidth="1" />
      <line x1="60" y1="158" x2="720" y2="158" stroke="rgba(52,211,153,0.15)" strokeWidth="1" />
      <line x1="180" y1="60" x2="180" y2="158" stroke="rgba(52,211,153,0.15)" strokeWidth="1" />

      {/* grid-template-areas snippet — top right corner */}
      <rect x="530" y="64" width="184" height="54" rx="4"
        fill="rgba(52,211,153,0.06)" stroke="rgba(52,211,153,0.2)" strokeWidth="1" />
      <text x="542" y="79" fontFamily="monospace" fontSize="9" fill="rgba(52,211,153,0.5)">grid-template-areas:</text>
      <text x="542" y="92" fontFamily="monospace" fontSize="9" fill="rgba(52,211,153,0.65)">"header header"</text>
      <text x="542" y="105" fontFamily="monospace" fontSize="9" fill="rgba(52,211,153,0.65)">"sidebar main"</text>
      <text x="542" y="118" fontFamily="monospace" fontSize="9" fill="rgba(52,211,153,0.65)">"footer footer"</text>
    </svg>
  )
}
