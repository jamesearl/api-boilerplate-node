import _ from 'lodash';
import {
  default as logger,
} from '../../../logger';

const workers = [];

logger.info(`Starting ${workers.length} workers...`);

_.forEach(workers, (w) => {
  w.run();
  logger.info(`Started ${w.name} worker.`);
});
