import { ConnectRouter } from '@connectrpc/connect'
import { connectNodeAdapter } from '@connectrpc/connect-node'
import { PlanService } from '@rpc/plan/v1/plan_connect'
import { listPlans } from '@/server/connect/plan-service'
import {
  createConnectContext,
  runWithConnectContext,
  type ConnectContext,
} from '@/lib/connect/context'
import { connectLogger } from '@/lib/connect/server-logger'
import type { IncomingMessage } from 'node:http'

/**
 * Register all Connect RPC services.
 * Add new services here as the app grows.
 */
function routes(router: ConnectRouter) {
  router.service(PlanService, {
    listPlans: async () => {
      return listPlans()
    },
  })
}

/**
 * Connect handler using the official connectNodeAdapter.
 * Automatically handles JSON/binary negotiation.
 */
const handler = connectNodeAdapter({ routes })

/**
 * Extract headers from a Web Request into a plain object.
 */
function extractHeaders(request: Request): Record<string, string> {
  const headers: Record<string, string> = {}
  request.headers.forEach((value, key) => {
    headers[key] = value
  })
  return headers
}

/**
 * Convert Web Request/Response to Node HTTP for connect-node adapter.
 * Wraps the handler with request context for auth/header propagation.
 * Includes request logging for observability.
 */
async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const startTime = performance.now()

  // Extract headers and create context for downstream propagation
  const headers = extractHeaders(request)
  const ctx: ConnectContext = createConnectContext(headers)

  // Log incoming request
  connectLogger.info(`Incoming ${request.method} ${url.pathname}`, {
    requestId: ctx.requestId,
    hasAuth: Boolean(headers.authorization),
    userAgent: headers['user-agent'],
  })

  // Read body
  let body: Buffer | undefined
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    const arrayBuffer = await request.arrayBuffer()
    body = Buffer.from(arrayBuffer)
  }

  // Forward request to connect-node adapter within context scope
  return runWithConnectContext(
    ctx,
    () =>
      new Promise<Response>((resolve) => {
        // Mock IncomingMessage
        const req = {
          method: request.method,
          url: url.pathname + url.search,
          headers,
          on: (event: string, cb: (chunk?: Buffer) => void) => {
            if (event === 'data' && body) cb(body)
            if (event === 'end') cb()
          },
        } as unknown as IncomingMessage

        // Mock ServerResponse
        let statusCode = 200
        const responseHeaders: Record<string, string | string[]> = {}
        const chunks: Buffer[] = []

        const res = {
          statusCode: 200,
          setHeader: (name: string, value: string | string[]) => {
            responseHeaders[name] = value
          },
          getHeader: (name: string) => responseHeaders[name],
          writeHead: (code: number, hdrs?: Record<string, string>) => {
            statusCode = code
            if (hdrs) Object.assign(responseHeaders, hdrs)
          },
          write: (chunk: Buffer | string) => {
            chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
          },
          end: (chunk?: Buffer | string) => {
            if (chunk) {
              chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
            }
            const responseBody = Buffer.concat(chunks)
            const webHeaders = new Headers()
            for (const [key, value] of Object.entries(responseHeaders)) {
              if (Array.isArray(value)) {
                value.forEach((v) => webHeaders.append(key, v))
              } else {
                webHeaders.set(key, value)
              }
            }
            const durationMs = Math.round(performance.now() - startTime)

            // Log response
            if (statusCode >= 400) {
              connectLogger.warn(
                `Response ${statusCode} ${request.method} ${url.pathname}`,
                {
                  requestId: ctx.requestId,
                  durationMs,
                  status: statusCode,
                }
              )
            } else {
              connectLogger.info(
                `Response ${statusCode} ${request.method} ${url.pathname}`,
                {
                  requestId: ctx.requestId,
                  durationMs,
                  status: statusCode,
                }
              )
            }

            resolve(
              new Response(responseBody, {
                status: statusCode,
                headers: webHeaders,
              })
            )
          },
        } as unknown as import('node:http').ServerResponse

        handler(req, res)
      })
  )
}

export async function GET(request: Request) {
  return handleRequest(request)
}

export async function POST(request: Request) {
  return handleRequest(request)
}
