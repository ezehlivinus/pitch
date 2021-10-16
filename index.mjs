/* eslint-disable import/extensions */
import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import log from './config/logger.mjs';
import start from './start/kernel.mjs';

dotenv.config();

const app = express();
start(app);

const { PORT } = process.env;

app.listen(PORT, () => {
  log.info(`Listening on port ${PORT}`);
});
