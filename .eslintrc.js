module.exports = {
  extends: ['next', 'prettier'],
  rules: {
    // 'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx'] }],
    // 'react/jsx-props-no-spreading': 'off',
    // 'react/prop-types': 'off',
    // 'jsx-a11y/anchor-is-valid': 'off',
    // // note you must disable the base rule as it can report incorrect errors
    // 'no-use-before-define': 'off',
    // 'import/prefer-default-export': 'off',
    // 'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    // 'no-param-reassign': ['error', { props: false }],
    // 'arrow-body-style': ['error', 'as-needed'],
    // 'no-console': 'off',
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
