/*
  Warnings:

  - You are about to drop the `build` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "build";

-- CreateTable
CREATE TABLE "Build" (
    "id" SERIAL NOT NULL,
    "gpu" TEXT NOT NULL,
    "cpu" TEXT NOT NULL,
    "cooler" TEXT NOT NULL,
    "ram" TEXT NOT NULL,
    "numram" INTEGER NOT NULL,
    "drive" TEXT NOT NULL,
    "numstorage" INTEGER NOT NULL,
    "mobo" TEXT NOT NULL,
    "psu" TEXT NOT NULL,

    CONSTRAINT "Build_pkey" PRIMARY KEY ("id")
);
