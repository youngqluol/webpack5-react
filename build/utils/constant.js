const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';
const isEnvTest = process.env.NODE_ENV === 'test';
const useSourceMapInProduction = false; // sourcemap一般比较大，生产环境默认关闭
const hasJsxRuntime = (() => {
  // React 17+ 依赖react/jsx-runtime提供了新的JSX转换，在文件中可以不显示引入react
  // https://zh-hans.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
  try {
    require.resolve('react/jsx-runtime');
    return true;
  } catch (e) {
    return false;
  }
})();

module.exports = {
  isEnvDevelopment,
  isEnvProduction,
  isEnvTest,

  hasJsxRuntime,

  useSourceMapInProduction,
  shouldUseSourceMap: !isEnvDevelopment ? useSourceMapInProduction : isEnvDevelopment, // 开发环境默认开启

  handleModulesSourceMap: false, // 处理node_modules包里的sourcemaps

  imageInlineSizeLimit: 10000, // 图片转换为base64的最小大小，10kb左右

  enableESLintPlugin: true, // 启用eslint
  webpackFailOnEslintError: false, // 有eslint告警时打包失败

  processBabelOutsideApp: true, // Process any JS outside of the app with Babel.

  // webpack-bundle-analyzer
  ANALYZER_HOST: 'localhost',
  ANALYZER_PORT: '4000',
};
