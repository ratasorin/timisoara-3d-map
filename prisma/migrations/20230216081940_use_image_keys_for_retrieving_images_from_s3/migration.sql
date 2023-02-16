/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `UserPicture` table. All the data in the column will be lost.
  - Added the required column `imageKey` to the `UserPicture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "expiresAt" SET DEFAULT CURRENT_TIMESTAMP + INTERVAL '7 days';

-- AlterTable
ALTER TABLE "UserPicture" DROP COLUMN "imageUrl",
ADD COLUMN     "imageKey" TEXT NOT NULL;
