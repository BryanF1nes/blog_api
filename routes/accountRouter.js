import { Router } from 'express';
import accountController from '../controllers/accountController.js';
const accountRouter = Router();

accountRouter.post('/login', accountController.login);
accountRouter.post('/logout', accountController.logout);
accountRouter.post('/signup', accountController.signup);

export default accountRouter;
