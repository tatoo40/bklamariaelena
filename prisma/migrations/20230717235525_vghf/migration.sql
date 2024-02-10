/*
  Warnings:

  - You are about to drop the column `nro_lote` on the `cpt_fact_prov` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cpp_fact_prov" ALTER COLUMN "tc" DROP NOT NULL,
ALTER COLUMN "tc" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "cpt_fact_prov" DROP COLUMN "nro_lote",
ADD COLUMN     "afecta_costo" TEXT,
ALTER COLUMN "tc" DROP NOT NULL,
ALTER COLUMN "tc" SET DATA TYPE DECIMAL(65,30);
