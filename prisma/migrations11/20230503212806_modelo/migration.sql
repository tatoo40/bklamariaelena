/*
  Warnings:

  - You are about to drop the `Usuarios_x_empresas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Usuarios_x_empresas" DROP CONSTRAINT "Usuarios_x_empresas_id_empresa_fkey";

-- DropForeignKey
ALTER TABLE "Usuarios_x_empresas" DROP CONSTRAINT "Usuarios_x_empresas_id_usuario_fkey";

-- DropForeignKey
ALTER TABLE "establecimientos" DROP CONSTRAINT "establecimientos_id_usuario_id_empresa_fkey";

-- DropTable
DROP TABLE "Usuarios_x_empresas";

-- CreateTable
CREATE TABLE "usuarios_x_empresas" (
    "id_usuario" INTEGER NOT NULL,
    "id_empresa" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_x_empresas_pkey" PRIMARY KEY ("id_usuario","id_empresa")
);

-- AddForeignKey
ALTER TABLE "usuarios_x_empresas" ADD CONSTRAINT "usuarios_x_empresas_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarios_x_empresas" ADD CONSTRAINT "usuarios_x_empresas_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "establecimientos" ADD CONSTRAINT "establecimientos_id_usuario_id_empresa_fkey" FOREIGN KEY ("id_usuario", "id_empresa") REFERENCES "usuarios_x_empresas"("id_usuario", "id_empresa") ON DELETE RESTRICT ON UPDATE CASCADE;
