import PageWrapper from '@/components/layout/PageWrapper'
import HeroSection from './HeroSection'
import CategoryGrid from './CategoryGrid'

export default function Home() {
  return (
    <PageWrapper>
      <HeroSection />
      <CategoryGrid />
    </PageWrapper>
  )
}
