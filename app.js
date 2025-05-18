import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import { PrismaClient } from './generated/prisma/client.js';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import expressSession from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import postRouter from './routes/postRouter.js';
import accountRouter from './routes/accountRouter.js';
import prisma from './utils/prisma.js';

const app = express();

app.use(expressSession({
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000 //ms
  },
  secret: `${process.env.SECRET}`,
  resave: true,
  saveUninitialized: true,
  store: new PrismaSessionStore(
    new PrismaClient(),
    {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }
  )
})
);
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findFirstOrThrow({
        where: {
          username: username,
        }
      });

      if (!user) return done(null, false, { message: "Incorrect username" });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return done(null, false, { message: "Incorrect password" });

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        id: id,
      }
    });

    done(null, user);
  } catch (error) {
    done(error);
  }
})

app.use('/api/v1/account', accountRouter);
app.use('/api/v1/posts', postRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port: ${process.env.PORT}`);
});
