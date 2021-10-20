module.exports = {
  extends: ['plugin:@next/next/recommended', 'airbnb', 'prettier'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  },
  settings: {
    'import/resolver': {
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
