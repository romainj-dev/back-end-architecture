import { createServer } from 'node:http'
import { config as loadEnv } from 'dotenv'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { createMeshHTTPHandler } from '@graphql-mesh/http'
import { findAndParseConfig } from '@graphql-mesh/cli'
import { getMesh } from '@graphql-mesh/runtime'
import { envFilePaths } from '@shared/env/env-files'
import { envSchema } from '@shared/env/env-schema'
import { validateJWT, createUserHeaders } from '../auth'

const currentDir = fileURLToPath(new URL('.', import.meta.url))
const repoRoot = resolve(currentDir, '../../..')
const gatewayDir = resolve(currentDir, '..')

for (const file of envFilePaths(repoRoot)) {
  loadEnv({ path: file, override: true })
}

const env = envSchema.parse(process.env)

async function main(): Promise<void> {
  const meshConfig = await findAndParseConfig({ dir: gatewayDir })
  const mesh = await getMesh(meshConfig)
  const handler = createMeshHTTPHandler({
    baseDir: gatewayDir,
    getBuiltMesh: async () => mesh,
  })

  const port = Number(env.MESH_GATEWAY_PORT)

  createServer(async (req: IncomingMessage, res: ServerResponse) => {
    // Validate JWT and add user headers to request for downstream services
    const user = await validateJWT(req, env.AUTH_SECRET)
    if (user) {
      const userHeaders = createUserHeaders(user)
      Object.entries(userHeaders).forEach(([key, value]) => {
        req.headers[key] = value
      })
    }
    handler(req, res)
  }).listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Mesh running on http://localhost:${port}/graphql`)
  })
}

main().catch((error) => {
  console.error('Mesh bootstrap failed', error)
  process.exit(1)
})
