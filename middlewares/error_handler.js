function handler(app) {
  app.use(async function(ctx, next) {
    try {
      await next();
    } catch (err) {
      //TODO 把错误记录到日志
      const status = err.status || 500;
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error = status === 500 && process.env.NODE_ENV === 'production'
        ? '500 Internal Server Error'
        : err.message;
      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = error;
      ctx.status = status;
    }
  })
}

export default handler;