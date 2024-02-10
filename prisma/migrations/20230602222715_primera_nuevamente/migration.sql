-- CreateTable
CREATE TABLE "bookmarks" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_mod" INTEGER NOT NULL DEFAULT 0,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "title" TEXT NOT NULL,
    "description" TEXT,
    "link" TEXT,

    CONSTRAINT "bookmarks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_mod" INTEGER NOT NULL DEFAULT 0,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "hashRt" TEXT,
    "telefono_contacto" TEXT,
    "nombre" TEXT,
    "apellido" TEXT,
    "isRegisteredWithGoogle" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "empresas" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_mod" INTEGER NOT NULL DEFAULT 0,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "nombre" TEXT NOT NULL,
    "razon_social" TEXT,
    "rut" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "email_contacto" TEXT NOT NULL,
    "telefono_contacto" TEXT NOT NULL,
    "observaciones" TEXT NOT NULL,

    CONSTRAINT "empresas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios_x_empresas" (
    "id_usuario" INTEGER NOT NULL,
    "id_empresa" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_x_empresas_pkey" PRIMARY KEY ("id_usuario","id_empresa")
);

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
CREATE TABLE "propiedad_ganado" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "propiedad_ganado_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "unidades_stock" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "descripcion" TEXT NOT NULL,
    "descripcion_corta" TEXT NOT NULL,

    CONSTRAINT "unidades_stock_pkey" PRIMARY KEY ("id")
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
    "cod_articulo" TEXT NOT NULL,
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
    "nro_trans" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "cantidad" DECIMAL(65,30) NOT NULL DEFAULT 1,
    "cantidad2" DECIMAL(65,30) NOT NULL,
    "cantidad3" DECIMAL(65,30) NOT NULL,
    "signo" INTEGER NOT NULL,
    "nro_lote" INTEGER NOT NULL DEFAULT 0,
    "cod_identidad" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "id_motivo_stk" INTEGER NOT NULL,
    "cod_articulo" TEXT NOT NULL,
    "id_unidad_stk" INTEGER NOT NULL,
    "id_empresa" INTEGER NOT NULL,

    CONSTRAINT "cpf_stockaux_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cpt_movimiento_stock" (
    "id" SERIAL NOT NULL,
    "nro_trans" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "peso_total_real" DECIMAL(65,30),
    "peso_total_facturado" DECIMAL(65,30),
    "cantidad_ganado" DECIMAL(65,30),
    "fecha" TIMESTAMP(3),
    "serie_guia" TEXT,
    "nro_guia" TEXT,
    "valor_dicose" INTEGER NOT NULL,
    "id_propiedad_ganado" INTEGER NOT NULL,
    "cod_articulo" TEXT NOT NULL,
    "id_tipo_toma_peso" INTEGER NOT NULL,
    "id_motivo_stk" INTEGER NOT NULL,
    "id_empresa" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "cpt_movimiento_stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cpp_movimiento_stock" (
    "id" SERIAL NOT NULL,
    "nro_trans" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "cantidad" DECIMAL(65,30),
    "cantidad2" DECIMAL(65,30),
    "cantidad3" DECIMAL(65,30),
    "fecha" TIMESTAMP(3),
    "nro_lote" INTEGER NOT NULL DEFAULT 0,
    "cod_identidad" TEXT,
    "cod_articulo" TEXT NOT NULL,
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
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "descripcion" TEXT,

    CONSTRAINT "dicoses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "articulos_cod_articulo_key" ON "articulos"("cod_articulo");

-- AddForeignKey
ALTER TABLE "usuarios_x_empresas" ADD CONSTRAINT "usuarios_x_empresas_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarios_x_empresas" ADD CONSTRAINT "usuarios_x_empresas_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "depositos" ADD CONSTRAINT "depositos_id_departamento_fkey" FOREIGN KEY ("id_departamento") REFERENCES "departamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "depositos" ADD CONSTRAINT "depositos_id_usuario_id_empresa_fkey" FOREIGN KEY ("id_usuario", "id_empresa") REFERENCES "usuarios_x_empresas"("id_usuario", "id_empresa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categorias_ganado" ADD CONSTRAINT "categorias_ganado_id_tipo_ganado_fkey" FOREIGN KEY ("id_tipo_ganado") REFERENCES "tipos_ganado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marcas_ganado" ADD CONSTRAINT "marcas_ganado_id_tipo_ganado_fkey" FOREIGN KEY ("id_tipo_ganado") REFERENCES "tipos_ganado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articulos" ADD CONSTRAINT "articulos_id_unidad_stk_fkey" FOREIGN KEY ("id_unidad_stk") REFERENCES "unidades_stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articulos" ADD CONSTRAINT "articulos_id_categoria_ganado_fkey" FOREIGN KEY ("id_categoria_ganado") REFERENCES "categorias_ganado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articulos" ADD CONSTRAINT "articulos_id_marca_ganado_fkey" FOREIGN KEY ("id_marca_ganado") REFERENCES "marcas_ganado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articulos" ADD CONSTRAINT "articulos_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpf_stockaux" ADD CONSTRAINT "cpf_stockaux_id_motivo_stk_fkey" FOREIGN KEY ("id_motivo_stk") REFERENCES "motivos_mov_stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpf_stockaux" ADD CONSTRAINT "cpf_stockaux_cod_articulo_fkey" FOREIGN KEY ("cod_articulo") REFERENCES "articulos"("cod_articulo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpf_stockaux" ADD CONSTRAINT "cpf_stockaux_id_unidad_stk_fkey" FOREIGN KEY ("id_unidad_stk") REFERENCES "unidades_stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpf_stockaux" ADD CONSTRAINT "cpf_stockaux_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_movimiento_stock" ADD CONSTRAINT "cpt_movimiento_stock_valor_dicose_fkey" FOREIGN KEY ("valor_dicose") REFERENCES "dicoses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_movimiento_stock" ADD CONSTRAINT "cpt_movimiento_stock_id_propiedad_ganado_fkey" FOREIGN KEY ("id_propiedad_ganado") REFERENCES "propiedad_ganado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_movimiento_stock" ADD CONSTRAINT "cpt_movimiento_stock_cod_articulo_fkey" FOREIGN KEY ("cod_articulo") REFERENCES "articulos"("cod_articulo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_movimiento_stock" ADD CONSTRAINT "cpt_movimiento_stock_id_tipo_toma_peso_fkey" FOREIGN KEY ("id_tipo_toma_peso") REFERENCES "tipos_toma_peso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_movimiento_stock" ADD CONSTRAINT "cpt_movimiento_stock_id_motivo_stk_fkey" FOREIGN KEY ("id_motivo_stk") REFERENCES "motivos_mov_stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpp_movimiento_stock" ADD CONSTRAINT "cpp_movimiento_stock_cod_articulo_fkey" FOREIGN KEY ("cod_articulo") REFERENCES "articulos"("cod_articulo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpp_movimiento_stock" ADD CONSTRAINT "cpp_movimiento_stock_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
