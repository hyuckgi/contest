module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: ['react-app', 'airbnb', 'prettier'],
  rules: {
    'import/prefer-default-export': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'react/prefer-stateless-function': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-one-expression-per-line': 0,
    'import/no-unresolved': [0, { commonjs: true }],
    'no-param-reassign': ['error', { props: false }],
    'react/prop-types': 0,
    'react/destructuring-assignment': 0,
    'import/no-named-as-default': 0,
    'react/jsx-props-no-spreading': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'react/jsx-curly-newline': 0,
    'global-require': 0
  },
};
