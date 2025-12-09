import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: '../mesh-gateway/.mesh/schema.graphql',
  documents: './graphql/**/*.graphql',
  generates: {
    './graphql/generated/types.ts': {
      plugins: ['typescript', 'typescript-operations'],
    },
  },
  config: {
    avoidOptionals: true,
    maybeValue: 'T | null',
    skipTypename: true,
  },
}

export default config
