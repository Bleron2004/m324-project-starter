import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // 1) Basis-Regeln für alle TS-Dateien
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: globals.browser
    },
    ignores: ['client/**', 'build/**'],
    extends: [
      // ESLint Core empfohlene Regeln
      'plugin:@eslint/js/recommended',
      // TypeScript-Plugin empfohlene Regeln
      ...tseslint.configs.recommended.extends
    ],
    parser: '@typescript-eslint/parser',
    plugins: {
      '@typescript-eslint': tseslint
    }
  },

  // 2) Spezielles Override nur für den Server, um No-ops auszuschalten
  {
    files: ['server/**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'prefer-const': 'warn'
    }
  }
];
