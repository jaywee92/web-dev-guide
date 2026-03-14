export default function EventLoopBanner() {
  const AMBER = '#f59e0b', BLUE = '#60a5fa', GREEN = '#4ade80'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-evl" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${AMBER}15`} />
        </pattern>
        <radialGradient id="glow-evl" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={AMBER} stopOpacity="0.05" />
          <stop offset="100%" stopColor={AMBER} stopOpacity="0" />
        </radialGradient>
        <marker id="arr-evl" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="rgba(255,255,255,0.2)" />
        </marker>
      </defs>
      <rect width="780" height="220" fill="url(#dots-evl)" />
      <rect width="780" height="220" fill="url(#glow-evl)" />

      {/* Call Stack */}
      <rect x="40" y="22" width="190" height="176" rx="8" fill={`${AMBER}06`} stroke={`${AMBER}35`} strokeWidth="1.5" />
      <text x="135" y="40" fill={`${AMBER}65`} fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="600">Call Stack</text>
      <rect x="58" y="50" width="154" height="30" rx="4" fill={`${AMBER}20`} stroke={`${AMBER}55`} strokeWidth="1.2" />
      <text x="135" y="70" fill={`${AMBER}ee`} fontSize="10.5" fontFamily="monospace" textAnchor="middle">console.log()</text>
      <rect x="58" y="88" width="154" height="30" rx="4" fill={`${AMBER}10`} stroke={`${AMBER}30`} strokeWidth="1" />
      <text x="135" y="108" fill={`${AMBER}99`} fontSize="10.5" fontFamily="monospace" textAnchor="middle">greet()</text>
      <rect x="58" y="126" width="154" height="30" rx="4" fill={`${AMBER}08`} stroke={`${AMBER}20`} strokeWidth="1" />
      <text x="135" y="146" fill={`${AMBER}55`} fontSize="10.5" fontFamily="monospace" textAnchor="middle">main()</text>
      <text x="135" y="185" fill={`${AMBER}35`} fontSize="9" fontFamily="monospace" textAnchor="middle">LIFO stack</text>

      {/* Arrow Stack→Loop */}
      <line x1="232" y1="110" x2="332" y2="110" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" markerEnd="url(#arr-evl)" />

      {/* Event Loop */}
      <circle cx="390" cy="110" r="54" fill={`${BLUE}04`} stroke={`${BLUE}22`} strokeWidth="1.5" />
      <circle cx="390" cy="110" r="38" fill="none" stroke={`${BLUE}12`} strokeWidth="1" />
      <path d="M390,56 A54,54 0 1,1 336,110" fill="none" stroke={BLUE} strokeWidth="3" strokeLinecap="round" />
      <polygon points="390,50 396,62 384,62" fill={BLUE} />
      <text x="390" y="106" fill="rgba(255,255,255,0.75)" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="700">Event</text>
      <text x="390" y="121" fill="rgba(255,255,255,0.75)" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="700">Loop</text>
      <text x="390" y="178" fill={`${BLUE}45`} fontSize="9" fontFamily="monospace" textAnchor="middle">checks when stack empty</text>

      {/* Arrow Loop→Queue */}
      <line x1="447" y1="110" x2="547" y2="110" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" markerEnd="url(#arr-evl)" />

      {/* Task Queue */}
      <rect x="550" y="22" width="190" height="176" rx="8" fill={`${GREEN}04`} stroke={`${GREEN}28`} strokeWidth="1.5" />
      <text x="645" y="40" fill={`${GREEN}60`} fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="600">Task Queue</text>
      <rect x="568" y="50" width="154" height="30" rx="4" fill={`${GREEN}14`} stroke={`${GREEN}40`} strokeWidth="1.2" />
      <text x="645" y="70" fill={`${GREEN}dd`} fontSize="10.5" fontFamily="monospace" textAnchor="middle">setTimeout cb</text>
      <rect x="568" y="88" width="154" height="30" rx="4" fill={`${GREEN}08`} stroke={`${GREEN}25`} strokeWidth="1" />
      <text x="645" y="108" fill={`${GREEN}88`} fontSize="10.5" fontFamily="monospace" textAnchor="middle">fetch().then()</text>
      <rect x="568" y="126" width="154" height="30" rx="4" fill={`${GREEN}05`} stroke={`${GREEN}18`} strokeWidth="1" />
      <text x="645" y="146" fill={`${GREEN}55`} fontSize="10.5" fontFamily="monospace" textAnchor="middle">click handler</text>
      <text x="645" y="185" fill={`${GREEN}35`} fontSize="9" fontFamily="monospace" textAnchor="middle">FIFO queue</text>
    </svg>
  )
}
