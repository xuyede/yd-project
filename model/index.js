import Base from './base';

class ModelIndex extends Base{
  constructor() { super(); }

  getBooksData() {
    return this.api.get('http://127.0.0.1/basic/web/index.php?r=book');
  }
}

export default new ModelIndex;