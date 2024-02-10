-- CreateTable
CREATE TABLE "tipos_archivo_lector" (
    "id" SERIAL NOT NULL,
    "nro_trans" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "campos" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "tipos_archivo_lector_pkey" PRIMARY KEY ("id")
);
