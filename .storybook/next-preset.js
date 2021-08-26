const path = require('path');

module.exports = {
  webpackFinal: async (baseConfig, options) => {
    const { module = {} } = baseConfig;

    const newConfig = {
      ...baseConfig,
      module: {
        ...module,
        rules: [...(module.rules || [])],
      },
    };

    newConfig.module.rules.push({
      test: /\.(s*)css$/,
      use: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../styles/globals.scss'),
    });

    return newConfig;
  },
};
