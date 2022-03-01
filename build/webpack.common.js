'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const resolve = require('resolve');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { getStyleLoaders } = require('./utils/getStyleLoaders');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const ESLintPlugin = require('eslint-webpack-plugin');
const paths = require('./config/paths');
const modules = require('./config/modules');
const getClientEnvironment = require('./config/env');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin');
const WebpackBar = require('webpackbar');

// for cache option
const createEnvironmentHash = require('./utils/createEnvironmentHash');

// for ModuleScopePlugin
const reactRefreshRuntimeEntry = require.resolve('react-refresh/runtime');
const reactRefreshWebpackPluginRuntimeEntry = require.resolve('@pmmmwh/react-refresh-webpack-plugin');
const babelRuntimeEntry = require.resolve('babel-preset-react-app');
const babelRuntimeEntryHelpers = require.resolve('@babel/runtime/helpers/esm/assertThisInitialized', {
  paths: [babelRuntimeEntry],
});
const babelRuntimeRegenerator = require.resolve('@babel/runtime/regenerator', {
  paths: [babelRuntimeEntry],
});

// constants
const {
  isEnvDevelopment,
  isEnvProduction,
  hasJsxRuntime,
  shouldUseSourceMap,
  imageInlineSizeLimit,
  handleModulesSourceMap,
  processBabelOutsideApp,
  disableESLintPlugin,
  webpackFailOnEslintError,
} = require('./utils/constant');

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegx = /\.less$/;
const lessModuleRegx = /\.module\.less$/;

// We will provide `paths.publicUrlOrPath` to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
// Get environment variables to inject into our app.
const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

module.exports = {
  target: ['browserslist'],

  // 入口：src/index.tsx
  entry: paths.appIndexJs,

  // 缓存
  cache: {
    type: 'filesystem',
    version: createEnvironmentHash(env.raw),
    cacheDirectory: paths.appWebpackCache,
    store: 'pack',
    buildDependencies: {
      defaultWebpack: ['webpack/lib/'],
      config: [__filename],
      tsconfig: [paths.appTsConfig, paths.appJsConfig].filter(f => fs.existsSync(f)),
    },
  },

  // 基础设施日志输出选项，level默认值为info。
  infrastructureLogging: {
    level: 'none', // 此处禁用。
  },

  resolve: {
    modules: ['node_modules', paths.appNodeModules].concat(modules.additionalModulePaths || []),
    extensions: paths.moduleFileExtensions.map(ext => `.${ext}`),
    alias: {
      '@src': paths.appSrc,
      '@components': paths.appSrcComponents,
      '@utils': paths.appSrcUtils,
    },
    plugins: [
      // Prevents users from importing files from outside of src/ (or node_modules/).
      // This often causes confusion because we only process files within src/ with babel.
      // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
      // please link the files into your node_modules/ and let module-resolution kick in.
      // Make sure your source files are compiled, as they will not be processed in any way.
      new ModuleScopePlugin(paths.appSrc, [
        paths.appPackageJson,
        reactRefreshRuntimeEntry,
        reactRefreshWebpackPluginRuntimeEntry,
        babelRuntimeEntry,
        babelRuntimeEntryHelpers,
        babelRuntimeRegenerator,
      ]),
    ],
  },

  externals: {},

  module: {
    // 将缺失的导出提示成错误而不是警告
    strictExportPresence: true,
    rules: [
      handleModulesSourceMap && {
        enforce: 'pre',
        exclude: /@babel(?:\/|\\{1,2})runtime/,
        test: /\.(js|mjs|jsx|ts|tsx|css)$/,
        loader: require.resolve('source-map-loader'),
      },
      {
        // "oneOf" will traverse all following loaders until one will
        // match the requirements. When no loader matches it will fall
        // back to the "file" loader at the end of the loader list.
        oneOf: [
          // 图片
          {
            test: [/\.avif$/], // TODO: Merge this config once `image/avif` is in the mime-db
            type: 'asset',
            mimetype: 'image/avif',
            parser: {
              dataUrlCondition: {
                maxSize: imageInlineSizeLimit,
              },
            },
            generator: {
              filename: 'image/[name].[ext]',
            },
          },
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: imageInlineSizeLimit,
              },
            },
            generator: {
              filename: 'image/[name].[ext]',
            },
          },
          {
            test: /\.svg$/,
            use: [
              {
                loader: require.resolve('@svgr/webpack'),
                options: {
                  prettier: false,
                  svgo: false,
                  svgoConfig: {
                    plugins: [{ removeViewBox: false }],
                  },
                  titleProp: true,
                  ref: true,
                },
              },
              {
                loader: require.resolve('file-loader'),
                options: {
                  name: 'image/[name].[ext]',
                },
              },
            ],
            issuer: {
              and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
            },
          },
          // 视频
          {
            test: /\.(mp4|avi|mp3|wav)$/,
            type: 'asset',
            generator: {
              filename: 'media/[name].[ext]',
            },
          },
          // 字体
          {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            type: 'asset',
            generator: {
              filename: 'fonts/[name].[ext]',
            },
          },
          // babel
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              customize: require.resolve('babel-preset-react-app/webpack-overrides'),
              presets: [
                [
                  require.resolve('babel-preset-react-app'),
                  {
                    runtime: hasJsxRuntime ? 'automatic' : 'classic',
                  },
                ],
              ],

              plugins: [isEnvDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
              // Enables caching results in ./node_modules/.cache/babel-loader/ directory for faster rebuilds.
              cacheDirectory: true,
              cacheCompression: false,
              compact: isEnvProduction,
            },
          },
          processBabelOutsideApp && {
            test: /\.(js|mjs)$/,
            exclude: /@babel(?:\/|\\{1,2})runtime/,
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              configFile: false,
              compact: false,
              presets: [[require.resolve('babel-preset-react-app/dependencies'), { helpers: true }]],
              cacheDirectory: true,
              cacheCompression: false,
              // Babel sourcemaps are needed for debugging into node_modules
              // code. Without the options below, debuggers like VSCode
              // show incorrect code and set breakpoints on the wrong lines.
              sourceMaps: shouldUseSourceMap,
              inputSourceMap: shouldUseSourceMap,
            },
          },
          // css
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
              sourceMap: shouldUseSourceMap,
              modules: {
                mode: 'icss',
              },
            }),
            // See https://github.com/webpack/webpack/issues/6571
            sideEffects: true,
          },
          // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
          // using the extension .module.css
          {
            test: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
              sourceMap: shouldUseSourceMap,
              modules: {
                mode: 'local',
                getLocalIdent: getCSSModuleLocalIdent,
              },
            }),
          },
          // Opt-in support for LESS (using .less extensions).
          {
            test: lessRegx,
            exclude: lessModuleRegx,
            use: getStyleLoaders(
              {
                importLoaders: 3,
                sourceMap: shouldUseSourceMap,
                modules: {
                  mode: 'icss',
                },
              },
              'less-loader',
            ),
            sideEffects: true,
          },
          // Adds support for CSS Modules, but using LESS
          // using the extension .module.less
          {
            test: lessModuleRegx,
            use: getStyleLoaders(
              {
                importLoaders: 3,
                sourceMap: shouldUseSourceMap,
                modules: {
                  mode: 'local',
                  getLocalIdent: getCSSModuleLocalIdent,
                },
              },
              'less-loader',
            ),
          },
          // "file" loader makes sure those assets get served by WebpackDevServer.
          // When you `import` an asset, you get its (virtual) filename.
          // In production, they would get copied to the `build` folder.
          // This loader doesn't use a "test" so it will catch all modules
          // that fall through the other loaders.
          {
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise be processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/^$/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            type: 'asset/resource',
          },
          // ** STOP ** Are you adding a new loader?
          // Make sure to add the new loader(s) before the "file" loader.
        ].filter(Boolean),
      },
    ].filter(Boolean),
  },

  plugins: [
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: 'body',
          template: paths.appHtml,
        },
        isEnvProduction
          ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              },
            }
          : undefined,
      ),
    ),
    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
    // It will be an empty string unless you specify "homepage"
    // in `package.json`, in which case it will be the pathname of that URL.
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
    // This gives some necessary context to module not found errors, such as
    // the requesting resource.
    new ModuleNotFoundPlugin(paths.appPath),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
    // It is absolutely essential that NODE_ENV is set to production
    // during a production build.
    // Otherwise React will be compiled in the very slow development mode.
    new webpack.DefinePlugin(env.stringified),
    // TypeScript type checking
    new ForkTsCheckerWebpackPlugin({
      async: isEnvDevelopment,
      typescript: {
        typescriptPath: resolve.sync('typescript', {
          basedir: paths.appNodeModules,
        }),
        configOverwrite: {
          compilerOptions: {
            sourceMap: shouldUseSourceMap,
            skipLibCheck: true,
            inlineSourceMap: false,
            declarationMap: false,
            noEmit: true,
            incremental: true,
            tsBuildInfoFile: paths.appTsBuildInfoFile,
          },
        },
        context: paths.appPath,
        diagnosticOptions: {
          syntactic: true,
        },
        mode: 'write-references',
      },
      logger: {
        infrastructure: 'silent',
      },
    }),
    !disableESLintPlugin &&
      new ESLintPlugin({
        // Plugin options
        extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
        formatter: require.resolve('react-dev-utils/eslintFormatter'), // TODO: try eslint-friendly-formatter
        eslintPath: require.resolve('eslint'),
        failOnError: webpackFailOnEslintError && !isEnvDevelopment, // development下默认不失败
        context: paths.appSrc,
        cache: true,
        cacheLocation: path.resolve(paths.appNodeModules, '.cache/.eslintcache'),
        // ESLint class options
        // https://eslint.org/docs/developer-guide/nodejs-api#-new-eslintoptions
        cwd: paths.appPath,
        resolvePluginsRelativeTo: __dirname,
        baseConfig: {},
        // Default is true. If false is present, ESLint doesn't load configuration files (.eslintrc.* files)
        // and Only the configuration of the constructor options is valid.
        // useEslintrc: false
      }),
    new WebpackBar({
      name: isEnvDevelopment ? '正在启动：' : '正在打包：',
      color: '#fa8c16',
    }),
  ].filter(Boolean),
  // Turn off performance processing because we utilize
  // our own hints via the FileSizeReporter
  performance: false,
};
