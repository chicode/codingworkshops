module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ['lodash', 'lodash-fp'],
  extends: [
    'plugin:lodash/recommended',
    'plugin:lodash-fp/recommended',
    'plugin:vue/recommended',
    '@vue/standard',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-spacing': ['error', 'always'],
    camelcase: 'off',
    'no-unused-vars': ['error', { varsIgnorePattern: '^_' }],
    'quote-props': ['error', 'consistent-as-needed'],

    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'always',
      },
    ],
    'vue/require-prop-types': 'off',

    // fix lodash variable being called undefined
    'no-unused-vars': ['error', { varsIgnorePattern: '^_.*' }],

    // temporary fix for the pipeline operator
    'operator-linebreak': 'off',
    'lodash/prefer-lodash-method': 'off',
    'lodash-fp/no-unused-result': 'off',

    'no-unused-expressions': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },

  // global debugging vars (defined in globals.js)
  globals: {
    debug: true,
    p: true,
    c: true,
  },
}
