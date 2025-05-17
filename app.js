import 'dotenv/config';
import express from 'express';
import postRouter from './routes/postRouter.js';
import accountRouter from './routes/accountRouter.js';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('api/v1/account/', accountRouter);
app.use('/api/v1/posts', postRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port: ${process.env.PORT}`);
});
