import 'reflect-metadata'
import './config/register-env'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'
import { loadGraphqlServiceEnv } from '@shared/env'
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { TRPC_ROUTER } from './trpc/trpc.constants'
import { createTrpcContext } from './trpc/context'
import { type MicroserviceOptions, Transport } from '@nestjs/microservices'
import { resolve } from 'node:path'
import type { AppRouter } from './trpc/router'

async function bootstrap() {
  const logger = new Logger('GraphQL-MS')
  const env = loadGraphqlServiceEnv()
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: [env.appUrl],
    credentials: true,
  })
  app.enableShutdownHooks()

  const trpcRouter = app.get<AppRouter>(TRPC_ROUTER)
  const httpAdapter = app.getHttpAdapter()
  httpAdapter.getInstance().use(
    '/trpc',
    createExpressMiddleware({
      router: trpcRouter,
      createContext: createTrpcContext,
    })
  )

  const protoPath = resolve(
    __dirname,
    '..',
    '..',
    '..',
    'packages',
    'shared',
    'proto',
    'user',
    'v1',
    'user.proto'
  )

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath,
      url: env.grpcUrl,
    },
  })

  await app.startAllMicroservices()
  await app.listen(env.port)

  logger.log(`GraphQL ready at http://localhost:${env.port}/graphql`)
  logger.log(`tRPC ready at http://localhost:${env.port}/trpc`)
  logger.log(`gRPC ready on ${env.grpcUrl}`)
}

void bootstrap()
