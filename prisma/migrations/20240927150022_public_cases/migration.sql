/*
  Warnings:

  - Added the required column `type` to the `UserNotification` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserNotificationType" AS ENUM ('INVITED_TO_CASE');

-- AlterEnum
ALTER TYPE "CaseStatus" ADD VALUE 'PUBLIC';

-- AlterTable
ALTER TABLE "UserNotification" ADD COLUMN     "type" "UserNotificationType" NOT NULL;
