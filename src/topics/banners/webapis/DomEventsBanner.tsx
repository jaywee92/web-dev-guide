export default function DomEventsBanner() {
  const C = '#f97316'

  return (
    <svg
      width="100%"
      viewBox="0 0 780 220"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', background: '#07101a' }}
    >
      <defs>
        <pattern id="dots-domev" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}1a`} />
        </pattern>
        <radialGradient id="glow-domev" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
        <marker id="arrow-domev" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
          <path d="M0,6 L4,0 L8,6 z" fill={`${C}aa`} />
        </marker>
        <marker id="arrow-domev-blocked" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
          <path d="M0,6 L4,0 L8,6 z" fill="#f8717180" />
        </marker>
      </defs>
      <rect width="780" height="220" fill="url(#dots-domev)" />
      <rect width="780" height="220" fill="url(#glow-domev)" />

      {/* === Bubbling diagram (left side) === */}

      {/* <body> outermost */}
      <rect x="18" y="18" width="340" height="192" rx="8" fill={`${C}08`} stroke={`${C}40`} strokeWidth="1.5" />
      <text x="30" y="34" fontFamily="monospace" fontSize="11" fill={`${C}80`}>{"<body>"}</text>

      {/* <section> */}
      <rect x="36" y="42" width="304" height="152" rx="7" fill={`${C}0a`} stroke={`${C}55`} strokeWidth="1.5" />
      <text x="48" y="58" fontFamily="monospace" fontSize="11" fill={`${C}90`}>{"<section>"}</text>
      <text x="48" y="73" fontFamily="monospace" fontSize="10" fill={`${C}70`}>addEventListener('click', h)</text>

      {/* <div> */}
      <rect x="54" y="82" width="268" height="102" rx="6" fill={`${C}0d`} stroke={`${C}70`} strokeWidth="1.5" />
      <text x="66" y="98" fontFamily="monospace" fontSize="11" fill={`${C}aa`}>{"<div>"}</text>

      {/* stopPropagation barrier — shown as a thick dashed line */}
      <line x1="54" y1="110" x2="322" y2="110" stroke="#f87171" strokeWidth="2.5" strokeDasharray="6,4" strokeLinecap="round" />
      <rect x="148" y="100" width="122" height="18" rx="3" fill="#07101a" stroke="#f8717180" strokeWidth="1" />
      <text x="209" y="113" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#f87171cc">stopPropagation()</text>

      {/* <button> innermost */}
      <rect x="72" y="122" width="230" height="50" rx="6" fill={`${C}20`} stroke={C} strokeWidth="1.5" />
      <text x="187" y="143" textAnchor="middle" fontFamily="monospace" fontSize="11" fill={C} fontWeight="bold">{"<button>"}</text>
      <text x="187" y="159" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}cc`}>click ← event origin</text>

      {/* Bubble arrows (upward) — from button to div, blocked at stopPropagation */}
      {/* button → div */}
      <line x1="320" y1="136" x2="320" y2="118" stroke={`${C}99`} strokeWidth="1.5" markerEnd="url(#arrow-domev)" />
      {/* stopped at barrier */}
      <line x1="320" y1="108" x2="320" y2="84" stroke="#f8717166" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#arrow-domev-blocked)" />
      <text x="330" y="103" fontFamily="monospace" fontSize="10" fill="#f8717180">✕</text>

      {/* Labels for bubbling */}
      <text x="209" y="212" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}50`}>event bubbling</text>

      {/* === Event Delegation panel (right side) === */}
      <rect x="378" y="18" width="390" height="192" rx="8" fill={`${C}08`} stroke={`${C}35`} strokeWidth="1" />
      <text x="573" y="38" textAnchor="middle" fontFamily="monospace" fontSize="11" fill={C} fontWeight="bold">Event Delegation</text>

      {/* Parent listener box */}
      <rect x="396" y="48" width="354" height="32" rx="5" fill={`${C}12`} stroke={`${C}60`} strokeWidth="1" />
      <text x="573" y="61" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}cc`}>{"parent.addEventListener('click', handler)"}</text>
      <text x="573" y="73" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}70`}>← one listener covers all children</text>

      {/* Child items */}
      {[
        { y: 96,  label: 'item-1', tag: 'data-action="delete"' },
        { y: 126, label: 'item-2', tag: 'data-action="edit"' },
        { y: 156, label: 'item-3', tag: 'data-action="view"' },
      ].map(({ y, label, tag }) => (
        <g key={label}>
          <rect x="396" y={y} width="354" height="22" rx="4" fill={`${C}0a`} stroke={`${C}40`} strokeWidth="1" />
          <text x="408" y={y + 15} fontFamily="monospace" fontSize="10" fill={`${C}cc`}>{`<li id="${label}" ${tag}>`}</text>
        </g>
      ))}

      {/* Delegation note */}
      <rect x="396" y="186" width="354" height="16" rx="3" fill={`${C}0d`} stroke={`${C}30`} strokeWidth="1" />
      <text x="573" y="198" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}80`}>e.target.dataset.action → handle dynamically</text>

      {/* Footer label */}
      <text x="573" y="214" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}50`}>
        DOM Events · bubbling &amp; delegation
      </text>
    </svg>
  )
}
