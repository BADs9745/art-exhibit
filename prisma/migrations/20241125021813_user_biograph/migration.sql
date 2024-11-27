-- AlterTable
ALTER TABLE "Pengguna" ADD COLUMN     "biograph" TEXT;

-- AlterTable
ALTER TABLE "ProfilSeniman" ALTER COLUMN "biografi" DROP NOT NULL;
