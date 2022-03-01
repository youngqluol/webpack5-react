const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const commonConfig = require('./webpack.common');
const { merge } = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const { isEnvProduction, useSourceMapInProduction, ANALYZER_HOST, ANALYZER_PORT } = require('./utils/constant');
const paths = require('./config/paths');
const shouldOpenAnalyzer = process.env.npm_config_report;

module.exports = merge(commonConfig, {
  mode: 'production',

  bail: true,

  devtool: useSourceMapInProduction ? 'source-map' : false,

  output: {
    path: paths.appBuild,
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: 'js/[name].[contenthash:8].chunk.js',
    publicPath: paths.publicUrlOrPath,
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: info => path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, '/'),
  },

  plugins: [
    // Inlines the webpack runtime script. This script is too small to warrant a network request.
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+[.]js/]),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].chunk.css',
    }),
    shouldOpenAnalyzer &&
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerHost: ANALYZER_HOST,
        analyzerPort: ANALYZER_PORT,
      }),
  ].filter(Boolean),

  optimization: {
    emitOnErrors: true, // 编译错误
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial',
        },
      },
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
            drop_debugger: true,
            // 禁止console：生产环境下关闭
            drop_console: isEnvProduction,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
  },
});
