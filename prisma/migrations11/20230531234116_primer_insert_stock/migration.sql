/*
  Warnings:

  - You are about to drop the column `id_articulo` on the `cpp_movimiento_stock` table. All the data in the column will be lost.
  - You are about to drop the column `cantidad` on the `cpt_movimiento_stock` table. All the data in the column will be lost.
  - You are about to drop the column `cantidad2` on the `cpt_movimiento_stock` table. All the data in the column will be lost.
  - You are about to drop the column `cantidad_toma` on the `cpt_movimiento_stock` table. All the data in the column will be lost.
  - You are about to drop the column `id_articulo` on the `cpt_movimiento_stock` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cod_articulo]` on the table `articulos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cod_articulo` to the `articulos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cantidad3` to the `cpf_stockaux` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cantidad3` to the `cpp_movimiento_stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cod_articulo` to the `cpp_movimiento_stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cantidad_ganado` to the `cpt_movimiento_stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cod_articulo` to the `cpt_movimiento_stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_propiedad_ganado` to the `cpt_movimiento_stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `peso_total_facturado` to the `cpt_movimiento_stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `peso_total_real` to the `cpt_movimiento_stock` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cpp_movimiento_stock" DROP CONSTRAINT "cpp_movimiento_stock_id_articulo_fkey";

-- DropForeignKey
ALTER TABLE "cpt_movimiento_stock" DROP CONSTRAINT "cpt_movimiento_stock_id_articulo_fkey";

-- AlterTable
ALTER TABLE "articulos" ADD COLUMN     "cod_articulo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "cpf_stockaux" ADD COLUMN     "cantidad3" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "cpp_movimiento_stock" DROP COLUMN "id_articulo",
ADD COLUMN     "cantidad3" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "cod_articulo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "cpt_movimiento_stock" DROP COLUMN "cantidad",
DROP COLUMN "cantidad2",
DROP COLUMN "cantidad_toma",
DROP COLUMN "id_articulo",
ADD COLUMN     "cantidad_ganado" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "cod_articulo" TEXT NOT NULL,
ADD COLUMN     "id_propiedad_ganado" INTEGER NOT NULL,
ADD COLUMN     "peso_total_facturado" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "peso_total_real" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "usuarios" ALTER COLUMN "hashRt" DROP NOT NULL;

-- CreateTable
CREATE TABLE "propiedad_ganado" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "propiedad_ganado_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "articulos_cod_articulo_key" ON "articulos"("cod_articulo");

-- AddForeignKey
ALTER TABLE "cpt_movimiento_stock" ADD CONSTRAINT "cpt_movimiento_stock_id_propiedad_ganado_fkey" FOREIGN KEY ("id_propiedad_ganado") REFERENCES "propiedad_ganado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_movimiento_stock" ADD CONSTRAINT "cpt_movimiento_stock_cod_articulo_fkey" FOREIGN KEY ("cod_articulo") REFERENCES "articulos"("cod_articulo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpp_movimiento_stock" ADD CONSTRAINT "cpp_movimiento_stock_cod_articulo_fkey" FOREIGN KEY ("cod_articulo") REFERENCES "articulos"("cod_articulo") ON DELETE RESTRICT ON UPDATE CASCADE;
