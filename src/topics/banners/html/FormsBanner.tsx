export default function FormsBanner() {
  const C = '#60a5fa'

  const formX = 80
  const formW = 460

  const fields = [
    { label: 'Email', y: 50 },
    { label: 'Password', y: 110 },
  ]

  const states = [
    { label: 'empty', color: '#6b7280', y: 40 },
    { label: 'focus', color: '#60a5fa', y: 72 },
    { label: 'valid', color: '#34d399', y: 104 },
    { label: 'invalid', color: '#f87171', y: 136 },
  ]

  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-fr" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-fr" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-fr)" />
      <rect width="780" height="220" fill="url(#glow-fr)" />

      {/* Form container */}
      <rect x={formX} y="20" width={formW} height="186" rx="8" fill="rgba(96,165,250,0.04)" stroke="rgba(96,165,250,0.2)" strokeWidth="1" />

      {/* Form label */}
      <text x={formX + formW / 2} y="14" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}60`}>Form Mockup</text>

      {/* Input fields */}
      {fields.map((field) => (
        <g key={field.label}>
          {/* Field label */}
          <text x={formX + 20} y={field.y + 14} fontFamily="monospace" fontSize="10" fill={`${C}99`}>{field.label}</text>

          {/* Glow behind focused input (email only) */}
          {field.label === 'Email' && (
            <rect x={formX + 18} y={field.y + 18} width={formW - 36} height={32} rx="5" fill="rgba(96,165,250,0.08)" stroke="none" />
          )}

          {/* Input rect */}
          <rect
            x={formX + 20}
            y={field.y + 18}
            width={formW - 40}
            height={30}
            rx="5"
            fill="rgba(15,23,42,0.8)"
            stroke={field.label === 'Email' ? C : 'rgba(96,165,250,0.3)'}
            strokeWidth={field.label === 'Email' ? 1.5 : 1}
          />

          {/* Placeholder text */}
          <text x={formX + 32} y={field.y + 37} fontFamily="monospace" fontSize="10" fill="rgba(96,165,250,0.3)">
            {field.label === 'Email' ? 'user@example.com' : '••••••••'}
          </text>
        </g>
      ))}

      {/* Submit button */}
      <rect x={formX + 20} y="168" width={formW - 40} height="32" rx="6" fill={`${C}22`} stroke={C} strokeWidth="1.2" />
      <text x={formX + formW / 2} y="188" textAnchor="middle" fontFamily="monospace" fontSize="12" fill={C}>Submit →</text>

      {/* State indicator chips — right side */}
      <text x="620" y="26" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#6b7280">Input States</text>

      {states.map((s) => (
        <g key={s.label}>
          <rect x="565" y={s.y} width="110" height="24" rx="5" fill={`${s.color}18`} stroke={`${s.color}60`} strokeWidth="1" />
          <circle cx="579" cy={s.y + 12} r="4" fill={s.color} opacity="0.8" />
          <text x="590" y={s.y + 16} fontFamily="monospace" fontSize="10" fill={s.color}>{s.label}</text>
        </g>
      ))}
    </svg>
  )
}
