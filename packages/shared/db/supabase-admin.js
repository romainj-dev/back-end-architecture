'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.createSupabaseAdminClient = createSupabaseAdminClient
const supabase_js_1 = require('@supabase/supabase-js')
const env_1 = require('@shared/env')
function createSupabaseAdminClient(config = {}) {
  const env = (0, env_1.loadGraphqlServiceEnv)({
    supabaseUrl: config.url,
    supabaseServiceRoleKey: config.serviceRoleKey,
  })
  return (0, supabase_js_1.createClient)(
    env.supabaseUrl,
    env.supabaseServiceRoleKey,
    {
      auth: { persistSession: false, autoRefreshToken: false },
    }
  )
}
//# sourceMappingURL=supabase-admin.js.map
