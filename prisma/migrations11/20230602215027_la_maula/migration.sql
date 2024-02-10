/*
  Warnings:

  - You are about to drop the column `id_articulo` on the `cpf_stockaux` table. All the data in the column will be lost.
  - Added the required column `cod_articulo` to the `cpf_stockaux` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cpf_stockaux" DROP CONSTRAINT "cpf_stockaux_id_articulo_fkey";

-- DropIndex
DROP INDEX "dicoses_id_key";

-- AlterTable
ALTER TABLE "cpf_stockaux" DROP COLUMN "id_articulo",
ADD COLUMN     "cod_articulo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "cpp_movimiento_stock" ALTER COLUMN "cantidad" DROP NOT NULL,
ALTER COLUMN "cantidad2" DROP NOT NULL,
ALTER COLUMN "fecha" DROP NOT NULL,
ALTER COLUMN "cod_identidad" DROP NOT NULL,
ALTER COLUMN "nro_trans" DROP NOT NULL,
ALTER COLUMN "cantidad3" DROP NOT NULL;

-- AlterTable
ALTER TABLE "cpt_movimiento_stock" ALTER COLUMN "fecha" DROP NOT NULL,
ALTER COLUMN "serie_guia" DROP NOT NULL,
ALTER COLUMN "nro_guia" DROP NOT NULL,
ALTER COLUMN "cantidad_ganado" DROP NOT NULL,
ALTER COLUMN "peso_total_facturado" DROP NOT NULL,
ALTER COLUMN "peso_total_real" DROP NOT NULL;

-- AlterTable
CREATE SEQUENCE "dicoses_id_seq";
ALTER TABLE "dicoses" ALTER COLUMN "id" SET DEFAULT nextval('dicoses_id_seq'),
ALTER COLUMN "descripcion" DROP NOT NULL,
ADD CONSTRAINT "dicoses_pkey" PRIMARY KEY ("id");
ALTER SEQUENCE "dicoses_id_seq" OWNED BY "dicoses"."id";

-- AddForeignKey
ALTER TABLE "cpf_stockaux" ADD CONSTRAINT "cpf_stockaux_cod_articulo_fkey" FOREIGN KEY ("cod_articulo") REFERENCES "articulos"("cod_articulo") ON DELETE RESTRICT ON UPDATE CASCADE;
