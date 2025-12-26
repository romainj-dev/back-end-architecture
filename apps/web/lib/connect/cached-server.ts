import 'server-only'
import { cacheLife, cacheTag } from 'next/cache'
import { graphqlRequest } from '@/lib/graphql/server-client'
import {
  GetPlanPricingDocument,
  GetPlanPricingQuery,
} from '@/graphql/generated'

function isLocalBuild(): boolean {
  return process.env.CI !== 'true' && process.env.VERCEL !== '1'
}

function isConnectionRefused(error: unknown): boolean {
  if (!error || typeof error !== 'object') {
    return false
  }

  if ('code' in error && error.code === 'ECONNREFUSED') {
    return true
  }

  if ('cause' in error && error.cause && typeof error.cause === 'object') {
    const cause = error.cause as { code?: string }
    return cause.code === 'ECONNREFUSED'
  }

  return false
}

/**
 * Cached server-side function to fetch plan pricing from Mesh GraphQL.
 * Uses Next.js 'use cache' directive for request deduplication and revalidation support.
 */
export async function getPlanPricingCached(): Promise<
  GetPlanPricingQuery['plans']
> {
  'use cache'
  cacheLife('minutes')
  cacheTag('plans')

  try {
    const data = await graphqlRequest<GetPlanPricingQuery>(
      GetPlanPricingDocument
    )
    return data.plans
  } catch (error) {
    if (isLocalBuild() && isConnectionRefused(error)) {
      console.warn(
        `[getPlanPricingCached] Mesh gateway is not running on port ${process.env.MESH_GATEWAY_PORT}. Returning empty pricing data to keep the local build going.`
      )
      return []
    }
    throw error
  }
}
