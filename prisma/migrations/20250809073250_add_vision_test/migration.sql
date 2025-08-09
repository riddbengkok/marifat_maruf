-- CreateTable
CREATE TABLE "public"."VisionTest" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "imageUrl" TEXT,
    "imageData" TEXT,
    "method" TEXT NOT NULL DEFAULT 'vision',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "score" INTEGER,
    "isGood" BOOLEAN,
    "result" JSONB,
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VisionTest_pkey" PRIMARY KEY ("id")
);
