/*
  Warnings:

  - You are about to drop the `Unidades_stock` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `nro_trans` on the `cpf_stockaux` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `nro_trans` on the `cpp_movimiento_stock` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `nro_trans` on the `cpt_movimiento_stock` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "articulos" DROP CONSTRAINT "articulos_id_unidad_stk_fkey";

-- DropForeignKey
ALTER TABLE "cpf_stockaux" DROP CONSTRAINT "cpf_stockaux_id_unidad_stk_fkey";

-- AlterTable
ALTER TABLE "cpf_stockaux" DROP COLUMN "nro_trans",
ADD COLUMN     "nro_trans" INTEGER NOT NULL,
ALTER COLUMN "cantidad" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "cpp_movimiento_stock" DROP COLUMN "nro_trans",
ADD COLUMN     "nro_trans" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "cpt_movimiento_stock" DROP COLUMN "nro_trans",
ADD COLUMN     "nro_trans" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Unidades_stock";

-- CreateTable
CREATE TABLE "bookmarks" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_mod" INTEGER NOT NULL DEFAULT 0,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "title" TEXT NOT NULL,
    "description" TEXT,
    "link" TEXT,

    CONSTRAINT "bookmarks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unidades_stock" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "descripcion" TEXT NOT NULL,
    "descripcion_corta" TEXT NOT NULL,

    CONSTRAINT "unidades_stock_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "articulos" ADD CONSTRAINT "articulos_id_unidad_stk_fkey" FOREIGN KEY ("id_unidad_stk") REFERENCES "unidades_stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpf_stockaux" ADD CONSTRAINT "cpf_stockaux_id_unidad_stk_fkey" FOREIGN KEY ("id_unidad_stk") REFERENCES "unidades_stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
