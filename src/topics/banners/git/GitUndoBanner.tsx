export default function GitUndoBanner() {
  const C = '#2dd4bf'
  return (
    <svg
      width="100%"
      viewBox="0 0 780 220"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', background: '#07101a' }}
    >
      <defs>
        <pattern id="dots-undo" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-undo" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-undo)" />
      <rect width="780" height="220" fill="url(#glow-undo)" />

      {/* Title */}
      <text x="390" y="18" textAnchor="middle" fontFamily="monospace" fontSize="11" fill={`${C}99`}>git undo operations</text>

      {/* ===== Panel 1: git restore ===== */}
      <rect x="18" y="28" width="228" height="170" rx="5" fill={`${C}08`} stroke={`${C}44`} strokeWidth="1.2" />
      {/* command label */}
      <rect x="18" y="28" width="228" height="22" rx="5" fill={`${C}18`} />
      <rect x="18" y="40" width="228" height="10" rx="0" fill={`${C}18`} />
      <text x="132" y="43" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={C}>git restore file.txt</text>

      {/* Before: modified file (red) */}
      <rect x="32" y="60" width="88" height="70" rx="3" fill="#ef444410" stroke="#ef444466" strokeWidth="1.2" />
      <text x="76" y="76" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#ef4444">BEFORE</text>
      <text x="76" y="90" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(255,255,255,0.6)">file.txt</text>
      <text x="76" y="104" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#ef4444aa">modified</text>
      {/* edit lines */}
      <line x1="42" y1="114" x2="110" y2="114" stroke="#ef444444" strokeWidth="1" />
      <text x="46" y="124" fontFamily="monospace" fontSize="8" fill="#ef4444aa">+ unsaved edit</text>

      {/* Arrow */}
      <line x1="122" y1="95" x2="154" y2="95" stroke={`${C}55`} strokeWidth="1.5" />
      <polygon points="154,91 162,95 154,99" fill={`${C}55`} />

      {/* After: restored file (green) */}
      <rect x="162" y="60" width="70" height="70" rx="3" fill="#22c55e10" stroke="#22c55e66" strokeWidth="1.2" />
      <text x="197" y="76" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#22c55e">AFTER</text>
      <text x="197" y="90" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(255,255,255,0.6)">file.txt</text>
      <text x="197" y="110" textAnchor="middle" fontFamily="monospace" fontSize="14" fill="#22c55e">✓</text>

      <text x="132" y="152" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(255,255,255,0.5)">Discard working changes</text>
      <text x="132" y="165" textAnchor="middle" fontFamily="monospace" fontSize="9" fill={`${C}55`}>safe — does not touch history</text>
      <text x="132" y="188" textAnchor="middle" fontFamily="monospace" fontSize="9" fill={`${C}44`}>⚠ working dir only</text>

      {/* ===== Panel 2: git reset HEAD~1 ===== */}
      <rect x="276" y="28" width="228" height="170" rx="5" fill={`${C}08`} stroke={`${C}44`} strokeWidth="1.2" />
      <rect x="276" y="28" width="228" height="22" rx="5" fill={`${C}18`} />
      <rect x="276" y="40" width="228" height="10" rx="0" fill={`${C}18`} />
      <text x="390" y="43" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={C}>git reset HEAD~1</text>

      {/* Commit timeline: c1 → c2 → [c3 grayed] */}
      {/* commits on timeline */}
      <line x1="292" y1="105" x2="490" y2="105" stroke={`${C}33`} strokeWidth="1.2" />
      {/* c1 */}
      <circle cx="316" cy="105" r="10" fill={`${C}22`} stroke={C} strokeWidth="1.4" />
      <text x="316" y="109" textAnchor="middle" fontFamily="monospace" fontSize="8" fill={C}>c1</text>
      {/* c2 */}
      <circle cx="376" cy="105" r="10" fill={`${C}22`} stroke={C} strokeWidth="1.4" />
      <text x="376" y="109" textAnchor="middle" fontFamily="monospace" fontSize="8" fill={C}>c2</text>
      {/* HEAD label */}
      <text x="376" y="88" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#22c55e">HEAD</text>
      <line x1="376" y1="91" x2="376" y2="95" stroke="#22c55e" strokeWidth="1" />
      {/* c3 — grayed out (undone) */}
      <circle cx="436" cy="105" r="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.4" />
      <text x="436" y="109" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgba(255,255,255,0.3)">c3</text>
      <text x="436" y="126" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgba(255,255,255,0.25)">undone</text>
      {/* strikethrough on c3 */}
      <line x1="426" y1="105" x2="446" y2="105" stroke="rgba(255,80,80,0.5)" strokeWidth="1.5" />

      {/* HEAD arrow moving back */}
      <path d="M360,78 Q350,68 370,60" fill="none" stroke="#22c55e66" strokeWidth="1" strokeDasharray="3,2" />

      <text x="390" y="152" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(255,255,255,0.5)">Undo last commit</text>
      <text x="390" y="165" textAnchor="middle" fontFamily="monospace" fontSize="9" fill={`${C}55`}>keeps changes in working dir</text>
      <text x="390" y="188" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#f59e0b88">⚠ rewrites history</text>

      {/* ===== Panel 3: git revert ===== */}
      <rect x="534" y="28" width="228" height="170" rx="5" fill={`${C}08`} stroke={`${C}44`} strokeWidth="1.2" />
      <rect x="534" y="28" width="228" height="22" rx="5" fill={`${C}18`} />
      <rect x="534" y="40" width="228" height="10" rx="0" fill={`${C}18`} />
      <text x="648" y="43" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={C}>git revert abc123</text>

      {/* Commit timeline: c1 → c2 → c3 → revert */}
      <line x1="550" y1="105" x2="748" y2="105" stroke={`${C}33`} strokeWidth="1.2" />
      {/* c1 */}
      <circle cx="568" cy="105" r="9" fill={`${C}22`} stroke={C} strokeWidth="1.2" />
      <text x="568" y="109" textAnchor="middle" fontFamily="monospace" fontSize="7" fill={C}>c1</text>
      {/* c2 */}
      <circle cx="610" cy="105" r="9" fill={`${C}22`} stroke={C} strokeWidth="1.2" />
      <text x="610" y="109" textAnchor="middle" fontFamily="monospace" fontSize="7" fill={C}>c2</text>
      {/* abc123 commit */}
      <circle cx="652" cy="105" r="9" fill="#ef444418" stroke="#ef444466" strokeWidth="1.2" />
      <text x="652" y="100" textAnchor="middle" fontFamily="monospace" fontSize="6" fill="#ef4444">abc</text>
      <text x="652" y="110" textAnchor="middle" fontFamily="monospace" fontSize="6" fill="#ef4444">123</text>
      {/* label */}
      <text x="652" y="126" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#ef444488">target</text>

      {/* revert commit — inverse */}
      <circle cx="710" cy="105" r="11" fill="#22c55e18" stroke="#22c55e" strokeWidth="1.4" />
      <text x="710" y="100" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#22c55e">+inv</text>
      <text x="710" y="111" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#22c55e">erse</text>
      <text x="710" y="126" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#22c55e88">new commit</text>

      {/* HEAD arrow */}
      <text x="710" y="88" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#22c55e">HEAD</text>
      <line x1="710" y1="91" x2="710" y2="94" stroke="#22c55e" strokeWidth="1" />

      <text x="648" y="152" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(255,255,255,0.5)">Safe undo (new commit)</text>
      <text x="648" y="165" textAnchor="middle" fontFamily="monospace" fontSize="9" fill={`${C}55`}>history stays intact</text>
      <text x="648" y="188" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#22c55e88">✓ safe for shared branches</text>
    </svg>
  )
}
