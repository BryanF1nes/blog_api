import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient()

async function main() {
  const users = await prisma.user.findMany();

  const updatedUser = await prisma.user.update({
    where: {
      id: 1
    },
    data: { isAdmin: true }
  })

  console.log(users);

  console.log(updatedUser)
}

main().then(async () => {
  await prisma.$disconnect()
}).catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
