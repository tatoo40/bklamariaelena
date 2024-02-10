-- AlterTable
ALTER TABLE "articulos" ADD COLUMN     "id_tipo_articulo" INTEGER;

-- AlterTable
ALTER TABLE "cpt_fact_prov" ADD COLUMN     "importe_iva_mn" DECIMAL(65,30),
ADD COLUMN     "importe_iva_mo" DECIMAL(65,30),
ADD COLUMN     "importe_iva_tr" DECIMAL(65,30),
ADD COLUMN     "importe_total_mn" DECIMAL(65,30),
ADD COLUMN     "importe_total_mo" DECIMAL(65,30),
ADD COLUMN     "importe_total_tr" DECIMAL(65,30);

-- CreateTable
CREATE TABLE "tipo_articulo" (
    "id" SERIAL NOT NULL,
    "cod_articulo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "tipo_articulo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "articulos_x_titular" (
    "id" SERIAL NOT NULL,
    "cod_articulo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "id_articulo" INTEGER NOT NULL,
    "id_titular" INTEGER NOT NULL,

    CONSTRAINT "articulos_x_titular_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cpp_fact_prov" (
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
    "fecha" TIMESTAMP(3),
    "serie_fact_prov" TEXT NOT NULL,
    "nro_fact_prov" INTEGER NOT NULL,
    "id_moneda" INTEGER NOT NULL,
    "id_titular" INTEGER NOT NULL,
    "id_empresa" INTEGER NOT NULL DEFAULT 1,
    "tc" INTEGER NOT NULL,
    "cod_docum" TEXT NOT NULL,
    "cod_articulo" TEXT NOT NULL,

    CONSTRAINT "cpp_fact_prov_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tipo_articulo_cod_articulo_key" ON "tipo_articulo"("cod_articulo");

-- CreateIndex
CREATE UNIQUE INDEX "articulos_x_titular_cod_articulo_key" ON "articulos_x_titular"("cod_articulo");

-- AddForeignKey
ALTER TABLE "articulos" ADD CONSTRAINT "articulos_id_tipo_articulo_fkey" FOREIGN KEY ("id_tipo_articulo") REFERENCES "tipo_articulo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articulos_x_titular" ADD CONSTRAINT "articulos_x_titular_id_titular_fkey" FOREIGN KEY ("id_titular") REFERENCES "titulares"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articulos_x_titular" ADD CONSTRAINT "articulos_x_titular_id_articulo_fkey" FOREIGN KEY ("id_articulo") REFERENCES "articulos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpp_fact_prov" ADD CONSTRAINT "cpp_fact_prov_cod_articulo_fkey" FOREIGN KEY ("cod_articulo") REFERENCES "articulos"("cod_articulo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpp_fact_prov" ADD CONSTRAINT "cpp_fact_prov_id_moneda_fkey" FOREIGN KEY ("id_moneda") REFERENCES "monedas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpp_fact_prov" ADD CONSTRAINT "cpp_fact_prov_id_titular_fkey" FOREIGN KEY ("id_titular") REFERENCES "titulares"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
