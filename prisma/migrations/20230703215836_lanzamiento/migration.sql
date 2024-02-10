/*
  Warnings:

  - Added the required column `lanzamiento` to the `control_trans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lanzamiento` to the `controles_x_seccion_accion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "control_trans" ADD COLUMN     "lanzamiento" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "controles_x_seccion_accion" ADD COLUMN     "lanzamiento" INTEGER NOT NULL;
