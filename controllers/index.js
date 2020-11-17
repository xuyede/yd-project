import Base from './base';
import modelIndex from '../model';

class ControllerIndex extends Base {
  constructor() { super(); }

  async actionIndex(ctx, next) {
    ctx.body = await ctx.render('index', { message: '这是模版渲染的数据' })
  }

  async actionGetData(ctx) {
    const ret = await modelIndex.getBooksData();
    ctx.body = ret;
  }
}

export default ControllerIndex;