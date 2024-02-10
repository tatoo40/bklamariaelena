-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "id_idioma" INTEGER;

-- CreateTable
CREATE TABLE "idiomas" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_mod" INTEGER NOT NULL DEFAULT 0,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "descripcion" TEXT NOT NULL,
    "prefijo" TEXT NOT NULL,

    CONSTRAINT "idiomas_pkey" PRIMARY KEY ("id")
);
