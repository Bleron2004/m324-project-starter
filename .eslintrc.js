module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    env: {
        node: true,
        es6: true,
        browser: true
    },
    ignorePatterns: ['client/**', 'build/**'],
    overrides: [
        {
            files: ['server/**/*.ts'],
            rules: {
                '@typescript-eslint/no-unused-vars': 'off',
                '@typescript-eslint/no-explicit-any': 'off',
                'prefer-const': 'warn'
            }
        }
    ]
};
