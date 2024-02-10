/*
  Warnings:

  - You are about to drop the column `userId` on the `empresas` table. All the data in the column will be lost.
  - Added the required column `id_mod` to the `empresas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "empresas" DROP CONSTRAINT "empresas_userId_fkey";

-- AlterTable
ALTER TABLE "empresas" DROP COLUMN "userId",
ADD COLUMN     "id_mod" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_mod" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "telefono_contacto" TEXT,
    "nombre" TEXT,
    "apellido" TEXT,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuarios_x_empresas" (
    "id_usuario" INTEGER NOT NULL,
    "id_empresa" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuarios_x_empresas_pkey" PRIMARY KEY ("id_usuario","id_empresa")
);

-- CreateTable
CREATE TABLE "establecimientos" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_mod" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "razon_social" TEXT,
    "rut" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "email_contacto" TEXT NOT NULL,
    "telefono_contacto" TEXT NOT NULL,
    "observaciones" TEXT NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_empresa" INTEGER NOT NULL,

    CONSTRAINT "establecimientos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "Usuarios_x_empresas" ADD CONSTRAINT "Usuarios_x_empresas_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuarios_x_empresas" ADD CONSTRAINT "Usuarios_x_empresas_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "establecimientos" ADD CONSTRAINT "establecimientos_id_usuario_id_empresa_fkey" FOREIGN KEY ("id_usuario", "id_empresa") REFERENCES "Usuarios_x_empresas"("id_usuario", "id_empresa") ON DELETE RESTRICT ON UPDATE CASCADE;
