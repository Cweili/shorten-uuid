module.exports = {
  extends: 'airbnb-base',
  env: {
    browser: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'no-bitwise': 0,
    'no-plusplus': 0,
    'no-param-reassign': 0,
  },
};
