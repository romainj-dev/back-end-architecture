/**
 * Connect RPC server context for propagating request metadata.
 * This enables auth, tracing, and organization context to flow through service calls.
 */

import { AsyncLocalStorage } from 'node:async_hooks'
import {
  extractForwardableHeaders,
  type RequestContext,
} from '@/lib/graphql/client'

/**
 * Context object passed to Connect RPC handlers.
 * Contains forwarded headers and tracing metadata for downstream calls.
 */
export interface ConnectContext extends RequestContext {
  /** Request ID for tracing */
  requestId?: string
  /** Organization ID for multi-tenant operations */
  organizationId?: string
  /** User ID extracted from auth token (if authenticated) */
  userId?: string
}

/**
 * Creates a Connect context from incoming request headers.
 * Extracts auth, tracing, and organization headers for propagation.
 *
 * @param incomingHeaders - Headers from the incoming HTTP request
 * @returns ConnectContext with forwarded headers and extracted metadata
 */
export function createConnectContext(
  incomingHeaders: Record<string, string>
): ConnectContext {
  const headers = extractForwardableHeaders(incomingHeaders)

  return {
    headers,
    requestId:
      incomingHeaders['x-request-id'] ||
      incomingHeaders['x-correlation-id'] ||
      generateRequestId(),
    organizationId: incomingHeaders['x-organization-id'],
    // Note: userId would be extracted from JWT token validation
    // Placeholder until auth is implemented
    userId: undefined,
  }
}

/**
 * Generates a simple request ID for tracing.
 * In production, consider using UUID or a distributed ID generator.
 */
function generateRequestId(): string {
  return `req_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`
}

const contextStore = new AsyncLocalStorage<ConnectContext>()

/**
 * Runs a function with the provided ConnectContext using AsyncLocalStorage
 * to ensure isolation between concurrent requests.
 */
export function runWithConnectContext<T>(
  ctx: ConnectContext,
  fn: () => Promise<T>
): Promise<T> {
  return contextStore.run(ctx, fn)
}

/**
 * Retrieves the ConnectContext for the current async call stack.
 */
export function getConnectContext(): ConnectContext | undefined {
  return contextStore.getStore()
}
