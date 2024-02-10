/*
  Warnings:

  - A unique constraint covering the columns `[nro_trans]` on the table `cpf_stockaux` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_deposito` to the `cpf_stockaux` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_estado_stock` to the `cpf_stockaux` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cpf_stockaux" ADD COLUMN     "id_deposito" INTEGER NOT NULL,
ADD COLUMN     "id_estado_stock" INTEGER NOT NULL,
ALTER COLUMN "cantidad" DROP NOT NULL,
ALTER COLUMN "cantidad2" DROP NOT NULL,
ALTER COLUMN "cantidad3" DROP NOT NULL,
ALTER COLUMN "signo" DROP NOT NULL,
ALTER COLUMN "nro_lote" DROP NOT NULL,
ALTER COLUMN "cod_identidad" DROP NOT NULL,
ALTER COLUMN "fecha" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cpf_stockaux_nro_trans_key" ON "cpf_stockaux"("nro_trans");

-- AddForeignKey
ALTER TABLE "cpf_stockaux" ADD CONSTRAINT "cpf_stockaux_id_estado_stock_fkey" FOREIGN KEY ("id_estado_stock") REFERENCES "estados_stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpf_stockaux" ADD CONSTRAINT "cpf_stockaux_id_deposito_fkey" FOREIGN KEY ("id_deposito") REFERENCES "depositos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
