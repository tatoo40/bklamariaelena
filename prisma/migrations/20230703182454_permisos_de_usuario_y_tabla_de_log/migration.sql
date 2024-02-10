-- CreateTable
CREATE TABLE "secciones" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "id_mod" INTEGER NOT NULL DEFAULT 0,
    "descripcion" TEXT,
    "tabla" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "id_seccion_padre" INTEGER NOT NULL,

    CONSTRAINT "secciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "acciones" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "id_mod" INTEGER NOT NULL DEFAULT 0,
    "descripcion" TEXT,

    CONSTRAINT "acciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cpf_log" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "descripcion" TEXT,
    "fecha" TIMESTAMP(3) NOT NULL,
    "id_registro" INTEGER,
    "nro_trans" INTEGER,
    "id_seccion" INTEGER NOT NULL,
    "id_accion" INTEGER NOT NULL,

    CONSTRAINT "cpf_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permisos_x_usuario_seccion" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT E'S',
    "id_usuario" INTEGER NOT NULL,
    "id_seccion" INTEGER NOT NULL,
    "id_accion" INTEGER NOT NULL,

    CONSTRAINT "permisos_x_usuario_seccion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cpf_log" ADD CONSTRAINT "cpf_log_id_seccion_fkey" FOREIGN KEY ("id_seccion") REFERENCES "secciones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpf_log" ADD CONSTRAINT "cpf_log_id_accion_fkey" FOREIGN KEY ("id_accion") REFERENCES "acciones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permisos_x_usuario_seccion" ADD CONSTRAINT "permisos_x_usuario_seccion_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permisos_x_usuario_seccion" ADD CONSTRAINT "permisos_x_usuario_seccion_id_seccion_fkey" FOREIGN KEY ("id_seccion") REFERENCES "secciones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permisos_x_usuario_seccion" ADD CONSTRAINT "permisos_x_usuario_seccion_id_accion_fkey" FOREIGN KEY ("id_accion") REFERENCES "acciones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
