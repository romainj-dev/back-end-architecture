import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { type NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const logger = new Logger('User-GraphQL-MS')
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const config = app.get(ConfigService)
  const appUrl = config.getOrThrow<string>('NEXT_PUBLIC_APP_URL')
  const port = Number(config.getOrThrow('USER_GRAPHQL_MS_PORT'))

  app.enableCors({
    origin: [appUrl],
    credentials: true,
  })
  app.enableShutdownHooks()

  await app.listen(port)

  logger.log(`GraphQL ready at http://localhost:${port}/graphql`)
}

void bootstrap()
