/*
  Warnings:

  - You are about to drop the column `id_estado_ganado` on the `cpt_movimiento_stock` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "cpt_movimiento_stock" DROP CONSTRAINT "cpt_movimiento_stock_id_empresa_fkey";

-- DropForeignKey
ALTER TABLE "cpt_movimiento_stock" DROP CONSTRAINT "cpt_movimiento_stock_id_estado_ganado_fkey";

-- AlterTable
ALTER TABLE "cpt_movimiento_stock" DROP COLUMN "id_estado_ganado",
ALTER COLUMN "id_empresa" SET DEFAULT 1;
