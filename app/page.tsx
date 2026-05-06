import { HeroSection } from "@/components/landing/hero-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { RunningHeadlines } from "@/components/landing/running-headlines"
import { ImpactSection } from "@/components/landing/impact-section"
import {
  FeaturesSection,
  FaqSection,
  PricingSection,
} from "@/components/landing/more-sections"
import {
  BuiltForSection,
  GradientCtaSection,
  NewFooterSection,
  TestimonialsSection,
} from "@/components/landing/refined-sections"

export default function Page() {
  return (
    <main className="bg-[var(--color-white)] text-[var(--color-navy)]">
      <section id="home" className="scroll-mt-24">
        <HeroSection />
      </section>
      <FeaturesSection />
      <BuiltForSection />
      <section id="how-it-works" className="scroll-mt-24">
        <HowItWorksSection />
      </section>
      <section id="platforms" className="scroll-mt-24">
        <RunningHeadlines />
      </section>
      <TestimonialsSection />
      <ImpactSection />
      <PricingSection />
      <FaqSection />
      <GradientCtaSection />
      <NewFooterSection />
    </main>
  )
}
