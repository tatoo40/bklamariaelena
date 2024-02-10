-- DropForeignKey
ALTER TABLE "cpt_identidad" DROP CONSTRAINT "cpt_identidad_id_categoria_ganado_fkey";

-- DropForeignKey
ALTER TABLE "cpt_identidad" DROP CONSTRAINT "cpt_identidad_id_empresa_fkey";

-- DropForeignKey
ALTER TABLE "cpt_identidad" DROP CONSTRAINT "cpt_identidad_id_marca_ganado_fkey";

-- AlterTable
ALTER TABLE "cpt_identidad" ALTER COLUMN "id_categoria_ganado" DROP NOT NULL,
ALTER COLUMN "id_marca_ganado" DROP NOT NULL,
ALTER COLUMN "id_empresa" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "cpt_identidad" ADD CONSTRAINT "cpt_identidad_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_identidad" ADD CONSTRAINT "cpt_identidad_id_categoria_ganado_fkey" FOREIGN KEY ("id_categoria_ganado") REFERENCES "categorias_ganado"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_identidad" ADD CONSTRAINT "cpt_identidad_id_marca_ganado_fkey" FOREIGN KEY ("id_marca_ganado") REFERENCES "marcas_ganado"("id") ON DELETE SET NULL ON UPDATE CASCADE;
