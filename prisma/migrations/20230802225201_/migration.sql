/*
  Warnings:

  - You are about to drop the column `id_articulo` on the `articulos_x_titular` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "articulos_x_titular" DROP CONSTRAINT "articulos_x_titular_id_articulo_fkey";

-- AlterTable
ALTER TABLE "articulos_x_titular" DROP COLUMN "id_articulo";

-- AddForeignKey
ALTER TABLE "articulos_x_titular" ADD CONSTRAINT "articulos_x_titular_cod_articulo_fkey" FOREIGN KEY ("cod_articulo") REFERENCES "articulos"("cod_articulo") ON DELETE RESTRICT ON UPDATE CASCADE;
