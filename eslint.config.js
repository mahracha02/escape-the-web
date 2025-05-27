import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import globals from 'globals'

export default [
  // JS/TS/React config for src
  {
    ...js.configs.recommended,
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser
      }
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  // Node config for config files
  {
    files: ['*.js', '*.cjs', '*.mjs', '*.ts'],
    ignores: ['src/**'],
    languageOptions: {
      parserOptions: {
        sourceType: 'module'
      },
      globals: {
        ...globals.node
      }
    }
  },
  // Jest config for test files
  {
    files: ['src/**/*.test.{ts,tsx,js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.jest
      }
    }
  }
]
