'use client'

import { useQuery } from '@tanstack/react-query'
import { graphqlRequest, GET_PLANS } from '@/lib/graphql/client'
import type { GetPlansQuery } from '@/graphql/generated/types'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch plans using GraphQL (Mesh gateway) with TanStack Query.
 */
export function usePlansQuery() {
  return useQuery({
    queryKey: queryKeys.plans.list(),
    queryFn: async () => {
      const data = await graphqlRequest<GetPlansQuery>(GET_PLANS)
      return data.plans
    },
  })
}
