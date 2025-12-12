/**
 * GraphQL client for browser-side requests.
 * Uses the Next.js proxy path to avoid CORS issues.
 */

const PROXY_PATH = '/api/mesh/graphql'

interface GraphQLResponse<T> {
  data?: T
  errors?: Array<{ message: string }>
}

export async function graphqlRequest<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const response = await fetch(PROXY_PATH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
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

// Re-export queries for convenience
export { GET_PLANS } from './queries'
