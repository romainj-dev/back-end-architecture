import { defineConfig, globalIgnores } from 'eslint/config'
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier/flat'
import { baseConfig } from '../../packages/config/eslint/base.mjs'

export default defineConfig([
  ...baseConfig,
  ...nextCoreWebVitals,
  ...nextTypescript,
  prettier,
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'graphql/generated/**',
  ]),
])

