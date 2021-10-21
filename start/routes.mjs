/* eslint-disable import/extensions */
import usersRoutes from '../routes/users.route.js';
import teamsRoutes from '../routes/teams.route.js';

export default (app) => {
  const baseRoute = '/api/v1';
  app.use(`${baseRoute}/users`, usersRoutes);
  app.use(`${baseRoute}/teams`, teamsRoutes);
};
