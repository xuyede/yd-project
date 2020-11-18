import IndexCtrol from '../../controllers';

const indexCtrol = new IndexCtrol();

function webRouter(router) {
  router.get('/api/get', indexCtrol.actionGetData);
  router.post('/api/post', indexCtrol.actionPostData)
}

export default webRouter;