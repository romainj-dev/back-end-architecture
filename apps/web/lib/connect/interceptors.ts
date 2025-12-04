import type { Interceptor } from '@connectrpc/connect'
import { FORWARDED_HEADERS } from '@/lib/connect/forwarded-headers'

/**
 * Auth interceptor that propagates authorization headers to Connect requests.
 * Used for authenticated RPC calls from client components.
 *
 * @param getToken - Function to retrieve the current auth token
 * @returns Interceptor that adds Authorization header to requests
 *
 * @example
 * ```ts
 * const client = createClient(PlanService, transport, {
 *   interceptors: [authInterceptor(() => session?.access_token ?? null)],
 * })
 * ```
 */
export function authInterceptor(getToken: () => string | null): Interceptor {
  return (next) => async (req) => {
    const token = getToken()
    if (token) {
      req.header.set('Authorization', `Bearer ${token}`)
    }
    return next(req)
  }
}

/**
 * Organization interceptor that adds organization context to requests.
 * Used for multi-tenant operations.
 *
 * @param getOrgId - Function to retrieve the current organization ID
 * @returns Interceptor that adds X-Organization-Id header to requests
 */
export function organizationInterceptor(
  getOrgId: () => string | null
): Interceptor {
  return (next) => async (req) => {
    const orgId = getOrgId()
    if (orgId) {
      req.header.set('X-Organization-Id', orgId)
    }
    return next(req)
  }
}

/**
 * Tracing interceptor that adds request correlation IDs.
 * Enables distributed tracing across services.
 *
 * @param getRequestId - Optional function to get an existing request ID
 * @returns Interceptor that adds X-Request-Id header to requests
 */
export function tracingInterceptor(
  getRequestId?: () => string | null
): Interceptor {
  return (next) => async (req) => {
    const existingId = getRequestId?.()
    const requestId =
      existingId ??
      `req_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`
    req.header.set('X-Request-Id', requestId)
    return next(req)
  }
}

/**
 * Logging interceptor for debugging Connect requests.
 * Only active in development.
 */
export const loggingInterceptor: Interceptor = (next) => async (req) => {
  if (process.env.NODE_ENV === 'development') {
    const start = Date.now()
    // eslint-disable-next-line no-console
    console.log(`[Connect] → ${req.service.typeName}/${req.method.name}`)
    try {
      const response = await next(req)
      // eslint-disable-next-line no-console
      console.log(
        `[Connect] ← ${req.service.typeName}/${req.method.name} (${Date.now() - start}ms)`
      )
      return response
    } catch (error) {
      console.error(
        `[Connect] ✗ ${req.service.typeName}/${req.method.name} (${Date.now() - start}ms)`,
        error
      )
      throw error
    }
  }
  return next(req)
}

/**
 * List of headers that are forwarded from client to server.
 * Re-exported for convenience.
 */
export { FORWARDED_HEADERS }
