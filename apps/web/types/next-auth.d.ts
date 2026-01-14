import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: DefaultSession['user'] & {
      provider?: 'google' | 'linkedin' | 'github'
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    provider?: 'google' | 'linkedin' | 'github'
  }
}
