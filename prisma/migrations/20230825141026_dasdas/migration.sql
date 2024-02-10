/*
  Warnings:

  - Added the required column `cruza` to the `cpt_identidad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dias` to the `cpt_identidad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `documento_ingreso` to the `cpt_identidad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `errores` to the `cpt_identidad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fecha_identificacion` to the `cpt_identidad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fecha_ingreso` to the `cpt_identidad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fecha_registro` to the `cpt_identidad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propietario` to the `cpt_identidad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sexo` to the `cpt_identidad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_trazabilidad` to the `cpt_identidad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_vida` to the `cpt_identidad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenedor` to the `cpt_identidad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ubicacion` to the `cpt_identidad` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cpt_identidad" ADD COLUMN     "cruza" TEXT NOT NULL,
ADD COLUMN     "dias" INTEGER NOT NULL,
ADD COLUMN     "documento_ingreso" TEXT NOT NULL,
ADD COLUMN     "errores" TEXT NOT NULL,
ADD COLUMN     "fecha_identificacion" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fecha_ingreso" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fecha_registro" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "propietario" TEXT NOT NULL,
ADD COLUMN     "sexo" TEXT NOT NULL,
ADD COLUMN     "status_trazabilidad" TEXT NOT NULL,
ADD COLUMN     "status_vida" TEXT NOT NULL,
ADD COLUMN     "tenedor" TEXT NOT NULL,
ADD COLUMN     "ubicacion" TEXT NOT NULL;
