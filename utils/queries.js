import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.findFirst({
    where: {
      username: "Bryan"
    },
    include: {
      posts: true
    }
  });

  console.log(user);
}

main().then(async () => {
  await prisma.$disconnect()
}).catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
