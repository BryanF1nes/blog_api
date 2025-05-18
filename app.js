import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as jwtStrategy } from 'passport-jwt';
import bcrypt from 'bcryptjs';
import postRouter from './routes/postRouter.js';
import accountRouter from './routes/accountRouter.js';
import prisma from './utils/prisma.js';

const app = express();

passport.use(jwtStrategy);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('api/v1/account/', accountRouter);
app.use('/api/v1/posts', postRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port: ${process.env.PORT}`);
});
