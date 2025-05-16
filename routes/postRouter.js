import { Router } from 'express';
import postController from '../controllers/postController.js';
const postRouter = Router();

postRouter.get('/', postController.getPosts);

export default postRouter;
