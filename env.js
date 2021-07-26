require('dotenv').config();

function getEnv(varibale) {
  const value = process.env[varibale];
  if (typeof value === 'undefined') {
    console.warn(`Seems like the variable "${varibale}" is not set in the environment. 
    Did you forget to execute "cp .env.sample .env" and adjust variables in the .env file to match your own environment ?`);
  }
  return value;
}

const inProdEnv = getEnv('NODE_ENV') === 'production';
const inDevEnv = getEnv('NODE_ENV') === 'dev';
const inTestEnv = getEnv('NODE_ENV') === 'test';

const PORT = getEnv(`PORT${inTestEnv ? '_TEST' : ''}`);
const DATABASE_URL = getEnv(`DATABASE_URL`);
const BACK_API_URL = getEnv(`BACK_API_URL`);
const CORS_ALLOWED_ORIGINS = getEnv(`CORS_ALLOWED_ORIGINS`);

const dbUrlregex =
  /* eslint-disable-next-line */
  /^(?:([^:\/?#\s]+):\/{2})?(?:([^@\/?#\s]+)@)?([^\/?#\s]+)?(?:\/([^?#\s]*))?(?:[?]([^#\s]+))?\S*$/;

const DB_USER = DATABASE_URL.match(dbUrlregex)[2].split(':')[0];
const DB_PASSWORD = DATABASE_URL.match(dbUrlregex)[2].split(':')[1];
const DB_HOST = DATABASE_URL.match(dbUrlregex)[3].split(':')[0];
const DB_PORT = DATABASE_URL.match(dbUrlregex)[3].split(':')[1];
const DB_NAME = DATABASE_URL.match(dbUrlregex)[4].split('/')[0];

const SESSION_COOKIE_DOMAIN = getEnv(`SESSION_COOKIE_DOMAIN`);
const SESSION_COOKIE_NAME = getEnv(`SESSION_COOKIE_NAME`);
const SESSION_COOKIE_SECRET = getEnv(`SESSION_COOKIE_SECRET`);

const EMAIL_SENDER = getEnv('EMAIL_SENDER');

module.exports = {
  getEnv,
  inTestEnv,
  inProdEnv,
  inDevEnv,
  PORT,
  DATABASE_URL,
  BACK_API_URL,
  CORS_ALLOWED_ORIGINS,
  dbUrlregex,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  SESSION_COOKIE_DOMAIN,
  SESSION_COOKIE_NAME,
  SESSION_COOKIE_SECRET,
  EMAIL_SENDER,
};
