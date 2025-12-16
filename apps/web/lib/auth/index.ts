import 'server-only'

import NextAuth from 'next-auth'
import { authConfig } from './config'
import { parseBffEnv } from '@shared/env/env-schema'
import { cache } from 'react'

const env = parseBffEnv()

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: env.AUTH_SECRET,
  trustHost: true,
})

export const getSession = cache(async () => {
  const session = await auth()
  return { isAuth: !!session, user: session?.user }
})

export type Session = Awaited<ReturnType<typeof auth>>
