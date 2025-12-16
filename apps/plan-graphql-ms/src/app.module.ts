import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo'
import { ConfigModule } from '@nestjs/config'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Request, Response } from 'express'
import { envFilePaths } from '@shared/env/env-files'
import { envSchema } from '@shared/env/env-schema'
import { GatewayAuthGuard } from '@shared/auth'
import { AppResolver } from './app.resolver'
import { SupabaseModule } from './supabase/supabase.module'
import { PlanModule } from './plan/plan.module'

const moduleDir = fileURLToPath(new URL('.', import.meta.url))
const repoRoot = resolve(moduleDir, '../../..')

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: envFilePaths(repoRoot),
      expandVariables: true,
      validate: (raw: Record<string, unknown>) => envSchema.parse(raw),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: resolve(moduleDir, '../schema.gql'),
      sortSchema: true,
      playground: process.env.NODE_ENV !== 'production',
      context: ({ req, res }: { req: Request; res: Response }) => ({
        req,
        res,
      }),
    }),
    SupabaseModule,
    PlanModule,
  ],
  providers: [
    AppResolver,
    {
      provide: APP_GUARD,
      useClass: GatewayAuthGuard,
    },
  ],
})
export class AppModule {}
