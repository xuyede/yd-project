import Koa from 'koa';
import koaConfig from './config/koa.config';
import netWork from './utils/ip';
import initRouter from './router';
import render from 'koa-swig';
import co from 'co';
import serve from 'koa-static';
import error from './middlewares/error_handler';

const app = new Koa();

// 错误统一处理
error(app);

// 路由
initRouter(app);

// 模版渲染
app.context.render = co.wrap(render({
  root: koaConfig.viewDir,
  cache: false,
  ext: 'html',
  varControls: ['[[', ']]']
}));

// 静态资源服务器
app.use(serve(koaConfig.staticDir));

// 监听端口
app.listen(koaConfig.port, () => {
  console.log('===============================================')
  console.log('')
  console.log('the app running on: ');
  console.log('')
  console.log(`Local -   http://127.0.0.1:${koaConfig.port}`);
  console.log(`NetWork - http://${netWork}:${koaConfig.port}`);
  console.log('')
  console.log('===============================================')
})