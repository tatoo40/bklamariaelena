-- CreateTable
CREATE TABLE "permisos_x_rol_seccion" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "id_mod" INTEGER NOT NULL DEFAULT 0,
    "id_seccion" INTEGER NOT NULL,
    "id_accion" INTEGER NOT NULL,
    "id_rol" INTEGER NOT NULL,

    CONSTRAINT "permisos_x_rol_seccion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "permisos_x_rol_seccion" ADD CONSTRAINT "permisos_x_rol_seccion_id_seccion_fkey" FOREIGN KEY ("id_seccion") REFERENCES "secciones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permisos_x_rol_seccion" ADD CONSTRAINT "permisos_x_rol_seccion_id_accion_fkey" FOREIGN KEY ("id_accion") REFERENCES "acciones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permisos_x_rol_seccion" ADD CONSTRAINT "permisos_x_rol_seccion_id_rol_fkey" FOREIGN KEY ("id_rol") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
