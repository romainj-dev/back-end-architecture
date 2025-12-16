import type { NextAuthConfig } from 'next-auth'
import Google from 'next-auth/providers/google'
import LinkedIn from 'next-auth/providers/linkedin'
import GitHub from 'next-auth/providers/github'
import { parseBffEnv } from '@shared/env/env-schema'

const env = parseBffEnv()

export const authConfig = {
  providers: [
    ...(env.AUTH_GOOGLE_ID && env.AUTH_GOOGLE_SECRET
      ? [
          Google({
            clientId: env.AUTH_GOOGLE_ID,
            clientSecret: env.AUTH_GOOGLE_SECRET,
          }),
        ]
      : []),
    ...(env.AUTH_LINKEDIN_ID && env.AUTH_LINKEDIN_SECRET
      ? [
          LinkedIn({
            clientId: env.AUTH_LINKEDIN_ID,
            clientSecret: env.AUTH_LINKEDIN_SECRET,
          }),
        ]
      : []),
    ...(env.AUTH_GITHUB_ID && env.AUTH_GITHUB_SECRET
      ? [
          GitHub({
            clientId: env.AUTH_GITHUB_ID,
            clientSecret: env.AUTH_GITHUB_SECRET,
          }),
        ]
      : []),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.image = user.image
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.image = token.image as string | null
      }
      return session
    },
    redirect({ url, baseUrl }) {
      // If redirecting to a relative URL, make it absolute
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`
      }
      // If redirecting to same origin, allow it
      if (new URL(url).origin === baseUrl) {
        return url
      }
      // Default redirect to dashboard after login
      return `${baseUrl}/dashboard`
    },
  },
  pages: {
    signIn: '/auth',
  },
} satisfies NextAuthConfig
