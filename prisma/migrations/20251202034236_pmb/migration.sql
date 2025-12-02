/*
  Warnings:

  - A unique constraint covering the columns `[verificationToken]` on the table `Mahasiswa` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Mahasiswa" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verificationToken" TEXT;

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mahasiswaId" INTEGER NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mahasiswa_verificationToken_key" ON "Mahasiswa"("verificationToken");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "Mahasiswa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
