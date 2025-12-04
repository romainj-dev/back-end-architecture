import { createPromiseClient } from '@connectrpc/connect'
import { PlanService } from '@rpc/plan/v1/plan_connect'
import { transport } from '@/components/providers/connect-provider'

/**
 * Type-safe Connect client for PlanService.
 *
 * Uses the shared transport from ConnectProvider for consistency
 * with connect-query hooks. Prefer using connect-query hooks directly
 * (e.g., usePlansQuery) when possible for automatic caching benefits.
 *
 * This client is useful for:
 * - Imperative calls outside React components
 * - Mutations before connect-query mutation support
 * - Server-side usage (though prefer server/connect/* for SSR)
 */
export const planClient = createPromiseClient(PlanService, transport)
