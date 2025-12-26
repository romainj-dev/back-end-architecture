import 'server-only'

import { cache } from 'react'
import { headers } from 'next/headers'
import { QueryClient, type DefaultOptions } from '@tanstack/react-query'

const defaultOptions: DefaultOptions = {
  queries: {
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    retry: 1,
  },
}

export const createPrefetchQueryClient = cache(async () => {
  // Access request data so Next.js ties this client to the current render.
  const incomingHeaders = await headers()
  incomingHeaders.get('host')

  return new QueryClient({
    defaultOptions,
  })
})
