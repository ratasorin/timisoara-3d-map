/*
  Warnings:

  - You are about to drop the column `userPictureId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pictureId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_userPictureId_fkey";

-- DropIndex
DROP INDEX "User_userPictureId_key";

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "expiresAt" SET DEFAULT CURRENT_TIMESTAMP + INTERVAL '7 days';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userPictureId",
ADD COLUMN     "pictureId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_pictureId_key" ON "User"("pictureId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "UserPicture"("id") ON DELETE SET NULL ON UPDATE CASCADE;
