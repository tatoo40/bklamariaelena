/*
  Warnings:

  - You are about to drop the column `cod_identidad` on the `cpt_ingresoromaneo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cpp_ingresoromaneo" ADD COLUMN     "cod_identidad" TEXT;

-- AlterTable
ALTER TABLE "cpt_ingresoromaneo" DROP COLUMN "cod_identidad";
