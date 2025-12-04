/**
 * Headers forwarded from inbound HTTP requests to downstream services.
 * Shared between server-side GraphQL client helpers and client-side interceptors.
 */
export const FORWARDED_HEADERS = [
  'authorization',
  'x-request-id',
  'x-correlation-id',
  'x-organization-id',
  'cookie',
] as const
