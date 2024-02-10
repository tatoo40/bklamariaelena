-- CreateTable
CREATE TABLE "empresas" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nombre" TEXT NOT NULL,
    "razon_social" TEXT,
    "rut" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "email_contacto" TEXT NOT NULL,
    "telefono_contacto" TEXT NOT NULL,
    "observaciones" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "empresas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "empresas" ADD CONSTRAINT "empresas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
