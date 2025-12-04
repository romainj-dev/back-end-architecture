import js from '@eslint/js'
import tseslint from 'typescript-eslint'

export const baseConfig = tseslint.config(
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'out/**',
      'build/**',
      'dist/**',
      'packages/shared/**/*.d.ts'
    ]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module'
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      'no-console': [
        'error',
        {
          allow: ['warn', 'error', 'info', 'debug']
        }
      ],
      'prefer-const': 'error',
      'no-var': 'error'
    }
  },
  // CommonJS files
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        require: 'readonly',
        module: 'readonly',
        exports: 'writable',
        process: 'readonly',
        console: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly'
      }
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off'
    }
  }
)

