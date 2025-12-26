const PROXY_PATH = '/api/mesh/graphql'

export function graphqlFetcher<TData, TVariables>(
  query: string,
  variables?: TVariables,
  headers?: RequestInit['headers']
): () => Promise<TData> {
  return async () => {
    const response = await fetch(PROXY_PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify({ query, variables }),
    })

    const json = (await response.json()) as {
      data?: TData
      errors?: Array<{ message?: string }>
    }

    if (json.errors?.length) {
      const [firstError] = json.errors
      throw new Error(firstError?.message ?? 'GraphQL request failed')
    }

    if (!json.data) {
      throw new Error('No data returned from GraphQL gateway')
    }

    return json.data
  }
}
