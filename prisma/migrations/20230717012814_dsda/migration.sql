-- DropForeignKey
ALTER TABLE "cpf_costos" DROP CONSTRAINT "cpf_costos_cod_articulo_fkey";

-- DropForeignKey
ALTER TABLE "cpf_costos" DROP CONSTRAINT "cpf_costos_id_empresa_fkey";

-- DropForeignKey
ALTER TABLE "cpf_costos" DROP CONSTRAINT "cpf_costos_id_tipo_costo_fkey";

-- DropForeignKey
ALTER TABLE "cpf_costos" DROP CONSTRAINT "cpf_costos_id_unidad_stk_fkey";

-- AlterTable
ALTER TABLE "cpf_costos" ALTER COLUMN "nro_lote" DROP NOT NULL,
ALTER COLUMN "cod_articulo" DROP NOT NULL,
ALTER COLUMN "id_unidad_stk" DROP NOT NULL,
ALTER COLUMN "id_empresa" DROP NOT NULL,
ALTER COLUMN "id_tipo_costo" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "cpf_costos" ADD CONSTRAINT "cpf_costos_cod_articulo_fkey" FOREIGN KEY ("cod_articulo") REFERENCES "articulos"("cod_articulo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpf_costos" ADD CONSTRAINT "cpf_costos_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpf_costos" ADD CONSTRAINT "cpf_costos_id_tipo_costo_fkey" FOREIGN KEY ("id_tipo_costo") REFERENCES "tipos_costeo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpf_costos" ADD CONSTRAINT "cpf_costos_id_unidad_stk_fkey" FOREIGN KEY ("id_unidad_stk") REFERENCES "unidades_stock"("id") ON DELETE SET NULL ON UPDATE CASCADE;
