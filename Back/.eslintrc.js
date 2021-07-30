module.exports = {
    extends: [
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'plugin:jest/recommended',
        'plugin:prettier/recommended',
    ],
    plugins: ['react', '@typescript-eslint', 'jest'],
    env: {
        browser: true,
        es6: true,
        jest: true,
    },
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json',
        createDefaultProgram: true,
    },
    rules: {
        'linebreak-style': 0,
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
        '@typescript-eslint/no-non-null-assertion': 'off',
        'class-methods-use-this': 'off',
        'max-classes-per-file': 'off',
    },
};
