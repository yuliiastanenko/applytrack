-- CreateTable
CREATE TABLE "DigestLog" (
    "id" TEXT NOT NULL,
    "criteriaId" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jobCount" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "DigestLog_pkey" PRIMARY KEY ("id")
);
