-- CreateTable
CREATE TABLE "Show" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "premiere" TIMESTAMP(3) NOT NULL,
    "isRunning" BOOLEAN,
    "language" TEXT NOT NULL,
    "mainGenre" TEXT NOT NULL,
    "posterUrl" TEXT,

    CONSTRAINT "Show_pkey" PRIMARY KEY ("id")
);
