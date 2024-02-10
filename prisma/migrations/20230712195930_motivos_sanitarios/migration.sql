-- AlterTable
ALTER TABLE "motivos_sanitarios" ADD COLUMN     "frecuencia" INTEGER,
ADD COLUMN     "recurrente" BOOLEAN,
ADD COLUMN     "unidad_frecuencia" TEXT;

-- CreateTable
CREATE TABLE "cpt_registro_sanitario" (
    "id" SERIAL NOT NULL,
    "nro_trans" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "peso_total_real" DECIMAL(65,30),
    "peso_total_facturado" DECIMAL(65,30),
    "cantidad_ganado" DECIMAL(65,30),
    "fecha" TIMESTAMP(3),
    "id_motivo_sanitario" INTEGER NOT NULL,
    "id_empresa" INTEGER NOT NULL DEFAULT 1,
    "en_alta" BOOLEAN NOT NULL,

    CONSTRAINT "cpt_registro_sanitario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cpp_registro_sanitario" (
    "id" SERIAL NOT NULL,
    "nro_trans" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "cantidad" DECIMAL(65,30),
    "cantidad2" DECIMAL(65,30),
    "cantidad3" DECIMAL(65,30),
    "fecha" TIMESTAMP(3),
    "nro_lote" TEXT,
    "cod_identidad" TEXT,
    "cod_articulo" TEXT NOT NULL,
    "id_empresa" INTEGER NOT NULL,
    "id_motivo_sanitario" INTEGER NOT NULL,
    "id_padre" INTEGER NOT NULL,

    CONSTRAINT "cpp_registro_sanitario_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cpt_registro_sanitario" ADD CONSTRAINT "cpt_registro_sanitario_id_motivo_sanitario_fkey" FOREIGN KEY ("id_motivo_sanitario") REFERENCES "motivos_sanitarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpt_registro_sanitario" ADD CONSTRAINT "cpt_registro_sanitario_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpp_registro_sanitario" ADD CONSTRAINT "cpp_registro_sanitario_id_motivo_sanitario_fkey" FOREIGN KEY ("id_motivo_sanitario") REFERENCES "motivos_sanitarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpp_registro_sanitario" ADD CONSTRAINT "cpp_registro_sanitario_cod_articulo_fkey" FOREIGN KEY ("cod_articulo") REFERENCES "articulos"("cod_articulo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpp_registro_sanitario" ADD CONSTRAINT "cpp_registro_sanitario_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpp_registro_sanitario" ADD CONSTRAINT "cpp_registro_sanitario_id_padre_fkey" FOREIGN KEY ("id_padre") REFERENCES "cpt_registro_sanitario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
