/**
 * Server-side Connect helpers.
 *
 * For SSR with caching, prefer using exports from `@/lib/connect/cached-server`:
 * - `getPlansCached` - Next.js cached fetch with revalidation tags
 * - `fetchPlansUncached` - Direct fetch without caching
 *
 * For cache invalidation in admin flows, see `@/lib/connect/revalidate`:
 * - `revalidatePlans()` - Invalidate plans list cache
 * - `revalidateAllPlans()` - Invalidate all plans-related caches
 */

export { getPlansCached, fetchPlansUncached, cacheTags } from './cached-server'

export {
  revalidatePlans,
  revalidateAllPlans,
  revalidateHomePage,
  revalidateUser,
  revalidateAllUsers,
} from './revalidate'
