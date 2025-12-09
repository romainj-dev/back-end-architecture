import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo'
import { AppResolver } from './app.resolver'
import { UserModule } from './user/user.module'
import { SupabaseModule } from './supabase/supabase.module'
import { resolve } from 'node:path'
import type { Request, Response } from 'express'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: resolve(__dirname, '../schema.gql'),
      sortSchema: true,
      playground: process.env.NODE_ENV !== 'production',
      context: ({ req, res }: { req: Request; res: Response }) => ({
        req,
        res,
      }),
    }),
    SupabaseModule,
    UserModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
