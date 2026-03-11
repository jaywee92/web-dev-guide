import PageWrapper from '@/components/layout/PageWrapper'
import HeroSection from './HeroSection'
import CategoryGrid from './CategoryGrid'
import AuroraBackground from './AuroraBackground'

export default function Home() {
  return (
    <PageWrapper>
      <div style={{ position: 'relative', overflow: 'visible' }}>
        <AuroraBackground
          colorStops={['#1a4080', '#6d28d9', '#0e7490']}
          amplitude={1.2}
          blend={0.55}
          speed={0.08}
          opacity={0.5}
        />
        <HeroSection />
        <CategoryGrid />
      </div>
    </PageWrapper>
  )
}
