export default function ReactTestingBanner() {
  const C = '#34d399'

  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#071410' }}>
      <defs>
        <pattern id="dots-rtl" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-rtl" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.07" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-rtl)" />
      <rect width="780" height="220" fill="url(#glow-rtl)" />

      {/* LEFT: RTL Philosophy */}
      <text x="104" y="18" fill={`${C}80`} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="700">GUIDING PRINCIPLE</text>

      <rect x="20" y="26" width="168" height="50" rx="5" fill={`${C}08`} stroke={`${C}25`} strokeWidth="1" />
      <text x="104" y="44" fontSize="8.5" fontFamily="monospace" fill="rgba(255,255,255,0.55)" textAnchor="middle">"Test behavior,</text>
      <text x="104" y="57" fontSize="8.5" fontFamily="monospace" fill="rgba(255,255,255,0.55)" textAnchor="middle">not implementation."</text>
      <text x="104" y="70" fontSize="7.5" fontFamily="monospace" fill={`${C}60`} textAnchor="middle">— RTL philosophy</text>

      {/* Query priority ladder */}
      <text x="104" y="96" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace" textAnchor="middle">QUERY PRIORITY</text>

      {[
        { q: 'getByRole', note: 'preferred', color: C },
        { q: 'getByLabelText', note: 'forms', color: '#60a5fa' },
        { q: 'getByText', note: 'content', color: '#a78bfa' },
        { q: 'getByTestId', note: 'last resort', color: '#f87171' },
      ].map(({ q, note, color }, i) => (
        <g key={q}>
          <rect x="20" y={102 + i * 24} width="168" height="18" rx="3" fill={`${color}10`} stroke={`${color}28`} strokeWidth="1" />
          <text x="30" y={114 + i * 24} fontSize="8.5" fontFamily="monospace" fill={color}>{q}</text>
          <text x="178" y={114 + i * 24} fontSize="7.5" fontFamily="monospace" fill={`${color}70`} textAnchor="end">{note}</text>
        </g>
      ))}

      {/* Divider */}
      <line x1="200" y1="10" x2="200" y2="210" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* CENTER: Render → Query → Assert pattern as code */}
      <text x="390" y="18" fill={`${C}90`} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="700">RENDER → QUERY → ASSERT</text>

      {[
        { code: "import { render, screen, fireEvent }", color: 'rgba(255,255,255,0.3)' },
        { code: "  from '@testing-library/react'", color: 'rgba(255,255,255,0.3)' },
        { code: '', color: '' },
        { code: "it('shows greeting on click', () => {", color: '#60a5fa' },
        { code: "  render(<Greeter name=\"Ada\" />)         // 1. Render", color: C },
        { code: '', color: '' },
        { code: "  fireEvent.click(                        // 2. Act", color: '#fbbf24' },
        { code: "    screen.getByRole('button'))", color: '#fbbf24' },
        { code: '', color: '' },
        { code: "  expect(screen.getByText(               // 3. Assert", color: '#a78bfa' },
        { code: "    'Hello, Ada!')).toBeInTheDocument()", color: '#a78bfa' },
        { code: "})", color: '#60a5fa' },
      ].map(({ code, color }, i) => (
        <text key={i} x="215" y={30 + i * 16} fontSize="8.5" fontFamily="monospace" fill={color}>{code}</text>
      ))}

      {/* Divider */}
      <line x1="578" y1="10" x2="578" y2="210" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* RIGHT: userEvent vs fireEvent + async */}
      <text x="679" y="18" fill={`${C}70`} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="700">KEY APIS</text>

      {[
        { label: 'userEvent.click()', sub: 'realistic interactions', color: C },
        { label: 'fireEvent.change()', sub: 'low-level event', color: '#fbbf24' },
        { label: 'waitFor()', sub: 'async assertions', color: '#60a5fa' },
        { label: 'screen.debug()', sub: 'inspect DOM', color: '#a78bfa' },
        { label: 'within(el)', sub: 'scoped queries', color: 'rgba(255,255,255,0.5)' },
      ].map(({ label, sub, color }, i) => (
        <g key={label}>
          <rect x="594" y={26 + i * 36} width="172" height="28" rx="4" fill={`${color}0d`} stroke={`${color}28`} strokeWidth="1" />
          <text x="604" y={40 + i * 36} fontSize="8.5" fontFamily="monospace" fill={color}>{label}</text>
          <text x="604" y={50 + i * 36} fontSize="7.5" fontFamily="monospace" fill={`${color}70`}>{sub}</text>
        </g>
      ))}

      <text x="390" y="210" fill={`${C}30`} fontSize="9" fontFamily="monospace" textAnchor="middle">render · screen · getByRole · userEvent · fireEvent · waitFor · toBeInTheDocument</text>
    </svg>
  )
}
