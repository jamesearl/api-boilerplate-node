import _ from 'lodash';
import Base from './base';
import config from '../../config';
import logger from '../../logger';

class Service extends Base {
  constructor(req, res) {
    super(req, res);
  }

  index() {
    return this.json({
      message: '/home',
    })
  }
}


export default {
  route(router) {
    router.get('/home', (req, res) => {
      return new Service(req, res).index();
    });
  }
};
