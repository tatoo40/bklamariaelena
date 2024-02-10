/*
  Warnings:

  - Added the required column `id_sexo` to the `cpt_recaravaneo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cpt_recaravaneo" ADD COLUMN     "id_sexo" INTEGER NOT NULL;
