/* eslint-disable import/extensions */
import usersRoute from '../routes/users.route.mjs';

export default (app) => {
  const baseRoute = '/api/v1';
  app.use(baseRoute, usersRoute);
};
