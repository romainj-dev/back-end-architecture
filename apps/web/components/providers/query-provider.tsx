'use client'

import { ReactNode, useState } from 'react'
import {
  QueryClient,
  QueryClientProvider,
  type DefaultOptions,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const defaultOptions: DefaultOptions = {
  queries: {
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    retry: 1,
  },
}

interface QueryProviderProps {
  children: ReactNode
}

/**
 * Root provider for TanStack Query and Connect RPC.
 * Provides both query client and Connect transport to the app.
 */
export function QueryProvider({ children }: QueryProviderProps) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions,
      })
  )

  return (
    <QueryClientProvider client={client}>
      {children}
      {process.env.NODE_ENV !== 'production' ? (
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
      ) : null}
    </QueryClientProvider>
  )
}
