const ENV = require('./ormconfig')

delete ENV.ssl
delete ENV.extra
ENV.logging = true
  
export = ENV