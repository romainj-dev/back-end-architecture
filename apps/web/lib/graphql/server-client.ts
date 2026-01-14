import 'server-only'

/**
 * GraphQL client for server-side requests (RSC, API routes, cached functions).
 * Connects directly to the Mesh gateway and attaches session auth.
 */

import { FORWARDED_HEADERS } from '@/lib/connect/forwarded-headers'
import { parseBffEnv } from '@shared/env'
import { SignJWT } from 'jose'
import { print } from 'graphql'
import type { DocumentNode } from 'graphql'

const bffEnv = parseBffEnv()

interface GraphQLResponse<T> {
  data?: T
  errors?: Array<{ message: string }>
}

/**
 * Authenticated user info for building auth headers.
 */
export interface AuthUser {
  id: string
  email: string
  name?: string | null
}

/**
 * Options for graphqlRequest.
 */
export interface GraphqlRequestOptions {
  headers?: Record<string, string>
  /**
   * The authenticated user. If provided, a signed JWT will be attached to the
   * request. Pass null/undefined for unauthenticated requests (public endpoints).
   */
  user?: AuthUser | null
}

/**
 * Extract forwardable headers from an incoming request.
 * Filters to only include headers that should be propagated.
 */
export function extractForwardableHeaders(
  incomingHeaders: Record<string, string>
): Record<string, string> {
  const forwarded: Record<string, string> = {}
  for (const key of FORWARDED_HEADERS) {
    const value = incomingHeaders[key.toLowerCase()]
    if (value) {
      forwarded[key] = value
    }
  }
  return forwarded
}

export class GraphqlRequestError extends Error {
  status: number
  statusText: string
  errors?: Array<{ message: string }>

  constructor(
    message: string,
    options: {
      status: number
      statusText: string
      errors?: Array<{ message: string }>
    }
  ) {
    super(message)
    this.status = options.status
    this.statusText = options.statusText
    this.errors = options.errors
  }
}

function getMeshGraphqlUrl(): string {
  return `${bffEnv.API_URL}:${bffEnv.MESH_GATEWAY_PORT}/graphql`
}

/**
 * Build Authorization header with a signed JWT for the given user.
 * Returns empty object if no user is provided (for unauthenticated requests).
 *
 * IMPORTANT: This module does NOT call auth() internally. Callers must provide
 * the authenticated user explicitly via the `user` option.
 *
 * Why? NextAuth's auth() relies on cookies from the request context. In Next.js,
 * this context can be "lost" when auth() is called deep in nested async functions
 * (e.g., Server Actions calling helpers that call graphqlRequest). The auth() call
 * silently returns null even when the user is authenticated.
 *
 * By requiring callers to pass the user explicitly, we ensure auth is resolved
 * once at the entry point (route handler, server action) where context is available.
 */
async function buildAuthHeaders(
  user?: AuthUser | null
): Promise<Record<string, string>> {
  if (!user?.id || !user.email) {
    return {}
  }

  const secret = new TextEncoder().encode(bffEnv.AUTH_SECRET)
  const token = await new SignJWT({
    id: user.id,
    email: user.email,
    name: user.name,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(secret)

  return { Authorization: `Bearer ${token}` }
}

export function buildForwardableHeaders(
  incomingHeaders: Record<string, string>
): Record<string, string> {
  return extractForwardableHeaders(incomingHeaders)
}

export async function graphqlRequest<T>(
  query: string | DocumentNode,
  variables?: Record<string, unknown>,
  options?: GraphqlRequestOptions
): Promise<T> {
  const queryString = typeof query === 'string' ? query : print(query)
  const url = getMeshGraphqlUrl()

  const authHeaders = await buildAuthHeaders(options?.user)
  const headers = {
    'Content-Type': 'application/json',
    ...(options?.headers ?? {}),
    ...authHeaders,
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query: queryString, variables }),
    cache: 'no-store',
  })

  let json: GraphQLResponse<T> | undefined
  try {
    json = (await response.json()) as GraphQLResponse<T>
  } catch {
    throw new GraphqlRequestError('Failed to parse GraphQL response', {
      status: 502,
      statusText: 'Bad Gateway',
    })
  }

  // Transport error (non-2xx)
  if (!response.ok) {
    throw new GraphqlRequestError(
      `GraphQL request failed: ${response.status} ${response.statusText}`,
      {
        status: response.status,
        statusText: response.statusText,
        errors: json?.errors,
      }
    )
  }

  // GraphQL-level errors
  if (json?.errors?.length) {
    const message = json.errors.map((e) => e.message).join(', ')
    throw new GraphqlRequestError(`GraphQL errors: ${message}`, {
      status: 502,
      statusText: 'Bad Gateway',
      errors: json.errors,
    })
  }

  // No data returned
  if (!json?.data) {
    throw new GraphqlRequestError('No data returned from GraphQL gateway', {
      status: 502,
      statusText: 'Bad Gateway',
    })
  }

  return json.data
}
