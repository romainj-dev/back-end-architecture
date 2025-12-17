import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  type DehydratedState,
} from '@tanstack/react-query'
import { Header } from '@/components/layout/header'
import { Hero } from '@/components/features/marketing/hero'
import { HowItWorks } from '@/components/features/marketing/how-it-works'
import { Benefits } from '@/components/features/marketing/benefits'
import { Features } from '@/components/features/marketing/features'
import { Pricing } from '@/components/features/marketing/pricing'
import { Security } from '@/components/features/marketing/security'
import { CTABanner } from '@/components/features/marketing/cta-banner'
import { Footer } from '@/components/layout/footer'
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
