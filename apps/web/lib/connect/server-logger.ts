/**
 * Shared server logger for Connect RPC services.
 * Provides structured logging with request metadata.
 *
 * In development: logs to console with formatting
 * In production: can be extended to integrate with observability tools
 */

import { getConnectContext } from './context'
import type { ConnectContext } from './context'

export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  requestId?: string
  userId?: string
  organizationId?: string
  service?: string
  method?: string
  durationMs?: number
  error?: {
    name: string
    message: string
    code?: string
    stack?: string
  }
  metadata?: Record<string, unknown>
}

/**
 * Formats a log entry for console output in development.
 */
function formatLogEntry(entry: LogEntry): string {
  const parts: string[] = []

  // Timestamp and level
  const levelColors: Record<LogLevel, string> = {
    debug: '\x1b[36m', // Cyan
    info: '\x1b[32m', // Green
    warn: '\x1b[33m', // Yellow
    error: '\x1b[31m', // Red
  }
  const reset = '\x1b[0m'
  const levelStr = `${levelColors[entry.level]}[${entry.level.toUpperCase()}]${reset}`

  parts.push(`${entry.timestamp} ${levelStr}`)

  // Service/method context
  if (entry.service && entry.method) {
    parts.push(`[${entry.service}/${entry.method}]`)
  }

  // Request ID for tracing
  if (entry.requestId) {
    parts.push(`(${entry.requestId})`)
  }

  // Message
  parts.push(entry.message)

  // Duration if present
  if (entry.durationMs !== undefined) {
    parts.push(`(${entry.durationMs}ms)`)
  }

  return parts.join(' ')
}

/**
 * Creates a structured log entry with context from the current request.
 */
function createLogEntry(
  level: LogLevel,
  message: string,
  options?: {
    service?: string
    method?: string
    durationMs?: number
    error?: Error
    metadata?: Record<string, unknown>
    context?: ConnectContext
  }
): LogEntry {
  const ctx = options?.context ?? getConnectContext()

  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    requestId: ctx?.requestId,
    userId: ctx?.userId,
    organizationId: ctx?.organizationId,
    service: options?.service,
    method: options?.method,
    durationMs: options?.durationMs,
    metadata: options?.metadata,
  }

  if (options?.error) {
    entry.error = {
      name: options.error.name,
      message: options.error.message,
      code: (options.error as { code?: string }).code,
      stack:
        process.env.NODE_ENV === 'development'
          ? options.error.stack
          : undefined,
    }
  }

  return entry
}

/**
 * Outputs a log entry.
 * In development: formatted console output
 * In production: JSON for log aggregation
 */
function outputLog(entry: LogEntry): void {
  const isDev = process.env.NODE_ENV === 'development'

  if (isDev) {
    const formatted = formatLogEntry(entry)
    switch (entry.level) {
      case 'debug':
        console.debug(formatted, entry.metadata ?? '')
        break
      case 'info':
        console.info(formatted, entry.metadata ?? '')
        break
      case 'warn':
        console.warn(formatted, entry.metadata ?? '')
        break
      case 'error':
        console.error(formatted, entry.error?.stack ?? '', entry.metadata ?? '')
        break
    }
  } else {
    // Production: JSON logging for observability tools
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(entry))
  }
}

/**
 * Logger interface for Connect services.
 */
export interface Logger {
  debug(message: string, metadata?: Record<string, unknown>): void
  info(message: string, metadata?: Record<string, unknown>): void
  warn(message: string, metadata?: Record<string, unknown>): void
  error(
    message: string,
    error?: Error,
    metadata?: Record<string, unknown>
  ): void
}

/**
 * Creates a logger instance for a specific service/method.
 */
export function createServiceLogger(
  service: string,
  method?: string,
  context?: ConnectContext
): Logger {
  return {
    debug(message: string, metadata?: Record<string, unknown>) {
      outputLog(
        createLogEntry('debug', message, { service, method, metadata, context })
      )
    },
    info(message: string, metadata?: Record<string, unknown>) {
      outputLog(
        createLogEntry('info', message, { service, method, metadata, context })
      )
    },
    warn(message: string, metadata?: Record<string, unknown>) {
      outputLog(
        createLogEntry('warn', message, { service, method, metadata, context })
      )
    },
    error(message: string, error?: Error, metadata?: Record<string, unknown>) {
      outputLog(
        createLogEntry('error', message, {
          service,
          method,
          error,
          metadata,
          context,
        })
      )
    },
  }
}

/**
 * Global logger for general Connect operations.
 */
export const connectLogger = createServiceLogger('connect')

/**
 * Request logging middleware data.
 * Used for timing and logging request lifecycle.
 */
export interface RequestLogData {
  service: string
  method: string
  startTime: number
  context?: ConnectContext
}

/**
 * Logs the start of a request and returns data for completion logging.
 */
export function logRequestStart(
  service: string,
  method: string,
  context?: ConnectContext
): RequestLogData {
  const logger = createServiceLogger(service, method, context)
  logger.info('Request started')

  return {
    service,
    method,
    startTime: performance.now(),
    context,
  }
}

/**
 * Logs successful request completion with duration.
 */
export function logRequestSuccess(data: RequestLogData): void {
  const durationMs = Math.round(performance.now() - data.startTime)
  const entry = createLogEntry('info', 'Request completed', {
    service: data.service,
    method: data.method,
    durationMs,
    context: data.context,
  })
  outputLog(entry)
}

/**
 * Logs request failure with error details and duration.
 */
export function logRequestError(
  data: RequestLogData,
  error: Error,
  metadata?: Record<string, unknown>
): void {
  const durationMs = Math.round(performance.now() - data.startTime)
  const entry = createLogEntry('error', 'Request failed', {
    service: data.service,
    method: data.method,
    durationMs,
    error,
    metadata,
    context: data.context,
  })
  outputLog(entry)
}
