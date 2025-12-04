'use client'

import { TransportProvider } from '@connectrpc/connect-query'
import { createConnectTransport } from '@connectrpc/connect-web'
import { loggingInterceptor } from '@/lib/connect/interceptors'

/**
 * Shared Connect transport for client-side RPC.
 * This transport is used by both manual clients and connect-query hooks.
 */
const transport = createConnectTransport({
  baseUrl:
    typeof window !== 'undefined'
      ? '/api/connect'
      : 'http://localhost:3000/api/connect',
  interceptors: [
    loggingInterceptor,
    // Auth interceptor can be added when auth is implemented:
    // authInterceptor(() => getAccessToken()),
  ],
})

interface ConnectProviderProps {
  children: React.ReactNode
}

/**
 * Provider for Connect RPC transport.
 * Enables connect-query hooks to make RPC calls.
 *
 * Must be wrapped inside QueryClientProvider (from TanStack Query).
 */
export function ConnectProvider({ children }: ConnectProviderProps) {
  return <TransportProvider transport={transport}>{children}</TransportProvider>
}

/**
 * Export the transport for direct client usage if needed.
 */
export { transport }
