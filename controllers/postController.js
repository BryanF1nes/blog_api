import prisma from "../utils/prisma.js";
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

  createPost = async (req, res) => {
    jwt.verify(req.token, `${process.env.SECRET}`, async (error, authData) => {
      if (error) {
        return res.status(403)
      }

      if (authData.user.isAdmin) {
        await prisma.post.create({
          data: {
            title: req.body.title,
            body: req.body.body,
            authorId: authData.user.id
          }
        });
        return res.status(200).json({ "message": "Post successfully created", authData });
      }

      return res.status(403).json({ "message": "You are not authorized to post a blog.", authData })
    });
  }

  createComment = async (req, res) => {
    jwt.verify(req.token, `${process.env.SECRET}`, async (error, authData) => {
      if (error) {
        return res.status(403);
      }
      const { postId } = req.params;

      await prisma.comment.create({
        data: {
          body: req.body.body,
          postId: Number(postId),
          authorId: authData.user.id
        }
      });
      return res.json({ "message": "Comment successfully created", authData });
    })
  }

  publishPost = async (req, res) => {
    jwt.verify(req.token, `${process.env.SECRET}`, async (error, authData) => {
      if (error) {
        return res.status(403);
      };
      const { postId } = req.params;
      const post = await prisma.post.findFirstOrThrow({
        where: {
          id: Number(postId)
        }
      });
      if (post.published === false) {
        await prisma.post.update({
          where: { id: Number(postId) },
          data: { published: true }
        })
      };

      return res.status(200).json({ message: `Post ${post.title} has been published.`, authData });
    })
  }
}

const postController = new PostController();

export default postController;
