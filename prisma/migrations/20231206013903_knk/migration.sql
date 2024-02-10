/*
  Warnings:

  - Added the required column `otro` to the `cpt_altaganado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cpt_altaganado" ADD COLUMN     "otro" TEXT NOT NULL;
