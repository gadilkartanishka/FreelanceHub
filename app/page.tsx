import { CtaSection } from "@/components/landing/cta-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { Footer } from "@/components/landing/footer"
import { HeroSection } from "@/components/landing/hero-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { KineticTextSection } from "@/components/landing/kinetic-text-section"

export default function Page() {
  return (
    <main className="bg-[var(--color-cream)] text-[var(--color-navy)]">
      <HeroSection />
      <KineticTextSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CtaSection />
      <Footer />
    </main>
  )
}
