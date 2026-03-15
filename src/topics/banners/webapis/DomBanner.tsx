export default function DomBanner() {
  const GREEN = '#34d399'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-dm" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${GREEN}15`} />
        </pattern>
        <radialGradient id="glow-dm" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={GREEN} stopOpacity="0.05" />
          <stop offset="100%" stopColor={GREEN} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-dm)" />
      <rect width="780" height="220" fill="url(#glow-dm)" />

      {/* === Left: DOM Tree === */}
      <text x="140" y="20" fill={`${GREEN}70`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="700">DOM Tree</text>

      {/* html node */}
      <rect x="90" y="26" width="100" height="22" rx="4" fill={`${GREEN}18`} stroke={`${GREEN}50`} strokeWidth="1.2" />
      <text x="140" y="41" fill={`${GREEN}ee`} fontSize="10" fontFamily="monospace" textAnchor="middle">{'<html>'}</text>

      {/* html → head/body lines */}
      <line x1="140" y1="48" x2="75" y2="70" stroke={`${GREEN}40`} strokeWidth="1" />
      <line x1="140" y1="48" x2="205" y2="70" stroke={`${GREEN}40`} strokeWidth="1" />

      {/* head node */}
      <rect x="30" y="70" width="90" height="22" rx="4" fill={`${GREEN}10`} stroke={`${GREEN}30`} strokeWidth="1" />
      <text x="75" y="85" fill={`${GREEN}cc`} fontSize="10" fontFamily="monospace" textAnchor="middle">{'<head>'}</text>

      {/* body node */}
      <rect x="160" y="70" width="90" height="22" rx="4" fill={`${GREEN}18`} stroke={`${GREEN}50`} strokeWidth="1.2" />
      <text x="205" y="85" fill={`${GREEN}ee`} fontSize="10" fontFamily="monospace" textAnchor="middle">{'<body>'}</text>

      {/* body → header/main/footer lines */}
      <line x1="185" y1="92" x2="90" y2="116" stroke={`${GREEN}40`} strokeWidth="1" />
      <line x1="205" y1="92" x2="205" y2="116" stroke={`${GREEN}40`} strokeWidth="1" />
      <line x1="225" y1="92" x2="260" y2="116" stroke={`${GREEN}40`} strokeWidth="1" />

      {/* header node */}
      <rect x="40" y="116" width="90" height="22" rx="4" fill={`${GREEN}10`} stroke={`${GREEN}30`} strokeWidth="1" />
      <text x="85" y="131" fill={`${GREEN}bb`} fontSize="9.5" fontFamily="monospace" textAnchor="middle">{'<header>'}</text>

      {/* main node — highlighted as querySelector target */}
      <rect x="156" y="116" width="90" height="22" rx="4" fill={`${GREEN}28`} stroke={GREEN} strokeWidth="1.8" />
      <text x="201" y="131" fill={GREEN} fontSize="9.5" fontFamily="monospace" textAnchor="middle" fontWeight="700">{'<main>'}</text>

      {/* footer node */}
      <rect x="216" y="116" width="90" height="22" rx="4" fill={`${GREEN}10`} stroke={`${GREEN}30`} strokeWidth="1" />
      <text x="261" y="131" fill={`${GREEN}bb`} fontSize="9.5" fontFamily="monospace" textAnchor="middle">{'<footer>'}</text>

      {/* === Right: querySelector code box === */}
      <text x="530" y="20" fill={`${GREEN}70`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="700">querySelector</text>

      <rect x="380" y="26" width="300" height="50" rx="6" fill={`${GREEN}08`} stroke={`${GREEN}30`} strokeWidth="1.2" />
      <text x="395" y="46" fill={`${GREEN}50`} fontSize="9" fontFamily="monospace">document</text>
      <text x="395" y="46" fill={`${GREEN}50`} fontSize="9" fontFamily="monospace">document</text>
      <text x="395" y="60" fill={`${GREEN}cc`} fontSize="9.5" fontFamily="monospace">  .querySelector</text>
      <text x="395" y="42" fill={`${GREEN}60`} fontSize="9.5" fontFamily="monospace">document</text>
      <text x="395" y="56" fill={`${GREEN}ee`} fontSize="9.5" fontFamily="monospace">  .querySelector('main')</text>
      <text x="395" y="70" fill={`${GREEN}70`} fontSize="9" fontFamily="monospace">  → {'<main>'} element</text>

      {/* returns label + box */}
      <rect x="420" y="100" width="220" height="64" rx="6" fill={`${GREEN}10`} stroke={GREEN} strokeWidth="1.5" />
      <text x="530" y="118" fill={GREEN} fontSize="9.5" fontFamily="monospace" textAnchor="middle" fontWeight="700">returned node</text>
      <text x="530" y="134" fill={`${GREEN}cc`} fontSize="9" fontFamily="monospace" textAnchor="middle">element.innerHTML</text>
      <text x="530" y="149" fill={`${GREEN}99`} fontSize="9" fontFamily="monospace" textAnchor="middle">element.classList.add('active')</text>
      <text x="530" y="163" fill={`${GREEN}70`} fontSize="9" fontFamily="monospace" textAnchor="middle">element.style.color = '#fff'</text>

      {/* Arrow from code box to highlight node */}
      <path d="M380,96 L280,127" fill="none" stroke={GREEN} strokeWidth="1.4" strokeDasharray="4 2"
        markerEnd={`url(#arr-dm)`} />
      <defs>
        <marker id="arr-dm" markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto">
          <polygon points="0 0, 7 3.5, 0 7" fill={GREEN} />
        </marker>
      </defs>

      {/* Bottom label */}
      <text x="390" y="210" fill={`${GREEN}35`} fontSize="9" fontFamily="monospace" textAnchor="middle">Live representation of the HTML document</text>
    </svg>
  )
}
