import prisma from "../utils/prisma.js";

class PostController {
  getPosts = async (req, res) => {
    try {
      const posts = await prisma.post.findMany();
      return res.json({ "posts": posts });
    } catch (error) {
      console.error(error);
      res.status(404);
    }
  }

  createPost = async (req, res) => {
    try {
      const post = await prisma.post.create({
        data: {
          title: req.body.title,
          body: req.body.body,
        }
      });

      return res.json({ "message": "Post successfully created" });
    } catch (error) {
      console.error(error);
      return res.status(404);
    }
  }
}

const postController = new PostController();

export default postController;
