/*
  Warnings:

  - You are about to drop the column `remoteOnly` on the `SearchCriteria` table. All the data in the column will be lost.
  - Added the required column `notifyEmail` to the `SearchCriteria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SearchCriteria" DROP COLUMN "remoteOnly",
ADD COLUMN     "intervalDays" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN     "lastSentAt" TIMESTAMP(3),
ADD COLUMN     "notifyEmail" TEXT NOT NULL;
