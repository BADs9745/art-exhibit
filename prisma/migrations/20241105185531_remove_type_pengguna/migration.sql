/*
  Warnings:

  - You are about to drop the column `type` on the `Pengguna` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pengguna" DROP COLUMN "type";

-- DropEnum
DROP TYPE "TypePengguna";
