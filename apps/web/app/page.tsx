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
import { getPlansResponseCached } from '@/lib/connect/cached-server'
import { connectQueryKeys } from '@/lib/query-keys'

export default async function LandingPage() {
  const queryClient = new QueryClient()

  // Prefetch plans data server-side using Next.js cache for SSR revalidation
  // Uses connectQueryKeys to align with connect-query's automatic key generation
  // This ensures SSR prefetch data hydrates correctly with client hooks
  await queryClient.prefetchQuery({
    queryKey: connectQueryKeys.plans.list(),
    queryFn: getPlansResponseCached,
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
