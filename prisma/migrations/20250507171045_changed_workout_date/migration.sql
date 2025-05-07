/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Workout` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "createdAt",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
