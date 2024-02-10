/*
  Warnings:

  - Made the column `token_recuperacion_pass` on table `usuarios` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "usuarios" ALTER COLUMN "token_recuperacion_pass" SET NOT NULL;
