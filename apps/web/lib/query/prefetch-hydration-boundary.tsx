import {
  dehydrate,
  HydrationBoundary,
  type DehydratedState,
  type QueryClient,
} from '@tanstack/react-query'
import type { ReactNode } from 'react'

import { createPrefetchQueryClient } from '@/lib/query/create-prefetch-query-client'

export type Prefetcher = (queryClient: QueryClient) => Promise<void>

interface PrefetchHydrationBoundaryProps {
  prefetchers: Prefetcher[]
  children: (queryClient: QueryClient) => ReactNode
}

export async function PrefetchHydrationBoundary({
  prefetchers,
  children,
}: PrefetchHydrationBoundaryProps) {
  const queryClient = await createPrefetchQueryClient()

  await Promise.all(prefetchers.map((prefetch) => prefetch(queryClient)))

  const dehydratedState: DehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      {typeof children === 'function' ? children(queryClient) : children}
    </HydrationBoundary>
  )
}
