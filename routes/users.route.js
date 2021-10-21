/* eslint-disable import/extensions */
import express from 'express';

import UserController from '../controllers/user.controller.js';
import Auth from '../middlewares/authentication.middlewares.js';

const router = express.Router();

router.route('/')
  .get(UserController.list)
  .post(UserController.create);

router.route('/:id').all()
  .get(UserController.detail)
  .put([Auth.authenticate], UserController.update)
  .delete([Auth.authenticate], UserController.delete);

router.post('/login', UserController.login);

export default router;
