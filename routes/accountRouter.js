import { Router } from 'express';
import accountController from '../controllers/accountController.js';
const accountRouter = Router();

accountRouter.post('/login', accountController.login);
accountRouter.post('/signin', accountController.signin);

export default accountRouter;
