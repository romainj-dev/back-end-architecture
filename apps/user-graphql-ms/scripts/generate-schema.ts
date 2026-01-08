/**
 * Generates the GraphQL schema by briefly bootstrapping the NestJS app.
 * NestJS with autoSchemaFile only generates schema at runtime, so we need
 * to bootstrap the app during build to ensure schema.gql is up-to-date.
 */
import { NestFactory } from '@nestjs/core'
import { AppModule } from '../src/app.module'

async function generateSchema(): Promise<void> {
  // Bootstrap creates the app and triggers autoSchemaFile generation
  const app = await NestFactory.create(AppModule, {
    logger: ['error'],
  })

  // Close immediately - schema is generated during bootstrap
  await app.close()

  console.info('✅ GraphQL schema generated')
}

generateSchema().catch((error: unknown) => {
  console.error('Failed to generate schema:', error)
  process.exit(1)
})
