/*
  Warnings:

  - You are about to drop the column `content` on the `Blog` table. All the data in the column will be lost.
  - Added the required column `richContent` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `textContent` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "content",
ADD COLUMN     "richContent" TEXT NOT NULL,
ADD COLUMN     "textContent" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "expiresAt" SET DEFAULT CURRENT_TIMESTAMP + INTERVAL '7 days';
