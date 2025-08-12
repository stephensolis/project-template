import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import importPlugin from 'eslint-plugin-import'
import prettierRecommended from 'eslint-plugin-prettier/recommended'

export default tseslint.config(
  {
    ignores: [
      'dist'
    ]
  },
  {
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.recommended,
      importPlugin.flatConfigs.recommended,
      prettierRecommended,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      globals: globals.browser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // React Refresh rules
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // React rules
      'react/prop-types': 'off', // Not needed with TypeScript
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/jsx-no-undef': 'error',
      'react/jsx-key': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/no-direct-mutation-state': 'error',
      'react/no-deprecated': 'warn',
      'react/self-closing-comp': 'warn',

      // Import rules
      'import/no-unresolved': 'off', // TypeScript handles this
      'import/named': 'error',
      'import/namespace': 'error',
      'import/no-duplicates': 'error',
      'import/order': ['warn', {
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'pathGroups': ['assets', 'components', 'contexts', 'hooks', 'pages', 'services', 'styles', 'utils'].map(dir => ({
          pattern: `${dir}/**`,
          group: 'internal'
        })),
        'pathGroupsExcludedImportTypes': ['builtin'],
        'newlines-between': 'always',
        'alphabetize': { 'order': 'asc', 'caseInsensitive': true }
      }],

      // TypeScript specific rules
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off', // Too restrictive
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Too restrictive
      '@typescript-eslint/no-unused-vars': ['warn', {
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_',
      }],
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/prefer-optional-chain': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',

      // General JavaScript best practices
      'no-console': ['warn', { allow: ['error'] }],
      'no-debugger': 'warn',
      'eqeqeq': ['error', 'always', { 'null': 'ignore' }],
      'no-var': 'error',
      'prefer-const': 'warn',
      'prefer-template': 'warn',
      'object-shorthand': 'warn'
    },
  },
)
