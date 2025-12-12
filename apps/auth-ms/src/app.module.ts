import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { envFilePaths } from '@shared/env/env-files'
import { envSchema } from '@shared/env/env-schema'
import { AppController } from './app.controller'
import { AppService } from './app.service'

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
