const eventEmitter = () => {
  return {
    // set this to `true` to use wildcards
    wildcard: true,
    // the delimiter used to segment namespaces
    delimiter: '.',
    // set this to `true` if you want to emit the newListener event
    newListener: false,
    // set this to `true` if you want to emit the removeListener event
    removeListener: false,
    // the maximum amount of listeners that can be assigned to an event
    maxListeners: 10,
    // show event name in memory leak message when more than maximum amount of listeners is assigned
    verboseMemoryLeak: false,
    // disable throwing uncaughtException if an error event is emitted and it has no listeners
    ignoreErrors: false,
  };
};

const redis = () => {
  const REDIS_URL = {
    redis: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
      tls: {
        rejectUnauthorized: false,
      },
    },
  };

  const env = process.env.environment;

  if (env === 'development' || env === 'tests') {
    delete REDIS_URL.redis.tls;
    delete REDIS_URL.redis.password;
  }

  return REDIS_URL;
};

const cache = () => {
  return {
    ttl: 0.1, // seconds
    max: 15, // maximum number of items in cache
    isGlobal: true,
  };
};

const typeorm = () => {
  return {
    envFilePath: `.env.${process.env.NODE_ENV}`,
    isGlobal: false,
    expandVariables: true,
    ignoreEnvFile: false,
    cache: true,
  };
};

const multer = () => {
  return {
    dest: './CDN',
  };
};

const http = () => {
  return {
    timeout: 5000,
    maxRedirects: 5,
  };
};

import { TypeOrmModule } from '@nestjs/typeorm';
const connectionDataBaseForTest = () => [
  TypeOrmModule.forRoot({
    name: 'default',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'user-dev',
    password: '203327',
    database: 'educando',
    entities: ['./src/entity/*.entity.ts'],
    keepConnectionAlive:true
  }),
];

export { redis, eventEmitter, cache, typeorm, multer, http, connectionDataBaseForTest };
