-- CreateTable
CREATE TABLE "cpt_relaciono_snig" (
    "id" SERIAL NOT NULL,
    "nro_trans" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "cantidad_ganado" DECIMAL(65,30),
    "fecha" TIMESTAMP(3),
    "observaciones" TEXT,
    "id_empresa" INTEGER DEFAULT 1,

    CONSTRAINT "cpt_relaciono_snig_pkey" PRIMARY KEY ("id")
);
