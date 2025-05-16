import 'dotenv/config';
import express from 'express';
import postRouter from './routes/postRouter.js';

const app = express();

app.use('/api/v1/posts', postRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port: ${process.env.PORT}`);
});
