export default function ModulesBanner() {
  const YELLOW = '#fbbf24'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-md" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${YELLOW}15`} />
        </pattern>
        <radialGradient id="glow-md" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={YELLOW} stopOpacity="0.05" />
          <stop offset="100%" stopColor={YELLOW} stopOpacity="0" />
        </radialGradient>
        <marker id="arrow-md" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill={`${YELLOW}80`} />
        </marker>
      </defs>
      <rect width="780" height="220" fill="url(#dots-md)" />
      <rect width="780" height="220" fill="url(#glow-md)" />

      {/* === utils.js (left panel) === */}
      <rect x="22" y="22" width="220" height="130" rx="7" fill={`${YELLOW}06`} stroke={`${YELLOW}30`} strokeWidth="1.5" />
      <text x="36" y="42" fill={`${YELLOW}80`} fontSize="9.5" fontFamily="monospace" fontWeight="700">utils.js</text>
      <rect x="36" y="50" width="192" height="1" fill={`${YELLOW}20`} />
      <text x="36" y="68" fill={`${YELLOW}55`} fontSize="9" fontFamily="monospace">export</text>
      <text x="82" y="68" fill={`${YELLOW}cc`} fontSize="9" fontFamily="monospace">const PI = 3.14159</text>
      <text x="36" y="84" fill={`${YELLOW}55`} fontSize="9" fontFamily="monospace">export</text>
      <text x="82" y="84" fill={`${YELLOW}cc`} fontSize="9" fontFamily="monospace">function add(a, b)</text>
      <text x="36" y="100" fill={`${YELLOW}55`} fontSize="9" fontFamily="monospace">export</text>
      <text x="82" y="100" fill={`${YELLOW}cc`} fontSize="9" fontFamily="monospace">function sub(a, b)</text>
      <text x="36" y="118" fill={`${YELLOW}40`} fontSize="8.5" fontFamily="monospace">export default</text>
      <text x="36" y="131" fill={`${YELLOW}99`} fontSize="8.5" fontFamily="monospace">  class MathUtils {'{ ... }'}</text>

      {/* === center arrow + label === */}
      <line x1="244" y1="88" x2="314" y2="88" stroke={`${YELLOW}70`} strokeWidth="1.5" markerEnd="url(#arrow-md)" />
      <text x="279" y="80" fill={`${YELLOW}60`} fontSize="8.5" fontFamily="monospace" textAnchor="middle">import</text>

      {/* === app.js (right panel) === */}
      <rect x="316" y="22" width="220" height="130" rx="7" fill={`${YELLOW}06`} stroke={`${YELLOW}30`} strokeWidth="1.5" />
      <text x="330" y="42" fill={`${YELLOW}80`} fontSize="9.5" fontFamily="monospace" fontWeight="700">app.js</text>
      <rect x="330" y="50" width="192" height="1" fill={`${YELLOW}20`} />
      <text x="330" y="68" fill={`${YELLOW}55`} fontSize="9" fontFamily="monospace">import</text>
      <text x="372" y="68" fill={`${YELLOW}cc`} fontSize="9" fontFamily="monospace">{'{ PI, add }'}</text>
      <text x="330" y="82" fill={`${YELLOW}40`} fontSize="8.5" fontFamily="monospace">  from './utils.js'</text>
      <rect x="330" y="91" width="192" height="1" fill={`${YELLOW}18`} />
      <text x="330" y="108" fill={`${YELLOW}aa`} fontSize="9" fontFamily="monospace">console.log(PI)</text>
      <text x="330" y="124" fill={`${YELLOW}aa`} fontSize="9" fontFamily="monospace">const sum = add(2, 3)</text>

      {/* === npm package box === */}
      <rect x="22" y="168" width="514" height="40" rx="6" fill="rgba(99,102,241,0.07)" stroke="rgba(99,102,241,0.30)" strokeWidth="1.2" />
      <text x="36" y="183" fill="rgba(99,102,241,0.70)" fontSize="8.5" fontFamily="monospace">node_modules / npm package</text>
      <text x="36" y="199" fill="rgba(99,102,241,0.90)" fontSize="9" fontFamily="monospace">import _ from 'lodash'</text>
      <text x="240" y="199" fill={`${YELLOW}55`} fontSize="9" fontFamily="monospace">import {'{ debounce }'} from 'lodash'</text>

      {/* === ESM vs CJS note === */}
      <rect x="556" y="22" width="202" height="186" rx="7" fill={`${YELLOW}04`} stroke={`${YELLOW}20`} strokeWidth="1.2" />
      <text x="570" y="42" fill={`${YELLOW}55`} fontSize="8.5" fontFamily="monospace">ESM</text>
      <text x="570" y="58" fill={`${YELLOW}cc`} fontSize="8.5" fontFamily="monospace">import / export</text>
      <text x="570" y="73" fill={`${YELLOW}55`} fontSize="8" fontFamily="monospace">static, tree-shakeable</text>
      <rect x="570" y="82" width="174" height="1" fill={`${YELLOW}18`} />
      <text x="570" y="98" fill={`${YELLOW}45`} fontSize="8.5" fontFamily="monospace">CJS (legacy)</text>
      <text x="570" y="114" fill={`${YELLOW}aa`} fontSize="8.5" fontFamily="monospace">require() / exports</text>
      <text x="570" y="129" fill={`${YELLOW}45`} fontSize="8" fontFamily="monospace">dynamic, synchronous</text>
      <rect x="570" y="138" width="174" height="1" fill={`${YELLOW}18`} />
      <text x="570" y="154" fill={`${YELLOW}45`} fontSize="8.5" fontFamily="monospace">package.json</text>
      <text x="570" y="170" fill={`${YELLOW}cc`} fontSize="8.5" fontFamily="monospace">"type": "module"</text>
      <text x="570" y="185" fill={`${YELLOW}45`} fontSize="8" fontFamily="monospace">enables ESM in Node</text>
    </svg>
  )
}
