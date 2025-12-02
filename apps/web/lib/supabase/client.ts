import { createBrowserClient } from '@supabase/ssr'
import { supabaseConfig } from '@shared/db/supabase'

export function createClient() {
  return createBrowserClient(supabaseConfig.url, supabaseConfig.anonKey)
}
