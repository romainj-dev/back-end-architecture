import { z } from 'zod'

export const envSchema = z.object({
  SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  MESH_GATEWAY_PORT: z.coerce.number().int().positive(),
  USER_GRAPHQL_MS_PORT: z.coerce.number().int().positive(),
  PLAN_GRAPHQL_MS_PORT: z.coerce.number().int().positive(),
  AUTH_MS_PORT: z.coerce.number().int().positive(),
  UPLOAD_MS_PORT: z.coerce.number().int().positive(),
})

export const publicEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url(),
})

export type Env = z.infer<typeof envSchema>
export type PublicEnv = z.infer<typeof publicEnvSchema>

export function parseEnv(
  source: NodeJS.ProcessEnv | Partial<Record<keyof Env, unknown>> = process.env
): Env {
  return envSchema.parse(source)
}

export function parsePublicEnv(
  source:
    | NodeJS.ProcessEnv
    | Partial<Record<keyof PublicEnv, unknown>> = process.env
): PublicEnv {
  return publicEnvSchema.parse(source)
}
