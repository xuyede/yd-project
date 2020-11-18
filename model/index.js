import Base from './base';

class ModelIndex extends Base{
  constructor() { super(); }

  getBooksData() {
    return this.api.get('http://127.0.0.1/basic/web/index.php?r=book');
  }

  postBooksData() {
    return this.api.post('http://127.0.0.1/basic/web/index.php?r=book', { name: 'xuyede' });
  }
}

export default new ModelIndex;