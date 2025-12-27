import 'server-only'

import { cacheLife, cacheTag } from 'next/cache'
import { graphqlRequest } from '@/lib/graphql/server-client'
import {
  GetPlanPricingDocument,
  GetPlanPricingQuery,
} from '@/graphql/generated'

/**
 * Cached server-side function to fetch plan pricing from Mesh GraphQL.
 * Uses Next.js 'use cache' directive for request deduplication and revalidation support.
 */
export async function getPlanPricingCached(): Promise<GetPlanPricingQuery> {
  'use cache'
  cacheLife('minutes')
  cacheTag('plans')

  try {
    return graphqlRequest<GetPlanPricingQuery>(GetPlanPricingDocument)
  } catch (error) {
    console.warn(
      `[getPlanPricingCached] prefetching failed. Check that Mesh gateway is running on port ${process.env.MESH_GATEWAY_PORT}.`
    )

    throw error
  }
}
