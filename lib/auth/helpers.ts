import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

/**
 * Get the current authenticated user.
 * Redirects to /auth if not authenticated.
 */
export async function getCurrentUser() {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/auth')
  }

  return user
}

/**
 * Get the current authenticated user without redirecting.
 * Returns null if not authenticated.
 */
export async function getCurrentUserOptional() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}
