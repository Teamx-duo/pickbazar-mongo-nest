export default {
  db: {
    user: null,
    pass: null,
    host: 'localhost',
    port: '27017',
    database: 'nest',
    authSource: null,
  },
  host: {
    url: '<server-url>',
    port: '3000',
  },
  jwt: {
    secretOrKey: 'myjwtsecretfornestproject',
    expiresIn: 36000000,
  },
  mail: {
    host: '<smtp-host>',
    port: '<port>',
    secure: false,
    user: '<username>',
    pass: '<password>',
  },
  app: {
    baseUrl: 'http://localhost:5000/api',
    imageUrl: 'http://localhost:5000/api/attachments/images',
  },
};
