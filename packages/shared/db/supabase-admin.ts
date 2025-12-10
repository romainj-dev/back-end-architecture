import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { loadEnv } from '../env/index'

export interface SupabaseAdminConfig {
  url?: string
  serviceRoleKey?: string
}

export type SupabaseAdminClient = SupabaseClient

export function createSupabaseAdminClient(
  config: SupabaseAdminConfig = {}
): SupabaseAdminClient {
  const env = loadEnv({
    SUPABASE_URL: config.url,
    SUPABASE_SERVICE_ROLE_KEY: config.serviceRoleKey,
  })

  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
