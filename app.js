const Koa = require('koa');
const Router = require('@koa/router');
const render = require('koa-swig');
const co = require('co');
const path = require('path');

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = 'hw'
})

app.context.render = co.wrap(render({
  root: path.join(__dirname, 'views'),
  cache: false,
  ext: 'html',
}))

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000, () => {
  console.log('http://localhost:3000')
})