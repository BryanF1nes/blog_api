import prisma from "../utils/prisma.js";

class PostController {
  getPosts = async (req, res) => {
    try {
      const posts = await prisma.post.findMany();
      return res.json({ "posts": posts });
    } catch (error) {
      console.error(error);
      res.status(400)
    }
  }
}

const postController = new PostController();

export default postController;
