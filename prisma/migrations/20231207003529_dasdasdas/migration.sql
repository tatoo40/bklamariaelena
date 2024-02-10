-- DropForeignKey
ALTER TABLE "cpt_altaganado" DROP CONSTRAINT "cpt_altaganado_cod_articulo_fkey";

-- DropForeignKey
ALTER TABLE "cpt_altaganado" DROP CONSTRAINT "cpt_altaganado_id_categoria_ganado_fkey";

-- DropForeignKey
ALTER TABLE "cpt_altaganado" DROP CONSTRAINT "cpt_altaganado_id_empresa_fkey";

-- DropForeignKey
ALTER TABLE "cpt_altaganado" DROP CONSTRAINT "cpt_altaganado_id_marca_ganado_fkey";

-- AlterTable
ALTER TABLE "cpt_altaganado" ALTER COLUMN "id_empresa" DROP NOT NULL,
ALTER COLUMN "id_categoria_ganado" DROP NOT NULL,
ALTER COLUMN "id_marca_ganado" DROP NOT NULL,
ALTER COLUMN "cod_articulo" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "cpt_altaganado" ADD CONSTRAINT "cpt_altaganado_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_altaganado" ADD CONSTRAINT "cpt_altaganado_cod_articulo_fkey" FOREIGN KEY ("cod_articulo") REFERENCES "articulos"("cod_articulo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_altaganado" ADD CONSTRAINT "cpt_altaganado_id_categoria_ganado_fkey" FOREIGN KEY ("id_categoria_ganado") REFERENCES "categorias_ganado"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_altaganado" ADD CONSTRAINT "cpt_altaganado_id_marca_ganado_fkey" FOREIGN KEY ("id_marca_ganado") REFERENCES "marcas_ganado"("id") ON DELETE SET NULL ON UPDATE CASCADE;
