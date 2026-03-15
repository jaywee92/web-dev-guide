export default function TimersBanner() {
  const C = '#fbbf24'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-tm" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-tm" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
        <marker id="arr-tm" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={`${C}80`} />
        </marker>
      </defs>
      <rect width="780" height="220" fill="url(#dots-tm)" />
      <rect width="780" height="220" fill="url(#glow-tm)" />

      {/* === Section 1: setTimeout === */}
      <rect x="12" y="14" width="366" height="194" rx="8" fill={`${C}04`} stroke={`${C}28`} strokeWidth="1.5" />
      <text x="195" y="32" fill={`${C}80`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="700">setTimeout</text>

      {/* syntax box */}
      <rect x="26" y="42" width="338" height="26" rx="4" fill={`${C}08`} stroke={`${C}22`} strokeWidth="1" />
      <text x="195" y="59" fill={`${C}aa`} fontSize="9" fontFamily="monospace" textAnchor="middle">{'setTimeout(() => { callback() }, 1000)'}</text>

      {/* timeline */}
      <line x1="40" y1="105" x2="352" y2="105" stroke={`${C}35`} strokeWidth="1.5" markerEnd="url(#arr-tm)" />
      <text x="26" y="109" fill={`${C}50`} fontSize="8.5" fontFamily="monospace">0ms</text>

      {/* start dot */}
      <circle cx="60" cy="105" r="4" fill={`${C}30`} stroke={`${C}60`} strokeWidth="1" />
      <text x="60" y="122" fill={`${C}40`} fontSize="8" fontFamily="monospace" textAnchor="middle">start</text>

      {/* callback fires dot */}
      <circle cx="290" cy="105" r="6" fill={`${C}55`} stroke={`${C}cc`} strokeWidth="1.5" />
      <line x1="290" y1="88" x2="290" y2="99" stroke={`${C}80`} strokeWidth="1.2" />
      <text x="290" y="84" fill={`${C}cc`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">callback fires</text>
      <text x="290" y="122" fill={`${C}60`} fontSize="8" fontFamily="monospace" textAnchor="middle">1000ms</text>

      <text x="195" y="148" fill={`${C}50`} fontSize="9" fontFamily="monospace" textAnchor="middle">fires once after delay</text>
      <text x="195" y="165" fill={`${C}38`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">clearTimeout(id) cancels it</text>
      <text x="195" y="196" fill={`${C}30`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">non-blocking · queued in event loop</text>

      {/* === Section 2: setInterval === */}
      <rect x="402" y="14" width="366" height="194" rx="8" fill={`${C}04`} stroke={`${C}28`} strokeWidth="1.5" />
      <text x="585" y="32" fill={`${C}80`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="700">setInterval</text>

      {/* syntax box */}
      <rect x="416" y="42" width="338" height="26" rx="4" fill={`${C}08`} stroke={`${C}22`} strokeWidth="1" />
      <text x="585" y="59" fill={`${C}aa`} fontSize="9" fontFamily="monospace" textAnchor="middle">{'setInterval(() => { tick() }, 500)'}</text>

      {/* timeline */}
      <line x1="424" y1="105" x2="736" y2="105" stroke={`${C}35`} strokeWidth="1.5" markerEnd="url(#arr-tm)" />
      <text x="414" y="109" fill={`${C}50`} fontSize="8.5" fontFamily="monospace">0ms</text>

      {/* start dot */}
      <circle cx="440" cy="105" r="4" fill={`${C}30`} stroke={`${C}60`} strokeWidth="1" />

      {/* interval tick dots */}
      {[0, 1, 2, 3].map(i => {
        const cx = 500 + i * 56
        return (
          <g key={i}>
            <circle cx={cx} cy={105} r={5} fill={`${C}45`} stroke={`${C}bb`} strokeWidth="1.4" />
            <line x1={cx} y1={88} x2={cx} y2={100} stroke={`${C}70`} strokeWidth="1.2" />
            <text x={cx} y={84} fill={`${C}aa`} fontSize="7.5" fontFamily="monospace" textAnchor="middle">tick</text>
            <text x={cx} y={122} fill={`${C}55`} fontSize="7.5" fontFamily="monospace" textAnchor="middle">{`${(i + 1) * 500}ms`}</text>
          </g>
        )
      })}

      {/* clearInterval marker */}
      <line x1="720" y1="88" x2="720" y2="120" stroke="#ef444470" strokeWidth="2.5" strokeLinecap="round" />
      <text x="720" y="135" fill="#ef4444aa" fontSize="7.5" fontFamily="monospace" textAnchor="middle">clearInterval</text>

      <text x="585" y="158" fill={`${C}50`} fontSize="9" fontFamily="monospace" textAnchor="middle">fires repeatedly every interval</text>
      <text x="585" y="175" fill={`${C}38`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">clearInterval(id) stops repetition</text>
      <text x="585" y="196" fill={`${C}30`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">500ms each · event loop queued</text>
    </svg>
  )
}
