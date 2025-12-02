import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const port = process.env.PORT ? Number(process.env.PORT) : 4200
  await app.listen(port)
  // eslint-disable-next-line no-console
  console.log(`📦 Upload service running on http://localhost:${port}`)
}

void bootstrap()
