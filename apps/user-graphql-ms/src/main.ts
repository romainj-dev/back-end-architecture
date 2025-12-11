import 'reflect-metadata'
import './config/register-env'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'
import { loadUserGraphqlServiceEnv } from '@shared/env'
import { type NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const logger = new Logger('User-GraphQL-MS')
  const env = loadUserGraphqlServiceEnv()
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.enableCors({
    origin: [env.appUrl],
    credentials: true,
  })
  app.enableShutdownHooks()

  await app.listen(env.port)

  logger.log(`GraphQL ready at http://localhost:${env.port}/graphql`)
}

void bootstrap()
