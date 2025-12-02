import js from '@eslint/js'
import tseslint from 'typescript-eslint'

export const baseConfig = tseslint.config(
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**', 'build/**', 'dist/**']
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
          allow: ['warn', 'error']
        }
      ],
      'prefer-const': 'error',
      'no-var': 'error'
    }
  }
)

