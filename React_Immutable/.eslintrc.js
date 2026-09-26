module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'max-len': 'off',
    'import/prefer-default-export': 'off',
  },
};
