/*
  Warnings:

  - You are about to drop the column `abrevacion` on the `categorias_ganado` table. All the data in the column will be lost.
  - You are about to drop the column `abrevacion` on the `marcas_ganado` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "categorias_ganado" DROP COLUMN "abrevacion",
ADD COLUMN     "abreviacion" TEXT;

-- AlterTable
ALTER TABLE "marcas_ganado" DROP COLUMN "abrevacion",
ADD COLUMN     "abreviacion" TEXT;
