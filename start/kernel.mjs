/* eslint-disable import/extensions */

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import database from '../config/database.mjs';
import asyncErrors from '../middlewares/async.errors.middleware.mjs';

import routes from './routes.mjs';

const kernel = (app) => {
  database();
  app.use(morgan('dev'));
  app.use(cors());
  app.use(express.json());

  routes(app);

  app.use(asyncErrors);
};

export default kernel;
