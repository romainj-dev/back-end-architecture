import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: '../mesh-gateway/.mesh/schema.graphql',
  documents: ['./graphql/**/*.graphql', './app/**/*.graphql'],
  generates: {
    './graphql/generated/index.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-query',
      ],
      config: {
        fetcher: '@/lib/graphql/fetcher#graphqlFetcher',
        exposeQueryKeys: true,
        exposeFetcher: true,
        reactQueryVersion: 5,
      },
    },
  },
  config: {
    avoidOptionals: {
      field: true,
      object: true,
      inputValue: false,
      defaultValue: true,
    },
    maybeValue: 'T | null | undefined',
    skipTypename: true,
  },
}

export default config
