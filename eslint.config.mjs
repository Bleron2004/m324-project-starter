import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{ts}'] },
  { languageOptions: { globals: globals.browser } },
  { ignores: ['*.js', 'client', 'build'] },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
// ... dein bisheriges eslint.config.mjs

export default [
  { files: ['**/*.{ts}'] },
  { languageOptions: { globals: globals.browser } },
  { ignores: ['*.js', 'client', 'build'] },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['server/**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'prefer-const': 'warn'
    }
  }
];
