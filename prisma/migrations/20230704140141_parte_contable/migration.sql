/*
  Warnings:

  - Added the required column `cod_docum` to the `cpt_fact_prov` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tc` to the `cpt_fact_prov` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cpt_fact_prov" ADD COLUMN     "cod_docum" TEXT NOT NULL,
ADD COLUMN     "tc" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "cpt_facturas" (
    "id" SERIAL NOT NULL,
    "nro_trans" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "importe_mo" DECIMAL(65,30),
    "importe_mn" DECIMAL(65,30),
    "importe_tr" DECIMAL(65,30),
    "fecha" TIMESTAMP(3),
    "nro_trans_ref" INTEGER NOT NULL,
    "serie_fact_prov" TEXT NOT NULL,
    "cod_docum" TEXT NOT NULL,
    "nro_fact_prov" INTEGER NOT NULL,
    "id_moneda" INTEGER NOT NULL,
    "id_titular" INTEGER NOT NULL,
    "id_empresa" INTEGER NOT NULL DEFAULT 1,
    "tc" INTEGER NOT NULL,

    CONSTRAINT "cpt_facturas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cpf_contaux" (
    "id" SERIAL NOT NULL,
    "nro_trans" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "importe_mo" DECIMAL(65,30),
    "importe_mn" DECIMAL(65,30),
    "importe_tr" DECIMAL(65,30),
    "fecha" TIMESTAMP(3),
    "nro_trans_ref" INTEGER NOT NULL,
    "signo" INTEGER NOT NULL,
    "serie_fact" TEXT NOT NULL,
    "cod_docum" TEXT NOT NULL,
    "nro_fact" INTEGER NOT NULL,
    "id_moneda" INTEGER NOT NULL,
    "id_titular" INTEGER NOT NULL,
    "id_empresa" INTEGER NOT NULL DEFAULT 1,
    "tc" INTEGER NOT NULL,

    CONSTRAINT "cpf_contaux_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cpt_facturas" ADD CONSTRAINT "cpt_facturas_id_moneda_fkey" FOREIGN KEY ("id_moneda") REFERENCES "monedas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_facturas" ADD CONSTRAINT "cpt_facturas_id_titular_fkey" FOREIGN KEY ("id_titular") REFERENCES "titulares"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpf_contaux" ADD CONSTRAINT "cpf_contaux_id_moneda_fkey" FOREIGN KEY ("id_moneda") REFERENCES "monedas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpf_contaux" ADD CONSTRAINT "cpf_contaux_id_titular_fkey" FOREIGN KEY ("id_titular") REFERENCES "titulares"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
