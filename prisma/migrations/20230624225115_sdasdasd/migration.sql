/*
  Warnings:

  - You are about to drop the column `naturaleza` on the `motivos_mov_stock` table. All the data in the column will be lost.
  - Added the required column `id_tipo_mov_stk` to the `motivos_mov_stock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "motivos_mov_stock" DROP COLUMN "naturaleza",
ADD COLUMN     "id_tipo_mov_stk" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "tipos_mov_stock" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "descripcion" TEXT NOT NULL,
    "naturaleza" INTEGER NOT NULL,

    CONSTRAINT "tipos_mov_stock_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "motivos_mov_stock" ADD CONSTRAINT "motivos_mov_stock_id_tipo_mov_stk_fkey" FOREIGN KEY ("id_tipo_mov_stk") REFERENCES "tipos_mov_stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
