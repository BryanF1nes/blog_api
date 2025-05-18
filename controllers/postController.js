import prisma from "../utils/prisma.js";
import verifyToken from '../utils/verifyToken.js';
import jwt from 'jsonwebtoken';

class PostController {
  getPosts = async (req, res) => {
    try {
      const posts = await prisma.post.findMany();
      return res.json({ "posts": posts });
    } catch (error) {
      console.error(error);
      res.status(404).message('Unable to get posts.');
    }
  };

  getPost = async (req, res) => {
    try {
      const { postId } = req.params;
      const post = await prisma.post.findFirstOrThrow({
        where: {
          id: Number(postId),
        },
        include: {
          comments: true,
        }
      });

      return res.json({ "post": post })
    } catch (error) {
      console.error(error);
      return res.status(404).message('Unable to get post.');
    }
  }

  // TODO: Will require authorization using JWT and authentication using Passport
  createPost = async (req, res) => {
    jwt.verify(req.token, `${process.env.SECRET}`, async (error, authData) => {
      if (error) {
        return res.status(403);
      }
      await prisma.post.create({
        data: {
          title: req.body.title,
          body: req.body.body,
          authorId: authData.user.id
        }
      });
      return res.json({ "message": "Post successfully created", authData });
    });
  }

  publishPost = async (req, res) => {
    try {
      const { postId } = req.params;
      const post = await prisma.post.findFirstOrThrow({
        where: {
          id: Number(postId)
        }
      });
      if (post.published === false) {
        post.published = true;
      };

      return res.status(200).message(`Post ${post.title} has been published.`);
    } catch (error) {
      console.error(error);

      return res.status(404).message('Unable to publish your post.');
    }
  }
}

const postController = new PostController();

export default postController;
