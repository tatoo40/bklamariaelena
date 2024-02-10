/*
  Warnings:

  - You are about to drop the column `cod_articulo` on the `cpt_altaganado` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "cpt_altaganado" DROP CONSTRAINT "cpt_altaganado_cod_articulo_fkey";

-- AlterTable
ALTER TABLE "cpt_altaganado" DROP COLUMN "cod_articulo";
