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

router.route('/:teamId/players')
  .post(Auth.authenticate, TeamController.addNewPlayer)
  
router.route('/:teamId/players/:id')
  .put(Auth.authenticate, TeamController.removePlayer)
  // .put(Auth.authenticate, TeamController.leaveTeam)


export default router;
