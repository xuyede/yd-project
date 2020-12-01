import Router from '@koa/router';
import { historyApiFallback } from 'koa2-connect-history-api-fallback';
import webRouter from './web';
import apiRouter from './api';

const router = new Router();
function initRouter(app) {
  // 渲染路由
  webRouter(router);
  // 接口路由
  apiRouter(router);
  app
    // 兼容真假路由
    .use(historyApiFallback({index: '/', whiteList: ['/api']}))
    .use(router.routes())
    .use(router.allowedMethods());
}

export default initRouter;