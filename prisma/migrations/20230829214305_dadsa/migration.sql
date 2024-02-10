-- AlterTable
ALTER TABLE "cpt_identidad" ALTER COLUMN "peso_inicial" DROP NOT NULL,
ALTER COLUMN "fecha_entrada" DROP NOT NULL,
ALTER COLUMN "Fecha_salida" DROP NOT NULL,
ALTER COLUMN "documento_ingreso" DROP NOT NULL,
ALTER COLUMN "fecha_identificacion" DROP NOT NULL,
ALTER COLUMN "fecha_ingreso" DROP NOT NULL,
ALTER COLUMN "fecha_registro" DROP NOT NULL,
ALTER COLUMN "status_trazabilidad" DROP NOT NULL;
