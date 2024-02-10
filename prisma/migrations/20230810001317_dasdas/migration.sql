/*
  Warnings:

  - You are about to drop the column `importe_iva_mn` on the `cpp_fact_prov` table. All the data in the column will be lost.
  - You are about to drop the column `importe_iva_mo` on the `cpp_fact_prov` table. All the data in the column will be lost.
  - You are about to drop the column `importe_iva_tr` on the `cpp_fact_prov` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cpp_fact_prov" DROP COLUMN "importe_iva_mn",
DROP COLUMN "importe_iva_mo",
DROP COLUMN "importe_iva_tr",
ADD COLUMN     "importe_iva_basico_mn" DECIMAL(65,30),
ADD COLUMN     "importe_iva_basico_mo" DECIMAL(65,30),
ADD COLUMN     "importe_iva_basico_tr" DECIMAL(65,30),
ADD COLUMN     "importe_iva_excento_mn" DECIMAL(65,30),
ADD COLUMN     "importe_iva_excento_mo" DECIMAL(65,30),
ADD COLUMN     "importe_iva_excento_tr" DECIMAL(65,30),
ADD COLUMN     "importe_iva_minimo_mn" DECIMAL(65,30),
ADD COLUMN     "importe_iva_minimo_mo" DECIMAL(65,30),
ADD COLUMN     "importe_iva_minimo_tr" DECIMAL(65,30);
