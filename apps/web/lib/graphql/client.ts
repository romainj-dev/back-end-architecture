/**
 * GraphQL client for calling the Mesh gateway from server-side code.
 * Uses @shared/env for configuration instead of process.env directly.
 */

import { env } from '@/lib/env'
import { FORWARDED_HEADERS } from '@/lib/connect/forwarded-headers'

/**
 * Build the Mesh GraphQL URL from environment configuration.
 * Supports explicit URL override via env.
 */
function getMeshGraphqlUrl(): string {
  const proxyPath =
    process.env.NEXT_PUBLIC_MESH_PROXY_PATH ?? '/api/mesh/graphql'
  const meshUrl =
    process.env.MESH_PUBLIC_GRAPHQL_URL ?? env.MESH_PUBLIC_GRAPHQL_URL

  if (typeof window !== 'undefined') {
    // In the browser, use same-origin proxy to avoid CORS.
    return proxyPath
  }

  return meshUrl ?? proxyPath
}

interface GraphQLResponse<T> {
  data?: T
  errors?: Array<{ message: string }>
}

/**
 * Request context containing headers to forward to downstream services.
 */
export interface RequestContext {
  headers?: Record<string, string>
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

export async function graphqlRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
  context?: RequestContext
): Promise<T> {
  const url = getMeshGraphqlUrl()
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...context?.headers,
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(
      `GraphQL gateway error: ${response.status} ${response.statusText}`
    )
  }

  const json = (await response.json()) as GraphQLResponse<T>

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join(', '))
  }

  if (!json.data) {
    throw new Error('No data returned from GraphQL gateway')
  }

  return json.data
}

// GraphQL queries
export const GET_PLANS = `
  query GetPlans {
    plans {
      id
      code
      price
      createdAt
      updatedAt
    }
  }
`
