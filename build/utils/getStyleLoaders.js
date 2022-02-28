'use strict';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const paths = require('../config/paths');
const { shouldUseSourceMap, isEnvDevelopment } = require('./constant');

// common function to get style loaders
// loader顺序：style-loader（MiniCssExtractPlugin.loader）、css-loader、postcss-loader、sass-loader（或less-loader等）
exports.getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    isEnvDevelopment
      ? require.resolve('style-loader')
      : {
          loader: MiniCssExtractPlugin.loader,
          // css is located in `css/`, use '../' to locate index.html folder
          // in production `paths.publicUrlOrPath` can be a relative path
          options: paths.publicUrlOrPath.startsWith('.') ? { publicPath: '../' } : {},
        },
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      // Options for PostCSS as we reference these options twice
      // Adds vendor prefixing based on your specified browser support in
      // package.json
      loader: require.resolve('postcss-loader'),
      options: {
        postcssOptions: {
          ident: 'postcss',
          config: false,
          plugins: [
            'postcss-flexbugs-fixes',
            [
              'postcss-preset-env',
              {
                autoprefixer: {
                  flexbox: 'no-2009',
                },
                stage: 3,
              },
            ],
            // Adds PostCSS Normalize as the reset css with default options,
            // so that it honors browserslist config in package.json
            // which in turn let's users customize the target behavior as per their needs.
            'postcss-normalize',
          ],
        },
        sourceMap: shouldUseSourceMap,
      },
    },
  ].filter(Boolean);
  if (preProcessor) {
    // css预处理工具：less
    loaders.push(
      {
        loader: require.resolve('resolve-url-loader'),
        options: {
          sourceMap: shouldUseSourceMap,
          root: paths.appSrc,
        },
      },
      {
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: shouldUseSourceMap,
        },
      },
    );
  }
  return loaders;
};
