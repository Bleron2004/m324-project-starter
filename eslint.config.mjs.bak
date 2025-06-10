import globals from 'globals';
import pluginJs from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // 1) Empfohlene Core-Regeln von ESLint
  pluginJs.configs.recommended,

  // 2) Empfohlene Regeln des TypeScript-Plugins
  tsPlugin.configs.recommended,

  // 3) Override für alle TS/TSX: Browser-Globals erlauben, Parser setzen, client/build ignorieren
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      globals: globals.browser
    },
    ignores: ['client/**', 'build/**'],
  },

  // 4) Relax-Rules nur im server-Ordner
  {
    files: ['server/**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'prefer-const': 'warn'
    }
  }
];
