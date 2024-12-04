/*
  Warnings:

  - A unique constraint covering the columns `[penggunaId]` on the table `ProfilSeniman` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProfilSeniman_penggunaId_key" ON "ProfilSeniman"("penggunaId");
