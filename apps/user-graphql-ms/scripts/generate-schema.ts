/**
 * Generates the GraphQL schema using NestJS GraphQLSchemaFactory.
 * This approach doesn't bootstrap the full app - it only loads resolvers
 * and scalars, making it fast and dependency-free.
 *
 * @see https://docs.nestjs.com/graphql/generating-sdl
 */
import { NestFactory } from '@nestjs/core'
import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
} from '@nestjs/graphql'
import { printSchema } from 'graphql'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// Import ALL resolvers explicitly - this ensures schema includes everything
import { AppResolver } from '../src/app.resolver'
import { UserResolver } from '../src/user/user.resolver'
import { ExperienceResolver } from '../src/experience/experience.resolver'

// Import custom scalars
import { JsonObjectScalar } from '../src/common/scalars/json-object.scalar'

const moduleDir = fileURLToPath(new URL('.', import.meta.url))

async function generateSchema(): Promise<void> {
  // Create a minimal NestJS context - no Supabase, no ConfigModule, no guards
  const app = await NestFactory.create(GraphQLSchemaBuilderModule, {
    logger: ['error', 'warn'],
  })
  await app.init()

  const gqlSchemaFactory = app.get(GraphQLSchemaFactory)

  // Build schema from resolvers and scalars
  const schema = await gqlSchemaFactory.create(
    [AppResolver, UserResolver, ExperienceResolver],
    [JsonObjectScalar]
  )

  const sdl = printSchema(schema)
  const header = `# ------------------------------------------------------
# THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
# ------------------------------------------------------

`

  writeFileSync(resolve(moduleDir, '../schema.gql'), header + sdl)

  await app.close()
  console.info('✅ GraphQL schema generated (user-graphql-ms)')
}

generateSchema().catch((error: unknown) => {
  console.error('Failed to generate schema:', error)
  process.exit(1)
})
