import type { CreateExpressContextOptions } from '@trpc/server/adapters/express'
import { randomUUID } from 'node:crypto'

export interface TrpcContext {
  requestId: string
  ip?: string
}

export function createTrpcContext({
  req,
}: CreateExpressContextOptions): TrpcContext {
  const headerValue = req.headers['x-request-id']
  const requestId = Array.isArray(headerValue)
    ? headerValue[0]
    : (headerValue ?? randomUUID())

  return {
    requestId,
    ip: req.ip,
  }
}
