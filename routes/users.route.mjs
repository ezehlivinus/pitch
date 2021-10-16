/* eslint-disable import/extensions */
import express from 'express';

import UserController from '../controllers/user.controller.mjs';

const router = express.Router();

router.use('/users', router);

router.route('/')
  .get(UserController.list)
  .post(UserController.create);

router.route('/:id').all()
  .get(UserController.detail)
  .put(UserController.update)
  .delete(UserController.delete);

export default router;
