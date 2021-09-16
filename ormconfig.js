module.exports = {
  name: 'default',
  type: 'postgres',
  host: 'ec2-52-0-93-3.compute-1.amazonaws.com',
  port: 5432,
  username: 'xultitrqyhqgxu',
  password: 'afbec3219ca025845228d5b4829c718b72e84cce96024d303bf3908c42d14fca',
  database: 'dcajdpm3k347rk',
  synchronize: true,
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

