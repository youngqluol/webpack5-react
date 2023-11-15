// 代理设置
const proxySettings = {
  '/api/': {
    target: 'http://198.168.111.111:3001',
    changeOrigin: true,
  },
};

module.exports = proxySettings;
