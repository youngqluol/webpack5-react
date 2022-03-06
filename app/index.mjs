import * as path from 'path';
import * as fs from 'fs';
import Koa from 'koa';
import serve from 'koa-static';
import Router from 'koa-router';

const app = new Koa();
const router = new Router();

app.use(serve(path.resolve(process.cwd(), 'dist')));

// https://github.com/koajs/router/blob/master/history.md 路径匹配已更新
router.get('/(.*)', async (ctx, next) => {
  ctx.type = 'html';
  ctx.body = fs.readFileSync(path.resolve(process.cwd(), 'dist/index.html'));
});
app.use(router.routes()).use(router.allowedMethods());

app.listen(8800);
console.log('服务已启动: http://localhost:8800');
// console.log(__dirname);
// console.log(path.resolve());
// console.log(process.cwd());
