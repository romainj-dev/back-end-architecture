import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  NEXT_PUBLIC_APP_URL: z
    .string()
    .url()
    .optional()
    .default('http://localhost:3000'),
  SUPABASE_JWT_SECRET: z.string().min(1).optional(),
  SUPABASE_DB_URL: z.string().url().optional(),
  USER_GRAPHQL_MS_PORT: z.coerce.number().int().positive().default(4101),
  PLAN_GRAPHQL_MS_PORT: z.coerce.number().int().positive().default(4102),
  MESH_PUBLIC_GRAPHQL_URL: z
    .string()
    .url()
    .optional()
    .default('http://localhost:4103/graphql'),
})

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_APP_URL: z
    .string()
    .url()
    .optional()
    .default('http://localhost:3000'),
  MESH_PUBLIC_GRAPHQL_URL: z
    .string()
    .url()
    .optional()
    .default('http://localhost:4103/graphql'),
})

export type Env = z.infer<typeof envSchema>
export type PublicEnv = z.infer<typeof publicEnvSchema>

export function loadEnv(
  source: Partial<Record<keyof Env, string | undefined>> = {}
): Env {
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

export function loadPublicEnv(
  source: Partial<Record<keyof PublicEnv, string | undefined>> = {}
): PublicEnv {
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

export const publicEnv = loadPublicEnv()

export interface GraphqlServiceEnv {
  supabaseUrl: string
  appUrl: string
  supabaseServiceRoleKey: string
  port: number
}

export function loadUserGraphqlServiceEnv(): GraphqlServiceEnv {
  const parsed = loadEnv()
  return {
    supabaseUrl: parsed.NEXT_PUBLIC_SUPABASE_URL,
    appUrl: parsed.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
    supabaseServiceRoleKey: parsed.SUPABASE_SERVICE_ROLE_KEY,
    port: parsed.USER_GRAPHQL_MS_PORT,
  }
}

export function loadPlanGraphqlServiceEnv(): GraphqlServiceEnv {
  const parsed = loadEnv()
  return {
    supabaseUrl: parsed.NEXT_PUBLIC_SUPABASE_URL,
    appUrl: parsed.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
    supabaseServiceRoleKey: parsed.SUPABASE_SERVICE_ROLE_KEY,
    port: parsed.PLAN_GRAPHQL_MS_PORT,
  }
}
