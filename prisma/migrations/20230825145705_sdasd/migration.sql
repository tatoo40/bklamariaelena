/*
  Warnings:

  - Added the required column `id_empresa` to the `cpt_identidad` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cpt_identidad" ADD COLUMN     "id_empresa" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "cpt_identidad" ADD CONSTRAINT "cpt_identidad_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
