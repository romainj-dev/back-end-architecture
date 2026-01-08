import 'server-only'

/**
 * GraphQL client for server-side requests (RSC, API routes, cached functions).
 * Connects directly to the Mesh gateway using MESH_GATEWAY_PORT.
 */

import { print } from 'graphql'
import type { DocumentNode } from 'graphql'
import { FORWARDED_HEADERS } from '@/lib/connect/forwarded-headers'

function getMeshGraphqlUrl(): string {
  const apiUrl = process.env.API_URL
  const port = process.env.MESH_GATEWAY_PORT
  if (!apiUrl || !port) {
    throw new Error('API_URL or MESH_GATEWAY_PORT is not set')
  }
  return `${apiUrl}:${port}/graphql`
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
  query: string | DocumentNode,
  variables?: Record<string, unknown>,
  context?: RequestContext
): Promise<T> {
  const url = getMeshGraphqlUrl()
  const queryString = typeof query === 'string' ? query : print(query)

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...context?.headers,
    },
    body: JSON.stringify({ query: queryString, variables }),
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
