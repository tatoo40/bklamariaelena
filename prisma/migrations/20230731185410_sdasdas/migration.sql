/*
  Warnings:

  - You are about to drop the column `cantidad_kilos_Salida` on the `cpt_ingresoromaneo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cpt_ingresoromaneo" DROP COLUMN "cantidad_kilos_Salida",
ADD COLUMN     "cantidad_kilos_salida" DECIMAL(65,30),
ADD COLUMN     "cod_identidad" TEXT,
ADD COLUMN     "nro_romaneo" INTEGER,
ADD COLUMN     "nro_tropa" INTEGER;

-- CreateTable
CREATE TABLE "cpt_parametros_x_fecha" (
    "id" SERIAL NOT NULL,
    "nro_trans" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "fecha" TIMESTAMP(3) NOT NULL,
    "precio_vaca_cuarta_balanza" DECIMAL(65,30) NOT NULL,
    "tc" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "cpt_parametros_x_fecha_pkey" PRIMARY KEY ("id")
);
