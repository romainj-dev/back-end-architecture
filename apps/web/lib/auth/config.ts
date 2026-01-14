import type { NextAuthConfig } from 'next-auth'
import Google from 'next-auth/providers/google'
import LinkedIn from 'next-auth/providers/linkedin'
import GitHub from 'next-auth/providers/github'
import { parseBffEnv } from '@shared/env/env-schema'
import { upsertUser } from './upsert-user'

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
    async jwt({ token, user, account }) {
      // On initial sign-in (account and user exist)
      if (account && user) {
        token.provider = account.provider as 'google' | 'linkedin' | 'github'

        try {
          // Upsert user in database and get UUID
          const dbUser = await upsertUser({
            provider: account.provider as 'google' | 'linkedin' | 'github',
            providerAccountId: account.providerAccountId ?? account.id,
            email: user.email ?? '',
            fullName: user.name ?? user.email ?? '',
            avatarUrl: user.image ?? null,
            accessToken: account.access_token ?? null,
            refreshToken: account.refresh_token ?? null,
            tokenExpiresAt: account.expires_at
              ? new Date(account.expires_at * 1000)
              : null,
          })

          // Store database UUID in token
          token.dbUserId = dbUser.id
        } catch (error) {
          console.error('Failed to upsert user:', error)
          // Continue with provider ID as fallback
          token.dbUserId = user.id
        }

        // Set user fields on initial sign-in
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.image = user.image
      }

      // On subsequent token refreshes, dbUserId is already in token
      return token
    },
    session({ session, token }) {
      if (session.user) {
        // Use database UUID if available, otherwise fallback to provider ID
        session.user.id = (token.dbUserId as string) || (token.id as string)
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.image = token.image as string | null
        session.user.provider = token.provider as
          | 'google'
          | 'linkedin'
          | 'github'
          | undefined
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
