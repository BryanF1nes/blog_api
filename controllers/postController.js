import prisma from "../utils/prisma.js";

class PostController {
  getPosts = async (req, res) => {
    try {
      const posts = await prisma.post.findMany();
      return res.json({ "posts": posts });
    } catch (error) {
      console.error(error);
      res.status(404).message('Unable to get posts.');
    }
  }

  // TODO: Will require authorization using JWT and authentication using Passport
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
      return res.status(404).message('Unable to create post.');
    }
  }

  authorPost = async (req, res) => {
    try {
      const { postId } = req.params;
      const post = await prisma.post.findFirstOrThrow({
        where: {
          id: postId
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
