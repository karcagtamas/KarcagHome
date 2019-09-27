import express, { Application } from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import db from './database/connect';

import macs from './routes/macAddresses';
import users from './routes/users';

const app: Application = express();

app.use(bodyparser());

app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  next();
});

//app.use(cors());

app.use('/api/macs', macs);
app.use('/api/users', users);

const PORT: number = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
