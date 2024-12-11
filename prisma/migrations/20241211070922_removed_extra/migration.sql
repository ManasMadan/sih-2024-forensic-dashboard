/*
  Warnings:

  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Person` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vehicle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_caseId_fkey";

-- DropForeignKey
ALTER TABLE "Person" DROP CONSTRAINT "Person_caseId_fkey";

-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_caseId_fkey";

-- DropTable
DROP TABLE "Location";

-- DropTable
DROP TABLE "Person";

-- DropTable
DROP TABLE "Vehicle";
