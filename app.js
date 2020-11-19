const Koa = require('koa');
const Router = require('@koa/router');
const render = require('koa-swig');
const co = require('co');
const path = require('path');
const serve = require('./middlewares/static_serve');

const app = new Koa();
const router = new Router();

app.use(serve(path.join(__dirname, 'assets')));

router.get('/', async (ctx, next) => {
  ctx.body = await ctx.render('index');
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