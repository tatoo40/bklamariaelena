-- AlterTable
ALTER TABLE "cpp_fact_prov" ADD COLUMN     "cantidad_stk" DECIMAL(65,30);

-- CreateTable
CREATE TABLE "cpt_pago_fact_prov" (
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
    "nro_fact_prov" INTEGER NOT NULL,
    "id_moneda" INTEGER NOT NULL,
    "id_titular" INTEGER NOT NULL,
    "id_empresa" INTEGER NOT NULL DEFAULT 1,
    "tc" DECIMAL(65,30),
    "cod_docum" TEXT NOT NULL,
    "id_estado_pago" INTEGER NOT NULL,

    CONSTRAINT "cpt_pago_fact_prov_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estado_pago" (
    "id" SERIAL NOT NULL,
    "nro_trans" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "estado_pago_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cpt_pago_fact_prov" ADD CONSTRAINT "cpt_pago_fact_prov_id_moneda_fkey" FOREIGN KEY ("id_moneda") REFERENCES "monedas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_pago_fact_prov" ADD CONSTRAINT "cpt_pago_fact_prov_id_titular_fkey" FOREIGN KEY ("id_titular") REFERENCES "titulares"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_pago_fact_prov" ADD CONSTRAINT "cpt_pago_fact_prov_id_estado_pago_fkey" FOREIGN KEY ("id_estado_pago") REFERENCES "estado_pago"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
