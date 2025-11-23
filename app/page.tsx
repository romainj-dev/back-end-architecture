import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { Benefits } from "@/components/benefits"
import { Features } from "@/components/features"
import { Pricing } from "@/components/pricing"
import { Security } from "@/components/security"
import { CTABanner } from "@/components/cta-banner"
import { Footer } from "@/components/footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Benefits />
        <Features />
        <Pricing />
        <Security />
        <CTABanner />
      </main>
      <Footer />
    </div>
  )
}
