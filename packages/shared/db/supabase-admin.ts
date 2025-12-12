import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export interface SupabaseAdminConfig {
  url: string
  serviceRoleKey: string
}

export type SupabaseAdminClient = SupabaseClient

export function createSupabaseAdminClient(
  config: SupabaseAdminConfig
): SupabaseAdminClient {
  return createClient(config.url, config.serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
