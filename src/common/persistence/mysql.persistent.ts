import { createPool } from 'mysql2/promise';
import { DATA_SOURCES } from '../../../config/config';

const mysqlDbConnection = createPool({
  host: DATA_SOURCES.mySqlDataSource.DB_HOST,
  user: DATA_SOURCES.mySqlDataSource.DB_USER,
  password: DATA_SOURCES.mySqlDataSource.DB_PASSWORD,
  database: DATA_SOURCES.mySqlDataSource.DB_DATABASE,
  decimalNumbers: true,
  connectionLimit: 10,
});

// Attempt to catch disconnects
mysqlDbConnection.on('connection', function (connection) {
  console.log('DB Connection established');

  connection.on('error', function (err) {
    console.error(new Date(), 'MySQL error', err.code);
  });
  connection.on('close', function (err) {
    console.error(new Date(), 'MySQL close', err);
  });
});

export default mysqlDbConnection;
