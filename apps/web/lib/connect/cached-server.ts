import { unstable_cache } from 'next/cache'
import { graphqlRequest, GET_PLANS } from '@/lib/graphql/client'

interface GraphQLPlan {
  id: string
  code: string
  price: number
  createdAt: string
  updatedAt: string
}

interface GetPlansData {
  plans: GraphQLPlan[]
}

export const cacheTags = {
  plans: {
    all: 'plans',
    list: 'plans-list',
  },
} as const

/**
 * Cached server-side function to fetch plans from Mesh GraphQL.
 * Uses Next.js unstable_cache for request deduplication and revalidation support.
 */
export const getPlansCached = unstable_cache(
  async (): Promise<GraphQLPlan[]> => {
    const data = await graphqlRequest<GetPlansData>(GET_PLANS)
    return data.plans
  },
  ['plans', 'list'],
  {
    tags: [cacheTags.plans.all, cacheTags.plans.list],
    revalidate: 60,
  }
)

/**
 * Fetches plans without caching (for mutations that need fresh data).
 * Use getPlansCached for normal reads.
 */
export async function fetchPlansUncached(): Promise<GraphQLPlan[]> {
  const data = await graphqlRequest<GetPlansData>(GET_PLANS)
  return data.plans
}
