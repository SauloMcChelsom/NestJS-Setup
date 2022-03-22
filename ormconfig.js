let ENV = {
  name: 'default',
  type: process.env.TYPEORM_TYPE,
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database:  process.env.TYPEORM_DATABASE,
  synchronize: process.env.TYPEORM_SYNCHRONIZE,
  dropSchema: false,
  logging: false,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false
    }
  },
  entities: ['./dist/src/entity/*.entity.js'],
}

const env = process.env.environment

if(env === 'development'){
  delete ENV.ssl
  delete ENV.extra
  ENV.logging = true
}

if(env === 'tests'){
  delete ENV.ssl
  delete ENV.extra
  ENV.logging = false
}

module.exports = ENV