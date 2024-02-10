/*
  Warnings:

  - You are about to drop the column `importe_iva_mn` on the `cpt_fact_prov` table. All the data in the column will be lost.
  - You are about to drop the column `importe_iva_mo` on the `cpt_fact_prov` table. All the data in the column will be lost.
  - You are about to drop the column `importe_iva_tr` on the `cpt_fact_prov` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "articulos" DROP CONSTRAINT "articulos_id_unidad_stk_fkey";

-- DropForeignKey
ALTER TABLE "cpf_consumos" DROP CONSTRAINT "cpf_consumos_id_unidad_stk_fkey";

-- DropForeignKey
ALTER TABLE "cpf_costos" DROP CONSTRAINT "cpf_costos_id_unidad_stk_fkey";

-- DropForeignKey
ALTER TABLE "cpf_stockaux" DROP CONSTRAINT "cpf_stockaux_id_unidad_stk_fkey";

-- AlterTable
ALTER TABLE "articulos" ADD COLUMN     "id_tasa_iva_cmp" INTEGER,
ADD COLUMN     "id_tasa_iva_vta" INTEGER,
ADD COLUMN     "id_unidad_cmp" INTEGER,
ADD COLUMN     "id_unidad_vta" INTEGER;

-- AlterTable
ALTER TABLE "cpp_fact_prov" ADD COLUMN     "conv_uni_cmp_a_stk" DECIMAL(65,30),
ADD COLUMN     "id_tasa_iva_cmp" INTEGER;

-- AlterTable
ALTER TABLE "cpt_fact_prov" DROP COLUMN "importe_iva_mn",
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

-- CreateTable
CREATE TABLE "unidades" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "descripcion" TEXT NOT NULL,
    "descripcion_corta" TEXT NOT NULL,
    "factor_conv_a_stk" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "unidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasas_iva" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "descripcion" TEXT NOT NULL,
    "porcentaje" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "tasas_iva_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "articulos" ADD CONSTRAINT "articulos_id_unidad_stk_fkey" FOREIGN KEY ("id_unidad_stk") REFERENCES "unidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articulos" ADD CONSTRAINT "articulos_id_unidad_vta_fkey" FOREIGN KEY ("id_unidad_vta") REFERENCES "unidades"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articulos" ADD CONSTRAINT "articulos_id_unidad_cmp_fkey" FOREIGN KEY ("id_unidad_cmp") REFERENCES "unidades"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articulos" ADD CONSTRAINT "articulos_id_tasa_iva_cmp_fkey" FOREIGN KEY ("id_tasa_iva_cmp") REFERENCES "tasas_iva"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articulos" ADD CONSTRAINT "articulos_id_tasa_iva_vta_fkey" FOREIGN KEY ("id_tasa_iva_vta") REFERENCES "tasas_iva"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpf_consumos" ADD CONSTRAINT "cpf_consumos_id_unidad_stk_fkey" FOREIGN KEY ("id_unidad_stk") REFERENCES "unidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpf_stockaux" ADD CONSTRAINT "cpf_stockaux_id_unidad_stk_fkey" FOREIGN KEY ("id_unidad_stk") REFERENCES "unidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpf_costos" ADD CONSTRAINT "cpf_costos_id_unidad_stk_fkey" FOREIGN KEY ("id_unidad_stk") REFERENCES "unidades"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpp_fact_prov" ADD CONSTRAINT "cpp_fact_prov_id_tasa_iva_cmp_fkey" FOREIGN KEY ("id_tasa_iva_cmp") REFERENCES "tasas_iva"("id") ON DELETE SET NULL ON UPDATE CASCADE;
