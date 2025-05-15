import 'dotenv/config';
import express from 'express';
import router from './routes/indexRouter.js';

const app = express();

app.use('/', router);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port: ${process.env.PORT}`);
});
