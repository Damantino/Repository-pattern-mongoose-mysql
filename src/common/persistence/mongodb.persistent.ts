import { createConnection, ConnectOptions } from 'mongoose';
import { DATA_SOURCES } from '../../../config/config';

const mongolDbConnection = createConnection(
  DATA_SOURCES.mongodbDataSource.DB_CONN_URI as string,
  {
    useNewUrlParser: true,
  } as ConnectOptions
);

mongolDbConnection.on('connected', () => {
  console.log('DB Connection established');
});

mongolDbConnection.on('disconnected', () => {
  console.log('DB Connection closed');
});

export default mongolDbConnection;
