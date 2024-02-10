-- DropForeignKey
ALTER TABLE "cpt_movimiento_stock" DROP CONSTRAINT "cpt_movimiento_stock_cod_articulo_fkey";

-- DropForeignKey
ALTER TABLE "cpt_movimiento_stock" DROP CONSTRAINT "cpt_movimiento_stock_id_motivo_stk_fkey";

-- DropForeignKey
ALTER TABLE "cpt_movimiento_stock" DROP CONSTRAINT "cpt_movimiento_stock_id_propiedad_ganado_fkey";

-- DropForeignKey
ALTER TABLE "cpt_movimiento_stock" DROP CONSTRAINT "cpt_movimiento_stock_id_tipo_toma_peso_fkey";

-- DropForeignKey
ALTER TABLE "cpt_movimiento_stock" DROP CONSTRAINT "cpt_movimiento_stock_valor_dicose_fkey";

-- AlterTable
ALTER TABLE "cpt_movimiento_stock" ALTER COLUMN "valor_dicose" DROP NOT NULL,
ALTER COLUMN "id_propiedad_ganado" DROP NOT NULL,
ALTER COLUMN "cod_articulo" DROP NOT NULL,
ALTER COLUMN "id_tipo_toma_peso" DROP NOT NULL,
ALTER COLUMN "id_motivo_stk" DROP NOT NULL,
ALTER COLUMN "id_empresa" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "cpt_movimiento_stock" ADD CONSTRAINT "cpt_movimiento_stock_cod_articulo_fkey" FOREIGN KEY ("cod_articulo") REFERENCES "articulos"("cod_articulo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_movimiento_stock" ADD CONSTRAINT "cpt_movimiento_stock_id_motivo_stk_fkey" FOREIGN KEY ("id_motivo_stk") REFERENCES "motivos_mov_stock"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_movimiento_stock" ADD CONSTRAINT "cpt_movimiento_stock_id_propiedad_ganado_fkey" FOREIGN KEY ("id_propiedad_ganado") REFERENCES "propiedad_ganado"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_movimiento_stock" ADD CONSTRAINT "cpt_movimiento_stock_id_tipo_toma_peso_fkey" FOREIGN KEY ("id_tipo_toma_peso") REFERENCES "tipos_toma_peso"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_movimiento_stock" ADD CONSTRAINT "cpt_movimiento_stock_valor_dicose_fkey" FOREIGN KEY ("valor_dicose") REFERENCES "dicoses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
