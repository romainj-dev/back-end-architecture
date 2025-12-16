import { auth } from '@/lib/auth'

export default auth((_req) => {
  // Middleware runs on matched routes
  // Auth.js automatically handles session validation
  // No redirect logic needed - just let the session be available
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
