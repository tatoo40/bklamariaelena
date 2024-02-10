/*
  Warnings:

  - Added the required column `precio_novillo_cuarta_balanza` to the `cpt_parametros_x_fecha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precio_vaquillona_cuarta_balanza` to the `cpt_parametros_x_fecha` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cpt_parametros_x_fecha" ADD COLUMN     "precio_novillo_cuarta_balanza" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "precio_novillo_pie" DECIMAL(65,30),
ADD COLUMN     "precio_ternera_exportacion_pie" DECIMAL(65,30),
ADD COLUMN     "precio_ternero_exportacion_pie" DECIMAL(65,30),
ADD COLUMN     "precio_vaca_invernada_cuarta_balanza" DECIMAL(65,30),
ADD COLUMN     "precio_vaca_invernada_pie" DECIMAL(65,30),
ADD COLUMN     "precio_vaquillona_cuarta_balanza" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "precio_vaquillona_pie" DECIMAL(65,30);
