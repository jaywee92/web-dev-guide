export default function ImagesBanner() {
  const C = '#ec4899'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-im" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-im" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="img-grad-im" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ec4899" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
        </linearGradient>
        {/* clip paths for each container */}
        <clipPath id="clip-stretch-im"><rect x="35" y="35" width="140" height="120" /></clipPath>
        <clipPath id="clip-contain-im"><rect x="215" y="35" width="140" height="120" /></clipPath>
        <clipPath id="clip-cover-im"><rect x="395" y="35" width="140" height="120" /></clipPath>
        <clipPath id="clip-fill-im"><rect x="575" y="35" width="140" height="120" /></clipPath>
      </defs>
      <rect width="780" height="220" fill="url(#dots-im)" />
      <rect width="780" height="220" fill="url(#glow-im)" />

      {/* ─── Container boxes ─── */}
      {[35, 215, 395, 575].map(x => (
        <rect key={x} x={x} y="35" width="140" height="120" rx="5"
          fill="rgba(236,72,153,0.04)" stroke="rgba(236,72,153,0.35)" strokeWidth="1.2" />
      ))}

      {/* 1. stretch — image fills container exactly (distorted: wide, short) */}
      <g clipPath="url(#clip-stretch-im)">
        <rect x="35" y="35" width="140" height="120" rx="5" fill="url(#img-grad-im)" opacity="0.75" />
      </g>
      <text x="105" y="170" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(236,72,153,0.7)">fill / stretch</text>

      {/* 2. contain — centered with letterbox bars (gray on sides) */}
      {/* side letterbox bars */}
      <rect x="215" y="35" width="30" height="120" fill="rgba(255,255,255,0.04)" clipPath="url(#clip-contain-im)" />
      <rect x="325" y="35" width="30" height="120" fill="rgba(255,255,255,0.04)" clipPath="url(#clip-contain-im)" />
      {/* portrait image centered */}
      <g clipPath="url(#clip-contain-im)">
        <rect x="246" y="35" width="78" height="120" fill="url(#img-grad-im)" opacity="0.75" />
      </g>
      <text x="285" y="170" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(236,72,153,0.7)">contain</text>

      {/* 3. cover — fills container, top/bottom cropped */}
      <g clipPath="url(#clip-cover-im)">
        {/* full-width image, taller than container — crops top/bottom */}
        <rect x="395" y="5" width="140" height="180" fill="url(#img-grad-im)" opacity="0.75" />
      </g>
      {/* crop indicator lines */}
      <line x1="390" y1="35" x2="540" y2="35" stroke="rgba(236,72,153,0.6)" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1="390" y1="155" x2="540" y2="155" stroke="rgba(236,72,153,0.6)" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="465" y="170" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(236,72,153,0.7)">cover</text>

      {/* 4. fill — same as contain visually (bars + centered portrait) */}
      <rect x="575" y="35" width="25" height="120" fill="rgba(255,255,255,0.04)" clipPath="url(#clip-fill-im)" />
      <rect x="715" y="35" width="25" height="120" fill="rgba(255,255,255,0.04)" clipPath="url(#clip-fill-im)" />
      <g clipPath="url(#clip-fill-im)">
        <rect x="601" y="35" width="74" height="120" fill="url(#img-grad-im)" opacity="0.75" />
      </g>
      <text x="645" y="170" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(236,72,153,0.7)">contain / fill</text>

      {/* object-fit label */}
      <text x="390" y="200" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="rgba(236,72,153,0.35)">object-fit</text>

      {/* aspect-ratio note */}
      <text x="390" y="215" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(236,72,153,0.25)">aspect-ratio · object-position</text>
    </svg>
  )
}
