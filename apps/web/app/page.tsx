import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  type DehydratedState,
} from '@tanstack/react-query'
import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { HowItWorks } from '@/components/how-it-works'
import { Benefits } from '@/components/benefits'
import { Features } from '@/components/features'
import { Pricing } from '@/components/pricing'
import { Security } from '@/components/security'
import { CTABanner } from '@/components/cta-banner'
import { Footer } from '@/components/footer'
import { getPlansCached } from '@/lib/connect/cached-server'
import { queryKeys } from '@/lib/query-keys'

export default async function LandingPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: queryKeys.plans.list(),
    queryFn: getPlansCached,
  })

  const dehydratedState = dehydrate(queryClient)
  // Next.js requires plain objects without custom prototypes/toJSON helpers.
  const serializedState = JSON.parse(
    JSON.stringify(dehydratedState)
  ) as DehydratedState

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Benefits />
        <Features />
        <HydrationBoundary state={serializedState}>
          <Pricing />
        </HydrationBoundary>
        <Security />
        <CTABanner />
      </main>
      <Footer />
    </div>
  )
}
