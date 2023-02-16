/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Building` table. All the data in the column will be lost.
  - You are about to drop the column `buildingId` on the `BuildingTag` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[tag]` on the table `BuildingTag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `buildingTagId` to the `Building` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Building" DROP CONSTRAINT "Building_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "BuildingTag" DROP CONSTRAINT "BuildingTag_buildingId_fkey";

-- AlterTable
ALTER TABLE "Building" DROP COLUMN "categoryId",
ADD COLUMN     "buildingTagId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BuildingTag" DROP COLUMN "buildingId";

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "expiresAt" SET DEFAULT CURRENT_TIMESTAMP + INTERVAL '7 days';

-- DropTable
DROP TABLE "Category";

-- CreateIndex
CREATE UNIQUE INDEX "BuildingTag_tag_key" ON "BuildingTag"("tag");

-- AddForeignKey
ALTER TABLE "Building" ADD CONSTRAINT "Building_buildingTagId_fkey" FOREIGN KEY ("buildingTagId") REFERENCES "BuildingTag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
