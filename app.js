import 'dotenv/config';
import express from 'express';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import { Strtegy as LocalStrategy } from 'passport-local';
import postRouter from './routes/postRouter.js';
import accountRouter from './routes/accountRouter.js';
import prisma from './utils/prisma.js';

const app = express();

passport.use(passport.session());

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findFirstOrThrow({
        where: {
          username: username
        }
      })

      if (!user) return done(null, false, { message: "Incorrect username" });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return done(null, false, { message: "Incorrect password" });

      return done(null, user)
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
        id: id
      }
    })

    done(null, user);
  } catch (error) {
    done(error);
  }
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('api/v1/account/', accountRouter);
app.use('/api/v1/posts', postRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port: ${process.env.PORT}`);
});
