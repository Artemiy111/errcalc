module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  plugins: ['@typescript-eslint'],
  env: {
    node: true,
  },
  extends: [
    './.eslintrc-auto-import.json',

    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',

    'plugin:vue/vue3-recommended',

    'prettier',
  ],
  rules: {},
}
