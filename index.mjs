import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';

dotenv.config();

const app = express();

const { PORT } = process.env;

app.listen(PORT, () => {
  console.info(`Listening on port ${PORT}`);
});
