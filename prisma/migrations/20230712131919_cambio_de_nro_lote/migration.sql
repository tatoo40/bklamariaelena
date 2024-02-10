/*
  Warnings:

  - Made the column `nro_lote` on table `cpf_costos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "cpf_costos" ALTER COLUMN "nro_lote" SET NOT NULL,
ALTER COLUMN "nro_lote" DROP DEFAULT,
ALTER COLUMN "nro_lote" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "cpf_stockaux" ALTER COLUMN "nro_lote" DROP DEFAULT,
ALTER COLUMN "nro_lote" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "cpp_movimiento_stock" ALTER COLUMN "nro_lote" DROP NOT NULL,
ALTER COLUMN "nro_lote" DROP DEFAULT,
ALTER COLUMN "nro_lote" SET DATA TYPE TEXT;
