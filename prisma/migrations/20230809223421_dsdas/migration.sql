/*
  Warnings:

  - You are about to drop the column `factor_conv_a_stk` on the `unidades` table. All the data in the column will be lost.
  - You are about to drop the `unidades_stock` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "articulos" ADD COLUMN     "factor_conv_cmp_a_stk" DECIMAL(65,30);

-- AlterTable
ALTER TABLE "unidades" DROP COLUMN "factor_conv_a_stk";

-- DropTable
DROP TABLE "unidades_stock";
