/*
  Warnings:

  - You are about to drop the column `tr` on the `cpf_costos` table. All the data in the column will be lost.
  - You are about to drop the column `id_deposito` on the `cpf_stockaux` table. All the data in the column will be lost.
  - You are about to drop the `bookmarks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `view_empresas_x_usuario` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tc` to the `cpf_costos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_empresa` to the `cpf_log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_sector` to the `cpf_stockaux` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nro_lote_salida` to the `cpt_facturas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nro_tropa` to the `cpt_facturas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cpf_stockaux" DROP CONSTRAINT "cpf_stockaux_id_deposito_fkey";

-- AlterTable
ALTER TABLE "articulos_x_titular" ADD COLUMN     "id_empresa" INTEGER;

-- AlterTable
ALTER TABLE "cpf_costos" DROP COLUMN "tr",
ADD COLUMN     "tc" DECIMAL(65,30) NOT NULL,
ALTER COLUMN "importe_mo" DROP DEFAULT;

-- AlterTable
ALTER TABLE "cpf_log" ADD COLUMN     "id_empresa" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "cpf_stockaux" DROP COLUMN "id_deposito",
ADD COLUMN     "id_sector" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "cpt_facturas" ADD COLUMN     "nro_lote_salida" TEXT NOT NULL,
ADD COLUMN     "nro_tropa" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "cpt_registro_sanitario" ADD COLUMN     "cod_articulo" TEXT;

-- AlterTable
ALTER TABLE "dicoses" ADD COLUMN     "id_empresa" INTEGER;

-- AlterTable
ALTER TABLE "motivos_sanitarios" ADD COLUMN     "cod_articulo" TEXT,
ADD COLUMN     "id_empresa" INTEGER;

-- AlterTable
ALTER TABLE "secciones" ADD COLUMN     "id_empresa" INTEGER;

-- DropTable
DROP TABLE "bookmarks";

-- DropTable
DROP TABLE "view_empresas_x_usuario";

-- CreateTable
CREATE TABLE "sectores" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_mod" INTEGER NOT NULL DEFAULT 0,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "nombre" TEXT NOT NULL,
    "superficie" INTEGER,
    "id_deposito" INTEGER NOT NULL,
    "id_empresa" INTEGER NOT NULL,

    CONSTRAINT "sectores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pasturas" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_mod" INTEGER NOT NULL DEFAULT 0,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "nombre" TEXT NOT NULL,
    "vida_util_dias" INTEGER NOT NULL,

    CONSTRAINT "pasturas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pasturas_x_sector" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_mod" INTEGER NOT NULL DEFAULT 0,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "descripcion" TEXT NOT NULL,
    "observaciones" TEXT NOT NULL,
    "fecha_siembra" TIMESTAMP(3) NOT NULL,
    "fecha_pastoreo" TIMESTAMP(3) NOT NULL,
    "fecha_estimada_fin_pastoreo" TIMESTAMP(3) NOT NULL,
    "fecha_fin_pastoreo" TIMESTAMP(3) NOT NULL,
    "id_pastura" INTEGER NOT NULL,
    "id_sector" INTEGER NOT NULL,
    "id_empresa" INTEGER NOT NULL,

    CONSTRAINT "pasturas_x_sector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cpt_recaravaneo" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_mod" INTEGER NOT NULL DEFAULT 0,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "observaciones" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "cod_articulo" TEXT NOT NULL,
    "nro_lote" TEXT NOT NULL,
    "cod_identidad" TEXT NOT NULL,
    "cod_identidad_nuevo" TEXT NOT NULL,
    "id_empresa" INTEGER NOT NULL,

    CONSTRAINT "cpt_recaravaneo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cpt_evolucion_ganado" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_mod" INTEGER NOT NULL DEFAULT 0,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "cod_articulo" TEXT NOT NULL,
    "cod_articulo_evoluciona" TEXT NOT NULL,
    "peso_fin" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "cpt_evolucion_ganado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cpt_registro_lluvias" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_mod" INTEGER NOT NULL DEFAULT 0,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "cantidad_mm" DECIMAL(65,30) NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "observacion" TEXT NOT NULL,
    "id_empresa" INTEGER NOT NULL,

    CONSTRAINT "cpt_registro_lluvias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipos_gasto" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "tipos_gasto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cpt_registros_gasto" (
    "id" SERIAL NOT NULL,
    "nro_trans" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "descripcion" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "cod_docum" TEXT NOT NULL,
    "importe_mo" DECIMAL(65,30),
    "importe_mn" DECIMAL(65,30),
    "importe_tr" DECIMAL(65,30),
    "tc" DECIMAL(65,30) NOT NULL,
    "id_moneda" INTEGER NOT NULL,
    "id_titular" INTEGER NOT NULL,
    "id_empresa" INTEGER NOT NULL DEFAULT 1,
    "id_tipo_gasto" INTEGER NOT NULL,

    CONSTRAINT "cpt_registros_gasto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cpf_consumos" (
    "id" SERIAL NOT NULL,
    "nro_trans" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "cantidad" DECIMAL(65,30) DEFAULT 1,
    "cantidad2" DECIMAL(65,30),
    "cantidad3" DECIMAL(65,30),
    "signo" INTEGER,
    "fecha" TIMESTAMP(3),
    "id_motivo_stk" INTEGER NOT NULL,
    "cod_articulo" TEXT NOT NULL,
    "id_unidad_stk" INTEGER NOT NULL,
    "id_empresa" INTEGER NOT NULL,
    "id_sector" INTEGER NOT NULL,
    "id_estado_stock" INTEGER NOT NULL,

    CONSTRAINT "cpf_consumos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cpp_facturas" (
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
    "tc" DECIMAL(65,30),
    "cod_docum" TEXT NOT NULL,
    "nro_lote" TEXT NOT NULL,
    "cod_identidad" TEXT NOT NULL,
    "cod_articulo" TEXT NOT NULL,

    CONSTRAINT "cpp_facturas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sectores" ADD CONSTRAINT "sectores_id_deposito_fkey" FOREIGN KEY ("id_deposito") REFERENCES "depositos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pasturas_x_sector" ADD CONSTRAINT "pasturas_x_sector_id_pastura_fkey" FOREIGN KEY ("id_pastura") REFERENCES "pasturas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pasturas_x_sector" ADD CONSTRAINT "pasturas_x_sector_id_sector_fkey" FOREIGN KEY ("id_sector") REFERENCES "sectores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_recaravaneo" ADD CONSTRAINT "cpt_recaravaneo_cod_articulo_fkey" FOREIGN KEY ("cod_articulo") REFERENCES "articulos"("cod_articulo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_evolucion_ganado" ADD CONSTRAINT "cpt_evolucion_ganado_cod_articulo_fkey" FOREIGN KEY ("cod_articulo") REFERENCES "articulos"("cod_articulo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_evolucion_ganado" ADD CONSTRAINT "cpt_evolucion_ganado_cod_articulo_evoluciona_fkey" FOREIGN KEY ("cod_articulo_evoluciona") REFERENCES "articulos"("cod_articulo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "motivos_sanitarios" ADD CONSTRAINT "motivos_sanitarios_cod_articulo_fkey" FOREIGN KEY ("cod_articulo") REFERENCES "articulos"("cod_articulo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_registros_gasto" ADD CONSTRAINT "cpt_registros_gasto_id_moneda_fkey" FOREIGN KEY ("id_moneda") REFERENCES "monedas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_registros_gasto" ADD CONSTRAINT "cpt_registros_gasto_id_titular_fkey" FOREIGN KEY ("id_titular") REFERENCES "titulares"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_registros_gasto" ADD CONSTRAINT "cpt_registros_gasto_id_tipo_gasto_fkey" FOREIGN KEY ("id_tipo_gasto") REFERENCES "tipos_gasto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpf_consumos" ADD CONSTRAINT "cpf_consumos_cod_articulo_fkey" FOREIGN KEY ("cod_articulo") REFERENCES "articulos"("cod_articulo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpf_consumos" ADD CONSTRAINT "cpf_consumos_id_sector_fkey" FOREIGN KEY ("id_sector") REFERENCES "sectores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpf_consumos" ADD CONSTRAINT "cpf_consumos_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpf_consumos" ADD CONSTRAINT "cpf_consumos_id_estado_stock_fkey" FOREIGN KEY ("id_estado_stock") REFERENCES "estados_stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpf_consumos" ADD CONSTRAINT "cpf_consumos_id_motivo_stk_fkey" FOREIGN KEY ("id_motivo_stk") REFERENCES "motivos_mov_stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpf_consumos" ADD CONSTRAINT "cpf_consumos_id_unidad_stk_fkey" FOREIGN KEY ("id_unidad_stk") REFERENCES "unidades_stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpf_stockaux" ADD CONSTRAINT "cpf_stockaux_id_sector_fkey" FOREIGN KEY ("id_sector") REFERENCES "sectores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_registro_sanitario" ADD CONSTRAINT "cpt_registro_sanitario_cod_articulo_fkey" FOREIGN KEY ("cod_articulo") REFERENCES "articulos"("cod_articulo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpp_facturas" ADD CONSTRAINT "cpp_facturas_cod_articulo_fkey" FOREIGN KEY ("cod_articulo") REFERENCES "articulos"("cod_articulo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpp_facturas" ADD CONSTRAINT "cpp_facturas_id_moneda_fkey" FOREIGN KEY ("id_moneda") REFERENCES "monedas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpp_facturas" ADD CONSTRAINT "cpp_facturas_id_titular_fkey" FOREIGN KEY ("id_titular") REFERENCES "titulares"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
