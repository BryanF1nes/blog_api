import passport from 'passport';
import bcrypt from 'bcryptjs';
import prisma from '../utils/prisma.js';
import jwt from 'jsonwebtoken';

class AccountController {
  login = async (req, res, done) => {
    try {
      const user = await prisma.user.findFirstOrThrow({
        where: {
          username: req.body.username
        }
      });
      if (!user) return done(null, false, { message: "Incorrect username" });

      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) return done(null, false, { message: "Incorrect password" });

      jwt.sign({ user: user }, `${process.env.SECRET}`, { expiresIn: '2 days' }, (error, token) => {
        res.json({
          token: token
        })
      })
    } catch (error) {
      console.error(error);
      return res.status(404).json({ message: 'Unable to login. Incorrect password or username.' });
    }
  }

  logout = async (req, res) => {
    req.logoout((error) => {
      if (error) return next(error);
      res.status(200).redirect("/login");
    });
  }

  signup = async (req, res, next) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      await prisma.user.create({
        data: {
          username: req.body.username,
          password: hashedPassword,
        }
      });

      return res.status(200).res.json({ message: "Account created." })
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
};

const accountController = new AccountController();

export default accountController;
