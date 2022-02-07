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
  entities: ['**/*.entity.js'],
}

const env = process.env.environment

if(env === 'development' || env === 'test'){
  delete ENV.ssl
  delete ENV.extra
}

module.exports = ENV