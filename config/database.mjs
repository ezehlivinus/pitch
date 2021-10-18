/* eslint-disable no-console */
/* eslint-disable import/extensions */
import mongoose from 'mongoose';

import log from './logger.mjs';

function connect() {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      log.info('database connected');
    })
    .catch((error) => {
      console.log(error);
      log.error('database error', error);

      log.info('Trying to reconnect database...');
      connect();
      // process.exit(1);
    });
}

export default connect;
