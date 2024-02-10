-- CreateTable
CREATE TABLE "cpt_parametros_x_empresa" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "locacion_accuweather" TEXT NOT NULL,
    "api_accuweather" TEXT NOT NULL,
    "id_empresa" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "cpt_parametros_x_empresa_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cpt_parametros_x_empresa" ADD CONSTRAINT "cpt_parametros_x_empresa_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
