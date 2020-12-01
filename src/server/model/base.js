import { service } from '../utils/api';

class ModelBase {
  constructor() {
    this.api = service;
  }
}

export default ModelBase;