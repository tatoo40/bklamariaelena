/*
  Warnings:

  - You are about to drop the column `borrado_logico` on the `secciones` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "secciones" DROP COLUMN "borrado_logico",
ADD COLUMN     "borrado_fisico" BOOLEAN;
