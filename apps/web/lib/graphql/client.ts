/**
 * GraphQL client for calling the GraphQL MS from server-side code.
 * Uses @shared/env for configuration instead of process.env directly.
 */

import { env } from '@/lib/env'
import { FORWARDED_HEADERS } from '@/lib/connect/forwarded-headers'

/**
 * Build the GraphQL MS URL from environment configuration.
 * Supports both explicit HTTP URL and port-based configuration.
 */
function getGraphqlMsUrl(): string {
  // Allow explicit HTTP URL override via process.env for flexibility
  if (process.env.GRAPHQL_MS_HTTP_URL) {
    return process.env.GRAPHQL_MS_HTTP_URL
  }
  return `http://localhost:${env.GRAPHQL_MS_PORT}/graphql`
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
  const url = getGraphqlMsUrl()
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
      `GraphQL MS error: ${response.status} ${response.statusText}`
    )
  }

  const json = (await response.json()) as GraphQLResponse<T>

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join(', '))
  }

  if (!json.data) {
    throw new Error('No data returned from GraphQL MS')
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
