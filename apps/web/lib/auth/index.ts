import 'server-only'

import NextAuth from 'next-auth'
import { authConfig } from './config'
import { parseBffEnv } from '@shared/env/env-schema'
import { cache } from 'react'
import { cookies } from 'next/headers'

const env = parseBffEnv()

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: env.AUTH_SECRET,
  trustHost: true,
})

// All possible NextAuth cookie names across different security configurations:
// - Standard cookies (HTTP)
// - __Secure- prefixed (HTTPS only)
// - __Host- prefixed (HTTPS + same-origin)
const NEXT_AUTH_COOKIE_NAMES = [
  'next-auth.session-token',
  'next-auth.callback-url',
  'next-auth.csrf-token',
  '__Secure-next-auth.session-token',
  '__Secure-next-auth.callback-url',
  '__Secure-next-auth.csrf-token',
  '__Host-next-auth.session-token',
  '__Host-next-auth.callback-url',
  '__Host-next-auth.csrf-token',
] as const

/**
 * Clears all NextAuth cookies when they become invalid.
 * This happens when AUTH_SECRET changes and existing JWTs can no longer be decrypted.
 */
async function clearInvalidSessionCookies() {
  try {
    const requestCookies = await cookies()
    for (const cookieName of NEXT_AUTH_COOKIE_NAMES) {
      requestCookies.delete(cookieName)
    }
  } catch {
    // cookies() can only be called within a Next.js request context
  }
}

export const getSession = cache(async () => {
  try {
    const session = await auth()
    return { isAuth: !!session, user: session?.user }
  } catch (error) {
    // JWTSessionError occurs when session cookies were encrypted with a different AUTH_SECRET.
    // Instead of crashing, clear the stale cookies and treat the user as unauthenticated.
    if (error instanceof Error && error.name === 'JWTSessionError') {
      await clearInvalidSessionCookies()
      return { isAuth: false, user: undefined }
    }

    throw error
  }
})

export type Session = Awaited<ReturnType<typeof auth>>
