import winston from 'winston';
import _ from 'lodash';
import logger from '../logger';
import Cache from '../providers/cache/memory';

export default class BaseService {
  constructor(request, response) {
    this.request = request;
    this.response = response;
    this.cache = new Cache();
  }

  get user() {
    return this.request.user || {};
  }

  get userId() {
    return this.user.sub || 'google|000000000000';
  }

  get body() {
    return this.request.body;
  }

  param(name) {
    return this.request.params[name];
  }

  json(data) {
    return this.response.status(200).json(data);
  }

  error(e, code = 500) {
    logger.error(e);
    return this.response.status(code).json({
      error: e
    });
  }
}
