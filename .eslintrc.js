module.exports = {
  env: {
    browser: true,
    es2015: true,
    jquery: true
  },
  globals: {
    wiki: 'writable',
    Vue: 'readable',
    vis: 'readable',
    ace: 'writable'
  },
  extends: [
    'airbnb-base'
  ],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module'
  },
  rules: {
    semi: ['error', 'never'],
    'max-len': ['error', { code: 110 }],
    'vars-on-top': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': ['error', 'always'],
    eqeqeq: ['error', 'smart'],
    'comma-dangle': ['error', 'never'],
    'object-curly-newline': ['error', { multiline: true }],
    'func-names': ['error', 'never'],
    'space-before-function-paren': ['error', 'never'],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }]
  }
}
