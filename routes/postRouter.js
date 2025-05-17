import { Router } from 'express';
import postController from '../controllers/postController.js';
const postRouter = Router();

postRouter.get('/', postController.getPosts);
postRouter.get('/:postId', postController.getPost);

postRouter.post('/', postController.createPost);
postRouter.post('/publish/:postId', postController.publishPost);

export default postRouter;
