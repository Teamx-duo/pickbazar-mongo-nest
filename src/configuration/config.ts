export interface ConfigType {
  port: string;
  mongodb: {
    uri: string;
  };
  db: {
    user: string;
    pass: string;
    host: string | 'localhost';
    port: number;
    database: string;
    authSource?: string;
  };
  host?: {
    url?: string;
    port?: string;
  };
  jwt: {
    secretOrKey?: string;
    expiresIn?: number;
  };
  mail?: {
    host?: string;
    port?: string;
    secure?: boolean;
    user?: string;
    pass?: string;
    mailFromName?: string;
    mailFromAddress?: string;
    encryption?: string;
  };
  app?: {
    baseUrl?: string | 'http://localhost:5000/api';
    imageUrl?: string | 'http://localhost:5000/api/attachments/images';
    imageStoreFolder?: string | '/uploads/images';
    shopUrl?: string;
    adminUrl?: string;
  };
}

export default () => ({
  port: parseInt(process.env.PORT, 10) || 5000,
  mongodb: {
    uri: process.env.MONGO_URI,
  },
  db: {
    user: process.env.DATABASE_USER,
    pass: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST || 'usamairfan',
    port: parseInt(process.env.DATABASE_PORT, 10) || 27017,
    database: process.env.DATABASE_NAME || 'nest',
    authSource: null,
  },
  host: {
    url: '<server-url>',
    port: '3000',
  },
  jwt: {
    secretOrKey: process.env.JWT_SECRET,
    expiresIn: parseInt(process.env.JWT_EXPIRE_IN_SECONDS) || 36000000,
  },
  mail: {
    host: process.env.MAIL_HOST,
    port: process.env.SMTP_MAIL_PORT,
    secure: process.env.SECURE,
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    mailFromName: process.env.MAIL_FROM_NAME,
    mailFromAddress: process.env.MAIL_FROM_ADDRESS,
    encryption: process.env.MAIL_ENCRYPTION,
  },
  app: {
    baseUrl: process.env.BASE_URL || 'http://localhost:5000/api',
    imageUrl:
      process.env.BASE_IMAGE_URL ||
      'http://localhost:5000/api/attachments/images',
    imageStoreFolder: process.env.BASE_IMAGES_FOLDER || '/uploads/images',
    shopUrl: process.env.SHOP_URL,
    adminUrl: process.env.ADMIN_URL,
  },
});
