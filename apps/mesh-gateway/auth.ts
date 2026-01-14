import { jwtVerify } from 'jose'
import type { IncomingMessage } from 'node:http'

export interface UserContext {
  id: string
  email: string
  name?: string
}

export async function validateJWT(
  req: IncomingMessage,
  authSecret: string
): Promise<UserContext | null> {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.substring(7)
  if (!token) {
    return null
  }

  try {
    const secret = new TextEncoder().encode(authSecret)
    const { payload } = await jwtVerify(token, secret)

    if (!payload.id || !payload.email) {
      return null
    }

    return {
      id: payload.id as string,
      email: payload.email as string,
      name: payload.name as string | undefined,
    }
  } catch {
    return null
  }
}

export function createUserHeaders(user: UserContext): Record<string, string> {
  return {
    'x-user-id': user.id,
    'x-user-email': user.email,
    ...(user.name && { 'x-user-name': user.name }),
  }
}
