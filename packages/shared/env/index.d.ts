import { z } from 'zod'
declare const envSchema: z.ZodObject<
  {
    NEXT_PUBLIC_SUPABASE_URL: z.ZodString
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.ZodString
    SUPABASE_SERVICE_ROLE_KEY: z.ZodString
    NEXT_PUBLIC_APP_URL: z.ZodDefault<z.ZodOptional<z.ZodString>>
    SUPABASE_JWT_SECRET: z.ZodOptional<z.ZodString>
    SUPABASE_DB_URL: z.ZodOptional<z.ZodString>
    GRAPHQL_MS_PORT: z.ZodDefault<z.ZodNumber>
    GRAPHQL_MS_GRPC_URL: z.ZodDefault<z.ZodString>
  },
  'strip',
  z.ZodTypeAny,
  {
    NEXT_PUBLIC_SUPABASE_URL: string
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string
    SUPABASE_SERVICE_ROLE_KEY: string
    NEXT_PUBLIC_APP_URL: string
    GRAPHQL_MS_PORT: number
    GRAPHQL_MS_GRPC_URL: string
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
    GRAPHQL_MS_PORT?: number | undefined
    GRAPHQL_MS_GRPC_URL?: string | undefined
  }
>
export type Env = z.infer<typeof envSchema>
export declare function loadEnv(
  source?: Partial<Record<keyof Env, string | undefined>>
): Env
export declare const env: {
  NEXT_PUBLIC_SUPABASE_URL: string
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string
  SUPABASE_SERVICE_ROLE_KEY: string
  NEXT_PUBLIC_APP_URL: string
  GRAPHQL_MS_PORT: number
  GRAPHQL_MS_GRPC_URL: string
  SUPABASE_JWT_SECRET?: string | undefined
  SUPABASE_DB_URL?: string | undefined
}
export interface GraphqlServiceEnv {
  supabaseUrl: string
  appUrl: string
  supabaseServiceRoleKey: string
  port: number
  grpcUrl: string
}
interface GraphqlServiceEnvOverrides {
  supabaseUrl?: string
  supabaseServiceRoleKey?: string
  port?: number
  grpcUrl?: string
}
export declare function loadGraphqlServiceEnv(
  overrides?: GraphqlServiceEnvOverrides
): GraphqlServiceEnv
export {}
