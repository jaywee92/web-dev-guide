export default function VitestBanner() {
  const C = '#34d399'

  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#071410' }}>
      <defs>
        <pattern id="dots-vt" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-vt" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.07" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-vt)" />
      <rect width="780" height="220" fill="url(#glow-vt)" />

      {/* LEFT: Testing pyramid */}
      <text x="104" y="18" fill={`${C}80`} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="700">TESTING PYRAMID</text>

      {/* E2E — top (small, slow) */}
      <polygon points="104,30 74,72 134,72" fill="rgba(248,113,113,0.12)" stroke="rgba(248,113,113,0.4)" strokeWidth="1.2" />
      <text x="104" y="55" fontSize="8" fontFamily="monospace" fill="rgba(248,113,113,0.85)" textAnchor="middle">E2E</text>
      <text x="145" y="55" fontSize="8" fontFamily="monospace" fill="rgba(255,255,255,0.3)">slow</text>

      {/* Integration — middle */}
      <polygon points="104,76 60,124 148,124" fill="rgba(251,191,36,0.10)" stroke="rgba(251,191,36,0.35)" strokeWidth="1.2" />
      <text x="104" y="104" fontSize="8" fontFamily="monospace" fill="rgba(251,191,36,0.85)" textAnchor="middle">Integration</text>

      {/* Unit — base (many, fast) */}
      <polygon points="104,128 34,188 174,188" fill={`${C}12`} stroke={`${C}45`} strokeWidth="1.2" />
      <text x="104" y="163" fontSize="9" fontFamily="monospace" fill={C} textAnchor="middle">Unit Tests</text>
      <text x="104" y="178" fontSize="7" fontFamily="monospace" fill={`${C}70`} textAnchor="middle">fast · many · isolated</text>

      {/* Divider */}
      <line x1="200" y1="10" x2="200" y2="210" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* CENTER: Vitest test anatomy */}
      <text x="390" y="18" fill={`${C}90`} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="700">VITEST TEST ANATOMY</text>

      {[
        { code: "import { describe, it, expect } from 'vitest'", color: 'rgba(255,255,255,0.35)', indent: 0 },
        { code: '', color: '', indent: 0 },
        { code: "describe('add()', () => {", color: '#a78bfa', indent: 0 },
        { code: "  it('sums two numbers', () => {", color: '#60a5fa', indent: 0 },
        { code: "    const result = add(2, 3)", color: 'rgba(255,255,255,0.6)', indent: 0 },
        { code: `    expect(result).toBe(5)`, color: C, indent: 0 },
        { code: "  })", color: '#60a5fa', indent: 0 },
        { code: "})", color: '#a78bfa', indent: 0 },
      ].map(({ code, color }, i) => (
        <text key={i} x="215" y={32 + i * 20} fontSize="9.5" fontFamily="monospace" fill={color}>{code}</text>
      ))}

      {/* Labels */}
      <rect x="520" y="56" width="62" height="16" rx="3" fill="rgba(167,139,250,0.15)" stroke="rgba(167,139,250,0.3)" strokeWidth="1" />
      <text x="551" y="67" fontSize="8" fontFamily="monospace" fill="#a78bfa" textAnchor="middle">describe</text>
      <line x1="518" y1="64" x2="480" y2="64" stroke="rgba(167,139,250,0.3)" strokeWidth="1" />

      <rect x="520" y="76" width="50" height="16" rx="3" fill="rgba(96,165,250,0.12)" stroke="rgba(96,165,250,0.3)" strokeWidth="1" />
      <text x="545" y="87" fontSize="8" fontFamily="monospace" fill="#60a5fa" textAnchor="middle">it / test</text>
      <line x1="518" y1="84" x2="480" y2="84" stroke="rgba(96,165,250,0.3)" strokeWidth="1" />

      <rect x="520" y="96" width="46" height="16" rx="3" fill={`${C}15`} stroke={`${C}40`} strokeWidth="1" />
      <text x="543" y="107" fontSize="8" fontFamily="monospace" fill={C} textAnchor="middle">expect</text>
      <line x1="518" y1="104" x2="480" y2="104" stroke={`${C}40`} strokeWidth="1" />

      {/* Divider */}
      <line x1="590" y1="10" x2="590" y2="210" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* RIGHT: CLI output */}
      <text x="685" y="18" fill={`${C}70`} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="700">VITEST OUTPUT</text>

      {[
        { text: '✓ add() › sums two numbers', color: C },
        { text: '✓ multiply() › returns product', color: C },
        { text: '✗ divide() › throws on zero', color: '#f87171' },
        { text: '', color: '' },
        { text: 'Tests  3 | 2 passed | 1 failed', color: 'rgba(255,255,255,0.5)' },
        { text: 'Duration  42ms', color: 'rgba(255,255,255,0.3)' },
      ].map(({ text, color }, i) => (
        <text key={i} x="605" y={32 + i * 22} fontSize="8.5" fontFamily="monospace" fill={color}>{text}</text>
      ))}

      <text x="390" y="210" fill={`${C}30`} fontSize="9" fontFamily="monospace" textAnchor="middle">describe · it · expect · toBe · toEqual · beforeEach · vi.fn · vitest --watch</text>
    </svg>
  )
}
