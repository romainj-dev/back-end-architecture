/**
 * Connect RPC error handling utilities.
 * Wraps downstream errors with proper ConnectError codes for client consumption.
 */

import { ConnectError, Code } from '@connectrpc/connect'
import { createServiceLogger } from './server-logger'

/**
 * Error codes mapping for common failure scenarios.
 */
export const ErrorCodes = {
  /** Resource not found */
  NOT_FOUND: Code.NotFound,
  /** Invalid request parameters */
  INVALID_ARGUMENT: Code.InvalidArgument,
  /** Authentication required */
  UNAUTHENTICATED: Code.Unauthenticated,
  /** Permission denied */
  PERMISSION_DENIED: Code.PermissionDenied,
  /** Internal server error */
  INTERNAL: Code.Internal,
  /** Service unavailable (e.g., downstream service down) */
  UNAVAILABLE: Code.Unavailable,
  /** Operation timed out */
  DEADLINE_EXCEEDED: Code.DeadlineExceeded,
  /** Rate limit exceeded */
  RESOURCE_EXHAUSTED: Code.ResourceExhausted,
} as const

/**
 * Creates a ConnectError with proper code and message.
 * Logs the error for observability.
 *
 * @param code - ConnectError code
 * @param message - User-facing error message
 * @param cause - Original error for debugging
 * @param service - Service name for logging
 */
export function createConnectError(
  code: Code,
  message: string,
  cause?: Error,
  service?: string
): ConnectError {
  const logger = createServiceLogger(service ?? 'connect')
  logger.error(message, cause, { code: Code[code] })

  return new ConnectError(message, code, undefined, undefined, cause)
}

/**
 * Wraps an unknown error as a ConnectError.
 * Preserves ConnectError instances, converts others to Internal errors.
 *
 * @param error - Unknown error to wrap
 * @param context - Context string for error messages
 * @param service - Service name for logging
 */
export function wrapError(
  error: unknown,
  context: string,
  service?: string
): ConnectError {
  // Already a ConnectError - preserve it
  if (error instanceof ConnectError) {
    return error
  }

  const logger = createServiceLogger(service ?? 'connect')

  // Network/fetch errors - mark as unavailable
  if (error instanceof TypeError && error.message.includes('fetch')) {
    logger.error(`Service unavailable: ${context}`, error as Error)
    return new ConnectError(
      `Service unavailable: ${context}`,
      Code.Unavailable,
      undefined,
      undefined,
      error as Error
    )
  }

  // Standard Error
  if (error instanceof Error) {
    // Check for timeout patterns
    if (
      error.message.toLowerCase().includes('timeout') ||
      error.message.toLowerCase().includes('timed out')
    ) {
      logger.error(`Request timeout: ${context}`, error)
      return new ConnectError(
        `Request timeout: ${context}`,
        Code.DeadlineExceeded,
        undefined,
        undefined,
        error
      )
    }

    // Check for not found patterns
    if (
      error.message.toLowerCase().includes('not found') ||
      error.message.toLowerCase().includes('404')
    ) {
      logger.error(`Not found: ${context}`, error)
      return new ConnectError(
        `Not found: ${context}`,
        Code.NotFound,
        undefined,
        undefined,
        error
      )
    }

    // Check for auth patterns
    if (
      error.message.toLowerCase().includes('unauthorized') ||
      error.message.toLowerCase().includes('401')
    ) {
      logger.error(`Authentication required: ${context}`, error)
      return new ConnectError(
        `Authentication required: ${context}`,
        Code.Unauthenticated,
        undefined,
        undefined,
        error
      )
    }

    // Generic internal error
    logger.error(`Internal error: ${context}`, error)
    return new ConnectError(
      `Internal error: ${context}`,
      Code.Internal,
      undefined,
      undefined,
      error
    )
  }

  // Unknown error type
  const unknownError = new Error(String(error))
  logger.error(`Unknown error: ${context}`, unknownError)
  return new ConnectError(
    `Unknown error: ${context}`,
    Code.Unknown,
    undefined,
    undefined,
    unknownError
  )
}

/**
 * Type guard to check if an error is a specific ConnectError code.
 */
export function isConnectError(
  error: unknown,
  code?: Code
): error is ConnectError {
  if (!(error instanceof ConnectError)) {
    return false
  }
  if (code !== undefined) {
    return error.code === code
  }
  return true
}

/**
 * Extracts a user-friendly message from a ConnectError.
 * In production, hides internal error details.
 */
export function getErrorMessage(error: ConnectError): string {
  // In development, show full message
  if (process.env.NODE_ENV === 'development') {
    return error.message
  }

  // In production, use generic messages for internal errors
  switch (error.code) {
    case Code.Internal:
    case Code.Unknown:
      return 'An unexpected error occurred. Please try again later.'
    case Code.Unavailable:
      return 'Service is temporarily unavailable. Please try again later.'
    case Code.DeadlineExceeded:
      return 'Request timed out. Please try again.'
    default:
      return error.message
  }
}
