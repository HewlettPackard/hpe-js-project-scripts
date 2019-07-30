module.exports = {
  parser: require.resolve('babel-eslint'),
  extends: [require.resolve('eslint-config-airbnb')],
  plugins: [require.resolve('eslint-plugin-react')],
  env: {
    browser: true,
    jest: true,
  },
  globals: {
    it: true,
    expect: true,
    describe: true,
    jest: true,
    document: true,
    test: true,
    window: true,
    fetch: true,
    WebSocket: true,
    alert: true,
  },
  rules: {
    'comma-dangle': 1,
    'max-len': 0,
    'jsx-a11y/href-no-hash': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'react/jsx-wrap-multilines': 0,
    'react/jsx-filename-extension': 0,
    'implicit-arrow-linebreak': 0,
    'import/no-named-as-default': 0,
    'react/no-unescaped-entities': 0,
    'import/prefer-default-export': 0,
    'class-methods-use-this': 0,
    'operator-linebreak': 0,
    'react/require-default-props': 0,
    'react/react-in-jsx-scope': 0,
    'react/no-danger': 0,
    'react/prefer-stateless-function': 0,
    'react/no-array-index-key': 0,
    'no-return-assign': 0,
    'react/destructuring-assignment': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-one-expression-per-line': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-cycle': 0,
  },
};
