import NextAuth from 'next-auth'
import { authConfig } from './config'
import { parseBffEnv } from '@shared/env/env-schema'

const env = parseBffEnv()

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: env.AUTH_SECRET,
  trustHost: true,
})

export type Session = Awaited<ReturnType<typeof auth>>
