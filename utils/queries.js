import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient()

async function main() {
  const post = await prisma.post.findFirst({
    where: {
      id: Number(2),
    },
    include: {
      comments: true
    }
  });

  console.log(post);
}

main().then(async () => {
  await prisma.$disconnect()
}).catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
