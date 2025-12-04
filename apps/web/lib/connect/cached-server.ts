import { unstable_cache } from 'next/cache'
import { listPlans } from '@/server/connect/plan-service'
import type { Plan } from '@rpc/plan/v1/plan_pb'
import type { ListPlansResponse } from '@rpc/plan/v1/plan_pb'

/**
 * Cache tags for Next.js revalidation.
 * These tags allow granular invalidation of cached data.
 */
export const cacheTags = {
  plans: {
    all: 'plans',
    list: 'plans-list',
  },
  users: {
    all: 'users',
    list: 'users-list',
    detail: (id: string) => `users-${id}`,
  },
} as const

/**
 * Cached server-side function to fetch plans.
 * Uses Next.js unstable_cache for request deduplication and revalidation support.
 *
 * - Cached for 60 seconds by default
 * - Tagged for granular revalidation via `revalidateTag('plans-list')`
 */
export const getPlansCached = unstable_cache(
  async (): Promise<Plan[]> => {
    const response = await listPlans()
    return response.plans
  },
  // Cache key for Next.js unstable_cache
  ['plans', 'list'],
  {
    tags: [cacheTags.plans.all, cacheTags.plans.list],
    revalidate: 60, // Revalidate every 60 seconds
  }
)

/**
 * Fetches the full ListPlansResponse (for SSR prefetch with connect-query).
 * Returns the response in the format expected by connect-query hooks.
 */
export const getPlansResponseCached = unstable_cache(
  async (): Promise<ListPlansResponse> => {
    return listPlans()
  },
  // Cache key for Next.js unstable_cache
  ['plans', 'response'],
  {
    tags: [cacheTags.plans.all, cacheTags.plans.list],
    revalidate: 60,
  }
)

/**
 * Fetches plans without caching (for mutations that need fresh data).
 * Use getPlansCached for normal reads.
 */
export async function fetchPlansUncached(): Promise<Plan[]> {
  const response = await listPlans()
  return response.plans
}
