const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');

const app = new Koa();
const router = new Router();

app.use(static(path.resolve(process.cwd(), 'dist')));
app.use(static(__dirname + 'public'));

router.get('/api/getInfo', async (ctx, next) => {
  ctx.type = 'json';
  ctx.body = {
    data: 1,
  };
});

router.get('/api/file/download', async (ctx, next) => {
  console.log('url: /api/file/download');
  const blob = fs.readFileSync(resolve('./public/file2.zip'));
  const stat = fs.statSync(resolve('./public/file2.zip'));
  ctx.length = stat.size;
  ctx.body = blob;
});

// https://github.com/koajs/router/blob/master/history.md 路径匹配已更新
router.get('/(.*)', async (ctx, next) => {
  ctx.set('Content-Type', 'text/html');
  ctx.body = fs.readFileSync(path.resolve(process.cwd(), 'dist/index.html'));
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(8800, '0.0.0.0');
console.log('服务已启动: http://localhost:8800');

function resolve(url) {
  return path.resolve(__dirname, url);
}
