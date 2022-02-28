const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const path = require('path');
const commonConfig = require('./webpack.common');
const { merge } = require('webpack-merge');
const paths = require('./config/paths');

module.exports = merge(commonConfig, {
  mode: 'development',

  devtool: 'cheap-module-source-map',

  output: {
    path: paths.appBuild,
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    filename: 'js/bundle.js',
    chunkFilename: 'js/[name].chunk.js',
    publicPath: paths.publicUrlOrPath,
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },

  plugins: [
    // Experimental hot reloading for React .
    // https://github.com/facebook/react/tree/main/packages/react-refresh
    new ReactRefreshWebpackPlugin({
      overlay: false,
    }),
    // Watcher doesn't work well if you mistype casing in a path so here use
    // a plugin that prints an error when you attempt to do this.
    // See https://github.com/facebook/create-react-app/issues/240
    new CaseSensitivePathsPlugin(),
  ],
  optimization: {
    minimize: false,
  },
});
