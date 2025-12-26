import {
  dehydrate,
  HydrationBoundary,
  type DehydratedState,
} from '@tanstack/react-query'

import { Hero } from '@/components/features/marketing/hero'
import { HowItWorks } from '@/components/features/marketing/how-it-works'
import { Benefits } from '@/components/features/marketing/benefits'
import { Features } from '@/components/features/marketing/features'
import { Pricing } from '@/components/features/marketing/pricing'
import { Security } from '@/components/features/marketing/security'
import { CTABanner } from '@/components/features/marketing/cta-banner'

import { getPlanPricingCached } from '@/lib/connect/cached-server'
import { useGetPlanPricingQuery } from '@/graphql/generated'
import { createPrefetchQueryClient } from '@/lib/query/create-prefetch-query-client'

export default async function LandingPage() {
  const queryClient = await createPrefetchQueryClient()

  await queryClient.prefetchQuery({
    queryKey: useGetPlanPricingQuery.getKey(),
    queryFn: getPlanPricingCached,
  })

  const dehydratedState = dehydrate(queryClient)
  // Next.js requires plain objects without custom prototypes/toJSON helpers.
  const serializedState = JSON.parse(
    JSON.stringify(dehydratedState)
  ) as DehydratedState

  return (
    <>
      <Hero />
      <HowItWorks />
      <Benefits />
      <Features />
      <HydrationBoundary state={serializedState}>
        <Pricing />
      </HydrationBoundary>
      <Security />
      <CTABanner />
    </>
  )
}
