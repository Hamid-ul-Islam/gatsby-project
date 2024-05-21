module.exports = {
  globals: {
    __PATH_PREFIX__: true,
    cy: true,
    Cypress: true,
    expect: true,
    assert: true,
  },
  extends: [`gatsby-standard`, `eslint-config-prettier`],
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
  },
  plugins: ['react-hooks'],
  rules: {
    'react/jsx-wrap-multilines': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'comma-dangle': 0,
    'react/require-default-props': 0,
    'import/no-named-as-default': 0,
    'arrow-parens': 0,
    'import/no-unresolved': 0,
    'arrow-body-style': 'off',
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    semi: 'off',
    'no-console': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: Object.entries(webpackConfig.alias).map(([key, val]) => [
          key,
          val,
        ]),
      },
    },
  },
}
