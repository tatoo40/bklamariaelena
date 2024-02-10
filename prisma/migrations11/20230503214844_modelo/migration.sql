/*
  Warnings:

  - You are about to drop the column `direccion` on the `establecimientos` table. All the data in the column will be lost.
  - You are about to drop the column `email_contacto` on the `establecimientos` table. All the data in the column will be lost.
  - You are about to drop the column `observaciones` on the `establecimientos` table. All the data in the column will be lost.
  - You are about to drop the column `razon_social` on the `establecimientos` table. All the data in the column will be lost.
  - You are about to drop the column `rut` on the `establecimientos` table. All the data in the column will be lost.
  - You are about to drop the column `telefono_contacto` on the `establecimientos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "establecimientos" DROP COLUMN "direccion",
DROP COLUMN "email_contacto",
DROP COLUMN "observaciones",
DROP COLUMN "razon_social",
DROP COLUMN "rut",
DROP COLUMN "telefono_contacto",
ADD COLUMN     "dicose" TEXT,
ADD COLUMN     "id_departamento" INTEGER,
ADD COLUMN     "id_localidad" INTEGER,
ADD COLUMN     "latitud" TEXT,
ADD COLUMN     "longitud" TEXT,
ADD COLUMN     "superficie" INTEGER,
ADD COLUMN     "superficie_arrendada" INTEGER;
