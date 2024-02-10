-- CreateTable
CREATE TABLE "cpt_ingresoromaneo" (
    "id" SERIAL NOT NULL,
    "nro_trans" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "importe_mo" DECIMAL(65,30),
    "importe_mn" DECIMAL(65,30),
    "importe_tr" DECIMAL(65,30),
    "importe_total_mo" DECIMAL(65,30),
    "importe_total_mn" DECIMAL(65,30),
    "importe_total_tr" DECIMAL(65,30),
    "importe_iva_mo" DECIMAL(65,30),
    "importe_iva_mn" DECIMAL(65,30),
    "importe_iva_tr" DECIMAL(65,30),
    "cantidad_animales" DECIMAL(65,30),
    "cantidad_kilos_declarados" DECIMAL(65,30),
    "cantidad_kilos_cuarta_balanza" DECIMAL(65,30),
    "cantidad_kilos_Salida" DECIMAL(65,30),
    "porcentaje_rendimiento" DECIMAL(65,30),
    "fecha" TIMESTAMP(3),
    "nro_trans_ref" INTEGER NOT NULL,
    "serie_fact_prov" TEXT NOT NULL,
    "nro_fact_prov" INTEGER NOT NULL,
    "id_moneda" INTEGER NOT NULL,
    "id_titular" INTEGER NOT NULL,
    "id_empresa" INTEGER NOT NULL DEFAULT 1,
    "tc" DECIMAL(65,30),
    "cod_docum" TEXT NOT NULL,
    "afecta_costo" TEXT,

    CONSTRAINT "cpt_ingresoromaneo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cpp_ingresoromaneo" (
    "id" SERIAL NOT NULL,
    "nro_trans" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "cantidad" INTEGER NOT NULL,
    "precio_unitario" DECIMAL(65,30) NOT NULL,
    "importe_mo" DECIMAL(65,30),
    "importe_mn" DECIMAL(65,30),
    "importe_tr" DECIMAL(65,30),
    "importe_total_mo" DECIMAL(65,30),
    "importe_total_mn" DECIMAL(65,30),
    "importe_total_tr" DECIMAL(65,30),
    "importe_iva_mo" DECIMAL(65,30),
    "importe_iva_mn" DECIMAL(65,30),
    "importe_iva_tr" DECIMAL(65,30),
    "kilos_salida" DECIMAL(65,30),
    "kilos_calc_declarado" DECIMAL(65,30),
    "kilos_calc_cuarta_balanza" DECIMAL(65,30),
    "fecha" TIMESTAMP(3),
    "serie_fact_prov" TEXT NOT NULL,
    "nro_fact_prov" INTEGER NOT NULL,
    "id_moneda" INTEGER NOT NULL,
    "id_titular" INTEGER NOT NULL,
    "id_empresa" INTEGER NOT NULL DEFAULT 1,
    "tc" DECIMAL(65,30),
    "cod_docum" TEXT NOT NULL,
    "cod_articulo" TEXT NOT NULL,

    CONSTRAINT "cpp_ingresoromaneo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cpt_ingresoromaneo" ADD CONSTRAINT "cpt_ingresoromaneo_id_moneda_fkey" FOREIGN KEY ("id_moneda") REFERENCES "monedas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_ingresoromaneo" ADD CONSTRAINT "cpt_ingresoromaneo_id_titular_fkey" FOREIGN KEY ("id_titular") REFERENCES "titulares"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpp_ingresoromaneo" ADD CONSTRAINT "cpp_ingresoromaneo_cod_articulo_fkey" FOREIGN KEY ("cod_articulo") REFERENCES "articulos"("cod_articulo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpp_ingresoromaneo" ADD CONSTRAINT "cpp_ingresoromaneo_id_moneda_fkey" FOREIGN KEY ("id_moneda") REFERENCES "monedas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpp_ingresoromaneo" ADD CONSTRAINT "cpp_ingresoromaneo_id_titular_fkey" FOREIGN KEY ("id_titular") REFERENCES "titulares"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
