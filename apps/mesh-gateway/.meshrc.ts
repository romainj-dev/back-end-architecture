import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { config as loadEnv } from 'dotenv'
import { envFilePaths } from '@shared/env/env-files'
import { envSchema } from '@shared/env/env-schema'

const currentDir = fileURLToPath(new URL('.', import.meta.url))
const repoRoot = resolve(currentDir, '..', '..')

for (const file of envFilePaths(repoRoot)) {
  loadEnv({ path: file, override: true })
}

const env = envSchema.parse(process.env)

const userSchemaAbs = resolve(
  repoRoot,
  'packages',
  'shared',
  'graphql',
  'user-schema.graphql'
)

const planSchemaAbs = resolve(
  repoRoot,
  'packages',
  'shared',
  'graphql',
  'plan-schema.graphql'
)

const userGraphqlEndpoint = `http://localhost:${env.USER_GRAPHQL_MS_PORT}/graphql`
const planGraphqlEndpoint = `http://localhost:${env.PLAN_GRAPHQL_MS_PORT}/graphql`
const uploadProtoPath = resolve(
  repoRoot,
  'packages',
  'shared',
  'proto',
  'upload',
  'v1',
  'upload.proto'
)
const uploadEndpoint = `localhost:${env.UPLOAD_MS_PORT}`

export default {
  sources: [
    {
      name: 'UserService',
      handler: {
        graphql: {
          source: userSchemaAbs,
          endpoint: userGraphqlEndpoint,
        },
      },
    },
    {
      name: 'PlanService',
      handler: {
        graphql: {
          source: planSchemaAbs,
          endpoint: planGraphqlEndpoint,
        },
      },
    },
    {
      name: 'UploadService',
      handler: {
        grpc: {
          source: uploadProtoPath,
          endpoint: uploadEndpoint,
          useHTTPS: false,
        },
      },
    },
  ],
  additionalTypeDefs: [
    /* GraphQL */ `
      type UploadStatus {
        uploadId: ID!
        status: String!
        progress: Int
        message: String
      }

      type Subscription {
        uploadStatus(uploadId: ID!): UploadStatus!
      }
    `,
  ],
  additionalResolvers: [resolve(currentDir, './mesh.resolvers.ts')],
}
