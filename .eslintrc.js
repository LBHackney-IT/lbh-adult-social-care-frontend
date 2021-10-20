module.exports = {
  extends: ['next', 'prettier'],
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
