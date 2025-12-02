import { env } from '@shared/env'

export interface SupabaseConfig {
  url: string
  anonKey: string
  serviceRoleKey: string
}

export const supabaseConfig: SupabaseConfig = {
  url: env.NEXT_PUBLIC_SUPABASE_URL,
  anonKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  serviceRoleKey: env.SUPABASE_SERVICE_ROLE_KEY,
}

export function getSupabaseUrl(): string {
  return supabaseConfig.url
}

export function getSupabaseAnonKey(): string {
  return supabaseConfig.anonKey
}

export function getSupabaseServiceRoleKey(): string {
  return supabaseConfig.serviceRoleKey
}
