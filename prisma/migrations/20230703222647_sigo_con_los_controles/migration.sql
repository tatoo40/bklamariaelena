/*
  Warnings:

  - Added the required column `campo_form` to the `controles_x_seccion_accion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "controles_x_seccion_accion" ADD COLUMN     "campo_form" TEXT NOT NULL;
