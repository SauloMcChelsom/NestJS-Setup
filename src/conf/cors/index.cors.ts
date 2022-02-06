const cors = () => {
  const whitelist = [
    'https://website.com',
    'http://localhost:3000',
    'http://localhost:4200',
  ];
  return {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null, new Error('Not allowed by CORS'));
      }
    },
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Origin, Content-Type, Accept, Authorization, Observe',
    methods: 'GET, PUT, POST, DELETE, UPDATE, OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    exposedHeaders: '*',
    maxAge: 27,
  };
};

export { cors };
