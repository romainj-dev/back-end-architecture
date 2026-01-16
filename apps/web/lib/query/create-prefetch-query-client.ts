import 'server-only'

import { headers } from 'next/headers'
import { QueryClient, type DefaultOptions } from '@tanstack/react-query'

const defaultOptions: DefaultOptions = {
  queries: {
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    retry: 1,
  },
}

export const createPrefetchQueryClient = async () => {
  // Access request data so Next.js ties this client to the current render.
  // TODO find proper fix - log issue with Tanstack Query
  const incomingHeaders = await headers()
  incomingHeaders.get('host')

  return new QueryClient({ defaultOptions })
}
