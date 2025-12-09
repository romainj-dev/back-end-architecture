import type { Config } from 'jest'

const config: Config = {
  rootDir: '.',
  testEnvironment: 'node',
  clearMocks: true,
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  testMatch: ['**/*.spec.ts'],
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
      },
    ],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@shared/(.*)$': '<rootDir>/../../packages/shared/$1',
    '^@config/(.*)$': '<rootDir>/../../packages/config/$1',
  },
}

export default config
