import { Footer } from "@/components/landing/footer"
import { HeroSection } from "@/components/landing/hero-section"
import { ImpactSection } from "@/components/landing/impact-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { KineticTextSection } from "@/components/landing/kinetic-text-section"
import { RunningHeadlines } from "@/components/landing/running-headlines"

export default function Page() {
  return (
    <main className="bg-[var(--color-white)] text-[var(--color-navy)]">
      <section id="home" className="scroll-mt-24">
        <HeroSection />
      </section>
      <section id="how-it-works" className="scroll-mt-24">
        <KineticTextSection />
      </section>
      <section id="platforms" className="scroll-mt-24">
        <RunningHeadlines />
      </section>
      <section id="referrals" className="scroll-mt-24">
        <HowItWorksSection />
      </section>
      <ImpactSection />
      <section id="faq" className="scroll-mt-24">
        <Footer />
      </section>
    </main>
  )
}
