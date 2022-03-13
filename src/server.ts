import { DATA_SOURCES } from '../config/config';
import { app } from './app';

app.listen(DATA_SOURCES.EXPRESS.PORT, () => {
  console.log(`Application running in port ${DATA_SOURCES.EXPRESS.PORT}`);
});
