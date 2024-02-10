/*
  Warnings:

  - Added the required column `cod_articulo` to the `cpt_altaganado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cpt_altaganado" ADD COLUMN     "cod_articulo" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "cpt_altaganado" ADD CONSTRAINT "cpt_altaganado_cod_articulo_fkey" FOREIGN KEY ("cod_articulo") REFERENCES "articulos"("cod_articulo") ON DELETE RESTRICT ON UPDATE CASCADE;
