import Base from './base';

class ControllerIndex extends Base {
  constructor() { super(); }

  async actionIndex(ctx, next) {
    ctx.body = await ctx.render('index', { message: '这是模版渲染的数据' })
  }

  actionGetData(ctx) {
    ctx.body = {
      code: '0',
      data: [
        {name: 'xyd', age: 18},
        {name: 'xuyede', age: 19},
      ]
    }
  }
}

export default ControllerIndex;