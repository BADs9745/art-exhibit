/*
  Warnings:

  - You are about to drop the column `profil_SenimanId` on the `Pengguna` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pengguna" DROP CONSTRAINT "Pengguna_profil_SenimanId_fkey";

-- AlterTable
ALTER TABLE "Pengguna" DROP COLUMN "profil_SenimanId";

-- AlterTable
ALTER TABLE "ProfilSeniman" ADD COLUMN     "penggunaId" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "ProfilSeniman" ADD CONSTRAINT "ProfilSeniman_penggunaId_fkey" FOREIGN KEY ("penggunaId") REFERENCES "Pengguna"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
