/*
  Warnings:

  - You are about to drop the column `postId` on the `Favorite` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_postId_fkey";

-- DropIndex
DROP INDEX "Favorite_postId_key";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "postId" INTEGER;

-- AlterTable
ALTER TABLE "Favorite" DROP COLUMN "postId";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
