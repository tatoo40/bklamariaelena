/*
  Warnings:

  - Added the required column `id_rol` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "id_rol" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_mod" INTEGER NOT NULL DEFAULT 0,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "monedas" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_mod" INTEGER NOT NULL DEFAULT 0,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "descripcion" TEXT NOT NULL,
    "simbolo" TEXT NOT NULL,

    CONSTRAINT "monedas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_cambio_diario" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_mod" INTEGER NOT NULL DEFAULT 0,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "valor" DECIMAL(65,30) NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "id_moneda" INTEGER NOT NULL,

    CONSTRAINT "tipo_cambio_diario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipos_costeo" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_mod" INTEGER NOT NULL DEFAULT 0,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "tipos_costeo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipos_titulares" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_mod" INTEGER NOT NULL DEFAULT 0,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "tipos_titulares_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "titulares" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_mod" INTEGER NOT NULL DEFAULT 0,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "nombre_fantasia" TEXT NOT NULL,
    "razon_social" TEXT,
    "rut" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "observaciones" TEXT NOT NULL,
    "nombre_contacto" TEXT NOT NULL,
    "telefono_contacto" TEXT NOT NULL,
    "id_tipo_titular" INTEGER NOT NULL,
    "id_categoria_prov" INTEGER NOT NULL,
    "id_categoria_cliente" INTEGER NOT NULL,

    CONSTRAINT "titulares_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias_cliente" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_mod" INTEGER NOT NULL DEFAULT 0,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "categorias_cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias_prov" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_mod" INTEGER NOT NULL DEFAULT 0,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "categorias_prov_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cpf_costos" (
    "id" SERIAL NOT NULL,
    "nro_trans" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "importe_mo" DECIMAL(65,30) DEFAULT 1,
    "importe_mn" DECIMAL(65,30),
    "importe_tr" DECIMAL(65,30),
    "tr" DECIMAL(65,30) NOT NULL,
    "signo" INTEGER,
    "nro_lote" INTEGER DEFAULT 0,
    "cod_identidad" TEXT,
    "fecha" TIMESTAMP(3),
    "nro_trans_ref" INTEGER DEFAULT 0,
    "cod_articulo" TEXT NOT NULL,
    "id_unidad_stk" INTEGER NOT NULL,
    "id_empresa" INTEGER NOT NULL,
    "id_tipo_costo" INTEGER NOT NULL,

    CONSTRAINT "cpf_costos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cpt_fact_prov" (
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

    CONSTRAINT "cpt_fact_prov_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_id_rol_fkey" FOREIGN KEY ("id_rol") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tipo_cambio_diario" ADD CONSTRAINT "tipo_cambio_diario_id_moneda_fkey" FOREIGN KEY ("id_moneda") REFERENCES "monedas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "titulares" ADD CONSTRAINT "titulares_id_tipo_titular_fkey" FOREIGN KEY ("id_tipo_titular") REFERENCES "tipos_titulares"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "titulares" ADD CONSTRAINT "titulares_id_categoria_prov_fkey" FOREIGN KEY ("id_categoria_prov") REFERENCES "categorias_prov"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "titulares" ADD CONSTRAINT "titulares_id_categoria_cliente_fkey" FOREIGN KEY ("id_categoria_cliente") REFERENCES "categorias_cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpf_costos" ADD CONSTRAINT "cpf_costos_cod_articulo_fkey" FOREIGN KEY ("cod_articulo") REFERENCES "articulos"("cod_articulo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpf_costos" ADD CONSTRAINT "cpf_costos_id_unidad_stk_fkey" FOREIGN KEY ("id_unidad_stk") REFERENCES "unidades_stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpf_costos" ADD CONSTRAINT "cpf_costos_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpf_costos" ADD CONSTRAINT "cpf_costos_id_tipo_costo_fkey" FOREIGN KEY ("id_tipo_costo") REFERENCES "tipos_costeo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_fact_prov" ADD CONSTRAINT "cpt_fact_prov_id_moneda_fkey" FOREIGN KEY ("id_moneda") REFERENCES "monedas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_fact_prov" ADD CONSTRAINT "cpt_fact_prov_id_titular_fkey" FOREIGN KEY ("id_titular") REFERENCES "titulares"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
