/*
  Warnings:

  - You are about to drop the column `tagId` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the `BuildingPictures` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Building` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_tagId_fkey";

-- DropForeignKey
ALTER TABLE "BuildingPictures" DROP CONSTRAINT "BuildingPictures_buildingId_fkey";

-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "tagId";

-- AlterTable
ALTER TABLE "Building" ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "expiresAt" SET DEFAULT CURRENT_TIMESTAMP + INTERVAL '7 days';

-- DropTable
DROP TABLE "BuildingPictures";

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuildingTag" (
    "id" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "buildingId" TEXT,

    CONSTRAINT "BuildingTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogTag" (
    "id" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,

    CONSTRAINT "BlogTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuildingPicture" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "buildingId" TEXT NOT NULL,

    CONSTRAINT "BuildingPicture_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BlogTag_tag_key" ON "BlogTag"("tag");

-- AddForeignKey
ALTER TABLE "Building" ADD CONSTRAINT "Building_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuildingTag" ADD CONSTRAINT "BuildingTag_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogTag" ADD CONSTRAINT "BlogTag_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuildingPicture" ADD CONSTRAINT "BuildingPicture_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
