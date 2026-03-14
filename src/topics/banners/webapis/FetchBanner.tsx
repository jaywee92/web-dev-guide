export default function FetchBanner() {
  const C = '#34d399'

  return (
    <svg
      width="100%"
      viewBox="0 0 780 220"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', background: '#07101a' }}
    >
      <defs>
        <pattern id="dots-fetch" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}1a`} />
        </pattern>
        <radialGradient id="glow-fetch" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
        <marker id="arrow-fetch" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill={`${C}99`} />
        </marker>
        <marker id="arrow-fetch-back" markerWidth="8" markerHeight="8" refX="2" refY="3" orient="auto">
          <path d="M8,0 L8,6 L0,3 z" fill={`${C}99`} />
        </marker>
        <marker id="arrow-fetch-red" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#f8717199" />
        </marker>
      </defs>
      <rect width="780" height="220" fill="url(#dots-fetch)" />
      <rect width="780" height="220" fill="url(#glow-fetch)" />

      {/* Browser box */}
      <rect x="18" y="60" width="110" height="52" rx="6" fill={`${C}12`} stroke={C} strokeWidth="1.5" />
      <text x="73" y="81" textAnchor="middle" fontFamily="monospace" fontSize="11" fill={C} fontWeight="bold">Browser</text>
      <text x="73" y="100" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}99`}>fetch(url)</text>

      {/* fetch() call box */}
      <rect x="158" y="60" width="120" height="52" rx="6" fill={`${C}0d`} stroke={`${C}70`} strokeWidth="1" />
      <text x="218" y="81" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}cc`}>Promise</text>
      <text x="218" y="97" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}99`}>{"<Response>"}</text>

      {/* Arrow: Browser → fetch call box */}
      <line x1="128" y1="86" x2="156" y2="86" stroke={`${C}80`} strokeWidth="1.5" markerEnd="url(#arrow-fetch)" />

      {/* HTTP GET arrow: fetch call box → Server */}
      <line x1="278" y1="75" x2="490" y2="75" stroke={`${C}80`} strokeWidth="1.5" markerEnd="url(#arrow-fetch)" />
      <text x="384" y="68" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}cc`}>GET /api/data</text>

      {/* Server/API box */}
      <rect x="492" y="55" width="120" height="62" rx="6" fill={`${C}12`} stroke={C} strokeWidth="1.5" />
      <text x="552" y="77" textAnchor="middle" fontFamily="monospace" fontSize="11" fill={C} fontWeight="bold">Server / API</text>
      <text x="552" y="95" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}99`}>REST endpoint</text>

      {/* JSON response arrow: Server → fetch call box */}
      <line x1="492" y1="98" x2="280" y2="98" stroke={`${C}80`} strokeWidth="1.5" markerEnd="url(#arrow-fetch-back)" />
      <text x="384" y="112" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}cc`}>200 OK · JSON</text>

      {/* Data object result */}
      <rect x="626" y="55" width="142" height="62" rx="6" fill={`${C}0d`} stroke={`${C}50`} strokeWidth="1" />
      <text x="697" y="74" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}cc`}>{`{ id: 1,`}</text>
      <text x="697" y="89" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}cc`}>{`  name: "...",`}</text>
      <text x="697" y="104" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}cc`}>{`  ok: true }`}</text>
      <line x1="612" y1="86" x2="626" y2="86" stroke={`${C}60`} strokeWidth="1.5" markerEnd="url(#arrow-fetch)" />

      {/* Loading state branch */}
      <line x1="384" y1="75" x2="384" y2="145" stroke={`${C}40`} strokeWidth="1" strokeDasharray="4,3" />
      <circle cx="384" cy="158" r="10" fill="none" stroke={`${C}80`} strokeWidth="1.5" strokeDasharray="18,6" />
      <text x="384" y="162" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}99`}>…</text>
      <text x="384" y="182" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}70`}>loading</text>

      {/* Error state branch */}
      <line x1="278" y1="86" x2="230" y2="145" stroke="#f8717140" strokeWidth="1" strokeDasharray="4,3" />
      <text x="218" y="158" textAnchor="middle" fontFamily="monospace" fontSize="14" fill="#f87171cc">✕</text>
      <text x="218" y="175" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#f8717199">error</text>
      <rect x="158" y="182" width="120" height="16" rx="3" fill="#f8717112" stroke="#f8717140" strokeWidth="1" />
      <text x="218" y="194" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#f87171cc">catch(err =&gt; ...)</text>

      {/* async/await code snippet */}
      <rect x="492" y="140" width="276" height="52" rx="5" fill="#ffffff08" stroke={`${C}30`} strokeWidth="1" />
      <text x="504" y="157" fontFamily="monospace" fontSize="10" fill={`${C}80`}>async/await alternative:</text>
      <text x="504" y="172" fontFamily="monospace" fontSize="10" fill={`${C}cc`}>{"const res = await fetch(url)"}</text>
      <text x="504" y="186" fontFamily="monospace" fontSize="10" fill={`${C}cc`}>{"const data = await res.json()"}</text>

      {/* Footer label */}
      <text x="390" y="212" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={`${C}50`}>
        Fetch API · HTTP requests from the browser
      </text>
    </svg>
  )
}
