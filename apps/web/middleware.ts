import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { nextUrl } = req
  const isAuthenticated = !!req.auth

  // Redirect unauthenticated users from protected routes to login
  if (!isAuthenticated) {
    const loginUrl = new URL('/auth', nextUrl)
    loginUrl.searchParams.set('callbackUrl', nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    /*
     * Only run middleware on protected routes:
     * - /dashboard and sub-routes
     * - /settings and sub-routes
     * - /profile and sub-routes
     *
     * Public routes (/, /auth, /api/mesh, etc.) are NOT matched.
     */
    '/dashboard/:path*',
    '/settings/:path*',
    '/profile/:path*',
  ],
}
