import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = app.get(ConfigService)
  const port = Number(config.getOrThrow('UPLOAD_MS_PORT'))
  await app.listen(port)
  // eslint-disable-next-line no-console
  console.log(`📦 Upload service running on http://localhost:${port}`)
}

void bootstrap()
