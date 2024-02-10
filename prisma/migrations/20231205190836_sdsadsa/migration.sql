-- CreateTable
CREATE TABLE "cpt_altaganado" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "cod_articulo" TEXT NOT NULL,
    "nro_lote" TEXT NOT NULL,
    "cod_identidad" TEXT NOT NULL,
    "dias" INTEGER NOT NULL,
    "meses" INTEGER NOT NULL,
    "propietario" TEXT NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "tenedor" TEXT NOT NULL,
    "status_vida" TEXT NOT NULL,
    "errores" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "cruza" TEXT NOT NULL,
    "id_empresa" INTEGER NOT NULL,
    "fecha_ingreso" TIMESTAMP(3),
    "documento_ingreso" TEXT,
    "fecha_identificacion" TIMESTAMP(3),
    "fecha_registro" TIMESTAMP(3),
    "status_trazabilidad" TEXT,
    "peso_inicial" DECIMAL(65,30),
    "fecha_entrada" TIMESTAMP(3),
    "Fecha_salida" TIMESTAMP(3),
    "id_categoria_ganado" INTEGER NOT NULL,
    "id_marca_ganado" INTEGER NOT NULL,

    CONSTRAINT "cpt_altaganado_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cpt_altaganado" ADD CONSTRAINT "cpt_altaganado_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_altaganado" ADD CONSTRAINT "cpt_altaganado_cod_articulo_fkey" FOREIGN KEY ("cod_articulo") REFERENCES "articulos"("cod_articulo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_altaganado" ADD CONSTRAINT "cpt_altaganado_id_categoria_ganado_fkey" FOREIGN KEY ("id_categoria_ganado") REFERENCES "categorias_ganado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_altaganado" ADD CONSTRAINT "cpt_altaganado_id_marca_ganado_fkey" FOREIGN KEY ("id_marca_ganado") REFERENCES "marcas_ganado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
