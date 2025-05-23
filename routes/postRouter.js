import { Router } from 'express';
import postController from '../controllers/postController.js';
import verifyToken from '../utils/verifyToken.js';
const postRouter = Router();

postRouter.get('/', postController.getPosts);
postRouter.get('/:postId', postController.getPost);

postRouter.post('/', verifyToken, postController.createPost);
postRouter.post('/publish/:postId', verifyToken, postController.publishPost);
postRouter.post('/:postId/comment', verifyToken, postController.createComment);

export default postRouter;
