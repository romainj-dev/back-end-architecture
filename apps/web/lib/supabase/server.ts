import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { supabaseConfig } from '@shared/db/supabase'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(supabaseConfig.url, supabaseConfig.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}

/**
 * Creates a Supabase client with service role key.
 * WARNING: Bypasses RLS policies - use only for admin operations or when RLS is not applicable.
 * Never expose this client to the client-side or use it for user-facing operations.
 */
export async function createServiceRoleClient() {
  const { createClient: createSupabaseClient } = await import(
    '@supabase/supabase-js'
  )
  return createSupabaseClient(
    supabaseConfig.url,
    supabaseConfig.serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
