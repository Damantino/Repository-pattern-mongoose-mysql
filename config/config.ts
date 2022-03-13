import * as dotenv from 'dotenv';

dotenv.config({
  path: `./config/${process.env.APP_ENV}.env`,
});

export const DATA_SOURCES = {
  EXPRESS: {
    PORT: process.env.PORT,
  },
  mySqlDataSource: {
    DB_HOST: process.env.MY_SQL_DB_HOST,
    DB_USER: process.env.MY_SQL_DB_USER,
    DB_PASSWORD: process.env.MY_SQL_DB_PASSWORD,
    DB_PORT: process.env.MY_SQL_DB_PORT,
    DB_DATABASE: process.env.MY_SQL_DB_DATABASE,
  },
};
