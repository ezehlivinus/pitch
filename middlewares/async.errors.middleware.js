/* eslint-disable no-console */
// eslint-disable-next-line import/extensions
import log from '../config/logger.mjs';

export default (error, req, res, next) => {
  const data = {
    status: false,
    message: `Something failed:... ${error.message}`
  };

  console.log(error);
  log.error('From async error middleware', error);
  next(error);
  return res.status(500).send(data);
};
