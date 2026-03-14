export default function SemanticBanner() {
  const C = '#2dd4bf'

  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-sm" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-sm" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-sm)" />
      <rect width="780" height="220" fill="url(#glow-sm)" />

      {/* Divider */}
      <line x1="390" y1="10" x2="390" y2="210" stroke="#ffffff10" strokeWidth="1" strokeDasharray="4,4" />

      {/* Column labels */}
      <text x="195" y="18" textAnchor="middle" fontFamily="monospace" fontSize="12" fill={C}>Semantic ✓</text>
      <text x="585" y="18" textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#6b7280">Div Soup ✗</text>

      {/* === LEFT: Semantic HTML === */}
      {/* <header> */}
      <rect x="22" y="26" width="346" height="30" rx="4" fill={`${C}0f`} stroke={`${C}55`} strokeWidth="1" />
      <text x="32" y="45" fontFamily="monospace" fontSize="10" fill={`${C}cc`}>{'<header>'}</text>

      {/* <nav> */}
      <rect x="22" y="60" width="346" height="22" rx="4" fill={`${C}08`} stroke={`${C}40`} strokeWidth="1" />
      <text x="32" y="75" fontFamily="monospace" fontSize="10" fill={`${C}99`}>{'<nav>'}</text>

      {/* <main> */}
      <rect x="22" y="86" width="346" height="70" rx="4" fill={`${C}0a`} stroke={`${C}40`} strokeWidth="1" />
      <text x="32" y="102" fontFamily="monospace" fontSize="10" fill={`${C}99`}>{'<main>'}</text>

      {/* <article> inside <main> */}
      <rect x="34" y="106" width="320" height="44" rx="3" fill={`${C}08`} stroke={`${C}35`} strokeWidth="1" />
      <text x="44" y="122" fontFamily="monospace" fontSize="10" fill={`${C}88`}>{'<article>'}</text>

      {/* <footer> */}
      <rect x="22" y="160" width="346" height="28" rx="4" fill={`${C}0f`} stroke={`${C}55`} strokeWidth="1" />
      <text x="32" y="178" fontFamily="monospace" fontSize="10" fill={`${C}cc`}>{'<footer>'}</text>

      {/* === RIGHT: Div soup === */}
      {/* All divs */}
      {[
        { y: 26, h: 30, label: '<div>' },
        { y: 60, h: 22, label: '<div>' },
        { y: 86, h: 70, label: '<div>' },
        { y: 160, h: 28, label: '<div>' },
      ].map((box, i) => (
        <g key={i}>
          <rect x="412" y={box.y} width="346" height={box.h} rx="4" fill="rgba(107,114,128,0.07)" stroke="rgba(107,114,128,0.35)" strokeWidth="1" />
          <text x="422" y={box.y + box.h / 2 + 4} fontFamily="monospace" fontSize="10" fill="#4b5563">{box.label}</text>
        </g>
      ))}

      {/* Inner div soup */}
      <rect x="424" y="106" width="320" height="44" rx="3" fill="rgba(107,114,128,0.05)" stroke="rgba(107,114,128,0.25)" strokeWidth="1" />
      <text x="434" y="122" fontFamily="monospace" fontSize="10" fill="#374151">{'<div>'}</text>
    </svg>
  )
}
