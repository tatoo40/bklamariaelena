/*
  Warnings:

  - Added the required column `hashRt` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "hashRt" TEXT NOT NULL,
ADD COLUMN     "isRegisteredWithGoogle" BOOLEAN NOT NULL DEFAULT false;
