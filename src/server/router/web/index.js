import IndexCtrol from '../../controllers';

const indexCtrol = new IndexCtrol();

function webRouter(router) {
  router.get('/', indexCtrol.actionIndex);
}

export default webRouter;