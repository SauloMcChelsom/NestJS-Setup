
if(process.env.TYPEORM_HOST === '127.0.0.1'){
  module.exports = {
    name: 'default',
    type: process.env.TYPEORM_TYPE,
    host: process.env.TYPEORM_HOST,
    port: Number(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database:  process.env.TYPEORM_DATABASE,
    synchronize: process.env.TYPEORM_SYNCHRONIZE,
    dropSchema: false,
    logging: true,
    entities: [ 'dist/**/*.entity{.ts,.js}' ],
  };
}else{
  module.exports = {
    name: 'default',
    type: process.env.TYPEORM_TYPE,
    host: process.env.TYPEORM_HOST,
    port: Number(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database:  process.env.TYPEORM_DATABASE,
    synchronize: process.env.TYPEORM_SYNCHRONIZE,
    dropSchema: false,
    logging: true,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false
      }
    },
    entities: ['**/*.entity.js'],
  };
}