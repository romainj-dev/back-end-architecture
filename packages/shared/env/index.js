'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.publicEnv = void 0
exports.loadEnv = loadEnv
exports.loadPublicEnv = loadPublicEnv
exports.loadUserGraphqlServiceEnv = loadUserGraphqlServiceEnv
exports.loadPlanGraphqlServiceEnv = loadPlanGraphqlServiceEnv
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
  USER_GRAPHQL_MS_PORT: zod_1.z.coerce.number().int().positive().default(4101),
  PLAN_GRAPHQL_MS_PORT: zod_1.z.coerce.number().int().positive().default(4102),
  MESH_PUBLIC_GRAPHQL_URL: zod_1.z
    .string()
    .url()
    .optional()
    .default('http://localhost:4103/graphql'),
})
const publicEnvSchema = zod_1.z.object({
  NEXT_PUBLIC_SUPABASE_URL: zod_1.z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: zod_1.z.string().min(1),
  NEXT_PUBLIC_APP_URL: zod_1.z
    .string()
    .url()
    .optional()
    .default('http://localhost:3000'),
  MESH_PUBLIC_GRAPHQL_URL: zod_1.z
    .string()
    .url()
    .optional()
    .default('http://localhost:4103/graphql'),
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
    USER_GRAPHQL_MS_PORT:
      source.USER_GRAPHQL_MS_PORT ?? process.env.USER_GRAPHQL_MS_PORT,
    PLAN_GRAPHQL_MS_PORT:
      source.PLAN_GRAPHQL_MS_PORT ?? process.env.PLAN_GRAPHQL_MS_PORT,
    MESH_PUBLIC_GRAPHQL_URL:
      source.MESH_PUBLIC_GRAPHQL_URL ?? process.env.MESH_PUBLIC_GRAPHQL_URL,
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
function loadPublicEnv(source = {}) {
  const parsed = publicEnvSchema.safeParse({
    NEXT_PUBLIC_SUPABASE_URL:
      source.NEXT_PUBLIC_SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      source.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_APP_URL:
      source.NEXT_PUBLIC_APP_URL ?? process.env.NEXT_PUBLIC_APP_URL,
    MESH_PUBLIC_GRAPHQL_URL:
      source.MESH_PUBLIC_GRAPHQL_URL ?? process.env.MESH_PUBLIC_GRAPHQL_URL,
  })
  if (!parsed.success) {
    console.error(
      '❌ Invalid public environment variables:',
      parsed.error.flatten().fieldErrors
    )
    throw new Error('Invalid public environment variables')
  }
  return parsed.data
}
exports.publicEnv = loadPublicEnv()
function loadUserGraphqlServiceEnv() {
  const parsed = loadEnv()
  return {
    supabaseUrl: parsed.NEXT_PUBLIC_SUPABASE_URL,
    appUrl: parsed.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
    supabaseServiceRoleKey: parsed.SUPABASE_SERVICE_ROLE_KEY,
    port: parsed.USER_GRAPHQL_MS_PORT,
  }
}
function loadPlanGraphqlServiceEnv() {
  const parsed = loadEnv()
  return {
    supabaseUrl: parsed.NEXT_PUBLIC_SUPABASE_URL,
    appUrl: parsed.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
    supabaseServiceRoleKey: parsed.SUPABASE_SERVICE_ROLE_KEY,
    port: parsed.PLAN_GRAPHQL_MS_PORT,
  }
}
//# sourceMappingURL=index.js.map
