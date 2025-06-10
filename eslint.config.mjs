// eslint.config.mjs
import globals from 'globals';

export default /** @type {import('eslint').Linter.Config[]} */ ([
  // 1) Globale TS-Regeln für alle .ts/.tsx
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: globals.browser
    },
    ignores: ['client/**', 'build/**'],

    // Hier fassen wir beide empfohlenen Regel-Sets per "extends" zusammen:
    extends: [
      'plugin:@eslint/js/recommended',              // ESLint Core empfohlen
      'plugin:@typescript-eslint/recommended'       // TS-Plugin empfohlen
    ],

    parser: '@typescript-eslint/parser',
    plugins: {
      '@typescript-eslint': '@typescript-eslint'
    }
  },

  // 2) Relax rules nur im server-Ordner
  {
    files: ['server/**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'prefer-const': 'warn'
    }
  }
]);
