-- CreateTable
CREATE TABLE "cpt_caravanas_no_procesadas" (
    "id" SERIAL NOT NULL,
    "nro_trans" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "cod_identidad" TEXT NOT NULL,
    "fecha" TIMESTAMP(3),
    "observaciones" TEXT,
    "id_empresa" INTEGER DEFAULT 1,

    CONSTRAINT "cpt_caravanas_no_procesadas_pkey" PRIMARY KEY ("id")
);
