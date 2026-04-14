export default function CoverageCIBanner() {
  const C = '#34d399'

  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#071410' }}>
      <defs>
        <pattern id="dots-ci" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-ci" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.07" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-ci)" />
      <rect width="780" height="220" fill="url(#glow-ci)" />

      {/* LEFT: Coverage report */}
      <text x="104" y="18" fill={`${C}80`} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="700">COVERAGE REPORT</text>

      {/* Header row */}
      <rect x="20" y="24" width="168" height="16" rx="2" fill="rgba(255,255,255,0.05)" />
      {['File', 'Stmts', 'Lines'].map((h, i) => (
        <text key={h} x={[28, 112, 154][i]} y="35" fontSize="7.5" fontFamily="monospace" fill="rgba(255,255,255,0.4)">{h}</text>
      ))}

      {[
        { file: 'utils.ts',    stmts: '100%', lines: '100%', color: C },
        { file: 'auth.ts',     stmts: '87%',  lines: '89%',  color: '#fbbf24' },
        { file: 'api.ts',      stmts: '54%',  lines: '52%',  color: '#f87171' },
        { file: 'helpers.ts',  stmts: '92%',  lines: '93%',  color: C },
      ].map(({ file, stmts, lines, color }, i) => (
        <g key={file}>
          <rect x="20" y={42 + i * 22} width="168" height="18" rx="2" fill={i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'none'} />
          <text x="28" y={54 + i * 22} fontSize="8" fontFamily="monospace" fill="rgba(255,255,255,0.55)">{file}</text>
          <text x="112" y={54 + i * 22} fontSize="8" fontFamily="monospace" fill={color}>{stmts}</text>
          <text x="154" y={54 + i * 22} fontSize="8" fontFamily="monospace" fill={color}>{lines}</text>
        </g>
      ))}

      {/* Total bar */}
      <rect x="20" y="134" width="168" height="18" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <text x="28" y="146" fontSize="8" fontFamily="monospace" fill="rgba(255,255,255,0.4)">All files</text>
      <rect x="100" y="138" width="82" height="10" rx="5" fill="rgba(0,0,0,0.3)" />
      <rect x="100" y="138" width="67" height="10" rx="5" fill={`${C}60`} />
      <text x="148" y="147" fontSize="7.5" fontFamily="monospace" fill={C} textAnchor="middle">82%</text>

      <text x="104" y="168" fontSize="8" fontFamily="monospace" fill="rgba(255,255,255,0.3)" textAnchor="middle">--coverage.threshold: 70</text>

      {/* Divider */}
      <line x1="200" y1="10" x2="200" y2="210" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* CENTER: GitHub Actions CI pipeline */}
      <text x="390" y="18" fill={`${C}90`} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="700">GITHUB ACTIONS PIPELINE</text>

      {[
        { step: 'push / pull_request',   icon: '⬆', color: 'rgba(255,255,255,0.4)' },
        { step: 'checkout repo',          icon: '📦', color: 'rgba(255,255,255,0.55)' },
        { step: 'setup Node.js',          icon: '🟢', color: '#68d391' },
        { step: 'npm ci',                 icon: '⬇', color: 'rgba(255,255,255,0.55)' },
        { step: 'vitest run --coverage',  icon: '🧪', color: C },
        { step: 'coverage gate ≥ 70%',   icon: '✓', color: C },
      ].map(({ step, icon, color }, i) => (
        <g key={step}>
          <rect x="220" y={26 + i * 30} width="340" height="22" rx="4" fill={`${color}0c`} stroke={`${color}22`} strokeWidth="1" />
          <text x="234" y={41 + i * 30} fontSize="10" fontFamily="monospace" fill={color}>{icon}</text>
          <text x="252" y={41 + i * 30} fontSize="9" fontFamily="monospace" fill={color}>{step}</text>
          {i < 5 && (
            <line x1="390" y1={50 + i * 30} x2="390" y2={56 + i * 30} stroke={`${color}40`} strokeWidth="1.5" strokeDasharray="2,2" />
          )}
        </g>
      ))}

      {/* Divider */}
      <line x1="572" y1="10" x2="572" y2="210" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* RIGHT: vitest.config.ts snippet */}
      <text x="676" y="18" fill={`${C}70`} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="700">CONFIG</text>

      {[
        { code: "// vitest.config.ts",           color: 'rgba(255,255,255,0.25)' },
        { code: "export default defineConfig({", color: 'rgba(255,255,255,0.5)' },
        { code: "  test: {",                     color: 'rgba(255,255,255,0.5)' },
        { code: "    environment:",               color: C },
        { code: "      'jsdom',",                color: '#fbbf24' },
        { code: "    coverage: {",               color: 'rgba(255,255,255,0.5)' },
        { code: "      provider: 'v8',",         color: '#60a5fa' },
        { code: "      threshold: {",            color: 'rgba(255,255,255,0.5)' },
        { code: "        lines: 70,",            color: C },
        { code: "      }",                       color: 'rgba(255,255,255,0.5)' },
        { code: "  }",                           color: 'rgba(255,255,255,0.5)' },
        { code: "})",                            color: 'rgba(255,255,255,0.5)' },
      ].map(({ code, color }, i) => (
        <text key={i} x="586" y={28 + i * 16} fontSize="8" fontFamily="monospace" fill={color}>{code}</text>
      ))}

      <text x="390" y="210" fill={`${C}30`} fontSize="9" fontFamily="monospace" textAnchor="middle">--coverage · v8 · istanbul · threshold · GitHub Actions · ci.yml · coverage badge</text>
    </svg>
  )
}
