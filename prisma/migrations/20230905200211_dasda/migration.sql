/*
  Warnings:

  - Added the required column `id_categoria_ganado` to the `cpt_recaravaneo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_marca_ganado` to the `cpt_recaravaneo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cpt_recaravaneo" ADD COLUMN     "id_categoria_ganado" INTEGER NOT NULL,
ADD COLUMN     "id_marca_ganado" INTEGER NOT NULL;
