/*
  Warnings:

  - Added the required column `mensaje_error_general` to the `control_trans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mensaje_error_especifico` to the `controles_x_seccion_accion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "control_trans" ADD COLUMN     "mensaje_error_general" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "controles_x_seccion_accion" ADD COLUMN     "mensaje_error_especifico" TEXT NOT NULL;
