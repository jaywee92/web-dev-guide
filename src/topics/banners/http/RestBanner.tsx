export default function RestBanner() {
  const C = '#34d399'
  const rows = [
    { method: 'GET',    methodColor: '#60a5fa', endpoint: '/users',     op: 'Read',   status: '200 OK',          statusColor: '#4ade80' },
    { method: 'POST',   methodColor: '#34d399', endpoint: '/users',     op: 'Create', status: '201 Created',     statusColor: '#4ade80' },
    { method: 'PUT',    methodColor: '#fbbf24', endpoint: '/users/42',  op: 'Update', status: '200 OK',          statusColor: '#4ade80' },
    { method: 'DELETE', methodColor: '#f87171', endpoint: '/users/42',  op: 'Delete', status: '204 No Content',  statusColor: '#94a3b8' },
  ]
  const tableX = 60, tableW = 660
  const colW = [90, 170, 140, 260]
  const colX = [tableX, tableX + 90, tableX + 260, tableX + 400]
  const headerY = 45, rowH = 34, startY = 79

  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-rest" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-rest" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-rest)" />
      <rect width="780" height="220" fill="url(#glow-rest)" />

      {/* Title */}
      <text x="390" y="22" fill={`${C}66`} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="600">REST API METHODS</text>

      {/* Table outer border */}
      <rect x={tableX} y={headerY} width={tableW} height={rowH + rows.length * rowH} rx="8" fill="none" stroke={`${C}25`} strokeWidth="1.5" />

      {/* Header row background */}
      <rect x={tableX} y={headerY} width={tableW} height={rowH} rx="8" fill={`${C}12`} />
      <rect x={tableX} y={headerY + 12} width={tableW} height={rowH - 12} fill={`${C}12`} />

      {/* Header labels */}
      {['Method', 'Endpoint', 'Operation', 'Status'].map((label, i) => (
        <text key={label} x={colX[i] + (i === 0 ? colW[0] / 2 : 8)} y={headerY + 20} fill={`${C}cc`} fontSize="10" fontFamily="monospace"
          textAnchor={i === 0 ? 'middle' : 'start'} fontWeight="700">{label}</text>
      ))}

      {/* Divider under header */}
      <line x1={tableX} y1={headerY + rowH} x2={tableX + tableW} y2={headerY + rowH} stroke={`${C}25`} strokeWidth="1" />

      {/* Data rows */}
      {rows.map((row, i) => {
        const rowY = startY + i * rowH
        const isEven = i % 2 === 0
        return (
          <g key={row.method}>
            {/* Alternating row bg */}
            {isEven && (
              <rect x={tableX} y={rowY} width={tableW} height={rowH}
                fill="rgba(255,255,255,0.02)"
                rx={i === rows.length - 1 ? 8 : 0} />
            )}
            {/* Row divider */}
            {i < rows.length - 1 && (
              <line x1={tableX} y1={rowY + rowH} x2={tableX + tableW} y2={rowY + rowH} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            )}
            {/* Method chip */}
            <rect x={colX[0] + 8} y={rowY + 8} width={colW[0] - 16} height={rowH - 16} rx="5"
              fill={`${row.methodColor}20`} stroke={`${row.methodColor}60`} strokeWidth="1.2" />
            <text x={colX[0] + colW[0] / 2} y={rowY + 21} fill={row.methodColor} fontSize="10" fontFamily="monospace"
              textAnchor="middle" fontWeight="700">{row.method}</text>
            {/* Endpoint */}
            <text x={colX[1] + 8} y={rowY + 21} fill="rgba(255,255,255,0.65)" fontSize="10.5" fontFamily="monospace">{row.endpoint}</text>
            {/* Operation */}
            <text x={colX[2] + 8} y={rowY + 21} fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="monospace">{row.op}</text>
            {/* Status */}
            <text x={colX[3] + 8} y={rowY + 21} fill={row.statusColor} fontSize="10" fontFamily="monospace">{row.status}</text>
          </g>
        )
      })}

      {/* Column dividers */}
      {[1, 2, 3].map(i => (
        <line key={i} x1={colX[i]} y1={headerY} x2={colX[i]} y2={headerY + rowH + rows.length * rowH} stroke={`${C}15`} strokeWidth="1" />
      ))}

      {/* Bottom note */}
      <text x="390" y="208" fill={`${C}35`} fontSize="9" fontFamily="monospace" textAnchor="middle">Stateless · Uniform Interface · Client-Server</text>
    </svg>
  )
}
