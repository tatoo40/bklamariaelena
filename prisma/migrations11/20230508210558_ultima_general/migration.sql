/*
  Warnings:

  - You are about to drop the `bookmarks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `establecimientos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "bookmarks" DROP CONSTRAINT "bookmarks_userId_fkey";

-- DropForeignKey
ALTER TABLE "establecimientos" DROP CONSTRAINT "establecimientos_id_usuario_id_empresa_fkey";

-- AlterTable
ALTER TABLE "empresas" ADD COLUMN     "estado" TEXT NOT NULL DEFAULT E'S',
ALTER COLUMN "id_mod" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "estado" TEXT NOT NULL DEFAULT E'S',
ALTER COLUMN "id_mod" SET DEFAULT 0;

-- DropTable
DROP TABLE "bookmarks";

-- DropTable
DROP TABLE "establecimientos";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "depositos" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_mod" INTEGER NOT NULL DEFAULT 0,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "nombre" TEXT NOT NULL,
    "superficie" INTEGER,
    "dicose" TEXT,
    "latitud" TEXT,
    "longitud" TEXT,
    "superficie_arrendada" INTEGER,
    "id_departamento" INTEGER NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_empresa" INTEGER NOT NULL,

    CONSTRAINT "depositos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departamentos" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "departamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estados_ganado" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "estados_ganado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipos_ganado" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "tipos_ganado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias_ganado" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "descripcion" TEXT NOT NULL,
    "id_tipo_ganado" INTEGER NOT NULL,

    CONSTRAINT "categorias_ganado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "marcas_ganado" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "descripcion" TEXT NOT NULL,
    "id_tipo_ganado" INTEGER NOT NULL,

    CONSTRAINT "marcas_ganado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estados_stock" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "descripcion" TEXT NOT NULL,
    "es_fisico" TEXT NOT NULL DEFAULT E'S',

    CONSTRAINT "estados_stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipos_toma_peso" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "tipos_toma_peso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unidades_stock" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "descripcion" TEXT NOT NULL,
    "descripcion_corta" TEXT NOT NULL,

    CONSTRAINT "Unidades_stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "motivos_sanitarios" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "motivos_sanitarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "motivos_mov_stock" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "descripcion" TEXT NOT NULL,
    "naturaleza" INTEGER NOT NULL,
    "cod_docum" TEXT NOT NULL,

    CONSTRAINT "motivos_mov_stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "articulos" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "nombre" TEXT NOT NULL,
    "id_unidad_stk" INTEGER NOT NULL,
    "id_categoria_ganado" INTEGER NOT NULL,
    "id_marca_ganado" INTEGER NOT NULL,
    "id_empresa" INTEGER NOT NULL,

    CONSTRAINT "articulos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cpf_stockaux" (
    "id" SERIAL NOT NULL,
    "nro_trans" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "cantidad" DECIMAL(65,30) NOT NULL,
    "cantidad2" DECIMAL(65,30) NOT NULL,
    "signo" INTEGER NOT NULL,
    "nro_lote" INTEGER NOT NULL DEFAULT 0,
    "cod_identidad" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "id_motivo_stk" INTEGER NOT NULL,
    "id_articulo" INTEGER NOT NULL,
    "id_unidad_stk" INTEGER NOT NULL,
    "id_empresa" INTEGER NOT NULL,

    CONSTRAINT "cpf_stockaux_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cpt_movimiento_stock" (
    "id" SERIAL NOT NULL,
    "nro_trans" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "cantidad_toma" DECIMAL(65,30) NOT NULL,
    "cantidad" DECIMAL(65,30) NOT NULL,
    "cantidad2" DECIMAL(65,30) NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "serie_guia" TEXT NOT NULL,
    "nro_guia" TEXT NOT NULL,
    "valor_dicose" INTEGER NOT NULL,
    "id_estado_ganado" INTEGER NOT NULL,
    "id_articulo" INTEGER NOT NULL,
    "id_tipo_toma_peso" INTEGER NOT NULL,
    "id_motivo_stk" INTEGER NOT NULL,
    "id_empresa" INTEGER NOT NULL,

    CONSTRAINT "cpt_movimiento_stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cpp_movimiento_stock" (
    "id" SERIAL NOT NULL,
    "nro_trans" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "cantidad" DECIMAL(65,30) NOT NULL,
    "cantidad2" DECIMAL(65,30) NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "nro_lote" INTEGER NOT NULL DEFAULT 0,
    "cod_identidad" TEXT NOT NULL,
    "id_articulo" INTEGER NOT NULL,
    "id_empresa" INTEGER NOT NULL,

    CONSTRAINT "cpp_movimiento_stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "numeradores" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "descripcion" TEXT NOT NULL,
    "valor" INTEGER NOT NULL,

    CONSTRAINT "numeradores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dicoses" (
    "id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "descripcion" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "dicoses_id_key" ON "dicoses"("id");

-- AddForeignKey
ALTER TABLE "depositos" ADD CONSTRAINT "depositos_id_departamento_fkey" FOREIGN KEY ("id_departamento") REFERENCES "departamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "depositos" ADD CONSTRAINT "depositos_id_usuario_id_empresa_fkey" FOREIGN KEY ("id_usuario", "id_empresa") REFERENCES "usuarios_x_empresas"("id_usuario", "id_empresa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categorias_ganado" ADD CONSTRAINT "categorias_ganado_id_tipo_ganado_fkey" FOREIGN KEY ("id_tipo_ganado") REFERENCES "tipos_ganado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marcas_ganado" ADD CONSTRAINT "marcas_ganado_id_tipo_ganado_fkey" FOREIGN KEY ("id_tipo_ganado") REFERENCES "tipos_ganado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articulos" ADD CONSTRAINT "articulos_id_unidad_stk_fkey" FOREIGN KEY ("id_unidad_stk") REFERENCES "Unidades_stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articulos" ADD CONSTRAINT "articulos_id_categoria_ganado_fkey" FOREIGN KEY ("id_categoria_ganado") REFERENCES "categorias_ganado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articulos" ADD CONSTRAINT "articulos_id_marca_ganado_fkey" FOREIGN KEY ("id_marca_ganado") REFERENCES "marcas_ganado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articulos" ADD CONSTRAINT "articulos_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpf_stockaux" ADD CONSTRAINT "cpf_stockaux_id_motivo_stk_fkey" FOREIGN KEY ("id_motivo_stk") REFERENCES "motivos_mov_stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpf_stockaux" ADD CONSTRAINT "cpf_stockaux_id_articulo_fkey" FOREIGN KEY ("id_articulo") REFERENCES "articulos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpf_stockaux" ADD CONSTRAINT "cpf_stockaux_id_unidad_stk_fkey" FOREIGN KEY ("id_unidad_stk") REFERENCES "Unidades_stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpf_stockaux" ADD CONSTRAINT "cpf_stockaux_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_movimiento_stock" ADD CONSTRAINT "cpt_movimiento_stock_valor_dicose_fkey" FOREIGN KEY ("valor_dicose") REFERENCES "dicoses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_movimiento_stock" ADD CONSTRAINT "cpt_movimiento_stock_id_estado_ganado_fkey" FOREIGN KEY ("id_estado_ganado") REFERENCES "estados_ganado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_movimiento_stock" ADD CONSTRAINT "cpt_movimiento_stock_id_articulo_fkey" FOREIGN KEY ("id_articulo") REFERENCES "articulos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_movimiento_stock" ADD CONSTRAINT "cpt_movimiento_stock_id_tipo_toma_peso_fkey" FOREIGN KEY ("id_tipo_toma_peso") REFERENCES "tipos_toma_peso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_movimiento_stock" ADD CONSTRAINT "cpt_movimiento_stock_id_motivo_stk_fkey" FOREIGN KEY ("id_motivo_stk") REFERENCES "motivos_mov_stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_movimiento_stock" ADD CONSTRAINT "cpt_movimiento_stock_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpp_movimiento_stock" ADD CONSTRAINT "cpp_movimiento_stock_id_articulo_fkey" FOREIGN KEY ("id_articulo") REFERENCES "articulos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpp_movimiento_stock" ADD CONSTRAINT "cpp_movimiento_stock_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
