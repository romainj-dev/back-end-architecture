import { z } from 'zod'

export const envSchema = z.object({
  SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  MESH_GATEWAY_PORT: z.coerce.number().int().positive(),
  USER_GRAPHQL_MS_PORT: z.coerce.number().int().positive(),
  PLAN_GRAPHQL_MS_PORT: z.coerce.number().int().positive(),
  UPLOAD_MS_PORT: z.coerce.number().int().positive(),
  // Auth.js
  AUTH_SECRET: z.string().min(1),
})

export const bffEnvSchema = z.object({
  MESH_GATEWAY_PORT: z.coerce.number().int().positive(),
  // Auth.js
  AUTH_SECRET: z.string().min(1),
  AUTH_URL: z.string().url(),
  // OAuth Providers
  AUTH_GOOGLE_ID: z.string().min(1).optional(),
  AUTH_GOOGLE_SECRET: z.string().min(1).optional(),
  AUTH_LINKEDIN_ID: z.string().min(1).optional(),
  AUTH_LINKEDIN_SECRET: z.string().min(1).optional(),
  AUTH_GITHUB_ID: z.string().min(1).optional(),
  AUTH_GITHUB_SECRET: z.string().min(1).optional(),
})

export const publicEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_AUTH_URL: z.string().url().optional(),
})

export type Env = z.infer<typeof envSchema>
export type PublicEnv = z.infer<typeof publicEnvSchema>
export type BffEnv = z.infer<typeof bffEnvSchema>

export function parseEnv(
  source: NodeJS.ProcessEnv | Partial<Record<keyof Env, unknown>> = process.env
): Env {
  return envSchema.parse(source)
}

export function parseBffEnv(
  source:
    | NodeJS.ProcessEnv
    | Partial<Record<keyof BffEnv, unknown>> = process.env
): BffEnv {
  return bffEnvSchema.parse(source)
}

export function parsePublicEnv(
  source:
    | NodeJS.ProcessEnv
    | Partial<Record<keyof PublicEnv, unknown>> = process.env
): PublicEnv {
  return publicEnvSchema.parse(source)
}
