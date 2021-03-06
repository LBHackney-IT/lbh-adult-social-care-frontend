module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    // allow jsx syntax in js files
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx'] }],
    // allow prop spreading
    // 'react/jsx-props-no-spreading': ['error', { custom: 'ignore' }],
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    // note you must disable the base rule as it can report incorrect errors
    'no-use-before-define': 'off',
    'import/prefer-default-export': 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-param-reassign': ['error', { props: false }],
    'arrow-body-style': ['error', 'as-needed'],
    // 'no-param-reassign': [2, { props: false }],
    'no-console': 'off',
    'no-unused-vars': 'off',
    'consistent-return': 'off',
    // NOTE Disable a11y rules as this is not a public facing app
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    // NOTE Ignore as circular dependencies will be handled by webpack
    'import/no-cycle': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: true, optionalDependencies: false, peerDependencies: false },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.css', '.scss'],
        paths: ['styles'],
      },
      alias: {
        map: [
          ['components', './components'],
          ['constants', './constants'],
          ['routes', './routes'],
          ['api', './api'],
          ['reducers', './reducers'],
          ['lib', './lib'],
          ['service', './service'],
        ],
      },
    },
  },
};
