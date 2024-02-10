-- DropForeignKey
ALTER TABLE "cpt_identidad" DROP CONSTRAINT "cpt_identidad_cod_articulo_fkey";

-- AlterTable
ALTER TABLE "cpt_identidad" ALTER COLUMN "cod_articulo" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "cpt_identidad" ADD CONSTRAINT "cpt_identidad_cod_articulo_fkey" FOREIGN KEY ("cod_articulo") REFERENCES "articulos"("cod_articulo") ON DELETE SET NULL ON UPDATE CASCADE;
