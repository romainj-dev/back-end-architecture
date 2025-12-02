import { loadEnv } from '@shared/env'

export interface SupabaseConfig {
  url: string
  anonKey: string
}

const baseEnv = loadEnv()

export const supabaseConfig: SupabaseConfig = {
  url: baseEnv.NEXT_PUBLIC_SUPABASE_URL,
  anonKey: baseEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
}

export function getSupabaseUrl(): string {
  return supabaseConfig.url
}

export function getSupabaseAnonKey(): string {
  return supabaseConfig.anonKey
}

export function getSupabaseServiceRoleKey(): string {
  return loadEnv().SUPABASE_SERVICE_ROLE_KEY
}
