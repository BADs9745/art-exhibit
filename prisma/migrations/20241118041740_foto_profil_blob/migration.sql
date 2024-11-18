/*
  Warnings:

  - The `foto_profil` column on the `Pengguna` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Pengguna" DROP COLUMN "foto_profil",
ADD COLUMN     "foto_profil" BYTEA;
