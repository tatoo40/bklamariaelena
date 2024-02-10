/*
  Warnings:

  - You are about to drop the column `Fecha_salida` on the `cpt_altaganado` table. All the data in the column will be lost.
  - Added the required column `id_motivos_stk` to the `cpt_altaganado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `observaciones` to the `cpt_altaganado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cpt_altaganado" DROP COLUMN "Fecha_salida",
ADD COLUMN     "fecha_salida" TIMESTAMP(3),
ADD COLUMN     "id_motivos_stk" INTEGER NOT NULL,
ADD COLUMN     "observaciones" TEXT NOT NULL;
