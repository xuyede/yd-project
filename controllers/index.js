import Base from './base';
import modelIndex from '../model';
import { logger } from '../config/log.config';

class ControllerIndex extends Base {
  constructor() { super(); }

  async actionIndex(ctx, next) {
    ctx.body = await ctx.render('index', { message: '这是模版渲染的数据' })
  }

  async actionGetData(ctx) {
    try {
      const ret = await modelIndex.getBooksData();
      ctx.body = ret;
    } catch (error) {
      logger.error(error.message);
    }
    
  }
}

export default ControllerIndex;