import ApresentationSection from '@/layout/ApresentationSection'
import DemonstrantionSection from '@/layout/DemonstrantionSection'
import ServicesSection from '@/layout/ServicesSection'
import HeroSection from '../layout/HeroSection'

export default function Home() {
  return (
    <main style={{ marginTop: '5rem' }}>
      <HeroSection />
      <ServicesSection />
      <ApresentationSection />
      <DemonstrantionSection />
    </main>
  )
}
