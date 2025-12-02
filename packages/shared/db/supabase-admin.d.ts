import { type SupabaseClient } from '@supabase/supabase-js'
export interface SupabaseAdminConfig {
  url?: string
  serviceRoleKey?: string
}
export type SupabaseAdminClient = SupabaseClient
export declare function createSupabaseAdminClient(
  config?: SupabaseAdminConfig
): SupabaseAdminClient
