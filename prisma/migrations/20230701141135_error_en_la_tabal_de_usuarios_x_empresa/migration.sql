-- AlterTable
ALTER TABLE "usuarios_x_empresas" ADD COLUMN     "estado" TEXT NOT NULL DEFAULT E'S';

-- CreateTable
CREATE TABLE "view_empresas_x_usuario" (
    "id_usuario" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_mod" INTEGER NOT NULL DEFAULT 0,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "nombre" TEXT NOT NULL,
    "razon_social" TEXT,
    "rut" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "email_contacto" TEXT NOT NULL,
    "telefono_contacto" TEXT NOT NULL,
    "observaciones" TEXT NOT NULL,

    CONSTRAINT "view_empresas_x_usuario_pkey" PRIMARY KEY ("id")
);
