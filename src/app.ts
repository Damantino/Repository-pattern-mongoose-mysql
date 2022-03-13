import { loadControllers } from 'awilix-express';
import loadContainer from './container';
import express = require('express');

const app: express.Application = express();

//* JSON Support
app.use(express.json());

//* Container
loadContainer(app);

//* Controllers
app.use(loadControllers('controllers/*.ts', { cwd: __dirname }));

export { app };
