-- CreateTable
CREATE TABLE "cpt_identidad" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "cod_articulo" TEXT NOT NULL,
    "nro_lote" TEXT NOT NULL,
    "cod_identidad" TEXT NOT NULL,
    "meses" INTEGER NOT NULL,
    "peso_inicial" DECIMAL(65,30) NOT NULL,
    "fecha_entrada" TIMESTAMP(3) NOT NULL,
    "Fecha_salida" TIMESTAMP(3) NOT NULL,
    "id_categoria_ganado" INTEGER NOT NULL,
    "id_marca_ganado" INTEGER NOT NULL,

    CONSTRAINT "cpt_identidad_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cpt_identidad" ADD CONSTRAINT "cpt_identidad_cod_articulo_fkey" FOREIGN KEY ("cod_articulo") REFERENCES "articulos"("cod_articulo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_identidad" ADD CONSTRAINT "cpt_identidad_id_categoria_ganado_fkey" FOREIGN KEY ("id_categoria_ganado") REFERENCES "categorias_ganado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_identidad" ADD CONSTRAINT "cpt_identidad_id_marca_ganado_fkey" FOREIGN KEY ("id_marca_ganado") REFERENCES "marcas_ganado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
