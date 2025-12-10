import type { Config } from 'jest'

const config: Config = {
  testEnvironment: 'node',
  rootDir: '../..',
  roots: ['<rootDir>/apps/user-graphql-ms'],
  testMatch: ['**/*.spec.ts'],
  clearMocks: true,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/apps/user-graphql-ms/src/$1',
    '^@shared/(.*)$': '<rootDir>/packages/shared/$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          module: 'CommonJS',
          moduleResolution: 'Node',
          esModuleInterop: true,
          experimentalDecorators: true,
          emitDecoratorMetadata: true,
        },
      },
    ],
  },
}

export default config
