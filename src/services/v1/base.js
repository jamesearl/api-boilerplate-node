import Base from '../base';
import Db from '../../providers/db';

export default class V1BaseService extends Base {
  constructor(req, res) {
    super(req, res);
  }

  db() {
    return Db;
  }
}
