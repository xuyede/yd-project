import IndexCtrol from '../../controllers';

const indexCtrol = new IndexCtrol();

function webRouter(router) {
  router.get('/api/get', indexCtrol.actionGetData);
}

export default webRouter;