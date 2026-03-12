// src/pages/Home/index.tsx
import { useRef } from 'react'
import PageWrapper from '@/components/layout/PageWrapper'
import HeroSection from './HeroSection'
import CategoryGrid from './CategoryGrid'
import GalaxyBackground, { type GalaxyHandle } from './GalaxyBackground'
import CursorTrail, { type TrailHandle } from './CursorTrail'

const GRAIN_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`

export default function Home() {
  const galaxyRef = useRef<GalaxyHandle>(null)
  const trailRef = useRef<TrailHandle>(null)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    trailRef.current?.pushPoint(e.clientX - rect.left, e.clientY - rect.top)
  }

  return (
    <PageWrapper>
      <div
        style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', cursor: 'none' }}
        onMouseMove={handleMouseMove}
      >
        {/* Galaxy background — z-index 1 */}
        <GalaxyBackground ref={galaxyRef} />

        {/* Cursor trail — z-index 20, pointer-events: none (above content, never blocks interaction) */}
        <CursorTrail ref={trailRef} />

        {/* Film grain overlay — z-index 99 */}
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 99,
          backgroundImage: GRAIN_BG,
          backgroundSize: '200px 200px',
          mixBlendMode: 'overlay',
          opacity: 0.055,
        }} />

        {/* Content — z-index 10, centered column */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <HeroSection />
          <CategoryGrid galaxyRef={galaxyRef} trailRef={trailRef} />
        </div>
      </div>
    </PageWrapper>
  )
}
