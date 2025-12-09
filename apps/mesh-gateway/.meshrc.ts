import { resolve } from 'node:path'

const userSchemaAbs = resolve(
  __dirname,
  '..',
  '..',
  'packages',
  'shared',
  'graphql',
  'user-schema.graphql'
)

const planSchemaAbs = resolve(
  __dirname,
  '..',
  '..',
  'packages',
  'shared',
  'graphql',
  'plan-schema.graphql'
)

const userGraphqlEndpoint =
  process.env.USER_GRAPHQL_MS_URL ?? 'http://localhost:4101/graphql'

const planGraphqlEndpoint =
  process.env.PLAN_GRAPHQL_MS_URL ?? 'http://localhost:4102/graphql'

const uploadProtoPath =
  process.env.MESH_UPLOAD_PROTO_PATH ??
  resolve(
    __dirname,
    '..',
    '..',
    'packages',
    'shared',
    'proto',
    'upload',
    'v1',
    'upload.proto'
  )

const uploadEndpoint =
  process.env.MESH_UPLOAD_ADDRESS ?? 'http://localhost:50052'

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
  additionalResolvers: [resolve(__dirname, './mesh.resolvers.ts')],
}
