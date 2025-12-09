import { z } from 'zod'
declare const envSchema: z.ZodObject<
  {
    NEXT_PUBLIC_SUPABASE_URL: z.ZodString
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.ZodString
    SUPABASE_SERVICE_ROLE_KEY: z.ZodString
    NEXT_PUBLIC_APP_URL: z.ZodDefault<z.ZodOptional<z.ZodString>>
    SUPABASE_JWT_SECRET: z.ZodOptional<z.ZodString>
    SUPABASE_DB_URL: z.ZodOptional<z.ZodString>
    USER_GRAPHQL_MS_PORT: z.ZodDefault<z.ZodNumber>
    PLAN_GRAPHQL_MS_PORT: z.ZodDefault<z.ZodNumber>
    MESH_PUBLIC_GRAPHQL_URL: z.ZodDefault<z.ZodString>
  },
  'strip',
  z.ZodTypeAny,
  {
    NEXT_PUBLIC_SUPABASE_URL: string
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string
    SUPABASE_SERVICE_ROLE_KEY: string
    NEXT_PUBLIC_APP_URL: string
    USER_GRAPHQL_MS_PORT: number
    PLAN_GRAPHQL_MS_PORT: number
    MESH_PUBLIC_GRAPHQL_URL: string
    SUPABASE_JWT_SECRET?: string | undefined
    SUPABASE_DB_URL?: string | undefined
  },
  {
    NEXT_PUBLIC_SUPABASE_URL: string
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string
    SUPABASE_SERVICE_ROLE_KEY: string
    NEXT_PUBLIC_APP_URL?: string | undefined
    SUPABASE_JWT_SECRET?: string | undefined
    SUPABASE_DB_URL?: string | undefined
    USER_GRAPHQL_MS_PORT?: number | undefined
    PLAN_GRAPHQL_MS_PORT?: number | undefined
    MESH_PUBLIC_GRAPHQL_URL?: string | undefined
  }
>
declare const publicEnvSchema: z.ZodObject<
  {
    NEXT_PUBLIC_SUPABASE_URL: z.ZodString
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.ZodString
    NEXT_PUBLIC_APP_URL: z.ZodDefault<z.ZodOptional<z.ZodString>>
    MESH_PUBLIC_GRAPHQL_URL: z.ZodDefault<z.ZodString>
  },
  'strip',
  z.ZodTypeAny,
  {
    NEXT_PUBLIC_SUPABASE_URL: string
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string
    NEXT_PUBLIC_APP_URL: string
    MESH_PUBLIC_GRAPHQL_URL: string
  },
  {
    NEXT_PUBLIC_SUPABASE_URL: string
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string
    NEXT_PUBLIC_APP_URL?: string | undefined
    MESH_PUBLIC_GRAPHQL_URL?: string | undefined
  }
>
export type Env = z.infer<typeof envSchema>
export type PublicEnv = z.infer<typeof publicEnvSchema>
export declare function loadEnv(
  source?: Partial<Record<keyof Env, string | undefined>>
): Env
export declare function loadPublicEnv(
  source?: Partial<Record<keyof PublicEnv, string | undefined>>
): PublicEnv
export declare const publicEnv: {
  NEXT_PUBLIC_SUPABASE_URL: string
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string
  NEXT_PUBLIC_APP_URL: string
  MESH_PUBLIC_GRAPHQL_URL: string
}
export interface GraphqlServiceEnv {
  supabaseUrl: string
  appUrl: string
  supabaseServiceRoleKey: string
  port: number
}
export declare function loadUserGraphqlServiceEnv(): GraphqlServiceEnv
export declare function loadPlanGraphqlServiceEnv(): GraphqlServiceEnv
export {}
