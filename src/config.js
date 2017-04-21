import _ from 'lodash';
import URL from 'url';

const nodeEnv = process.env.NODE_ENV || 'development';

const databaseUrl = URL.parse(process.env.DATABASE_URL, true);
const databaseCreds = databaseUrl.auth.split(':', 2);

const redisUrl = URL.parse(process.env.REDIS_URL, true);
const redisCreds = redisUrl.auth.split(':', 2);

const env = {
  // NODE_ENV: JSON.stringify(nodeEnv),
  PGHOST: process.env.PGHOST || databaseUrl.hostname,
  PGPORT: process.env.PGPORT || databaseUrl.port,
  PGDATABASE: process.env.PGDATABASE || databaseUrl.pathname.substr(1),
  PGUSER: process.env.PGUSER || databaseCreds[0],
  PGPASSWORD: process.env.PGPASSWORD || databaseCreds[1],
  PGSSLMODE: process.env.PGSSLMODE || databaseUrl.query['sslmode'],
};

_.merge(process.env, env);

const base = {
  env,
  port: process.env.PORT || 8080,
  dynamo: {
    region: 'us-east-1',
  },
  aws: {
    s3: {
      region: process.env.AWS_REGION || 'us-east-1',
      bucket: 'FIXME',
    },
  },
  auth0: {
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackUrl: process.env.AUTH0_CALLBACK_URL || '/auth0/callback',
    audience: process.env.AUTH0_AUDIENCE,
  },
  postgres: {
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    ssl: process.env.PGSSLMODE !== 'disable',
  },
  redis: {
    connectionString: process.env.REDIS_URL,
    host: redisUrl.hostname,
    port: redisUrl.port,
  },
};

const pro = _.merge({}, base, {});

const build = _.merge({}, pro, {});

const sta = _.merge({}, pro, {});

const local = _.merge({}, base, {
});

const dev = _.merge({}, local, {});

const configs = {
  'production': pro,
  'local': local,
  'development': dev,
  'staging': sta,
};

export default configs[nodeEnv];
