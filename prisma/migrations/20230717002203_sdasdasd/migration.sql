/*
  Warnings:

  - You are about to drop the column `cod_articulo` on the `tipo_articulo` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "tipo_articulo_cod_articulo_key";

-- AlterTable
ALTER TABLE "cpf_contaux" ADD COLUMN     "importe_iva_mn" DECIMAL(65,30),
ADD COLUMN     "importe_iva_mo" DECIMAL(65,30),
ADD COLUMN     "importe_iva_tr" DECIMAL(65,30),
ADD COLUMN     "importe_total_mn" DECIMAL(65,30),
ADD COLUMN     "importe_total_mo" DECIMAL(65,30),
ADD COLUMN     "importe_total_tr" DECIMAL(65,30);

-- AlterTable
ALTER TABLE "tipo_articulo" DROP COLUMN "cod_articulo";

-- AlterTable
ALTER TABLE "titulares" ADD COLUMN     "id_empresa" INTEGER;

-- AddForeignKey
ALTER TABLE "titulares" ADD CONSTRAINT "titulares_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
