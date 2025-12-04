'use client'

import { useQuery } from '@connectrpc/connect-query'
import { listPlans } from '@rpc/plan/v1/plan-PlanService_connectquery'

/**
 * Hook to fetch plans using connect-query.
 *
 * Uses the generated connect-query descriptor for:
 * - Automatic query key generation (aligned with SSR)
 * - Type-safe request/response handling
 * - Transport integration via ConnectProvider
 *
 * The query key is automatically derived from the service/method names,
 * ensuring SSR prefetch and client hydration stay in sync.
 */
export function usePlansQuery() {
  return useQuery(listPlans, {})
}
