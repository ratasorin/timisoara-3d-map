/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `BuildingPicture` table. All the data in the column will be lost.
  - Added the required column `imageKey` to the `BuildingPicture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BuildingPicture" DROP COLUMN "imageUrl",
ADD COLUMN     "imageKey" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "expiresAt" SET DEFAULT CURRENT_TIMESTAMP + INTERVAL '7 days';
