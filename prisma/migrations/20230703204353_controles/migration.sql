-- CreateTable
CREATE TABLE "control_trans" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "id_mod" INTEGER NOT NULL DEFAULT 0,
    "nombre" TEXT,
    "descripcion" TEXT,
    "persistente" BOOLEAN NOT NULL,

    CONSTRAINT "control_trans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "controles_x_seccion_accion" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "id_mod" INTEGER NOT NULL DEFAULT 0,
    "id_seccion" INTEGER NOT NULL,
    "id_accion" INTEGER NOT NULL,
    "id_control" INTEGER NOT NULL,

    CONSTRAINT "controles_x_seccion_accion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "controles_x_seccion_accion" ADD CONSTRAINT "controles_x_seccion_accion_id_seccion_fkey" FOREIGN KEY ("id_seccion") REFERENCES "secciones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "controles_x_seccion_accion" ADD CONSTRAINT "controles_x_seccion_accion_id_accion_fkey" FOREIGN KEY ("id_accion") REFERENCES "acciones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "controles_x_seccion_accion" ADD CONSTRAINT "controles_x_seccion_accion_id_control_fkey" FOREIGN KEY ("id_control") REFERENCES "control_trans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
