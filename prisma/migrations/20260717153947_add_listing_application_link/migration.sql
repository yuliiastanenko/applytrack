/*
  Warnings:

  - A unique constraint covering the columns `[applicationId]` on the table `JobListing` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "JobListing" ADD COLUMN     "applicationId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "JobListing_applicationId_key" ON "JobListing"("applicationId");

-- AddForeignKey
ALTER TABLE "JobListing" ADD CONSTRAINT "JobListing_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;
