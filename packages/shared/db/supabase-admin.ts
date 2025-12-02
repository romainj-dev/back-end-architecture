import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { loadGraphqlServiceEnv } from '@shared/env'

export interface SupabaseAdminConfig {
  url?: string
  serviceRoleKey?: string
}

export type SupabaseAdminClient = SupabaseClient

export function createSupabaseAdminClient(
  config: SupabaseAdminConfig = {}
): SupabaseAdminClient {
  const env = loadGraphqlServiceEnv({
    supabaseUrl: config.url,
    supabaseServiceRoleKey: config.serviceRoleKey,
  })

  return createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
