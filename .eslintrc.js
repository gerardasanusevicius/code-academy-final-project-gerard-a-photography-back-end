module.exports = {
    env: {
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb-base',
        'airbnb-typescript/base',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json'
    },
    plugins: [
        '@typescript-eslint'
    ],
    rules: {
        'import/prefer-default-export': [0],
        'indent': [0],
        '@typescript-eslint/indent': [0],
        'no-underscore-dangle': [0],
    }
}
