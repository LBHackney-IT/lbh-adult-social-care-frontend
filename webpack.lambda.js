const ZipPlugin = require('zip-webpack-plugin');
const path = require('path');

const config = {
  entry: {
    handler: './lambda.js',
  },
  resolve: {
    alias: {
      'next/dist/build/webpack/plugins/terser-webpack-plugin': 'terser-webpack-plugin',
      [path.resolve(__dirname, './node_modules/esbuild/lib/main.d.ts')]: false,
      [path.resolve(__dirname, './node_modules/next/dist/compiled/@vercel/nft/LICENSE')]: false,
      [path.resolve(__dirname, './node_modules/@next/swc-linux-x64-gnu/next-swc.linux-x64-gnu.node')]: false,
      [path.resolve(__dirname, './node_modules/@next/swc-linux-x64-musl/next-swc.linux-x64-musl.node')]: false,
    },
    extensions: ['.js'],
  },
  externals: {
    '@swc/core': '@swc/core',
  },
  output: {
    filename: '[name]/index.js',
    path: path.resolve(__dirname, 'dist/'),
    libraryTarget: 'umd',
  },
  module: {
    //  rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }],
  },
  target: 'node',
  mode: 'production',
  optimization: { minimize: false },
};
// finally zip the output directory, ready to deploy
const pluginConfig = {
  plugins: Object.keys(config.entry).map(
    (entryName) =>
      new ZipPlugin({
        path: path.resolve(__dirname, 'dist/'),
        filename: entryName,
        extension: 'zip',
        include: [entryName],
      })
  ),
};

const webpackConfig = Object.assign(config, pluginConfig);
module.exports = webpackConfig;
