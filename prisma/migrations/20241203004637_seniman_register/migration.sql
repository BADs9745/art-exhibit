/*
  Warnings:

  - You are about to drop the column `deskripsi` on the `ProfilSeniman` table. All the data in the column will be lost.
  - You are about to drop the column `nama` on the `ProfilSeniman` table. All the data in the column will be lost.
  - Changed the type of `gambar_url` on the `KaryaSeni` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "KaryaSeni" ALTER COLUMN "harga" DROP NOT NULL,
DROP COLUMN "gambar_url",
ADD COLUMN     "gambar_url" BYTEA NOT NULL;

-- AlterTable
ALTER TABLE "ProfilSeniman" DROP COLUMN "deskripsi",
DROP COLUMN "nama";
