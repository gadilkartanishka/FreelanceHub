import { CtaSection } from "@/components/landing/cta-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { Footer } from "@/components/landing/footer"
import { HeroSection } from "@/components/landing/hero-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { StatisticsSection } from "@/components/landing/statistics-section"

export default function Page() {
  return (
    <main className="bg-[var(--color-cream)] text-[var(--color-navy)]">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatisticsSection />
      <CtaSection />
      <Footer />
    </main>
  )
}
