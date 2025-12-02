'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.env = void 0
exports.loadEnv = loadEnv
exports.loadGraphqlServiceEnv = loadGraphqlServiceEnv
const zod_1 = require('zod')
const envSchema = zod_1.z.object({
  NEXT_PUBLIC_SUPABASE_URL: zod_1.z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: zod_1.z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: zod_1.z.string().min(1),
  NEXT_PUBLIC_APP_URL: zod_1.z
    .string()
    .url()
    .optional()
    .default('http://localhost:3000'),
  SUPABASE_JWT_SECRET: zod_1.z.string().min(1).optional(),
  SUPABASE_DB_URL: zod_1.z.string().url().optional(),
  GRAPHQL_MS_PORT: zod_1.z.coerce.number().int().positive().default(4000),
  GRAPHQL_MS_GRPC_URL: zod_1.z.string().min(1).default('0.0.0.0:50051'),
})
function loadEnv(source = {}) {
  const parsed = envSchema.safeParse({
    NEXT_PUBLIC_SUPABASE_URL:
      source.NEXT_PUBLIC_SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      source.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY:
      source.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY,
    NEXT_PUBLIC_APP_URL:
      source.NEXT_PUBLIC_APP_URL ?? process.env.NEXT_PUBLIC_APP_URL,
    SUPABASE_JWT_SECRET:
      source.SUPABASE_JWT_SECRET ?? process.env.SUPABASE_JWT_SECRET,
    SUPABASE_DB_URL: source.SUPABASE_DB_URL ?? process.env.SUPABASE_DB_URL,
    GRAPHQL_MS_PORT:
      source.GRAPHQL_MS_PORT ?? process.env.GRAPHQL_MS_PORT ?? undefined,
    GRAPHQL_MS_GRPC_URL:
      source.GRAPHQL_MS_GRPC_URL ?? process.env.GRAPHQL_MS_GRPC_URL,
  })
  if (!parsed.success) {
    console.error(
      '❌ Invalid environment variables:',
      parsed.error.flatten().fieldErrors
    )
    throw new Error('Invalid environment variables')
  }
  return parsed.data
}
exports.env = loadEnv()
function loadGraphqlServiceEnv(overrides = {}) {
  const parsed = loadEnv({
    NEXT_PUBLIC_SUPABASE_URL: overrides.supabaseUrl,
    SUPABASE_SERVICE_ROLE_KEY: overrides.supabaseServiceRoleKey,
    GRAPHQL_MS_PORT:
      overrides.port !== undefined ? String(overrides.port) : undefined,
    GRAPHQL_MS_GRPC_URL: overrides.grpcUrl,
  })
  return {
    supabaseUrl: parsed.NEXT_PUBLIC_SUPABASE_URL,
    appUrl: parsed.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
    supabaseServiceRoleKey: parsed.SUPABASE_SERVICE_ROLE_KEY,
    port: parsed.GRAPHQL_MS_PORT,
    grpcUrl: parsed.GRAPHQL_MS_GRPC_URL,
  }
}
//# sourceMappingURL=index.js.map
