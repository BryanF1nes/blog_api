import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient()

async function main() {
  const posts = await prisma.post.findMany();
  const user = await prisma.user.findFirst({
    where: {
      username: "Bryan"
    },
    include: {
      posts: true
    }
  });

  console.log(posts);
}

main().then(async () => {
  await prisma.$disconnect()
}).catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
