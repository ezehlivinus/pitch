/* eslint-disable import/extensions */
import express from 'express';

import TeamController from '../controllers/team.controller.js';
import Auth from '../middlewares/authentication.middlewares.js';

const router = express.Router();

router.route('/')
  .get(TeamController.list)
  .post(Auth.authenticate, TeamController.create);

router.route('/:id').all()
  .get(TeamController.detail)
  .put([Auth.authenticate], TeamController.update)
  .delete([Auth.authenticate], TeamController.delete);


export default router;
